import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.5.2:6',
  releaseNotes: {
    en_US: `Requires a version of Electrs that no longer restarts under Canary's queries.

Canary asks its Electrum server for the history of every address it watches. Older versions of Electrs answered those queries over a connection Bitcoin Core treated as untrusted and could drop, and Electrs shuts down rather than reconnecting — so it could end up restarting every minute while Canary was running. Canary now requires a fixed Electrs; StartOS will prompt you to update it. Fulcrum is unaffected.`,
    es_ES: `Requiere una versión de Electrs que ya no se reinicia con las consultas de Canary.

Canary pide a su servidor Electrum el historial de cada dirección que vigila. Las versiones anteriores de Electrs respondían a esas consultas por una conexión que Bitcoin Core trataba como no confiable y podía cortar, y Electrs se apaga en lugar de reconectar, así que podía acabar reiniciándose cada minuto mientras Canary estaba en marcha. Canary ahora requiere un Electrs corregido; StartOS te pedirá que lo actualices. Fulcrum no está afectado.`,
    de_DE: `Erfordert eine Electrs-Version, die unter Canarys Abfragen nicht mehr neu startet.

Canary fragt seinen Electrum-Server nach dem Verlauf jeder überwachten Adresse. Ältere Electrs-Versionen beantworteten diese Abfragen über eine Verbindung, die Bitcoin Core als nicht vertrauenswürdig behandelte und trennen konnte; Electrs beendet sich, statt neu zu verbinden — es konnte also im Minutentakt neu starten, solange Canary lief. Canary erfordert jetzt ein korrigiertes Electrs; StartOS fordert dich zum Update auf. Fulcrum ist nicht betroffen.`,
    pl_PL: `Wymaga wersji Electrs, która nie restartuje się już przy zapytaniach Canary.

Canary pyta swój serwer Electrum o historię każdego obserwowanego adresu. Starsze wersje Electrs odpowiadały na te zapytania przez połączenie, które Bitcoin Core traktował jako niezaufane i mógł zerwać, a Electrs wyłącza się zamiast łączyć ponownie — mógł więc restartować się co minutę, gdy Canary działał. Canary wymaga teraz poprawionego Electrs; StartOS przypomni o aktualizacji. Fulcrum nie jest dotknięty.`,
    fr_FR: `Nécessite une version d'Electrs qui ne redémarre plus sous les requêtes de Canary.

Canary demande à son serveur Electrum l'historique de chaque adresse qu'il surveille. Les versions antérieures d'Electrs répondaient à ces requêtes via une connexion que Bitcoin Core considérait comme non fiable et pouvait couper, et Electrs s'arrête au lieu de se reconnecter — il pouvait donc redémarrer toutes les minutes tant que Canary tournait. Canary exige désormais un Electrs corrigé ; StartOS vous invitera à le mettre à jour. Fulcrum n'est pas concerné.`,
  },
  migrations: {},
})
