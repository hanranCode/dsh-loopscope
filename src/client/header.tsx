/**
 * Conversation-header action that opens (or reveals) the trajectory chart tab in
 * the right sidebar: the panel's discovery point beside the title actions.
 */

import type { Translate } from './format.ts'

/** Injected face supplied by the plugin's registration factory. */
export interface TrajectoryHeaderInjected {
  readonly open: () => void
}

/** Component props assembled by the slot renderer (session scope + injected face + locale). */
export interface TrajectoryHeaderButtonProps extends TrajectoryHeaderInjected {
  readonly t: Translate
}

/** A compact bar-chart glyph drawn in `currentColor`. */
function ChartGlyph(): JSX.Element {
  return (
    <svg className="tv-header-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2.5 13.5h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <rect x="3.4" y="8.2" width="2.2" height="4.1" rx="0.7" fill="currentColor" opacity="0.55" />
      <rect x="6.9" y="4.4" width="2.2" height="7.9" rx="0.7" fill="currentColor" />
      <rect x="10.4" y="6.6" width="2.2" height="5.7" rx="0.7" fill="currentColor" opacity="0.75" />
    </svg>
  )
}

/** Header action: one button, no owner data. */
export function TrajectoryHeaderButton({ t, open }: TrajectoryHeaderButtonProps): JSX.Element {
  return (
    <button type="button" className="tv-header-btn" data-dsh-loopscope="" title={t('header.title')} onClick={open}>
      <ChartGlyph />
      {t('header.label')}
    </button>
  )
}
