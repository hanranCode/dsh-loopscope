/**
 * Browser face: registers the trajectory chart tab type, its body, and the
 * conversation-header action that reveals it.
 *
 * The panel reads the Session event window through the injected `sessions`
 * service. That window is the durable log the conversation targets are built
 * from, so timings, token usage, tool results, and approval gates are read from
 * one authoritative source without depending on any other feature package.
 */

import { NS, en, zh } from './locales.ts'
import { STYLE_ID, STYLES } from './styles.ts'
import { TrajectoryPanel } from './panel.tsx'
import { TrajectoryHeaderButton } from './header.tsx'

export const name = 'loopscope'

/** Services whose readiness gates this plugin; `slots` is the composition surface. */
export const inject = ['slots', 'sessions', 'sidebarRightTabs', 'sidebarRight', 'locale']

/** Registration identity of the tab implementation (and of its body/title seats). */
const TAB_ID = 'dsh-loopscope'
/** Tab-type discriminator a page is opened by: `ctx.sidebarRight.openTab('loopscope')`. */
const KIND = 'loopscope'

/** Snapshot shape of `SessionEventSource`, narrowed to what the panel consumes. */
interface SessionEventWindowLike {
  readonly entries: readonly { readonly type: 'event' | 'transient'; readonly event: any }[]
  readonly hasMore: boolean
  readonly revision: number
}

/** Stable empty window, used only when a Session binding is momentarily unavailable. */
const EMPTY_WINDOW: SessionEventWindowLike = Object.freeze({
  entries: Object.freeze([]),
  hasMore: false,
  revision: 0,
})

interface BindingLike {
  readonly session: { loadOlder?: () => Promise<boolean | void> }
  readonly eventSource: {
    getSnapshot(): SessionEventWindowLike
    subscribe(listener: () => void): () => void
  }
}

/**
 * Install the panel stylesheet once per page and return its disposer.
 * @returns a disposer that removes only the tag this call created.
 */
function injectStyles(): () => void {
  if (typeof document === 'undefined') return () => {}
  const existing = document.querySelector(`style[data-plugin-css="${STYLE_ID}"]`)
  if (existing !== null) return () => {}
  const tag = document.createElement('style')
  tag.dataset.plugin = 'dsh-loopscope'
  tag.dataset.pluginCss = STYLE_ID
  tag.textContent = STYLES
  document.head.appendChild(tag)
  return () => { tag.remove() }
}

/**
 * Mount the plugin.
 * @param ctx - the browser Cordis context (typed loosely: this linked package
 *   deliberately carries no runtime import from the product packages).
 */
export function apply(ctx: any): void {
  ctx.effect(() => injectStyles(), 'loopscope: styles')
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'loopscope: dictionaries')
  const t = ctx.locale.bind(NS)

  // Stage one: what the tab type is. Page type — no resource patterns — opened
  // by kind from the guide page, the strip's add control, or the header action.
  ctx.effect(() => ctx.sidebarRightTabs.register({
    id: TAB_ID,
    kind: KIND,
    title: () => t('tab.title'),
    guide: [{
      id: KIND,
      order: 240,
      title: () => t('tab.title'),
      description: () => t('tab.description'),
    }],
  }), 'loopscope: tab type')

  // Stage two: the tab body. The keyed seat dispatches every tab of this kind
  // here; the injected face exposes the Session event window as an observable
  // hook and the paging callback for older history.
  ctx.slots.inject('sidebar.right.pane.tab', () => ctx.slots.register({
    name: 'sidebar.right.pane.tab',
    key: TAB_ID,
    locale: NS,
    inject: (sessionId: string) => {
      const binding = ctx.sessions.binding(sessionId) as BindingLike | undefined
      if (binding === undefined) {
        return {
          hooks: { events: { getSnapshot: () => EMPTY_WINDOW, subscribe: () => () => {} } },
        }
      }
      return {
        hooks: { events: binding.eventSource },
        ...typeof binding.session.loadOlder === 'function'
          ? { loadOlder: () => binding.session.loadOlder?.() }
          : {},
      }
    },
  }, TrajectoryPanel))

  // Discovery point: a header action beside the Session title. Opening a page
  // that is already showing reveals it instead of creating a second tab.
  ctx.slots.inject('conversation.session.header.actions', () => ctx.slots.register({
    name: 'conversation.session.header.actions',
    id: TAB_ID,
    order: 40,
    locale: NS,
    inject: () => ({
      open: () => {
        try {
          ctx.sidebarRight.openTab(KIND)
        } catch (error) {
          ctx.logger.warn('loopscope: could not open the chart tab: %s', error)
        }
      },
    }),
  }, TrajectoryHeaderButton))
}
