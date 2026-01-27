// Mock Data for FiDA Dashboard (PB-01)

export type SensitivityLevel = 1 | 2 | 3;

export type PartnerStatus = 'active' | 'ended' | 'pending' | 'expired';

export interface DataCategory {
  id: string;
  name: {
    de: string;
    en: string;
    fr: string;
  };
  description: {
    de: string;
    en: string;
    fr: string;
  };
  sensitivityLevel: SensitivityLevel;
  reason?: {
    de: string;
    en: string;
    fr: string;
  };
}

export interface PartnerService {
  id: string;
  name: string;
  logo: string;
  purpose: {
    de: string;
    en: string;
    fr: string;
  };
  status: PartnerStatus;
  grantedAt: string;
  validUntil: string;
  categories: string[]; // IDs of DataCategory
  autoRenewal?: boolean;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  partnerId: string;
  action: 'access_granted' | 'access_revoked' | 'access_extended' | 'pdf_exported' | 'notification_sent';
  categoryIds?: string[];
  result: 'success' | 'error';
  technicalDetails?: string;
}

export interface Notification {
  id: string;
  type: 'expiring_consent' | 'new_request' | 'security_event' | 'status_update';
  criticality: 'info' | 'caution' | 'warning';
  title: {
    de: string;
    en: string;
    fr: string;
  };
  message: {
    de: string;
    en: string;
    fr: string;
  };
  timestamp: string;
  read: boolean;
}

// Data Categories (PB-05, SE-01/02)
export const dataCategories: DataCategory[] = [
  {
    id: 'cat-1',
    name: {
      de: 'Kontostände',
      en: 'Account Balances',
      fr: 'Soldes de comptes'
    },
    description: {
      de: 'Aktuelle Kontostände aller Ihrer Bankkonten',
      en: 'Current balances of all your bank accounts',
      fr: 'Soldes actuels de tous vos comptes bancaires'
    },
    sensitivityLevel: 2,
    reason: {
      de: 'Zur Berechnung Ihrer finanziellen Übersicht und Budgetplanung',
      en: 'To calculate your financial overview and budget planning',
      fr: 'Pour calculer votre aperçu financier et planification budgétaire'
    }
  },
  {
    id: 'cat-2',
    name: {
      de: 'Transaktionen',
      en: 'Transactions',
      fr: 'Transactions'
    },
    description: {
      de: 'Detaillierte Liste aller Ein- und Ausgänge auf Ihren Konten',
      en: 'Detailed list of all deposits and withdrawals on your accounts',
      fr: 'Liste détaillée de tous les dépôts et retraits sur vos comptes'
    },
    sensitivityLevel: 3,
    reason: {
      de: 'Zur Analyse Ihres Ausgabeverhaltens und zur Erkennung von Einsparpotentialen',
      en: 'To analyze your spending behavior and identify savings potential',
      fr: 'Pour analyser votre comportement de dépenses et identifier le potentiel d\'économies'
    }
  },
  {
    id: 'cat-3',
    name: {
      de: 'Depotdaten',
      en: 'Securities Data',
      fr: 'Données de dépôt'
    },
    description: {
      de: 'Informationen über Ihre Wertpapiere und Investments',
      en: 'Information about your securities and investments',
      fr: 'Informations sur vos valeurs mobilières et investissements'
    },
    sensitivityLevel: 2,
    reason: {
      de: 'Zur Bewertung Ihrer Anlagestrategie und Portfolio-Optimierung',
      en: 'To evaluate your investment strategy and portfolio optimization',
      fr: 'Pour évaluer votre stratégie d\'investissement et optimisation de portefeuille'
    }
  },
  {
    id: 'cat-4',
    name: {
      de: 'Kredite',
      en: 'Loans',
      fr: 'Crédits'
    },
    description: {
      de: 'Informationen zu laufenden Krediten und Darlehen',
      en: 'Information about active loans and credits',
      fr: 'Informations sur les prêts et crédits en cours'
    },
    sensitivityLevel: 3,
    reason: {
      de: 'Zur Berechnung Ihrer Schuldenlast und Umschuldungsoptionen',
      en: 'To calculate your debt burden and refinancing options',
      fr: 'Pour calculer votre charge de dette et options de refinancement'
    }
  },
  {
    id: 'cat-5',
    name: {
      de: 'Kartenumsätze',
      en: 'Card Spend',
      fr: 'Dépenses par carte'
    },
    description: {
      de: 'Kartenumsätze von Debit- und Kreditkarten',
      en: 'Card spend from debit and credit cards',
      fr: 'Dépenses des cartes de débit et de crédit'
    },
    sensitivityLevel: 2,
    reason: {
      de: 'Zur detaillierten Ausgabenanalyse und Kategorisierung',
      en: 'For detailed expense analysis and categorization',
      fr: 'Pour une analyse détaillée des dépenses et catégorisation'
    }
  },
  {
    id: 'cat-6',
    name: {
      de: 'Daueraufträge',
      en: 'Standing Orders',
      fr: 'Ordres permanents'
    },
    description: {
      de: 'Eingerichtete regelmäßige Überweisungen',
      en: 'Set up recurring transfers',
      fr: 'Virements récurrents configurés'
    },
    sensitivityLevel: 1,
    reason: {
      de: 'Zur Verwaltung Ihrer wiederkehrenden Zahlungen',
      en: 'To manage your recurring payments',
      fr: 'Pour gérer vos paiements récurrents'
    }
  },
  {
    id: 'cat-7',
    name: {
      de: 'Einkommen/Gehaltsfluss',
      en: 'Income/Salary Flow',
      fr: 'Flux de revenus/salaire'
    },
    description: {
      de: 'Regelmäßige Gehaltseingänge und andere Einkünfte',
      en: 'Regular salary deposits and other income',
      fr: 'Dépôts de salaire réguliers et autres revenus'
    },
    sensitivityLevel: 3,
    reason: {
      de: 'Zur Berechnung Ihrer Kreditwürdigkeit und finanziellen Stabilität',
      en: 'To calculate your creditworthiness and financial stability',
      fr: 'Pour calculer votre solvabilité et stabilité financière'
    }
  }
];

