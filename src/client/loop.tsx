/**
 * LOOP view: one card per agent-loop iteration, each drawn as an interactive
 * phase ring plus chips for conversation, context, decision, tool calls and
 * observation. It is the developer-facing counterpart of the waterfall: instead
 * of "when did it happen", it answers "what did the loop actually do".
 */

import { Fragment } from 'react'
import {
  requestPhases,
  type RequestModel,
  type TrajectoryModel,
  type ToolCallModel,
} from './model.ts'
import {
  fill,
  formatDuration,
  formatTokens,
  oneLine,
  toolDisplayName,
  type Translate,
} from './format.ts'
import { PHASE_COLORS, PHASE_ORDER, TOOL_COLORS } from './palette.ts'
import type { PhaseKind, Selection } from './selection.ts'

const RING_SIZE = 46
const RING_RADIUS = 17.5
const RING_STROKE = 4.6
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS
const RING_MIN_SHARE = 0.05

/** One arc of a loop ring: which phase, how long, where it starts. */
interface RingArc {
  readonly kind: PhaseKind
  readonly length: number
  readonly offset: number
}

/**
 * Turn one loop's phase durations into ring arcs. `context` gets a minimum
 * visible share because pre-dispatch preparation is usually a few milliseconds.
 */
function ringArcs(request: RequestModel): RingArc[] {
  const phases = requestPhases(request)
  const total = phases.reduce((sum, phase) => sum + phase.ms, 0)
  const weights = phases.map(phase =>
    phase.kind === 'context' && total > 0 ? Math.max(phase.ms, total * RING_MIN_SHARE) : phase.ms)
  const sum = weights.reduce((acc, weight) => acc + weight, 0)
  const arcs: RingArc[] = []
  let offset = 0
  for (let index = 0; index < phases.length; index += 1) {
    const share = sum > 0 ? (weights[index] as number) / sum : 1 / phases.length
    const span = RING_CIRCUMFERENCE * share
    const length = Math.max(0, span - 2.2)
    arcs.push({ kind: phases[index]!.kind, length, offset: offset + 1.1 })
    offset += span
  }
  return arcs
}

/** Ring glyph for one loop: four phase arcs, loop index in the middle. */
function LoopRing({
  request,
  index,
  selectedPhase,
  running,
  t,
  onPickPhase,
}: {
  request: RequestModel
  index: number
  selectedPhase: PhaseKind | undefined
  running: boolean
  t: Translate
  onPickPhase: (phase: PhaseKind) => void
}): JSX.Element {
  const arcs = ringArcs(request)
  const phases = requestPhases(request)
  return (
    <svg
      className="tv-ring"
      viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
      width={RING_SIZE}
      height={RING_SIZE}
      role="img"
      aria-label={`LOOP ${index}`}
    >
      <circle
        className="tv-ring-track"
        cx={RING_SIZE / 2}
        cy={RING_SIZE / 2}
        r={RING_RADIUS}
        fill="none"
        strokeWidth={RING_STROKE}
      />
      {arcs.map((arc, arcIndex) => arc.length <= 0 ? null : (
        <circle
          key={arc.kind}
          className="tv-ring-arc"
          data-on={selectedPhase === arc.kind ? 'true' : undefined}
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke={PHASE_COLORS[arc.kind]}
          strokeWidth={selectedPhase === arc.kind ? RING_STROKE + 2.4 : RING_STROKE}
          strokeDasharray={`${arc.length} ${RING_CIRCUMFERENCE - arc.length}`}
          strokeDashoffset={-arc.offset}
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
          onClick={(event) => {
            event.stopPropagation()
            onPickPhase(phases[arcIndex]!.kind)
          }}
        >
          <title>{`${t(phaseLabel(phases[arcIndex]!.kind))} · ${formatDuration(phases[arcIndex]!.ms)}`}</title>
        </circle>
      ))}
      {running && (
        <circle
          className="tv-ring-spin"
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RING_RADIUS}
          fill="none"
          stroke="var(--dsw-alias-label-primary)"
          strokeWidth={1.2}
          strokeDasharray="4 22"
          transform={`rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`}
        />
      )}
      <text className="tv-ring-index" x={RING_SIZE / 2} y={RING_SIZE / 2 + 3.5} textAnchor="middle">{index}</text>
    </svg>
  )
}

