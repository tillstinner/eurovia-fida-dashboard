import React, { useState } from 'react';
import { useFida } from '@/app/context/FidaContext';
import { partnerServices } from '@/app/data/mockData';

export const AccessHistoryScreen: React.FC = () => {
  const { t, auditLog, language } = useFida();
  const [selectedLog, setSelectedLog] = useState<string | null>(null);

  const selectedEntry = selectedLog ? auditLog.find(log => log.id === selectedLog) : null;

  return (
    <div className="p-8">
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
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  {t('audit.timestamp')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  {t('audit.partner')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  {t('audit.action')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  {t('audit.result')}
                </th>
                <th className="text-left py-3 px-6 text-sm font-semibold text-[var(--fida-text-primary)]">
                  {t('audit.details')}
                </th>
              </tr>
            </thead>
            <tbody>
              {auditLog.map(entry => {
                const partner = partnerServices.find(p => p.id === entry.partnerId);
                return (
                  <tr key={entry.id} className="border-b border-[var(--fida-divider)] last:border-0 hover:bg-[var(--fida-surface-2)]/50">
                    <td className="py-4 px-6 text-sm text-[var(--fida-text-secondary)]">
                      {new Date(entry.timestamp).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                    </td>
                    <td className="py-4 px-6 text-sm font-medium text-[var(--fida-text-primary)]">
                      {partner?.name || entry.partnerId}
                    </td>
                    <td className="py-4 px-6 text-sm text-[var(--fida-text-primary)]">
                      {t(`audit.actions.${entry.action}`)}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                        entry.result === 'success'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {entry.result}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedLog(entry.id)}
                        className="text-sm text-[var(--fida-info)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded px-2 py-1"
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

      {/* Detail Drawer/Modal (PB-08) */}
      {selectedEntry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedLog(null)}
          />
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 m-4 animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-4">
              {t('audit.details')}
            </h3>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-[var(--fida-text-primary)] mb-2">
                  {t('audit.plainText')}
                </h4>
                <p className="text-sm text-[var(--fida-text-secondary)] p-4 bg-[var(--fida-surface-2)] rounded-md">
                  {t('audit.summaryLine')
                    .replace('{action}', t(`audit.actions.${selectedEntry.action}`))
                    .replace('{partner}', partnerServices.find(p => p.id === selectedEntry.partnerId)?.name || selectedEntry.partnerId)
                    .replace('{date}', new Date(selectedEntry.timestamp).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US'))
                    .replace('{result}', selectedEntry.result)}
                </p>
              </div>

              {selectedEntry.technicalDetails && (
                <div>
                  <h4 className="text-sm font-semibold text-[var(--fida-text-primary)] mb-2">
                    {t('audit.technical')}
                  </h4>
                  <pre className="text-xs text-[var(--fida-text-secondary)] p-4 bg-[var(--fida-surface-2)] rounded-md overflow-x-auto font-mono border border-[var(--fida-divider)]">
                    {selectedEntry.technicalDetails}
                  </pre>
                </div>
              )}
            </div>

            <button
              onClick={() => setSelectedLog(null)}
              className="mt-6 w-full px-4 py-2.5 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