// Partner Services (PB-01)
export const partnerServices: PartnerService[] = [
  {
    id: 'partner-1',
    name: 'BudgetPro',
    logo: '💰',
    purpose: {
      de: 'Intelligente Budgetverwaltung und Ausgabenplanung',
      en: 'Intelligent budget management and expense planning',
      fr: 'Gestion budgétaire intelligente et planification des dépenses'
    },
    status: 'active',
    grantedAt: '2025-10-15',
    validUntil: '2026-01-15',
    categories: ['cat-1', 'cat-2', 'cat-5'],
    autoRenewal: false
  },
  {
    id: 'partner-2',
    name: 'InvestTrack',
    logo: '📈',
    purpose: {
      de: 'Portfolio-Analyse und Investment-Tracking',
      en: 'Portfolio analysis and investment tracking',
      fr: 'Analyse de portefeuille et suivi des investissements'
    },
    status: 'active',
    grantedAt: '2025-09-01',
    validUntil: '2026-03-01',
    categories: ['cat-1', 'cat-3'],
    autoRenewal: true
  },
  {
    id: 'partner-3',
    name: 'LoanCompare',
    logo: '🏦',
    purpose: {
      de: 'Kreditvergleich und Umschuldungsberatung',
      en: 'Loan comparison and debt refinancing advice',
      fr: 'Comparaison de prêts et conseil en refinancement'
    },
    status: 'active',
    grantedAt: '2025-11-20',
    validUntil: '2026-01-25',
    categories: ['cat-1', 'cat-4', 'cat-7'],
    autoRenewal: false
  },
  {
    id: 'partner-4',
    name: 'TaxAssist',
    logo: '📋',
    purpose: {
      de: 'Steuererklärung und Steueroptimierung',
      en: 'Tax declaration and tax optimization',
      fr: 'Déclaration fiscale et optimisation fiscale'
    },
    status: 'active',
    grantedAt: '2025-08-10',
    validUntil: '2026-08-10',
    categories: ['cat-2', 'cat-7'],
    autoRenewal: true
  },
  {
    id: 'partner-5',
    name: 'FinInsights',
    logo: '📊',
    purpose: {
      de: 'Finanzanalyse und Reporting',
      en: 'Financial analysis and reporting',
      fr: 'Analyse financière et reporting'
    },
    status: 'active',
    grantedAt: '2025-12-01',
    validUntil: '2026-01-19',
    categories: ['cat-1', 'cat-2', 'cat-3', 'cat-5'],
    autoRenewal: false
  },
  {
    id: 'partner-6',
    name: 'SavingsCoach',
    logo: '🎯',
    purpose: {
      de: 'Automatisches Sparen und Spartipps',
      en: 'Automatic savings and saving tips',
      fr: 'Épargne automatique et conseils d\'économie'
    },
    status: 'active',
    grantedAt: '2025-11-15',
    validUntil: '2026-02-15',
    categories: ['cat-1', 'cat-2', 'cat-6'],
    autoRenewal: false
  },
  {
    id: 'partner-7',
    name: 'InsuranceHub',
    logo: '🛡️',
    purpose: {
      de: 'Versicherungsvergleich und -optimierung',
      en: 'Insurance comparison and optimization',
      fr: 'Comparaison et optimisation d\'assurance'
    },
    status: 'pending',
    grantedAt: '2026-01-10',
    validUntil: '2026-07-10',
    categories: ['cat-1', 'cat-7'],
    autoRenewal: false
  },
  {
    id: 'partner-8',
    name: 'MerchantAnalytics',
    logo: '🏪',
    purpose: {
      de: 'Händler-Analyse und Cashback-Optimierung',
      en: 'Merchant analysis and cashback optimization',
      fr: 'Analyse des commerçants et optimisation cashback'
    },
    status: 'active',
    grantedAt: '2025-07-01',
    validUntil: '2026-07-01',
    categories: ['cat-2', 'cat-5'],
    autoRenewal: true
  }
];

