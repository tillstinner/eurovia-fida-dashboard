import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { useFida } from '@/app/context/FidaContext';
import { ExportProtocolModal } from '@/app/components/FidaModals';
import { toast } from 'sonner';

export const SecurityRightsScreen: React.FC = () => {
  const { t } = useFida();

  const rights = [
    {
      title: 'Auskunftsrecht',
      description: 'Sie haben das Recht, Auskunft über Ihre gespeicherten personenbezogenen Daten zu erhalten.'
    },
    {
      title: 'Recht auf Berichtigung',
      description: 'Sie haben das Recht, unrichtige personenbezogene Daten berichtigen zu lassen.'
    },
    {
      title: 'Recht auf Löschung',
      description: 'Sie haben das Recht, die Löschung Ihrer personenbezogenen Daten zu verlangen.'
    },
    {
      title: 'Recht auf Einschränkung der Verarbeitung',
      description: 'Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.'
    },
    {
      title: 'Recht auf Datenübertragbarkeit',
      description: 'Sie haben das Recht, Ihre Daten in einem strukturierten, gängigen Format zu erhalten.'
    },
    {
      title: 'Widerspruchsrecht',
      description: 'Sie haben das Recht, der Verarbeitung Ihrer personenbezogenen Daten zu widersprechen.'
    }
  ];

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
          {t('security.privacyRights')}
        </h3>
        <p className="text-[var(--fida-text-secondary)] mb-6">
          Nach FiDA (Financial Data Access) und der DSGVO (Datenschutz-Grundverordnung) stehen Ihnen folgende Rechte zu:
        </p>

        <div className="space-y-4">
          {rights.map((right, index) => (
            <div key={index} className="p-4 bg-[var(--fida-surface-2)] rounded-md">
              <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
                {right.title}
              </h4>
              <p className="text-sm text-[var(--fida-text-secondary)]">
                {right.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const SecurityContactScreen: React.FC = () => {
  const { t } = useFida();

  return (
    <div className="p-8">
      <div className="grid gap-6">
        <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm">
          <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
            {t('security.dpo')}
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Name:</span> Dr. Maria Schneider
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">E-Mail:</span> datenschutz@mock-bank.de
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Telefon:</span> +49 (0) 123 456 789
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Adresse:</span> Musterstraße 1, 12345 Musterstadt
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm">
          <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
            {t('security.complaints')}
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-[var(--fida-surface-2)] rounded-md">
              <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
                Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI)
              </h4>
              <div className="space-y-1 text-sm text-[var(--fida-text-secondary)]">
                <p>Graurheindorfer Str. 153, 53117 Bonn</p>
                <p>Telefon: +49 (0)228 997799-0</p>
                <p>E-Mail: poststelle@bfdi.bund.de</p>
              </div>
            </div>

            <div className="p-4 bg-[var(--fida-surface-2)] rounded-md">
              <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
                Landesdatenschutzbehörde
              </h4>
              <p className="text-sm text-[var(--fida-text-secondary)]">
                Je nach Bundesland steht Ihnen auch Ihre zuständige Landesdatenschutzbehörde zur Verfügung.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecurityTransferScreen: React.FC = () => {
  const { t } = useFida();

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm">
        <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
          {t('security.dataTransferInfo')}
        </h3>
        
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md mb-6">
          <p className="text-sm text-blue-900">
            {t('security.noDataWithoutConsent')}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
              Rechtsgrundlage
            </h4>
            <p className="text-sm text-[var(--fida-text-secondary)]">
              Die Weitergabe Ihrer Daten erfolgt ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und den Vorgaben der FiDA-Verordnung.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
              Ihre Kontrolle
            </h4>
            <p className="text-sm text-[var(--fida-text-secondary)]">
              Sie können jederzeit:
            </p>
            <ul className="list-disc list-inside text-sm text-[var(--fida-text-secondary)] mt-2 space-y-1 ml-4">
              <li>Einsehen, welche Daten geteilt werden</li>
              <li>Zugriffsrechte entziehen</li>
              <li>Zugriffsrechte zeitlich begrenzen</li>
              <li>Ihre Einwilligung widerrufen</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
              Datensicherheit
            </h4>
            <p className="text-sm text-[var(--fida-text-secondary)]">
              Alle Datenübertragungen erfolgen verschlüsselt über sichere Verbindungen. Wir setzen modernste Sicherheitsstandards ein, um Ihre Daten zu schützen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SecurityExportScreen: React.FC = () => {
  const { t, exportPDF } = useFida();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExportConfirm = (options: { period: string; content: string }) => {
    console.log('Exporting with options:', options);
    exportPDF();
    toast.success(t('toasts.reportCreated'));
    setIsModalOpen(false);
  };

  return (
    <div className="p-8">
      <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm">
        <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
          Export / Report
        </h3>
        
        <p className="text-[var(--fida-text-secondary)] mb-6">
          Laden Sie einen vollständigen Bericht über Ihre aktiven Datenfreigaben, Zugriffshistorie und Einwilligungen herunter.
        </p>

        <div className="p-4 bg-[var(--fida-surface-2)] rounded-md mb-6">
          <h4 className="font-semibold text-[var(--fida-text-primary)] mb-2">
            Der Report enthält:
          </h4>
          <ul className="list-disc list-inside text-sm text-[var(--fida-text-secondary)] space-y-1 ml-4">
            <li>Übersicht aller aktiven Partnerdienste</li>
            <li>Erteilte Einwilligungen mit Zeitstempeln</li>
            <li>Freigegebene Datenkategorien</li>
            <li>Vollständige Zugriffshistorie</li>
            <li>Gültigkeitsdauern und Ablaufdaten</li>
            <li>Sicherheitsrelevante Ereignisse</li>
          </ul>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
        >
          <Download size={20} />
          PDF-Report herunterladen
        </button>

        <p className="text-xs text-[var(--fida-text-secondary)] mt-4">
          Der Report wird als PDF-Datei erstellt und enthält alle Ihre Daten zum Zeitpunkt des Exports.
        </p>
      </div>

      <ExportProtocolModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={handleExportConfirm}
      />
    </div>
  );
};