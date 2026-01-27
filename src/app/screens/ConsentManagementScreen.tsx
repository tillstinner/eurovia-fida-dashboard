import React, { useState } from 'react';
import { Shield, AlertCircle, CheckCircle, ChevronRight, Clock } from 'lucide-react';
import { useFida } from '@/app/context/FidaContext';
import { SensitivityBadge, StatusBadge } from '@/app/components/FidaComponents';
import { AllowConsentModal, DenyConsentModal, ConfirmModal } from '@/app/components/FidaModals';
import { dataCategories } from '@/app/data/mockData';
import { toast } from 'sonner';

export const ConsentManagementScreen: React.FC = () => {
  const { t, language, partnerServices, setCurrentView, setSelectedPartnerId, grantAccess, denyAccess, revokeAccess } = useFida();
  const [showSettings, setShowSettings] = useState(false);
  
  // Modal states
  const [allowModalOpen, setAllowModalOpen] = useState(false);
  const [denyModalOpen, setDenyModalOpen] = useState(false);
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>(null);

  // Pending requests (status = 'pending')
  const pendingRequests = partnerServices.filter(p => p.status === 'pending');

  // Active consents (status = 'active')
  const activeConsents = partnerServices.filter(p => p.status === 'active');

  // Check if expiring soon (within 30 days)
  const isExpiringSoon = (validUntil: string): boolean => {
    const daysLeft = Math.ceil((new Date(validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft > 0;
  };

  // Calculate sensitivity level for partner
  const getMaxSensitivityLevel = (partner: any): 1 | 2 | 3 => {
    const levels = partner.categories.map((catId: string) => {
      const cat = dataCategories.find(c => c.id === catId);
      return cat?.sensitivityLevel || 1;
    });
    return Math.max(...levels) as 1 | 2 | 3;
  };

  const handleApproveClick = (partner: any) => {
    setSelectedPartner(partner);
    setAllowModalOpen(true);
  };

  const handleApproveConfirm = () => {
    if (!selectedPartner) return;
    
    // Grant access - convert from pending to active
    const updatedPartner = { ...selectedPartner, status: 'active' as const };
    grantAccess(updatedPartner);
    toast.success(t('toasts.accessGranted'));
    
    setAllowModalOpen(false);
    setSelectedPartner(null);
  };

  const handleDenyClick = (partner: any) => {
    setSelectedPartner(partner);
    setDenyModalOpen(true);
  };

  const handleDenyConfirm = () => {
    if (!selectedPartner) return;
    
    denyAccess(selectedPartner.id);
    toast.success(t('toasts.accessRevoked')); // Using revoke as deny for now or add new toast
    
    setDenyModalOpen(false);
    setSelectedPartner(null);
  };

  const handleRevokeClick = (partner: any) => {
    setSelectedPartner(partner);
    setRevokeModalOpen(true);
  };

  const handleRevokeConfirm = () => {
    if (!selectedPartner) return;
    
    revokeAccess(selectedPartner.id);
    toast.success(t('toasts.accessRevoked'));
    
    setRevokeModalOpen(false);
    setSelectedPartner(null);
  };

  const handleViewDetails = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
    setCurrentView('partner-detail');
  };

  return (
    <div className="p-8 space-y-6">
      {/* PRIMARY SECTION - Anfragen & Entscheidungen (Inbox Logic) */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--fida-divider)] bg-[var(--fida-surface-2)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--fida-info)]/10 flex items-center justify-center">
              <Shield size={20} className="text-[var(--fida-info)]" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--fida-text-primary)]">
                {t('consent.requestsDecisions')}
              </h3>
              <p className="text-sm text-[var(--fida-text-secondary)] mt-1">
                {t('consent.requestsDecisionsDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <p className="text-sm text-[var(--fida-text-secondary)]">
                {t('dashboard.noOpenRequests')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map(request => {
                const maxSensitivity = getMaxSensitivityLevel(request);

                return (
                  <div
                    key={request.id}
                    className="p-4 border border-[var(--fida-divider)] rounded-lg hover:border-[var(--fida-primary-sidebar)]/30 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="text-2xl mt-1">{request.logo}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-[var(--fida-text-primary)]">
                              {request.name}
                            </h4>
                            <SensitivityBadge level={maxSensitivity} />
                          </div>
                          <p className="text-sm text-[var(--fida-text-secondary)] mb-2">
                            {request.categories.length} {t('dashboard.categories')} (Level {maxSensitivity})
                          </p>
                          <p className="text-sm text-[var(--fida-text-secondary)]">
                            <span className="font-medium">{t('partner.purpose')}:</span>{' '}
                            {request.purpose[language] || request.purpose.de}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDenyClick(request)}
                          className="px-4 py-2 text-sm border border-[var(--fida-divider)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors text-[var(--fida-text-primary)]"
                        >
                          {t('consent.deny')}
                        </button>
                        <button
                          onClick={() => handleApproveClick(request)}
                          className="px-4 py-2 text-sm bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:bg-[var(--fida-primary-sidebar)]/90 transition-colors"
                        >
                          {t('actions.grantAccess')}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* SECONDARY SECTION - Aktive Einwilligungen (Compressed Overview) */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--fida-divider)]">
          <h3 className="font-semibold text-[var(--fida-text-primary)]">
            {t('consent.activeConsents')}
          </h3>
          <p className="text-sm text-[var(--fida-text-secondary)] mt-1">
            {t('consent.activeConsentsDesc')}
          </p>
        </div>

        <div className="divide-y divide-[var(--fida-divider)]">
          {activeConsents.map(consent => {
            const expiringSoon = isExpiringSoon(consent.validUntil);

            return (
              <div
                key={consent.id}
                className="p-4 hover:bg-[var(--fida-surface-2)] transition-colors"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <span className="text-xl">{consent.logo}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-[var(--fida-text-primary)]">
                          {consent.name}
                        </h4>
                        <StatusBadge 
                          status={expiringSoon ? 'expiring' : 'active'} 
                        />
                      </div>
                      {expiringSoon && (
                        <div className="flex items-center gap-1 text-xs text-amber-700">
                          <Clock size={12} />
                          <span>
                            {t('consent.expiresOn')} {new Date(consent.validUntil).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRevokeClick(consent)}
                      className="px-3 py-1.5 text-sm border border-[var(--fida-danger)] text-[var(--fida-danger)] rounded-md hover:bg-[var(--fida-danger)]/5 transition-colors"
                    >
                      {t('actions.revokeAccess')}
                    </button>
                    <button
                      onClick={() => handleViewDetails(consent.id)}
                      className="px-3 py-1.5 text-sm border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors flex items-center gap-1"
                    >
                      {t('partner.overview')}
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TERTIARY SECTION - Einstellungen & Standards (Optional) */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full p-4 flex items-center justify-between hover:bg-[var(--fida-surface-2)] transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-[var(--fida-text-secondary)]" />
            <span className="text-sm font-medium text-[var(--fida-text-primary)]">
              {t('consent.settingsStandards')}
            </span>
          </div>
          <ChevronRight 
            size={16} 
            className={`text-[var(--fida-text-secondary)] transition-transform ${showSettings ? 'rotate-90' : ''}`} 
          />
        </button>

        {showSettings && (
          <div className="p-4 border-t border-[var(--fida-divider)] space-y-4 bg-[var(--fida-surface-2)]">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="allow-permanent"
                className="mt-1 w-4 h-4 rounded border-[var(--fida-divider)]"
              />
              <label htmlFor="allow-permanent" className="flex-1">
                <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                  {t('consent.allowPermanent')}
                </div>
                <div className="text-xs text-[var(--fida-text-secondary)] mt-1">
                  {t('consent.allowPermanentDesc')}
                </div>
              </label>
            </div>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="reminder-14d"
                className="mt-1 w-4 h-4 rounded border-[var(--fida-divider)]"
                defaultChecked
              />
              <label htmlFor="reminder-14d" className="flex-1">
                <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                  {t('consent.reminderBefore')}
                </div>
                <div className="text-xs text-[var(--fida-text-secondary)] mt-1">
                  {t('consent.reminderBeforeDesc')}
                </div>
              </label>
            </div>
          </div>
        )}
      </div>

      {/* MODALS */}
      {selectedPartner && (
        <>
          <AllowConsentModal
            isOpen={allowModalOpen}
            onClose={() => {
              setAllowModalOpen(false);
              setSelectedPartner(null);
            }}
            onConfirm={handleApproveConfirm}
            partnerName={selectedPartner.name}
            categoryCount={selectedPartner.categories.length}
            level={getMaxSensitivityLevel(selectedPartner)}
            confirmLabel={t('actions.grantAccess')}
            cancelLabel={t('common.cancel')}
            checkboxLabel={t('consent.confirmImpact')}
          />
          
          <DenyConsentModal
            isOpen={denyModalOpen}
            onClose={() => {
              setDenyModalOpen(false);
              setSelectedPartner(null);
            }}
            onConfirm={handleDenyConfirm}
            partnerName={selectedPartner.name}
            confirmLabel={t('consent.deny')}
            cancelLabel={t('common.cancel')}
            checkboxLabel={t('consent.confirmImpact')}
          />
          
          <ConfirmModal
            isOpen={revokeModalOpen}
            onClose={() => {
              setRevokeModalOpen(false);
              setSelectedPartner(null);
            }}
            onConfirm={handleRevokeConfirm}
            title={t('partner.revokeTitle')}
            message={t('partner.revokeMessage').replace('{name}', selectedPartner.name)}
            confirmLabel={t('actions.revokeAccess')}
            cancelLabel={t('common.cancel')}
            level={getMaxSensitivityLevel(selectedPartner)}
            checkboxLabel={t('consent.confirmImpact')}
          />
        </>
      )}
    </div>
  );
};