/**
 * Host face of the trajectory chart plugin.
 *
 * The bundle exists only to mount this package in the Host Loader: the web
 * client's module scanner publishes every loaded package that declares
 * `dsh.client`, so this no-op Host entry is what registers the browser artifact
 * with the client module scanner. All behavior lives in the browser bundle
 * (`./client`).
 */

export const name = 'loopscope'

/** No Host capability is required; the panel reads the Session event window in the browser. */
export function apply(): void {}
