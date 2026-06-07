export const short = {
  en_US: 'Bitcoin wallet monitoring service with transaction notifications',
  es_ES:
    'Servicio de monitoreo de billeteras Bitcoin con notificaciones de transacciones',
  de_DE: 'Bitcoin-Wallet-Überwachungsdienst mit Transaktionsbenachrichtigungen',
  pl_PL:
    'Usługa monitorowania portfeli Bitcoin z powiadomieniami o transakcjach',
  fr_FR:
    'Service de surveillance de portefeuilles Bitcoin avec notifications de transactions',
}

export const long = {
  en_US: `Canary is a self-hosted Bitcoin wallet monitoring service that provides:
- Watch-only wallet management using BDK (Bitcoin Development Kit)
- Real-time transaction notifications via ntfy.sh push notifications
- Support for multipath descriptors (P2WPKH, P2SH, P2TR, P2PKH)
- Deep scanning to detect funds at high address indexes
- Transaction analysis including RBF/CPFP detection
- Multi-language support (English and Norwegian)
- Balance alerts with configurable thresholds

Perfect for monitoring your cold storage wallets or watching family members' wallets.`,
  es_ES: `Canary es un servicio autohospedado de monitoreo de billeteras Bitcoin que ofrece:
- Gestión de billeteras de solo lectura usando BDK (Bitcoin Development Kit)
- Notificaciones de transacciones en tiempo real a través de ntfy.sh
- Soporte para descriptores multirruta (P2WPKH, P2SH, P2TR, P2PKH)
- Escaneo profundo para detectar fondos en índices de direcciones altos
- Análisis de transacciones incluyendo detección de RBF/CPFP
- Soporte multilingüe (inglés y noruego)
- Alertas de saldo con umbrales configurables

Perfecto para monitorear sus billeteras de almacenamiento en frío o las billeteras de familiares.`,
  de_DE: `Canary ist ein selbst gehosteter Bitcoin-Wallet-Überwachungsdienst, der bietet:
- Schreibgeschützte Wallet-Verwaltung mit BDK (Bitcoin Development Kit)
- Echtzeit-Transaktionsbenachrichtigungen über ntfy.sh Push-Benachrichtigungen
- Unterstützung für Multipath-Deskriptoren (P2WPKH, P2SH, P2TR, P2PKH)
- Tiefenscan zur Erkennung von Guthaben bei hohen Adressindizes
- Transaktionsanalyse einschließlich RBF/CPFP-Erkennung
- Mehrsprachige Unterstützung (Englisch und Norwegisch)
- Saldoalarme mit konfigurierbaren Schwellenwerten

Perfekt zur Überwachung Ihrer Cold-Storage-Wallets oder der Wallets von Familienmitgliedern.`,
  pl_PL: `Canary to samodzielnie hostowana usługa monitorowania portfeli Bitcoin, która zapewnia:
- Zarządzanie portfelami tylko do odczytu przy użyciu BDK (Bitcoin Development Kit)
- Powiadomienia o transakcjach w czasie rzeczywistym przez ntfy.sh
- Obsługę deskryptorów wielościeżkowych (P2WPKH, P2SH, P2TR, P2PKH)
- Głębokie skanowanie w celu wykrycia środków na wysokich indeksach adresów
- Analizę transakcji, w tym wykrywanie RBF/CPFP
- Obsługę wielu języków (angielski i norweski)
- Alerty salda z konfigurowalnymi progami

Idealna do monitorowania portfeli zimnego przechowywania lub portfeli członków rodziny.`,
  fr_FR: `Canary est un service auto-hébergé de surveillance de portefeuilles Bitcoin qui offre :
- Gestion de portefeuilles en lecture seule avec BDK (Bitcoin Development Kit)
- Notifications de transactions en temps réel via ntfy.sh
- Prise en charge des descripteurs multi-chemins (P2WPKH, P2SH, P2TR, P2PKH)
- Analyse approfondie pour détecter les fonds aux index d'adresses élevés
- Analyse des transactions incluant la détection RBF/CPFP
- Support multilingue (anglais et norvégien)
- Alertes de solde avec seuils configurables

Parfait pour surveiller vos portefeuilles de stockage à froid ou ceux de vos proches.`,
}

export const fulcrumDescription = {
  en_US: 'Used for syncing wallet data from the Bitcoin blockchain',
  es_ES:
    'Utilizado para sincronizar datos de billetera desde la cadena de bloques de Bitcoin',
  de_DE:
    'Wird zur Synchronisierung von Wallet-Daten aus der Bitcoin-Blockchain verwendet',
  pl_PL: 'Używany do synchronizacji danych portfela z łańcucha bloków Bitcoin',
  fr_FR:
    'Utilisé pour synchroniser les données du portefeuille depuis la blockchain Bitcoin',
}

export const electrsDescription = fulcrumDescription

export const mempoolDescription = {
  en_US: 'Used for opening Canary transaction links in local Mempool',
  es_ES:
    'Utilizado para abrir enlaces de transacciones de Canary en Mempool local',
  de_DE:
    'Wird zum Öffnen von Canary-Transaktionslinks in lokalem Mempool verwendet',
  pl_PL: 'Używany do otwierania linków transakcji Canary w lokalnym Mempool',
  fr_FR:
    'Utilisé pour ouvrir les liens de transaction Canary dans Mempool local',
}

export const bitcoinExplorerDescription = {
  en_US: 'Used for opening Canary transaction links in local Bitcoin Explorer',
  es_ES:
    'Utilizado para abrir enlaces de transacciones de Canary en Bitcoin Explorer local',
  de_DE:
    'Wird zum Öffnen von Canary-Transaktionslinks in lokalem Bitcoin Explorer verwendet',
  pl_PL:
    'Używany do otwierania linków transakcji Canary w lokalnym Bitcoin Explorer',
  fr_FR:
    'Utilisé pour ouvrir les liens de transaction Canary dans Bitcoin Explorer local',
}
