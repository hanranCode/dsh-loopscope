/**
 * The trajectory chart panel: a summary header, a turn → request → tool-call
 * chart, and an inspector for the selected row.
 *
 * Two x-axis modes keep the chart readable at any Session length:
 * - `bars` (default): every row starts at the left edge and its length is the
 *   activity's duration relative to the longest activity in the window. Sequence
 *   order stays vertical, so a 90-request Session is still legible in a narrow
 *   sidebar.
 * - `time`: a real (optionally idle-compressed) waterfall, useful to see waiting
 *   and overlap when the Session is short or zoomed.
 *
 * The component receives only framework-standard props plus the plugin's own
 * injected face; it never touches Cordis or the Session model directly.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  buildAxis,
  buildModel,
  requestPhases,
  type ApprovalModel,
  type RequestModel,
  type TimeAxis,
  type ToolCallModel,
  type TrajectoryModel,
  type TrajectoryTotals,
  type TurnModel,
} from './model.ts'
import { LoopChart } from './loop.tsx'
import { PHASE_COLORS, PHASE_ORDER, TOOL_COLORS } from './palette.ts'
import { sameSelection, type PhaseKind, type Selection } from './selection.ts'
import {
  fill,
  formatDuration,
  formatOffset,
  formatPercent,
  formatTokens,
  prettyJson,
  toolDisplayName,
  type Translate,
} from './format.ts'

/** Shape of the Session event window snapshot the panel subscribes to. */
export interface SessionEventWindowLike {
  readonly entries: readonly { readonly type: 'event' | 'transient'; readonly event: any }[]
  readonly hasMore: boolean
  readonly revision: number
}

/** Injected face supplied by the plugin's registration factory. */
export interface TrajectoryPanelInjected {
  readonly loadOlder?: () => void | Promise<boolean | void>
}

/** Horizontal axis presentation mode; `loop` is the developer-facing card view. */
type Mode = 'bars' | 'time' | 'loop'

/** Component props assembled by the slot renderer. */
export interface TrajectoryPanelProps extends TrajectoryPanelInjected {
  /** Framework hook over the Session event window snapshot. */
  readonly useEvents: (selector: (window: SessionEventWindowLike) => SessionEventWindowLike) => SessionEventWindowLike
  /** Framework hook over the Session lifecycle snapshot. */
  readonly useSession: (selector: (snapshot: { readonly running: boolean }) => boolean) => boolean
  readonly sessionId: string
  readonly t: Translate
}

const LEGEND: readonly { key: string; swatch: string }[] = [
  { key: 'legend.llmWait', swatch: 'var(--tv-cat-wait)' },
  { key: 'legend.llmGen', swatch: 'var(--tv-cat-llm)' },
  { key: 'legend.fsRead', swatch: 'var(--tv-cat-fs-read)' },
  { key: 'legend.fsWrite', swatch: 'var(--tv-cat-fs-write)' },
  { key: 'legend.bash', swatch: 'var(--tv-cat-bash)' },
  { key: 'legend.search', swatch: 'var(--tv-cat-search)' },
  { key: 'legend.web', swatch: 'var(--tv-cat-web)' },
  { key: 'legend.agent', swatch: 'var(--tv-cat-agent)' },
  { key: 'legend.failed', swatch: 'var(--tv-cat-failed)' },
]

const ZOOM_MIN = 1
const ZOOM_MAX = 6
const ZOOM_STEP = 1.5

/** One horizontal placement for a bar. */
interface Placement {
  readonly left: string
  readonly width: string
}

/** Chart geometry shared by every bar in one render. */
interface ChartLayout {
  readonly mode: Mode
  readonly axis: TimeAxis
  /** Placement of a time span (timeline mode) or of a duration (bars mode). */
  place(start: number, end: number): Placement
  readonly ticks: readonly { percent: number; label: string; major: boolean }[]
  /** Longest activity in the window, in milliseconds; the bars-mode scale. */
  readonly maxDurationMs: number
}

/** Clamp one numeric ratio into `[0, 1]`. */
function ratio(part: number, whole: number): number {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return 0
  return Math.max(0, Math.min(1, part / whole))
}

/** Longest single activity the window contains; sizes the bars-mode scale. */
function longestActivity(model: TrajectoryModel, now: number): number {
  // Bars mode scales against a high percentile of settled activity rather than
  // the maximum: one long approval or shell command would otherwise flatten every
  // ordinary request into a hairline. Outliers clamp to the full row width.
  const durations: number[] = []
  for (const turn of model.turns) {
    for (const request of turn.requests) {
      if (request.end !== undefined) durations.push(request.end - request.start)
      for (const tool of request.tools) {
        if (tool.end !== undefined) durations.push(tool.end - tool.start)
      }
      for (const approval of request.approvals) {
        if (approval.decided !== undefined) durations.push(approval.decided - approval.asked)
      }
    }
  }
  if (durations.length === 0) {
    for (const turn of model.turns) {
      for (const request of turn.requests) {
        durations.push((request.end ?? now) - request.start)
        for (const tool of request.tools) durations.push((tool.end ?? now) - tool.start)
      }
    }
  }
  if (durations.length === 0) return 1
  durations.sort((left, right) => left - right)
  const percentile = durations[Math.min(durations.length - 1, Math.floor(durations.length * 0.9))]
  return Math.max(percentile, 500)
}

/** Build the shared geometry once per render. */
function buildLayout(model: TrajectoryModel, mode: Mode, compressed: boolean, now: number): ChartLayout {
  const axis = buildAxis(model, { compressed })
  const maxDurationMs = longestActivity(model, now)
  const place = (start: number, end: number): Placement => {
    if (mode === 'time') {
      const left = axis.toPercent(Math.max(start, axis.t0))
      return { left: `${left}%`, width: `${Math.max(0.35, axis.toPercent(end) - left)}%` }
    }
    return { left: '0%', width: `${Math.min(100, Math.max(0.6, ((end - start) / maxDurationMs) * 100))}%` }
  }
  const ticks = mode === 'time'
    ? axis.ticks
    : [0, 0.25, 0.5, 0.75].map((fraction, index) => ({
      percent: fraction * 100,
      label: formatDuration(maxDurationMs * fraction),
      major: index === 0,
    }))
  return { mode, axis, place, ticks, maxDurationMs }
}

