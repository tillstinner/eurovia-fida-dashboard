import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from '@/app/data/translations';
import { 
  PartnerService, 
  AuditLogEntry, 
  Notification, 
  partnerServices as initialPartnerServices,
  auditLog as initialAuditLog,
  notifications as initialNotifications
} from '@/app/data/mockData';

interface FidaContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  partnerServices: PartnerService[];
  auditLog: AuditLogEntry[];
  notifications: Notification[];
  
  currentView: string;
  setCurrentView: (view: string) => void;
  previousView: string | null;
  
  selectedPartnerId: string | null;
  setSelectedPartnerId: (id: string | null) => void;
  
  revokeAccess: (partnerId: string) => void;
  extendAccess: (partnerId: string, days: number) => void;
  grantAccess: (partner: PartnerService) => void;
  denyAccess: (partnerId: string) => void;
  exportPDF: () => void;
  markNotificationRead: (notificationId: string) => void;
}

const FidaContext = createContext<FidaContextType | undefined>(undefined);

export const FidaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('de');
  const [partnerServices, setPartnerServices] = useState<PartnerService[]>(initialPartnerServices);
  const [auditLog, setAuditLog] = useState<AuditLogEntry[]>(initialAuditLog);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [currentView, setCurrentViewState] = useState<string>('dashboard');
  const [previousView, setPreviousView] = useState<string | null>(null);
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null);

  // Wrapper to track navigation history
  const setCurrentView = (view: string) => {
    setPreviousView(currentView);
    setCurrentViewState(view);
  };

  const t = (key: string): string => {
    // Support special 'language' key for getting current language
    if (key === 'language') {
      return language;
    }
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    if (value && typeof value === 'object' && language in value) {
      return value[language];
    }
    
    return key;
  };

  const revokeAccess = (partnerId: string) => {
    const now = new Date().toISOString();
    
    // Update partner service status
    setPartnerServices(prev => 
      prev.map(p => 
        p.id === partnerId 
          ? { ...p, status: 'ended' as const } 
          : p
      )
    );
    
    // Add audit log entry
    const partner = partnerServices.find(p => p.id === partnerId);
    const newLogEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: now,
      partnerId,
      action: 'access_revoked',
      categoryIds: partner?.categories,
      result: 'success',
      technicalDetails: `Access revoked by user. Revocation initiated: ${now}. Access ended: ${now}`
    };
    
    setAuditLog(prev => [newLogEntry, ...prev]);
  };

  const extendAccess = (partnerId: string, days: number) => {
    const now = new Date().toISOString();
    
    // Update partner service validUntil
    setPartnerServices(prev => 
      prev.map(p => {
        if (p.id === partnerId) {
          const currentDate = new Date(p.validUntil);
          currentDate.setDate(currentDate.getDate() + days);
          return { ...p, validUntil: currentDate.toISOString().split('T')[0] };
        }
        return p;
      })
    );
    
    // Add audit log entry
    const partner = partnerServices.find(p => p.id === partnerId);
    const newLogEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: now,
      partnerId,
      action: 'access_extended',
      categoryIds: partner?.categories,
      result: 'success',
      technicalDetails: `Token validity extended by ${days} days. Extended at: ${now}`
    };
    
    setAuditLog(prev => [newLogEntry, ...prev]);
  };

  const grantAccess = (partner: PartnerService) => {
    const now = new Date().toISOString();
    
    // Update existing partner or add new one
    setPartnerServices(prev => {
      const existingIndex = prev.findIndex(p => p.id === partner.id);
      if (existingIndex >= 0) {
        // Update existing partner (e.g., from pending to active)
        return prev.map(p => p.id === partner.id ? partner : p);
      } else {
        // Add new partner service
        return [...prev, partner];
      }
    });
    
    // Add audit log entry
    const newLogEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: now,
      partnerId: partner.id,
      action: 'access_granted',
      categoryIds: partner.categories,
      result: 'success',
      technicalDetails: `OAuth2 token issued. Access granted at: ${now}`
    };
    
    setAuditLog(prev => [newLogEntry, ...prev]);
  };

  const denyAccess = (partnerId: string) => {
    const now = new Date().toISOString();
    
    // Update partner service status
    setPartnerServices(prev => 
      prev.map(p => 
        p.id === partnerId 
          ? { ...p, status: 'denied' as const } 
          : p
      )
    );
    
    // Add audit log entry
    const partner = partnerServices.find(p => p.id === partnerId);
    const newLogEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: now,
      partnerId,
      action: 'access_denied',
      categoryIds: partner?.categories,
      result: 'success',
      technicalDetails: `Access denied by user. Denial initiated: ${now}. Access ended: ${now}`
    };
    
    setAuditLog(prev => [newLogEntry, ...prev]);
  };

  const exportPDF = () => {
    const now = new Date().toISOString();
    
    // Add audit log entry
    const newLogEntry: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: now,
      partnerId: 'system',
      action: 'pdf_exported',
      result: 'success',
      technicalDetails: `Report generated at: ${now}. File: consent_report_${now.split('T')[0]}.pdf`
    };
    
    setAuditLog(prev => [newLogEntry, ...prev]);
  };

  const markNotificationRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(n =>
        n.id === notificationId
          ? { ...n, read: true }
          : n
      )
    );
  };

  return (
    <FidaContext.Provider
      value={{
        language,
        setLanguage,
        t,
        partnerServices,
        auditLog,
        notifications,
        currentView,
        setCurrentView,
        previousView,
        selectedPartnerId,
        setSelectedPartnerId,
        revokeAccess,
        extendAccess,
        grantAccess,
        denyAccess,
        exportPDF,
        markNotificationRead
      }}
    >
      {children}
    </FidaContext.Provider>
  );
};

export const useFida = () => {
  const context = useContext(FidaContext);
  if (!context) {
    throw new Error('useFida must be used within FidaProvider');
  }
  return context;
};