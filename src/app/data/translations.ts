// Translation System for FiDA Dashboard (WD-00)

export type Language = 'de' | 'en' | 'fr';

export const translations = {
  // Navigation (IN-01, WD-OV)
  nav: {
    dashboard: {
      de: 'Konto-Übersicht',
      en: 'Account Overview',
      fr: 'Aperçu du compte'
    },
    dataSharing: {
      de: 'Datenfreigabe',
      en: 'Data Sharing',
      fr: 'Partage de données'
    },
    consentManagement: {
      de: 'Consent-Management',
      en: 'Consent Management',
      fr: 'Gestion du consentement'
    },
    dataCategories: {
      de: 'Datenkategorien',
      en: 'Data Categories',
      fr: 'Catégories de données'
    },
    accessHistory: {
      de: 'Aktivitätsprotokoll',
      en: 'Activity Log',
      fr: 'Journal d\'activité'
    },
    accessHistorySub: {
      log: {
        de: 'Aktivitätsprotokoll',
        en: 'Activity Log',
        fr: 'Journal d\'activité'
      },
      export: {
        de: 'Report exportieren',
        en: 'Export report',
        fr: 'Exporter le rapport'
      }
    },
    security: {
      de: 'Sicherheit & Datenschutz',
      en: 'Security & Privacy',
      fr: 'Sécurité & Confidentialité'
    },
    securitySub: {
      privacyRights: {
        de: 'Datenschutzrechte',
        en: 'Privacy Rights',
        fr: 'Droits de confidentialité'
      },
      contact: {
        de: 'Kontakt & Beschwerdestelle',
        en: 'Contact & Complaints',
        fr: 'Contact & Plaintes'
      },
      dataTransfer: {
        de: 'Datenweitergabe-Info',
        en: 'Data Transfer Info',
        fr: 'Info transfert de données'
      }
    },
    settings: {
      de: 'Einstellungen',
      en: 'Settings',
      fr: 'Paramètres'
    },
    help: {
      de: 'Hilfe',
      en: 'Help',
      fr: 'Aide'
    },
    contact: {
      de: 'Kontakt',
      en: 'Contact',
      fr: 'Contact'
    }
  },
  
  // Quick Actions (WD-QA)
    quickActions: {
      title: {
        de: 'Kurzbefehle',
        en: 'Quick Actions',
        fr: 'Actions rapides'
      },
      search: {
        de: 'Schnellsuche',
        en: 'Quick Search',
        fr: 'Recherche rapide'
      },
      searchPlaceholder: {
        de: 'Partnerdienst oder Kategorie suchen…',
        en: 'Search partner service or category…',
        fr: 'Rechercher un service ou une catégorie…'
      },
      exportProtocol: {
        de: 'Protokoll exportieren',
        en: 'Export protocol',
        fr: 'Exporter le protocole'
      },
      pauseAccess: {
        de: 'Zugriffe pausieren',
        en: 'Pause all access',
        fr: 'Suspendre les accès'
      },
      newRequest: {
        de: 'Neue Zugriffsanfrage',
        en: 'New Access Request',
        fr: 'Nouvelle demande d\'accès'
      },
      activityLog: {
        de: 'Aktivitätsprotokoll',
        en: 'Activity Log',
        fr: 'Journal d\'activité'
      },
      pdfDownload: {
        de: 'PDF-Download',
        en: 'PDF Download',
        fr: 'Télécharger PDF'
      },
      notifications: {
        de: 'Benachrichtigungen',
        en: 'Notifications',
        fr: 'Notifications'
      }
    },
  
  // Dashboard Cards (WD-OV)
    dashboard: {
      dataSharing: {
        de: 'Datenfreigabe',
        en: 'Data Sharing',
        fr: 'Partage de données'
      },
      validUntil: {
        de: 'Gültig bis',
        en: 'Valid Until',
        fr: 'Valable jusqu\'à'
      },
      notifications: {
        de: 'Benachrichtigungen',
        en: 'Notifications',
        fr: 'Notifications'
      },
      status: {
        de: 'Status',
        en: 'Status',
        fr: 'Statut'
      },
      activePartnerServices: {
        de: 'aktive Partnerdienste',
        en: 'active partner services',
        fr: 'services partenaires actifs'
      },
      expiringServices: {
        de: 'Bald ablaufende Freigaben',
        en: 'Expiring Soon',
        fr: 'Expirant bientôt'
      },
      toOverview: {
        de: 'zur Übersicht',
        en: 'to overview',
        fr: 'vers l\'aperçu'
      },
      emptyState: {
        de: 'Derzeit keine aktiven Datenfreigaben',
        en: 'Currently no active data sharing',
        fr: 'Actuellement aucun partage de données actif'
      },
      emptyStateDesc: {
        de: 'Sie haben noch keine Datenfreigaben erteilt. Partnerdienste können Zugriff auf Ihre Bankdaten beantragen.',
        en: 'You have not yet granted any data sharing permissions. Partner services can request access to your banking data.',
        fr: 'Vous n\'avez pas encore accordé d\'autorisations de partage de données. Les services partenaires peuvent demander l\'accès à vos données bancaires.'
      },
      actionsRequired: {
        de: 'Aktionen erforderlich',
        en: 'Actions Required',
        fr: 'Actions requises'
      },
      allCurrentStatus: {
        de: 'Alle Datenfreigaben sind aktuell',
        en: 'All data sharing permissions are current',
        fr: 'Toutes les autorisations de partage sont à jour'
      },
      actionsRequiredDesc: {
        de: 'Es gibt offene Anfragen oder ablaufende Freigaben, die Ihre Aufmerksamkeit erfordern.',
        en: 'There are pending requests or expiring permissions that require your attention.',
        fr: 'Il y a des demandes en attente ou des autorisations expirant qui nécessitent votre attention.'
      },
      allCurrentDesc: {
        de: 'Alle aktiven Datenfreigaben sind gültig. Derzeit sind keine Maßnahmen erforderlich.',
        en: 'All active data sharing permissions are valid. No actions are currently required.',
        fr: 'Toutes les autorisations de partage actives sont valides. Aucune action n\'est requise actuellement.'
      },
      toRequest: {
        de: 'Zur Anfrage',
        en: 'To Request',
        fr: 'À la demande'
      },
      overviewManagement: {
        de: 'Übersicht & Verwaltung',
        en: 'Overview & Management',
        fr: 'Aperçu & Gestion'
      },
      activePartnerServicesLabel: {
        de: 'Aktive Partnerdienste',
        en: 'Active partner services',
        fr: 'Services partenaires actifs'
      },
      currentActiveSharing: {
        de: 'Aktuell geteilte Daten',
        en: 'Currently shared data',
        fr: 'Données actuellement partagées'
      },
      categories: {
        de: 'Kategorien',
        en: 'Categories',
        fr: 'Catégories'
      },
      consentManagement: {
        de: 'Consent-Management',
        en: 'Consent Management',
        fr: 'Gestion du consentement'
      },
      expiringShares: {
        de: 'Bald ablaufende Freigaben',
        en: 'Expiring Permissions',
        fr: 'Autorisations expirant'
      },
      noExpiring: {
        de: 'Keine ablaufenden Freigaben',
        en: 'No expiring permissions',
        fr: 'Aucune autorisation expirant'
      },
      days: {
        de: 'Tage',
        en: 'days',
        fr: 'jours'
      },
      openRequests: {
        de: 'Offene Zugriffsanfragen',
        en: 'Open Access Requests',
        fr: 'Demandes d\'accès ouvertes'
      },
      noOpenRequests: {
        de: 'Keine offenen Anfragen',
        en: 'No open requests',
        fr: 'Aucune demande ouverte'
      },
      newRequest: {
        de: 'Neue Zugriffsanfrage',
        en: 'New access request',
        fr: 'Nouvelle demande d\'accès'
      },
      newRequests: {
        de: 'Neue Zugriffsanfragen',
        en: 'New access requests',
        fr: 'Nouvelles demandes d\'accès'
      },
      from: {
        de: 'von',
        en: 'from',
        fr: 'de'
      },
      activityLog: {
        de: 'Aktivitätsprotokoll',
        en: 'Activity Log',
        fr: 'Journal d\'activité'
      },
      toFullLog: {
        de: 'Zum vollständigen Protokoll',
        en: 'To full log',
        fr: 'Au journal complet'
      },
      noActivity: {
        de: 'Keine Aktivitäten',
        en: 'No activities',
        fr: 'Aucune activité'
      },
      sharedCategories: {
        de: 'geteilte Datenkategorien',
        en: 'shared data categories',
        fr: 'catégories de données partagées'
      },
      highestLevel: {
        de: 'Höchstes Sensitivitätslevel',
        en: 'Highest sensitivity level',
        fr: 'Niveau de sensibilité le plus élevé'
      }
    },
  
  // Actions (WD-DS, WD-EX, WD-QA)
  actions: {
    grantAccess: {
      de: 'Zugriff erlauben',
      en: 'Grant Access',
      fr: 'Autoriser l\'accès'
    },
    revokeAccess: {
      de: 'Zugriff entziehen',
      en: 'Revoke Access',
      fr: 'Révoquer l\'accès'
    },
    extendAccess: {
      de: 'Zugriff verlängern',
      en: 'Extend Access',
      fr: 'Prolonger l\'accès'
    },
    viewDetails: {
      de: 'Detailansicht',
      en: 'View Details',
      fr: 'Voir les détails'
    },
    enableNotifications: {
      de: 'Benachrichtigungen aktivieren',
      en: 'Enable Notifications',
      fr: 'Activer les notifications'
    },
    permanentAccess: {
      de: 'Dauerhafte Freigabe',
      en: 'Permanent Access',
      fr: 'Accès permanent'
    }
  },
  
  // Status (WD-DS)
  status: {
    active: {
      de: 'Aktiv',
      en: 'Active',
      fr: 'Actif'
    },
    ended: {
      de: 'Beendet',
      en: 'Ended',
      fr: 'Terminé'
    },
    pending: {
      de: 'Ausstehend',
      en: 'Pending',
      fr: 'En attente'
    },
    expired: {
      de: 'Abgelaufen',
      en: 'Expired',
      fr: 'Expiré'
    }
  },
  
  // Date Labels (WD-DS)
  dates: {
    grantedAt: {
      de: 'Erteilt am',
      en: 'Granted on',
      fr: 'Accordé le'
    },
    validUntil: {
      de: 'Gültig bis',
      en: 'Valid until',
      fr: 'Valable jusqu\'à'
    },
    revokedAt: {
      de: 'Widerruf initiiert am',
      en: 'Revocation initiated on',
      fr: 'Révocation initiée le'
    },
    endedAt: {
      de: 'Zugriff beendet am',
      en: 'Access ended on',
      fr: 'Accès terminé le'
    }
  },
  
  // Partner Services (WD-TP)
    partner: {
      services: {
        de: 'Partnerdienste',
        en: 'Partner Services',
        fr: 'Services partenaires'
      },
      purpose: {
        de: 'Zweck',
        en: 'Purpose',
        fr: 'Objectif'
      },
      requestReason: {
        de: 'Grund der Anfrage',
        en: 'Request Reason',
        fr: 'Raison de la demande'
      },
      notFound: {
        de: 'Partner nicht gefunden',
        en: 'Partner not found',
        fr: 'Partenaire non trouvé'
      },
      overview: {
        de: 'Übersicht',
        en: 'Overview',
        fr: 'Aperçu'
      },
      history: {
        de: 'Historie',
        en: 'History',
        fr: 'Historique'
      },
      runtime: {
        de: 'Laufzeit',
        en: 'Runtime',
        fr: 'Durée'
      },
      runtimeFromTo: {
        de: 'Von {from} bis {to}',
        en: 'From {from} to {to}',
        fr: 'Du {from} au {to}'
      },
      summary: {
        de: 'Zusammenfassung',
        en: 'Summary',
        fr: 'Résumé'
      },
      summaryText: {
        de: 'Dieser Dienst hat Zugriff auf {count} Datenkategorien mit maximalem Sensitivitätslevel {level}.',
        en: 'This service has access to {count} data categories with maximum sensitivity level {level}.',
        fr: 'Ce service a accès à {count} catégories de données avec un niveau de sensibilité maximum de {level}.'
      },
      category: {
        de: 'Kategorie',
        en: 'Category',
        fr: 'Catégorie'
      },
      revokeTitle: {
        de: 'Zugriff entziehen?',
        en: 'Revoke access?',
        fr: 'Révoquer l\'accès?'
      },
      revokeMessage: {
        de: 'Möchten Sie den Zugriff für {name} wirklich entziehen? Der Dienst kann dann nicht mehr auf Ihre Bankdaten zugreifen.',
        en: 'Do you really want to revoke access for {name}? The service will no longer be able to access your banking data.',
        fr: 'Voulez-vous vraiment révoquer l\'accès pour {name}? Le service ne pourra plus accéder à vos données bancaires.'
      },
      noHistory: {
        de: 'Keine Historie verfügbar',
        en: 'No history available',
        fr: 'Aucun historique disponible'
      }
    },
  
  // Data Categories
  categories: {
    title: {
      de: 'Datenkategorien',
      en: 'Data Categories',
      fr: 'Catégories de données'
    },
    description: {
      de: 'Beschreibung',
      en: 'Description',
      fr: 'Description'
    },
    sensitivity: {
      de: 'Sensitivitätslevel',
      en: 'Sensitivity Level',
      fr: 'Niveau de sensibilité'
    },
    whyShared: {
      de: 'Warum wird das geteilt?',
      en: 'Why is this shared?',
      fr: 'Pourquoi est-ce partagé?'
    }
  },
  
  // Sensitivity Levels (SE-01)
  sensitivity: {
    level1: {
      de: 'Level 1 - Niedrig',
      en: 'Level 1 - Low',
      fr: 'Niveau 1 - Faible'
    },
    level2: {
      de: 'Level 2 - Mittel',
      en: 'Level 2 - Medium',
      fr: 'Niveau 2 - Moyen'
    },
    level3: {
      de: 'Level 3 - Hoch',
      en: 'Level 3 - High',
      fr: 'Niveau 3 - Élevé'
    },
    legend: {
      de: 'Sensitivitätslevel-Erklärung',
      en: 'Sensitivity Level Explanation',
      fr: 'Explication du niveau de sensibilité'
    },
    level1Desc: {
      de: 'Grundlegende Kontoinformationen ohne detaillierte Transaktionen',
      en: 'Basic account information without detailed transactions',
      fr: 'Informations de compte de base sans transactions détaillées'
    },
    level2Desc: {
      de: 'Detaillierte Finanzdaten mit moderatem Schutzbedarf',
      en: 'Detailed financial data with moderate protection needs',
      fr: 'Données financières détaillées avec besoins de protection modérés'
    },
    level3Desc: {
      de: 'Hochsensible Daten wie vollständige Transaktionshistorie oder Einkommensdaten',
      en: 'Highly sensitive data such as complete transaction history or income data',
      fr: 'Données hautement sensibles telles que l\'historique complet des transactions ou les données de revenus'
    }
  },
  
  // Consent Management (UX)
  consent: {
    newRequest: {
      de: 'Neue Zugriffsanfrage',
      en: 'New Access Request',
      fr: 'Nouvelle demande d\'accès'
    },
    selectCategories: {
      de: 'Datenkategorien auswählen',
      en: 'Select Data Categories',
      fr: 'Sélectionner les catégories de données'
    },
    summary: {
      de: 'Zusammenfassung',
      en: 'Summary',
      fr: 'Résumé'
    },
    confirm: {
      de: 'Bestätigen',
      en: 'Confirm',
      fr: 'Confirmer'
    },
    confirmImpact: {
      de: 'Ich bestätige, dass ich die Auswirkungen verstanden habe',
      en: 'I confirm that I understand the implications',
      fr: 'Je confirme que je comprends les implications'
    },
    activeConsents: {
      de: 'Aktive Einwilligungen',
      en: 'Active Consents',
      fr: 'Consentements actifs'
    },
    requestsDecisions: {
      de: 'Anfragen & Entscheidungen',
      en: 'Requests & Decisions',
      fr: 'Demandes & Décisions'
    },
    requestsDecisionsDesc: {
      de: 'Neue Zugriffsanfragen und Änderungsanfragen bestehender Freigaben',
      en: 'New access requests and change requests for existing permissions',
      fr: 'Nouvelles demandes d\'accès et demandes de modification pour les autorisations existantes'
    },
    deny: {
      de: 'Ablehnen',
      en: 'Deny',
      fr: 'Refuser'
    },
    activeConsentsDesc: {
      de: 'Übersicht aller erteilten Zugriffsrechte',
      en: 'Overview of all granted access rights',
      fr: 'Aperçu de tous les droits d\'accès accordés'
    },
    settingsStandards: {
      de: 'Einstellungen & Standards',
      en: 'Settings & Defaults',
      fr: 'Paramètres & Standards'
    },
    allowPermanent: {
      de: 'Dauerhafte Freigaben erlauben',
      en: 'Allow permanent permissions',
      fr: 'Autoriser les autorisations permanentes'
    },
    allowPermanentDesc: {
      de: 'Partnerdienste können unbefristeten Zugriff anfragen',
      en: 'Partner services can request unlimited access',
      fr: 'Les services partenaires peuvent demander un accès illimité'
    },
    reminderBefore: {
      de: 'Erinnerung vor Ablauf',
      en: 'Reminder before expiry',
      fr: 'Rappel avant expiration'
    },
    reminderBeforeDesc: {
      de: 'Benachrichtigung 14 Tage vor Ablauf einer Freigabe',
      en: 'Notification 14 days before a permission expires',
      fr: 'Notification 14 jours avant l\'expiration d\'une autorisation'
    },
    dataCategories: {
      de: 'Datenkategorien',
      en: 'Data Categories',
      fr: 'Catégories de données'
    },
    level: {
      de: 'Level',
      en: 'Level',
      fr: 'Niveau'
    },
    confirmRevoke: {
      de: 'Zugriffsanfrage von {name} wirklich ablehnen?',
      en: 'Really deny access request from {name}?',
      fr: 'Vraiment refuser la demande d\'accès de {name}?'
    },
    confirmRevokeConsent: {
      de: 'Zugriff für {name} wirklich entziehen?',
      en: 'Really revoke access for {name}?',
      fr: 'Vraiment révoquer l\'accès pour {name}?'
    },
    revokeHighSensitivity: {
      de: 'Sie sind dabei, den Zugriff auf sensible Daten zu entziehen.\n\nPartnerdienst: {name}\n\nMöchten Sie fortfahren?',
      en: 'You are about to revoke access to sensitive data.\n\nPartner service: {name}\n\nDo you want to proceed?',
      fr: 'Vous êtes sur le point de révoquer l\'accès aux données sensibles.\n\nService partenaire: {name}\n\nVoulez-vous continuer?'
    },
    grantHighSensitivity: {
      de: 'Sie sind dabei, Zugriff auf sensible Daten (Level 2/3) zu gewähren.\n\nPartnerdienst: {name}\nDatenkategorien: {count}\n\nMöchten Sie fortfahren?',
      en: 'You are about to grant access to sensitive data (Level 2/3).\n\nPartner service: {name}\nData categories: {count}\n\nDo you want to proceed?',
      fr: 'Vous êtes sur le point d\'accorder l\'accès à des données sensibles (Niveau 2/3).\n\nService partenaire: {name}\nCatégories de données: {count}\n\nVoulez-vous continuer?'
    },
    expiresOn: {
      de: 'Läuft ab am',
      en: 'Expires on',
      fr: 'Expire le'
    }
  },
  
  // Audit Log (PB-07/08)
  audit: {
    title: {
      de: 'Zugriffshistorie',
      en: 'Access History',
      fr: 'Historique d\'accès'
    },
    timestamp: {
      de: 'Zeitpunkt',
      en: 'Timestamp',
      fr: 'Horodatage'
    },
    action: {
      de: 'Aktion',
      en: 'Action',
      fr: 'Action'
    },
    partner: {
      de: 'Partnerdienst',
      en: 'Partner Service',
      fr: 'Service partenaire'
    },
    result: {
      de: 'Ergebnis',
      en: 'Result',
      fr: 'Résultat'
    },
    details: {
      de: 'Details',
      en: 'Details',
      fr: 'Détails'
    },
    view: {
      de: 'Ansehen',
      en: 'View',
      fr: 'Voir'
    },
    summaryLine: {
      de: '{action} für {partner} am {date}. Ergebnis: {result}.',
      en: '{action} for {partner} on {date}. Result: {result}.',
      fr: '{action} pour {partner} le {date}. Résultat: {result}.'
    },
    plainText: {
      de: 'Klartext-Erklärung',
      en: 'Plain Text Explanation',
      fr: 'Explication en texte clair'
    },
    technical: {
      de: 'Technischer Eintrag',
      en: 'Technical Entry',
      fr: 'Entrée technique'
    },
    actions: {
      access_granted: {
        de: 'Zugriff erteilt',
        en: 'Access granted',
        fr: 'Accès accordé'
      },
      access_revoked: {
        de: 'Zugriff entzogen',
        en: 'Access revoked',
        fr: 'Accès révoqué'
      },
      access_extended: {
        de: 'Zugriff verlängert',
        en: 'Access extended',
        fr: 'Accès prolongé'
      },
      pdf_exported: {
        de: 'PDF-Report exportiert',
        en: 'PDF report exported',
        fr: 'Rapport PDF exporté'
      },
      notification_sent: {
        de: 'Benachrichtigung gesendet',
        en: 'Notification sent',
        fr: 'Notification envoyée'
      }
    }
  },
  
  // Security & Privacy (PB-09, DV-02)
  security: {
    title: {
      de: 'Sicherheit & Datenschutz',
      en: 'Security & Privacy',
      fr: 'Sécurité & Confidentialité'
    },
    privacyRights: {
      de: 'Ihre Datenschutzrechte nach FiDA/DSGVO',
      en: 'Your Privacy Rights under FiDA/GDPR',
      fr: 'Vos droits de confidentialité selon FiDA/RGPD'
    },
    dpo: {
      de: 'Datenschutzbeauftragte:r',
      en: 'Data Protection Officer',
      fr: 'Délégué à la protection des données'
    },
    complaints: {
      de: 'Beschwerdestellen',
      en: 'Complaint Offices',
      fr: 'Bureaux de plaintes'
    },
    dataTransferInfo: {
      de: 'Informationen zur Datenweitergabe',
      en: 'Data Transfer Information',
      fr: 'Informations sur le transfert de données'
    },
    noDataWithoutConsent: {
      de: 'Ihre Bank gibt keine Daten ohne Ihre ausdrückliche Einwilligung weiter. Sie haben die volle Kontrolle über Ihre Datenfreigaben.',
      en: 'Your bank does not share any data without your explicit consent. You have full control over your data sharing.',
      fr: 'Votre banque ne partage aucune donnée sans votre consentement explicite. Vous avez un contrôle total sur le partage de vos données.'
    }
  },
  
  // Common
  common: {
    cancel: {
      de: 'Abbrechen',
      en: 'Cancel',
      fr: 'Annuler'
    },
    save: {
      de: 'Speichern',
      en: 'Save',
      fr: 'Enregistrer'
    },
    close: {
      de: 'Schließen',
      en: 'Close',
      fr: 'Fermer'
    },
    back: {
      de: 'Zurück',
      en: 'Back',
      fr: 'Retour'
    },
    next: {
      de: 'Weiter',
      en: 'Next',
      fr: 'Suivant'
    },
    loading: {
      de: 'Laden...',
      en: 'Loading...',
      fr: 'Chargement...'
    },
    error: {
      de: 'Fehler',
      en: 'Error',
      fr: 'Erreur'
    },
    success: {
      de: 'Erfolg',
      en: 'Success',
      fr: 'Succès'
    }
  },
  
  // Toasts
  toasts: {
    accessGranted: {
      de: 'Zugriff erlaubt',
      en: 'Access granted',
      fr: 'Accès accordé'
    },
    accessRevoked: {
      de: 'Zugriff entzogen',
      en: 'Access revoked',
      fr: 'Accès révoqué'
    },
    accessExtended: {
      de: 'Zugriff verlängert',
      en: 'Access extended',
      fr: 'Accès prolongé'
    },
    reportCreated: {
      de: 'Report erstellt (PDF)',
      en: 'Report created (PDF)',
      fr: 'Rapport créé (PDF)'
    }
  }
};

export const getTranslation = (key: string, lang: Language): string => {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key; // Return key if not found
    }
  }
  
  if (value && typeof value === 'object' && lang in value) {
    return value[lang];
  }
  
  return key;
};