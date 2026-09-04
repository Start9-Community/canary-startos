import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.2:0',
  releaseNotes: {
    en_US: `Fixed self-hosted sign-in failures when a node changes its hostname, protocol, or external port, including dynamic StartOS ports. Login errors now provide clearer guidance, while existing passwords, wallets, contacts, and notification settings remain unchanged.`,
    es_ES: `Se corrigieron los fallos de inicio de sesión en instalaciones autoalojadas cuando cambia el nombre de host, el protocolo o el puerto externo, incluidos los puertos dinámicos de StartOS. Los errores de inicio de sesión ofrecen ahora indicaciones más claras, y las contraseñas, carteras, contactos y ajustes de notificaciones existentes no se modifican.`,
    de_DE: `Behoben wurden Fehler bei der Anmeldung in selbst gehosteten Installationen, wenn sich Hostname, Protokoll oder externer Port ändern, einschließlich dynamischer StartOS-Ports. Anmeldefehler enthalten jetzt klarere Hinweise; vorhandene Passwörter, Wallets, Kontakte und Benachrichtigungseinstellungen bleiben unverändert.`,
    pl_PL: `Naprawiono problemy z logowaniem w instalacjach samodzielnie hostowanych, gdy zmienia się nazwa hosta, protokół lub port zewnętrzny, w tym dynamiczne porty StartOS. Komunikaty błędów logowania zawierają teraz jaśniejsze wskazówki, a istniejące hasła, portfele, kontakty i ustawienia powiadomień pozostają bez zmian.`,
    fr_FR: `Correction des échecs de connexion sur les installations auto-hébergées lorsque le nom d’hôte, le protocole ou le port externe change, y compris les ports StartOS dynamiques. Les erreurs de connexion fournissent désormais des indications plus claires, tandis que les mots de passe, portefeuilles, contacts et paramètres de notification existants restent inchangés.`,
  },
  migrations: {},
})
