import { sdk } from './sdk'

type Effects = Parameters<Parameters<typeof sdk.setupMain>[0]>[0]['effects']

type ExplorerInterface = {
  packageId: 'mempool' | 'bitcoin-explorer'
  interfaceId: 'webui' | 'ui'
  envVar: 'CANARY_MEMPOOL_URLS' | 'CANARY_BTC_RPC_EXPLORER_URLS'
}

type ServiceInterfaceWithUrls = {
  addressInfo?: {
    format(format: 'urlstring'): string[]
  } | null
} | null

const explorerInterfaces: ExplorerInterface[] = [
  {
    packageId: 'mempool',
    interfaceId: 'webui',
    envVar: 'CANARY_MEMPOOL_URLS',
  },
  {
    packageId: 'bitcoin-explorer',
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

function formatInterfaceUrls(
  serviceInterface: ServiceInterfaceWithUrls,
): string[] {
  const addressInfo = serviceInterface?.addressInfo
  if (!addressInfo) {
    return []
  }

  const urls = addressInfo.format('urlstring')
  return uniqueUrls(urls)
}

async function getExplorerUrls(
  effects: Effects,
  { packageId, interfaceId }: ExplorerInterface,
): Promise<string[]> {
  const serviceInterface = await sdk.serviceInterface
    .get(effects, { packageId, id: interfaceId })
    .const()
    .catch(() => null)

  return formatInterfaceUrls(serviceInterface)
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
