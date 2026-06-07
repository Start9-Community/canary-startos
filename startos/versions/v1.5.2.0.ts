import { VersionInfo } from '@start9labs/start-sdk'

export const v_1_5_2_0 = VersionInfo.of({
  version: '1.5.2:0',
  releaseNotes: {
    en_US: `Canary v1.5.2 rejects invalid xpub descriptors before they can create wallets that cannot sync correctly, and adds recovery handling so failed or stuck wallet records can be deleted and recreated. It also fixes Genesis wallet/address-watch syncing edge cases, and includes StartOS local transaction explorer support.`,
  },
  migrations: {},
})
