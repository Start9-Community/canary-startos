import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.0:0',
  releaseNotes: {
    en_US: `Canary v1.5.2 rejects non-derivable xpub descriptors with hardened account derivation after the xpub, returning a clear validation error instead of creating wallets that cannot sync correctly. It also adds recovery handling for failed or stuck wallet creation so broken wallet records can be deleted and recreated, and fixes Genesis wallet balance and coinbase address watch syncing.
Full release notes can be found at https://github.com/schjonhaug/canary/releases/tag/v1.5.2`,
  },
  migrations: {},
})
