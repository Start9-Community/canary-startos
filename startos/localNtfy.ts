import { T } from '@start9labs/start-sdk'
import { uiHostId as ntfyUiHostId } from 'ntfy-startos/startos/utils'
import { sdk } from './sdk'

const legacyStartOsNtfyUrl = 'http://ntfy.startos'

/**
 * Preserve the local ntfy URL documented by the v1.5.2 package. Canary v1.6.0
 * only trusts a saved private URL when the package reports that exact URL as a
 * detected integration. Mapping the host to a boolean keeps main reactive only
 * to ntfy installation/removal, not to unrelated interface address changes.
 *
 * Authentication and topics remain user-managed so an upgrade cannot replace
 * credentials already stored by Canary.
 */
export async function getLocalNtfyEnv(
  effects: T.Effects,
): Promise<Record<string, string>> {
  const ntfyInstalled = await sdk.host
    .get(
      effects,
      { packageId: 'ntfy', hostId: ntfyUiHostId },
      (host) => host !== null,
    )
    .const()

  return ntfyInstalled ? { CANARY_NTFY_SERVER_URL: legacyStartOsNtfyUrl } : {}
}
