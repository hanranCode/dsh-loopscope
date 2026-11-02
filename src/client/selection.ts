/**
 * Selection identities shared by the chart views and the inspector.
 *
 * A selection is a plain JSON-shaped value so it can be compared cheaply, kept
 * in component state, and handed to the inspector without closures.
 */

/** One phase of the agent loop. */
export type PhaseKind = 'context' | 'decision' | 'act' | 'observe'

/** One picked element: a loop header (conversation), a loop phase, a tool, a turn or an approval. */
export type Selection =
  | { readonly kind: 'tool'; readonly id: string }
  | { readonly kind: 'request'; readonly turn: number; readonly step: number }
  | { readonly kind: 'turn'; readonly turn: number }
  | { readonly kind: 'approval'; readonly id: string }
  | { readonly kind: 'phase'; readonly turn: number; readonly step: number; readonly phase: PhaseKind }
  | { readonly kind: 'conversation'; readonly turn: number; readonly step: number }

/**
 * Compare two selections for identity; `null` matches only `null`.
 * @param left - one selection.
 * @param right - the other selection.
 */
export function sameSelection(left: Selection | null, right: Selection | null): boolean {
  if (left === null || right === null) return left === right
  if (left.kind !== right.kind) return false
  switch (left.kind) {
    case 'tool': return right.kind === 'tool' && left.id === right.id
    case 'request': return right.kind === 'request' && left.turn === right.turn && left.step === right.step
    case 'turn': return right.kind === 'turn' && left.turn === right.turn
    case 'approval': return right.kind === 'approval' && left.id === right.id
    case 'phase': return right.kind === 'phase' && left.turn === right.turn && left.step === right.step && left.phase === right.phase
    case 'conversation': return right.kind === 'conversation' && left.turn === right.turn && left.step === right.step
  }
}

/** Whether one selection points at a given loop (any of its elements). */
export function selectionLoopId(selection: Selection | null): string | undefined {
  if (selection === null) return undefined
  switch (selection.kind) {
    case 'request':
    case 'phase':
    case 'conversation':
      return `${selection.turn}:${selection.step}`
    case 'tool':
      return undefined
    case 'turn':
      return undefined
    case 'approval':
      return undefined
  }
}
