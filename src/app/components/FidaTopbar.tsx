import React from 'react';
import { Bell, User } from 'lucide-react';
import { useFida } from '@/app/context/FidaContext';
import { Language } from '@/app/data/translations';
import { cn } from '@/app/components/ui/utils';

interface FidaTopbarProps {
  title: string;
}

export const FidaTopbar: React.FC<FidaTopbarProps> = ({ title }) => {
  const { language, setLanguage, notifications, setCurrentView } = useFida();
  const unreadNotifications = notifications.filter(n => !n.read).length;

  const languageOptions: { code: Language; label: string }[] = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' }
  ];

  return (
    <header className="h-16 bg-white border-b border-[var(--fida-divider)] flex items-center justify-between px-8">
      {/* Page Title */}
      <div>
        <h2 className="text-[var(--fida-text-primary)]">{title}</h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-[var(--fida-surface-2)] rounded-md p-1">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              onClick={() => setLanguage(option.code)}
              className={cn(
                'px-3 py-1 text-sm rounded transition-all duration-200',
                'hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]',
                language === option.code
                  ? 'bg-white text-[var(--fida-text-primary)] font-medium shadow-sm'
                  : 'text-[var(--fida-text-secondary)]'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setCurrentView('notifications')}
          className="relative p-2 hover:bg-[var(--fida-surface-2)] rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
        >
          <Bell size={20} className="text-[var(--fida-text-secondary)]" />
          {unreadNotifications > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--fida-warning)] rounded-full" />
          )}
        </button>

        {/* User Menu (Placeholder) */}
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--fida-surface-2)] rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]">
          <div className="w-8 h-8 bg-[var(--fida-primary-sidebar)] rounded-full flex items-center justify-center">
            <User size={16} className="text-white" />
          </div>
        </button>
      </div>
    </header>
  );
};
