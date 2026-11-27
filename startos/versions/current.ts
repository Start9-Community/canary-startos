import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.7.3:0',
  releaseNotes: {
    en_US: `This update contains bug fixes and dependency updates:
  - Slow Electrum servers, such as electrs with a large wallet history, now get more time to answer, so wallets sync instead of timing out
  - Updated frontend and backend dependencies`,
    es_ES: `Esta actualización incluye correcciones de errores y actualizaciones de dependencias:
  - Los servidores Electrum lentos, como electrs con un historial de cartera grande, ahora tienen más tiempo para responder, de modo que las carteras se sincronizan en lugar de agotar el tiempo de espera
  - Actualizadas las dependencias del frontend y del backend`,
    de_DE: `Dieses Update enthält Fehlerbehebungen und aktualisierte Abhängigkeiten:
  - Langsame Electrum-Server, etwa electrs mit einer umfangreichen Wallet-Historie, haben jetzt mehr Zeit zu antworten, sodass Wallets synchronisiert werden, statt in eine Zeitüberschreitung zu laufen
  - Frontend- und Backend-Abhängigkeiten aktualisiert`,
    pl_PL: `Ta aktualizacja zawiera poprawki błędów i aktualizacje zależności:
  - Wolne serwery Electrum, takie jak electrs z dużą historią portfela, mają teraz więcej czasu na odpowiedź, dzięki czemu portfele synchronizują się zamiast przekraczać limit czasu
  - Zaktualizowano zależności frontendu i backendu`,
    fr_FR: `Cette mise à jour contient des corrections de bugs et des mises à jour de dépendances :
  - Les serveurs Electrum lents, comme electrs avec un historique de portefeuille important, disposent désormais de plus de temps pour répondre, afin que les portefeuilles se synchronisent au lieu d'expirer
  - Mise à jour des dépendances du frontend et du backend`,
  },
  migrations: {},
})
