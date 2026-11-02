/**
 * Durable Session event window → the trajectory model the panel draws.
 *
 * The panel intentionally reads the raw Session event window instead of the
 * conversation target snapshots: the trajectory is a timing/accounting view, and
 * every fact it needs (step boundaries, request headers, settled usage, tool
 * results, approvals) already exists as a durable, timestamped event. Reading
 * the window directly keeps the plugin independent of the chat and trajectory
 * feature packages.
 */

/** One durable Session event as the client event window carries it. */
export interface RawSessionEvent {
  readonly type: string
  readonly seq: number
  readonly time: number
  readonly data: any
}

/** One entry of the client Session event window. */
export interface SessionWindowEntry {
  readonly type: 'event' | 'transient'
  readonly event: RawSessionEvent & { readonly type: string }
}

/** Tool families, used for the bar palette and the legend. */
export type ToolCategory = 'fsRead' | 'fsWrite' | 'bash' | 'search' | 'web' | 'agent' | 'other'

/** One model request's token accounting. */
export interface UsageModel {
  readonly inputTokens: number
  readonly outputTokens: number
  readonly totalTokens?: number
  readonly cacheReadTokens?: number
  readonly cacheWriteTokens?: number
  readonly reasoningTokens?: number
}

/** One tool invocation, from `tool/call` to its `tool/result` (or `job/settled`). */
export interface ToolCallModel {
  readonly id: string
  readonly name: string
  readonly category: ToolCategory
  readonly arguments: string
  readonly start: number
  readonly end?: number
  readonly status: 'running' | 'completed' | 'failed' | 'cancelled'
  readonly error?: { readonly name: string; readonly code: string; readonly reason?: string }
  readonly resultText?: string
  /** `job/settled` reported a more precise finish than the result event. */
  readonly endFromJob?: boolean
}

/** One human approval gate observed inside a step. */
export interface ApprovalModel {
  readonly id: string
  readonly toolName?: string
  readonly asked: number
  readonly decided?: number
  readonly outcome?: string
}

/** One retry the provider policy scheduled inside a step. */
export interface RetryModel {
  readonly time: number
  readonly delayMs?: number
  readonly failure?: { readonly name?: string; readonly code?: string; readonly reason?: string }
}

/** One developer-facing signal observed while a loop ran (plugin-contributed session events). */
export interface LoopSignalModel {
  readonly kind: 'workspace' | 'deliverable' | 'team' | 'subagent' | 'tools' | 'other'
  readonly label: string
  readonly detail?: string
  readonly time: number
}

/** Context assembled for one loop: what the model was given and how. */
export interface LoopContextModel {
  /** Why the request header was (re)emitted: initial / change / series / resume. */
  readonly headerReason?: string
  /** Number of tools declared in the request header. */
  readonly toolCount?: number
  /** Model context capacity reported by the route. */
  readonly contextWindow?: number
  /** Requested output cap. */
  readonly maxTokens?: number
  readonly reasoningEffort?: string
  /** In-history / replace policy reported for the system prompt. */
  readonly systemPromptUpdate?: string
  /** Characters of the rendered system prompt, when this loop recorded one. */
  readonly systemChars?: number
  /** Non-message injections appended inside this loop (tool registry updates, …). */
  readonly developerNotes: readonly { readonly kind: string; readonly text: string }[]
}

/** One phase of the agent loop. */
export type LoopPhaseKind = 'context' | 'decision' | 'act' | 'observe'

/** One phase boundary (milliseconds from the loop start, absolute epoch `start`/`end`). */
export interface LoopPhase {
  readonly kind: LoopPhaseKind
  readonly start: number
  readonly end: number
  readonly ms: number
}

/** One model request (a Session step) and the tool calls it requested. */
export interface RequestModel {
  /** 1-based index of this request across the visible window. */
  readonly index: number
  readonly turn: number
  readonly step: number
  readonly start: number
  readonly end?: number
  /** A request still streaming when the model was built. */
  readonly open?: boolean
  readonly dispatchTime?: number
  readonly model?: string
  readonly provider?: string
  readonly messageTime?: number
  readonly firstToken?: number
  readonly lastToken?: number
  readonly usage?: UsageModel
  readonly interrupted?: boolean
  readonly outputChars: number
  readonly reasoningChars: number
  readonly assistantText: string
  readonly reasoningText: string
  readonly tools: ToolCallModel[]
  readonly approvals: ApprovalModel[]
  readonly retries: RetryModel[]
  /** What the model was given: header route, tool roster, prompt injection. */
  readonly context: LoopContextModel
  /** Model attempts that settled without a surface message before this one. */
  readonly attempts: number
  /** Characters of tool results delivered in this loop. */
  readonly resultChars: number
  /** Tool results that reported an error. */
  readonly resultErrors: number
  /** Developer-facing signals recorded while this loop ran. */
  readonly signals: LoopSignalModel[]
}