/** Render the horizontal grid lines for one track. */
function Gridlines({ layout }: { layout: ChartLayout }): JSX.Element {
  return (
    <>
      {layout.ticks.map((tick, index) => (
        <span
          key={`${tick.percent}-${index}`}
          className="tv-gridline"
          style={{ left: `${tick.percent}%` }}
        />
      ))}
    </>
  )
}

/** The model-request bar: wait for the first token, generation, settlement tail. */
function RequestBar({
  request,
  layout,
  now,
  selected,
  onSelect,
}: {
  request: RequestModel
  layout: ChartLayout
  now: number
  selected: boolean
  onSelect: (selection: Selection) => void
}): JSX.Element {
  const start = request.dispatchTime ?? request.start
  const end = request.end ?? now
  const span = Math.max(1, end - start)
  const waitEnd = request.firstToken ?? request.messageTime ?? end
  const genEnd = request.lastToken ?? waitEnd
  const waitPct = ratio(waitEnd - start, span) * 100
  const genPct = ratio(genEnd - Math.max(waitEnd, start), span) * 100
  const tailPct = Math.max(0, 100 - waitPct - genPct)
  const placement = layout.place(start, end)
  const running = request.open === true
  const title = [
    `#${request.index}`,
    formatDuration(end - start),
    request.model ?? '',
    request.firstToken !== undefined ? `TTFT ${formatDuration(request.firstToken - start)}` : '',
    request.usage !== undefined ? `↑${formatTokens(request.usage.inputTokens)} ↓${formatTokens(request.usage.outputTokens)}` : '',
  ].filter(part => part !== '').join(' · ')
  return (
    <span
      className="tv-bar"
      data-interrupted={request.interrupted === true ? 'true' : undefined}
      data-running={running ? 'true' : undefined}
      data-selected={selected ? 'true' : undefined}
      style={placement}
      title={title}
      onClick={() => onSelect({ kind: 'request', turn: request.turn, step: request.step })}
    >
      {waitPct > 0 && <span className="tv-seg" data-seg="wait" style={{ left: '0%', width: `${waitPct}%` }} />}
      {genPct > 0 && <span className="tv-seg" data-seg="gen" style={{ left: `${waitPct}%`, width: `${genPct}%` }} />}
      {tailPct > 0 && <span className="tv-seg" data-seg="tail" style={{ left: `${waitPct + genPct}%`, width: `${tailPct}%` }} />}
    </span>
  )
}

/** One tool call's bar. */
function ToolBar({
  tool,
  layout,
  now,
  selected,
  onSelect,
}: {
  tool: ToolCallModel
  layout: ChartLayout
  now: number
  selected: boolean
  onSelect: (selection: Selection) => void
}): JSX.Element {
  const end = tool.end ?? now
  const title = [
    tool.name,
    formatDuration(end - tool.start),
    tool.status,
    tool.error?.reason ?? '',
  ].filter(part => part !== '').join(' · ')
  return (
    <span
      className="tv-bar"
      data-status={tool.status === 'running' ? undefined : tool.status}
      data-running={tool.status === 'running' ? 'true' : undefined}
      data-selected={selected ? 'true' : undefined}
      style={{ ...layout.place(tool.start, end), ['--tv-bar' as string]: TOOL_COLORS[tool.category] }}
      title={title}
      onClick={() => onSelect({ kind: 'tool', id: tool.id })}
    />
  )
}

/** One approval wait, drawn as a hollow bar over the step that raised it. */
function ApprovalBar({
  approval,
  layout,
  now,
  onSelect,
}: {
  approval: ApprovalModel
  layout: ChartLayout
  now: number
  onSelect: (selection: Selection) => void
}): JSX.Element {
  const end = approval.decided ?? now
  return (
    <span
      className="tv-bar-approval"
      style={layout.place(approval.asked, end)}
      title={`${approval.toolName ?? 'approval'} · ${formatDuration(end - approval.asked)}`}
      onClick={() => onSelect({ kind: 'approval', id: approval.id })}
    />
  )
}

/** One model request row plus its retry markers, approval waits, and tool rows. */
function RequestRows({
  request,
  layout,
  now,
  selection,
  onSelect,
  t,
  toolsOnly,
}: {
  request: RequestModel
  layout: ChartLayout
  now: number
  selection: Selection | null
  onSelect: (selection: Selection) => void
  t: Translate
  toolsOnly: boolean
}): JSX.Element {
  const selected = selection !== null && selection.kind === 'request'
    && selection.turn === request.turn && selection.step === request.step
  const end = request.end ?? now
  return (
    <>
      {!toolsOnly && (
        <div
          className="tv-row"
          data-clickable="true"
          data-selected={selected ? 'true' : undefined}
          data-kind="request"
          onClick={() => onSelect({ kind: 'request', turn: request.turn, step: request.step })}
        >
          <div className="tv-row-label">
            <span className="tv-dot" style={{ ['--tv-dot' as string]: 'var(--tv-cat-llm)' }} />
            <span className="tv-label-name">{fill(t('row.request'), { n: request.index })}</span>
          </div>
          <div className="tv-track">
            <Gridlines layout={layout} />
            <RequestBar request={request} layout={layout} now={now} selected={selected} onSelect={onSelect} />
            {request.retries.map((retry, index) => (
              <span
                key={`retry-${index}`}
                className="tv-retry-mark"
                style={{ left: `${layout.mode === 'time' ? layout.axis.toPercent(retry.time) : 100}%` }}
                title={retry.failure?.reason ?? retry.failure?.code ?? 'retry'}
              />
            ))}
            {request.approvals.map(approval => (
              <ApprovalBar key={approval.id} approval={approval} layout={layout} now={now} onSelect={onSelect} />
            ))}
          </div>
          <div className="tv-row-dur">{formatDuration(end - (request.dispatchTime ?? request.start))}</div>
        </div>
      )}
      {request.tools.map(tool => {
        const toolSelected = selection !== null && selection.kind === 'tool' && selection.id === tool.id
        return (
          <div
            key={tool.id}
            className="tv-row"
            data-clickable="true"
            data-selected={toolSelected ? 'true' : undefined}
            data-kind="tool"
            onClick={() => onSelect({ kind: 'tool', id: tool.id })}
          >
            <div className="tv-row-label" data-indent={toolsOnly ? 'false' : 'true'}>
              <span className="tv-dot" style={{ ['--tv-dot' as string]: TOOL_COLORS[tool.category] }} />
              <span className="tv-label-name">{toolDisplayName(tool.name)}</span>
            </div>
            <div className="tv-track">
              <Gridlines layout={layout} />
              <ToolBar tool={tool} layout={layout} now={now} selected={toolSelected} onSelect={onSelect} />
            </div>
            <div className="tv-row-dur">{tool.end === undefined ? t('tool.running') : formatDuration(tool.end - tool.start)}</div>
          </div>
        )
      })}
    </>
  )
}

