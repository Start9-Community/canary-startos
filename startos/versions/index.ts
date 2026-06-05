import { VersionGraph } from '@start9labs/start-sdk'
import { v_1_5_0_3 } from './v1.5.0.3'
import { v_1_5_2_0 } from './v1.5.2.0'

export const versionGraph = VersionGraph.of({
  current: v_1_5_2_0,
  other: [v_1_5_0_3],
})
