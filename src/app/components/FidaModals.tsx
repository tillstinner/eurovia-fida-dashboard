import React, { useState } from 'react';
import { X, AlertTriangle, Shield, CheckCircle2, Download, PauseCircle } from 'lucide-react';
import { cn } from '@/app/components/ui/utils';
import { Checkbox } from '@/app/components/ui/checkbox';
import { SensitivityBadge } from '@/app/components/FidaComponents';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  level: 1 | 2 | 3; // Sensitivity level
  checkboxLabel?: string;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel,
  cancelLabel,
  level,
  checkboxLabel
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const requiresTwoStep = level === 2 || level === 3;

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (requiresTwoStep && !confirmed) return;
    onConfirm();
    setConfirmed(false);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
          <AlertTriangle size={24} className="text-amber-600" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">
          {title}
        </h3>

        {/* Message */}
        <p className="text-[var(--fida-text-secondary)] mb-6">
          {message}
        </p>

        {/* Two-Step Confirmation (UX-03) */}
        {requiresTwoStep && checkboxLabel && (
          <div className="mb-6 p-4 bg-[var(--fida-surface-2)] rounded-md">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                className="mt-0.5"
              />
              <span className="text-sm text-[var(--fida-text-primary)]">
                {checkboxLabel}
              </span>
            </label>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={requiresTwoStep && !confirmed}
            className={cn(
              'flex-1 px-4 py-2.5 bg-[var(--fida-warning)] text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
              requiresTwoStep && !confirmed
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:opacity-90'
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ExtendAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (days: number) => void;
  title?: string;
  partnerName?: string;
  cancelLabel?: string;
  confirmLabel?: string;
}

export const ExtendAccessModal: React.FC<ExtendAccessModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  partnerName,
  cancelLabel = "Abbrechen",
  confirmLabel = "Speichern"
}) => {
  const [days, setDays] = useState(90);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(days);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">
          {title || "Zugriff verlängern"}
        </h3>
        
        {/* Partner Name */}
        {partnerName && (
          <p className="text-sm text-[var(--fida-text-secondary)] mb-4">
            Für: <strong>{partnerName}</strong>
          </p>
        )}

        {/* Days Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--fida-text-primary)] mb-2">
            Verlängerung um
          </label>
          <div className="flex gap-2">
            {[30, 60, 90, 180].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={cn(
                  'flex-1 px-4 py-2 rounded-md border transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
                  days === d
                    ? 'bg-[var(--fida-primary-sidebar)] text-white border-[var(--fida-primary-sidebar)]'
                    : 'border-[var(--fida-divider)] text-[var(--fida-text-primary)] hover:bg-[var(--fida-surface-2)]'
                )}
              >
                {d} Tage
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

interface AllowConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  partnerName: string;
  categoryCount: number;
  level: 1 | 2 | 3;
  confirmLabel: string;
  cancelLabel: string;
  checkboxLabel: string;
}

export const AllowConsentModal: React.FC<AllowConsentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  partnerName,
  categoryCount,
  level,
  confirmLabel,
  cancelLabel,
  checkboxLabel
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const requiresTwoStep = level === 2 || level === 3;

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (requiresTwoStep && !confirmed) return;
    onConfirm();
    setConfirmed(false);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Shield size={24} className="text-blue-600" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">
          Zugriff erlauben?
        </h3>

        {/* Message */}
        <div className="mb-6 space-y-3">
          <p className="text-[var(--fida-text-secondary)]">
            Sie sind dabei, <strong>{partnerName}</strong> Zugriff auf Ihre Bankdaten zu gewähren.
          </p>
          
          <div className="p-3 bg-[var(--fida-surface-2)] rounded-md space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[var(--fida-text-secondary)]">Datenkategorien:</span>
              <span className="font-medium text-[var(--fida-text-primary)]">{categoryCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--fida-text-secondary)]">Sensitivitätslevel:</span>
              <SensitivityBadge level={level} />
            </div>
          </div>
        </div>

        {/* Two-Step Confirmation (UX-03) */}
        {requiresTwoStep && (
          <div className="mb-6 p-4 bg-[var(--fida-surface-2)] rounded-md">
            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={confirmed}
                onCheckedChange={(checked) => setConfirmed(checked as boolean)}
                className="mt-0.5"
              />
              <span className="text-sm text-[var(--fida-text-primary)]">
                {checkboxLabel}
              </span>
            </label>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={requiresTwoStep && !confirmed}
            className={cn(
              'flex-1 px-4 py-2.5 bg-[var(--fida-primary-sidebar)] text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
              requiresTwoStep && !confirmed
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:opacity-90'
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

interface DenyConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  partnerName: string;
  confirmLabel: string;
  cancelLabel: string;
  checkboxLabel: string;
}

export const DenyConsentModal: React.FC<DenyConsentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  partnerName,
  confirmLabel,
  cancelLabel,
  checkboxLabel
}) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!confirmed) return;
    onConfirm();
    setConfirmed(false);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <X size={24} className="text-red-600" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">
          Zugriff ablehnen?
        </h3>

        {/* Message */}
        <p className="text-[var(--fida-text-secondary)] mb-6">
          Möchten Sie die Zugriffsanfrage von <strong>{partnerName}</strong> wirklich ablehnen? 
          Der Partnerdienst wird keinen Zugriff auf Ihre Daten erhalten.
        </p>

        {/* Confirmation Checkbox */}
        <div className="mb-6 p-4 bg-[var(--fida-surface-2)] rounded-md">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              className="mt-0.5"
            />
            <span className="text-sm text-[var(--fida-text-primary)]">
              {checkboxLabel}
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={!confirmed}
            className={cn(
              'flex-1 px-4 py-2.5 bg-[var(--fida-danger)] text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
              !confirmed
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:opacity-90'
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

interface ExportProtocolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (options: { period: string; content: string }) => void;
}

export const ExportProtocolModal: React.FC<ExportProtocolModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  const [period, setPeriod] = useState('30');
  const [content, setContent] = useState('all');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm({ period, content });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded"
        >
          <X size={20} />
        </button>

        {/* Icon */}
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Download size={24} className="text-blue-600" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">
          Protokoll exportieren
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--fida-text-secondary)] mb-6">
          Exportiert eine Übersicht Ihrer Aktivitäten (PDF).
        </p>

        {/* Period Selector */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[var(--fida-text-primary)] mb-2">
            Zeitraum
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: '7', label: 'Letzte 7 Tage' },
              { value: '30', label: 'Letzte 30 Tage' },
              { value: '90', label: 'Letzte 90 Tage' },
              { value: 'all', label: 'Gesamter Verlauf' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setPeriod(option.value)}
                className={cn(
                  'px-3 py-2 text-sm rounded-md border transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
                  period === option.value
                    ? 'bg-[var(--fida-primary-sidebar)] text-white border-[var(--fida-primary-sidebar)]'
                    : 'border-[var(--fida-divider)] text-[var(--fida-text-primary)] hover:bg-[var(--fida-surface-2)]'
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-[var(--fida-text-primary)] mb-2">
            Inhalt
          </label>
          <div className="space-y-2">
            <button
              onClick={() => setContent('activity')}
              className={cn(
                'w-full px-3 py-2 text-sm text-left rounded-md border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
                content === 'activity'
                  ? 'bg-[var(--fida-primary-sidebar)] text-white border-[var(--fida-primary-sidebar)]'
                  : 'border-[var(--fida-divider)] text-[var(--fida-text-primary)] hover:bg-[var(--fida-surface-2)]'
              )}
            >
              Nur Aktivitätsprotokoll
            </button>
            <button
              onClick={() => setContent('all')}
              className={cn(
                'w-full px-3 py-2 text-sm text-left rounded-md border transition-all duration-200',
                'focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
                content === 'all'
                  ? 'bg-[var(--fida-primary-sidebar)] text-white border-[var(--fida-primary-sidebar)]'
                  : 'border-[var(--fida-divider)] text-[var(--fida-text-primary)] hover:bg-[var(--fida-surface-2)]'
              )}
            >
              Alles (Übersicht + Protokoll)
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            Abbrechen
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 px-4 py-2.5 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            PDF erstellen
          </button>
        </div>
      </div>
    </div>
  );
};