/**
 * Split one loop into its developer-facing phases.
 *
 * `context` is the pre-dispatch preparation, `decision` the model call from
 * dispatch to settlement, `act` the tool execution window, and `observe` the
 * remaining tail. A loop without tools has a zero-length `act`.
 * @param request - the loop to split.
 */
export function requestPhases(request: RequestModel): LoopPhase[] {
  const dispatch = request.dispatchTime ?? request.start
  const messageTime = request.messageTime ?? request.end ?? dispatch
  const tools = request.tools
  const firstTool = tools.reduce<number | undefined>((min, tool) => min === undefined ? tool.start : Math.min(min, tool.start), undefined)
  const lastToolEnd = tools.reduce<number | undefined>((max, tool) => {
    const end = tool.end
    return end === undefined ? max : max === undefined ? end : Math.max(max, end)
  }, undefined)
  const actStart = firstTool ?? messageTime
  const actEnd = lastToolEnd ?? actStart
  const observeStart = Math.max(actEnd, messageTime)
  const loopEnd = request.end ?? observeStart
  const contextEnd = Math.max(dispatch, request.start)
  return [
    { kind: 'context', start: request.start, end: contextEnd, ms: Math.max(0, contextEnd - request.start) },
    { kind: 'decision', start: contextEnd, end: Math.max(actStart, contextEnd), ms: Math.max(0, Math.max(actStart, contextEnd) - contextEnd) },
    { kind: 'act', start: actStart, end: actEnd, ms: Math.max(0, actEnd - actStart) },
    { kind: 'observe', start: observeStart, end: Math.max(loopEnd, observeStart), ms: Math.max(0, Math.max(loopEnd, observeStart) - observeStart) },
  ]
}

/** One turn and its requests. */
export interface TurnModel {
  readonly turn: number
  readonly start: number
  readonly end?: number
  readonly endReason?: string
  readonly userText?: string
  readonly requests: RequestModel[]
}

/** Aggregate facts shown in the summary cards. */
export interface TrajectoryTotals {
  readonly turns: number
  readonly requests: number
  readonly toolCalls: number
  readonly toolFailures: number
  readonly approvals: number
  readonly inputTokens: number
  readonly outputTokens: number
  readonly cacheReadTokens: number
  readonly cacheWriteTokens: number
  readonly averageFirstTokenMs?: number
  readonly averageGenerationMs?: number
  readonly activeMs: number
  readonly reasoningChars: number
}

/** The complete panel model. */
export interface TrajectoryModel {
  readonly t0: number
  readonly t1: number
  readonly turns: TurnModel[]
  readonly totals: TrajectoryTotals
  readonly eventCount: number
  readonly hasMore: boolean
}

const EMPTY_MODEL: TrajectoryModel = {
  t0: 0,
  t1: 0,
  turns: [],
  totals: {
    turns: 0,
    requests: 0,
    toolCalls: 0,
    toolFailures: 0,
    approvals: 0,
    inputTokens: 0,
    outputTokens: 0,
    cacheReadTokens: 0,
    cacheWriteTokens: 0,
    activeMs: 0,
    reasoningChars: 0,
  },
  eventCount: 0,
  hasMore: false,
}

/** Empty model: one stable object so the panel's memo does not churn. */
export function emptyModel(): TrajectoryModel {
  return EMPTY_MODEL
}

/** Tool name → palette family. Unknown tools fall back to `other`. */
const TOOL_CATEGORIES: Readonly<Record<string, ToolCategory>> = {
  read: 'fsRead',
  list: 'fsRead',
  glob: 'search',
  grep: 'search',
  code_search: 'search',
  write: 'fsWrite',
  edit: 'fsWrite',
  multi_edit: 'fsWrite',
  apply_patch: 'fsWrite',
  bash: 'bash',
  pwsh: 'bash',
  write_stdin: 'bash',
  job_output: 'bash',
  web_search: 'web',
  web_fetch: 'web',
  subagent: 'agent',
  subagent_fork: 'agent',
  spawn_teammate: 'agent',
  send_message: 'agent',
  wait_agent: 'agent',
  interrupt_agent: 'agent',
  list_agents: 'agent',
  workflow: 'agent',
  ask_user_question: 'other',
  todo_write: 'other',
}

/** Classify one tool name into its palette family. */
export function toolCategory(name: string): ToolCategory {
  const known = TOOL_CATEGORIES[name]
  if (known !== undefined) return known
  if (name.startsWith('team_task_') || name.startsWith('task_')) return 'agent'
  if (name.startsWith('schedule_')) return 'other'
  return 'other'
}

/** Whether one stream chunk carries a model output token (analogous to `isTokenDelta`). */
function chunkCarriesToken(chunk: any): boolean {
  if (chunk === null || typeof chunk !== 'object') return false
  switch (chunk.type) {
    case 'text-delta':
    case 'reasoning-delta':
      return typeof chunk.text === 'string' && chunk.text !== ''
    case 'tool-call-delta':
      return (typeof chunk.argumentsDelta === 'string' && chunk.argumentsDelta !== '')
        || typeof chunk.name === 'string'
    default:
      return false
  }
}

