# Contributing to LOOPScope

Thanks for helping make agent trajectories easier to understand. This is a
small, dependency-light browser plugin; most contributions are a few files of
TypeScript plus a locale entry.

## Ground rules

- Keep the browser bundle free of runtime imports other than the React platform
  modules. `npm run build` fails if an unexpected `require()` appears.
- Keep all copy bilingual (`src/client/locales.ts`, `zh` and `en`).
- Do not read Host state directly: the panel only consumes the Session event
  window through the injected `sessions` service.
- Prefer small, focused pull requests; describe the user-visible effect and
  attach a screenshot for UI changes.

## Development

Requirements: Node.js ≥ 20 and a DeepSeek Harness (DSH) installation to load
the plugin. The build itself only needs `npm install`.

```sh
npm install
npm run build        # writes lib/host.js and lib/client.js (committed artifacts)
npm run check        # artifact format + parser replay over a real session log or the fixture
npm run check:render # server-rendered zh/en panel and LOOP markup
npm test             # both checks
```

`npm run check` reads `$DSH_SESSION_LOG`, then the newest log under
`~/.dsh/sessions`, then `fixtures/sample-session.jsonl`. `npm run check:render`
uses the same resolution and writes `lib/render-*.html` previews.

To try a build in a running DSH profile:

```sh
# from this checkout
node scripts/build.mjs

# then, in DSH, install this directory once:
dsh plugin --profile web add /absolute/path/to/dsh-loopscope
dsh --profile web
```

The plugin row reloads when the Host rescans the link; a page refresh forces the
new bundle. `plugin_manager` users can install the directory the same way.

## Commit and PR checklist

- [ ] `npm run build` and `npm test` pass; `git status` includes the rebuilt
      `lib/` artifacts when source changed.
- [ ] New UI copy exists in both `zh` and `en`.
- [ ] No new runtime dependency in `dependencies` (use `devDependencies`).
- [ ] README/CHANGELOG updated for user-visible changes.
- [ ] Screenshot attached for visual changes (light theme is enough; dark is a
      bonus).

## Reporting bugs

Open an issue with: DSH version (`dsh --version`), browser, the view (LOOP /
duration bars / timeline), what you expected, what happened, and console errors
(DevTools → Console). For Session-specific problems, include the event types
visible in the offending LOOP (for example `tool/result` missing or an approval
that never settles).

## Release process (maintainers)

1. Bump `version` in `package.json` and add a `CHANGELOG.md` entry.
2. `npm run build && npm test`.
3. Commit, tag `vX.Y.Z`, push, and publish a GitHub release with the changelog
   section.
