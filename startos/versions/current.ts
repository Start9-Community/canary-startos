import { VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.7.1:0',
  releaseNotes: {
    en_US: `Security update: upgrades Next.js to fix critical vulnerabilities, stops trusting a compromised certificate authority (emSign) for outgoing connections, and rebuilds on patched Node.js and Debian images. Recommended for all users.`,
    es_ES: `Actualización de seguridad: actualiza Next.js para corregir vulnerabilidades críticas, deja de confiar en una autoridad de certificación comprometida (emSign) para las conexiones salientes y reconstruye las imágenes con Node.js y Debian parcheados. Recomendada para todos los usuarios.`,
    de_DE: `Sicherheitsupdate: aktualisiert Next.js, um kritische Sicherheitslücken zu schließen, vertraut einer kompromittierten Zertifizierungsstelle (emSign) bei ausgehenden Verbindungen nicht mehr und baut die Images mit gepatchtem Node.js und Debian neu. Für alle Nutzer empfohlen.`,
    pl_PL: `Aktualizacja bezpieczeństwa: aktualizuje Next.js w celu usunięcia krytycznych luk, przestaje ufać skompromitowanemu urzędowi certyfikacji (emSign) dla połączeń wychodzących i przebudowuje obrazy na załatanych wersjach Node.js i Debiana. Zalecana dla wszystkich użytkowników.`,
    fr_FR: `Mise à jour de sécurité : met à jour Next.js pour corriger des vulnérabilités critiques, cesse de faire confiance à une autorité de certification compromise (emSign) pour les connexions sortantes et reconstruit les images avec Node.js et Debian corrigés. Recommandée pour tous les utilisateurs.`,
  },
  migrations: {},
})
