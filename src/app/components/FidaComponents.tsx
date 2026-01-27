import React from 'react';
import { cn } from '@/app/components/ui/utils';

interface SensitivityBadgeProps {
  level: 1 | 2 | 3;
  className?: string;
}

export const SensitivityBadge: React.FC<SensitivityBadgeProps> = ({ level, className }) => {
  const colors = {
    1: 'bg-blue-100 text-blue-800 border-blue-200',
    2: 'bg-amber-100 text-amber-800 border-amber-200',
    3: 'bg-red-100 text-red-800 border-red-200'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border',
        colors[level],
        className
      )}
    >
      Level {level}
    </span>
  );
};

interface StatusBadgeProps {
  status: 'active' | 'ended' | 'pending' | 'expired' | 'expiring';
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className }) => {
  const colors = {
    active: 'bg-green-100 text-green-800 border-green-200',
    ended: 'bg-gray-100 text-gray-800 border-gray-200',
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    expired: 'bg-red-100 text-red-800 border-red-200',
    expiring: 'bg-amber-100 text-amber-800 border-amber-200'
  };

  const defaultLabels = {
    active: 'Aktiv',
    ended: 'Beendet',
    pending: 'Ausstehend',
    expired: 'Abgelaufen',
    expiring: 'Läuft bald ab'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border',
        colors[status],
        className
      )}
    >
      {label || defaultLabels[status]}
    </span>
  );
};

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  variant?: 'default' | 'warning' | 'caution' | 'info';
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ 
  title, 
  children, 
  action,
  className,
  variant = 'default'
}) => {
  const variantStyles = {
    default: 'bg-white border-[var(--fida-divider)]',
    warning: 'bg-red-50 border-red-200',
    caution: 'bg-amber-50 border-amber-200',
    info: 'bg-blue-50 border-blue-200'
  };

  return (
    <div
      className={cn(
        'rounded-lg border p-6 shadow-sm',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-[var(--fida-text-primary)]">{title}</h3>
        {action && (
          <button
            onClick={action.onClick}
            className="text-sm text-[var(--fida-info)] hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] rounded px-2 py-1"
          >
            {action.label}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

interface PartnerCardProps {
  id: string;
  name: string;
  logo: string;
  purpose: string;
  status: 'active' | 'ended' | 'pending' | 'expired';
  statusLabel: string;
  grantedAt: string;
  validUntil: string;
  grantedLabel: string;
  validLabel: string;
  categories: number;
  maxSensitivityLevel?: 1 | 2 | 3;
  onViewDetails: () => void;
  onRevokeAccess: () => void;
  detailsLabel: string;
  revokeLabel: string;
}

export const PartnerCard: React.FC<PartnerCardProps> = ({
  name,
  logo,
  purpose,
  status,
  statusLabel,
  grantedAt,
  validUntil,
  grantedLabel,
  validLabel,
  categories,
  maxSensitivityLevel,
  onViewDetails,
  onRevokeAccess,
  detailsLabel,
  revokeLabel
}) => {
  return (
    <div className="bg-white rounded-lg border border-[var(--fida-divider)] p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="text-4xl">{logo}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-[var(--fida-text-primary)]">{name}</h3>
              <p className="text-sm text-[var(--fida-text-secondary)] mt-1">{purpose}</p>
            </div>
            <StatusBadge status={status} label={statusLabel} />
          </div>

          {/* Enhanced Date Meta with Icons */}
          <div className="flex items-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-green-50 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-600">
                  <path d="M13 2H12V1.5C12 1.22386 11.7761 1 11.5 1C11.2239 1 11 1.22386 11 1.5V2H5V1.5C5 1.22386 4.77614 1 4.5 1C4.22386 1 4 1.22386 4 1.5V2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M5.5 7L7 8.5L10.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-[var(--fida-text-secondary)]">{grantedLabel}</div>
                <div className="text-sm font-medium text-[var(--fida-text-primary)]">{grantedAt}</div>
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
                <div className="text-xs text-[var(--fida-text-secondary)]">{validLabel}</div>
                <div className="text-sm font-medium text-[var(--fida-text-primary)]">{validUntil}</div>
              </div>
            </div>
          </div>

          {/* Categories and Sensitivity Level */}
          <div className="flex items-center gap-3 mt-4">
            <div className="text-sm text-[var(--fida-text-secondary)]">
              {categories} Datenkategorien
            </div>
            {maxSensitivityLevel && (
              <>
                <div className="w-px h-4 bg-[var(--fida-divider)]" />
                <SensitivityBadge level={maxSensitivityLevel} />
              </>
            )}
          </div>

          {/* Actions - "Detailansicht" now OUTLINED */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={onViewDetails}
              className="flex-1 px-4 py-2 border-2 border-[var(--fida-primary-sidebar)] text-[var(--fida-primary-sidebar)] rounded-md hover:bg-[var(--fida-primary-sidebar)]/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] font-medium"
            >
              {detailsLabel}
            </button>
            <button
              onClick={onRevokeAccess}
              className="px-4 py-2 border border-[var(--fida-divider)] text-[var(--fida-text-primary)] rounded-md hover:bg-[var(--fida-surface-2)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
            >
              {revokeLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-[var(--fida-surface-2)] flex items-center justify-center mb-4 text-[var(--fida-text-secondary)]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[var(--fida-text-primary)] mb-2">{title}</h3>
      <p className="text-[var(--fida-text-secondary)] mb-6 max-w-md">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:opacity-90 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};