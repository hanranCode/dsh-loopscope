window.__ModuleLoader__.load({
  id: "dsh-loopscope",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var __defProp = Object.defineProperty;
    var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames = Object.getOwnPropertyNames;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __export = (target, all) => {
      for (var name2 in all)
        __defProp(target, name2, { get: all[name2], enumerable: true });
    };
    var __copyProps = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames(from))
          if (!__hasOwnProp.call(to, key) && key !== except)
            __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

    // src/client/index.ts
    var index_exports = {};
    __export(index_exports, {
      apply: () => apply,
      inject: () => inject,
      name: () => name
    });
    module.exports = __toCommonJS(index_exports);

    // src/client/locales.ts
    var NS = "loopscope";
    var zh = {
      "tab.title": "\u8F68\u8FF9\u56FE\u8868",
      "tab.description": "\u7528\u7011\u5E03\u56FE\u67E5\u770B\u6BCF\u4E00\u8F6E\u3001\u6BCF\u6B21\u8BF7\u6C42\u4E0E\u5DE5\u5177\u8C03\u7528\u7684\u8017\u65F6",
      "header.title": "\u6253\u5F00\u8F68\u8FF9\u56FE\u8868",
      "header.label": "\u8F68\u8FF9\u56FE\u8868",
      "summary.duration": "\u6D3B\u8DC3\u65F6\u957F",
      "summary.spanTitle": "\u4F1A\u8BDD\u8DE8\u5EA6 {span}\uFF08\u542B\u7A7A\u95F2\uFF09",
      "summary.turns": "\u8F6E\u6B21",
      "summary.turns.value": "{turns} \u8F6E \xB7 {steps} \u6B65",
      "summary.tools": "\u5DE5\u5177\u8C03\u7528",
      "summary.tools.value": "{calls} \u6B21 \xB7 {failed} \u5931\u8D25",
      "summary.tokens": "Token",
      "summary.tokens.value": "\u5165 {input} \xB7 \u51FA {output}",
      "summary.cache": "\u7F13\u5B58\u547D\u4E2D",
      "summary.cache.value": "{rate} \xB7 \u8BFB {read}",
      "summary.latency": "\u5E73\u5747\u9996\u5B57",
      "summary.latency.value": "{wait} \xB7 \u751F\u6210 {gen}",
      "toolbar.collapse": "\u6298\u53E0\u5168\u90E8",
      "toolbar.expand": "\u5C55\u5F00\u5168\u90E8",
      "toolbar.toolsOnly": "\u4EC5\u770B\u5DE5\u5177",
      "toolbar.allRows": "\u5168\u90E8\u884C",
      "toolbar.follow": "\u8DDF\u968F\u6700\u65B0",
      "toolbar.modeTime": "\u65F6\u95F4\u8F74",
      "toolbar.modeBars": "\u65F6\u957F\u6761",
      "toolbar.modeHint": '\u5728"\u65F6\u957F\u6761"\uFF08\u6309\u8017\u65F6\u6392\u5E8F\u3001\u4EFB\u4F55\u957F\u5EA6\u90FD\u6E05\u6670\uFF09\u4E0E"\u65F6\u95F4\u8F74"\uFF08\u771F\u5B9E\u65F6\u95F4\u7011\u5E03\uFF09\u4E4B\u95F4\u5207\u6362',
      "toolbar.compress": "\u538B\u7F29\u7A7A\u95F2",
      "toolbar.compressHint": "\u65F6\u95F4\u8F74\u6A21\u5F0F\u4E0B\u628A\u8D85\u8FC7 4 \u79D2\u7684\u7A7A\u95F2\u7B49\u5F85\u538B\u7F29\uFF0C\u907F\u514D\u957F\u7B49\u5F85\u6324\u6241\u5DE5\u4F5C\u533A",
      "toolbar.zoomIn": "\u653E\u5927\u65F6\u95F4\u8F74",
      "toolbar.zoomOut": "\u7F29\u5C0F\u65F6\u95F4\u8F74",
      "toolbar.fit": "\u9002\u5E94\u5BBD\u5EA6",
      "row.request": "\u8BF7\u6C42 {n}",
      "row.approval": "\u5BA1\u6279\u7B49\u5F85",
      "row.turn": "\u7B2C {n} \u8F6E",
      "row.step": "\u7B2C {turn}.{step} \u6B65",
      "row.toolsOfStep": "{calls} \u4E2A\u5DE5\u5177",
      "status.running": "\u8FD0\u884C\u4E2D",
      "status.completed": "\u5B8C\u6210",
      "status.failed": "\u5931\u8D25",
      "status.cancelled": "\u5DF2\u53D6\u6D88",
      "status.interrupted": "\u5DF2\u4E2D\u65AD",
      "status.waiting": "\u7B49\u5F85\u4E2D",
      "empty.title": "\u6682\u65E0\u8F68\u8FF9\u4E8B\u4EF6",
      "empty.hint": "\u53D1\u9001\u4E00\u6761\u6D88\u606F\u540E\uFF0C\u8FD9\u91CC\u4F1A\u6309\u8F6E\u6B21\u753B\u51FA\u8BF7\u6C42\u4E0E\u5DE5\u5177\u8C03\u7528\u7684\u7011\u5E03\u56FE\u3002",
      "loading": "\u52A0\u8F7D\u4E2D\u2026",
      "loadOlder": "\u52A0\u8F7D\u66F4\u65E9\u5386\u53F2",
      "detail.title.tool": "\u5DE5\u5177\u8C03\u7528",
      "detail.title.request": "\u6A21\u578B\u8BF7\u6C42",
      "detail.title.turn": "\u8F6E\u6B21",
      "detail.status": "\u72B6\u6001",
      "detail.duration": "\u8017\u65F6",
      "detail.start": "\u8D77\u59CB\u504F\u79FB",
      "detail.model": "\u6A21\u578B",
      "detail.usage": "Token \u7528\u91CF",
      "detail.wait": "\u9996\u5B57\u5EF6\u8FDF",
      "detail.speed": "\u8F93\u51FA\u901F\u5EA6",
      "detail.callId": "\u8C03\u7528 ID",
      "detail.args": "\u53C2\u6570",
      "detail.result": "\u7ED3\u679C",
      "detail.reasoning": "\u63A8\u7406\u4E0E\u8F93\u51FA",
      "detail.turnEnd": "\u7ED3\u675F\u539F\u56E0",
      "detail.close": "\u5173\u95ED",
      "detail.copy": "\u590D\u5236",
      "legend.llmWait": "\u7B49\u5F85\u9996\u5B57",
      "legend.llmGen": "\u6A21\u578B\u751F\u6210",
      "legend.fsRead": "\u8BFB\u53D6\u6587\u4EF6",
      "legend.fsWrite": "\u5199\u5165\u6587\u4EF6",
      "legend.bash": "\u547D\u4EE4",
      "legend.search": "\u641C\u7D22",
      "legend.web": "\u7F51\u7EDC",
      "legend.agent": "\u5B50\u4EE3\u7406/\u534F\u4F5C",
      "legend.other": "\u5176\u5B83",
      "legend.failed": "\u5931\u8D25",
      "detail.argsJson": "{json}",
      "tool.running": "\u8FD0\u884C\u4E2D\u2026",
      "hint.select": "\u70B9\u51FB\u4EFB\u610F\u8272\u6761\u67E5\u770B\u53C2\u6570\u4E0E\u7ED3\u679C",
      "hint.loadingOlder": "\u6B63\u5728\u52A0\u8F7D\u66F4\u65E9\u5386\u53F2\u2026",
      "hint.truncated": "\u7A97\u53E3\u5185\u53EA\u5C55\u793A\u6700\u8FD1 {n} \u6761\u4E8B\u4EF6",
      "usage.value": "\u5165 {input} \xB7 \u51FA {output} \xB7 \u7F13\u5B58\u8BFB {cacheRead}",
      "usage.total": "\u5408\u8BA1 {total}",
      "time.ms": "{n} \u6BEB\u79D2",
      "time.s": "{n} \u79D2",
      "time.m": "{m} \u5206 {s} \u79D2",
      "toolbar.modeLoop": "\u5FAA\u73AF",
      "toolbar.play": "\u64AD\u653E",
      "toolbar.pause": "\u6682\u505C",
      "loop.title": "LOOP",
      "loop.ribbon": "LOOP \u5E8F\u5217",
      "loop.sub": "\u7B2C {turn}.{step} \u6B65",
      "loop.meta": "{duration} \xB7 \u5165 {input} / \u51FA {output} \xB7 \u5DE5\u5177 {tools}",
      "loop.noTools": "\u65E0\u5DE5\u5177\u8C03\u7528",
      "loop.current": "\u5F53\u524D",
      "phase.context": "\u4E0A\u4E0B\u6587",
      "phase.decision": "\u51B3\u7B56",
      "phase.act": "\u6267\u884C",
      "phase.observe": "\u89C2\u5BDF",
      "phase.conversation": "\u5BF9\u8BDD",
      "phase.context.hint": "\u8F93\u5165\u4E0E\u63D0\u793A",
      "phase.decision.hint": "\u63A8\u7406\u4E0E\u9009\u5DE5\u5177",
      "phase.act.hint": "\u5DE5\u5177\u8C03\u7528",
      "phase.observe.hint": "\u7ED3\u679C\u56DE\u586B",
      "conversation.user": "\u7528\u6237",
      "conversation.assistant": "\u52A9\u624B",
      "conversation.reasoning": "\u601D\u8003",
      "conversation.empty": "\u672C\u8F6E\u6CA1\u6709\u65B0\u7684\u7528\u6237\u6D88\u606F",
      "signal.workspace": "\u5DE5\u4F5C\u533A\u53D8\u66F4",
      "signal.deliverable": "\u4EA7\u7269",
      "signal.team": "\u56E2\u961F",
      "signal.subagent": "\u5B50\u4EE3\u7406",
      "signal.tools": "\u5DE5\u5177\u6CE8\u518C",
      "signal.approval": "\u5BA1\u6279",
      "context.reason": "\u8BF7\u6C42\u539F\u56E0",
      "context.route": "\u8DEF\u7531",
      "context.inputTokens": "\u8F93\u5165 Token",
      "context.cache": "\u7F13\u5B58\u8BFB / \u5199",
      "context.window": "\u4E0A\u4E0B\u6587\u5360\u7528",
      "context.tools": "\u53EF\u7528\u5DE5\u5177",
      "context.maxTokens": "\u8F93\u51FA\u4E0A\u9650",
      "context.reasoningEffort": "\u63A8\u7406\u5F3A\u5EA6",
      "context.promptMode": "\u7CFB\u7EDF\u63D0\u793A\u7B56\u7565",
      "context.systemChars": "\u7CFB\u7EDF\u63D0\u793A\u957F\u5EA6",
      "context.userMessage": "\u672C\u8F6E\u7528\u6237\u6D88\u606F",
      "context.developerNotes": "\u5F00\u53D1\u6CE8\u5165",
      "decision.status": "\u72B6\u6001",
      "decision.ttft": "\u9996\u5B57\u5EF6\u8FDF",
      "decision.generation": "\u751F\u6210\u8017\u65F6",
      "decision.speed": "\u8F93\u51FA\u901F\u5EA6",
      "decision.outputTokens": "\u8F93\u51FA Token",
      "decision.reasoningChars": "\u63A8\u7406\u5B57\u6570",
      "decision.textChars": "\u56DE\u590D\u5B57\u6570",
      "decision.attempts": "\u5931\u8D25\u5C1D\u8BD5",
      "decision.retries": "\u91CD\u8BD5",
      "decision.toolsPicked": "\u6A21\u578B\u9009\u62E9\u7684\u5DE5\u5177",
      "act.tools": "\u5DE5\u5177\u8C03\u7528",
      "act.total": "\u5DE5\u5177\u603B\u8017\u65F6",
      "act.failed": "\u5931\u8D25",
      "observe.results": "\u7ED3\u679C\u56DE\u586B",
      "observe.chars": "\u7ED3\u679C\u5B57\u7B26",
      "observe.errors": "\u9519\u8BEF\u6570",
      "observe.next": "\u4E0B\u4E00\u6B65",
      "observe.nextLoop": "\u8FDB\u5165\u4E0B\u4E00 LOOP",
      "observe.turnEnd": "\u672C\u8F6E LOOP \u7ED3\u675F",
      "observe.noResult": "\uFF08\u65E0\u7ED3\u679C\uFF09",
      "loop.list": "LOOP \u5217\u8868",
      "loop.signals": "\u5F00\u53D1\u4FE1\u53F7",
      "loop.toolsCount": "{n} \u5DE5\u5177",
      "context.developerNote": "\u5F00\u53D1\u8005\u6D88\u606F",
      "hint.loop": "\u70B9\u51FB LOOP \u5934\u90E8\u6216\u8272\u73AF\u76F8\u4F4D\u67E5\u770B\u4E0A\u4E0B\u6587\u3001\u51B3\u7B56\u3001\u5DE5\u5177\u4E0E\u7ED3\u679C\uFF1B\u64AD\u653E\u6309\u94AE\u53EF\u81EA\u52A8\u5DE1\u89C8"
    };
    var en = {
      "tab.title": "Trajectory Chart",
      "tab.description": "Waterfall of turns, model requests, and tool calls with their timing",
      "header.title": "Open trajectory chart",
      "header.label": "Trajectory",
      "summary.duration": "Active time",
      "summary.spanTitle": "Session span {span} (including idle)",
      "summary.turns": "Turns",
      "summary.turns.value": "{turns} turns \xB7 {steps} steps",
      "summary.tools": "Tool calls",
      "summary.tools.value": "{calls} calls \xB7 {failed} failed",
      "summary.tokens": "Tokens",
      "summary.tokens.value": "{input} in \xB7 {output} out",
      "summary.cache": "Cache hits",
      "summary.cache.value": "{rate} \xB7 {read} read",
      "summary.latency": "First token",
      "summary.latency.value": "{wait} wait \xB7 {gen} gen",
      "toolbar.collapse": "Collapse all",
      "toolbar.expand": "Expand all",
      "toolbar.toolsOnly": "Tools only",
      "toolbar.allRows": "All rows",
      "toolbar.follow": "Follow latest",
      "toolbar.modeTime": "Timeline",
      "toolbar.modeBars": "Durations",
      "toolbar.modeHint": "Switch between duration bars (readable at any length) and a real time waterfall",
      "toolbar.compress": "Compress idle",
      "toolbar.compressHint": "In timeline mode, collapse idle stretches longer than 4s so waiting cannot flatten the work",
      "toolbar.zoomIn": "Zoom in",
      "toolbar.zoomOut": "Zoom out",
      "toolbar.fit": "Fit width",
      "row.request": "Request {n}",
      "row.approval": "Approval wait",
      "row.turn": "Turn {n}",
      "row.step": "Step {turn}.{step}",
      "row.toolsOfStep": "{calls} calls",
      "status.running": "Running",
      "status.completed": "Completed",
      "status.failed": "Failed",
      "status.cancelled": "Cancelled",
      "status.interrupted": "Interrupted",
      "status.waiting": "Waiting",
      "empty.title": "No trajectory events yet",
      "empty.hint": "Send a message and this panel draws the request and tool-call waterfall per turn.",
      "loading": "Loading\u2026",
      "loadOlder": "Load earlier history",
      "detail.title.tool": "Tool call",
      "detail.title.request": "Model request",
      "detail.title.turn": "Turn",
      "detail.status": "Status",
      "detail.duration": "Duration",
      "detail.start": "Start offset",
      "detail.model": "Model",
      "detail.usage": "Token usage",
      "detail.wait": "First-token latency",
      "detail.speed": "Output speed",
      "detail.callId": "Call ID",
      "detail.args": "Arguments",
      "detail.result": "Result",
      "detail.reasoning": "Reasoning & output",
      "detail.turnEnd": "End reason",
      "detail.close": "Close",
      "detail.copy": "Copy",
      "legend.llmWait": "First token",
      "legend.llmGen": "Generation",
      "legend.fsRead": "File read",
      "legend.fsWrite": "File write",
      "legend.bash": "Command",
      "legend.search": "Search",
      "legend.web": "Network",
      "legend.agent": "Subagent",
      "legend.other": "Other",
      "legend.failed": "Failed",
      "detail.argsJson": "{json}",
      "tool.running": "Running\u2026",
      "hint.select": "Click any bar to inspect arguments and results",
      "hint.loadingOlder": "Loading earlier history\u2026",
      "hint.truncated": "Window shows the latest {n} events only",
      "usage.value": "{input} in \xB7 {output} out \xB7 cache read {cacheRead}",
      "usage.total": "Total {total}",
      "time.ms": "{n} ms",
      "time.s": "{n} s",
      "time.m": "{m} m {s} s",
      "toolbar.modeLoop": "Loop",
      "toolbar.play": "Play",
      "toolbar.pause": "Pause",
      "loop.title": "LOOP",
      "loop.ribbon": "Loop sequence",
      "loop.sub": "Step {turn}.{step}",
      "loop.meta": "{duration} \xB7 {input} in / {output} out \xB7 {tools} tools",
      "loop.noTools": "No tool calls",
      "loop.current": "Current",
      "phase.context": "Context",
      "phase.decision": "Decision",
      "phase.act": "Act",
      "phase.observe": "Observe",
      "phase.conversation": "Conversation",
      "phase.context.hint": "Input & prompt",
      "phase.decision.hint": "Reasoning & tools",
      "phase.act.hint": "Tool calls",
      "phase.observe.hint": "Results",
      "conversation.user": "User",
      "conversation.assistant": "Assistant",
      "conversation.reasoning": "Thinking",
      "conversation.empty": "No new user message this turn",
      "signal.workspace": "Workspace change",
      "signal.deliverable": "Deliverable",
      "signal.team": "Team",
      "signal.subagent": "Subagent",
      "signal.tools": "Tool registry",
      "signal.approval": "Approval",
      "context.reason": "Header reason",
      "context.route": "Route",
      "context.inputTokens": "Input tokens",
      "context.cache": "Cache read / write",
      "context.window": "Context usage",
      "context.tools": "Tools available",
      "context.maxTokens": "Output cap",
      "context.reasoningEffort": "Reasoning effort",
      "context.promptMode": "System prompt mode",
      "context.systemChars": "System prompt length",
      "context.userMessage": "User message",
      "context.developerNotes": "Developer injections",
      "decision.status": "Status",
      "decision.ttft": "First token",
      "decision.generation": "Generation",
      "decision.speed": "Output speed",
      "decision.outputTokens": "Output tokens",
      "decision.reasoningChars": "Thinking chars",
      "decision.textChars": "Reply chars",
      "decision.attempts": "Failed attempts",
      "decision.retries": "Retries",
      "decision.toolsPicked": "Tools selected",
      "act.tools": "Tool calls",
      "act.total": "Tool time",
      "act.failed": "Failed",
      "observe.results": "Results",
      "observe.chars": "Result chars",
      "observe.errors": "Errors",
      "observe.next": "Next",
      "observe.nextLoop": "Continue to next LOOP",
      "observe.turnEnd": "Turn loop ended",
      "observe.noResult": "(no result)",
      "loop.list": "LOOP list",
      "loop.signals": "Signals",
      "loop.toolsCount": "{n} tools",
      "context.developerNote": "Developer message",
      "hint.loop": "Click a LOOP header or ring phase to inspect context, decisions, tools and results; Play walks the loops automatically"
    };

    // src/client/styles.ts
    var STYLE_ID = "dsh-loopscope/panel.css";
    var TOKENS = `
      --tv-panel: 1;
      --tv-label-width: 104px;
      --tv-dur-width: 62px;
      --tv-row-height: 22px;
      --tv-turn-height: 26px;
      --tv-radius: 6px;
      --tv-cat-fs-read: #10b981;
      --tv-cat-fs-write: #14b8a6;
      --tv-cat-bash: #f59e0b;
      --tv-cat-search: #84cc16;
      --tv-cat-web: #06b6d4;
      --tv-cat-agent: #8b5cf6;
      --tv-cat-other: #94a3b8;
      --tv-cat-failed: #ef4444;
      --tv-cat-llm: #3b82f6;
      --tv-cat-llm-soft: #93c5fd;
      --tv-cat-wait: #6b7280;
    `;
    var STYLES = `
    [data-dsh-loopscope] {
      ${TOKENS}
    }

    [data-dsh-loopscope].tv-root {
      display: flex;
      flex-direction: column;
      min-height: 0;
      min-width: 0;
      height: 100%;
      color: var(--dsw-alias-label-primary);
      font: var(--dsw-font-xs-13);
      background: var(--dsw-alias-bg-base);
    }

    [data-dsh-loopscope] .tv-head {
      display: flex;
      align-items: baseline;
      gap: 8px;
      padding: 8px 10px 2px;
      min-width: 0;
    }

    [data-dsh-loopscope] .tv-headline {
      font: var(--dsw-font-s-14);
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-dsh-loopscope] .tv-pill {
      flex: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 16px;
      padding: 0 7px;
      border-radius: 999px;
      font: var(--dsw-font-xxs-12);
      color: var(--dsw-alias-state-business-primary);
      background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent);
      corner-shape: round;
    }

    [data-dsh-loopscope] .tv-pill::before {
      content: '';
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: currentColor;
      corner-shape: round;
      animation: tv-pulse 1.2s ease-in-out infinite;
    }

    @keyframes tv-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.35; transform: scale(0.8); }
    }

    [data-dsh-loopscope] .tv-summary {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px;
      padding: 6px 10px 8px;
    }

    [data-dsh-loopscope] .tv-card {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
      padding: 6px 8px;
      border-radius: var(--tv-radius);
      background: var(--dsw-alias-bg-layer-2);
      box-shadow: 0 0 0 0.5px var(--dsw-alias-border-l1);
    }

    [data-dsh-loopscope] .tv-card-label {
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      white-space: nowrap;
    }

    [data-dsh-loopscope] .tv-card-value {
      font: var(--dsw-font-xxs-12);
      font-weight: 600;
      color: var(--dsw-alias-label-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-variant-numeric: tabular-nums;
    }

    [data-dsh-loopscope] .tv-toolbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px;
      padding: 0 10px 8px;
      border-bottom: 0.5px solid var(--dsw-alias-border-l2);
    }

    [data-dsh-loopscope] .tv-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 22px;
      padding: 0 8px;
      border: 0.5px solid var(--dsw-alias-border-l1);
      border-radius: var(--tv-radius);
      background: transparent;
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
      cursor: pointer;
      white-space: nowrap;
    }

    [data-dsh-loopscope] .tv-btn:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary);
    }

    [data-dsh-loopscope] .tv-btn[data-on='true'] {
      color: var(--dsw-alias-state-business-primary);
      border-color: color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, transparent);
      background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 10%, transparent);
    }

    [data-dsh-loopscope] .tv-btn:disabled {
      opacity: 0.45;
      cursor: default;
    }

    [data-dsh-loopscope] .tv-spacer {
      flex: 1;
    }
    [data-dsh-loopscope] .tv-segmented {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 2px;
      border: 0.5px solid var(--dsw-alias-border-l1);
      border-radius: 7px;
    }

    [data-dsh-loopscope] .tv-segmented .tv-btn {
      height: 18px;
      border: 0;
      border-radius: 5px;
      padding: 0 7px;
    }

    [data-dsh-loopscope] .tv-segmented .tv-btn[data-on='true'] {
      background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent);
    }


    [data-dsh-loopscope] .tv-chart {
      flex: 1 1 auto;
      min-height: 0;
      overflow: auto;
      overscroll-behavior: contain;
      padding-bottom: 6px;
    }

    [data-dsh-loopscope] .tv-inner {
      position: relative;
      min-width: 100%;
    }

    [data-dsh-loopscope] .tv-axis {
      position: sticky;
      top: 0;
      z-index: 3;
      display: grid;
      grid-template-columns: var(--tv-label-width) minmax(0, 1fr) var(--tv-dur-width);
      height: 18px;
      background: var(--dsw-alias-bg-base);
      border-bottom: 0.5px solid var(--dsw-alias-border-l2);
    }

    [data-dsh-loopscope] .tv-axis-spacer {
      position: sticky;
      left: 0;
      z-index: 4;
      background: var(--dsw-alias-bg-base);
    }

    [data-dsh-loopscope] .tv-axis-track {
      position: relative;
      overflow: hidden;
    }

    [data-dsh-loopscope] .tv-tick {
      position: absolute;
      bottom: 4px;
      height: 5px;
      width: 0.5px;
      background: var(--dsw-alias-border-l2);
    }

    [data-dsh-loopscope] .tv-tick[data-major='true'] {
      height: 9px;
      background: var(--dsw-alias-border-l3);
    }

    [data-dsh-loopscope] .tv-tick-label {
      position: absolute;
      top: 1px;
      margin-left: 3px;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      pointer-events: none;
    }

    [data-dsh-loopscope] .tv-tick-label[data-align='right'] {
      margin-left: 0;
      transform: translateX(calc(-100% - 4px));
    }

    [data-dsh-loopscope] .tv-rows {
      position: relative;
    }

    [data-dsh-loopscope] .tv-row {
      display: grid;
      grid-template-columns: var(--tv-label-width) minmax(0, 1fr) var(--tv-dur-width);
      height: var(--tv-row-height);
      align-items: stretch;
    }

    [data-dsh-loopscope] .tv-row[data-clickable='true'] {
      cursor: pointer;
    }

    [data-dsh-loopscope] .tv-row:hover .tv-row-label {
      color: var(--dsw-alias-label-primary);
    }

    [data-dsh-loopscope] .tv-row[data-selected='true'] .tv-track {
      background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 8%, transparent);
    }

    [data-dsh-loopscope] .tv-row-label {
      position: sticky;
      left: 0;
      z-index: 2;
      display: flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      padding: 0 4px 0 10px;
      background: var(--dsw-alias-bg-base);
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
      white-space: nowrap;
      overflow: hidden;
    }

    [data-dsh-loopscope] .tv-row[data-kind='turn'] {
      height: var(--tv-turn-height);
      position: sticky;
      top: 18px;
      z-index: 2;
      background: var(--dsw-alias-bg-base);
    }

    [data-dsh-loopscope] .tv-row[data-kind='turn'] .tv-row-label {
      color: var(--dsw-alias-label-primary);
      font-weight: 600;
    }

    [data-dsh-loopscope] .tv-label-name {
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    [data-dsh-loopscope] .tv-label-hint {
      margin-left: auto;
      flex: none;
      color: var(--dsw-alias-label-caption);
      font-variant-numeric: tabular-nums;
    }

    [data-dsh-loopscope] .tv-row-dur {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 8px;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
      overflow: hidden;
    }

    [data-dsh-loopscope] .tv-row[data-kind='turn'] .tv-row-dur {
      color: var(--dsw-alias-label-secondary);
    }

    [data-dsh-loopscope] .tv-label-meta {
      margin-left: auto;
      color: var(--dsw-alias-label-caption);
      font-variant-numeric: tabular-nums;
      flex: none;
    }

    [data-dsh-loopscope] .tv-caret {
      flex: none;
      width: 8px;
      color: var(--dsw-alias-label-caption);
      transition: transform 120ms ease;
    }

    [data-dsh-loopscope] .tv-caret[data-open='true'] {
      transform: rotate(90deg);
    }

    [data-dsh-loopscope] .tv-dot {
      flex: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      corner-shape: round;
      background: var(--tv-dot, var(--tv-cat-other));
    }

    [data-dsh-loopscope] .tv-track {
      position: relative;
      min-width: 0;
      border-left: 0.5px solid var(--dsw-alias-border-l1);
    }

    [data-dsh-loopscope] .tv-gridline {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 0.5px;
      background: color-mix(in srgb, var(--dsw-alias-border-l1) 55%, transparent);
      pointer-events: none;
    }

    [data-dsh-loopscope] .tv-bar {
      position: absolute;
      top: 5px;
      height: calc(var(--tv-row-height) - 10px);
      min-width: 3px;
      border-radius: 3px;
      background: var(--tv-bar, var(--tv-cat-other));
      color: #fff;
      font: var(--dsw-font-xxxs-11);
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 0 0 0.5px color-mix(in srgb, #000 18%, transparent) inset;
    }

    [data-dsh-loopscope] .tv-bar[data-selected='true'] {
      box-shadow: 0 0 0 1.5px var(--dsw-alias-label-primary);
      z-index: 1;
    }

    [data-dsh-loopscope] .tv-bar[data-status='failed'] {
      background: repeating-linear-gradient(
        135deg,
        var(--tv-cat-failed) 0 5px,
        color-mix(in srgb, var(--tv-cat-failed) 62%, #111) 5px 10px
      );
    }

    [data-dsh-loopscope] .tv-bar[data-status='cancelled'] {
      opacity: 0.55;
    }

    [data-dsh-loopscope] .tv-bar[data-running='true'] {
      animation: tv-bar-pulse 1.4s ease-in-out infinite;
    }

    @keyframes tv-bar-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.55; }
    }

    [data-dsh-loopscope] .tv-seg {
      position: absolute;
      top: 0;
      bottom: 0;
    }

    [data-dsh-loopscope] .tv-seg[data-seg='wait'] {
      background: var(--tv-cat-wait);
    }

    [data-dsh-loopscope] .tv-seg[data-seg='gen'] {
      background: var(--tv-cat-llm);
    }

    [data-dsh-loopscope] .tv-seg[data-seg='tail'] {
      background: var(--tv-cat-llm-soft);
    }

    [data-dsh-loopscope] .tv-bar[data-interrupted='true'] {
      background: repeating-linear-gradient(
        135deg,
        var(--tv-cat-llm) 0 6px,
        color-mix(in srgb, var(--tv-cat-llm) 40%, #111) 6px 12px
      );
    }

    [data-dsh-loopscope] .tv-bar-approval {
      position: absolute;
      top: 7px;
      height: calc(var(--tv-row-height) - 14px);
      min-width: 2px;
      border: 1px dashed var(--dsw-alias-label-caption);
      border-radius: 3px;
      background: color-mix(in srgb, var(--dsw-alias-label-caption) 16%, transparent);
    }

    [data-dsh-loopscope] .tv-turn-bar {
      position: absolute;
      top: 9px;
      height: 8px;
      min-width: 2px;
      border-radius: 3px;
      background: color-mix(in srgb, var(--dsw-alias-border-l3) 65%, transparent);
    }

    [data-dsh-loopscope] .tv-turn-bar[data-running='true'] {
      background: repeating-linear-gradient(
        90deg,
        color-mix(in srgb, var(--dsw-alias-state-business-primary) 45%, transparent) 0 6px,
        transparent 6px 12px
      );
    }

    [data-dsh-loopscope] .tv-retry-mark {
      position: absolute;
      top: 4px;
      bottom: 4px;
      width: 1.5px;
      background: var(--dsw-alias-state-warn-primary);
    }

    [data-dsh-loopscope] .tv-hint {
      padding: 4px 10px 2px;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
      padding: 6px 10px 8px;
      border-top: 0.5px solid var(--dsw-alias-border-l2);
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }

    [data-dsh-loopscope] .tv-legend-swatch {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      background: var(--tv-swatch, var(--tv-cat-other));
    }

    [data-dsh-loopscope] .tv-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      flex: 1;
      min-height: 140px;
      padding: 24px;
      text-align: center;
      color: var(--dsw-alias-label-caption);
    }

    [data-dsh-loopscope] .tv-empty-title {
      font: var(--dsw-font-s-14);
      font-weight: 600;
      color: var(--dsw-alias-label-secondary);
    }

    [data-dsh-loopscope] .tv-empty-hint {
      max-width: 260px;
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-detail {
      flex: none;
      max-height: 46%;
      display: flex;
      flex-direction: column;
      min-height: 0;
      border-top: 0.5px solid var(--dsw-alias-border-l2);
      background: var(--dsw-alias-bg-layer-1);
    }

    [data-dsh-loopscope] .tv-detail-head {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px 4px;
      border-bottom: 0.5px solid var(--dsw-alias-border-l1);
    }

    [data-dsh-loopscope] .tv-detail-title {
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-dsh-loopscope] .tv-detail-close {
      margin-left: auto;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      border: 0;
      border-radius: 4px;
      background: transparent;
      color: var(--dsw-alias-label-secondary);
      cursor: pointer;
      font-size: 13px;
      line-height: 1;
    }

    [data-dsh-loopscope] .tv-detail-close:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary);
    }

    [data-dsh-loopscope] .tv-detail-body {
      overflow: auto;
      min-height: 0;
      padding: 6px 10px 10px;
    }

    [data-dsh-loopscope] .tv-kv {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      gap: 2px 10px;
      margin-bottom: 8px;
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-kv dt {
      color: var(--dsw-alias-label-caption);
      white-space: nowrap;
    }

    [data-dsh-loopscope] .tv-kv dd {
      margin: 0;
      min-width: 0;
      color: var(--dsw-alias-label-secondary);
      overflow-wrap: anywhere;
      font-variant-numeric: tabular-nums;
    }

    [data-dsh-loopscope] .tv-section {
      margin-top: 8px;
    }

    [data-dsh-loopscope] .tv-section-title {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 3px;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-code {
      margin: 0;
      max-height: 190px;
      overflow: auto;
      padding: 6px 8px;
      border-radius: var(--tv-radius);
      background: var(--dsw-alias-markdown-code-block, var(--dsw-alias-bg-layer-2));
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
      font-family: var(--dsw-font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    [data-dsh-loopscope] .tv-status-failed {
      color: var(--dsw-alias-state-error-primary);
    }

    [data-dsh-loopscope] .tv-status-ok {
      color: var(--dsw-alias-state-business-primary);
    }

    [data-dsh-loopscope] .tv-load-more {
      display: flex;
      justify-content: center;
      padding: 4px 0 8px;
    }

    [data-dsh-loopscope] .tv-header-btn {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      height: 24px;
      padding: 0 8px;
      border: 0.5px solid transparent;
      border-radius: var(--tv-radius);
      background: transparent;
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxs-12);
      cursor: pointer;
      white-space: nowrap;
    }

    [data-dsh-loopscope] .tv-header-btn:hover {
      background: var(--dsw-alias-interactive-bg-hover);
      color: var(--dsw-alias-label-primary);
    }

    [data-dsh-loopscope] .tv-header-btn:focus-visible {
      outline: 2px solid var(--dsw-alias-state-business-primary);
      outline-offset: 1px;
    }

    [data-dsh-loopscope] .tv-header-icon {
      flex: none;
      width: 14px;
      height: 14px;
    }

    @media (prefers-reduced-motion: reduce) {
      [data-dsh-loopscope] .tv-pill::before,
      [data-dsh-loopscope] .tv-bar[data-running='true'] {
        animation: none;
      }
      [data-dsh-loopscope] .tv-caret {
        transition: none;
      }
    }

    /* ------------------------------------------------------------------ LOOP view */

    [data-dsh-loopscope] .tv-loopview {
      display: flex;
      flex-direction: column;
      min-height: 100%;
    }

    [data-dsh-loopscope] .tv-ribbon {
      position: sticky;
      top: 0;
      z-index: 4;
      display: flex;
      align-items: flex-end;
      gap: 6px;
      padding: 4px 10px 5px;
      background: var(--dsw-alias-bg-base);
      border-bottom: 0.5px solid var(--dsw-alias-border-l2);
    }

    [data-dsh-loopscope] .tv-ribbon-label {
      flex: none;
      padding-bottom: 2px;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      white-space: nowrap;
    }

    [data-dsh-loopscope] .tv-ribbon-strip {
      display: flex;
      align-items: flex-end;
      gap: 1px;
      height: 30px;
      flex: 1;
      min-width: 0;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
    }

    [data-dsh-loopscope] .tv-ribbon-strip::-webkit-scrollbar {
      display: none;
    }

    [data-dsh-loopscope] .tv-ribbon-bar {
      flex: none;
      width: 3px;
      padding: 0;
      border: 0;
      border-radius: 1px;
      background: var(--dsw-alias-border-l4);
      cursor: pointer;
      opacity: 0.85;
    }

    @media (hover: hover) {
      [data-dsh-loopscope] .tv-ribbon-bar:hover {
        opacity: 1;
        background: var(--dsw-alias-state-business-primary);
      }
    }

    [data-dsh-loopscope] .tv-ribbon-bar[data-failed='true'] {
      background: var(--tv-cat-failed);
    }

    [data-dsh-loopscope] .tv-ribbon-bar[data-running='true'] {
      background: var(--dsw-alias-state-business-primary);
      animation: tv-bar-pulse 1.4s ease-in-out infinite;
    }

    [data-dsh-loopscope] .tv-ribbon-bar[data-selected='true'] {
      background: var(--dsw-alias-state-business-primary);
      opacity: 1;
      box-shadow: 0 0 0 1px var(--dsw-alias-label-primary);
    }

    [data-dsh-loopscope] .tv-loop-list {
      padding: 8px 10px 12px;
    }

    [data-dsh-loopscope] .tv-loop-turndiv {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0 6px;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-loop-turndiv::before,
    [data-dsh-loopscope] .tv-loop-turndiv::after {
      content: '';
      flex: 1;
      height: 0.5px;
      background: var(--dsw-alias-border-l2);
    }

    [data-dsh-loopscope] .tv-loop {
      position: relative;
      padding-left: 18px;
      margin-bottom: 8px;
    }

    [data-dsh-loopscope] .tv-loop::before {
      content: '';
      position: absolute;
      left: 5px;
      top: 0;
      bottom: -8px;
      width: 1px;
      background-image: linear-gradient(
        to bottom,
        color-mix(in srgb, var(--dsw-alias-border-l3) 80%, transparent) 0 4px,
        transparent 4px 8px
      );
      background-size: 1px 8px;
      animation: tv-flow 900ms linear infinite;
    }

    [data-dsh-loopscope] .tv-loop:last-child::before {
      bottom: 40%;
    }

    [data-dsh-loopscope] .tv-loop-node {
      position: absolute;
      left: 0;
      top: 9px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 11px;
      height: 11px;
      border-radius: 50%;
      corner-shape: round;
      border: 1px solid var(--dsw-alias-border-l3);
      background: var(--dsw-alias-bg-base);
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      font-size: 7px;
      line-height: 1;
    }

    [data-dsh-loopscope] .tv-loop[data-running='true'] .tv-loop-node {
      border-color: var(--dsw-alias-state-business-primary);
      color: var(--dsw-alias-state-business-primary);
      animation: tv-bar-pulse 1.4s ease-in-out infinite;
    }

    [data-dsh-loopscope] .tv-loop-card {
      border-radius: var(--tv-radius);
      background: var(--dsw-alias-bg-layer-1);
      box-shadow: 0 0 0 0.5px var(--dsw-alias-border-l1);
      padding: 7px 8px 6px;
      transition: box-shadow 140ms ease;
    }

    [data-dsh-loopscope] .tv-loop[data-selected='true'] .tv-loop-card {
      box-shadow: 0 0 0 1px var(--dsw-alias-state-business-primary);
    }

    [data-dsh-loopscope] .tv-loop[data-active='true'] .tv-loop-card {
      box-shadow: 0 0 0 1px var(--dsw-alias-state-business-primary),
        0 0 0 4px color-mix(in srgb, var(--dsw-alias-state-business-primary) 14%, transparent);
    }

    [data-dsh-loopscope] .tv-loop-head {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      min-width: 0;
    }

    [data-dsh-loopscope] .tv-ring {
      flex: none;
      overflow: visible;
    }

    [data-dsh-loopscope] .tv-ring-track {
      stroke: var(--dsw-alias-border-l2);
    }

    [data-dsh-loopscope] .tv-ring-arc {
      opacity: 0.92;
      cursor: pointer;
      transition: opacity 120ms ease, stroke-width 120ms ease;
    }

    [data-dsh-loopscope] .tv-ring-arc[data-on='true'] {
      opacity: 1;
      filter: drop-shadow(0 0 2px color-mix(in srgb, currentColor 40%, transparent));
    }

    [data-dsh-loopscope] .tv-ring-spin {
      transform-box: view-box;
      transform-origin: 50% 50%;
      animation: tv-spin 1.8s linear infinite;
      opacity: 0.6;
    }

    [data-dsh-loopscope] .tv-ring-index {
      fill: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
      font-size: 11px;
      font-weight: 600;
      pointer-events: none;
    }

    [data-dsh-loopscope] .tv-loop-titles {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
      flex: 1;
    }

    [data-dsh-loopscope] .tv-loop-title {
      display: flex;
      align-items: baseline;
      gap: 6px;
      min-width: 0;
    }

    [data-dsh-loopscope] .tv-loop-name {
      font: var(--dsw-font-xxs-12);
      font-weight: 600;
      white-space: nowrap;
    }

    [data-dsh-loopscope] .tv-loop-sub {
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-dsh-loopscope] .tv-loop-badge {
      flex: none;
      padding: 0 5px;
      border-radius: 999px;
      corner-shape: round;
      color: var(--dsw-alias-state-business-primary);
      background: color-mix(in srgb, var(--dsw-alias-state-business-primary) 12%, transparent);
      font: var(--dsw-font-xxxs-11);
      font-size: 10px;
    }

    [data-dsh-loopscope] .tv-loop-meta {
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-variant-numeric: tabular-nums;
    }

    [data-dsh-loopscope] .tv-loop-status {
      flex: none;
      font: var(--dsw-font-xxxs-11);
      font-size: 10px;
      color: var(--dsw-alias-state-business-primary);
    }

    [data-dsh-loopscope] .tv-loop-status[data-status='interrupted'] {
      color: var(--dsw-alias-state-warn-primary);
    }

    [data-dsh-loopscope] .tv-loop-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 6px;
    }

    [data-dsh-loopscope] .tv-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 20px;
      padding: 0 7px;
      border: 0.5px solid var(--dsw-alias-border-l1);
      border-radius: 999px;
      corner-shape: round;
      background: transparent;
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
      cursor: pointer;
      white-space: nowrap;
    }

    @media (hover: hover) {
      [data-dsh-loopscope] .tv-chip:hover {
        background: var(--dsw-alias-interactive-bg-hover);
        color: var(--dsw-alias-label-primary);
      }
    }

    [data-dsh-loopscope] .tv-chip[data-on='true'] {
      border-color: color-mix(in srgb, var(--tv-chip, var(--dsw-alias-state-business-primary)) 55%, transparent);
      background: color-mix(in srgb, var(--tv-chip, var(--dsw-alias-state-business-primary)) 12%, transparent);
      color: var(--dsw-alias-label-primary);
    }

    [data-dsh-loopscope] .tv-chip[data-empty='true'] {
      opacity: 0.55;
    }

    [data-dsh-loopscope] .tv-chip-dot {
      flex: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      corner-shape: round;
      background: var(--tv-chip, var(--tv-cat-other));
    }

    [data-dsh-loopscope] .tv-chip-fact {
      color: var(--dsw-alias-label-caption);
      font-variant-numeric: tabular-nums;
    }

    [data-dsh-loopscope] .tv-chip-ms {
      color: var(--dsw-alias-label-caption);
      font-size: 10px;
      font-variant-numeric: tabular-nums;
    }

    [data-dsh-loopscope] .tv-loop-signals {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 5px;
    }

    [data-dsh-loopscope] .tv-signal {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 17px;
      padding: 0 6px;
      border-radius: 4px;
      background: var(--dsw-alias-bg-layer-2);
      border: 0.5px solid var(--dsw-alias-border-l1);
      font: var(--dsw-font-xxxs-11);
      font-size: 10px;
      color: var(--dsw-alias-label-caption);
      white-space: nowrap;
      max-width: 100%;
      overflow: hidden;
    }

    [data-dsh-loopscope] .tv-signal::before {
      content: '';
      flex: none;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      corner-shape: round;
      background: var(--dsw-alias-label-caption);
    }

    [data-dsh-loopscope] .tv-signal[data-kind='workspace']::before { background: var(--dsw-alias-state-warn-primary); }
    [data-dsh-loopscope] .tv-signal[data-kind='deliverable']::before { background: var(--dsw-alias-state-business-primary); }
    [data-dsh-loopscope] .tv-signal[data-kind='team']::before { background: var(--tv-cat-agent); }
    [data-dsh-loopscope] .tv-signal[data-kind='subagent']::before { background: var(--tv-cat-web); }
    [data-dsh-loopscope] .tv-signal[data-kind='retry']::before { background: var(--dsw-alias-state-warn-primary); }
    [data-dsh-loopscope] .tv-signal[data-kind='attempt']::before { background: var(--tv-cat-failed); }
    [data-dsh-loopscope] .tv-signal[data-kind='approval']::before { background: var(--tv-cat-bash); }

    [data-dsh-loopscope] .tv-signal-detail {
      color: var(--dsw-alias-label-secondary);
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-dsh-loopscope] .tv-loop-tools {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 5px;
    }

    [data-dsh-loopscope] .tv-loop-notools {
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-tool-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      height: 20px;
      max-width: 100%;
      padding: 0 7px;
      border: 0.5px solid var(--dsw-alias-border-l1);
      border-radius: 999px;
      corner-shape: round;
      background: var(--dsw-alias-bg-layer-2);
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
      cursor: pointer;
      white-space: nowrap;
    }

    @media (hover: hover) {
      [data-dsh-loopscope] .tv-tool-chip:hover {
        background: var(--dsw-alias-interactive-bg-hover);
        color: var(--dsw-alias-label-primary);
      }
    }

    [data-dsh-loopscope] .tv-tool-chip[data-on='true'] {
      border-color: var(--dsw-alias-label-primary);
    }

    [data-dsh-loopscope] .tv-tool-chip[data-status='failed'] {
      border-color: color-mix(in srgb, var(--tv-cat-failed) 60%, transparent);
    }

    [data-dsh-loopscope] .tv-tool-chip[data-status='cancelled'] {
      opacity: 0.6;
    }

    [data-dsh-loopscope] .tv-tool-dot {
      flex: none;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      corner-shape: round;
      background: var(--tv-tool, var(--tv-cat-other));
    }

    [data-dsh-loopscope] .tv-tool-name {
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 120px;
    }

    [data-dsh-loopscope] .tv-tool-dur {
      color: var(--dsw-alias-label-caption);
      font-size: 10px;
      font-variant-numeric: tabular-nums;
    }

    [data-dsh-loopscope] .tv-loop-user {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-top: 5px;
      padding: 4px 6px;
      border-radius: 4px;
      background: var(--dsw-alias-bg-layer-2);
      min-width: 0;
    }

    [data-dsh-loopscope] .tv-loop-user-label {
      flex: none;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-loop-user-text {
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [data-dsh-loopscope] .tv-phase-tools {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    [data-dsh-loopscope] .tv-phase-tool[data-clickable='true'] {
      cursor: pointer;
    }

    @media (hover: hover) {
      [data-dsh-loopscope] .tv-phase-tool[data-clickable='true']:hover {
        background: var(--dsw-alias-interactive-bg-hover);
      }
    }

    [data-dsh-loopscope] .tv-phase-tool {
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 5px 6px;
      border-radius: 4px;
      background: var(--dsw-alias-bg-layer-2);
      border: 0.5px solid var(--dsw-alias-border-l1);
    }

    [data-dsh-loopscope] .tv-phase-tool-head {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--dsw-alias-label-secondary);
      font: var(--dsw-font-xxxs-11);
    }

    [data-dsh-loopscope] .tv-phase-tool-body {
      margin: 0;
      max-height: 120px;
      overflow: auto;
      color: var(--dsw-alias-label-caption);
      font: var(--dsw-font-xxxs-11);
      font-family: var(--dsw-font-family-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }

    @keyframes tv-spin {
      to { transform: rotate(360deg); }
    }

    @keyframes tv-flow {
      to { background-position: 0 8px; }
    }

    @media (prefers-reduced-motion: reduce) {
      [data-dsh-loopscope] .tv-loop::before,
      [data-dsh-loopscope] .tv-ring-spin,
      [data-dsh-loopscope] .tv-loop[data-running='true'] .tv-loop-node {
        animation: none;
      }
    }
    `;

    // src/client/panel.tsx
    var import_react2 = require("react");

    // src/client/model.ts
    function requestPhases(request) {
      const dispatch = request.dispatchTime ?? request.start;
      const messageTime = request.messageTime ?? request.end ?? dispatch;
      const tools = request.tools;
      const firstTool = tools.reduce((min, tool) => min === void 0 ? tool.start : Math.min(min, tool.start), void 0);
      const lastToolEnd = tools.reduce((max, tool) => {
        const end = tool.end;
        return end === void 0 ? max : max === void 0 ? end : Math.max(max, end);
      }, void 0);
      const actStart = firstTool ?? messageTime;
      const actEnd = lastToolEnd ?? actStart;
      const observeStart = Math.max(actEnd, messageTime);
      const loopEnd = request.end ?? observeStart;
      const contextEnd = Math.max(dispatch, request.start);
      return [
        { kind: "context", start: request.start, end: contextEnd, ms: Math.max(0, contextEnd - request.start) },
        { kind: "decision", start: contextEnd, end: Math.max(actStart, contextEnd), ms: Math.max(0, Math.max(actStart, contextEnd) - contextEnd) },
        { kind: "act", start: actStart, end: actEnd, ms: Math.max(0, actEnd - actStart) },
        { kind: "observe", start: observeStart, end: Math.max(loopEnd, observeStart), ms: Math.max(0, Math.max(loopEnd, observeStart) - observeStart) }
      ];
    }
    var EMPTY_MODEL = {
      t0: 0,
      t1: 0,
      turns: [],
      totals: {
        turns: 0,
        requests: 0,
        toolCalls: 0,
        toolFailures: 0,
        approvals: 0,
        inputTokens: 0,
        outputTokens: 0,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
        activeMs: 0,
        reasoningChars: 0
      },
      eventCount: 0,
      hasMore: false
    };
    var TOOL_CATEGORIES = {
      read: "fsRead",
      list: "fsRead",
      glob: "search",
      grep: "search",
      code_search: "search",
      write: "fsWrite",
      edit: "fsWrite",
      multi_edit: "fsWrite",
      apply_patch: "fsWrite",
      bash: "bash",
      pwsh: "bash",
      write_stdin: "bash",
      job_output: "bash",
      web_search: "web",
      web_fetch: "web",
      subagent: "agent",
      subagent_fork: "agent",
      spawn_teammate: "agent",
      send_message: "agent",
      wait_agent: "agent",
      interrupt_agent: "agent",
      list_agents: "agent",
      workflow: "agent",
      ask_user_question: "other",
      todo_write: "other"
    };
    function toolCategory(name2) {
      const known = TOOL_CATEGORIES[name2];
      if (known !== void 0) return known;
      if (name2.startsWith("team_task_") || name2.startsWith("task_")) return "agent";
      if (name2.startsWith("schedule_")) return "other";
      return "other";
    }
    function chunkCarriesToken(chunk) {
      if (chunk === null || typeof chunk !== "object") return false;
      switch (chunk.type) {
        case "text-delta":
        case "reasoning-delta":
          return typeof chunk.text === "string" && chunk.text !== "";
        case "tool-call-delta":
          return typeof chunk.argumentsDelta === "string" && chunk.argumentsDelta !== "" || typeof chunk.name === "string";
        default:
          return false;
      }
    }
    function streamTiming(stream) {
      if (!Array.isArray(stream) || stream.length === 0) return {};
      let first = Number.POSITIVE_INFINITY;
      let last = Number.NEGATIVE_INFINITY;
      let firstToken = Number.POSITIVE_INFINITY;
      let lastToken = Number.NEGATIVE_INFINITY;
      const touch = (time) => {
        if (!Number.isFinite(time)) return;
        if (time < first) first = time;
        if (time > last) last = time;
      };
      for (const record of stream) {
        if (record === null || typeof record !== "object") continue;
        if (record.type === "chunk") {
          touch(record.time);
          if (chunkCarriesToken(record.chunk) && record.time < firstToken) firstToken = record.time;
          if (chunkCarriesToken(record.chunk) && record.time > lastToken) lastToken = record.time;
          continue;
        }
        const time0 = Number(record.time0);
        touch(time0);
        const members = Array.isArray(record.type === "tool-call-chunks" ? record.args : record.texts) ? record.type === "tool-call-chunks" ? record.args : record.texts : [];
        const dt = Array.isArray(record.dt) ? record.dt : [];
        let time = time0;
        for (let index = 0; index < members.length; index += 1) {
          if (index > 0) time += Number(dt[index - 1] ?? 0);
          touch(time);
          const member = members[index];
          const carries = record.type === "tool-call-chunks" ? typeof member === "string" && member !== "" || index === 0 && typeof record.name === "string" : typeof member === "string" && member !== "";
          if (carries) {
            if (time < firstToken) firstToken = time;
            if (time > lastToken) lastToken = time;
          }
        }
      }
      return {
        ...Number.isFinite(first) ? { first } : {},
        ...Number.isFinite(last) ? { last } : {},
        ...Number.isFinite(firstToken) ? { firstToken } : {},
        ...Number.isFinite(lastToken) ? { lastToken } : {}
      };
    }
    function messageText(message) {
      let text = "";
      let reasoning = "";
      if (message === null || typeof message !== "object" || !Array.isArray(message.content)) return { text, reasoning };
      for (const part of message.content) {
        if (part === null || typeof part !== "object") continue;
        if (part.type === "text" && typeof part.text === "string") text += part.text;
        else if (part.type === "reasoning" && typeof part.text === "string") reasoning += part.text;
      }
      return { text, reasoning };
    }
    function toolResultText(message) {
      if (message === null || typeof message !== "object" || !Array.isArray(message.content)) return "";
      const parts = [];
      for (const part of message.content) {
        if (part === null || typeof part !== "object") continue;
        if (part.type === "text" && typeof part.text === "string") parts.push(part.text);
        else if (part.type === "image") parts.push("[image]");
      }
      return parts.join("\n");
    }
    function responseKey(turn, step) {
      return `${turn}:${step}`;
    }
    function buildModel(entries, options = {}) {
      if (entries.length === 0) return { ...EMPTY_MODEL, hasMore: options.hasMore === true };
      const now = options.now ?? Date.now();
      const draft = {
        turns: [],
        byTurn: /* @__PURE__ */ new Map(),
        byRequest: /* @__PURE__ */ new Map(),
        byTool: /* @__PURE__ */ new Map(),
        byApproval: /* @__PURE__ */ new Map(),
        lastTime: -Infinity,
        firstTurnStart: void 0,
        lastContext: {}
      };
      for (const entry of entries) {
        if (entry === null || typeof entry !== "object" || entry.type !== "event") continue;
        const event = entry.event;
        if (event === null || typeof event !== "object") continue;
        const time = Number(event.time);
        if (!Number.isFinite(time)) continue;
        if (time > draft.lastTime) draft.lastTime = time;
        if (draft.current !== void 0) draft.current.seqEnd = event.seq;
        const data = event.data ?? {};
        switch (event.type) {
          case "turn/start": {
            const turn = Number(data.turn);
            if (!Number.isFinite(turn)) break;
            if (!draft.byTurn.has(turn)) {
              const created = { turn, start: time, requests: [] };
              draft.turns.push(created);
              draft.byTurn.set(turn, created);
            }
            if (draft.firstTurnStart === void 0) draft.firstTurnStart = time;
            break;
          }
          case "turn/end": {
            const turn = draft.byTurn.get(Number(data.turn));
            if (turn !== void 0) {
              turn.end = time;
              if (typeof data.reason === "string") turn.endReason = data.reason;
            }
            break;
          }
          case "step/start": {
            const turn = draft.byTurn.get(Number(data.turn));
            if (turn === void 0) break;
            const step = Number(data.step);
            const request = {
              turn: turn.turn,
              step,
              start: time,
              tools: [],
              approvals: [],
              retries: [],
              seqStart: event.seq,
              seqEnd: event.seq,
              developerNotes: [],
              attempts: 0,
              resultChars: 0,
              resultErrors: 0,
              signals: [],
              ...draft.lastContext
            };
            turn.requests.push(request);
            draft.byRequest.set(responseKey(turn.turn, step), request);
            draft.current = request;
            break;
          }
          case "step/end": {
            const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step)));
            if (request !== void 0) request.end = time;
            break;
          }
          case "user/message": {
            const turn = draft.turns.at(-1);
            if (turn === void 0 || turn.end !== void 0) break;
            if (turn.userText !== void 0) break;
            const kind = data.source?.kind;
            if (kind !== void 0 && kind !== "user") break;
            const { text } = messageText(data);
            if (text !== "") turn.userText = text;
            break;
          }
          case "request/header": {
            const request = draft.current ?? latestRequest(draft, data.turn);
            if (request === void 0) break;
            request.dispatchTime = time;
            if (typeof data.reason === "string") request.headerReason = data.reason;
            const header = data.header;
            const config = header?.config;
            if (config !== null && typeof config === "object") {
              if (typeof config.model === "string") request.model = config.model;
              if (typeof config.provider === "string") request.provider = config.provider;
              if (typeof config.maxTokens === "number") request.maxTokens = config.maxTokens;
              if (typeof config.reasoningEffort === "string") request.reasoningEffort = config.reasoningEffort;
              draft.lastContext.maxTokens = request.maxTokens;
              draft.lastContext.reasoningEffort = request.reasoningEffort;
            }
            if (Array.isArray(header?.tools)) {
              request.toolCount = header.tools.length;
              draft.lastContext.toolCount = request.toolCount;
            }
            break;
          }
          case "request/context": {
            const request = draft.current ?? latestRequest(draft, data.turn);
            if (request === void 0) break;
            if (request.model === void 0 && typeof data.model === "string") request.model = data.model;
            if (request.provider === void 0 && typeof data.provider === "string") request.provider = data.provider;
            if (request.contextWindow === void 0 && typeof data.contextWindow === "number") request.contextWindow = data.contextWindow;
            if (request.systemPromptUpdate === void 0 && typeof data.systemPromptUpdate === "string") request.systemPromptUpdate = data.systemPromptUpdate;
            if (request.contextWindow !== void 0) draft.lastContext.contextWindow = request.contextWindow;
            if (request.systemPromptUpdate !== void 0) draft.lastContext.systemPromptUpdate = request.systemPromptUpdate;
            break;
          }
          case "assistant/message": {
            const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step)));
            if (request === void 0) break;
            const { text, reasoning } = messageText(data.message);
            request.messageTime = time;
            if (text !== "") request.assistantText = text;
            if (reasoning !== "") request.reasoningText = reasoning;
            const usage = data.usage;
            if (usage !== null && typeof usage === "object" && typeof usage.inputTokens === "number") {
              request.usage = {
                inputTokens: usage.inputTokens,
                outputTokens: Number(usage.outputTokens ?? 0),
                ...typeof usage.totalTokens === "number" ? { totalTokens: usage.totalTokens } : {},
                ...typeof usage.cacheReadTokens === "number" ? { cacheReadTokens: usage.cacheReadTokens } : {},
                ...typeof usage.cacheWriteTokens === "number" ? { cacheWriteTokens: usage.cacheWriteTokens } : {},
                ...typeof usage.reasoningTokens === "number" ? { reasoningTokens: usage.reasoningTokens } : {}
              };
            }
            if (data.interrupted === true) request.interrupted = true;
            const timing = streamTiming(data.stream);
            if (timing.firstToken !== void 0) request.firstToken = timing.firstToken;
            if (timing.lastToken !== void 0) request.lastToken = timing.lastToken;
            if (request.lastToken === void 0 && timing.last !== void 0) request.lastToken = timing.last;
            break;
          }
          case "tool/call": {
            const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step))) ?? latestRequest(draft, data.turn);
            if (request === void 0) break;
            const id = String(data.callId ?? "");
            if (id === "" || draft.byTool.has(id)) break;
            const name2 = String(data.name ?? "tool");
            const call = {
              mutable: true,
              id,
              name: name2,
              category: toolCategory(name2),
              arguments: typeof data.arguments === "string" ? data.arguments : JSON.stringify(data.arguments ?? ""),
              start: time,
              status: "running"
            };
            request.tools.push(call);
            draft.byTool.set(id, call);
            break;
          }
          case "tool/result": {
            const id = String(data.toolCallId ?? data.message?.toolCallId ?? "");
            const call = draft.byTool.get(id);
            if (call === void 0) break;
            call.end = Math.max(call.end ?? 0, time);
            const isError = data.message?.isError === true || data.error !== void 0 && data.error !== null;
            call.status = isError ? "failed" : "completed";
            const error = data.error;
            if (error !== null && typeof error === "object" && typeof error.code === "string") {
              call.error = {
                name: String(error.name ?? "Error"),
                code: error.code,
                ...typeof error.reason === "string" ? { reason: error.reason } : {}
              };
            }
            const resultText = toolResultText(data.message);
            if (resultText !== "") call.resultText = resultText;
            const owner = requestForTool(draft, id);
            if (owner !== void 0) {
              owner.resultChars += resultText.length;
              if (isError) owner.resultErrors += 1;
            }
            break;
          }
          case "job/settled": {
            const callId = String(data.toolCall?.callId ?? "");
            const call = draft.byTool.get(callId);
            if (call === void 0) break;
            const finishedAt = Number(data.finishedAt);
            if (Number.isFinite(finishedAt) && finishedAt > (call.end ?? 0)) {
              call.end = finishedAt;
              call.endFromJob = true;
            }
            const status = data.status;
            if (status === "failed") call.status = "failed";
            else if (status === "cancelled") call.status = "cancelled";
            else if (status === "completed" && call.status === "running") call.status = "completed";
            const cause = data.cause;
            if (call.error === void 0 && cause !== null && typeof cause === "object" && typeof cause.name === "string" && typeof cause.code === "string") {
              call.error = {
                name: cause.name,
                code: cause.code,
                ...typeof cause.reason === "string" ? { reason: cause.reason } : {}
              };
            }
            break;
          }
          case "system/message": {
            const request = draft.current;
            if (request === void 0) break;
            const { text } = messageText(data.message);
            if (text !== "" && request.systemChars === void 0) request.systemChars = text.length;
            break;
          }
          case "developer/message": {
            const request = draft.current;
            if (request === void 0) break;
            let additions = 0;
            const texts = [];
            const content = Array.isArray(data.message?.content) ? data.message.content : [];
            for (const part of content) {
              if (part === null || typeof part !== "object") continue;
              if (part.type === "tool-addition") additions += 1;
              else if (part.type === "text" && typeof part.text === "string" && part.text !== "") texts.push(part.text);
            }
            if (additions > 0) request.developerNotes.push({ kind: "tools", text: `+${additions}` });
            for (const text of texts) request.developerNotes.push({ kind: "developer", text: oneLineOf(text, 240) });
            break;
          }
          case "assistant/attempt": {
            const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step))) ?? draft.current;
            if (request !== void 0) request.attempts += 1;
            break;
          }
          case "approval/asked": {
            const request = draft.current ?? latestRequest(draft, data.turn);
            if (request === void 0) break;
            const id = String(data.id ?? "");
            if (id === "" || draft.byApproval.has(id)) break;
            const approval = {
              mutable: true,
              id,
              asked: time,
              ...typeof data.toolName === "string" ? { toolName: data.toolName } : {}
            };
            request.approvals.push(approval);
            draft.byApproval.set(id, approval);
            break;
          }
          case "approval/decided": {
            const approval = draft.byApproval.get(String(data.id ?? ""));
            if (approval === void 0) break;
            approval.decided = time;
            if (typeof data.outcome === "string") approval.outcome = data.outcome;
            break;
          }
          case "llm/retry": {
            const request = draft.byRequest.get(responseKey(Number(data.turn), Number(data.step))) ?? draft.current ?? latestRequest(draft, data.turn);
            if (request === void 0) break;
            request.retries.push({
              time,
              ...typeof data.delayMs === "number" ? { delayMs: data.delayMs } : {},
              ...data.failure !== null && typeof data.failure === "object" ? {
                failure: {
                  ...typeof data.failure.name === "string" ? { name: data.failure.name } : {},
                  ...typeof data.failure.code === "string" ? { code: data.failure.code } : {},
                  ...typeof data.failure.reason === "string" ? { reason: data.failure.reason } : {}
                }
              } : {}
            });
            break;
          }
          default: {
            const signal = signalFor(event.type, data, time);
            if (signal !== void 0 && draft.current !== void 0) draft.current.signals.push(signal);
            break;
          }
        }
      }
      const t0 = draft.firstTurnStart ?? draft.turns[0]?.start ?? entries[0]?.event?.time ?? now;
      const t1 = Math.max(draft.lastTime, t0 + 1);
      const turns = draft.turns.map((turn) => {
        const requests = turn.requests.map((request, index) => {
          const isOpen = request.end === void 0;
          const end = isOpen ? Math.max(now, request.start + 1) : Math.max(request.end, request.start + 1);
          const tools = request.tools.map(({ mutable: _mutable, ...tool }) => tool);
          const approvals2 = request.approvals.map(({ mutable: _mutable, ...approval }) => approval);
          return {
            index: index + 1,
            turn: request.turn,
            step: request.step,
            start: request.start,
            end,
            ...isOpen ? { open: true } : {},
            ...request.dispatchTime !== void 0 ? { dispatchTime: request.dispatchTime } : {},
            ...request.model !== void 0 ? { model: request.model } : {},
            ...request.provider !== void 0 ? { provider: request.provider } : {},
            ...request.messageTime !== void 0 ? { messageTime: request.messageTime } : {},
            ...request.firstToken !== void 0 ? { firstToken: request.firstToken } : {},
            ...request.lastToken !== void 0 ? { lastToken: request.lastToken } : {},
            ...request.usage !== void 0 ? { usage: request.usage } : {},
            ...request.interrupted === true ? { interrupted: true } : {},
            outputChars: (request.assistantText ?? "").length,
            reasoningChars: (request.reasoningText ?? "").length,
            assistantText: request.assistantText ?? "",
            reasoningText: request.reasoningText ?? "",
            tools,
            approvals: approvals2,
            retries: request.retries,
            context: {
              ...request.headerReason !== void 0 ? { headerReason: request.headerReason } : {},
              ...request.toolCount !== void 0 ? { toolCount: request.toolCount } : {},
              ...request.contextWindow !== void 0 ? { contextWindow: request.contextWindow } : {},
              ...request.maxTokens !== void 0 ? { maxTokens: request.maxTokens } : {},
              ...request.reasoningEffort !== void 0 ? { reasoningEffort: request.reasoningEffort } : {},
              ...request.systemPromptUpdate !== void 0 ? { systemPromptUpdate: request.systemPromptUpdate } : {},
              ...request.systemChars !== void 0 ? { systemChars: request.systemChars } : {},
              developerNotes: request.developerNotes
            },
            attempts: request.attempts,
            resultChars: request.resultChars,
            resultErrors: request.resultErrors,
            signals: request.signals
          };
        });
        return {
          turn: turn.turn,
          start: turn.start,
          ...turn.end !== void 0 ? { end: turn.end } : {},
          ...turn.endReason !== void 0 ? { endReason: turn.endReason } : {},
          ...turn.userText !== void 0 ? { userText: turn.userText } : {},
          requests
        };
      });
      let toolCalls = 0;
      let toolFailures = 0;
      let approvals = 0;
      let inputTokens = 0;
      let outputTokens = 0;
      let cacheReadTokens = 0;
      let cacheWriteTokens = 0;
      let waitSum = 0;
      let waitCount = 0;
      let generationSum = 0;
      let generationCount = 0;
      let reasoningChars = 0;
      let activeMs = 0;
      for (const turn of turns) {
        for (const request of turn.requests) {
          activeMs += Math.max(0, (request.end ?? request.start) - request.start);
          reasoningChars += request.reasoningChars;
          for (const tool of request.tools) {
            toolCalls += 1;
            if (tool.status === "failed" || tool.status === "cancelled") toolFailures += 1;
          }
          approvals += request.approvals.length;
          if (request.usage !== void 0) {
            inputTokens += request.usage.inputTokens;
            outputTokens += request.usage.outputTokens;
            cacheReadTokens += request.usage.cacheReadTokens ?? 0;
            cacheWriteTokens += request.usage.cacheWriteTokens ?? 0;
          }
          const dispatch = request.dispatchTime ?? request.start;
          if (request.firstToken !== void 0 && request.firstToken >= dispatch) {
            waitSum += request.firstToken - dispatch;
            waitCount += 1;
          }
          if (request.firstToken !== void 0 && request.lastToken !== void 0 && request.lastToken >= request.firstToken) {
            generationSum += request.lastToken - request.firstToken;
            generationCount += 1;
          }
        }
      }
      return {
        t0,
        t1,
        turns,
        totals: {
          turns: turns.length,
          requests: turns.reduce((sum, turn) => sum + turn.requests.length, 0),
          toolCalls,
          toolFailures,
          approvals,
          inputTokens,
          outputTokens,
          cacheReadTokens,
          cacheWriteTokens,
          ...waitCount > 0 ? { averageFirstTokenMs: waitSum / waitCount } : {},
          ...generationCount > 0 ? { averageGenerationMs: generationSum / generationCount } : {},
          activeMs,
          reasoningChars
        },
        eventCount: entries.length,
        hasMore: options.hasMore === true
      };
    }
    function oneLineOf(text, max) {
      const line = text.split("\n").find((part) => part.trim() !== "")?.trim() ?? "";
      return line.length > max ? `${line.slice(0, max - 1)}\u2026` : line;
    }
    function requestForTool(draft, id) {
      if (!draft.byTool.has(id)) return void 0;
      for (const turn of draft.turns) {
        for (const request of turn.requests) {
          if (request.tools.some((tool) => tool.id === id)) return request;
        }
      }
      return void 0;
    }
    function signalFor(type, data, time) {
      const signal = (kind, label, detail) => ({
        kind,
        label,
        ...detail === void 0 || detail === "" ? {} : { detail },
        time
      });
      switch (type) {
        case "workspace/changes": {
          const paths = Array.isArray(data?.paths) ? data.paths : Array.isArray(data?.changes) ? data.changes : void 0;
          return signal("workspace", "\u5DE5\u4F5C\u533A\u53D8\u66F4", paths === void 0 ? void 0 : `${paths.length} \u4E2A\u6587\u4EF6`);
        }
        case "deliverables/presented": {
          const files = Array.isArray(data?.files) ? data.files : [];
          const first = files[0]?.path;
          const name2 = typeof first === "string" ? first.slice(first.lastIndexOf("/") + 1) : void 0;
          return signal("deliverable", "\u4EA7\u7269\u5C55\u793A", files.length === 0 ? void 0 : `${files.length} \u4E2A\u6587\u4EF6${name2 === void 0 ? "" : ` \xB7 ${name2}`}`);
        }
        case "team/task": {
          const task = data?.task;
          const subject = typeof task?.subject === "string" ? oneLineOf(task.subject, 40) : void 0;
          const status = typeof task?.status === "string" ? task.status : void 0;
          return signal("team", "\u56E2\u961F\u4EFB\u52A1", [subject, status].filter((part) => part !== void 0 && part !== "").join(" \xB7 ") || void 0);
        }
        case "team/member": {
          const member = data?.member;
          const name2 = typeof member?.name === "string" ? member.name : void 0;
          const phase = typeof member?.phase === "string" ? member.phase : void 0;
          return signal("team", "\u56E2\u961F\u6210\u5458", [name2, phase].filter((part) => part !== void 0 && part !== "").join(" \xB7 ") || void 0);
        }
        case "subagent/catalog": {
          const label = typeof data?.label === "string" ? oneLineOf(data.label, 40) : void 0;
          return signal("subagent", "\u5B50\u4EE3\u7406", label);
        }
        default:
          return void 0;
      }
    }
    function latestRequest(draft, turn) {
      const found = draft.byTurn.get(Number(turn));
      return found?.requests.at(-1);
    }
    var COLLAPSE_GAP_MS = 4e3;
    function buildAxis(model, options = {}) {
      const compressed = options.compressed !== false;
      const spans = [];
      for (const turn of model.turns) {
        for (const request of turn.requests) {
          const start = request.start;
          const end = Math.max(request.end ?? start, start);
          const previous = spans.at(-1);
          if (previous !== void 0 && start <= previous.end) {
            spans[spans.length - 1] = { start: previous.start, end: Math.max(previous.end, end) };
          } else {
            spans.push({ start, end });
          }
        }
        if (turn.requests.length === 0) {
          const start = turn.start;
          const end = Math.max(turn.end ?? Math.min(model.t1, start + 1), start);
          const previous = spans.at(-1);
          if (previous !== void 0 && start <= previous.end) {
            spans[spans.length - 1] = { start: previous.start, end: Math.max(previous.end, end) };
          } else {
            spans.push({ start, end });
          }
        }
      }
      if (spans.length === 0) spans.push({ start: model.t0, end: Math.max(model.t1, model.t0 + 1) });
      const segments = [];
      let units = 0;
      let previousEnd;
      for (const span of spans) {
        if (previousEnd !== void 0) {
          const gap = Math.max(0, span.start - previousEnd);
          units += compressed ? Math.min(gap, COLLAPSE_GAP_MS) : gap;
        }
        const duration = Math.max(0, span.end - span.start);
        segments.push({ start: span.start, end: span.end, unitsStart: units, units: duration });
        units += duration;
        previousEnd = span.end;
      }
      if (previousEnd !== void 0 && model.t1 > previousEnd) {
        const tail = model.t1 - previousEnd;
        units += compressed ? Math.min(tail, COLLAPSE_GAP_MS) : tail;
      }
      const totalUnits = Math.max(units, 1);
      const toUnits = (time) => {
        if (!Number.isFinite(time)) return 0;
        if (time <= segments[0].start) return 0;
        for (let index = 0; index < segments.length; index += 1) {
          const segment = segments[index];
          if (time <= segment.end) {
            return Math.min(segment.unitsStart + (time - segment.start), segment.unitsStart + segment.units);
          }
          const next = segments[index + 1];
          if (next === void 0) return segment.unitsStart + segment.units;
          if (time < next.start) {
            return segment.unitsStart + segment.units;
          }
        }
        const last = segments[segments.length - 1];
        return last.unitsStart + last.units;
      };
      const boundaries = [...new Set(segments.map((segment) => segment.start))];
      const maxTicks = 8;
      const step = Math.max(1, Math.ceil(boundaries.length / maxTicks));
      const MIN_TICK_DISTANCE = 12;
      const ticks = [];
      let lastPercent = Number.NEGATIVE_INFINITY;
      for (let index = 0; index < boundaries.length; index += step) {
        const time = boundaries[index];
        const percent = toUnits(time) / totalUnits * 100;
        if (ticks.length > 0 && percent - lastPercent < MIN_TICK_DISTANCE) continue;
        ticks.push({ percent, label: formatAxisOffset(time - model.t0), major: index === 0 });
        lastPercent = percent;
      }
      return {
        t0: model.t0,
        t1: model.t1,
        totalUnits,
        compressed,
        toUnits,
        toPercent: (time) => toUnits(time) / totalUnits * 100,
        segments,
        ticks
      };
    }
    function formatAxisOffset(ms) {
      const value = Math.max(0, ms);
      const totalSeconds = value / 1e3;
      if (totalSeconds < 1) return "0s";
      if (totalSeconds < 60) return `+${totalSeconds.toFixed(totalSeconds < 10 ? 1 : 0)}s`;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = Math.round(totalSeconds - minutes * 60);
      return `+${minutes}:${String(seconds).padStart(2, "0")}`;
    }

    // src/client/loop.tsx
    var import_react = require("react");

    // src/client/format.ts
    function fill(template, vars = {}) {
      return template.replace(/\{(\w+)\}/g, (match, name2) => Object.prototype.hasOwnProperty.call(vars, name2) ? String(vars[name2]) : match);
    }
    function formatDuration(ms, t) {
      const value = Number.isFinite(ms) && ms > 0 ? ms : 0;
      if (value < 1e3) return `${Math.round(value)} ms`;
      const seconds = value / 1e3;
      if (seconds < 60) return `${seconds < 10 ? seconds.toFixed(1) : Math.round(seconds)} s`;
      const minutes = Math.floor(seconds / 60);
      const rest = Math.round(seconds - minutes * 60);
      if (t !== void 0) return fill(t("time.m"), { m: minutes, s: String(rest).padStart(2, "0") });
      return `${minutes}m ${String(rest).padStart(2, "0")}s`;
    }
    function formatTokens(value) {
      if (value === void 0 || !Number.isFinite(value)) return "\u2014";
      if (value < 1e3) return String(Math.round(value));
      if (value < 1e6) {
        const thousands = value / 1e3;
        return `${thousands < 10 ? thousands.toFixed(1) : Math.round(thousands)}k`;
      }
      return `${(value / 1e6).toFixed(1)}M`;
    }
    function formatPercent(part, whole) {
      if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return "0%";
      const pct = part / whole * 100;
      if (pct >= 10) return `${Math.round(pct)}%`;
      if (pct >= 1) return `${pct.toFixed(1)}%`;
      return `${pct.toFixed(2)}%`;
    }
    function formatOffset(ms) {
      const value = Math.max(0, ms);
      const seconds = Math.floor(value / 1e3);
      const tenths = Math.floor(value % 1e3 / 100);
      return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}.${tenths}`;
    }
    function toolDisplayName(name2) {
      return name2.replace(/[_-]+/g, " ");
    }
    function oneLine(text, max = 90) {
      const line = text.split("\n").map((part) => part.trim()).find((part) => part !== "") ?? "";
      return line.length > max ? `${line.slice(0, max - 1)}\u2026` : line;
    }
    function parseJson(text) {
      try {
        return JSON.parse(text);
      } catch {
        return void 0;
      }
    }
    function prettyJson(text) {
      const parsed = parseJson(text);
      if (parsed === void 0) return text;
      try {
        return JSON.stringify(parsed, null, 2);
      } catch {
        return text;
      }
    }

    // src/client/palette.ts
    var TOOL_COLORS = {
      fsRead: "var(--tv-cat-fs-read)",
      fsWrite: "var(--tv-cat-fs-write)",
      bash: "var(--tv-cat-bash)",
      search: "var(--tv-cat-search)",
      web: "var(--tv-cat-web)",
      agent: "var(--tv-cat-agent)",
      other: "var(--tv-cat-other)"
    };
    var PHASE_ORDER = ["context", "decision", "act", "observe"];
    var PHASE_COLORS = {
      context: "var(--tv-cat-wait)",
      decision: "var(--tv-cat-llm)",
      act: "var(--tv-cat-bash)",
      observe: "var(--tv-cat-fs-read)"
    };

    // src/client/loop.tsx
    var import_jsx_runtime = require("react/jsx-runtime");
    var RING_SIZE = 46;
    var RING_RADIUS = 17.5;
    var RING_STROKE = 4.6;
    var RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
    var RING_MIN_SHARE = 0.05;
    function ringArcs(request) {
      const phases = requestPhases(request);
      const total = phases.reduce((sum2, phase) => sum2 + phase.ms, 0);
      const weights = phases.map((phase) => phase.kind === "context" && total > 0 ? Math.max(phase.ms, total * RING_MIN_SHARE) : phase.ms);
      const sum = weights.reduce((acc, weight) => acc + weight, 0);
      const arcs = [];
      let offset = 0;
      for (let index = 0; index < phases.length; index += 1) {
        const share = sum > 0 ? weights[index] / sum : 1 / phases.length;
        const span = RING_CIRCUMFERENCE * share;
        const length = Math.max(0, span - 2.2);
        arcs.push({ kind: phases[index].kind, length, offset: offset + 1.1 });
        offset += span;
      }
      return arcs;
    }
    function LoopRing({
      request,
      index,
      selectedPhase,
      running,
      t,
      onPickPhase
    }) {
      const arcs = ringArcs(request);
      const phases = requestPhases(request);
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "svg",
        {
          className: "tv-ring",
          viewBox: `0 0 ${RING_SIZE} ${RING_SIZE}`,
          width: RING_SIZE,
          height: RING_SIZE,
          role: "img",
          "aria-label": `LOOP ${index}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "circle",
              {
                className: "tv-ring-track",
                cx: RING_SIZE / 2,
                cy: RING_SIZE / 2,
                r: RING_RADIUS,
                fill: "none",
                strokeWidth: RING_STROKE
              }
            ),
            arcs.map((arc, arcIndex) => arc.length <= 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "circle",
              {
                className: "tv-ring-arc",
                "data-on": selectedPhase === arc.kind ? "true" : void 0,
                cx: RING_SIZE / 2,
                cy: RING_SIZE / 2,
                r: RING_RADIUS,
                fill: "none",
                stroke: PHASE_COLORS[arc.kind],
                strokeWidth: selectedPhase === arc.kind ? RING_STROKE + 2.4 : RING_STROKE,
                strokeDasharray: `${arc.length} ${RING_CIRCUMFERENCE - arc.length}`,
                strokeDashoffset: -arc.offset,
                transform: `rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`,
                onClick: (event) => {
                  event.stopPropagation();
                  onPickPhase(phases[arcIndex].kind);
                },
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${t(phaseLabel(phases[arcIndex].kind))} \xB7 ${formatDuration(phases[arcIndex].ms)}` })
              },
              arc.kind
            )),
            running && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "circle",
              {
                className: "tv-ring-spin",
                cx: RING_SIZE / 2,
                cy: RING_SIZE / 2,
                r: RING_RADIUS,
                fill: "none",
                stroke: "var(--dsw-alias-label-primary)",
                strokeWidth: 1.2,
                strokeDasharray: "4 22",
                transform: `rotate(-90 ${RING_SIZE / 2} ${RING_SIZE / 2})`
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", { className: "tv-ring-index", x: RING_SIZE / 2, y: RING_SIZE / 2 + 3.5, textAnchor: "middle", children: index })
          ]
        }
      );
    }
    var PHASE_LABELS = {
      context: "phase.context",
      decision: "phase.decision",
      act: "phase.act",
      observe: "phase.observe"
    };
    function phaseLabel(kind) {
      return PHASE_LABELS[kind];
    }
    function phaseFact(kind, request, t) {
      switch (kind) {
        case "context": {
          const input = request.usage?.inputTokens;
          return input === void 0 ? "\u2014" : `\u5165 ${formatTokens(input)}`;
        }
        case "decision": {
          const phases = requestPhases(request);
          const ms = phases.find((phase) => phase.kind === "decision")?.ms ?? 0;
          return formatDuration(ms);
        }
        case "act":
          return fill(t("loop.toolsCount"), { n: request.tools.length });
        case "observe":
          return request.resultChars >= 1024 ? `${formatTokens(request.resultChars)} \u5B57` : `${request.resultChars} \u5B57`;
      }
    }
    function SignalBadge({ signal, t }) {
      const key = `signal.${signal.kind}`;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "tv-signal", "data-kind": signal.kind, title: signal.detail ?? t(key), children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-kind", children: t(key) }),
        signal.detail !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-detail", children: signal.detail })
      ] });
    }
    function ToolChip({
      tool,
      now,
      selected,
      onPick
    }) {
      const end = tool.end;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          type: "button",
          className: "tv-tool-chip",
          "data-status": tool.status,
          "data-on": selected ? "true" : void 0,
          style: { ["--tv-tool"]: TOOL_COLORS[tool.category] },
          title: `${tool.name} \xB7 ${end === void 0 ? "\u2026" : formatDuration(tool.end - tool.start)}`,
          onClick: (event) => {
            event.stopPropagation();
            onPick();
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-tool-dot" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-tool-name", children: toolDisplayName(tool.name) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-tool-dur", children: end === void 0 ? "\u2026" : formatDuration(end - tool.start) })
          ]
        }
      );
    }
    function LoopCard({
      request,
      turn,
      turnUserText,
      now,
      selection,
      active,
      onSelect,
      t
    }) {
      const loopMs = Math.max(0, (request.end ?? now) - request.start);
      const running = request.open === true;
      const selectedPhase = selection !== null && selection.kind === "phase" && selection.turn === request.turn && selection.step === request.step ? selection.phase : void 0;
      const selectedLoop = selection !== null && (selection.kind === "phase" || selection.kind === "conversation" || selection.kind === "request") && selection.turn === request.turn && selection.step === request.step;
      const conversationSelected = selection !== null && selection.kind === "conversation" && selection.turn === request.turn && selection.step === request.step;
      const toolSelectedId = selection !== null && selection.kind === "tool" ? selection.id : void 0;
      const phases = requestPhases(request);
      const tokens = request.usage;
      const meta = fill(t("loop.meta"), {
        duration: formatDuration(loopMs),
        input: formatTokens(tokens?.inputTokens),
        output: formatTokens(tokens?.outputTokens),
        tools: request.tools.length
      });
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "article",
        {
          className: "tv-loop",
          "data-loop-id": `${request.turn}:${request.step}`,
          "data-selected": selectedLoop || conversationSelected ? "true" : void 0,
          "data-active": active ? "true" : void 0,
          "data-running": running ? "true" : void 0,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-loop-node", "aria-hidden": "true", children: request.index }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-loop-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                "header",
                {
                  className: "tv-loop-head",
                  onClick: () => {
                    onSelect({ kind: "conversation", turn: request.turn, step: request.step });
                  },
                  title: t("phase.conversation"),
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                      LoopRing,
                      {
                        request,
                        index: request.index,
                        selectedPhase,
                        running,
                        t,
                        onPickPhase: (phase) => {
                          onSelect({ kind: "phase", turn: request.turn, step: request.step, phase });
                        }
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-loop-titles", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-loop-title", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "tv-loop-name", children: [
                          t("loop.title"),
                          " ",
                          request.index
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-loop-sub", children: fill(t("loop.sub"), { turn: request.turn, step: request.step }) }),
                        request.index === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-loop-badge", children: t("phase.conversation") })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tv-loop-meta", children: meta })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-loop-status", "data-status": running ? "running" : request.interrupted === true ? "interrupted" : void 0, children: running ? t("status.running") : request.interrupted === true ? t("status.interrupted") : "" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-loop-chips", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "button",
                  {
                    type: "button",
                    className: "tv-chip",
                    "data-on": conversationSelected ? "true" : void 0,
                    style: { ["--tv-chip"]: "var(--tv-cat-agent)" },
                    title: t("phase.conversation"),
                    onClick: (event) => {
                      event.stopPropagation();
                      onSelect({ kind: "conversation", turn: request.turn, step: request.step });
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-chip-dot" }),
                      t("phase.conversation")
                    ]
                  }
                ),
                PHASE_ORDER.map((kind) => {
                  const phase = phases.find((candidate) => candidate.kind === kind);
                  const ms = phase?.ms ?? 0;
                  const on = selectedPhase === kind;
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "button",
                    {
                      type: "button",
                      className: "tv-chip",
                      "data-on": on ? "true" : void 0,
                      "data-empty": kind === "act" && request.tools.length === 0 ? "true" : void 0,
                      style: { ["--tv-chip"]: PHASE_COLORS[kind] },
                      title: `${t(phaseLabel(kind))} \xB7 ${t(`phase.${kind}.hint`)}`,
                      onClick: (event) => {
                        event.stopPropagation();
                        onSelect({ kind: "phase", turn: request.turn, step: request.step, phase: kind });
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-chip-dot" }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-chip-label", children: t(phaseLabel(kind)) }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-chip-fact", children: phaseFact(kind, request, t) })
                      ]
                    },
                    kind
                  );
                })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-loop-signals", children: [
                request.retries.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "tv-signal", "data-kind": "retry", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-kind", children: t("decision.retries") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-detail", children: request.retries.length })
                ] }),
                request.attempts > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "tv-signal", "data-kind": "attempt", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-kind", children: t("decision.attempts") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-detail", children: request.attempts })
                ] }),
                request.approvals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "tv-signal", "data-kind": "approval", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-kind", children: t("signal.approval") }),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-signal-detail", children: request.approvals.length })
                ] }),
                request.signals.map((signal, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignalBadge, { signal, t }, `${signal.kind}-${index}`))
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tv-loop-tools", children: request.tools.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-loop-notools", children: t("loop.noTools") }) : request.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                ToolChip,
                {
                  tool,
                  now,
                  selected: toolSelectedId === tool.id,
                  onPick: () => {
                    onSelect({ kind: "tool", id: tool.id });
                  }
                },
                tool.id
              )) }),
              turnUserText !== void 0 && request.index === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-loop-user", title: turnUserText, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-loop-user-label", children: t("conversation.user") }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-loop-user-text", children: oneLine(turnUserText, 120) })
              ] })
            ] })
          ]
        }
      );
    }
    function LoopChart({
      model,
      now,
      selection,
      activeLoopId,
      onSelect,
      t
    }) {
      const loops = [];
      for (const turn of model.turns) {
        for (const request of turn.requests) {
          loops.push({
            turn: turn.turn,
            ...turn.userText === void 0 ? {} : { turnUserText: turn.userText },
            request
          });
        }
      }
      const maxDuration = loops.reduce(
        (max, loop) => Math.max(max, Math.max(0, (loop.request.end ?? now) - loop.request.start)),
        1
      );
      let selectedLoopId;
      if (selection !== null) {
        if (selection.kind === "tool") {
          const owner = loops.find((loop) => loop.request.tools.some((tool) => tool.id === selection.id));
          selectedLoopId = owner === void 0 ? void 0 : `${owner.request.turn}:${owner.request.step}`;
        } else if (selection.kind === "phase" || selection.kind === "conversation" || selection.kind === "request") {
          selectedLoopId = `${selection.turn}:${selection.step}`;
        }
      }
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-loopview", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "tv-ribbon", title: t("loop.ribbon"), children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tv-ribbon-label", children: t("loop.ribbon") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tv-ribbon-strip", children: loops.map((loop) => {
            const duration = Math.max(0, (loop.request.end ?? now) - loop.request.start);
            const height = 3 + Math.round(Math.sqrt(duration / maxDuration) * 26);
            const id = `${loop.request.turn}:${loop.request.step}`;
            return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                type: "button",
                className: "tv-ribbon-bar",
                "data-selected": selectedLoopId === id ? "true" : void 0,
                "data-running": loop.request.open === true ? "true" : void 0,
                "data-failed": loop.request.tools.some((tool) => tool.status === "failed") ? "true" : void 0,
                style: { height: `${height}px` },
                title: `LOOP ${loop.request.index} \xB7 ${formatDuration(duration)}`,
                onClick: () => {
                  onSelect(loop.request.index === 1 ? { kind: "conversation", turn: loop.request.turn, step: loop.request.step } : { kind: "phase", turn: loop.request.turn, step: loop.request.step, phase: "decision" });
                }
              },
              id
            );
          }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tv-loop-list", children: loops.map((loop, index) => {
          const previous = loops[index - 1];
          const newTurn = previous === void 0 || previous.turn !== loop.turn;
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Fragment, { children: [
            newTurn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "tv-loop-turndiv", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: fill(t("row.turn"), { n: loop.turn }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              LoopCard,
              {
                request: loop.request,
                turn: loop.turn,
                turnUserText: loop.turnUserText,
                now,
                selection,
                active: activeLoopId === `${loop.request.turn}:${loop.request.step}`,
                onSelect,
                t
              }
            )
          ] }, `${loop.request.turn}:${loop.request.step}`);
        }) })
      ] });
    }

    // src/client/selection.ts
    function sameSelection(left, right) {
      if (left === null || right === null) return left === right;
      if (left.kind !== right.kind) return false;
      switch (left.kind) {
        case "tool":
          return right.kind === "tool" && left.id === right.id;
        case "request":
          return right.kind === "request" && left.turn === right.turn && left.step === right.step;
        case "turn":
          return right.kind === "turn" && left.turn === right.turn;
        case "approval":
          return right.kind === "approval" && left.id === right.id;
        case "phase":
          return right.kind === "phase" && left.turn === right.turn && left.step === right.step && left.phase === right.phase;
        case "conversation":
          return right.kind === "conversation" && left.turn === right.turn && left.step === right.step;
      }
    }

    // src/client/panel.tsx
    var import_jsx_runtime2 = require("react/jsx-runtime");
    var LEGEND = [
      { key: "legend.llmWait", swatch: "var(--tv-cat-wait)" },
      { key: "legend.llmGen", swatch: "var(--tv-cat-llm)" },
      { key: "legend.fsRead", swatch: "var(--tv-cat-fs-read)" },
      { key: "legend.fsWrite", swatch: "var(--tv-cat-fs-write)" },
      { key: "legend.bash", swatch: "var(--tv-cat-bash)" },
      { key: "legend.search", swatch: "var(--tv-cat-search)" },
      { key: "legend.web", swatch: "var(--tv-cat-web)" },
      { key: "legend.agent", swatch: "var(--tv-cat-agent)" },
      { key: "legend.failed", swatch: "var(--tv-cat-failed)" }
    ];
    var ZOOM_MIN = 1;
    var ZOOM_MAX = 6;
    var ZOOM_STEP = 1.5;
    function ratio(part, whole) {
      if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return 0;
      return Math.max(0, Math.min(1, part / whole));
    }
    function longestActivity(model, now) {
      const durations = [];
      for (const turn of model.turns) {
        for (const request of turn.requests) {
          if (request.end !== void 0) durations.push(request.end - request.start);
          for (const tool of request.tools) {
            if (tool.end !== void 0) durations.push(tool.end - tool.start);
          }
          for (const approval of request.approvals) {
            if (approval.decided !== void 0) durations.push(approval.decided - approval.asked);
          }
        }
      }
      if (durations.length === 0) {
        for (const turn of model.turns) {
          for (const request of turn.requests) {
            durations.push((request.end ?? now) - request.start);
            for (const tool of request.tools) durations.push((tool.end ?? now) - tool.start);
          }
        }
      }
      if (durations.length === 0) return 1;
      durations.sort((left, right) => left - right);
      const percentile = durations[Math.min(durations.length - 1, Math.floor(durations.length * 0.9))];
      return Math.max(percentile, 500);
    }
    function buildLayout(model, mode, compressed, now) {
      const axis = buildAxis(model, { compressed });
      const maxDurationMs = longestActivity(model, now);
      const place = (start, end) => {
        if (mode === "time") {
          const left = axis.toPercent(Math.max(start, axis.t0));
          return { left: `${left}%`, width: `${Math.max(0.35, axis.toPercent(end) - left)}%` };
        }
        return { left: "0%", width: `${Math.min(100, Math.max(0.6, (end - start) / maxDurationMs * 100))}%` };
      };
      const ticks = mode === "time" ? axis.ticks : [0, 0.25, 0.5, 0.75].map((fraction, index) => ({
        percent: fraction * 100,
        label: formatDuration(maxDurationMs * fraction),
        major: index === 0
      }));
      return { mode, axis, place, ticks, maxDurationMs };
    }
    function Gridlines({ layout }) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: layout.ticks.map((tick, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "span",
        {
          className: "tv-gridline",
          style: { left: `${tick.percent}%` }
        },
        `${tick.percent}-${index}`
      )) });
    }
    function RequestBar({
      request,
      layout,
      now,
      selected,
      onSelect
    }) {
      const start = request.dispatchTime ?? request.start;
      const end = request.end ?? now;
      const span = Math.max(1, end - start);
      const waitEnd = request.firstToken ?? request.messageTime ?? end;
      const genEnd = request.lastToken ?? waitEnd;
      const waitPct = ratio(waitEnd - start, span) * 100;
      const genPct = ratio(genEnd - Math.max(waitEnd, start), span) * 100;
      const tailPct = Math.max(0, 100 - waitPct - genPct);
      const placement = layout.place(start, end);
      const running = request.open === true;
      const title = [
        `#${request.index}`,
        formatDuration(end - start),
        request.model ?? "",
        request.firstToken !== void 0 ? `TTFT ${formatDuration(request.firstToken - start)}` : "",
        request.usage !== void 0 ? `\u2191${formatTokens(request.usage.inputTokens)} \u2193${formatTokens(request.usage.outputTokens)}` : ""
      ].filter((part) => part !== "").join(" \xB7 ");
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "span",
        {
          className: "tv-bar",
          "data-interrupted": request.interrupted === true ? "true" : void 0,
          "data-running": running ? "true" : void 0,
          "data-selected": selected ? "true" : void 0,
          style: placement,
          title,
          onClick: () => onSelect({ kind: "request", turn: request.turn, step: request.step }),
          children: [
            waitPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-seg", "data-seg": "wait", style: { left: "0%", width: `${waitPct}%` } }),
            genPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-seg", "data-seg": "gen", style: { left: `${waitPct}%`, width: `${genPct}%` } }),
            tailPct > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-seg", "data-seg": "tail", style: { left: `${waitPct + genPct}%`, width: `${tailPct}%` } })
          ]
        }
      );
    }
    function ToolBar({
      tool,
      layout,
      now,
      selected,
      onSelect
    }) {
      const end = tool.end ?? now;
      const title = [
        tool.name,
        formatDuration(end - tool.start),
        tool.status,
        tool.error?.reason ?? ""
      ].filter((part) => part !== "").join(" \xB7 ");
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "span",
        {
          className: "tv-bar",
          "data-status": tool.status === "running" ? void 0 : tool.status,
          "data-running": tool.status === "running" ? "true" : void 0,
          "data-selected": selected ? "true" : void 0,
          style: { ...layout.place(tool.start, end), ["--tv-bar"]: TOOL_COLORS[tool.category] },
          title,
          onClick: () => onSelect({ kind: "tool", id: tool.id })
        }
      );
    }
    function ApprovalBar({
      approval,
      layout,
      now,
      onSelect
    }) {
      const end = approval.decided ?? now;
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "span",
        {
          className: "tv-bar-approval",
          style: layout.place(approval.asked, end),
          title: `${approval.toolName ?? "approval"} \xB7 ${formatDuration(end - approval.asked)}`,
          onClick: () => onSelect({ kind: "approval", id: approval.id })
        }
      );
    }
    function RequestRows({
      request,
      layout,
      now,
      selection,
      onSelect,
      t,
      toolsOnly
    }) {
      const selected = selection !== null && selection.kind === "request" && selection.turn === request.turn && selection.step === request.step;
      const end = request.end ?? now;
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        !toolsOnly && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: "tv-row",
            "data-clickable": "true",
            "data-selected": selected ? "true" : void 0,
            "data-kind": "request",
            onClick: () => onSelect({ kind: "request", turn: request.turn, step: request.step }),
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-row-label", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-dot", style: { ["--tv-dot"]: "var(--tv-cat-llm)" } }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-label-name", children: fill(t("row.request"), { n: request.index }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-track", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Gridlines, { layout }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(RequestBar, { request, layout, now, selected, onSelect }),
                request.retries.map((retry, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "span",
                  {
                    className: "tv-retry-mark",
                    style: { left: `${layout.mode === "time" ? layout.axis.toPercent(retry.time) : 100}%` },
                    title: retry.failure?.reason ?? retry.failure?.code ?? "retry"
                  },
                  `retry-${index}`
                )),
                request.approvals.map((approval) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ApprovalBar, { approval, layout, now, onSelect }, approval.id))
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-row-dur", children: formatDuration(end - (request.dispatchTime ?? request.start)) })
            ]
          }
        ),
        request.tools.map((tool) => {
          const toolSelected = selection !== null && selection.kind === "tool" && selection.id === tool.id;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: "tv-row",
              "data-clickable": "true",
              "data-selected": toolSelected ? "true" : void 0,
              "data-kind": "tool",
              onClick: () => onSelect({ kind: "tool", id: tool.id }),
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-row-label", "data-indent": toolsOnly ? "false" : "true", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-dot", style: { ["--tv-dot"]: TOOL_COLORS[tool.category] } }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-label-name", children: toolDisplayName(tool.name) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-track", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Gridlines, { layout }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ToolBar, { tool, layout, now, selected: toolSelected, onSelect })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-row-dur", children: tool.end === void 0 ? t("tool.running") : formatDuration(tool.end - tool.start) })
              ]
            },
            tool.id
          );
        })
      ] });
    }
    function findRequest(model, turn, step) {
      return model.turns.find((candidate) => candidate.turn === turn)?.requests.find((candidate) => candidate.step === step);
    }
    function phaseMs(request, kind) {
      return requestPhases(request).find((phase) => phase.kind === kind)?.ms ?? 0;
    }
    function loopStatus(request, t) {
      if (request.open === true) return t("status.running");
      if (request.interrupted === true) return t("status.interrupted");
      return t("status.completed");
    }
    function usageLine(usage, t) {
      if (usage === void 0) return "\u2014";
      const parts = [fill(t("usage.value"), {
        input: formatTokens(usage.inputTokens),
        output: formatTokens(usage.outputTokens),
        cacheRead: formatTokens(usage.cacheReadTokens)
      })];
      if (usage.totalTokens !== void 0) parts.push(fill(t("usage.total"), { total: formatTokens(usage.totalTokens) }));
      return parts.join(" \xB7 ");
    }
    function DetailBody({
      selection,
      model,
      now,
      t,
      onSelect
    }) {
      if (selection.kind === "tool") {
        for (const turn of model.turns) {
          for (const request of turn.requests) {
            const tool = request.tools.find((candidate) => candidate.id === selection.id);
            if (tool !== void 0) {
              const status = tool.status === "failed" ? t("status.failed") : tool.status === "cancelled" ? t("status.cancelled") : tool.status === "running" ? t("status.running") : t("status.completed");
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.status") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { className: tool.status === "failed" ? "tv-status-failed" : "tv-status-ok", children: status }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.duration") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatDuration((tool.end ?? now) - tool.start) }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.start") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatOffset(tool.start - model.t0) }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.callId") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: tool.id })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("detail.args") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: prettyJson(tool.arguments) })
                ] }),
                tool.error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("detail.status") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code tv-status-failed", children: `${tool.error.name} (${tool.error.code})
    ${tool.error.reason ?? ""}` })
                ] }),
                tool.resultText !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("detail.result") }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: tool.resultText.slice(0, 8e3) })
                ] })
              ] });
            }
          }
        }
        return null;
      }
      if (selection.kind === "request") {
        const request = model.turns.find((turn) => turn.turn === selection.turn)?.requests.find((candidate) => candidate.step === selection.step);
        if (request === void 0) return null;
        const dispatch = request.dispatchTime ?? request.start;
        const firstToken = request.firstToken;
        const lastToken = request.lastToken;
        const outputTokens = request.usage?.outputTokens ?? 0;
        const speed = firstToken !== void 0 && lastToken !== void 0 && lastToken > firstToken && outputTokens > 0 ? `${(outputTokens / ((lastToken - firstToken) / 1e3)).toFixed(1)} tok/s` : void 0;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.status") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.interrupted === true ? t("status.interrupted") : request.open === true ? t("status.running") : t("status.completed") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.model") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: [request.provider, request.model].filter((part) => part !== void 0 && part !== "").join(" / ") || "\u2014" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.duration") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatDuration((request.end ?? now) - dispatch) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.wait") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: firstToken !== void 0 ? formatDuration(firstToken - dispatch) : "\u2014" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.speed") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: speed ?? "\u2014" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.usage") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: usageLine(request.usage, t) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.start") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatOffset(dispatch - model.t0) })
          ] }),
          request.reasoningText !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("detail.reasoning") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: request.reasoningText.slice(-6e3) })
          ] }),
          request.assistantText !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("detail.result") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: request.assistantText.slice(0, 6e3) })
          ] })
        ] });
      }
      if (selection.kind === "phase") {
        const request = findRequest(model, selection.turn, selection.step);
        if (request === void 0) return null;
        const turn = model.turns.find((candidate) => candidate.turn === selection.turn);
        const usage = request.usage;
        if (selection.phase === "context") {
          const window = request.context.contextWindow;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.route") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: [request.provider, request.model].filter((part) => part !== void 0 && part !== "").join(" / ") || "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.reason") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.context.headerReason ?? "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.inputTokens") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatTokens(usage?.inputTokens) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.cache") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dd", { children: [
                formatTokens(usage?.cacheReadTokens),
                " / ",
                formatTokens(usage?.cacheWriteTokens)
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.window") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: window !== void 0 && usage !== void 0 ? `${formatPercent(usage.inputTokens, window)} \xB7 ${formatTokens(usage.inputTokens)} / ${formatTokens(window)}` : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.tools") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.context.toolCount ?? "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.maxTokens") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.context.maxTokens !== void 0 ? formatTokens(request.context.maxTokens) : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.reasoningEffort") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.context.reasoningEffort ?? "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.promptMode") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.context.systemPromptUpdate ?? "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("context.systemChars") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.context.systemChars !== void 0 ? String(request.context.systemChars) : "\u2014" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("context.userMessage") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: turn?.userText ?? t("conversation.empty") })
            ] }),
            request.context.developerNotes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("context.developerNotes") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-loop-signals", children: request.context.developerNotes.map((note, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "tv-signal", "data-kind": note.kind === "tools" ? "tools" : "workspace", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-signal-kind", children: note.kind === "tools" ? t("signal.tools") : t("context.developerNote") }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-signal-detail", children: note.kind === "tools" ? `${note.text} \u4E2A\u5DE5\u5177` : note.text })
              ] }, index)) })
            ] }),
            request.signals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("loop.signals") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-loop-signals", children: request.signals.map((signal, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "tv-signal", "data-kind": signal.kind, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-signal-kind", children: t(`signal.${signal.kind}`) }),
                signal.detail !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-signal-detail", children: signal.detail })
              ] }, index)) })
            ] })
          ] });
        }
        if (selection.phase === "decision") {
          const dispatch = request.dispatchTime ?? request.start;
          const firstToken = request.firstToken;
          const lastToken = request.lastToken;
          const outputTokens = usage?.outputTokens ?? 0;
          const speed = firstToken !== void 0 && lastToken !== void 0 && lastToken > firstToken && outputTokens > 0 ? `${(outputTokens / ((lastToken - firstToken) / 1e3)).toFixed(1)} tok/s` : void 0;
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.status") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: loopStatus(request, t) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.ttft") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: firstToken !== void 0 ? formatDuration(firstToken - dispatch) : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.generation") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: firstToken !== void 0 && lastToken !== void 0 ? formatDuration(lastToken - firstToken) : "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.speed") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: speed ?? "\u2014" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.outputTokens") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatTokens(outputTokens) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.reasoningChars") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.reasoningChars }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.textChars") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.outputChars }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.attempts") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.attempts }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.retries") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.retries.length })
            ] }),
            request.reasoningText !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("conversation.reasoning") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: request.reasoningText.slice(-6e3) })
            ] }),
            request.assistantText !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("conversation.assistant") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: request.assistantText.slice(0, 6e3) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("decision.toolsPicked") }),
              request.tools.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-loop-notools", children: t("loop.noTools") }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-loop-tools", children: request.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  type: "button",
                  className: "tv-tool-chip",
                  "data-status": tool.status,
                  onClick: () => {
                    onSelect({ kind: "tool", id: tool.id });
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tool-dot", style: { ["--tv-tool"]: TOOL_COLORS[tool.category] } }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tool-name", children: toolDisplayName(tool.name) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tool-dur", children: tool.end === void 0 ? "\u2026" : formatDuration(tool.end - tool.start) })
                  ]
                },
                tool.id
              )) })
            ] })
          ] });
        }
        if (selection.phase === "act") {
          const failed = request.tools.filter((tool) => tool.status === "failed" || tool.status === "cancelled").length;
          const total = request.tools.reduce((sum, tool) => sum + Math.max(0, (tool.end ?? now) - tool.start), 0);
          return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("act.tools") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: request.tools.length }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("act.failed") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { className: failed > 0 ? "tv-status-failed" : void 0, children: failed }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("act.total") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatDuration(total) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.status") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: loopStatus(request, t) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-phase-tools", children: request.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "div",
              {
                className: "tv-phase-tool",
                "data-clickable": "true",
                onClick: () => {
                  onSelect({ kind: "tool", id: tool.id });
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-phase-tool-head", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tool-dot", style: { ["--tv-tool"]: TOOL_COLORS[tool.category] } }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tool-name", children: toolDisplayName(tool.name) }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "tv-label-meta", children: [
                      tool.end === void 0 ? t("tool.running") : formatDuration(tool.end - tool.start),
                      " \xB7 ",
                      tool.status === "failed" ? t("status.failed") : tool.status === "cancelled" ? t("status.cancelled") : tool.status === "running" ? t("status.running") : t("status.completed")
                    ] })
                  ] }),
                  tool.resultText !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-phase-tool-body", children: tool.resultText.slice(0, 400) })
                ]
              },
              tool.id
            )) })
          ] });
        }
        const indexInTurn = turn?.requests.indexOf(request) ?? -1;
        const hasNext = turn !== void 0 && indexInTurn >= 0 && indexInTurn < turn.requests.length - 1;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("observe.chars") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatTokens(request.resultChars) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("observe.errors") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { className: request.resultErrors > 0 ? "tv-status-failed" : void 0, children: request.resultErrors }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("observe.next") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: hasNext ? t("observe.nextLoop") : t("observe.turnEnd") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.duration") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatDuration(phaseMs(request, "observe")) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("observe.results") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-phase-tools", children: [
              request.tools.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-loop-notools", children: t("observe.noResult") }),
              request.tools.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "div",
                {
                  className: "tv-phase-tool",
                  "data-clickable": "true",
                  onClick: () => {
                    onSelect({ kind: "tool", id: tool.id });
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-phase-tool-head", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tool-dot", style: { ["--tv-tool"]: TOOL_COLORS[tool.category] } }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tool-name", children: toolDisplayName(tool.name) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-label-meta", children: tool.error !== void 0 ? tool.error.code : tool.resultText === void 0 ? "\u2014" : `${tool.resultText.length} \u5B57` })
                    ] }),
                    tool.error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-phase-tool-body tv-status-failed", children: `${tool.error.name} (${tool.error.code})
    ${tool.error.reason ?? ""}` }),
                    tool.error === void 0 && tool.resultText !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-phase-tool-body", children: tool.resultText.slice(0, 300) })
                  ]
                },
                tool.id
              ))
            ] })
          ] })
        ] });
      }
      if (selection.kind === "conversation") {
        const request = findRequest(model, selection.turn, selection.step);
        if (request === void 0) return null;
        const turn = model.turns.find((candidate) => candidate.turn === selection.turn);
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("loop.title") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dd", { children: [
              request.index,
              " \xB7 ",
              fill(t("loop.sub"), { turn: request.turn, step: request.step })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("decision.status") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: loopStatus(request, t) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.duration") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatDuration((request.end ?? now) - request.start) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("conversation.user") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: turn?.userText ?? t("conversation.empty") })
          ] }),
          request.reasoningText !== "" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("conversation.reasoning") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: request.reasoningText.slice(-4e3) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("section", { className: "tv-section", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-section-title", children: t("conversation.assistant") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("pre", { className: "tv-code", children: request.assistantText !== "" ? request.assistantText.slice(0, 6e3) : "\u2014" })
          ] })
        ] });
      }
      if (selection.kind === "turn") {
        const turn = model.turns.find((candidate) => candidate.turn === selection.turn);
        if (turn === void 0) return null;
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.status") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: turn.end === void 0 ? t("status.running") : t("status.completed") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.duration") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatDuration((turn.end ?? now) - turn.start) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.start") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatOffset(turn.start - model.t0) }),
          turn.endReason !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.turnEnd") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: turn.endReason })
          ] }),
          turn.userText !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.result") }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: turn.userText.slice(0, 2e3) })
          ] })
        ] });
      }
      for (const turn of model.turns) {
        for (const request of turn.requests) {
          const approval = request.approvals.find((candidate) => candidate.id === selection.id);
          if (approval !== void 0) {
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("dl", { className: "tv-kv", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.status") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: approval.outcome ?? (approval.decided === void 0 ? t("status.waiting") : t("status.completed")) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.duration") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: formatDuration((approval.decided ?? now) - approval.asked) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dt", { children: t("detail.args") }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("dd", { children: approval.toolName ?? "\u2014" })
            ] });
          }
        }
      }
      return null;
    }
    function selectionHeading(model, selection, t) {
      if (selection.kind === "tool") {
        for (const turn of model.turns) {
          for (const request of turn.requests) {
            const tool = request.tools.find((candidate) => candidate.id === selection.id);
            if (tool !== void 0) return { title: toolDisplayName(tool.name), subtitle: t("detail.title.tool") };
          }
        }
        return null;
      }
      if (selection.kind === "request") {
        const request = model.turns.find((turn) => turn.turn === selection.turn)?.requests.find((candidate) => candidate.step === selection.step);
        if (request === void 0) return null;
        return { title: `#${request.index} ${request.model ?? ""}`.trim(), subtitle: t("detail.title.request") };
      }
      if (selection.kind === "turn") {
        const turn = model.turns.find((candidate) => candidate.turn === selection.turn);
        return { title: fill(t("row.turn"), { n: selection.turn }), subtitle: turn?.endReason };
      }
      if (selection.kind === "phase") {
        const request = findRequest(model, selection.turn, selection.step);
        if (request === void 0) return null;
        return {
          title: `${t(`phase.${selection.phase}`)} \xB7 ${t("loop.title")} ${request.index}`,
          subtitle: t(`phase.${selection.phase}.hint`)
        };
      }
      if (selection.kind === "conversation") {
        const request = findRequest(model, selection.turn, selection.step);
        if (request === void 0) return null;
        return {
          title: `${t("phase.conversation")} \xB7 ${t("loop.title")} ${request.index}`,
          subtitle: fill(t("loop.sub"), { turn: request.turn, step: request.step })
        };
      }
      return { title: t("detail.title.tool"), subtitle: selection.id };
    }
    function TrajectoryPanel(props) {
      const { useEvents, useSession, t, loadOlder } = props;
      const eventWindow = useEvents((snapshot) => snapshot);
      const running = useSession((snapshot) => snapshot.running === true);
      const [collapsed, setCollapsed] = (0, import_react2.useState)(/* @__PURE__ */ new Set());
      const [toolsOnly, setToolsOnly] = (0, import_react2.useState)(false);
      const [mode, setMode] = (0, import_react2.useState)("bars");
      const [compressed, setCompressed] = (0, import_react2.useState)(true);
      const [follow, setFollow] = (0, import_react2.useState)(true);
      const [zoom, setZoom] = (0, import_react2.useState)(1);
      const [selection, setSelection] = (0, import_react2.useState)(null);
      const [loadingOlder, setLoadingOlder] = (0, import_react2.useState)(false);
      const [playing, setPlaying] = (0, import_react2.useState)(false);
      const [now, setNow] = (0, import_react2.useState)(() => Date.now());
      const chartRef = (0, import_react2.useRef)(null);
      const playIndexRef = (0, import_react2.useRef)(0);
      (0, import_react2.useEffect)(() => {
        if (!running) return void 0;
        const timer = setInterval(() => {
          setNow(Date.now());
        }, 1e3);
        return () => {
          clearInterval(timer);
        };
      }, [running]);
      (0, import_react2.useEffect)(() => {
        setNow(Date.now());
      }, [eventWindow.revision]);
      const model = (0, import_react2.useMemo)(
        () => buildModel(eventWindow.entries, { now, hasMore: eventWindow.hasMore }),
        [eventWindow.entries, eventWindow.hasMore, now]
      );
      const layout = (0, import_react2.useMemo)(() => buildLayout(model, mode, compressed, now), [model, mode, compressed, now]);
      const loops = (0, import_react2.useMemo)(
        () => model.turns.flatMap((turn) => turn.requests.map((request) => ({ turn: turn.turn, request }))),
        [model]
      );
      const loopsRef = (0, import_react2.useRef)(loops);
      loopsRef.current = loops;
      (0, import_react2.useEffect)(() => {
        if (mode !== "loop" && playing) setPlaying(false);
      }, [mode, playing]);
      (0, import_react2.useEffect)(() => {
        if (!playing) return void 0;
        const timer = setInterval(() => {
          const current = loopsRef.current;
          if (current.length === 0) return;
          playIndexRef.current = (playIndexRef.current + 1) % current.length;
          const loop = current[playIndexRef.current];
          if (loop === void 0) return;
          setSelection(loop.request.index === 1 ? { kind: "conversation", turn: loop.turn, step: loop.request.step } : { kind: "phase", turn: loop.turn, step: loop.request.step, phase: "decision" });
        }, 1400);
        return () => {
          clearInterval(timer);
        };
      }, [playing]);
      (0, import_react2.useEffect)(() => {
        if (!playing || mode !== "loop") return;
        if (selection === null || !(selection.kind === "phase" || selection.kind === "conversation" || selection.kind === "request")) return;
        const card = chartRef.current?.querySelector(`[data-loop-id="${selection.turn}:${selection.step}"]`);
        if (card instanceof HTMLElement) card.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, [playing, mode, selection]);
      const togglePlay = (0, import_react2.useCallback)(() => {
        setPlaying((value) => {
          if (!value) {
            const index = selection !== null && (selection.kind === "phase" || selection.kind === "conversation" || selection.kind === "request") ? loops.findIndex((loop) => loop.turn === selection.turn && loop.request.step === selection.step) : 0;
            playIndexRef.current = index >= 0 ? index : 0;
          }
          return !value;
        });
      }, [loops, selection]);
      const toggleTurn = (0, import_react2.useCallback)((turn) => {
        setCollapsed((previous) => {
          const next = new Set(previous);
          if (next.has(turn)) next.delete(turn);
          else next.add(turn);
          return next;
        });
      }, []);
      const select = (0, import_react2.useCallback)((next) => {
        setSelection((current) => sameSelection(current, next) ? null : next);
      }, []);
      (0, import_react2.useEffect)(() => {
        if (!follow) return;
        const element = chartRef.current;
        if (element === null) return;
        element.scrollLeft = element.scrollWidth;
        element.scrollTop = element.scrollHeight;
      }, [follow, model.t1, zoom, mode]);
      const loadMore = (0, import_react2.useCallback)(() => {
        if (loadOlder === void 0 || loadingOlder) return;
        setLoadingOlder(true);
        void Promise.resolve(loadOlder()).finally(() => {
          setLoadingOlder(false);
        });
      }, [loadOlder, loadingOlder]);
      const totals = model.totals;
      const haveTurns = model.turns.length > 0;
      const heading = selection === null ? null : selectionHeading(model, selection, t);
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-root", "data-dsh-loopscope": "", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-headline", children: t("tab.title") }),
          running && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-pill", children: t("status.running") })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-summary", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            SummaryCard,
            {
              label: t("summary.duration"),
              value: formatDuration(totals.activeMs > 0 ? totals.activeMs : model.t1 - model.t0, t),
              title: fill(t("summary.spanTitle"), { span: formatDuration(model.t1 - model.t0, t) })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            SummaryCard,
            {
              label: t("summary.turns"),
              value: fill(t("summary.turns.value"), { turns: totals.turns, steps: totals.requests })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            SummaryCard,
            {
              label: t("summary.tools"),
              value: fill(t("summary.tools.value"), { calls: totals.toolCalls, failed: totals.toolFailures })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            SummaryCard,
            {
              label: t("summary.tokens"),
              value: fill(t("summary.tokens.value"), {
                input: formatTokens(totals.inputTokens),
                output: formatTokens(totals.outputTokens)
              })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            SummaryCard,
            {
              label: t("summary.latency"),
              value: fill(t("summary.latency.value"), {
                wait: totals.averageFirstTokenMs !== void 0 ? formatDuration(totals.averageFirstTokenMs) : "\u2014",
                gen: totals.averageGenerationMs !== void 0 ? formatDuration(totals.averageGenerationMs) : "\u2014"
              })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            SummaryCard,
            {
              label: t("summary.cache"),
              value: fill(t("summary.cache.value"), {
                rate: formatPercent(totals.cacheReadTokens, totals.cacheReadTokens + totals.inputTokens),
                read: formatTokens(totals.cacheReadTokens)
              })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-toolbar", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "tv-segmented", role: "group", "aria-label": t("toolbar.modeHint"), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                "data-on": mode === "bars" ? "true" : "false",
                onClick: () => {
                  setMode("bars");
                },
                title: t("toolbar.modeHint"),
                children: t("toolbar.modeBars")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                "data-on": mode === "time" ? "true" : "false",
                onClick: () => {
                  setMode("time");
                },
                title: t("toolbar.modeHint"),
                children: t("toolbar.modeTime")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                "data-on": mode === "loop" ? "true" : "false",
                onClick: () => {
                  setMode("loop");
                },
                title: t("hint.loop"),
                children: t("toolbar.modeLoop")
              }
            )
          ] }),
          mode === "loop" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "tv-btn",
              "data-on": playing ? "true" : "false",
              onClick: togglePlay,
              disabled: !haveTurns,
              children: playing ? `\u23F8 ${t("toolbar.pause")}` : `\u25B6 ${t("toolbar.play")}`
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                onClick: () => {
                  setCollapsed((previous) => {
                    if (previous.size > 0) return /* @__PURE__ */ new Set();
                    return new Set(model.turns.map((turn) => turn.turn));
                  });
                },
                disabled: !haveTurns,
                children: collapsed.size > 0 ? t("toolbar.expand") : t("toolbar.collapse")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                "data-on": toolsOnly ? "true" : "false",
                onClick: () => {
                  setToolsOnly((value) => !value);
                },
                children: toolsOnly ? t("toolbar.allRows") : t("toolbar.toolsOnly")
              }
            ),
            mode === "time" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                "data-on": compressed ? "true" : "false",
                onClick: () => {
                  setCompressed((value) => !value);
                },
                title: t("toolbar.compressHint"),
                children: t("toolbar.compress")
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                onClick: () => {
                  setZoom((value) => Math.max(ZOOM_MIN, value / ZOOM_STEP));
                },
                disabled: zoom <= ZOOM_MIN,
                title: t("toolbar.zoomOut"),
                children: "\u2212"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-btn",
                onClick: () => {
                  setZoom((value) => Math.min(ZOOM_MAX, value * ZOOM_STEP));
                },
                disabled: zoom >= ZOOM_MAX,
                title: t("toolbar.zoomIn"),
                children: "+"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              type: "button",
              className: "tv-btn",
              "data-on": follow ? "true" : "false",
              onClick: () => {
                setFollow((value) => !value);
              },
              children: t("toolbar.follow")
            }
          ),
          eventWindow.hasMore && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "tv-btn", onClick: loadMore, disabled: loadingOlder, children: loadingOlder ? t("loading") : t("loadOlder") })
        ] }),
        haveTurns ? mode === "loop" ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-chart", ref: chartRef, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            LoopChart,
            {
              model,
              now,
              selection,
              activeLoopId: playing && selection !== null && (selection.kind === "phase" || selection.kind === "conversation" || selection.kind === "request") ? `${selection.turn}:${selection.step}` : void 0,
              onSelect: select,
              t
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-hint", children: t("hint.loop") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-legend", children: PHASE_ORDER.map((phase) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "tv-legend-item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-legend-swatch", style: { ["--tv-swatch"]: PHASE_COLORS[phase] } }),
            t(`phase.${phase}`)
          ] }, phase)) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-chart", ref: chartRef, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-inner", style: { width: `${zoom * 100}%` }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Axis, { layout }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-rows", children: model.turns.map((turn) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              TurnRows,
              {
                turn,
                layout,
                now,
                collapsed: collapsed.has(turn.turn),
                selection,
                onToggle: () => {
                  toggleTurn(turn.turn);
                },
                onSelect: select,
                t,
                toolsOnly
              },
              `turn-${turn.turn}`
            )) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-hint", children: t("hint.select") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-legend", children: LEGEND.map((item) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "tv-legend-item", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-legend-swatch", style: { ["--tv-swatch"]: item.swatch } }),
            t(item.key)
          ] }, item.key)) })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-empty", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-empty-title", children: eventWindow.hasMore ? t("loading") : t("empty.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-empty-hint", children: t("empty.hint") })
        ] }),
        selection !== null && heading !== null && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-detail", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-detail-head", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "span",
              {
                className: "tv-dot",
                style: {
                  ["--tv-dot"]: selection.kind === "phase" ? PHASE_COLORS[selection.phase] : selection.kind === "request" || selection.kind === "conversation" ? "var(--tv-cat-llm)" : "var(--tv-cat-other)"
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-detail-title", children: heading.title }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-label-meta", children: heading.subtitle }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "button",
              {
                type: "button",
                className: "tv-detail-close",
                title: t("detail.close"),
                onClick: () => {
                  setSelection(null);
                },
                children: "\xD7"
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-detail-body", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DetailBody, { selection, model, now, t, onSelect: select }) })
        ] })
      ] });
    }
    function SummaryCard({ label, value, title }) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-card", title, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-card-label", children: label }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-card-value", children: value })
      ] });
    }
    function Axis({ layout }) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-axis", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-axis-spacer" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-axis-track", children: layout.ticks.map((tick, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-tick", "data-major": tick.major ? "true" : "false", style: { left: `${tick.percent}%` } }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "span",
            {
              className: "tv-tick-label",
              "data-align": tick.percent > 88 ? "right" : void 0,
              style: { left: `${tick.percent}%` },
              children: tick.label
            }
          )
        ] }, `${tick.percent}-${index}`)) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-axis-spacer" })
      ] });
    }
    function TurnRows({
      turn,
      layout,
      now,
      collapsed,
      selection,
      onToggle,
      onSelect,
      t,
      toolsOnly
    }) {
      const end = turn.end ?? now;
      const toolCount = turn.requests.reduce((sum, request) => sum + request.tools.length, 0);
      const turnSelected = selection !== null && selection.kind === "turn" && selection.turn === turn.turn;
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "div",
          {
            className: "tv-row",
            "data-clickable": "true",
            "data-kind": "turn",
            "data-selected": turnSelected ? "true" : void 0,
            onClick: onToggle,
            title: turn.userText ?? void 0,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-row-label", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-caret", "data-open": collapsed ? "false" : "true", children: "\u25B6" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "tv-label-name", children: fill(t("row.turn"), { n: turn.turn }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-track", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Gridlines, { layout }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "span",
                  {
                    className: "tv-turn-bar",
                    "data-running": turn.end === void 0 ? "true" : void 0,
                    style: layout.mode === "bars" ? { left: "0%", width: "100%" } : layout.place(turn.start, end),
                    title: `${formatDuration(end - turn.start)} \xB7 ${fill(t("row.toolsOfStep"), { calls: toolCount })}`
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "tv-row-dur", children: formatDuration(end - turn.start) })
            ]
          }
        ),
        !collapsed && turn.requests.map((request) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          RequestRows,
          {
            request,
            layout,
            now,
            selection,
            onSelect,
            t,
            toolsOnly
          },
          `request-${request.turn}-${request.step}`
        )),
        !collapsed && turn.requests.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "tv-hint", children: [
          t("status.waiting"),
          "\u2026"
        ] })
      ] });
    }

    // src/client/header.tsx
    var import_jsx_runtime3 = require("react/jsx-runtime");
    function ChartGlyph() {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { className: "tv-header-icon", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M2.5 13.5h11", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3.4", y: "8.2", width: "2.2", height: "4.1", rx: "0.7", fill: "currentColor", opacity: "0.55" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "6.9", y: "4.4", width: "2.2", height: "7.9", rx: "0.7", fill: "currentColor" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "10.4", y: "6.6", width: "2.2", height: "5.7", rx: "0.7", fill: "currentColor", opacity: "0.75" })
      ] });
    }
    function TrajectoryHeaderButton({ t, open }) {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("button", { type: "button", className: "tv-header-btn", "data-dsh-loopscope": "", title: t("header.title"), onClick: open, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChartGlyph, {}),
        t("header.label")
      ] });
    }

    // src/client/index.ts
    var name = "loopscope";
    var inject = ["slots", "sessions", "sidebarRightTabs", "sidebarRight", "locale"];
    var TAB_ID = "dsh-loopscope";
    var KIND = "loopscope";
    var EMPTY_WINDOW = Object.freeze({
      entries: Object.freeze([]),
      hasMore: false,
      revision: 0
    });
    function injectStyles() {
      if (typeof document === "undefined") return () => {
      };
      const existing = document.querySelector(`style[data-plugin-css="${STYLE_ID}"]`);
      if (existing !== null) return () => {
      };
      const tag = document.createElement("style");
      tag.dataset.plugin = "dsh-loopscope";
      tag.dataset.pluginCss = STYLE_ID;
      tag.textContent = STYLES;
      document.head.appendChild(tag);
      return () => {
        tag.remove();
      };
    }
    function apply(ctx) {
      ctx.effect(() => injectStyles(), "loopscope: styles");
      ctx.effect(() => ctx.locale.register(NS, { zh, en }), "loopscope: dictionaries");
      const t = ctx.locale.bind(NS);
      ctx.effect(() => ctx.sidebarRightTabs.register({
        id: TAB_ID,
        kind: KIND,
        title: () => t("tab.title"),
        guide: [{
          id: KIND,
          order: 240,
          title: () => t("tab.title"),
          description: () => t("tab.description")
        }]
      }), "loopscope: tab type");
      ctx.slots.inject("sidebar.right.pane.tab", () => ctx.slots.register({
        name: "sidebar.right.pane.tab",
        key: TAB_ID,
        locale: NS,
        inject: (sessionId) => {
          const binding = ctx.sessions.binding(sessionId);
          if (binding === void 0) {
            return {
              hooks: { events: { getSnapshot: () => EMPTY_WINDOW, subscribe: () => () => {
              } } }
            };
          }
          return {
            hooks: { events: binding.eventSource },
            ...typeof binding.session.loadOlder === "function" ? { loadOlder: () => binding.session.loadOlder?.() } : {}
          };
        }
      }, TrajectoryPanel));
      ctx.slots.inject("conversation.session.header.actions", () => ctx.slots.register({
        name: "conversation.session.header.actions",
        id: TAB_ID,
        order: 40,
        locale: NS,
        inject: () => ({
          open: () => {
            try {
              ctx.sidebarRight.openTab(KIND);
            } catch (error) {
              ctx.logger.warn("loopscope: could not open the chart tab: %s", error);
            }
          }
        })
      }, TrajectoryHeaderButton));
    }

    return module.exports;
  }
});
