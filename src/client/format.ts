/**
 * Small formatting helpers shared by the panel and the waterfall rows.
 * Kept free of React so the model layer can use them too.
 */

/** Translate function bound to this plugin's locale namespace. */
export type Translate = (key: string, vars?: Record<string, string | number>) => string

/** Fill `{name}` placeholders in one dictionary template. */
export function fill(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match)
}

/**
 * Compact duration: `412 ms`, `3.4 s`, `2 分 05 秒`.
 * @param ms - duration in milliseconds; negative and non-finite input reads as zero.
 */
export function formatDuration(ms: number, t?: Translate): string {
  const value = Number.isFinite(ms) && ms > 0 ? ms : 0
  if (value < 1000) return `${Math.round(value)} ms`
  const seconds = value / 1000
  if (seconds < 60) return `${seconds < 10 ? seconds.toFixed(1) : Math.round(seconds)} s`
  const minutes = Math.floor(seconds / 60)
  const rest = Math.round(seconds - minutes * 60)
  if (t !== undefined) return fill(t('time.m'), { m: minutes, s: String(rest).padStart(2, '0') })
  return `${minutes}m ${String(rest).padStart(2, '0')}s`
}

/** Compact token count: `0`, `812`, `12.9k`, `1.2M`. */
export function formatTokens(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return '—'
  if (value < 1000) return String(Math.round(value))
  if (value < 1_000_000) {
    const thousands = value / 1000
    return `${thousands < 10 ? thousands.toFixed(1) : Math.round(thousands)}k`
  }
  return `${(value / 1_000_000).toFixed(1)}M`
}

/** Percentage with one meaningful digit: `0%`, `42%`, `7.5%`. */
export function formatPercent(part: number, whole: number): string {
  if (!Number.isFinite(part) || !Number.isFinite(whole) || whole <= 0) return '0%'
  const pct = (part / whole) * 100
  if (pct >= 10) return `${Math.round(pct)}%`
  if (pct >= 1) return `${pct.toFixed(1)}%`
  return `${pct.toFixed(2)}%`
}

/** Clock offset on the waterfall axis: `0:03.4`. */
export function formatOffset(ms: number): string {
  const value = Math.max(0, ms)
  const seconds = Math.floor(value / 1000)
  const tenths = Math.floor((value % 1000) / 100)
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}.${tenths}`
}

/** Title-case a tool identifier for the row label: `web_search` → `web search`. */
export function toolDisplayName(name: string): string {
  return name.replace(/[_-]+/g, ' ')
}

/** First non-empty line of a text, trimmed to `max` characters, with an ellipsis. */
export function oneLine(text: string, max = 90): string {
  const line = text.split('\n').map(part => part.trim()).find(part => part !== '') ?? ''
  return line.length > max ? `${line.slice(0, max - 1)}…` : line
}

/** Safe `JSON.parse` that keeps the raw text when the payload is not JSON. */
export function parseJson(text: string): unknown {
  try {
    return JSON.parse(text)
  } catch {
    return undefined
  }
}

/** Pretty-print JSON when possible, else return the original text. */
export function prettyJson(text: string): string {
  const parsed = parseJson(text)
  if (parsed === undefined) return text
  try {
    return JSON.stringify(parsed, null, 2)
  } catch {
    return text
  }
}