/**
 * Timing facts of one compact stream record list: first/last activity and the
 * first and last token-bearing fragment (the latency and generation window).
 */
function streamTiming(stream: any): { first?: number; last?: number; firstToken?: number; lastToken?: number } {
  if (!Array.isArray(stream) || stream.length === 0) return {}
  let first = Number.POSITIVE_INFINITY
  let last = Number.NEGATIVE_INFINITY
  let firstToken = Number.POSITIVE_INFINITY
  let lastToken = Number.NEGATIVE_INFINITY
  const touch = (time: number): void => {
    if (!Number.isFinite(time)) return
    if (time < first) first = time
    if (time > last) last = time
  }
  for (const record of stream) {
    if (record === null || typeof record !== 'object') continue
    if (record.type === 'chunk') {
      touch(record.time)
      if (chunkCarriesToken(record.chunk) && record.time < firstToken) firstToken = record.time
      if (chunkCarriesToken(record.chunk) && record.time > lastToken) lastToken = record.time
      continue
    }
    const time0 = Number(record.time0)
    touch(time0)
    const members: unknown[] = Array.isArray(record.type === 'tool-call-chunks' ? record.args : record.texts)
      ? (record.type === 'tool-call-chunks' ? record.args : record.texts)
      : []
    const dt: number[] = Array.isArray(record.dt) ? record.dt : []
    let time = time0
    for (let index = 0; index < members.length; index += 1) {
      if (index > 0) time += Number(dt[index - 1] ?? 0)
      touch(time)
      const member = members[index]
      const carries = record.type === 'tool-call-chunks'
        ? (typeof member === 'string' && member !== '') || (index === 0 && typeof record.name === 'string')
        : typeof member === 'string' && member !== ''
      if (carries) {
        if (time < firstToken) firstToken = time
        if (time > lastToken) lastToken = time
      }
    }
  }
  return {
    ...Number.isFinite(first) ? { first } : {},
    ...Number.isFinite(last) ? { last } : {},
    ...Number.isFinite(firstToken) ? { firstToken } : {},
    ...Number.isFinite(lastToken) ? { lastToken } : {},
  }
}

/** Concatenated text of one message's content parts, one bucket per part kind. */
function messageText(message: any): { text: string; reasoning: string } {
  let text = ''
  let reasoning = ''
  if (message === null || typeof message !== 'object' || !Array.isArray(message.content)) return { text, reasoning }
  for (const part of message.content) {
    if (part === null || typeof part !== 'object') continue
    if (part.type === 'text' && typeof part.text === 'string') text += part.text
    else if (part.type === 'reasoning' && typeof part.text === 'string') reasoning += part.text
  }
  return { text, reasoning }
}

/** Text excerpt of one tool result content. */
function toolResultText(message: any): string {
  if (message === null || typeof message !== 'object' || !Array.isArray(message.content)) return ''
  const parts: string[] = []
  for (const part of message.content) {
    if (part === null || typeof part !== 'object') continue
    if (part.type === 'text' && typeof part.text === 'string') parts.push(part.text)
    else if (part.type === 'image') parts.push('[image]')
  }
  return parts.join('\n')
}

/** Mutable parser state for one pass over the window. */
interface Draft {
  turns: TurnDraft[]
  byTurn: Map<number, TurnDraft>
  byRequest: Map<string, RequestDraft>
  byTool: Map<string, ToolCallModel & { mutable: true }>
  byApproval: Map<string, ApprovalModel & { mutable: true }>
  lastTime: number
  firstTurnStart: number | undefined
  /** The loop currently receiving events, kept through its trailing signals. */
  current?: RequestDraft
  /** Latest route facts, carried forward to loops whose context events are omitted. */
  lastContext: {
    contextWindow?: number
    systemPromptUpdate?: string
    toolCount?: number
    maxTokens?: number
    reasoningEffort?: string
  }
}

interface TurnDraft {
  turn: number
  start: number
  end?: number
  endReason?: string
  userText?: string
  requests: RequestDraft[]
}

interface RequestDraft {
  turn: number
  step: number
  start: number
  end?: number
  dispatchTime?: number
  model?: string
  provider?: string
  messageTime?: number
  firstToken?: number
  lastToken?: number
  usage?: UsageModel
  interrupted?: boolean
  assistantText?: string
  reasoningText?: string
  tools: (ToolCallModel & { mutable: true })[]
  approvals: (ApprovalModel & { mutable: true })[]
  retries: RetryModel[]
  seqStart: number
  seqEnd: number
  headerReason?: string
  toolCount?: number
  contextWindow?: number
  maxTokens?: number
  reasoningEffort?: string
  systemPromptUpdate?: string
  systemChars?: number
  developerNotes: { kind: string; text: string }[]
  attempts: number
  resultChars: number
  resultErrors: number
  signals: LoopSignalModel[]
}

function responseKey(turn: number, step: number): string {
  return `${turn}:${step}`
}

/**
 * Build the panel model from the Session event window.
 * @param entries - the current window, oldest first.
 * @param options.now - wall clock used for running requests (defaults to Date.now()).
 * @param options.hasMore - whether older history exists outside the window.
 */
