import { utils } from '@start9labs/start-sdk'

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

// Browser-navigable URLs for an exported interface, excluding the LXC bridge
// and loopback addresses which the user's browser cannot reach.
export function interfaceUrls(
  host: utils.FilledHost | null,
  interfaceId: string,
): string[] {
  const iface =
    host &&
    Object.values(host.bindings)
      .flatMap((binding) => Object.values(binding.interfaces))
      .find((candidate) => candidate.id === interfaceId)

  return iface ? uniqueUrls(iface.addressInfo.nonLocal.format('urlstring')) : []
}
