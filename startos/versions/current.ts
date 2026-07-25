import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.5.2:4',
  releaseNotes: {
    en_US:
      'Internal updates to how Canary resolves its Electrum server address.',
    es_ES:
      'Actualizaciones internas en la forma en que Canary determina la dirección de su servidor Electrum.',
    de_DE:
      'Interne Aktualisierungen, wie Canary die Adresse seines Electrum-Servers ermittelt.',
    pl_PL:
      'Wewnętrzne aktualizacje sposobu, w jaki Canary ustala adres swojego serwera Electrum.',
    fr_FR:
      "Mises à jour internes de la façon dont Canary détermine l'adresse de son serveur Electrum.",
  },
  migrations: {},
})
