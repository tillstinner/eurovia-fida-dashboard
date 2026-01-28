import React, { useState } from 'react';
import { Download, Info, CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { useFida } from '@/app/context/FidaContext';
import { partnerServices, dataCategories } from '@/app/data/mockData';
import { ExportProtocolModal } from '@/app/components/FidaModals';
import { toast } from 'sonner';

export const AccessHistoryScreen: React.FC = () => {
  const { t, auditLog, language, exportPDF } = useFida();
  const [selectedLog, setSelectedLog] = useState<string | null>(null);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const selectedEntry = selectedLog ? auditLog.find(log => log.id === selectedLog) : null;

  const handleExportConfirm = (options: { period: string; content: string }) => {
    console.log('Exporting with options:', options);
    exportPDF();
    toast.success(t('toasts.reportCreated'));
    setIsExportModalOpen(false);
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
    <div className="p-8 space-y-6">
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--fida-divider)]">
          <h3 className="font-semibold text-[var(--fida-text-primary)]">
            {t('audit.title')}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[var(--fida-surface-2)]">
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[20%]">
                  {t('audit.timestamp')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[15%]">
                  {t('audit.partner')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[40%]">
                  {t('audit.action')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[15%]">
                  {t('audit.result')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)] w-[10%]">
                  {t('audit.details')}
                </th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map(entry => {
                const partner = partnerServices.find(p => p.id === entry.partnerId);
                return (
                  <tr key={entry.id} className="border-b border-[var(--fida-divider)] last:border-0 hover:bg-[var(--fida-surface-2)]/50">
                    <td className="py-4 px-6 text-sm text-[var(--fida-text-secondary)] whitespace-nowrap">
                      {new Date(entry.timestamp).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-[var(--fida-text-primary)]">
                      {partner?.name || entry.partnerId}
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Export Card */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm">
        <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
          {t('export.title')}
        </h3>
        
        <p className="text-[var(--fida-text-secondary)] mb-6">
          {t('export.description')}
        </p>

        <div className="p-4 bg-[var(--fida-surface-2)] rounded-md mb-6">
          <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
            {t('export.contains')}
          </h4>
          <ul className="list-disc list-inside text-sm text-[var(--fida-text-secondary)] space-y-1 ml-4">
            <li>{t('export.items.partners')}</li>
            <li>{t('export.items.consents')}</li>
            <li>{t('export.items.categories')}</li>
            <li>{t('export.items.history')}</li>
            <li>{t('export.items.validity')}</li>
            <li>{t('export.items.security')}</li>
          </ul>
        </div>

        <button
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
        >
          <Download size={20} />
          {t('export.button')}
        </button>

        <p className="text-xs text-[var(--fida-text-secondary)] mt-4">
          {t('export.footer')}
        </p>
      </div>

      {/* Structured Detail Drawer/Modal (PB-08) */}
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
                    {partnerServices.find(p => p.id === selectedEntry.partnerId)?.name || selectedEntry.partnerId}
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

      {/* Export Modal Reuse */}
      <ExportProtocolModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        onConfirm={handleExportConfirm}
      />
    </div>
  );
};
