#!/usr/bin/env node
/**
 * Static-render smoke test for the panel component.
 *
 * Replays a real Session log through `scripts/render-test-entry.tsx` and checks
 * the produced markup for the panel's structural landmarks, in both Chinese and
 * English copy, for a filled and an empty window. Exits non-zero on failure.
 *
 * Usage: node scripts/render-test.mjs [session.v4.jsonl.zstd]
 */
import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync, mkdtempSync } from 'node:fs'
import { homedir, tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CHECKOUT = process.env.DSH_CHECKOUT ?? '/Users/ranhan/Documents/private-worksapce/open-source/deepseek-harness'
// Prefer a local install (CI / contributors), else borrow the checkout's React.
let NODE_PATH = join(CHECKOUT, 'apps', 'web', 'node_modules')
try {
  require.resolve('react-dom/server')
  NODE_PATH = join(root, 'node_modules')
} catch {}

function loadEsbuild() {
  if (process.env.DSH_ESBUILD !== undefined) return require(process.env.DSH_ESBUILD)
  try {
    return require('esbuild')
  } catch {}
  const store = join(CHECKOUT, 'node_modules', '.pnpm')
  if (existsSync(store)) {
    const versions = readdirSync(store)
      .filter(name => /^esbuild@\d+\.\d+\.\d+$/.test(name))
      .sort((left, right) => {
        const parse = name => name.slice('esbuild@'.length).split('.').map(Number)
        const [a, b] = [parse(left), parse(right)]
        return (a[0] - b[0]) || (a[1] - b[1]) || (a[2] - b[2])
      })
    const newest = versions.at(-1)
    if (newest !== undefined) return require(join(store, newest, 'node_modules', 'esbuild'))
  }
  throw new Error('esbuild not found; set DSH_ESBUILD')
}

/** Newest durable Session log under the default DSH home. */
function sessionLog() {
  if (process.env.DSH_SESSION_LOG !== undefined) return process.env.DSH_SESSION_LOG
  if (process.argv[2] !== undefined) return process.argv[2]
  const dir = join(homedir(), '.dsh', 'sessions')
  const files = []
  const walk = dir => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      const info = statSync(path)
      if (info.isDirectory()) walk(path)
      else if (name.endsWith('.jsonl.zstd') || name.endsWith('.jsonl')) files.push({ path, mtime: info.mtimeMs })
    }
  }
  if (existsSync(dir)) {
    walk(dir)
    files.sort((left, right) => right.mtime - left.mtime)
    if (files[0] !== undefined) return files[0].path
  }
  // CI and fresh checkouts have no DSH home; the committed fixture keeps the
  // parser and render checks runnable without a local Session log.
  const fixture = join(root, 'fixtures', 'sample-session.jsonl')
  return existsSync(fixture) ? fixture : undefined
}

/** Read one Session log: zstd-compressed under DSH, plain JSONL for fixtures. */
function readSessionText(path) {
  if (path.endsWith('.zstd')) return execFileSync('zstd', ['-dc', path], { maxBuffer: 512 * 1024 * 1024 }).toString('utf8')
  return readFileSync(path, 'utf8')
}

/** Replay the log into the client event-window shape. */
function loadEntries(path) {
  const text = readSessionText(path)
  const entries = []
  let lastTime = Date.now()
  for (const line of text.split('\n')) {
    if (line.trim() === '') continue
    try {
      const record = JSON.parse(line)
      if (record.type === 'session' || typeof record.seq !== 'number') continue
      entries.push({ type: 'event', event: record })
      if (typeof record.time === 'number') lastTime = record.time
    } catch {}
  }
  return { entries, lastTime }
}

const esbuild = loadEsbuild()
const work = mkdtempSync(join(tmpdir(), 'tv-render-'))
const bundle = join(work, 'render.cjs')
esbuild.buildSync({
  entryPoints: [join(root, 'scripts', 'render-test-entry.tsx')],
  outfile: bundle,
  bundle: true,
  format: 'cjs',
  platform: 'node',
  jsx: 'automatic',
  target: 'es2022',
  external: ['react', 'react-dom', 'react-dom/server', 'react/jsx-runtime'],
  logLevel: 'warning',
})

const logPath = sessionLog()
let failures = 0
function check(label, condition, detail = '') {
  if (condition) console.log(`  ok   ${label}${detail === '' ? '' : ` — ${detail}`}`)
  else { failures += 1; console.log(`  FAIL ${label}${detail === '' ? '' : ` — ${detail}`}`) }
}

