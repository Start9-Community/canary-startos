import { T, utils } from '@start9labs/start-sdk'
import {
  uiHostId as ntfyUiHostId,
  uiInterfaceId as ntfyUiInterfaceId,
} from 'ntfy-startos/startos/utils'
import { storeJson } from './fileModels/store.json'
import { sdk } from './sdk'

export const ntfyPublisherId = 'canary'
export const ntfyTopic = 'canary'

export type NtfyProvisioning = {
  publishUrl: string
  token: string
  topic: string
}

const ntfyCurrentDependency = {
  kind: 'running' as const,
  // Provision Publisher is `access: 'dependent'` and returns a bridge
  // publish URL. Older ntfy revisions either reject the cross-package run
  // or still advertise the retired `ntfy.startos` hostname.
  versionRange: '>=2.0.0:0',
  healthChecks: ['primary'],
}

/**
 * Presence only — not LAN/Tor churn. ntfy must be in current_dependencies
 * before Provision Publisher will accept a dependent `action.run`.
 */
export async function isNtfyInstalled(effects: T.Effects): Promise<boolean> {
  return sdk.host
    .get(
      effects,
      { packageId: 'ntfy', hostId: ntfyUiHostId },
      (host) => host !== null,
    )
    .const()
}

export async function ntfyDependency(
  effects: T.Effects,
): Promise<{ ntfy: typeof ntfyCurrentDependency } | Record<string, never>> {
  return (await isNtfyInstalled(effects)) ? { ntfy: ntfyCurrentDependency } : {}
}

function ntfyBridgeUrl(host: utils.FilledHost | null): string | null {
  const iface =
    host &&
    Object.values(host.bindings)
      .flatMap((binding) => Object.values(binding.interfaces))
      .find((candidate) => candidate.id === ntfyUiInterfaceId)

  return (
    iface?.addressInfo
      .filter({ kind: 'bridge', predicate: (address) => !address.ssl })
      .format('urlstring')[0] ?? null
  )
}

async function getNtfyPublishUrl(effects: T.Effects): Promise<string | null> {
  return sdk.host
    .get(effects, { packageId: 'ntfy', hostId: ntfyUiHostId }, ntfyBridgeUrl)
    .const()
}

type ActionResultMember = {
  name: string
  type: 'single' | 'group'
  value?: string | ActionResultMember[]
}

function findResultValue(
  members: ActionResultMember[],
  name: keyof NtfyProvisioning,
): string | null {
  for (const member of members) {
    if (member.type === 'single' && member.name === name) {
      return typeof member.value === 'string' ? member.value : null
    }
    if (member.type === 'group' && Array.isArray(member.value)) {
      const nestedValue = findResultValue(member.value, name)
      if (nestedValue) {
        return nestedValue
      }
    }
  }

  return null
}

function parseProvisioningResult(
  result: T.ActionResult | null,
): NtfyProvisioning | null {
  if (
    !result ||
    result.version !== '1' ||
    !result.result ||
    result.result.type !== 'group'
  ) {
    return null
  }

  const members = result.result.value as ActionResultMember[]
  const publishUrl = findResultValue(members, 'publishUrl')
  const token = findResultValue(members, 'token')
  const topic = findResultValue(members, 'topic')

  if (!publishUrl || !token || !topic) {
    return null
  }

  return { publishUrl, token, topic }
}

async function provisionNtfy(
  effects: T.Effects,
): Promise<NtfyProvisioning | null> {
  // ntfy's withInput actions store the spec under the execute event id.
  // Host effect RPCs mint a fresh procedureId per call unless we send the
  // one getInput returned. The UI threads this as eventId; the effect
  // param is procedureId (omitted from the generated TS types).
  const prev = await effects.action
    .getInput({
      packageId: 'ntfy',
      actionId: 'provision-publisher',
    })
    .catch((error) => {
      console.warn('Failed to load ntfy Provision Publisher input', error)
      return null
    })

  if (!prev?.eventId) {
    console.warn('ntfy Provision Publisher did not return an event id')
    return null
  }

  const result = await effects.action
    .run({
      packageId: 'ntfy',
      actionId: 'provision-publisher',
      procedureId: prev.eventId,
      input: {
        packageId: ntfyPublisherId,
        topic: ntfyTopic,
      },
    } as Parameters<T.Effects['action']['run']>[0])
    .catch((error) => {
      console.warn('Failed to provision local ntfy publisher', error)
      return null
    })

  return parseProvisioningResult(result)
}

/**
 * Mint (or drop) the cached publisher when ntfy appears, starts, or is
 * removed. Runs in init so setupMain never writes store.json after reading
 * it with `.const()`. `getStatus` is intentionally unfiltered: health-check
 * churn re-runs this cheaply, and that is what retries provisioning once
 * ntfy becomes running. Do not loop here — a successful action mints a
 * token even if parsing fails, and a tight retry would leak extras.
 */
export const watchLocalNtfy = sdk.setupOnInit(async (effects) => {
  const status = await sdk.getStatus(effects, { packageId: 'ntfy' }).const()
  const storedNtfy = await storeJson.read((s) => s.ntfy).once()

  if (status === null) {
    if (storedNtfy) {
      await storeJson.merge(effects, { ntfy: undefined })
    }
    return
  }

  if (storedNtfy || !status.started) {
    return
  }

  const provisioned = await provisionNtfy(effects)
  if (provisioned) {
    await storeJson.merge(effects, { ntfy: provisioned })
    return
  }

  console.warn(
    'Local ntfy is running but Provision Publisher did not return credentials',
  )
})

/**
 * Package-provided defaults for Canary Wallet. User-saved settings remain
 * authoritative. The live bridge URL is passed even before a token exists so
 * Settings can show the local ntfy option; managed auth is added once the
 * publisher is cached.
 */
export async function getLocalNtfyEnv(
  effects: T.Effects,
  storedNtfy: NtfyProvisioning | undefined,
): Promise<Record<string, string>> {
  const publishUrl =
    (await getNtfyPublishUrl(effects)) ?? storedNtfy?.publishUrl
  if (!publishUrl) {
    return {}
  }

  const env: Record<string, string> = {
    CANARY_NTFY_SERVER_URL: publishUrl,
  }

  if (storedNtfy) {
    env.CANARY_NTFY_TOKEN = storedNtfy.token
    env.CANARY_NTFY_TOPIC = storedNtfy.topic
  }

  return env
}