export function buildModel(
  entries: readonly SessionWindowEntry[],
  options: { now?: number; hasMore?: boolean } = {},
): TrajectoryModel {
  if (entries.length === 0) return { ...EMPTY_MODEL, hasMore: options.hasMore === true }
  const now = options.now ?? Date.now()
  const draft: Draft = {
    turns: [],
    byTurn: new Map(),
    byRequest: new Map(),
    byTool: new Map(),
    byApproval: new Map(),
    lastTime: -Infinity,
    firstTurnStart: undefined,
    lastContext: {},
  }

  for (const entry of entries) {
    if (entry === null || typeof entry !== 'object' || entry.type !== 'event') continue
    const event = entry.event
    if (event === null || typeof event !== 'object') continue
    const time = Number(event.time)
    if (!Number.isFinite(time)) continue
    if (time > draft.lastTime) draft.lastTime = time
    if (draft.current !== undefined) draft.current.seqEnd = event.seq
    const data: any = event.data ?? {}
    switch (event.type) {
      case 'turn/start': {
        const turn = Number(data.turn)
        if (!Number.isFinite(turn)) break
        if (!draft.byTurn.has(turn)) {
          const created: TurnDraft = { turn, start: time, requests: [] }
          draft.turns.push(created)
          draft.byTurn.set(turn, created)
        }
        if (draft.firstTurnStart === undefined) draft.firstTurnStart = time
        break
      }
      case 'turn/end': {
        const turn = draft.byTurn.get(Number(data.turn))
        if (turn !== undefined) {
          turn.end = time
          if (typeof data.reason === 'string') turn.endReason = data.reason
        }
        break
      }
      case 'step/start': {
        const turn = draft.byTurn.get(Number(data.turn))
        if (turn === undefined) break
        const step = Number(data.step)
        const request: RequestDraft = {
          turn: turn.turn,
          step,
          start: time,
          tools: [],
          approvals: [],
          retries: [],
          seqStart: event.seq,
          seqEnd: event.seq,
          developerNotes: [],
          attempts: 0,
          resultChars: 0,
          resultErrors: 0,
          signals: [],
          ...draft.lastContext,
        }
        turn.requests.push(request)
        draft.byRequest.set(responseKey(turn.turn, step), request)
        draft.current = request
        break
      }
      case 'step/end': {
        const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step)))
        if (request !== undefined) request.end = time
        break
      }
      case 'user/message': {
        const turn = draft.turns.at(-1)
        if (turn === undefined || turn.end !== undefined) break
        if (turn.userText !== undefined) break
        const kind = data.source?.kind
        if (kind !== undefined && kind !== 'user') break
        const { text } = messageText(data)
        if (text !== '') turn.userText = text
        break
      }
      case 'request/header': {
        // Header records carry no turn field; they belong to the step in flight.
        const request = draft.current ?? latestRequest(draft, data.turn)
        if (request === undefined) break
        request.dispatchTime = time
        if (typeof data.reason === 'string') request.headerReason = data.reason
        const header = data.header
        const config = header?.config
        if (config !== null && typeof config === 'object') {
          if (typeof config.model === 'string') request.model = config.model
          if (typeof config.provider === 'string') request.provider = config.provider
          if (typeof config.maxTokens === 'number') request.maxTokens = config.maxTokens
          if (typeof config.reasoningEffort === 'string') request.reasoningEffort = config.reasoningEffort
          draft.lastContext.maxTokens = request.maxTokens
          draft.lastContext.reasoningEffort = request.reasoningEffort
        }
        if (Array.isArray(header?.tools)) {
          request.toolCount = header.tools.length
          draft.lastContext.toolCount = request.toolCount
        }
        break
      }
      case 'request/context': {
        const request = draft.current ?? latestRequest(draft, data.turn)
        if (request === undefined) break
        if (request.model === undefined && typeof data.model === 'string') request.model = data.model
        if (request.provider === undefined && typeof data.provider === 'string') request.provider = data.provider
        if (request.contextWindow === undefined && typeof data.contextWindow === 'number') request.contextWindow = data.contextWindow
        if (request.systemPromptUpdate === undefined && typeof data.systemPromptUpdate === 'string') request.systemPromptUpdate = data.systemPromptUpdate
        if (request.contextWindow !== undefined) draft.lastContext.contextWindow = request.contextWindow
        if (request.systemPromptUpdate !== undefined) draft.lastContext.systemPromptUpdate = request.systemPromptUpdate
        break
      }
      case 'assistant/message': {
        const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step)))
        if (request === undefined) break
        const { text, reasoning } = messageText(data.message)
        request.messageTime = time
        if (text !== '') request.assistantText = text
        if (reasoning !== '') request.reasoningText = reasoning
        const usage = data.usage
        if (usage !== null && typeof usage === 'object' && typeof usage.inputTokens === 'number') {
          request.usage = {
            inputTokens: usage.inputTokens,
            outputTokens: Number(usage.outputTokens ?? 0),
            ...typeof usage.totalTokens === 'number' ? { totalTokens: usage.totalTokens } : {},
            ...typeof usage.cacheReadTokens === 'number' ? { cacheReadTokens: usage.cacheReadTokens } : {},
            ...typeof usage.cacheWriteTokens === 'number' ? { cacheWriteTokens: usage.cacheWriteTokens } : {},
            ...typeof usage.reasoningTokens === 'number' ? { reasoningTokens: usage.reasoningTokens } : {},
          }
        }
        if (data.interrupted === true) request.interrupted = true
        const timing = streamTiming(data.stream)
        if (timing.firstToken !== undefined) request.firstToken = timing.firstToken
        if (timing.lastToken !== undefined) request.lastToken = timing.lastToken
        if (request.lastToken === undefined && timing.last !== undefined) request.lastToken = timing.last
        break
      }
      case 'tool/call': {
        const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step)))
          ?? latestRequest(draft, data.turn)
        if (request === undefined) break
        const id = String(data.callId ?? '')
        if (id === '' || draft.byTool.has(id)) break
        const name = String(data.name ?? 'tool')
        const call: ToolCallModel & { mutable: true } = {
          mutable: true,
          id,
          name,
          category: toolCategory(name),
          arguments: typeof data.arguments === 'string' ? data.arguments : JSON.stringify(data.arguments ?? ''),
          start: time,
          status: 'running',
        }
        request.tools.push(call)
        draft.byTool.set(id, call)
        break
      }
      case 'tool/result': {
        const id = String(data.toolCallId ?? data.message?.toolCallId ?? '')
        const call = draft.byTool.get(id)
        if (call === undefined) break
        call.end = Math.max(call.end ?? 0, time)
        const isError = data.message?.isError === true || (data.error !== undefined && data.error !== null)
        call.status = isError ? 'failed' : 'completed'
        const error = data.error
        if (error !== null && typeof error === 'object' && typeof error.code === 'string') {
          call.error = {
            name: String(error.name ?? 'Error'),
            code: error.code,
            ...typeof error.reason === 'string' ? { reason: error.reason } : {},
          }
        }
        const resultText = toolResultText(data.message)
        if (resultText !== '') call.resultText = resultText
        const owner = requestForTool(draft, id)
        if (owner !== undefined) {
          owner.resultChars += resultText.length
          if (isError) owner.resultErrors += 1
        }
        break
      }
      case 'job/settled': {
        const callId = String(data.toolCall?.callId ?? '')
        const call = draft.byTool.get(callId)
        if (call === undefined) break
        const finishedAt = Number(data.finishedAt)
        if (Number.isFinite(finishedAt) && finishedAt > (call.end ?? 0)) {
          call.end = finishedAt
          call.endFromJob = true
        }
        const status = data.status
        if (status === 'failed') call.status = 'failed'
        else if (status === 'cancelled') call.status = 'cancelled'
        else if (status === 'completed' && call.status === 'running') call.status = 'completed'
        const cause = data.cause
        if (call.error === undefined && cause !== null && typeof cause === 'object'
          && typeof cause.name === 'string' && typeof cause.code === 'string') {
          call.error = {
            name: cause.name,
            code: cause.code,
            ...typeof cause.reason === 'string' ? { reason: cause.reason } : {},
          }
        }
        break
      }
      case 'system/message': {
        const request = draft.current
        if (request === undefined) break
        const { text } = messageText(data.message)
        if (text !== '' && request.systemChars === undefined) request.systemChars = text.length
        break
      }
      case 'developer/message': {
        const request = draft.current
        if (request === undefined) break
        let additions = 0
        const texts: string[] = []
        const content: any[] = Array.isArray(data.message?.content) ? data.message.content : []
        for (const part of content) {
          if (part === null || typeof part !== 'object') continue
          if (part.type === 'tool-addition') additions += 1
          else if (part.type === 'text' && typeof part.text === 'string' && part.text !== '') texts.push(part.text)
        }
        if (additions > 0) request.developerNotes.push({ kind: 'tools', text: `+${additions}` })
        for (const text of texts) request.developerNotes.push({ kind: 'developer', text: oneLineOf(text, 240) })
        break
      }
      case 'assistant/attempt': {
        const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step))) ?? draft.current
        if (request !== undefined) request.attempts += 1
        break
      }
      case 'approval/asked': {
        const request = draft.current ?? latestRequest(draft, data.turn)
        if (request === undefined) break
        const id = String(data.id ?? '')
        if (id === '' || draft.byApproval.has(id)) break
        const approval: ApprovalModel & { mutable: true } = {
          mutable: true,
          id,
          asked: time,
          ...typeof data.toolName === 'string' ? { toolName: data.toolName } : {},
        }
        request.approvals.push(approval)
        draft.byApproval.set(id, approval)
        break
      }
      case 'approval/decided': {
        const approval = draft.byApproval.get(String(data.id ?? ''))
        if (approval === undefined) break
        approval.decided = time
        if (typeof data.outcome === 'string') approval.outcome = data.outcome
        break
      }
      case 'llm/retry': {
        const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step)))
          ?? draft.current ?? latestRequest(draft, data.turn)
        if (request === undefined) break
        request.retries.push({
          time,
          ...typeof data.delayMs === 'number' ? { delayMs: data.delayMs } : {},
          ...data.failure !== null && typeof data.failure === 'object'
            ? {
              failure: {
                ...typeof data.failure.name === 'string' ? { name: data.failure.name } : {},
                ...typeof data.failure.code === 'string' ? { code: data.failure.code } : {},
                ...typeof data.failure.reason === 'string' ? { reason: data.failure.reason } : {},
              },
            }
            : {},
        })
        break
      }
      default: {
        // Plugin-contributed session events (workspace changes, deliverables,
        // team tasks, subagents) carry no loop fields, so attribute each to the
        // loop that was running when it appeared.
        const signal = signalFor(event.type, data, time)
        if (signal !== undefined && draft.current !== undefined) draft.current.signals.push(signal)
        break
      }
    }
  }

  const t0 = draft.firstTurnStart ?? draft.turns[0]?.start ?? entries[0]?.event?.time ?? now
  const t1 = Math.max(draft.lastTime, t0 + 1)
  const turns: TurnModel[] = draft.turns.map((turn) => {
    const requests: RequestModel[] = turn.requests.map((request, index) => {
      // A running request's end is the live clock, so its bar grows while the model streams.
      const isOpen = request.end === undefined
      const end = isOpen ? Math.max(now, request.start + 1) : Math.max(request.end as number, request.start + 1)
      const tools = request.tools.map(({ mutable: _mutable, ...tool }) => tool)
      const approvals = request.approvals.map(({ mutable: _mutable, ...approval }) => approval)
      return {
        index: index + 1,
        turn: request.turn,
        step: request.step,
        start: request.start,
        end,
        ...isOpen ? { open: true } : {},
        ...request.dispatchTime !== undefined ? { dispatchTime: request.dispatchTime } : {},
        ...request.model !== undefined ? { model: request.model } : {},
        ...request.provider !== undefined ? { provider: request.provider } : {},
        ...request.messageTime !== undefined ? { messageTime: request.messageTime } : {},
        ...request.firstToken !== undefined ? { firstToken: request.firstToken } : {},
        ...request.lastToken !== undefined ? { lastToken: request.lastToken } : {},
        ...request.usage !== undefined ? { usage: request.usage } : {},
        ...request.interrupted === true ? { interrupted: true } : {},
        outputChars: (request.assistantText ?? '').length,
        reasoningChars: (request.reasoningText ?? '').length,
        assistantText: request.assistantText ?? '',
        reasoningText: request.reasoningText ?? '',
        tools,
        approvals,
        retries: request.retries,
        context: {
          ...request.headerReason !== undefined ? { headerReason: request.headerReason } : {},
          ...request.toolCount !== undefined ? { toolCount: request.toolCount } : {},
          ...request.contextWindow !== undefined ? { contextWindow: request.contextWindow } : {},
          ...request.maxTokens !== undefined ? { maxTokens: request.maxTokens } : {},
          ...request.reasoningEffort !== undefined ? { reasoningEffort: request.reasoningEffort } : {},
          ...request.systemPromptUpdate !== undefined ? { systemPromptUpdate: request.systemPromptUpdate } : {},
          ...request.systemChars !== undefined ? { systemChars: request.systemChars } : {},
          developerNotes: request.developerNotes,
        },
        attempts: request.attempts,
        resultChars: request.resultChars,
        resultErrors: request.resultErrors,
        signals: request.signals,
      }
    })
    return {
      turn: turn.turn,
      start: turn.start,
      ...turn.end !== undefined ? { end: turn.end } : {},
      ...turn.endReason !== undefined ? { endReason: turn.endReason } : {},
      ...turn.userText !== undefined ? { userText: turn.userText } : {},
      requests,
    }
  })

  let toolCalls = 0
  let toolFailures = 0
  let approvals = 0
  let inputTokens = 0
  let outputTokens = 0
  let cacheReadTokens = 0
  let cacheWriteTokens = 0
  let waitSum = 0
  let waitCount = 0
  let generationSum = 0
  let generationCount = 0
  let reasoningChars = 0
  let activeMs = 0
  for (const turn of turns) {
    for (const request of turn.requests) {
      activeMs += Math.max(0, (request.end ?? request.start) - request.start)
      reasoningChars += request.reasoningChars
      for (const tool of request.tools) {
        toolCalls += 1
        if (tool.status === 'failed' || tool.status === 'cancelled') toolFailures += 1
      }
      approvals += request.approvals.length
      if (request.usage !== undefined) {
        inputTokens += request.usage.inputTokens
        outputTokens += request.usage.outputTokens
        cacheReadTokens += request.usage.cacheReadTokens ?? 0
        cacheWriteTokens += request.usage.cacheWriteTokens ?? 0
      }
      const dispatch = request.dispatchTime ?? request.start
      if (request.firstToken !== undefined && request.firstToken >= dispatch) {
        waitSum += request.firstToken - dispatch
        waitCount += 1
      }
      if (request.firstToken !== undefined && request.lastToken !== undefined
        && request.lastToken >= request.firstToken) {
        generationSum += request.lastToken - request.firstToken
        generationCount += 1
      }
    }
  }

  return {
    t0,
    t1,
    turns,
    totals: {
      turns: turns.length,
      requests: turns.reduce((sum, turn) => sum + turn.requests.length, 0),
      toolCalls,
      toolFailures,
      approvals,
      inputTokens,
      outputTokens,
      cacheReadTokens,
      cacheWriteTokens,
      ...waitCount > 0 ? { averageFirstTokenMs: waitSum / waitCount } : {},
      ...generationCount > 0 ? { averageGenerationMs: generationSum / generationCount } : {},
      activeMs,
      reasoningChars,
    },
    eventCount: entries.length,
    hasMore: options.hasMore === true,
  }
}

