import { T, utils } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const serverPort = 3001
export const uiPort = 3000

// Host ids (the sdk.MultiHost.of groups) exporting the electrum interface on
// each supported server — distinct from the interface id ('main') they share.
export const electrumHostId = { fulcrum: 'main', electrs: 'electrum' } as const
const electrumInterfaceId = 'main'

/**
 * The IPv4 LXC-bridge hostname/port for an interface on an already-resolved
 * host. Pure — call it INSIDE a `sdk.host` map fn so `.const()` narrows its
 * reactivity to just this address. `.startos` DNS / container IPs are
 * deprecated; containers reach each other over this bridge.
 */
const bridgeAddr = (host: utils.FilledHost | null, interfaceId: string) => {
  const iface =
    host &&
    Object.values(host.bindings)
      .flatMap((b) => Object.values(b.interfaces))
      .find((i) => i.id === interfaceId)
  return iface
    ? iface.addressInfo.filter({
        kind: 'bridge',
        predicate: (h) => h.metadata.kind === 'ipv4' && !h.ssl,
      }).hostnames[0]
    : undefined
}

/**
 * The selected electrum server's `tcp://host:port` over the bridge (replaces
 * `${electrum}.startos:50001`). Returns undefined until the server is reachable.
 */
export const getElectrumUrl = (
  effects: T.Effects,
  electrum: keyof typeof electrumHostId,
) =>
  sdk.host
    .get(
      effects,
      { hostId: electrumHostId[electrum], packageId: electrum },
      (host) => {
        const addr = bridgeAddr(host, electrumInterfaceId)
        return addr && `tcp://${addr.hostname}:${addr.port}`
      },
    )
    .const()
