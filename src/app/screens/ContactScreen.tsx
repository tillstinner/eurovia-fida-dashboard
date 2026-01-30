import React from 'react';
import { useFida } from '@/app/context/FidaContext';

export const ContactScreen: React.FC = () => {
  const { t } = useFida();

  return (
    <div className="p-8">
      {/* Optional intro text */}
      <p className="text-[var(--fida-text-secondary)] mb-6">
        Hier finden Sie Ansprechpartner für Datenschutzfragen und technische Unterstützung.
      </p>

      <div className="grid gap-6">
        {/* Card 1 - Datenschutzbeauftragte:r */}
        <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm">
          <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
            {t('security.dpo')}
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Name:</span> Dr. Maria Schneider
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">E-Mail:</span>{' '}
              <a 
                href="mailto:datenschutz@mock-bank.de" 
                className="text-[var(--fida-primary-sidebar)] hover:underline"
              >
                datenschutz@mock-bank.de
              </a>
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Telefon:</span>{' '}
              <a 
                href="tel:+491234567890" 
                className="text-[var(--fida-primary-sidebar)] hover:underline"
              >
                +49 (0) 123 456 789
              </a>
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Adresse:</span> Musterstraße 1, 12345 Musterstadt
            </p>
          </div>
        </div>

        {/* Card 2 - ServiceDesk */}
        <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm">
          <h3 className="font-semibold text-[var(--fida-text-primary)] mb-4">
            Mock-Bank ServiceDesk / IT Client Service
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">E-Mail:</span>{' '}
              <a 
                href="mailto:servicedesk@mock-bank.de" 
                className="text-[var(--fida-primary-sidebar)] hover:underline"
              >
                servicedesk@mock-bank.de
              </a>
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Telefon:</span>{' '}
              <a 
                href="tel:+491234567000" 
                className="text-[var(--fida-primary-sidebar)] hover:underline"
              >
                +49 (0) 123 456 700
              </a>
            </p>
            <p className="text-[var(--fida-text-secondary)]">
              <span className="font-medium text-[var(--fida-text-primary)]">Erreichbarkeit:</span> Mo–Fr 08:00–18:00
            </p>
            <p className="text-sm text-[var(--fida-text-secondary)] mt-3 pt-3 border-t border-[var(--fida-divider)]">
              Für technische Fragen, Login-/Zugriffsprobleme und Unterstützung rund um das Dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
