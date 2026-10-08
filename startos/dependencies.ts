import { storeJson } from './fileModels/store.json'
import { isNtfyInstalled, provisionLocalNtfy } from './localNtfy'
import {
  bitcoinExplorerDescription,
  electrsDescription,
  fulcrumDescription,
  mempoolDescription,
  ntfyDescription,
} from './manifest/i18n'
import { sdk } from './sdk'

const fulcrum = sdk.Dependency.optional('fulcrum', {
  description: fulcrumDescription,
  metadata: {
    title: 'Fulcrum',
    icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/refs/heads/master/icon.png',
  },
  versionRange: '>=2.1.1:8',
  kind: 'running',
  healthChecks: ['primary', 'sync-progress'],
  enabled: async ({ effects }) =>
    (await storeJson.read((s) => s.electrum).const(effects)) === 'fulcrum',
})

const electrs = sdk.Dependency.optional('electrs', {
  description: electrsDescription,
  metadata: {
    title: 'Electrs',
    icon: 'https://raw.githubusercontent.com/Start9Labs/electrs-startos/refs/heads/master/icon.svg',
  },
  // Earlier revisions fetch blocks on bitcoind's unprivileged p2p listener,
  // which drops the connection under Canary's address-history queries.
  versionRange: '>=0.11.1:14',
  kind: 'running',
  healthChecks: ['electrs', 'sync'],
  enabled: async ({ effects }) =>
    (await storeJson.read((s) => s.electrum).const(effects)) === 'electrs',
})

const mempool = sdk.Dependency.optional('mempool', {
  description: mempoolDescription,
  metadata: {
    title: 'Mempool',
    icon: 'https://raw.githubusercontent.com/Start9Labs/mempool-startos/refs/heads/master/icon.svg',
  },
  versionRange: '*',
  kind: 'exists',
  enabled: async () => false,
})

const bitcoinExplorer = sdk.Dependency.optional('bitcoin-explorer', {
  description: bitcoinExplorerDescription,
  metadata: {
    title: 'Bitcoin Explorer',
    icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-explorer-startos/refs/heads/master/icon.svg',
  },
  versionRange: '*',
  kind: 'exists',
  enabled: async () => false,
})

// Provision Publisher is access 'dependent', so it runs only once ntfy is a current dependency.
const ntfy = sdk.Dependency.optional('ntfy', {
  description: ntfyDescription,
  metadata: {
    title: 'ntfy',
    icon: 'https://raw.githubusercontent.com/Start9Labs/ntfy-startos/refs/heads/master/icon.svg',
  },
  // First revision with dependent actions and bridge publish URLs.
  versionRange: '>=2.26.3:0',
  kind: 'exists',
  enabled: async ({ effects }) => isNtfyInstalled(effects),
}).withInit(provisionLocalNtfy)

export const dependencies = sdk.Dependencies.of()
  .addDependency(fulcrum)
  .addDependency(electrs)
  .addDependency(mempool)
  .addDependency(bitcoinExplorer)
  .addDependency(ntfy)
