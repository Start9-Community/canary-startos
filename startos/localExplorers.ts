import { utils } from '@start9labs/start-sdk'
import { sdk } from './sdk'

type Effects = Parameters<Parameters<typeof sdk.setupMain>[0]>[0]['effects']

type ExplorerInterface = {
  packageId: 'mempool' | 'bitcoin-explorer'
  // Host id (the sdk.MultiHost.of group) and the interface id exported on it.
  hostId: string
  interfaceId: string
  envVar: 'CANARY_MEMPOOL_URLS' | 'CANARY_BTC_RPC_EXPLORER_URLS'
}

const explorerInterfaces: ExplorerInterface[] = [
  {
    packageId: 'mempool',
    hostId: 'main',
    interfaceId: 'webui',
    envVar: 'CANARY_MEMPOOL_URLS',
  },
  {
    packageId: 'bitcoin-explorer',
    hostId: 'ui-multi',
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
