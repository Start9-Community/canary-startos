import { selectElectrum } from './actions/selectElectrum'
import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  const electrum = await storeJson.read((s) => s.electrum).const(effects)

  if (electrum === 'fulcrum') {
    return {
      fulcrum: {
        kind: 'running',
        versionRange: '>=2.1.1:8',
        healthChecks: ['primary', 'sync-progress'],
      },
    }
  } else if (electrum === 'electrs') {
    return {
      electrs: {
        kind: 'running',
        // Earlier revisions fetch blocks on bitcoind's unprivileged p2p
        // listener, where Canary's address-history queries get the connection
        // dropped — and electrs exits rather than reconnecting, so it lands in
        // a restart loop under exactly this workload.
        versionRange: '>=0.11.1:14',
        healthChecks: ['electrs', 'sync'],
      },
    }
  } else {
    await sdk.action.createOwnTask(effects, selectElectrum, 'critical', {
      reason: i18n(
        'Canary Wallet requires an Electrum server to look up addresses',
      ),
    })
    return {}
  }
})