/** Theme-token stand-ins so the static preview looks like the dark Web GUI. */
const PREVIEW_TOKENS = `
  color-scheme: dark;
  --dsw-alias-bg-base: #121214;
  --dsw-alias-bg-layer-1: #1a1a1e;
  --dsw-alias-bg-layer-2: #202025;
  --dsw-alias-bg-layer-3: #26262c;
  --dsw-alias-label-primary: #ededf0;
  --dsw-alias-label-secondary: #b9b9c0;
  --dsw-alias-label-tertiary: #9a9aa2;
  --dsw-alias-label-caption: #85858d;
  --dsw-alias-border-l1: #2c2c33;
  --dsw-alias-border-l2: #26262c;
  --dsw-alias-border-l3: #3a3a44;
  --dsw-alias-border-l4: #45454f;
  --dsw-alias-interactive-bg-hover: #ffffff12;
  --dsw-alias-state-business-primary: #5b9bff;
  --dsw-alias-state-error-primary: #ff5d5d;
  --dsw-alias-state-warn-primary: #f5a524;
  --dsw-alias-markdown-code-block: #0d0d10;
  --dsw-font-xxxs-11: 11px/16px system-ui;
  --dsw-font-xxs-12: 12px/18px system-ui;
  --dsw-font-xs-13: 13px/19px system-ui;
  --dsw-font-s-14: 14px/20px system-ui;
  --dsw-font-family-mono: ui-monospace, SFMono-Regular, Menlo, monospace;
`

function previewDocument(lang, html, css) {
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>loopscope render test (${lang})</title>`
    + `<style>:root{${PREVIEW_TOKENS}}</style><style>${css}</style>`
    + `<style>body{margin:0;background:#121214;color:#ededf0;font-family:system-ui;height:100vh;display:flex;flex-direction:column}`
    + `.tv-root{flex:1;min-height:0;display:flex;flex-direction:column}.tv-chart{height:900px}</style></head><body>${html}</body></html>`
}

function render(payload) {
  const file = join(work, `payload-${Math.random().toString(36).slice(2)}.json`)
  writeFileSync(file, JSON.stringify(payload))
  try {
    return JSON.parse(execFileSync(process.execPath, [bundle, file], {
      env: { ...process.env, NODE_PATH },
      maxBuffer: 64 * 1024 * 1024,
    }).toString('utf8'))
  } catch (error) {
    failures += 1
    console.log(`  FAIL render threw — ${error.stderr?.toString?.().split('\n')[0] ?? error.message}`)
    return ''
  }
}

if (logPath === undefined) {
  check('found a durable Session log', false, 'none under ~/.dsh/sessions')
} else {
  const { entries, lastTime } = loadEntries(logPath)
  console.log(`  info replaying ${entries.length} events from ${logPath}`)
  for (const lang of ['zh', 'en']) {
    const rendered = render({ entries, hasMore: false, running: false, now: lastTime, lang })
    const html = rendered.html ?? ''
    check(`[${lang}] renders the panel root`, html.includes('tv-root'))
    check(`[${lang}] renders summary cards`, (html.match(/tv-card-value/g) ?? []).length >= 4)
    check(`[${lang}] renders a turn row`, html.includes('tv-turn-bar'))
    check(`[${lang}] renders request bars`, (html.match(/tv-seg/g) ?? []).length > 0)
    check(`[${lang}] renders tool bars`, (html.match(/tv-bar"/g) ?? []).length > 0)
    check(`[${lang}] renders the axis`, (html.match(/tv-tick-label/g) ?? []).length > 0)
    check(`[${lang}] renders the legend`, html.includes('tv-legend'))
    if (lang === 'zh') check('[zh] Chinese copy present', html.includes('轨迹图表'))
    if (lang === 'en') check('[en] English copy present', html.includes('Trajectory Chart'))
    // Persist the rendered markup for visual inspection in a browser.
    writeFileSync(join(root, 'lib', `render-${lang}.html`), previewDocument(lang, html, rendered.css ?? ''))
  }
  // LOOP view: pure component over the model, rendered here without hooks.
  const loopRendered = render({ entries, hasMore: false, running: false, now: lastTime, lang: 'zh', view: 'loop' })
  const loopHtml = loopRendered.html ?? ''
  check('loop view renders loop cards', (loopHtml.match(/tv-loop\b/g) ?? []).length > 0)
  check('loop view renders phase rings', (loopHtml.match(/tv-ring-arc/g) ?? []).length > 0)
  check('loop view renders phase chips', (loopHtml.match(/tv-chip-label/g) ?? []).length > 0)
  check('loop view renders tool chips', (loopHtml.match(/tv-tool-chip/g) ?? []).length > 0)
  check('loop view renders the loop ribbon', loopHtml.includes('tv-ribbon-bar'))
  check('loop view renders the conversation picker', loopHtml.includes('tv-loop-head'))
  writeFileSync(join(root, 'lib', 'render-loop.html'), previewDocument('zh', loopHtml, loopRendered.css ?? ''))
  const emptyRendered = render({ entries: [], hasMore: false, running: true, now: lastTime, lang: 'zh' })
  const empty = emptyRendered.html ?? ''
  check('empty window renders the empty state', empty.includes('tv-empty'))
  check('empty window hides the chart', !empty.includes('tv-chart'))
}

console.log(failures === 0 ? '\nrender-test passed' : `\nrender-test FAILED (${failures})`)
process.exitCode = failures === 0 ? 0 : 1
