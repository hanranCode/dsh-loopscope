# Security policy

## Scope

LOOPScope is a client-side DeepSeek Harness (DSH) plugin. It adds no network
endpoint, no Host RPC, and no credential handling. The browser bundle:

- imports only the React platform modules (`react`, `react/jsx-runtime`);
- reads the current Session's durable event window through the injected
  `sessions` service (the same data the conversation already renders);
- renders event text with React text nodes (no `innerHTML`, no `eval`, no
  remote scripts or stylesheets).

Risks worth reporting are therefore behavioural: script injection through
session content, unexpected fetches, or a bundle that escapes the platform
module boundary.

## Reporting a vulnerability

Please use GitHub's private vulnerability reporting on this repository
(**Security** tab → **Report a vulnerability**). Do not open a public issue for
a suspected vulnerability. Include the DSH version, browser, reproduction steps,
and the smallest session log excerpt that reproduces the problem.

You can expect an initial acknowledgement within a few days. Fixes are released
as a patch version with a `CHANGELOG.md` entry and a GitHub security advisory
when appropriate.

## Supported versions

The latest `0.x` release receives security fixes. Because the plugin is loaded
from a linked checkout or a repository tag, pin the release tag (for example
`v0.1.0`) and update deliberately.

## Hardening tips for users

- Install only releases or tags you trust; the browser bundle runs with the
  same origin as the DSH web GUI.
- Review changes to `lib/client.js` if you install from a branch rather than a
  tag (`git diff vX.Y.Z..HEAD -- lib/`).
- Keep DSH itself current; the plugin targets `>=0.2.0 <0.3.0`.