interface PauseAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  activeServicesCount: number;
  categoriesCount: number;
}

export const PauseAccessModal: React.FC<PauseAccessModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  activeServicesCount,
  categoriesCount
}) => {
  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!confirmed) return;
    onConfirm();
    setConfirmed(false);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-xl p-6 m-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1 text-[var(--fida-text-secondary)] hover:text-[var(--fida-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded"
        >
          <X size={20} />
        </button>

        {/* Icon - Light Red */}
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <PauseCircle size={24} className="text-red-600" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">
          Zugriffe pausieren?
        </h3>

        {/* Warning Message */}
        <p className="text-[var(--fida-text-secondary)] mb-4">
          Alle aktiven Datenfreigaben werden temporär pausiert. Partnerdienste verlieren den Zugriff, bis Sie die Freigaben wieder aktivieren.
        </p>

        {/* Impact Summary - Light Red */}
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-red-900">Betroffen:</span>
            <span className="font-semibold text-red-900">
              {activeServicesCount} Partnerdienste
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-red-900">Aktuell geteilte Daten:</span>
            <span className="font-semibold text-red-900">
              {categoriesCount} Kategorien
            </span>
          </div>
        </div>

        {/* Confirmation Checkbox */}
        <div className="mb-6 p-4 bg-[var(--fida-surface-2)] rounded-md">
          <label className="flex items-start gap-3 cursor-pointer">
            <Checkbox
              checked={confirmed}
              onCheckedChange={(checked) => setConfirmed(checked as boolean)}
              className="mt-0.5"
            />
            <span className="text-sm text-[var(--fida-text-primary)]">
              Ich bestätige, dass ich die Auswirkungen verstanden habe
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleClose}
            className="flex-1 px-4 py-2.5 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            Abbrechen
          </button>
          <button
            onClick={handleConfirm}
            disabled={!confirmed}
            className={cn(
              'flex-1 px-4 py-2.5 bg-[var(--fida-warning)] text-white rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
              !confirmed
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:opacity-90'
            )}
          >
            Jetzt pausieren
          </button>
        </div>
      </div>
    </div>
  );
};