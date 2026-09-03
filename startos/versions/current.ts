import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.1:0',
  releaseNotes: {
    en_US: `Fixed self-hosted sign-in failures when a node changes its hostname, protocol, or external port, including dynamic StartOS ports. Login errors now provide clearer guidance, while existing passwords, wallets, contacts, and notification settings remain unchanged.`,
    es_ES: `Se corrigieron los errores de inicio de sesión en instalaciones autohospedadas cuando un nodo cambia de nombre de host, protocolo o puerto externo, incluidos los puertos dinámicos de StartOS. Los errores de inicio de sesión ahora ofrecen indicaciones más claras, mientras que las contraseñas, carteras, contactos y ajustes de notificaciones existentes permanecen sin cambios.`,
    de_DE: `Fehler bei der Anmeldung in selbst gehosteten Installationen wurden behoben, wenn ein Node seinen Hostnamen, sein Protokoll oder seinen externen Port ändert, einschließlich dynamischer StartOS-Ports. Anmeldefehler bieten jetzt klarere Hinweise, während bestehende Passwörter, Wallets, Kontakte und Benachrichtigungseinstellungen unverändert bleiben.`,
    pl_PL: `Naprawiono błędy logowania w instalacjach samodzielnie hostowanych, gdy węzeł zmienia nazwę hosta, protokół lub port zewnętrzny, w tym dynamiczne porty StartOS. Błędy logowania zawierają teraz jaśniejsze wskazówki, a istniejące hasła, portfele, kontakty i ustawienia powiadomień pozostają bez zmian.`,
    fr_FR: `Correction des échecs de connexion aux installations auto-hébergées lorsqu’un nœud change de nom d’hôte, de protocole ou de port externe, notamment avec les ports dynamiques de StartOS. Les erreurs de connexion fournissent désormais des indications plus claires, tandis que les mots de passe, portefeuilles, contacts et paramètres de notification existants restent inchangés.`,
  },
  migrations: {},
})
