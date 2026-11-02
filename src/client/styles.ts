/**
 * Panel stylesheet, injected once by the plugin through a tagged <style> tag.
 *
 * Feature packages in this product use CSS Modules; a linked out-of-tree plugin
 * ships one plain stylesheet instead and prefixes every class. Colors come from
 * the theme's semantic aliases wherever the theme owns a matching role; the
 * waterfall's categorical bar palette is the one place with fixed pigment values,
 * because the product has no categorical data-visualization tokens and the bars
 * must stay legible under both light and dark themes.
 */

/** Tag id of the stylesheet element, kept stable for hot reloads and disposal. */
export const STYLE_ID = 'dsh-loopscope/panel.css'

/** CSS custom properties: geometry plus the categorical palette. */
const TOKENS = `
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
`

export const STYLES = `
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
`
