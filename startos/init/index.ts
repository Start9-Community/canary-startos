import { sdk } from '../sdk'
import { setDependencies } from '../dependencies'
import { setInterfaces } from '../interfaces'
import { versionGraph } from '../versions'
import { actions } from '../actions'
import { restoreInit } from '../backups'
import { clearRestoredNtfy, watchLocalNtfy } from '../localNtfy'
import { seedFiles } from './seedFiles'
import { watchCredentials } from './watchCredentials'

export const init = sdk.setupInit(
  restoreInit,
  versionGraph,
  seedFiles,
  setInterfaces,
  clearRestoredNtfy,
  actions,
  watchCredentials,
  // Share constRetry so dependency registration precedes every provisioning pass.
  async (effects, kind) => {
    await setDependencies(effects)
    await watchLocalNtfy.init(effects, kind)
  },
)

export const uninit = sdk.setupUninit(versionGraph)
