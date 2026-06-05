import { setupManifest } from '@start9labs/start-sdk'
import {
  bitcoinExplorerDescription,
  electrsDescription,
  fulcrumDescription,
  long,
  mempoolDescription,
  ntfyDescription,
  short,
} from './i18n'

export const manifest = setupManifest({
  id: 'canary',
  title: 'Canary',
  license: 'Elastic-2.0',
  packageRepo: 'https://github.com/Start9-Community/canary-startos',
  upstreamRepo: 'https://github.com/schjonhaug/canary/',
  marketingUrl: 'https://canarybitcoin.com',
  donationUrl: 'https://canarybitcoin.com/donations',
  description: { short, long },
  volumes: ['main'],
  images: {
    frontend: {
      source: {
        dockerTag: 'schjonhaug/canary-frontend:v1.5.2',
      },
    },
    backend: {
      source: {
        dockerTag: 'schjonhaug/canary-backend:v1.5.2',
      },
    },
  },
  dependencies: {
    fulcrum: {
      optional: true,
      description: fulcrumDescription,
      metadata: {
        title: 'Fulcrum',
        icon: 'https://raw.githubusercontent.com/Start9Labs/fulcrum-startos/refs/heads/master/icon.png',
      },
    },
    electrs: {
      optional: true,
      description: electrsDescription,
      metadata: {
        title: 'Electrs',
        icon: 'https://raw.githubusercontent.com/Start9Labs/electrs-startos/refs/heads/master/icon.svg',
      },
    },
    mempool: {
      optional: true,
      description: mempoolDescription,
      metadata: {
        title: 'Mempool',
        icon: 'https://raw.githubusercontent.com/Start9Labs/mempool-startos/refs/heads/master/icon.svg',
      },
    },
    'bitcoin-explorer': {
      optional: true,
      description: bitcoinExplorerDescription,
      metadata: {
        title: 'Bitcoin Explorer',
        icon: 'https://raw.githubusercontent.com/Start9Labs/bitcoin-explorer-startos/refs/heads/master/icon.svg',
      },
    },
    ntfy: {
      optional: true,
      description: ntfyDescription,
      metadata: {
        title: 'ntfy',
        icon: 'https://raw.githubusercontent.com/Start9-Community/ntfy-startos/refs/heads/master/icon.svg',
      },
    },
  },
})
