# Design notes

This document explains how LOOPScope is built, which trade-offs the views make,
and where to change things. The user-facing manual is [README.md](README.md)
(Chinese) and [README.en.md](README.en.md) (English).

## 1. Package shape

LOOPScope is one DeepSeek Harness bundle with two faces:

```
package.json          dsh.bundle.patch + dsh.client.platform
cordis.patch.yml      one Host row: id=loopscope, name=dsh-loopscope
lib/host.js           Node loader entry (no-op plugin)
lib/client.js         browser artifact in the client-modules closure-factory format
```

The Host row exists only so the web client's module scanner discovers the
package: `dsh-client-modules` enumerates live Loader entries whose package
declares `dsh.client`, serves each `exports["./client"]` artifact, and composes
`window.__DSH_BOOT__`. All behavior is in the browser bundle; there is no Host
RPC, storage, or background work.

`scripts/build.mjs` produces the browser artifact:

1. esbuild bundles `src/client/index.ts` as CommonJS with `react` and
   `react/jsx-runtime` external.
2. the output is wrapped in

   ```js
   window.__ModuleLoader__.load({ id: 'dsh-loopscope', factory: (require) => { ... } })
   ```

   which is exactly what the client loader expects (the injected `require`
   resolves the frozen platform module table).
3. the build fails if the bundle requires anything besides those platform
   modules — the product's client packages may not runtime-import one another.

The plugin exports `inject = ['slots', 'sessions', 'sidebarRightTabs',
'sidebarRight', 'locale']`; Cordis waits for those services, so activation order
is not a concern.

## 2. Data path

```
Session durable events (Host log)
  → client Session event window  (ctx.sessions.binding(id).eventSource)
  → buildModel(entries)          (src/client/model.ts)
  → views: duration bars / timeline / LOOP cards
  → bottom inspector            (selected element)
```

The model is a pure, memoized fold over the event window. It does not page
history by itself; the panel offers “load earlier history” when the window
reports `hasMore`.

Parsed event families and what they contribute:

| Event | Contribution |
|---|---|
| `turn/start`, `turn/end` | turn boundaries and end reason |
| `step/start`, `step/end` | one loop (one model request + its tools) |
| `user/message` | the turn's prompt |
| `system/message`, `developer/message` | prompt length, runtime injections (tool registry updates) |
| `request/header` | dispatch time, route, tool roster, header reason |
| `request/context` | context window, system-prompt update policy |
| `assistant/message` | settlement time, usage, compact stream (first token, generation window) |
| `assistant/attempt`, `llm/retry` | failed attempts and retry markers |
| `tool/call`, `tool/result` | tool span, arguments, result, error |
| `job/registered`, `job/settled` | precise async finish time |
| `approval/asked`, `approval/decided` | approval gate wait |
| `workspace/changes`, `deliverables/presented`, `team/task`, `team/member`, `subagent/catalog` | developer-signal badges attributed to the running loop |

## 3. The three views and their trade-off

The same model is rendered three ways because no single chart answers both
"when" and "what":

- **Duration bars (default).** Each row starts at the left edge; length is the
  activity's duration relative to the P90 of settled activity. Rationale: an
  agent Session with 150 loops is minutes long and seconds-wide per bar; a true
  time axis turns every bar into a hairline in a narrow sidebar. P90 instead of
  max keeps one long approval or command from flattening the rest; outliers clamp.
- **Timeline.** Real wall-clock positions with idle gaps over 4 s collapsed, so
  waiting cannot squeeze the work. Zoom and follow-latest are available.
- **LOOP.** One card per loop: a four-phase SVG ring (context, decision, act,
  observe) sized by phase duration, with chips and tool chips that select
  elements. It answers "what did this iteration do and what did the model see"
  rather than "when". The ring gives context a minimum visible share because
  pre-dispatch preparation is usually milliseconds.

Selection is a plain value (`src/client/selection.ts`) so the inspector can be a
pure lookup over the model: phase, conversation, tool, request, turn, approval.

## 4. LOOP phases

`requestPhases()` splits one loop:

- `context`: step start → request header (preparation)
- `decision`: header → first tool start or settlement (model call)
- `act`: first tool start → last tool end
- `observe`: max(last tool end, settlement) → step end

A loop without tools has a zero-length `act`; the ring skips zero-length arcs.

## 5. State and animation

- The panel keeps only presentation state: selected element, collapsed turns,
  filter toggles, axis mode, zoom, follow, playback. Model data is derived.
- Playback advances selection through loops on a 1.4 s interval. The interval is
  keyed on `playing` only and reads the latest loop list through a ref: a live
  Session rebuilds the model every second, and a dependency on the model would
  reset the timer forever.
- Motion is CSS only: marching-ants connector, pulsing running nodes, a spinning
  ring marker, and a glow on the active card. `prefers-reduced-motion` disables
  the decorative animation.

## 6. Styling and i18n

- Colors use the theme's semantic aliases (`--dsw-alias-*`) for surfaces, text
  and borders, so light/dark follow the GUI automatically.
- The chart needs categorical colors the theme does not define; the fixed
  palette (tool families, loop phases) is chosen to stay legible on both bases.
  Tokens are CSS custom properties on the panel root, so changing the palette is
  a local edit (`src/client/palette.ts` + `styles.ts`).
- Copy lives in `src/client/locales.ts`, registered through `ctx.locale` under
  the `loopscope` namespace with `zh` and `en` baselines; slots receive a bound
  `t` so a language switch updates without a reload.

## 7. Why data is read client-side

The alternative was a Host remote API that serializes trajectories. The client
event window already contains every timeline fact, so a remote would add
protocol surface, authorization, and latency without new information. Keeping
the plugin read-only also means it cannot corrupt a Session.

## 8. Testing strategy

- `npm run check`: evaluates `lib/client.js` against a fake module loader
  (artifact format, exported Cordis surface, platform-module boundary) and
  replays a real Session log or `fixtures/sample-session.jsonl` through the
  parser, asserting turns, loops, tokens, phases and signals.
- `npm run check:render`: server-renders the panel (zh/en) and the LOOP view with
  ReactDOMServer, asserting the structural landmarks of both views.
- End-to-end verification is done against a separate `dsh web` instance with
  Playwright (see the project history in the release notes); the repository's CI
  covers build + the two offline checks on Linux Node 20/22.

## 9. Extension points

- New phase facts: extend `LoopContextModel` / `RequestModel` in `model.ts`, then
  render them in the inspector (`panel.tsx`).
- New developer signals: extend `signalFor()` in `model.ts`; chips are rendered
  by `loop.tsx`.
- New tool categories: extend `TOOL_CATEGORIES` and `src/client/palette.ts`.
- New languages: add a dictionary in `locales.ts` and register it.
