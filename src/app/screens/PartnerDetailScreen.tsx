import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useFida } from '@/app/context/FidaContext';
import { dataCategories, auditLog as mockAuditLog } from '@/app/data/mockData';
import { StatusBadge, SensitivityBadge } from '@/app/components/FidaComponents';
import { ConfirmModal, ExtendAccessModal } from '@/app/components/FidaModals';
import { toast } from 'sonner';

export const PartnerDetailScreen: React.FC = () => {
  const { t, partnerServices, selectedPartnerId, setCurrentView, revokeAccess, extendAccess, auditLog, language, previousView } = useFida();
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'history'>('overview');
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [extendModalOpen, setExtendModalOpen] = useState(false);

  const partner = partnerServices.find(p => p.id === selectedPartnerId);

  if (!partner) {
    return (
      <div className="p-8">
        <p className="text-[var(--fida-text-secondary)]">{t('partner.notFound')}</p>
      </div>
    );
  }

  const partnerCategories = dataCategories.filter(c => partner.categories.includes(c.id));
  const partnerHistory = auditLog.filter(log => log.partnerId === partner.id);
  
  const maxSensitivityLevel = Math.max(...partnerCategories.map(c => c.sensitivityLevel)) as 1 | 2 | 3;

  const handleBack = () => {
    // Use previousView to determine where to go back, defaulting to 'data-sharing'
    const targetView = previousView || 'data-sharing';
    setCurrentView(targetView);
  };

  const handleRevokeConfirm = () => {
    revokeAccess(partner.id);
    setRevokeModalOpen(false);
    toast.success(t('toasts.accessRevoked'));
    handleBack();
  };

  const handleExtendConfirm = (days: number) => {
    extendAccess(partner.id, days);
    toast.success(t('toasts.accessExtended'));
  };

  return (
    <div className="p-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)] mb-6 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded px-2 py-1"
      >
        <ArrowLeft size={20} />
        <span>{t('common.back')}</span>
      </button>

      {/* Header */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 mb-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{partner.logo}</div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--fida-text-primary)] mb-1">
                  {partner.name}
                </h2>
                <p className="text-[var(--fida-text-secondary)]">
                  {partner.purpose[language] || partner.purpose.de}
                </p>
              </div>
              <StatusBadge status={partner.status} label={t(`status.${partner.status}`)} />
            </div>

            {/* Enhanced Date Meta (matching Datenfreigabe style) */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-600">
                    <path d="M13 2H12V1.5C12 1.22386 11.7761 1 11.5 1C11.2239 1 11 1.22386 11 1.5V2H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M5.5 7L7 8.5L10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--fida-text-secondary)]">{t('dates.grantedAt')}</div>
                  <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                    {new Date(partner.grantedAt).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-md bg-blue-50 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-blue-600">
                    <path d="M13 2H12V1.5C12 1.22386 11.7761 1 11.5 1C11.2239 1 11 1.22386 11 1.5V2H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <circle cx="8" cy="8" r="2" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-[var(--fida-text-secondary)]">{t('dates.validUntil')}</div>
                  <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                    {new Date(partner.validUntil).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setExtendModalOpen(true)}
                className="px-5 py-2.5 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
              >
                {t('actions.extendAccess')}
              </button>
              <button
                onClick={() => setRevokeModalOpen(true)}
                className="px-5 py-2.5 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
              >
                {t('actions.revokeAccess')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden">
        <div className="border-b border-[var(--fida-divider)] flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === 'overview'
                ? 'border-[var(--fida-primary-sidebar)] text-[var(--fida-primary-sidebar)]'
                : 'border-transparent text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)]'
            }`}
          >
            {t('partner.overview')}
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === 'categories'
                ? 'border-[var(--fida-primary-sidebar)] text-[var(--fida-primary-sidebar)]'
                : 'border-transparent text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)]'
            }`}
          >
            {t('categories.title')}
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-6 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === 'history'
                ? 'border-[var(--fida-primary-sidebar)] text-[var(--fida-primary-sidebar)]'
                : 'border-transparent text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)]'
            }`}
          >
            {t('partner.history')}
          </button>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-[var(--fida-text-primary)] mb-2">
                  {t('partner.purpose')}
                </h3>
                <p className="text-[var(--fida-text-secondary)]">
                  {partner.purpose[language] || partner.purpose.de}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--fida-text-primary)] mb-2">
                  {t('partner.runtime')}
                </h3>
                <p className="text-[var(--fida-text-secondary)]">
                  {t('partner.runtimeFromTo')
                    .replace('{from}', new Date(partner.grantedAt).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US'))
                    .replace('{to}', new Date(partner.validUntil).toLocaleDateString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US'))}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-[var(--fida-text-primary)] mb-2">
                  {t('partner.summary')}
                </h3>
                <p className="text-[var(--fida-text-secondary)]">
                  {t('partner.summaryText')
                    .replace('{count}', partnerCategories.length.toString())
                    .replace('{level}', maxSensitivityLevel.toString())}
                </p>
              </div>
            </div>
          )}

          {/* Categories Tab (IN-03) */}
          {activeTab === 'categories' && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--fida-divider)]">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--fida-text-primary)]">
                        {t('partner.category')}
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--fida-text-primary)]">
                        {t('categories.description')}
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--fida-text-primary)]">
                        {t('categories.sensitivity')}
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--fida-text-primary)]">
                        {t('categories.whyShared')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {partnerCategories.map(category => (
                      <tr key={category.id} className="border-b border-[var(--fida-divider)] last:border-0">
                        <td className="py-3 px-4 text-sm font-medium text-[var(--fida-text-primary)]">
                          {category.name[language] || category.name.de}
                        </td>
                        <td className="py-3 px-4 text-sm text-[var(--fida-text-secondary)]">
                          {category.description[language] || category.description.de}
                        </td>
                        <td className="py-3 px-4">
                          <SensitivityBadge level={category.sensitivityLevel} />
                        </td>
                        <td className="py-3 px-4 text-sm text-[var(--fida-text-secondary)]">
                          {category.reason?.[language] || category.reason?.de || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* History Tab (SE-05) */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {partnerHistory.length === 0 ? (
                <p className="text-sm text-[var(--fida-text-secondary)] py-4">
                  {t('partner.noHistory')}
                </p>
              ) : (
                partnerHistory.map(entry => (
                  <div
                    key={entry.id}
                    className="p-4 bg-[var(--fida-surface-2)] rounded-md"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                        {t(`audit.actions.${entry.action}`)}
                      </div>
                      <div className="text-xs text-[var(--fida-text-secondary)]">
                        {new Date(entry.timestamp).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                      </div>
                    </div>
                    {entry.technicalDetails && (
                      <div className="text-xs text-[var(--fida-text-secondary)] mt-2 font-mono bg-white p-2 rounded border border-[var(--fida-divider)]">
                        {entry.technicalDetails}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ConfirmModal
        isOpen={revokeModalOpen}
        onClose={() => setRevokeModalOpen(false)}
        onConfirm={handleRevokeConfirm}
        title={t('partner.revokeTitle')}
        message={t('partner.revokeMessage').replace('{name}', partner.name)}
        confirmLabel={t('actions.revokeAccess')}
        cancelLabel={t('common.cancel')}
        level={maxSensitivityLevel}
        checkboxLabel={t('consent.confirmImpact')}
      />

      <ExtendAccessModal
        isOpen={extendModalOpen}
        onClose={() => setExtendModalOpen(false)}
        onConfirm={handleExtendConfirm}
        title={t('actions.extendAccess')}
        partnerName={partner.name}
        cancelLabel={t('common.cancel')}
        confirmLabel={t('common.save')}
      />
    </div>
  );
};