/** Truncate a text to one short line. */
function oneLineOf(text: string, max: number): string {
  const line = text.split('\n').find(part => part.trim() !== '')?.trim() ?? ''
  return line.length > max ? `${line.slice(0, max - 1)}…` : line
}

/** The loop that owns one tool call id. */
function requestForTool(draft: Draft, id: string): RequestDraft | undefined {
  if (!draft.byTool.has(id)) return undefined
  for (const turn of draft.turns) {
    for (const request of turn.requests) {
      if (request.tools.some(tool => tool.id === id)) return request
    }
  }
  return undefined
}

/** Map one plugin-contributed session event to a developer-facing loop signal. */
function signalFor(type: string, data: any, time: number): LoopSignalModel | undefined {
  const signal = (kind: LoopSignalModel['kind'], label: string, detail?: string): LoopSignalModel => ({
    kind,
    label,
    ...detail === undefined || detail === '' ? {} : { detail },
    time,
  })
  switch (type) {
    case 'workspace/changes': {
      const paths = Array.isArray(data?.paths) ? data.paths : Array.isArray(data?.changes) ? data.changes : undefined
      return signal('workspace', '工作区变更', paths === undefined ? undefined : `${paths.length} 个文件`)
    }
    case 'deliverables/presented': {
      const files: any[] = Array.isArray(data?.files) ? data.files : []
      const first = files[0]?.path
      const name = typeof first === 'string' ? first.slice(first.lastIndexOf('/') + 1) : undefined
      return signal('deliverable', '产物展示', files.length === 0 ? undefined : `${files.length} 个文件${name === undefined ? '' : ` · ${name}`}`)
    }
    case 'team/task': {
      const task = data?.task
      const subject = typeof task?.subject === 'string' ? oneLineOf(task.subject, 40) : undefined
      const status = typeof task?.status === 'string' ? task.status : undefined
      return signal('team', '团队任务', [subject, status].filter(part => part !== undefined && part !== '').join(' · ') || undefined)
    }
    case 'team/member': {
      const member = data?.member
      const name = typeof member?.name === 'string' ? member.name : undefined
      const phase = typeof member?.phase === 'string' ? member.phase : undefined
      return signal('team', '团队成员', [name, phase].filter(part => part !== undefined && part !== '').join(' · ') || undefined)
    }
    case 'subagent/catalog': {
      const label = typeof data?.label === 'string' ? oneLineOf(data.label, 40) : undefined
      return signal('subagent', '子代理', label)
    }
    default:
      return undefined
  }
}