// Audit Log (PB-07/08, SE-05)
export const auditLog: AuditLogEntry[] = [
  {
    id: 'log-1',
    timestamp: '2026-01-18T09:15:00',
    partnerId: 'partner-1',
    action: 'access_granted',
    categoryIds: ['cat-1', 'cat-2', 'cat-5'],
    result: 'success',
    technicalDetails: 'OAuth2 token issued. Scope: read_accounts, read_transactions, read_cards. Token ID: tok_abc123'
  },
  {
    id: 'log-2',
    timestamp: '2026-01-17T14:30:00',
    partnerId: 'partner-5',
    action: 'access_granted',
    categoryIds: ['cat-1', 'cat-2', 'cat-3', 'cat-5'],
    result: 'success',
    technicalDetails: 'OAuth2 token issued. Scope: read_accounts, read_transactions, read_securities, read_cards. Token ID: tok_def456'
  },
  {
    id: 'log-3',
    timestamp: '2026-01-16T11:00:00',
    partnerId: 'partner-2',
    action: 'access_extended',
    categoryIds: ['cat-1', 'cat-3'],
    result: 'success',
    technicalDetails: 'Token validity extended by 90 days. New expiry: 2026-03-01. Token ID: tok_ghi789'
  },
  {
    id: 'log-4',
    timestamp: '2026-01-15T16:45:00',
    partnerId: 'partner-1',
    action: 'pdf_exported',
    result: 'success',
    technicalDetails: 'Report generated. File: consent_report_2026-01-15.pdf. Size: 245KB'
  },
  {
    id: 'log-5',
    timestamp: '2026-01-14T10:20:00',
    partnerId: 'partner-3',
    action: 'notification_sent',
    result: 'success',
    technicalDetails: 'Email notification sent to user. Type: expiring_consent. Template: expiry_reminder_5days'
  }
];

