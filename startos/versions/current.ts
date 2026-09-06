import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.6.2:1',
  releaseNotes: {
    en_US: `When ntfy is installed, Canary Wallet now provisions a local publisher automatically and uses it as the default notification server. Settings you have already saved in Canary Wallet are unchanged. Subscribe your phone to the same topic on ntfy's public address.`,
    es_ES: `Cuando ntfy está instalado, Canary Wallet ahora aprovisiona automáticamente un publicador local y lo usa como servidor de notificaciones predeterminado. Los ajustes que ya hayas guardado en Canary Wallet no cambian. Suscribe tu teléfono al mismo tema en la dirección pública de ntfy.`,
    de_DE: `Ist ntfy installiert, richtet Canary Wallet jetzt automatisch einen lokalen Publisher ein und verwendet ihn als Standard-Benachrichtigungsserver. Bereits in Canary Wallet gespeicherte Einstellungen bleiben unverändert. Abonniere dasselbe Thema auf der öffentlichen ntfy-Adresse mit deinem Telefon.`,
    pl_PL: `Gdy ntfy jest zainstalowany, Canary Wallet automatycznie tworzy lokalnego wydawcę i używa go jako domyślnego serwera powiadomień. Ustawienia już zapisane w Canary Wallet pozostają bez zmian. Subskrybuj ten sam temat na publicznym adresie ntfy w telefonie.`,
    fr_FR: `Lorsque ntfy est installé, Canary Wallet provisionne désormais automatiquement un éditeur local et l’utilise comme serveur de notifications par défaut. Les réglages déjà enregistrés dans Canary Wallet restent inchangés. Abonnez votre téléphone au même sujet sur l’adresse publique de ntfy.`,
  },
  migrations: {},
})
