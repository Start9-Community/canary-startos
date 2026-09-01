import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.0:0',
  releaseNotes: {
    en_US: `Canary v1.6.0 adds self-hosted Nostr DM and JSON webhook notifications, per-contact privacy and content controls, and simpler notification management. Existing notification contacts and settings are preserved when upgrading from v1.5.2, including a fix for migrated local ntfy delivery.
Full release notes can be found at https://github.com/schjonhaug/canary/releases/tag/v1.6.0`,
  },
  migrations: {},
})
