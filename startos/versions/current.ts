import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.0:0',
  releaseNotes: {
    en_US: `Canary Wallet v1.6.0 adds self-hosted Nostr DM and JSON webhook notifications, per-contact privacy and content controls, and simpler notification management. Existing notification contacts and settings are preserved when upgrading from v1.5.2, including a fix for migrated local ntfy delivery.
Full release notes can be found at https://github.com/schjonhaug/canary/releases/tag/v1.6.0`,
    es_ES: `Canary Wallet v1.6.0 añade notificaciones autohospedadas mediante mensajes directos de Nostr y webhooks JSON, controles de privacidad y contenido por contacto, y una gestión de notificaciones más sencilla. Los contactos y ajustes de notificaciones existentes se conservan al actualizar desde v1.5.2, incluida una corrección para la entrega mediante ntfy local migrada.
Las notas completas de la versión están disponibles en https://github.com/schjonhaug/canary/releases/tag/v1.6.0`,
    de_DE: `Canary Wallet v1.6.0 fügt selbst gehostete Benachrichtigungen über Nostr-Direktnachrichten und JSON-Webhooks, kontaktbezogene Datenschutz- und Inhaltskontrollen sowie eine einfachere Benachrichtigungsverwaltung hinzu. Vorhandene Benachrichtigungskontakte und Einstellungen bleiben beim Upgrade von v1.5.2 erhalten, einschließlich einer Korrektur für die migrierte lokale ntfy-Zustellung.
Die vollständigen Versionshinweise finden Sie unter https://github.com/schjonhaug/canary/releases/tag/v1.6.0`,
    pl_PL: `Canary Wallet v1.6.0 dodaje samodzielnie hostowane powiadomienia przez wiadomości prywatne Nostr i webhooki JSON, ustawienia prywatności i treści dla poszczególnych kontaktów oraz prostsze zarządzanie powiadomieniami. Istniejące kontakty i ustawienia powiadomień są zachowywane podczas aktualizacji z v1.5.2, łącznie z poprawką dostarczania przez zmigrowany lokalny serwer ntfy.
Pełne informacje o wydaniu znajdują się pod adresem https://github.com/schjonhaug/canary/releases/tag/v1.6.0`,
    fr_FR: `Canary Wallet v1.6.0 ajoute des notifications auto-hébergées par messages directs Nostr et webhooks JSON, des contrôles de confidentialité et de contenu par contact, ainsi qu'une gestion simplifiée des notifications. Les contacts et réglages de notification existants sont conservés lors de la mise à niveau depuis v1.5.2, y compris un correctif pour l'envoi via le service ntfy local migré.
Les notes de version complètes sont disponibles à l'adresse https://github.com/schjonhaug/canary/releases/tag/v1.6.0`,
  },
  migrations: {},
})
