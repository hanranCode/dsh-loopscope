#!/usr/bin/env node
/**
 * Offline self-check for the browser artifact and the event parser.
 *
 * 1. Evaluates `lib/client.js` against a fake module-loader shim and a fake
 *    `require` to prove the closure factory registers the right id and exports
 *    the Cordis plugin surface.
 * 2. Bundles `src/client/model.ts` for Node and replays a real durable Session
 *    log (`$DSH_SESSION_LOG`, the newest log under `$DSH_HOME/sessions`, or the
 *    committed fixture) to
 *    prove the parser finds turns, requests, tool calls, usage, and axis ticks.
 *
 * Usage: node scripts/selfcheck.mjs [path/to/session.v4.jsonl.zstd]
 */
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const require = createRequire(import.meta.url)
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

function loadEsbuild() {
  if (process.env.DSH_ESBUILD !== undefined) return require(process.env.DSH_ESBUILD)
  try {
    return require('esbuild')
  } catch {}
  const checkout = process.env.DSH_CHECKOUT ?? '/Users/ranhan/Documents/private-worksapce/open-source/deepseek-harness'
  const store = join(checkout, 'node_modules', '.pnpm')
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

let failures = 0
function check(label, condition, detail = '') {
  if (condition) {
    console.log(`  ok   ${label}${detail === '' ? '' : ` — ${detail}`}`)
  } else {
    failures += 1
    console.log(`  FAIL ${label}${detail === '' ? '' : ` — ${detail}`}`)
  }
}

// ---------------------------------------------------------------- artifact
const artifact = readFileSync(join(root, 'lib', 'client.js'), 'utf8')
check('bundle registers through window.__ModuleLoader__.load', artifact.startsWith('window.__ModuleLoader__.load('))
check('bundle id is the package name', artifact.includes('id: "dsh-loopscope"'))
const requires = [...new Set([...artifact.matchAll(/require\(["']([^"']+)["']\)/g)].map(match => match[1]))]
check('bundle imports only platform modules', requires.every(spec => ['react', 'react/jsx-runtime'].includes(spec)), requires.join(', '))

let registered = null
const g = globalThis
g.window = {
  __ModuleLoader__: {
    load(entry) { registered = entry },
  },
}
// Minimal React surface: the factory only wires components, it does not render them.
const reactStub = {
  useState: () => [undefined, () => {}],
  useEffect: () => {},
  useMemo: (factory) => factory(),
  useCallback: (callback) => callback,
  useRef: () => ({ current: null }),
}
const requireStub = spec => spec === 'react' ? reactStub : { jsx: () => null, jsxs: () => null, Fragment: null }
Function('window', artifact)(g.window)
check('loader received a factory', registered !== null && typeof registered.factory === 'function')
const clientExports = registered.factory(requireStub)
check('exports.apply is a function', typeof clientExports.apply === 'function')
check('exports.inject names the required services',
  Array.isArray(clientExports.inject)
  && ['slots', 'sessions', 'sidebarRightTabs', 'sidebarRight', 'locale'].every(name => clientExports.inject.includes(name)),
  JSON.stringify(clientExports.inject))

const hostSource = readFileSync(join(root, 'lib', 'host.js'), 'utf8')
check('host face exports apply', /export\s+(?:function\s+apply|const\s+apply|{[^}]*apply)/.test(hostSource))

// ------------------------------------------------------------------- model
function sessionLog() {
  if (process.env.DSH_SESSION_LOG !== undefined) return process.env.DSH_SESSION_LOG
  if (process.argv[2] !== undefined) return process.argv[2]
  const sessions = join(homedir(), '.dsh', 'sessions')
  const files = []
  const walk = dir => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name)
      const info = statSync(path)
      if (info.isDirectory()) walk(path)
      else if (name.endsWith('.jsonl.zstd') || name.endsWith('.jsonl')) files.push({ path, mtime: info.mtimeMs })
    }
  }
  if (existsSync(sessions)) {
    walk(sessions)
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

const logPath = sessionLog()
check('found a durable Session log', logPath !== undefined, logPath ?? 'none')
if (logPath !== undefined) {
  const text = readSessionText(logPath)
  const events = []
  for (const line of text.split('\n')) {
    if (line.trim() === '') continue
    try {
      const record = JSON.parse(line)
      if (record.type !== 'session' && typeof record.seq === 'number') events.push(record)
    } catch {}
  }
  const entries = events.map(event => ({ type: 'event', event }))
  const esbuild = loadEsbuild()
  const outfile = join(root, 'lib', '.selfcheck-model.cjs')
  esbuild.buildSync({
    entryPoints: [join(root, 'src', 'client', 'model.ts')],
    outfile,
    bundle: true,
    format: 'cjs',
    platform: 'node',
    logLevel: 'warning',
  })
  const modelModule = require(outfile)
  const lastTime = events.at(-1)?.time ?? Date.now()
  const model = modelModule.buildModel(entries, { now: lastTime, hasMore: false })
  const axis = modelModule.buildAxis(model, { compressed: true })
  console.log(`  info events=${entries.length} turns=${model.totals.turns} requests=${model.totals.requests} tools=${model.totals.toolCalls} failures=${model.totals.toolFailures} tokens=${model.totals.inputTokens}/${model.totals.outputTokens} span=${model.t1 - model.t0}ms ticks=${axis.ticks.length} segments=${axis.segments.length}`)
  check('parser found at least one turn', model.totals.turns > 0)
  check('parser found at least one request', model.totals.requests > 0)
  check('parser found tool calls', model.totals.toolCalls > 0)
  check('parser accounted tokens', model.totals.inputTokens > 0)
  check('every tool call settled or is open', model.turns.every(turn => turn.requests.every(request => request.tools.every(tool => tool.end !== undefined || tool.status === 'running'))))
  check('axis percent stays within bounds',
    model.turns.every(turn => turn.requests.every(request => {
      const left = axis.toPercent(request.start)
      return left >= 0 && left <= 100
    })))
  check('axis has ticks', axis.ticks.length > 0)
  // The very first turn/step boundary must map to the start of the chart.
  check('axis starts at 0%', Math.abs(axis.toPercent(model.t0)) < 0.001)

  // LOOP view: phases, carried context, developer signals.
  const firstRequest = model.turns[0]?.requests[0]
  const phases = firstRequest === undefined ? [] : modelModule.requestPhases(firstRequest)
  check('loop phases are context/decision/act/observe',
    phases.map(phase => phase.kind).join(',') === 'context,decision,act,observe',
    phases.map(phase => `${phase.kind}:${phase.ms}`).join(' '))
  check('loop phase durations are non-negative', phases.every(phase => phase.ms >= 0))
  const requests = model.turns.flatMap(turn => turn.requests)
  check('loop context carries route or tool roster facts',
    requests.some(request => request.context.toolCount !== undefined || request.context.contextWindow !== undefined),
    JSON.stringify(requests.find(request => request.context.toolCount !== undefined)?.context ?? {}))
  check('developer injections parsed',
    requests.some(request => request.context.developerNotes.length > 0),
    String(requests.filter(request => request.context.developerNotes.length > 0).length))
  check('developer signals parsed',
    requests.some(request => request.signals.length > 0),
    String(requests.reduce((sum, request) => sum + request.signals.length, 0)))
  check('result accounting parsed',
    requests.some(request => request.resultChars > 0),
    `chars=${requests.reduce((sum, request) => sum + request.resultChars, 0)} errors=${requests.reduce((sum, request) => sum + request.resultErrors, 0)}`)
  check('attempt accounting parsed',
    requests.every(request => Number.isInteger(request.attempts)))
  console.log(`  info loop signals: ${JSON.stringify(requests.flatMap(request => request.signals).slice(0, 5).map(signal => `${signal.kind}:${signal.label}`))}`)
  // A distilled summary for the report.
  for (const turn of model.turns) {
    console.log(`  turn ${turn.turn}: ${turn.requests.length} requests, ${turn.requests.reduce((sum, r) => sum + r.tools.length, 0)} tools, ${(turn.end ?? lastTime) - turn.start}ms`)
    for (const request of turn.requests.slice(0, 4)) {
      console.log(`    req #${request.index} step ${request.step}: ${(request.end ?? lastTime) - request.start}ms, ${request.tools.length} tools, firstToken=${request.firstToken !== undefined}, usage=${request.usage?.inputTokens ?? '-'}/${request.usage?.outputTokens ?? '-'}`)
    }
  }
  const { rmSync } = await import('node:fs')
  rmSync(outfile, { force: true })
}

console.log(failures === 0 ? '\nselfcheck passed' : `\nselfcheck FAILED (${failures})`)
process.exitCode = failures === 0 ? 0 : 1