/** Find one loop by its turn/step identity. */
function findRequest(model: TrajectoryModel, turn: number, step: number): RequestModel | undefined {
  return model.turns.find(candidate => candidate.turn === turn)?.requests
    .find(candidate => candidate.step === step)
}

/** Millisecond length of one loop phase. */
function phaseMs(request: RequestModel, kind: PhaseKind): number {
  return requestPhases(request).find(phase => phase.kind === kind)?.ms ?? 0
}

/** Status label for one loop. */
function loopStatus(request: RequestModel, t: Translate): string {
  if (request.open === true) return t('status.running')
  if (request.interrupted === true) return t('status.interrupted')
  return t('status.completed')
}

/** Format a token usage summary for the detail sheet. */
function usageLine(usage: RequestModel['usage'], t: Translate): string {
  if (usage === undefined) return '—'
  const parts = [fill(t('usage.value'), {
    input: formatTokens(usage.inputTokens),
    output: formatTokens(usage.outputTokens),
    cacheRead: formatTokens(usage.cacheReadTokens),
  })]
  if (usage.totalTokens !== undefined) parts.push(fill(t('usage.total'), { total: formatTokens(usage.totalTokens) }))
  return parts.join(' · ')
}

/** Detail sheet content for one selected item. */
function DetailBody({
  selection,
  model,
  now,
  t,
  onSelect,
}: {
  selection: Selection
  model: TrajectoryModel
  now: number
  t: Translate
  onSelect: (selection: Selection) => void
}): JSX.Element | null {
  if (selection.kind === 'tool') {
    for (const turn of model.turns) {
      for (const request of turn.requests) {
        const tool = request.tools.find(candidate => candidate.id === selection.id)
        if (tool !== undefined) {
          const status = tool.status === 'failed'
            ? t('status.failed')
            : tool.status === 'cancelled' ? t('status.cancelled')
              : tool.status === 'running' ? t('status.running') : t('status.completed')
          return (
            <>
              <dl className="tv-kv">
                <dt>{t('detail.status')}</dt>
                <dd className={tool.status === 'failed' ? 'tv-status-failed' : 'tv-status-ok'}>{status}</dd>
                <dt>{t('detail.duration')}</dt>
                <dd>{formatDuration((tool.end ?? now) - tool.start)}</dd>
                <dt>{t('detail.start')}</dt>
                <dd>{formatOffset(tool.start - model.t0)}</dd>
                <dt>{t('detail.callId')}</dt>
                <dd>{tool.id}</dd>
              </dl>
              <section className="tv-section">
                <div className="tv-section-title">{t('detail.args')}</div>
                <pre className="tv-code">{prettyJson(tool.arguments)}</pre>
              </section>
              {tool.error !== undefined && (
                <section className="tv-section">
                  <div className="tv-section-title">{t('detail.status')}</div>
                  <pre className="tv-code tv-status-failed">{`${tool.error.name} (${tool.error.code})\n${tool.error.reason ?? ''}`}</pre>
                </section>
              )}
              {tool.resultText !== undefined && (
                <section className="tv-section">
                  <div className="tv-section-title">{t('detail.result')}</div>
                  <pre className="tv-code">{tool.resultText.slice(0, 8000)}</pre>
                </section>
              )}
            </>
          )
        }
      }
    }
    return null
  }
  if (selection.kind === 'request') {
    const request = model.turns.find(turn => turn.turn === selection.turn)?.requests
      .find(candidate => candidate.step === selection.step)
    if (request === undefined) return null
    const dispatch = request.dispatchTime ?? request.start
    const firstToken = request.firstToken
    const lastToken = request.lastToken
    const outputTokens = request.usage?.outputTokens ?? 0
    const speed = firstToken !== undefined && lastToken !== undefined && lastToken > firstToken && outputTokens > 0
      ? `${(outputTokens / ((lastToken - firstToken) / 1000)).toFixed(1)} tok/s`
      : undefined
    return (
      <>
        <dl className="tv-kv">
          <dt>{t('detail.status')}</dt>
          <dd>{request.interrupted === true ? t('status.interrupted') : request.open === true ? t('status.running') : t('status.completed')}</dd>
          <dt>{t('detail.model')}</dt>
          <dd>{[request.provider, request.model].filter(part => part !== undefined && part !== '').join(' / ') || '—'}</dd>
          <dt>{t('detail.duration')}</dt>
          <dd>{formatDuration((request.end ?? now) - dispatch)}</dd>
          <dt>{t('detail.wait')}</dt>
          <dd>{firstToken !== undefined ? formatDuration(firstToken - dispatch) : '—'}</dd>
          <dt>{t('detail.speed')}</dt>
          <dd>{speed ?? '—'}</dd>
          <dt>{t('detail.usage')}</dt>
          <dd>{usageLine(request.usage, t)}</dd>
          <dt>{t('detail.start')}</dt>
          <dd>{formatOffset(dispatch - model.t0)}</dd>
        </dl>
        {request.reasoningText !== '' && (
          <section className="tv-section">
            <div className="tv-section-title">{t('detail.reasoning')}</div>
            <pre className="tv-code">{request.reasoningText.slice(-6000)}</pre>
          </section>
        )}
        {request.assistantText !== '' && (
          <section className="tv-section">
            <div className="tv-section-title">{t('detail.result')}</div>
            <pre className="tv-code">{request.assistantText.slice(0, 6000)}</pre>
          </section>
        )}
      </>
    )
  }
  if (selection.kind === 'phase') {
    const request = findRequest(model, selection.turn, selection.step)
    if (request === undefined) return null
    const turn = model.turns.find(candidate => candidate.turn === selection.turn)
    const usage = request.usage
    if (selection.phase === 'context') {
      const window = request.context.contextWindow
      return (
        <>
          <dl className="tv-kv">
            <dt>{t('context.route')}</dt>
            <dd>{[request.provider, request.model].filter(part => part !== undefined && part !== '').join(' / ') || '—'}</dd>
            <dt>{t('context.reason')}</dt>
            <dd>{request.context.headerReason ?? '—'}</dd>
            <dt>{t('context.inputTokens')}</dt>
            <dd>{formatTokens(usage?.inputTokens)}</dd>
            <dt>{t('context.cache')}</dt>
            <dd>{formatTokens(usage?.cacheReadTokens)} / {formatTokens(usage?.cacheWriteTokens)}</dd>
            <dt>{t('context.window')}</dt>
            <dd>{window !== undefined && usage !== undefined
              ? `${formatPercent(usage.inputTokens, window)} · ${formatTokens(usage.inputTokens)} / ${formatTokens(window)}`
              : '—'}</dd>
            <dt>{t('context.tools')}</dt>
            <dd>{request.context.toolCount ?? '—'}</dd>
            <dt>{t('context.maxTokens')}</dt>
            <dd>{request.context.maxTokens !== undefined ? formatTokens(request.context.maxTokens) : '—'}</dd>
            <dt>{t('context.reasoningEffort')}</dt>
            <dd>{request.context.reasoningEffort ?? '—'}</dd>
            <dt>{t('context.promptMode')}</dt>
            <dd>{request.context.systemPromptUpdate ?? '—'}</dd>
            <dt>{t('context.systemChars')}</dt>
            <dd>{request.context.systemChars !== undefined ? String(request.context.systemChars) : '—'}</dd>
          </dl>
          <section className="tv-section">
            <div className="tv-section-title">{t('context.userMessage')}</div>
            <pre className="tv-code">{turn?.userText ?? t('conversation.empty')}</pre>
          </section>
          {request.context.developerNotes.length > 0 && (
            <section className="tv-section">
              <div className="tv-section-title">{t('context.developerNotes')}</div>
              <div className="tv-loop-signals">
                {request.context.developerNotes.map((note, index) => (
                  <span key={index} className="tv-signal" data-kind={note.kind === 'tools' ? 'tools' : 'workspace'}>
                    <span className="tv-signal-kind">{note.kind === 'tools' ? t('signal.tools') : t('context.developerNote')}</span>
                    <span className="tv-signal-detail">{note.kind === 'tools' ? `${note.text} 个工具` : note.text}</span>
                  </span>
                ))}
              </div>
            </section>
          )}
          {request.signals.length > 0 && (
            <section className="tv-section">
              <div className="tv-section-title">{t('loop.signals')}</div>
              <div className="tv-loop-signals">
                {request.signals.map((signal, index) => (
                  <span key={index} className="tv-signal" data-kind={signal.kind}>
                    <span className="tv-signal-kind">{t(`signal.${signal.kind}`)}</span>
                    {signal.detail !== undefined && <span className="tv-signal-detail">{signal.detail}</span>}
                  </span>
                ))}
              </div>
            </section>
          )}
        </>
      )
    }
    if (selection.phase === 'decision') {
      const dispatch = request.dispatchTime ?? request.start
      const firstToken = request.firstToken
      const lastToken = request.lastToken
      const outputTokens = usage?.outputTokens ?? 0
      const speed = firstToken !== undefined && lastToken !== undefined && lastToken > firstToken && outputTokens > 0
        ? `${(outputTokens / ((lastToken - firstToken) / 1000)).toFixed(1)} tok/s`
        : undefined
      return (
        <>
          <dl className="tv-kv">
            <dt>{t('decision.status')}</dt>
            <dd>{loopStatus(request, t)}</dd>
            <dt>{t('decision.ttft')}</dt>
            <dd>{firstToken !== undefined ? formatDuration(firstToken - dispatch) : '—'}</dd>
            <dt>{t('decision.generation')}</dt>
            <dd>{firstToken !== undefined && lastToken !== undefined ? formatDuration(lastToken - firstToken) : '—'}</dd>
            <dt>{t('decision.speed')}</dt>
            <dd>{speed ?? '—'}</dd>
            <dt>{t('decision.outputTokens')}</dt>
            <dd>{formatTokens(outputTokens)}</dd>
            <dt>{t('decision.reasoningChars')}</dt>
            <dd>{request.reasoningChars}</dd>
            <dt>{t('decision.textChars')}</dt>
            <dd>{request.outputChars}</dd>
            <dt>{t('decision.attempts')}</dt>
            <dd>{request.attempts}</dd>
            <dt>{t('decision.retries')}</dt>
            <dd>{request.retries.length}</dd>
          </dl>
          {request.reasoningText !== '' && (
            <section className="tv-section">
              <div className="tv-section-title">{t('conversation.reasoning')}</div>
              <pre className="tv-code">{request.reasoningText.slice(-6000)}</pre>
            </section>
          )}
          {request.assistantText !== '' && (
            <section className="tv-section">
              <div className="tv-section-title">{t('conversation.assistant')}</div>
              <pre className="tv-code">{request.assistantText.slice(0, 6000)}</pre>
            </section>
          )}
          <section className="tv-section">
            <div className="tv-section-title">{t('decision.toolsPicked')}</div>
            {request.tools.length === 0
              ? <div className="tv-loop-notools">{t('loop.noTools')}</div>
              : (
                <div className="tv-loop-tools">
                  {request.tools.map(tool => (
                    <button
                      key={tool.id}
                      type="button"
                      className="tv-tool-chip"
                      data-status={tool.status}
                      onClick={() => { onSelect({ kind: 'tool', id: tool.id }) }}
                    >
                      <span className="tv-tool-dot" style={{ ['--tv-tool' as string]: TOOL_COLORS[tool.category] }} />
                      <span className="tv-tool-name">{toolDisplayName(tool.name)}</span>
                      <span className="tv-tool-dur">{tool.end === undefined ? '…' : formatDuration(tool.end - tool.start)}</span>
                    </button>
                  ))}
                </div>
              )}
          </section>
        </>
      )
    }
    if (selection.phase === 'act') {
      const failed = request.tools.filter(tool => tool.status === 'failed' || tool.status === 'cancelled').length
      const total = request.tools.reduce((sum, tool) => sum + Math.max(0, (tool.end ?? now) - tool.start), 0)
      return (
        <>
          <dl className="tv-kv">
            <dt>{t('act.tools')}</dt>
            <dd>{request.tools.length}</dd>
            <dt>{t('act.failed')}</dt>
            <dd className={failed > 0 ? 'tv-status-failed' : undefined}>{failed}</dd>
            <dt>{t('act.total')}</dt>
            <dd>{formatDuration(total)}</dd>
            <dt>{t('decision.status')}</dt>
            <dd>{loopStatus(request, t)}</dd>
          </dl>
          <div className="tv-phase-tools">
            {request.tools.map(tool => (
              <div
                key={tool.id}
                className="tv-phase-tool"
                data-clickable="true"
                onClick={() => { onSelect({ kind: 'tool', id: tool.id }) }}
              >
                <div className="tv-phase-tool-head">
                  <span className="tv-tool-dot" style={{ ['--tv-tool' as string]: TOOL_COLORS[tool.category] }} />
                  <span className="tv-tool-name">{toolDisplayName(tool.name)}</span>
                  <span className="tv-label-meta">
                    {tool.end === undefined ? t('tool.running') : formatDuration(tool.end - tool.start)}
                    {' · '}
                    {tool.status === 'failed' ? t('status.failed') : tool.status === 'cancelled' ? t('status.cancelled') : tool.status === 'running' ? t('status.running') : t('status.completed')}
                  </span>
                </div>
                {tool.resultText !== undefined && (
                  <pre className="tv-phase-tool-body">{tool.resultText.slice(0, 400)}</pre>
                )}
              </div>
            ))}
          </div>
        </>
      )
    }
    // observe
    const indexInTurn = turn?.requests.indexOf(request) ?? -1
    const hasNext = turn !== undefined && indexInTurn >= 0 && indexInTurn < turn.requests.length - 1
    return (
      <>
        <dl className="tv-kv">
          <dt>{t('observe.chars')}</dt>
          <dd>{formatTokens(request.resultChars)}</dd>
          <dt>{t('observe.errors')}</dt>
          <dd className={request.resultErrors > 0 ? 'tv-status-failed' : undefined}>{request.resultErrors}</dd>
          <dt>{t('observe.next')}</dt>
          <dd>{hasNext ? t('observe.nextLoop') : t('observe.turnEnd')}</dd>
          <dt>{t('detail.duration')}</dt>
          <dd>{formatDuration(phaseMs(request, 'observe'))}</dd>
        </dl>
        <section className="tv-section">
          <div className="tv-section-title">{t('observe.results')}</div>
          <div className="tv-phase-tools">
            {request.tools.length === 0 && <div className="tv-loop-notools">{t('observe.noResult')}</div>}
            {request.tools.map(tool => (
              <div
                key={tool.id}
                className="tv-phase-tool"
                data-clickable="true"
                onClick={() => { onSelect({ kind: 'tool', id: tool.id }) }}
              >
                <div className="tv-phase-tool-head">
                  <span className="tv-tool-dot" style={{ ['--tv-tool' as string]: TOOL_COLORS[tool.category] }} />
                  <span className="tv-tool-name">{toolDisplayName(tool.name)}</span>
                  <span className="tv-label-meta">
                    {tool.error !== undefined ? tool.error.code : tool.resultText === undefined ? '—' : `${tool.resultText.length} 字`}
                  </span>
                </div>
                {tool.error !== undefined && (
                  <pre className="tv-phase-tool-body tv-status-failed">{`${tool.error.name} (${tool.error.code})
${tool.error.reason ?? ''}`}</pre>
                )}
                {tool.error === undefined && tool.resultText !== undefined && (
                  <pre className="tv-phase-tool-body">{tool.resultText.slice(0, 300)}</pre>
                )}
              </div>
            ))}
          </div>
        </section>
      </>
    )
  }
  if (selection.kind === 'conversation') {
    const request = findRequest(model, selection.turn, selection.step)
    if (request === undefined) return null
    const turn = model.turns.find(candidate => candidate.turn === selection.turn)
    return (
      <>
        <dl className="tv-kv">
          <dt>{t('loop.title')}</dt>
          <dd>{request.index} · {fill(t('loop.sub'), { turn: request.turn, step: request.step })}</dd>
          <dt>{t('decision.status')}</dt>
          <dd>{loopStatus(request, t)}</dd>
          <dt>{t('detail.duration')}</dt>
          <dd>{formatDuration((request.end ?? now) - request.start)}</dd>
        </dl>
        <section className="tv-section">
          <div className="tv-section-title">{t('conversation.user')}</div>
          <pre className="tv-code">{turn?.userText ?? t('conversation.empty')}</pre>
        </section>
        {request.reasoningText !== '' && (
          <section className="tv-section">
            <div className="tv-section-title">{t('conversation.reasoning')}</div>
            <pre className="tv-code">{request.reasoningText.slice(-4000)}</pre>
          </section>
        )}
        <section className="tv-section">
          <div className="tv-section-title">{t('conversation.assistant')}</div>
          <pre className="tv-code">{request.assistantText !== '' ? request.assistantText.slice(0, 6000) : '—'}</pre>
        </section>
      </>
    )
  }
  if (selection.kind === 'turn') {
    const turn = model.turns.find(candidate => candidate.turn === selection.turn)
    if (turn === undefined) return null
    return (
      <dl className="tv-kv">
        <dt>{t('detail.status')}</dt>
        <dd>{turn.end === undefined ? t('status.running') : t('status.completed')}</dd>
        <dt>{t('detail.duration')}</dt>
        <dd>{formatDuration((turn.end ?? now) - turn.start)}</dd>
        <dt>{t('detail.start')}</dt>
        <dd>{formatOffset(turn.start - model.t0)}</dd>
        {turn.endReason !== undefined && (
          <>
            <dt>{t('detail.turnEnd')}</dt>
            <dd>{turn.endReason}</dd>
          </>
        )}
        {turn.userText !== undefined && (
          <>
            <dt>{t('detail.result')}</dt>
            <dd>{turn.userText.slice(0, 2000)}</dd>
          </>
        )}
      </dl>
    )
  }
  for (const turn of model.turns) {
    for (const request of turn.requests) {
      const approval = request.approvals.find(candidate => candidate.id === selection.id)
      if (approval !== undefined) {
        return (
          <dl className="tv-kv">
            <dt>{t('detail.status')}</dt>
            <dd>{approval.outcome ?? (approval.decided === undefined ? t('status.waiting') : t('status.completed'))}</dd>
            <dt>{t('detail.duration')}</dt>
            <dd>{formatDuration((approval.decided ?? now) - approval.asked)}</dd>
            <dt>{t('detail.args')}</dt>
            <dd>{approval.toolName ?? '—'}</dd>
          </dl>
        )
      }
    }
  }
  return null
}

