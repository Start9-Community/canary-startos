import { utils } from '@start9labs/start-sdk'
import { uiHostId as btcExplorerHostId } from 'bitcoin-explorer-startos/startos/interfaces'
import { mainHostId as mempoolHostId } from 'mempool-startos/startos/utils'
import { sdk } from './sdk'

type Effects = Parameters<Parameters<typeof sdk.setupMain>[0]>[0]['effects']

type ExplorerInterface = {
  packageId: 'mempool' | 'bitcoin-explorer'
  // Host id (the sdk.MultiHost.of group) and the interface id exported on it.
  hostId: string
  interfaceId: string
  envVar: 'CANARY_MEMPOOL_URLS' | 'CANARY_BTC_RPC_EXPLORER_URLS'
}

// Adding an explorer is an entry here and nothing else: package id, host id,
// interface id, and the env var Canary reads. Keep the browser-safety filter --
// only addresses a browser can actually reach are handed over.
const explorerInterfaces: ExplorerInterface[] = [
  {
    packageId: 'mempool',
    hostId: mempoolHostId,
    interfaceId: 'webui',
    envVar: 'CANARY_MEMPOOL_URLS',
  },
  {
    packageId: 'bitcoin-explorer',
    hostId: btcExplorerHostId,
    interfaceId: 'ui',
    envVar: 'CANARY_BTC_RPC_EXPLORER_URLS',
  },
]

function isBrowserSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function uniqueUrls(urls: string[]): string[] {
  return [...new Set(urls.filter(isBrowserSafeUrl))]
}

// The interface's browser-navigable URLs (LAN / Tor / clearnet), excluding the
// LXC bridge and loopback which the user's browser can't reach.
function interfaceUrls(
  host: utils.FilledHost | null,
  interfaceId: string,
): string[] {
  const iface =
    host &&
    Object.values(host.bindings)
      .flatMap((b) => Object.values(b.interfaces))
      .find((i) => i.id === interfaceId)
  if (!iface) {
    return []
  }
  return uniqueUrls(iface.addressInfo.nonLocal.format('urlstring'))
}

async function getExplorerUrls(
  effects: Effects,
  { packageId, hostId, interfaceId }: ExplorerInterface,
): Promise<string[]> {
  return sdk.host
    .get(effects, { hostId, packageId }, (host) =>
      interfaceUrls(host, interfaceId),
    )
    .const()
    .catch(() => [])
}

export async function getLocalExplorerEnv(
  effects: Effects,
): Promise<Record<string, string>> {
  const env: Record<string, string> = {}

  for (const explorerInterface of explorerInterfaces) {
    const urls = await getExplorerUrls(effects, explorerInterface)
    if (urls.length > 0) {
      env[explorerInterface.envVar] = urls.join(',')
    }
  }

  if (Object.keys(env).length > 0) {
    env.CANARY_TX_EXPLORER_PLATFORM = 'startos'
  }

  return env
}
