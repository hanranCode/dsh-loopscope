#!/usr/bin/env node
/**
 * Build the two faces of the plugin without assuming a local `node_modules`:
 *
 * 1. `lib/host.js` — the Node loader entry (an ordinary ESM Cordis plugin).
 * 2. `lib/client.js` — the browser artifact, emitted in the exact closure-factory
 *    format `dsh-client-modules` serves: a `window.__ModuleLoader__.load({ id,
 *    factory })` call whose factory resolves `react` through the injected
 *    `require` (the frozen platform module table) and returns the plugin exports.
 *
 * esbuild is borrowed from the DeepSeek Harness checkout because this plugin is
 * a linked checkout of its own; `DSH_CHECKOUT` overrides the lookup, and
 * `DSH_ESBUILD` supplies an explicit esbuild entry instead.
 */
import { createRequire } from 'node:module'
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const require = createRequire(import.meta.url)

const DEFAULT_CHECKOUT = '/Users/ranhan/Documents/private-worksapce/open-source/deepseek-harness'
const ESBUILD_EXTERNALS = ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client']

/** Local esbuild entry: explicit override, then the checkout's pnpm store, then a plain install. */
function loadEsbuild() {
  if (process.env.DSH_ESBUILD !== undefined) return require(process.env.DSH_ESBUILD)
  try {
    return require('esbuild')
  } catch {
    // The plugin is a linked checkout with no node_modules of its own.
  }
  const checkout = process.env.DSH_CHECKOUT ?? DEFAULT_CHECKOUT
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
  throw new Error(
    `esbuild not found: set DSH_ESBUILD to an esbuild entry or DSH_CHECKOUT to the harness checkout (tried ${checkout})`,
  )
}

/** Wrap one bundled CommonJS body in the client module loader's closure factory. */
function moduleLoaderArtifact(id, body) {
  return `window.__ModuleLoader__.load({
  id: ${JSON.stringify(id)},
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
${body.split('\n').map(line => line === '' ? line : `    ${line}`).join('\n')}
    return module.exports;
  }
});
`
}

async function main() {
  const esbuild = loadEsbuild()
  const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'))
  const lib = join(root, 'lib')
  mkdirSync(lib, { recursive: true })

  // The Node face is a plain ESM module; no bundling, no imports to inline.
  await esbuild.build({
    entryPoints: [join(root, 'src', 'host.ts')],
    outfile: join(lib, 'host.js'),
    bundle: false,
    format: 'esm',
    platform: 'node',
    target: 'es2022',
    logLevel: 'warning',
  })

  // The browser face is one self-registering artifact. Only the frozen platform
  // modules stay external; a stray dsh runtime import fails the build below.
  const client = await esbuild.build({
    entryPoints: [join(root, 'src', 'client', 'index.ts')],
    bundle: true,
    write: false,
    format: 'cjs',
    platform: 'browser',
    target: 'es2020',
    jsx: 'automatic',
    external: ESBUILD_EXTERNALS,
    legalComments: 'none',
    logLevel: 'warning',
  })
  const [output] = client.outputFiles
  if (output === undefined) throw new Error('esbuild produced no client output')
  const body = output.text

  // Guard the plugin boundary: the browser artifact may only reach for platform
  // modules. A feature-to-feature value import would break boot composition.
  const requires = [...body.matchAll(/require\(["']([^"']+)["']\)/g)].map(match => match[1])
  const unexpected = [...new Set(requires)].filter(spec => !ESBUILD_EXTERNALS.includes(spec))
  if (unexpected.length > 0) {
    throw new Error(`client bundle reached for non-platform modules: ${unexpected.join(', ')}`)
  }

  writeFileSync(join(lib, 'client.js'), moduleLoaderArtifact(manifest.name, body))
  const bytes = (text) => `${(text.length / 1024).toFixed(1)} KiB`
  console.log(`built lib/host.js and lib/client.js (${bytes(body)} before the loader wrapper)`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