const PHASE_LABELS: Readonly<Record<PhaseKind, string>> = {
  context: 'phase.context',
  decision: 'phase.decision',
  act: 'phase.act',
  observe: 'phase.observe',
}

/** Localized phase name. */
function phaseLabel(kind: PhaseKind): string {
  return PHASE_LABELS[kind]
}

/** Short, phase-specific fact shown inside a phase chip. */
function phaseFact(kind: PhaseKind, request: RequestModel, t: Translate): string {
  switch (kind) {
    case 'context': {
      const input = request.usage?.inputTokens
      return input === undefined ? '—' : `入 ${formatTokens(input)}`
    }
    case 'decision': {
      const phases = requestPhases(request)
      const ms = phases.find(phase => phase.kind === 'decision')?.ms ?? 0
      return formatDuration(ms)
    }
    case 'act':
      return fill(t('loop.toolsCount'), { n: request.tools.length })
    case 'observe':
      return request.resultChars >= 1024
        ? `${formatTokens(request.resultChars)} 字`
        : `${request.resultChars} 字`
  }
}

/** One signal badge: workspace changes, deliverables, team tasks, subagents. */
function SignalBadge({ signal, t }: { signal: RequestModel['signals'][number]; t: Translate }): JSX.Element {
  const key = `signal.${signal.kind}`
  return (
    <span className="tv-signal" data-kind={signal.kind} title={signal.detail ?? t(key)}>
      <span className="tv-signal-kind">{t(key)}</span>
      {signal.detail !== undefined && <span className="tv-signal-detail">{signal.detail}</span>}
    </span>
  )
}

/** One tool chip inside a loop card. */
function ToolChip({
  tool,
  now,
  selected,
  onPick,
}: {
  tool: ToolCallModel
  now: number
  selected: boolean
  onPick: () => void
}): JSX.Element {
  const end = tool.end
  return (
    <button
      type="button"
      className="tv-tool-chip"
      data-status={tool.status}
      data-on={selected ? 'true' : undefined}
      style={{ ['--tv-tool' as string]: TOOL_COLORS[tool.category] }}
      title={`${tool.name} · ${end === undefined ? '…' : formatDuration(tool.end! - tool.start)}`}
      onClick={(event) => { event.stopPropagation(); onPick() }}
    >
      <span className="tv-tool-dot" />
      <span className="tv-tool-name">{toolDisplayName(tool.name)}</span>
      <span className="tv-tool-dur">{end === undefined ? '…' : formatDuration(end - tool.start)}</span>
    </button>
  )
}

