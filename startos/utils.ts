import { T } from '@start9labs/start-sdk'
import {
  electrumHostId as electrsHostId,
  port as electrsPort,
} from 'electrs-startos/startos/utils'
import {
  electrumPort as fulcrumPort,
  mainHostId as fulcrumHostId,
} from 'fulcrum-startos/startos/utils'
import { sdk } from './sdk'

export const serverPort = 3001
export const uiPort = 3000

/**
 * Bridge address (`10.0.3.1:<assigned external port>`) of a dependency's
 * binding, as a minimal reactive value. Chain `.const()` in main: the mapped
 * string only changes when the address itself does, so main restarts exactly
 * on dependency install/uninstall/port-change and never on dependency
 * updates. Chain `.once()` in an action context. `fallbackPort` keeps the
 * value non-null while the dependency is absent — sanctioned only for tor's
 * allocator-guaranteed SOCKS 9050. Drop-in for the planned SDK
 * `sdk.host.getBridgeAddress` helper.
 */
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort: number
  },
): { const(): Promise<string>; once(): Promise<string> }
export function bridgeAddress(
  effects: T.Effects,
  opts: { packageId: string; hostId: string; internalPort: number },
): { const(): Promise<string | null>; once(): Promise<string | null> }
export function bridgeAddress(
  effects: T.Effects,
  opts: {
    packageId: string
    hostId: string
    internalPort: number
    fallbackPort?: number
  },
) {
  const watchable = async () => {
    const osIp = await sdk.getOsIp(effects)
    return sdk.host.get(
      effects,
      { packageId: opts.packageId, hostId: opts.hostId },
      (host) => {
        const port =
          host?.bindings[opts.internalPort]?.net.assignedPort ??
          opts.fallbackPort
        return port != null ? `${osIp}:${port}` : null
      },
    )
  }
  return {
    const: async () => (await watchable()).const(),
    once: async () => (await watchable()).once(),
  }
}

// Each supported Electrum server's host id and internal (plaintext) electrum
// port, imported from the server package so canary tracks its binding without
// hardcoding. Keyed by package id (also the dependency id in dependencies.ts).
const electrumBinding = {
  fulcrum: { hostId: fulcrumHostId, internalPort: fulcrumPort },
  electrs: { hostId: electrsHostId, internalPort: electrsPort },
} as const

/**
 * The selected Electrum server's `tcp://<bridge ip>:<assigned port>` for
 * `CANARY_ELECTRUM_URL` (replaces `${electrum}.startos:50001`). A reactive
 * `.const()` on just the bridge address (doctrine v3): a server update is 0
 * restarts, install/uninstall/port-change is one healing restart. Resolves
 * null until the selected server's binding exists — main.ts throws until then
 * and the `.const()` heals when it appears.
 */
export const getElectrumUrl = async (
  effects: T.Effects,
  electrum: keyof typeof electrumBinding,
) => {
  const addr = await bridgeAddress(effects, {
    packageId: electrum,
    ...electrumBinding[electrum],
  }).const()
  return addr && `tcp://${addr}`
}