/** Header title and subtitle for one selected item. */
function selectionHeading(model: TrajectoryModel, selection: Selection, t: Translate): { title: string; subtitle?: string } | null {
  if (selection.kind === 'tool') {
    for (const turn of model.turns) {
      for (const request of turn.requests) {
        const tool = request.tools.find(candidate => candidate.id === selection.id)
        if (tool !== undefined) return { title: toolDisplayName(tool.name), subtitle: t('detail.title.tool') }
      }
    }
    return null
  }
  if (selection.kind === 'request') {
    const request = model.turns.find(turn => turn.turn === selection.turn)?.requests
      .find(candidate => candidate.step === selection.step)
    if (request === undefined) return null
    return { title: `#${request.index} ${request.model ?? ''}`.trim(), subtitle: t('detail.title.request') }
  }
  if (selection.kind === 'turn') {
    const turn = model.turns.find(candidate => candidate.turn === selection.turn)
    return { title: fill(t('row.turn'), { n: selection.turn }), subtitle: turn?.endReason }
  }
  if (selection.kind === 'phase') {
    const request = findRequest(model, selection.turn, selection.step)
    if (request === undefined) return null
    return {
      title: `${t(`phase.${selection.phase}`)} · ${t('loop.title')} ${request.index}`,
      subtitle: t(`phase.${selection.phase}.hint`),
    }
  }
  if (selection.kind === 'conversation') {
    const request = findRequest(model, selection.turn, selection.step)
    if (request === undefined) return null
    return {
      title: `${t('phase.conversation')} · ${t('loop.title')} ${request.index}`,
      subtitle: fill(t('loop.sub'), { turn: request.turn, step: request.step }),
    }
  }
  return { title: t('detail.title.tool'), subtitle: selection.id }
}

