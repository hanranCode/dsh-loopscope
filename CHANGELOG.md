# Changelog

All notable changes to this project are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] — 2026-11-02

First public release. LOOPScope (formerly an internal prototype named
`dsh-trajectory-viz`) is published as `dsh-loopscope`.

### Added

- **LOOP view** (`循环`): one card per agent-loop iteration with an interactive
  four-phase ring (context → decision → act → observe), phase chips, tool chips,
  a LOOP sequence ribbon, a playback walkthrough, and a loop inspector for
  conversation, context, decisions, tool calls and results.
- **Duration bars view** (`时长条`): per-row duration chart scaled to the P90 of
  settled activity so long Sessions stay readable in a narrow sidebar.
- **Timeline view** (`时间轴`): real-time waterfall with idle compression, zoom,
  and follow-latest.
- Summary header: active loop time, turns/steps, tool calls and failures, token
  in/out, first-token latency and generation time, cache hit rate.
- Developer signals inside loops: approvals, retries, failed attempts, workspace
  changes, deliverables, team tasks/members and subagents.
- zh/en dictionaries (follows the GUI language) and light/dark theme support.
- Offline checks: `npm run check` (artifact + parser replay) and
  `npm run check:render` (server-rendered zh/en panel and LOOP markup), with a
  committed Session fixture so both run without a DSH installation.
- GitHub Actions CI building both faces and checking committed artifacts.

### Fixed

- Request headers are attributed to the in-flight step, so first-token latency,
  tool roster and context-window facts are reported for the correct loop.
- Long-lived Sessions no longer report a multi-day wall-clock span as the
  headline duration; the card shows active loop time and keeps the wall-clock
  span in the tooltip.
- Playback keeps advancing while a live Session rebuilds the model every second.
