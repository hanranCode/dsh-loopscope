/**
 * Static-render harness for the panel component.
 *
 * Bundled by `scripts/render-test.mjs` and executed under Node with the
 * checkout's React copies. It renders the panel in its initial state against a
 * real Session event window, so a component crash or a broken render path is
 * caught before the plugin is installed into a profile.
 */
import * as React from 'react'
import { readFileSync } from 'node:fs'
import { renderToStaticMarkup } from 'react-dom/server'
import { TrajectoryPanel } from '../src/client/panel.tsx'
import { LoopChart } from '../src/client/loop.tsx'
import { buildModel } from '../src/client/model.ts'
import { en, zh } from '../src/client/locales.ts'
import { STYLES } from '../src/client/styles.ts'

declare const process: { argv: string[]; exitCode?: number }

interface Payload {
  entries: { type: 'event' | 'transient'; event: any }[]
  hasMore: boolean
  running: boolean
  now: number
  lang: 'zh' | 'en'
  view?: 'panel' | 'loop'
}

function makeTranslate(lang: 'zh' | 'en') {
  const dict: Record<string, string> = lang === 'zh' ? zh : en
  return (key: string, vars?: Record<string, string | number>): string => {
    const template = dict[key] ?? key
    if (vars === undefined) return template
    return template.replace(/\{(\w+)\}/g, (match: string, name: string) =>
      Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match)
  }
}

function Harness({ window, running, t }: { window: any; running: boolean; t: (key: string, vars?: Record<string, string | number>) => string }): JSX.Element {
  // The real renderer binds these hooks to the Session sources; the harness
  // mimics them, which is exactly the contract the component consumes.
  const useEvents = (selector: (value: any) => any): any => selector(window)
  const useSession = (selector: (value: { running: boolean }) => any): any => selector({ running })
  return React.createElement(TrajectoryPanel, {
    useEvents,
    useSession,
    sessionId: 'session-render-test',
    t,
    loadOlder: () => {},
  })
}

function main(): void {
  const file = process.argv[2]
  if (file === undefined) throw new Error('usage: node <bundle> <payload.json>')
  const payload = JSON.parse(readFileSync(file, 'utf8')) as Payload
  const t = makeTranslate(payload.lang)
  let html: string
  if (payload.view === 'loop') {
    // LoopChart is a pure component over the model, so it renders without hooks.
    const model = buildModel(payload.entries, { now: payload.now, hasMore: payload.hasMore })
    html = renderToStaticMarkup(React.createElement('div', { className: 'tv-root', 'data-dsh-loopscope': '' },
      React.createElement('div', { className: 'tv-chart', style: { flex: 1, minHeight: 0, overflow: 'auto' } },
        React.createElement(LoopChart, {
          model,
          now: payload.now,
          selection: null,
          activeLoopId: undefined,
          onSelect: () => {},
          t,
        }))))
  } else {
    html = renderToStaticMarkup(React.createElement(Harness, {
      window: { entries: payload.entries, hasMore: payload.hasMore, revision: 1 },
      running: payload.running,
      t,
    }))
  }
  process.stdout.write(JSON.stringify({ html, css: STYLES }))
}

main()
