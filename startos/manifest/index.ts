import { setupManifest } from '@start9labs/start-sdk'
import { electrsDescription, fulcrumDescription, long, short } from './i18n'

export const manifest = setupManifest({
  id: 'canary',
  title: 'Canary',
  license: 'Elastic-2.0',
  packageRepo: 'https://github.com/schjonhaug/canary-startos',
  upstreamRepo: 'https://github.com/schjonhaug/canary/',
  marketingUrl: 'https://canarybitcoin.com',
  docsUrls: [
    'https://github.com/schjonhaug/canary-startos/blob/master/instructions.md',
  ],
  donationUrl: 'https://canarybitcoin.com/donations',
  description: { short, long },
  volumes: ['main'],
  images: {
    frontend: {
      source: {
        dockerTag: 'schjonhaug/canary-frontend:v1.4.0',
      },
    },
    backend: {
      source: {
        dockerTag: 'schjonhaug/canary-backend:v1.4.0',
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
  },
})
