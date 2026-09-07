import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.3:0',
  releaseNotes: {
    en_US: `Automatically configures a local ntfy publisher when ntfy is installed on StartOS, while preserving saved settings. Also improves Sparrow imports, Nostr notifications, Electrum recovery, local webhooks, and dark-mode display.`,
    es_ES: `Configura automáticamente un emisor local de ntfy cuando ntfy está instalado en StartOS, conservando los ajustes guardados. También mejora las importaciones de Sparrow, las notificaciones de Nostr, la recuperación de Electrum, los webhooks locales y la visualización en modo oscuro.`,
    de_DE: `Richtet automatisch einen lokalen ntfy-Publisher ein, wenn ntfy auf StartOS installiert ist, und behält gespeicherte Einstellungen bei. Verbessert außerdem Sparrow-Importe, Nostr-Benachrichtigungen, die Wiederherstellung von Electrum-Verbindungen, lokale Webhooks und die Darstellung im Dunkelmodus.`,
    pl_PL: `Automatycznie konfiguruje lokalnego nadawcę ntfy, gdy ntfy jest zainstalowane w StartOS, zachowując zapisane ustawienia. Usprawnia także import ze Sparrow, powiadomienia Nostr, przywracanie połączeń Electrum, lokalne webhooki i wygląd w trybie ciemnym.`,
    fr_FR: `Configure automatiquement un émetteur ntfy local lorsque ntfy est installé sur StartOS, tout en conservant les paramètres enregistrés. Améliore également les imports Sparrow, les notifications Nostr, la récupération des connexions Electrum, les webhooks locaux et l’affichage en mode sombre.`,
  },
  migrations: {},
})
