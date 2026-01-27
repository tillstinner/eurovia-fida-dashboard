import React, { useState } from 'react';
import { useFida } from '@/app/context/FidaContext';
import { PartnerCard, EmptyState } from '@/app/components/FidaComponents';
import { ConfirmModal } from '@/app/components/FidaModals';
import { Share2 } from 'lucide-react';
import { dataCategories } from '@/app/data/mockData';
import { toast } from 'sonner';

export const DataSharingScreen: React.FC = () => {
  const { t, partnerServices, setCurrentView, setSelectedPartnerId, revokeAccess, language } = useFida();
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  
  const activeServices = partnerServices.filter(p => p.status === 'active');

  const handleRevokeClick = (partnerId: string) => {
    setSelectedPartner(partnerId);
    setRevokeModalOpen(true);
  };

  const handleRevokeConfirm = () => {
    if (selectedPartner) {
      revokeAccess(selectedPartner);
      setRevokeModalOpen(false);
      setSelectedPartner(null);
      toast.success(t('toasts.accessRevoked'));
    }
  };

  const getMaxSensitivityLevel = (categoryIds: string[]): 1 | 2 | 3 => {
    const levels = categoryIds
      .map(id => dataCategories.find(c => c.id === id)?.sensitivityLevel || 1);
    return Math.max(...levels) as 1 | 2 | 3;
  };

  const currentPartner = selectedPartner ? partnerServices.find(p => p.id === selectedPartner) : null;
  const sensitivityLevel = currentPartner ? getMaxSensitivityLevel(currentPartner.categories) : 1;

  if (activeServices.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          icon={<Share2 size={32} />}
          title={t('dashboard.emptyState')}
          description={t('dashboard.emptyStateDesc')}
          action={{
            label: t('quickActions.newRequest'),
            onClick: () => setCurrentView('new-request')
          }}
        />
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Filter/Sort Bar (Optional for now) */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-[var(--fida-text-secondary)]">
            {activeServices.length} {activeServices.length === 1 ? t('partner.activePartner') : t('partner.activePartners')}
          </p>
        </div>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid gap-6">
        {activeServices.map(partner => {
          const maxSensLevel = getMaxSensitivityLevel(partner.categories);
          return (
            <PartnerCard
              key={partner.id}
              id={partner.id}
              name={partner.name}
              logo={partner.logo}
              purpose={partner.purpose[language] || partner.purpose.de}
              status={partner.status}
              statusLabel={t(`status.${partner.status}`)}
              grantedAt={new Date(partner.grantedAt).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
              validUntil={new Date(partner.validUntil).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
              grantedLabel={t('dates.grantedAt')}
              validLabel={t('dates.validUntil')}
              categories={partner.categories.length}
              maxSensitivityLevel={maxSensLevel}
              onViewDetails={() => {
                setSelectedPartnerId(partner.id);
                setCurrentView('partner-detail');
              }}
              onRevokeAccess={() => handleRevokeClick(partner.id)}
              detailsLabel={t('actions.viewDetails')}
              revokeLabel={t('actions.revokeAccess')}
            />
          );
        })}
      </div>

      {/* Revoke Confirmation Modal (UX-03) */}
      <ConfirmModal
        isOpen={revokeModalOpen}
        onClose={() => {
          setRevokeModalOpen(false);
          setSelectedPartner(null);
        }}
        onConfirm={handleRevokeConfirm}
        title={t('partner.revokeTitle')}
        message={t('partner.revokeMessage').replace('{name}', currentPartner?.name || '')}
        confirmLabel={t('actions.revokeAccess')}
        cancelLabel={t('common.cancel')}
        level={sensitivityLevel}
        checkboxLabel={t('consent.confirmImpact')}
      />
    </div>
  );
};