/** One loop card. */
function LoopCard({
  request,
  turn,
  turnUserText,
  now,
  selection,
  active,
  onSelect,
  t,
}: {
  request: RequestModel
  turn: number
  turnUserText: string | undefined
  now: number
  selection: Selection | null
  active: boolean
  onSelect: (selection: Selection) => void
  t: Translate
}): JSX.Element {
  const loopMs = Math.max(0, (request.end ?? now) - request.start)
  const running = request.open === true
  const selectedPhase = selection !== null && selection.kind === 'phase'
    && selection.turn === request.turn && selection.step === request.step
    ? selection.phase
    : undefined
  const selectedLoop = selection !== null
    && (selection.kind === 'phase' || selection.kind === 'conversation' || selection.kind === 'request')
    && selection.turn === request.turn && selection.step === request.step
  const conversationSelected = selection !== null && selection.kind === 'conversation'
    && selection.turn === request.turn && selection.step === request.step
  const toolSelectedId = selection !== null && selection.kind === 'tool' ? selection.id : undefined
  const phases = requestPhases(request)
  const tokens = request.usage
  const meta = fill(t('loop.meta'), {
    duration: formatDuration(loopMs),
    input: formatTokens(tokens?.inputTokens),
    output: formatTokens(tokens?.outputTokens),
    tools: request.tools.length,
  })
  return (
    <article
      className="tv-loop"
      data-loop-id={`${request.turn}:${request.step}`}
      data-selected={selectedLoop || conversationSelected ? 'true' : undefined}
      data-active={active ? 'true' : undefined}
      data-running={running ? 'true' : undefined}
    >
      <span className="tv-loop-node" aria-hidden="true">{request.index}</span>
      <div className="tv-loop-card">
        <header
          className="tv-loop-head"
          onClick={() => { onSelect({ kind: 'conversation', turn: request.turn, step: request.step }) }}
          title={t('phase.conversation')}
        >
          <LoopRing
            request={request}
            index={request.index}
            selectedPhase={selectedPhase}
            running={running}
            t={t}
            onPickPhase={(phase) => { onSelect({ kind: 'phase', turn: request.turn, step: request.step, phase }) }}
          />
          <div className="tv-loop-titles">
            <div className="tv-loop-title">
              <span className="tv-loop-name">{t('loop.title')} {request.index}</span>
              <span className="tv-loop-sub">{fill(t('loop.sub'), { turn: request.turn, step: request.step })}</span>
              {request.index === 1 && <span className="tv-loop-badge">{t('phase.conversation')}</span>}
            </div>
            <div className="tv-loop-meta">{meta}</div>
          </div>
          <span className="tv-loop-status" data-status={running ? 'running' : request.interrupted === true ? 'interrupted' : undefined}>
            {running ? t('status.running') : request.interrupted === true ? t('status.interrupted') : ''}
          </span>
        </header>
        <div className="tv-loop-chips">
          <button
            type="button"
            className="tv-chip"
            data-on={conversationSelected ? 'true' : undefined}
            style={{ ['--tv-chip' as string]: 'var(--tv-cat-agent)' }}
            title={t('phase.conversation')}
            onClick={(event) => {
              event.stopPropagation()
              onSelect({ kind: 'conversation', turn: request.turn, step: request.step })
            }}
          >
            <span className="tv-chip-dot" />
            {t('phase.conversation')}
          </button>
          {PHASE_ORDER.map((kind) => {
            const phase = phases.find(candidate => candidate.kind === kind)
            const ms = phase?.ms ?? 0
            const on = selectedPhase === kind
            return (
              <button
                key={kind}
                type="button"
                className="tv-chip"
                data-on={on ? 'true' : undefined}
                data-empty={kind === 'act' && request.tools.length === 0 ? 'true' : undefined}
                style={{ ['--tv-chip' as string]: PHASE_COLORS[kind] }}
                title={`${t(phaseLabel(kind))} · ${t(`phase.${kind}.hint`)}`}
                onClick={(event) => {
                  event.stopPropagation()
                  onSelect({ kind: 'phase', turn: request.turn, step: request.step, phase: kind })
                }}
              >
                <span className="tv-chip-dot" />
                <span className="tv-chip-label">{t(phaseLabel(kind))}</span>
                <span className="tv-chip-fact">{phaseFact(kind, request, t)}</span>
              </button>
            )
          })}
        </div>
        <div className="tv-loop-signals">
          {request.retries.length > 0 && (
            <span className="tv-signal" data-kind="retry">
              <span className="tv-signal-kind">{t('decision.retries')}</span>
              <span className="tv-signal-detail">{request.retries.length}</span>
            </span>
          )}
          {request.attempts > 0 && (
            <span className="tv-signal" data-kind="attempt">
              <span className="tv-signal-kind">{t('decision.attempts')}</span>
              <span className="tv-signal-detail">{request.attempts}</span>
            </span>
          )}
          {request.approvals.length > 0 && (
            <span className="tv-signal" data-kind="approval">
              <span className="tv-signal-kind">{t('signal.approval')}</span>
              <span className="tv-signal-detail">{request.approvals.length}</span>
            </span>
          )}
          {request.signals.map((signal, index) => (
            <SignalBadge key={`${signal.kind}-${index}`} signal={signal} t={t} />
          ))}
        </div>
        <div className="tv-loop-tools">
          {request.tools.length === 0
            ? <span className="tv-loop-notools">{t('loop.noTools')}</span>
            : request.tools.map(tool => (
              <ToolChip
                key={tool.id}
                tool={tool}
                now={now}
                selected={toolSelectedId === tool.id}
                onPick={() => { onSelect({ kind: 'tool', id: tool.id }) }}
              />
            ))}
        </div>
        {turnUserText !== undefined && request.index === 1 && (
          <div className="tv-loop-user" title={turnUserText}>
            <span className="tv-loop-user-label">{t('conversation.user')}</span>
            <span className="tv-loop-user-text">{oneLine(turnUserText, 120)}</span>
          </div>
        )}
      </div>
    </article>
  )
}

