import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
import { sdk } from '../sdk'

export const current = VersionInfo.of({
  version: '1.7.0:1',
  releaseNotes: {
    en_US: `- The network interface left behind by the StartOS 0.3.5 version of this package is removed and its port freed. A domain or .onion address you had added to it no longer reaches Canary Wallet; add one to the Web UI interface instead.
- Set Admin Password asks for confirmation before it replaces an existing password.
- Select Electrum Server explains each option and no longer preselects Fulcrum.`,
    es_ES: `- Se elimina la interfaz de red que dejó la versión de este paquete para StartOS 0.3.5 y se libera su puerto. Un dominio o una dirección .onion que hubieras añadido a ella ya no lleva a Canary Wallet; añade uno a la interfaz «Interfaz web» en su lugar.
- Establecer contraseña de administrador pide confirmación antes de reemplazar una contraseña existente.
- Seleccionar servidor Electrum explica cada opción y ya no preselecciona Fulcrum.`,
    de_DE: `- Die Netzwerkschnittstelle, die die StartOS-0.3.5-Version dieses Pakets hinterlassen hatte, wird entfernt und ihr Port freigegeben. Eine Domain oder .onion-Adresse, die du ihr hinzugefügt hattest, führt nicht mehr zu Canary Wallet; füge stattdessen eine der Schnittstelle „Weboberfläche“ hinzu.
- Admin-Passwort festlegen fragt nach einer Bestätigung, bevor ein bestehendes Passwort ersetzt wird.
- Electrum-Server auswählen erklärt jede Option und wählt Fulcrum nicht mehr vor.`,
    pl_PL: `- Interfejs sieciowy pozostawiony przez wersję tego pakietu dla StartOS 0.3.5 zostaje usunięty, a jego port zwolniony. Domena lub adres .onion dodany do niego nie prowadzi już do Canary Wallet; zamiast tego dodaj go do interfejsu „Interfejs webowy”.
- Ustaw hasło administratora prosi o potwierdzenie przed zastąpieniem istniejącego hasła.
- Wybierz serwer Electrum wyjaśnia każdą opcję i nie wybiera już domyślnie Fulcrum.`,
    fr_FR: `- L’interface réseau laissée par la version de ce paquet pour StartOS 0.3.5 est supprimée et son port libéré. Un domaine ou une adresse .onion que vous y aviez ajouté ne mène plus à Canary Wallet ; ajoutez-en un à l’interface « Interface web » à la place.
- Définir le mot de passe administrateur demande une confirmation avant de remplacer un mot de passe existant.
- Sélectionner le serveur Electrum explique chaque option et ne présélectionne plus Fulcrum.`,
  },
  migrations: {
    up: async ({ effects }) => {
      await sdk.MultiHost.of(effects, 'web-ui').retire()
    },
    down: IMPOSSIBLE,
  },
})