/** Most recently opened request of one turn, for events that name only the turn. */
function latestRequest(draft: Draft, turn: number): RequestDraft | undefined {
  const found = draft.byTurn.get(Number(turn))
  return found?.requests.at(-1)
}

/** One time segment of the waterfall axis (a span where work actually happened). */
export interface AxisSegment {
  readonly start: number
  readonly end: number
  readonly unitsStart: number
  readonly units: number
}

/** Piecewise time → position mapping for the waterfall rows. */
export interface TimeAxis {
  readonly t0: number
  readonly t1: number
  readonly totalUnits: number
  readonly compressed: boolean
  /** Position of an instant, in axis units (0 … totalUnits). */
  toUnits(time: number): number
  /** Position of an instant as a 0–100 percentage of the axis. */
  toPercent(time: number): number
  readonly segments: readonly AxisSegment[]
  readonly ticks: readonly { percent: number; label: string; major: boolean }[]
}

/** Gaps longer than this collapse in compressed mode, so idle waiting cannot flatten the chart. */
const COLLAPSE_GAP_MS = 4_000

/**
 * Build the horizontal mapping. In `compressed` mode every idle gap longer than
 * a few seconds shrinks to that same few seconds, keeping long think/wait
 * stretches from squeezing the actual work into a sliver; otherwise the axis is
 * strict wall-clock time.
 * @param model - trajectory model whose request spans define active segments.
 * @param options.compressed - whether to shorten long idle gaps.
 */