/** The whole LOOP view: sequence ribbon, turn separators, and loop cards. */
export function LoopChart({
  model,
  now,
  selection,
  activeLoopId,
  onSelect,
  t,
}: {
  model: TrajectoryModel
  now: number
  selection: Selection | null
  activeLoopId: string | undefined
  onSelect: (selection: Selection) => void
  t: Translate
}): JSX.Element {
  const loops: { turn: number; turnUserText?: string; request: RequestModel }[] = []
  for (const turn of model.turns) {
    for (const request of turn.requests) {
      loops.push({
        turn: turn.turn,
        ...turn.userText === undefined ? {} : { turnUserText: turn.userText },
        request,
      })
    }
  }
  const maxDuration = loops.reduce(
    (max, loop) => Math.max(max, Math.max(0, (loop.request.end ?? now) - loop.request.start)),
    1,
  )
  let selectedLoopId: string | undefined
  if (selection !== null) {
    if (selection.kind === 'tool') {
      const owner = loops.find(loop => loop.request.tools.some(tool => tool.id === selection.id))
      selectedLoopId = owner === undefined ? undefined : `${owner.request.turn}:${owner.request.step}`
    } else if (selection.kind === 'phase' || selection.kind === 'conversation' || selection.kind === 'request') {
      selectedLoopId = `${selection.turn}:${selection.step}`
    }
  }
  return (
    <div className="tv-loopview">
      <div className="tv-ribbon" title={t('loop.ribbon')}>
        <span className="tv-ribbon-label">{t('loop.ribbon')}</span>
        <div className="tv-ribbon-strip">
          {loops.map(loop => {
            const duration = Math.max(0, (loop.request.end ?? now) - loop.request.start)
            const height = 3 + Math.round(Math.sqrt(duration / maxDuration) * 26)
            const id = `${loop.request.turn}:${loop.request.step}`
            return (
              <button
                key={id}
                type="button"
                className="tv-ribbon-bar"
                data-selected={selectedLoopId === id ? 'true' : undefined}
                data-running={loop.request.open === true ? 'true' : undefined}
                data-failed={loop.request.tools.some(tool => tool.status === 'failed') ? 'true' : undefined}
                style={{ height: `${height}px` }}
                title={`LOOP ${loop.request.index} · ${formatDuration(duration)}`}
                onClick={() => {
                  onSelect(loop.request.index === 1
                    ? { kind: 'conversation', turn: loop.request.turn, step: loop.request.step }
                    : { kind: 'phase', turn: loop.request.turn, step: loop.request.step, phase: 'decision' })
                }}
              />
            )
          })}
        </div>
      </div>
      <div className="tv-loop-list">
        {loops.map((loop, index) => {
          const previous = loops[index - 1]
          const newTurn = previous === undefined || previous.turn !== loop.turn
          return (
            <Fragment key={`${loop.request.turn}:${loop.request.step}`}>
              {newTurn && (
                <div className="tv-loop-turndiv">
                  <span>{fill(t('row.turn'), { n: loop.turn })}</span>
                </div>
              )}
              <LoopCard
                request={loop.request}
                turn={loop.turn}
                turnUserText={loop.turnUserText}
                now={now}
                selection={selection}
                active={activeLoopId === `${loop.request.turn}:${loop.request.step}`}
                onSelect={onSelect}
                t={t}
              />
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
