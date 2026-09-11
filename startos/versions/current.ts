import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.4:0',
  releaseNotes: {
    en_US: `Fixes self-hosted ntfy so private Docker, LAN, and Tailscale URLs work. Also keeps notification identities and delivery errors out of logs.`,
    es_ES: `Corrige ntfy en auto-hospedaje para que funcionen las URL privadas de Docker, LAN y Tailscale. También evita que las identidades de notificación y los errores de entrega aparezcan en los registros.`,
    de_DE: `Behebt selbst gehostetes ntfy, damit private Docker-, LAN- und Tailscale-URLs funktionieren. Hält außerdem Benachrichtigungsidentitäten und Zustellfehler aus den Protokollen fern.`,
    pl_PL: `Naprawia samodzielnie hostowane ntfy, aby działały prywatne adresy URL Dockera, LAN i Tailscale. Usuwa też tożsamości powiadomień i błędy dostarczania z dzienników.`,
    fr_FR: `Corrige ntfy en auto-hébergement pour que les URL privées Docker, LAN et Tailscale fonctionnent. Empêche également les identités de notification et les erreurs de livraison d’apparaître dans les journaux.`,
  },
  migrations: {},
})
