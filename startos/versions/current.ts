import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.5.2:2',
  releaseNotes: {
    en_US:
      'Internal updates (start-sdk 2.0.x); Canary no longer restarts when its Electrum server is updated',
    es_ES:
      'Actualizaciones internas (start-sdk 2.0.x); Canary ya no se reinicia cuando se actualiza su servidor Electrum',
    de_DE:
      'Interne Aktualisierungen (start-sdk 2.0.x); Canary startet nicht mehr neu, wenn sein Electrum-Server aktualisiert wird',
    pl_PL:
      'Aktualizacje wewnętrzne (start-sdk 2.0.x); Canary nie uruchamia się już ponownie, gdy jego serwer Electrum jest aktualizowany',
    fr_FR:
      'Mises à jour internes (start-sdk 2.0.x); Canary ne redémarre plus lorsque son serveur Electrum est mis à jour',
  },
  migrations: {},
})
