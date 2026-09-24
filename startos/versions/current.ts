import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.7.0:0',
  releaseNotes: {
    en_US: `Adds Telegram alerts, BIP-329 transaction labels, and optional Tor SOCKS so NIP-17 DMs can reach .onion inbox relays.`,
    es_ES: `Añade alertas de Telegram, etiquetas de transacción BIP-329 y SOCKS Tor opcional para que los DM NIP-17 lleguen a relés de bandeja .onion.`,
    de_DE: `Fügt Telegram-Benachrichtigungen, BIP-329-Transaktionslabels und optionalen Tor-SOCKS hinzu, damit NIP-17-DMs .onion-Inbox-Relays erreichen.`,
    pl_PL: `Dodaje alerty Telegram, etykiety transakcji BIP-329 oraz opcjonalny SOCKS Tor, aby wiadomości NIP-17 DM docierały do przekaźników skrzynki .onion.`,
    fr_FR: `Ajoute les alertes Telegram, les étiquettes de transaction BIP-329 et un SOCKS Tor optionnel pour que les DM NIP-17 atteignent les relais de boîte .onion.`,
  },
  migrations: {},
})
