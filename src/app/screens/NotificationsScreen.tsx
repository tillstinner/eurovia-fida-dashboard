import React from 'react';
import { Bell, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { useFida } from '@/app/context/FidaContext';
import { systemMessageTypes } from '@/app/data/mockData';

export const NotificationsScreen: React.FC = () => {
  const { t, notifications, markNotificationRead, language } = useFida();

  const getIcon = (criticality: 'info' | 'caution' | 'warning') => {
    switch (criticality) {
      case 'warning':
        return <AlertTriangle size={20} className="text-red-600" />;
      case 'caution':
        return <AlertCircle size={20} className="text-amber-600" />;
      case 'info':
      default:
        return <Info size={20} className="text-blue-600" />;
    }
  };

  const getBgColor = (criticality: 'info' | 'caution' | 'warning') => {
    switch (criticality) {
      case 'warning':
        return 'bg-red-50 border-red-200';
      case 'caution':
        return 'bg-amber-50 border-amber-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="p-8">
      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-[var(--fida-divider)]">
          <h3 className="font-semibold text-[var(--fida-text-primary)]">
            {t('dashboard.notifications')}
          </h3>
        </div>

        <div className="divide-y divide-[var(--fida-divider)]">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-[var(--fida-text-secondary)]">
              Keine Benachrichtigungen
            </div>
          ) : (
            notifications.map(notif => (
              <div
                key={notif.id}
                className={`p-6 hover:bg-[var(--fida-surface-2)]/50 transition-colors ${
                  !notif.read ? 'bg-blue-50/30' : ''
                }`}
                onClick={() => {
                  if (!notif.read) {
                    markNotificationRead(notif.id);
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg border ${getBgColor(notif.criticality)}`}>
                    {getIcon(notif.criticality)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold text-[var(--fida-text-primary)]">
                        {notif.title[language] || notif.title.de}
                      </h4>
                      {!notif.read && (
                        <div className="w-2 h-2 rounded-full bg-[var(--fida-info)] flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-sm text-[var(--fida-text-secondary)] mb-2">
                      {notif.message[language] || notif.message.de}
                    </p>
                    <div className="text-xs text-[var(--fida-text-secondary)]">
                      {new Date(notif.timestamp).toLocaleString(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'en-US')}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Possible System Messages (IN-04) */}
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[var(--fida-divider)]">
          <h3 className="font-semibold text-[var(--fida-text-primary)]">
            Mögliche Systemmeldungen + Kritikalität
          </h3>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {systemMessageTypes.map((msgType, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${getBgColor(msgType.criticality)}`}
              >
                <div className="flex items-start gap-3">
                  {getIcon(msgType.criticality)}
                  <div>
                    <div className="text-sm font-medium text-[var(--fida-text-primary)] mb-1">
                      {msgType.examples[language] || msgType.examples.de}
                    </div>
                    <div className="text-xs text-[var(--fida-text-secondary)]">
                      Kritikalität: <span className="font-medium capitalize">{msgType.criticality}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