export function buildAxis(model: TrajectoryModel, options: { compressed?: boolean } = {}): TimeAxis {
  const compressed = options.compressed !== false
  const spans: { start: number; end: number }[] = []
  for (const turn of model.turns) {
    for (const request of turn.requests) {
      const start = request.start
      const end = Math.max(request.end ?? start, start)
      const previous = spans.at(-1)
      if (previous !== undefined && start <= previous.end) {
        spans[spans.length - 1] = { start: previous.start, end: Math.max(previous.end, end) }
      } else {
        spans.push({ start, end })
      }
    }
    if (turn.requests.length === 0) {
      // A turn with no request yet still owns a segment up to its end/live clock.
      const start = turn.start
      const end = Math.max(turn.end ?? Math.min(model.t1, start + 1), start)
      const previous = spans.at(-1)
      if (previous !== undefined && start <= previous.end) {
        spans[spans.length - 1] = { start: previous.start, end: Math.max(previous.end, end) }
      } else {
        spans.push({ start, end })
      }
    }
  }
  if (spans.length === 0) spans.push({ start: model.t0, end: Math.max(model.t1, model.t0 + 1) })

  const segments: AxisSegment[] = []
  let units = 0
  let previousEnd: number | undefined
  for (const span of spans) {
    if (previousEnd !== undefined) {
      const gap = Math.max(0, span.start - previousEnd)
      units += compressed ? Math.min(gap, COLLAPSE_GAP_MS) : gap
    }
    const duration = Math.max(0, span.end - span.start)
    segments.push({ start: span.start, end: span.end, unitsStart: units, units: duration })
    units += duration
    previousEnd = span.end
  }
  // Tail: time from the last active span to the window end (a running request or idle tail).
  if (previousEnd !== undefined && model.t1 > previousEnd) {
    const tail = model.t1 - previousEnd
    units += compressed ? Math.min(tail, COLLAPSE_GAP_MS) : tail
  }
  const totalUnits = Math.max(units, 1)

  const toUnits = (time: number): number => {
    if (!Number.isFinite(time)) return 0
    // Before the first segment: clamp to the start.
    if (time <= segments[0].start) return 0
    for (let index = 0; index < segments.length; index += 1) {
      const segment = segments[index]
      if (time <= segment.end) {
        return Math.min(segment.unitsStart + (time - segment.start), segment.unitsStart + segment.units)
      }
      const next = segments[index + 1]
      if (next === undefined) return segment.unitsStart + segment.units
      if (time < next.start) {
        // Inside a gap: place at its start, so bars never drift into the collapsed gap.
        return segment.unitsStart + segment.units
      }
    }
    const last = segments[segments.length - 1]
    return last.unitsStart + last.units
  }

  // Ticks: one per request boundary, thinned to at most ~8 labels AND to a
  // minimum horizontal distance, so compressed stretches cannot stack labels.
  const boundaries = [...new Set(segments.map(segment => segment.start))]
  const maxTicks = 8
  const step = Math.max(1, Math.ceil(boundaries.length / maxTicks))
  const MIN_TICK_DISTANCE = 12
  const ticks: { percent: number; label: string; major: boolean }[] = []
  let lastPercent = Number.NEGATIVE_INFINITY
  for (let index = 0; index < boundaries.length; index += step) {
    const time = boundaries[index]
    const percent = (toUnits(time) / totalUnits) * 100
    if (ticks.length > 0 && percent - lastPercent < MIN_TICK_DISTANCE) continue
    ticks.push({ percent, label: formatAxisOffset(time - model.t0), major: index === 0 })
    lastPercent = percent
  }
  return {
    t0: model.t0,
    t1: model.t1,
    totalUnits,
    compressed,
    toUnits,
    toPercent: (time: number) => (toUnits(time) / totalUnits) * 100,
    segments,
    ticks,
  }
}

/** Axis label: seconds with one decimal below a minute, else `m:ss`. */
function formatAxisOffset(ms: number): string {
  const value = Math.max(0, ms)
  const totalSeconds = value / 1000
  if (totalSeconds < 1) return '0s'
  if (totalSeconds < 60) return `+${totalSeconds.toFixed(totalSeconds < 10 ? 1 : 0)}s`
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = Math.round(totalSeconds - minutes * 60)
  // The leading `+` keeps an offset from the Session start from reading as wall-clock time.
  return `+${minutes}:${String(seconds).padStart(2, '0')}`
}

/** Bar geometry for one time span on the axis, clamped to the segment that contains it. */
export function spanGeometry(axis: TimeAxis, start: number, end?: number): { left: number; width: number; visible: boolean } {
  const safeEnd = end === undefined ? start + 1 : Math.max(end, start)
  const leftUnits = axis.toUnits(start)
  const rightUnits = axis.toUnits(safeEnd)
  const total = axis.totalUnits
  const left = (leftUnits / total) * 100
  const width = Math.max(Math.min(((rightUnits - leftUnits) / total) * 100, 100 - left), 0.35)
  return { left, width, visible: rightUnits > leftUnits || left < 100 }
}
