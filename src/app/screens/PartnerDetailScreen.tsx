import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Info, AlertCircle, XCircle } from 'lucide-react';
import { useFida } from '@/app/context/FidaContext';
import { dataCategories, partnerServices } from '@/app/data/mockData';
import { StatusBadge, SensitivityBadge } from '@/app/components/FidaComponents';
import { ConfirmModal, ExtendAccessModal } from '@/app/components/FidaModals';
import { toast } from 'sonner';

export const PartnerDetailScreen: React.FC = () => {
  const { t, partnerServices: allPartners, selectedPartnerId, setCurrentView, revokeAccess, extendAccess, auditLog, language, previousView } = useFida();
  const [activeTab, setActiveTab] = useState<'overview' | 'categories' | 'history'>('overview');
  const [revokeModalOpen, setRevokeModalOpen] = useState(false);
  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const partner = allPartners.find(p => p.id === selectedPartnerId);

  if (!partner) {
    return (
      <div className="p-8">
        <p className="text-[var(--fida-text-secondary)]">{t('partner.notFound')}</p>
      </div>
    );
  }

  const partnerCategories = dataCategories.filter(c => partner.categories.includes(c.id));
  const partnerHistory = auditLog.filter(log => log.partnerId === partner.id);
  const selectedEntry = selectedLog ? auditLog.find(log => log.id === selectedLog) : null;
  
  const maxSensitivityLevel = Math.max(...partnerCategories.map(c => c.sensitivityLevel)) as 1 | 2 | 3;

  const handleBack = () => {
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle2 size={12} />
            {t('audit.status.success')}
          </span>
        );
      case 'info':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
            <Info size={12} />
            {t('audit.status.info')}
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-amber-100 text-amber-800">
            <AlertCircle size={12} />
            {t('audit.status.pending')}
          </span>
        );
      case 'blocked':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} />
            {t('audit.status.blocked')}
          </span>
        );
      default:
        return null;
    }
  };

  const getActivityLabel = (entry: any) => {
    if (entry.activityKey === 'dataAccess' && entry.categoryId) {
      const category = dataCategories.find(c => c.id === entry.categoryId);
      const catName = (category?.name as any)?.[language] || entry.categoryId;
      return t('audit.activities.dataAccess')
        .replace('{category}', catName)
        .replace('{level}', String(entry.level || ''));
    }
    return t(`audit.activities.${entry.activityKey}`);
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

            {/* Enhanced Date Meta */}
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

          {/* Categories Tab */}
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

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setCurrentView('access-history')}
                  className="text-sm font-medium text-[var(--fida-info)] hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded px-2"
                >
                  {t('partner.viewFullLog')}
                </button>
              </div>

              {partnerHistory.length === 0 ? (
                <p className="text-sm text-[var(--fida-text-secondary)] py-4 text-center border border-dashed border-[var(--fida-divider)] rounded-lg">
                  {t('partner.noHistory')}
                </p>
              ) : (
                <div className="bg-white rounded-lg border border-[var(--fida-divider)] overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-[var(--fida-surface-2)]">
                          <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[25%]">
                            {t('audit.timestamp')}
                          </th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[45%]">
                            {t('audit.action')}
                          </th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[20%]">
                            {t('audit.result')}
                          </th>
                          <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[10%]">
                            {t('audit.details')}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {partnerHistory.map(entry => (
                          <tr key={entry.id} className="border-b border-[var(--fida-divider)] last:border-0 hover:bg-[var(--fida-surface-2)]/50">
                            <td className="py-4 px-6 text-sm text-[var(--fida-text-secondary)] whitespace-nowrap">
                              {new Date(entry.timestamp).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                            </td>
                            <td className="py-4 px-6 text-sm text-[var(--fida-text-primary)]">
                              {getActivityLabel(entry)}
                            </td>
                            <td className="py-4 px-6">
                              {getStatusBadge(entry.status)}
                            </td>
                            <td className="py-4 px-6">
                              <button
                                onClick={() => setSelectedLog(entry.id)}
                                className="text-sm text-[var(--fida-info)] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded px-2 py-1"
                              >
                                {t('audit.view')}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Structured Detail Modal (reused from global log) */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedLog(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-[var(--fida-divider)] flex justify-between items-center bg-[var(--fida-surface-2)]">
              <h3 className="text-lg font-semibold text-[var(--fida-text-primary)]">
                {t('audit.details')}
              </h3>
              <button onClick={() => setSelectedLog(null)} className="text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)]">
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-1">
                    {t('audit.partner')}
                  </label>
                  <p className="text-sm font-medium text-[var(--fida-text-primary)]">
                    {allPartners.find(p => p.id === selectedEntry.partnerId)?.name || selectedEntry.partnerId}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-1">
                    {t('audit.detailFields.eventType')}
                  </label>
                  <p className="text-sm font-medium text-[var(--fida-text-primary)]">
                    {t(`audit.types.${selectedEntry.type}`)}
                  </p>
                </div>
                {selectedEntry.categoryId && (
                  <div>
                    <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-1">
                      {t('audit.detailFields.category')}
                    </label>
                    <p className="text-sm font-medium text-[var(--fida-text-primary)]">
                      {(dataCategories.find(c => c.id === selectedEntry.categoryId)?.name as any)?.[language] || selectedEntry.categoryId}
                    </p>
                  </div>
                )}
                {selectedEntry.level && (
                  <div>
                    <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-1">
                      {t('audit.detailFields.level')}
                    </label>
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                      selectedEntry.level === 3 ? 'bg-red-100 text-red-700' :
                      selectedEntry.level === 2 ? 'bg-orange-100 text-orange-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      Level {selectedEntry.level}
                    </span>
                  </div>
                )}
                {selectedEntry.purpose && (
                  <div className="col-span-2">
                    <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-1">
                      {t('audit.detailFields.purpose')}
                    </label>
                    <p className="text-sm text-[var(--fida-text-primary)]">
                      {(selectedEntry.purpose as any)[language]}
                    </p>
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-1">
                    {t('audit.detailFields.source')}
                  </label>
                  <p className="text-sm text-[var(--fida-text-primary)]">
                    {selectedEntry.source}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-1">
                    {t('audit.result')}
                  </label>
                  {getStatusBadge(selectedEntry.status)}
                  {selectedEntry.status === 'blocked' && selectedEntry.reason && (
                    <p className="text-xs text-red-600 mt-1 font-medium">
                      {t('audit.detailFields.reason')}: {selectedEntry.reason[language as keyof typeof selectedEntry.reason]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--fida-text-secondary)] uppercase tracking-wider mb-2">
                  {t('audit.technical')}
                </label>
                <pre className="text-xs text-[var(--fida-text-secondary)] p-4 bg-[var(--fida-surface-2)] rounded-md overflow-x-auto font-mono border border-[var(--fida-divider)]">
                  {selectedEntry.technicalDetails}
                </pre>
              </div>
            </div>

            <div className="p-6 border-t border-[var(--fida-divider)] bg-[var(--fida-surface-2)]">
              <button
                onClick={() => setSelectedLog(null)}
                className="w-full px-4 py-2.5 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

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