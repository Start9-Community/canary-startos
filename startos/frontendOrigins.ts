import { interfaceUrls } from './interfaceUrls'
import { uiHostId, uiInterfaceId } from './interfaces'
import { sdk } from './sdk'

type Effects = Parameters<Parameters<typeof sdk.setupMain>[0]>[0]['effects']

function isPreferredLanOrigin(url: string): boolean {
  const parsed = new URL(url)
  return parsed.protocol === 'https:' && parsed.hostname.endsWith('.local')
}

function selectCanonicalUrl(urls: string[]): string | null {
  return (
    urls.find(isPreferredLanOrigin) ??
    urls.find((url) => new URL(url).protocol === 'https:') ??
    urls[0] ??
    null
  )
}

export async function getFrontendOriginEnv(
  effects: Effects,
): Promise<Record<'FRONTEND_URL' | 'FRONTEND_URLS', string>> {
  const urls = await sdk.host
    .getOwn(effects, uiHostId, (host) => interfaceUrls(host, uiInterfaceId))
    .const()
  const canonicalUrl = selectCanonicalUrl(urls)

  if (!canonicalUrl) {
    throw new Error('No browser-reachable Canary Wallet UI origin is available')
  }

  return {
    FRONTEND_URL: canonicalUrl,
    FRONTEND_URLS: urls.join(','),
  }
}