// Notifications (IN-04)
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'expiring_consent',
    criticality: 'warning',
    title: {
      de: 'Zugriff läuft bald ab',
      en: 'Access expiring soon',
      fr: 'Accès expire bientôt'
    },
    message: {
      de: 'Der Zugriff für FinInsights läuft am 19.01.2026 ab. Möchten Sie verlängern?',
      en: 'Access for FinInsights expires on 19.01.2026. Would you like to extend?',
      fr: 'L\'accès pour FinInsights expire le 19.01.2026. Voulez-vous prolonger?'
    },
    timestamp: '2026-01-18T09:00:00',
    read: false
  },
  {
    id: 'notif-2',
    type: 'expiring_consent',
    criticality: 'caution',
    title: {
      de: '5 Zugriffsrechte laufen bald ab',
      en: '5 access rights expiring soon',
      fr: '5 droits d\'accès expirent bientôt'
    },
    message: {
      de: 'Überprüfen Sie die ablaufenden Zugriffsrechte und verlängern Sie bei Bedarf.',
      en: 'Review expiring access rights and extend if needed.',
      fr: 'Examinez les droits d\'accès expirants et prolongez si nécessaire.'
    },
    timestamp: '2026-01-17T08:30:00',
    read: false
  },
  {
    id: 'notif-3',
    type: 'new_request',
    criticality: 'info',
    title: {
      de: 'Neue Zugriffsanfrage',
      en: 'New access request',
      fr: 'Nouvelle demande d\'accès'
    },
    message: {
      de: 'InsuranceHub hat eine neue Zugriffsanfrage gestellt.',
      en: 'InsuranceHub has submitted a new access request.',
      fr: 'InsuranceHub a soumis une nouvelle demande d\'accès.'
    },
    timestamp: '2026-01-16T15:20:00',
    read: true
  },
  {
    id: 'notif-4',
    type: 'security_event',
    criticality: 'info',
    title: {
      de: 'Sicherheitsüberprüfung fällig',
      en: 'Security review due',
      fr: 'Examen de sécurité dû'
    },
    message: {
      de: 'Überprüfen Sie Ihre aktiven Datenfreigaben regelmäßig.',
      en: 'Review your active data shares regularly.',
      fr: 'Examinez régulièrement vos partages de données actifs.'
    },
    timestamp: '2026-01-15T10:00:00',
    read: true
  },
  {
    id: 'notif-5',
    type: 'status_update',
    criticality: 'info',
    title: {
      de: 'Zugriff verlängert',
      en: 'Access extended',
      fr: 'Accès prolongé'
    },
    message: {
      de: 'Der Zugriff für InvestTrack wurde erfolgreich verlängert.',
      en: 'Access for InvestTrack was successfully extended.',
      fr: 'L\'accès pour InvestTrack a été prolongé avec succès.'
    },
    timestamp: '2026-01-16T11:05:00',
    read: true
  }
];

// Possible System Messages + Criticality (IN-04)
export const systemMessageTypes = [
  {
    type: 'expiring_consent',
    criticality: 'warning' as const,
    examples: {
      de: 'Zugriff läuft in X Tagen ab',
      en: 'Access expires in X days',
      fr: 'L\'accès expire dans X jours'
    }
  },
  {
    type: 'new_request',
    criticality: 'info' as const,
    examples: {
      de: 'Neue Zugriffsanfrage von Partnerdienst',
      en: 'New access request from partner service',
      fr: 'Nouvelle demande d\'accès du service partenaire'
    }
  },
  {
    type: 'security_event',
    criticality: 'warning' as const,
    examples: {
      de: 'Ungewöhnliche Zugriffsmuster erkannt',
      en: 'Unusual access patterns detected',
      fr: 'Modèles d\'accès inhabituels détectés'
    }
  },
  {
    type: 'consent_revoked',
    criticality: 'info' as const,
    examples: {
      de: 'Zugriff wurde erfolgreich entzogen',
      en: 'Access was successfully revoked',
      fr: 'L\'accès a été révoqué avec succès'
    }
  },
  {
    type: 'consent_granted',
    criticality: 'info' as const,
    examples: {
      de: 'Zugriff wurde erfolgreich erteilt',
      en: 'Access was successfully granted',
      fr: 'L\'accès a été accordé avec succès'
    }
  },
  {
    type: 'data_export',
    criticality: 'info' as const,
    examples: {
      de: 'Datenexport wurde erstellt',
      en: 'Data export was created',
      fr: 'L\'exportation des données a été créée'
    }
  },
  {
    type: 'partner_update',
    criticality: 'caution' as const,
    examples: {
      de: 'Partnerdienst hat Zugriffsberechtigungen aktualisiert',
      en: 'Partner service updated access permissions',
      fr: 'Le service partenaire a mis à jour les autorisations d\'accès'
    }
  }
];
