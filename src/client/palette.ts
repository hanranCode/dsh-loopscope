/**
 * Chart pigments shared by the waterfall rows, the LOOP rings, and the legend.
 *
 * The product theme owns semantic aliases for surfaces and text; it has no
 * categorical palette, so the data-visualization hues live here as fixed values
 * picked to stay legible on both the light and the dark base.
 */

import type { ToolCategory } from './model.ts'
import type { PhaseKind } from './selection.ts'

/** Bar palette per tool family. */
export const TOOL_COLORS: Readonly<Record<ToolCategory, string>> = {
  fsRead: 'var(--tv-cat-fs-read)',
  fsWrite: 'var(--tv-cat-fs-write)',
  bash: 'var(--tv-cat-bash)',
  search: 'var(--tv-cat-search)',
  web: 'var(--tv-cat-web)',
  agent: 'var(--tv-cat-agent)',
  other: 'var(--tv-cat-other)',
}

/** Phase order inside one agent loop. */
export const PHASE_ORDER: readonly PhaseKind[] = ['context', 'decision', 'act', 'observe']

/** Ring/chip palette per loop phase. */
export const PHASE_COLORS: Readonly<Record<PhaseKind, string>> = {
  context: 'var(--tv-cat-wait)',
  decision: 'var(--tv-cat-llm)',
  act: 'var(--tv-cat-bash)',
  observe: 'var(--tv-cat-fs-read)',
}
