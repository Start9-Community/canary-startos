import { FileHelper, utils, z } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

const shape = z.object({
  electrum: z
    .enum(['fulcrum', 'electrs'])
    .nullable()
    .catch(null),
  adminPassword: z.string().optional().catch(undefined),
  jwtSecret: z
    .string()
    .catch(utils.getDefaultString({ charset: 'a-z,A-Z,0-9', len: 64 })),
})

export const storeJson = FileHelper.json(
  { base: sdk.volumes.main, subpath: 'store.json' },
  shape,
)
