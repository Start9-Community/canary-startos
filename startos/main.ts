import { storeJson } from './fileModels/store.json'
import { i18n } from './i18n'
import { getLocalExplorerEnv } from './localExplorers'
import { sdk } from './sdk'
import { serverPort, uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting Canary!')

  const store = await storeJson.read().const(effects)
  if (!store) {
    throw new Error('No store.json')
  }
  const electrum = store.electrum
  const mountpoint = '/app/data'
  const localExplorerEnv = await getLocalExplorerEnv(effects)

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects)
    .addDaemon('server', {
      subcontainer: await sdk.SubContainer.of(
        effects,
        { imageId: 'backend' },
        sdk.Mounts.of().mountVolume({
          volumeId: 'main',
          subpath: null,
          mountpoint,
          readonly: false,
        }),
        'backend-sub',
      ),
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          CANARY_NETWORK: 'mainnet',
          CANARY_ELECTRUM_URL: `tcp://${electrum}.startos:50001`,
          CANARY_BIND_ADDRESS: `0.0.0.0:${serverPort}`,
          CANARY_DATA_DIR: mountpoint,
          CANARY_MODE: 'self-hosted',
          CANARY_SELF_HOSTED_ADMIN_PASSWORD: store.adminPassword,
          CANARY_SYNC_INTERVAL: '60',
          JWT_SECRET: store.jwtSecret,
          ...localExplorerEnv,
        },
      },
      ready: {
        display: 'Server',
        gracePeriod: 60000,
        fn: () =>
          sdk.healthCheck.checkWebUrl(
            effects,
            `http://localhost:${serverPort}/api/block-headers/current`,
            {
              successMessage: i18n('The server is ready'),
              errorMessage: i18n('The server is not ready'),
            },
          ),
      },
      requires: [],
    })
    .addDaemon('web', {
      subcontainer: await sdk.SubContainer.of(
        effects,
        { imageId: 'frontend' },
        null,
        'web-sub',
      ),
      exec: {
        command: sdk.useEntrypoint(),
        env: {
          API_URL: `http://localhost:${serverPort}`,
        },
      },
      ready: {
        display: i18n('Web interface'),
        fn: () =>
          sdk.healthCheck.checkPortListening(effects, uiPort, {
            successMessage: i18n('The web interface is ready'),
            errorMessage: i18n('The web interface is not ready'),
          }),
      },
      requires: [],
    })
})