/** The panel body mounted into `sidebar.right.pane.tab`. */
export function TrajectoryPanel(props: TrajectoryPanelProps): JSX.Element {
  const { useEvents, useSession, t, loadOlder } = props
  const eventWindow = useEvents(snapshot => snapshot)
  const running = useSession(snapshot => snapshot.running === true)
  const [collapsed, setCollapsed] = useState<ReadonlySet<number>>(new Set())
  const [toolsOnly, setToolsOnly] = useState(false)
  const [mode, setMode] = useState<Mode>('bars')
  const [compressed, setCompressed] = useState(true)
  const [follow, setFollow] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [selection, setSelection] = useState<Selection | null>(null)
  const [loadingOlder, setLoadingOlder] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [now, setNow] = useState(() => Date.now())
  const chartRef = useRef<HTMLDivElement | null>(null)
  const playIndexRef = useRef(0)

  // A running activity's bar grows against the wall clock; stop ticking once the
  // session settles.
  useEffect(() => {
    if (!running) return undefined
    const timer = setInterval(() => { setNow(Date.now()) }, 1000)
    return () => { clearInterval(timer) }
  }, [running])
  useEffect(() => {
    setNow(Date.now())
  }, [eventWindow.revision])

  const model = useMemo(
    () => buildModel(eventWindow.entries, { now, hasMore: eventWindow.hasMore }),
    [eventWindow.entries, eventWindow.hasMore, now],
  )
  const layout = useMemo(() => buildLayout(model, mode, compressed, now), [model, mode, compressed, now])

  // ---- LOOP playback -------------------------------------------------------
  const loops = useMemo(
    () => model.turns.flatMap(turn => turn.requests.map(request => ({ turn: turn.turn, request }))),
    [model],
  )
  // Playback reads the latest loop list through a ref: a live Session rebuilds the
  // model every second, and an interval keyed on that identity would never fire.
  const loopsRef = useRef(loops)
  loopsRef.current = loops
  useEffect(() => {
    if (mode !== 'loop' && playing) setPlaying(false)
  }, [mode, playing])
  useEffect(() => {
    if (!playing) return undefined
    const timer = setInterval(() => {
      const current = loopsRef.current
      if (current.length === 0) return
      playIndexRef.current = (playIndexRef.current + 1) % current.length
      const loop = current[playIndexRef.current]
      if (loop === undefined) return
      setSelection(loop.request.index === 1
        ? { kind: 'conversation', turn: loop.turn, step: loop.request.step }
        : { kind: 'phase', turn: loop.turn, step: loop.request.step, phase: 'decision' })
    }, 1400)
    return () => { clearInterval(timer) }
  }, [playing])
  useEffect(() => {
    if (!playing || mode !== 'loop') return
    if (selection === null || !(selection.kind === 'phase' || selection.kind === 'conversation' || selection.kind === 'request')) return
    const card = chartRef.current?.querySelector(`[data-loop-id="${selection.turn}:${selection.step}"]`)
    if (card instanceof HTMLElement) card.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [playing, mode, selection])
  const togglePlay = useCallback(() => {
    setPlaying((value) => {
      if (!value) {
        const index = selection !== null && (selection.kind === 'phase' || selection.kind === 'conversation' || selection.kind === 'request')
          ? loops.findIndex(loop => loop.turn === selection.turn && loop.request.step === selection.step)
          : 0
        playIndexRef.current = index >= 0 ? index : 0
      }
      return !value
    })
  }, [loops, selection])

  const toggleTurn = useCallback((turn: number) => {
    setCollapsed((previous) => {
      const next = new Set(previous)
      if (next.has(turn)) next.delete(turn)
      else next.add(turn)
      return next
    })
  }, [])

  const select = useCallback((next: Selection) => {
    // Clicking the element that is already selected clears the inspector.
    setSelection(current => sameSelection(current, next) ? null : next)
  }, [])

  // Keep the newest activity in view while following a live session.
  useEffect(() => {
    if (!follow) return
    const element = chartRef.current
    if (element === null) return
    element.scrollLeft = element.scrollWidth
    element.scrollTop = element.scrollHeight
  }, [follow, model.t1, zoom, mode])

  const loadMore = useCallback(() => {
    if (loadOlder === undefined || loadingOlder) return
    setLoadingOlder(true)
    void Promise.resolve(loadOlder()).finally(() => { setLoadingOlder(false) })
  }, [loadOlder, loadingOlder])

  const totals: TrajectoryTotals = model.totals
  const haveTurns = model.turns.length > 0
  const heading = selection === null ? null : selectionHeading(model, selection, t)

  return (
    <div className="tv-root" data-dsh-loopscope="">
      <div className="tv-head">
        <span className="tv-headline">{t('tab.title')}</span>
        {running && <span className="tv-pill">{t('status.running')}</span>}
      </div>
      <div className="tv-summary">
        <SummaryCard
          label={t('summary.duration')}
          value={formatDuration(totals.activeMs > 0 ? totals.activeMs : model.t1 - model.t0, t)}
          title={fill(t('summary.spanTitle'), { span: formatDuration(model.t1 - model.t0, t) })}
        />
        <SummaryCard
          label={t('summary.turns')}
          value={fill(t('summary.turns.value'), { turns: totals.turns, steps: totals.requests })}
        />
        <SummaryCard
          label={t('summary.tools')}
          value={fill(t('summary.tools.value'), { calls: totals.toolCalls, failed: totals.toolFailures })}
        />
        <SummaryCard
          label={t('summary.tokens')}
          value={fill(t('summary.tokens.value'), {
            input: formatTokens(totals.inputTokens),
            output: formatTokens(totals.outputTokens),
          })}
        />
        <SummaryCard
          label={t('summary.latency')}
          value={fill(t('summary.latency.value'), {
            wait: totals.averageFirstTokenMs !== undefined ? formatDuration(totals.averageFirstTokenMs) : '—',
            gen: totals.averageGenerationMs !== undefined ? formatDuration(totals.averageGenerationMs) : '—',
          })}
        />
        <SummaryCard
          label={t('summary.cache')}
          value={fill(t('summary.cache.value'), {
            rate: formatPercent(totals.cacheReadTokens, totals.cacheReadTokens + totals.inputTokens),
            read: formatTokens(totals.cacheReadTokens),
          })}
        />
      </div>
      <div className="tv-toolbar">
        <span className="tv-segmented" role="group" aria-label={t('toolbar.modeHint')}>
          <button
            type="button"
            className="tv-btn"
            data-on={mode === 'bars' ? 'true' : 'false'}
            onClick={() => { setMode('bars') }}
            title={t('toolbar.modeHint')}
          >
            {t('toolbar.modeBars')}
          </button>
          <button
            type="button"
            className="tv-btn"
            data-on={mode === 'time' ? 'true' : 'false'}
            onClick={() => { setMode('time') }}
            title={t('toolbar.modeHint')}
          >
            {t('toolbar.modeTime')}
          </button>
          <button
            type="button"
            className="tv-btn"
            data-on={mode === 'loop' ? 'true' : 'false'}
            onClick={() => { setMode('loop') }}
            title={t('hint.loop')}
          >
            {t('toolbar.modeLoop')}
          </button>
        </span>
        {mode === 'loop'
          ? (
            <button
              type="button"
              className="tv-btn"
              data-on={playing ? 'true' : 'false'}
              onClick={togglePlay}
              disabled={!haveTurns}
            >
              {playing ? `⏸ ${t('toolbar.pause')}` : `▶ ${t('toolbar.play')}`}
            </button>
          )
          : (
            <>
              <button
                type="button"
                className="tv-btn"
                onClick={() => {
                  setCollapsed((previous) => {
                    if (previous.size > 0) return new Set()
                    return new Set(model.turns.map(turn => turn.turn))
                  })
                }}
                disabled={!haveTurns}
              >
                {collapsed.size > 0 ? t('toolbar.expand') : t('toolbar.collapse')}
              </button>
              <button
                type="button"
                className="tv-btn"
                data-on={toolsOnly ? 'true' : 'false'}
                onClick={() => { setToolsOnly(value => !value) }}
              >
                {toolsOnly ? t('toolbar.allRows') : t('toolbar.toolsOnly')}
              </button>
              {mode === 'time' && (
                <button
                  type="button"
                  className="tv-btn"
                  data-on={compressed ? 'true' : 'false'}
                  onClick={() => { setCompressed(value => !value) }}
                  title={t('toolbar.compressHint')}
                >
                  {t('toolbar.compress')}
                </button>
              )}
              <button
                type="button"
                className="tv-btn"
                onClick={() => { setZoom(value => Math.max(ZOOM_MIN, value / ZOOM_STEP)) }}
                disabled={zoom <= ZOOM_MIN}
                title={t('toolbar.zoomOut')}
              >
                −
              </button>
              <button
                type="button"
                className="tv-btn"
                onClick={() => { setZoom(value => Math.min(ZOOM_MAX, value * ZOOM_STEP)) }}
                disabled={zoom >= ZOOM_MAX}
                title={t('toolbar.zoomIn')}
              >
                +
              </button>
            </>
          )}
        <button
          type="button"
          className="tv-btn"
          data-on={follow ? 'true' : 'false'}
          onClick={() => { setFollow(value => !value) }}
        >
          {t('toolbar.follow')}
        </button>
        {eventWindow.hasMore && (
          <button type="button" className="tv-btn" onClick={loadMore} disabled={loadingOlder}>
            {loadingOlder ? t('loading') : t('loadOlder')}
          </button>
        )}
      </div>
      {haveTurns
        ? mode === 'loop'
          ? (
            <>
              <div className="tv-chart" ref={chartRef}>
                <LoopChart
                  model={model}
                  now={now}
                  selection={selection}
                  activeLoopId={playing && selection !== null
                    && (selection.kind === 'phase' || selection.kind === 'conversation' || selection.kind === 'request')
                    ? `${selection.turn}:${selection.step}`
                    : undefined}
                  onSelect={select}
                  t={t}
                />
              </div>
              <div className="tv-hint">{t('hint.loop')}</div>
              <div className="tv-legend">
                {PHASE_ORDER.map(phase => (
                  <span key={phase} className="tv-legend-item">
                    <span className="tv-legend-swatch" style={{ ['--tv-swatch' as string]: PHASE_COLORS[phase] }} />
                    {t(`phase.${phase}`)}
                  </span>
                ))}
              </div>
            </>
          )
          : (
            <>
              <div className="tv-chart" ref={chartRef}>
                <div className="tv-inner" style={{ width: `${zoom * 100}%` }}>
                  <Axis layout={layout} />
                  <div className="tv-rows">
                    {model.turns.map((turn) => (
                      <TurnRows
                        key={`turn-${turn.turn}`}
                        turn={turn}
                        layout={layout}
                        now={now}
                        collapsed={collapsed.has(turn.turn)}
                        selection={selection}
                        onToggle={() => { toggleTurn(turn.turn) }}
                        onSelect={select}
                        t={t}
                        toolsOnly={toolsOnly}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="tv-hint">{t('hint.select')}</div>
              <div className="tv-legend">
                {LEGEND.map(item => (
                  <span key={item.key} className="tv-legend-item">
                    <span className="tv-legend-swatch" style={{ ['--tv-swatch' as string]: item.swatch }} />
                    {t(item.key)}
                  </span>
                ))}
              </div>
            </>
          )
        : (
          <div className="tv-empty">
            <div className="tv-empty-title">{eventWindow.hasMore ? t('loading') : t('empty.title')}</div>
            <div className="tv-empty-hint">{t('empty.hint')}</div>
          </div>
        )}
      {selection !== null && heading !== null && (
        <div className="tv-detail">
          <div className="tv-detail-head">
            <span
              className="tv-dot"
              style={{
                ['--tv-dot' as string]: selection.kind === 'phase'
                  ? PHASE_COLORS[selection.phase]
                  : selection.kind === 'request' || selection.kind === 'conversation'
                    ? 'var(--tv-cat-llm)'
                    : 'var(--tv-cat-other)',
              }}
            />
            <span className="tv-detail-title">{heading.title}</span>
            <span className="tv-label-meta">{heading.subtitle}</span>
            <button
              type="button"
              className="tv-detail-close"
              title={t('detail.close')}
              onClick={() => { setSelection(null) }}
            >
              ×
            </button>
          </div>
          <div className="tv-detail-body">
            <DetailBody selection={selection} model={model} now={now} t={t} onSelect={select} />
          </div>
        </div>
      )}
    </div>
  )
}

/** One summary card in the header grid. */
function SummaryCard({ label, value, title }: { label: string; value: string; title?: string }): JSX.Element {
  return (
    <div className="tv-card" title={title}>
      <span className="tv-card-label">{label}</span>
      <span className="tv-card-value">{value}</span>
    </div>
  )
}

/** The sticky axis shared by every row. */
function Axis({ layout }: { layout: ChartLayout }): JSX.Element {
  return (
    <div className="tv-axis">
      <div className="tv-axis-spacer" />
      <div className="tv-axis-track">
        {layout.ticks.map((tick, index) => (
          <span key={`${tick.percent}-${index}`}>
            <span className="tv-tick" data-major={tick.major ? 'true' : 'false'} style={{ left: `${tick.percent}%` }} />
            <span
              className="tv-tick-label"
              data-align={tick.percent > 88 ? 'right' : undefined}
              style={{ left: `${tick.percent}%` }}
            >
              {tick.label}
            </span>
          </span>
        ))}
      </div>
      <div className="tv-axis-spacer" />
    </div>
  )
}

/** One turn: a sticky group header followed by its requests (unless collapsed). */
function TurnRows({
  turn,
  layout,
  now,
  collapsed,
  selection,
  onToggle,
  onSelect,
  t,
  toolsOnly,
}: {
  turn: TurnModel
  layout: ChartLayout
  now: number
  collapsed: boolean
  selection: Selection | null
  onToggle: () => void
  onSelect: (selection: Selection) => void
  t: Translate
  toolsOnly: boolean
}): JSX.Element {
  const end = turn.end ?? now
  const toolCount = turn.requests.reduce((sum, request) => sum + request.tools.length, 0)
  const turnSelected = selection !== null && selection.kind === 'turn' && selection.turn === turn.turn
  return (
    <>
      <div
        className="tv-row"
        data-clickable="true"
        data-kind="turn"
        data-selected={turnSelected ? 'true' : undefined}
        onClick={onToggle}
        title={turn.userText ?? undefined}
      >
        <div className="tv-row-label">
          <span className="tv-caret" data-open={collapsed ? 'false' : 'true'}>▶</span>
          <span className="tv-label-name">{fill(t('row.turn'), { n: turn.turn })}</span>
        </div>
        <div className="tv-track">
          <Gridlines layout={layout} />
          <span
            className="tv-turn-bar"
            data-running={turn.end === undefined ? 'true' : undefined}
            style={layout.mode === 'bars' ? { left: '0%', width: '100%' } : layout.place(turn.start, end)}
            title={`${formatDuration(end - turn.start)} · ${fill(t('row.toolsOfStep'), { calls: toolCount })}`}
          />
        </div>
        <div className="tv-row-dur">{formatDuration(end - turn.start)}</div>
      </div>
      {!collapsed && turn.requests.map(request => (
        <RequestRows
          key={`request-${request.turn}-${request.step}`}
          request={request}
          layout={layout}
          now={now}
          selection={selection}
          onSelect={onSelect}
          t={t}
          toolsOnly={toolsOnly}
        />
      ))}
      {!collapsed && turn.requests.length === 0 && (
        <div className="tv-hint">{t('status.waiting')}…</div>
      )}
    </>
  )
}
