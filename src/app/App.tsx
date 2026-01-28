import React from 'react';
import { Toaster } from 'sonner';
import { FidaProvider, useFida } from '@/app/context/FidaContext';
import { FidaSidebar } from '@/app/components/FidaSidebar';
import { FidaTopbar } from '@/app/components/FidaTopbar';
import { DashboardScreen } from '@/app/screens/DashboardScreen';
import { DataSharingScreen } from '@/app/screens/DataSharingScreen';
import { PartnerDetailScreen } from '@/app/screens/PartnerDetailScreen';
import { DataCategoriesScreen } from '@/app/screens/DataCategoriesScreen';
import { AccessHistoryScreen } from '@/app/screens/AccessHistoryScreen';
import { NotificationsScreen } from '@/app/screens/NotificationsScreen';
import { ConsentManagementScreen } from '@/app/screens/ConsentManagementScreen';
import { ContactScreen } from '@/app/screens/ContactScreen';
import {
  SecurityRightsScreen,
  SecurityContactScreen,
  SecurityTransferScreen,
  SecurityExportScreen
} from '@/app/screens/SecurityScreens';

const AppContent: React.FC = () => {
  const { currentView, t } = useFida();

  const getPageTitle = (): string => {
    switch (currentView) {
      case 'dashboard':
        return t('nav.dashboard');
      case 'data-sharing':
        return t('nav.dataSharing');
      case 'partner-detail':
        return t('actions.viewDetails');
      case 'consent-management':
        return t('nav.consentManagement');
      case 'data-categories':
        return t('nav.dataCategories');
      case 'access-history':
        return t('nav.accessHistory');
      case 'security-rights':
        return t('nav.securitySub.privacyRights');
      case 'security-contact':
        return t('nav.securitySub.contact');
      case 'security-transfer':
        return t('nav.securitySub.dataTransfer');
      case 'notifications':
        return t('dashboard.notifications');
      case 'settings':
        return t('nav.settings');
      case 'help':
        return t('nav.help');
      case 'contact':
        return t('nav.contact');
      default:
        return t('nav.dashboard');
    }
  };

  const renderScreen = () => {
    switch (currentView) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'data-sharing':
        return <DataSharingScreen />;
      case 'partner-detail':
        return <PartnerDetailScreen />;
      case 'data-categories':
        return <DataCategoriesScreen />;
      case 'access-history':
        return <AccessHistoryScreen />;
      case 'security-rights':
        return <SecurityRightsScreen />;
      case 'security-contact':
        return <SecurityContactScreen />;
      case 'security-transfer':
        return <SecurityTransferScreen />;
      case 'security-export':
        return <SecurityExportScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'consent-management':
        return <ConsentManagementScreen />;
      case 'contact':
        return <ContactScreen />;
      case 'settings':
      case 'help':
        return (
          <div className="p-8">
            <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-8 text-center">
              <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">
                {getPageTitle()}
              </h3>
              <p className="text-[var(--fida-text-secondary)]">
                Dieser Screen ist in Entwicklung.
              </p>
            </div>
          </div>
        );
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--fida-app-bg)]">
      <FidaSidebar variant="split" />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <FidaTopbar title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto">
          {renderScreen()}
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
};

export default function App() {
  return (
    <FidaProvider>
      <AppContent />
    </FidaProvider>
  );
}