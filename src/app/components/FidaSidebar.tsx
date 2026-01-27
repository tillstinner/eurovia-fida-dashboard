import React, { useState } from "react";
import {
  LayoutDashboard,
  Share2,
  Shield,
  History,
  Lock,
  Settings,
  HelpCircle,
  Mail,
  ChevronDown,
  ChevronRight,
  FileText,
  Plus,
  Activity,
  Download,
  Bell,
  Search,
  PauseCircle,
  X,
} from "lucide-react";
import { useFida } from "@/app/context/FidaContext";
import { cn } from "@/app/components/ui/utils";
import { ExportProtocolModal, PauseAccessModal } from "@/app/components/FidaModals";
import { toast } from "sonner";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
  badge?: number;
  secondary?: boolean;
  hasSubmenu?: boolean;
  expanded?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active,
  onClick,
  badge,
  secondary,
  hasSubmenu,
  expanded,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 rounded-md transition-all duration-200",
        "hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]",
        active && "bg-white/15 font-medium",
        secondary && "text-sm text-white/80 hover:text-white",
      )}
    >
      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="flex-1 text-left text-white">
        {label}
      </span>
      {badge && badge > 0 && (
        <span className="px-2 py-0.5 text-xs bg-[var(--fida-warning)] text-white rounded-full">
          {badge}
        </span>
      )}
      {hasSubmenu && (
        <div className="w-4 h-4 flex items-center justify-center">
          {expanded ? (
            <ChevronDown size={16} />
          ) : (
            <ChevronRight size={16} />
          )}
        </div>
      )}
    </button>
  );
};

interface SubNavItemProps {
  label: string;
  onClick?: () => void;
  active?: boolean;
}

const SubNavItem: React.FC<SubNavItemProps> = ({
  label,
  onClick,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-2 pl-12 text-sm text-white/80 hover:text-white",
        "hover:bg-white/10 rounded-md transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]",
        active && "bg-white/10 text-white font-medium",
      )}
    >
      {label}
    </button>
  );
};

interface FidaSidebarProps {
  variant?: "full-dark" | "split";
}

export const FidaSidebar: React.FC<FidaSidebarProps> = ({
  variant = "split",
}) => {
  const { t, currentView, setCurrentView, notifications, partnerServices, setSelectedPartnerId } =
    useFida();
  const [securityExpanded, setSecurityExpanded] =
    useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);
  const [showPauseModal, setShowPauseModal] = useState(false);

  const unreadNotifications = notifications.filter(
    (n) => !n.read,
  ).length;

  const activeServices = partnerServices.filter(p => p.status === 'active');
  const totalSharedCategories = activeServices.reduce(
    (sum, service) => sum + service.categories.length,
    0
  );

  // Simple search results (first 3 active services)
  const searchResults = searchQuery.trim() !== "" 
    ? activeServices.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  const handleSearchToggle = () => {
    setSearchExpanded(!searchExpanded);
    if (searchExpanded) {
      setSearchQuery("");
    }
  };

  const handleExportProtocol = (options: { period: string; content: string }) => {
    // Mock export - just show toast
    console.log('Exporting protocol with options:', options);
    setShowExportModal(false);
    toast.success('Protokoll erfolgreich exportiert!');
  };

  const handlePauseAccess = () => {
    // Mock pause - just show toast for now
    console.log('Pausing all access');
    setShowPauseModal(false);
    toast.success('Zugriffe erfolgreich pausiert!');
  };

  const handleSearchResultClick = (partnerId: string) => {
    setSelectedPartnerId(partnerId);
    setCurrentView('partner-detail');
    setSearchQuery("");
    setSearchExpanded(false);
  };

  return (
    <aside className="w-64 h-screen flex flex-col bg-[var(--fida-primary-sidebar)] text-white overflow-hidden">
      {/* Logo / Header - Adjusted height and alignment (WD-LH-01) */}
      <div className="h-16 flex items-center px-6 border-b border-white/10 flex-shrink-0">
        <h1 className="text-xl font-semibold text-white">
          Meine Daten
        </h1>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        <div className="space-y-1">
          <NavItem
            icon={<LayoutDashboard size={20} />}
            label={t("nav.dashboard")}
            active={currentView === "dashboard"}
            onClick={() => setCurrentView("dashboard")}
          />

          <NavItem
            icon={<Share2 size={20} />}
            label={t("nav.dataSharing")}
            active={currentView === "data-sharing"}
            onClick={() => setCurrentView("data-sharing")}
          />

          <NavItem
            icon={<Shield size={20} />}
            label={t("nav.consentManagement")}
            active={currentView === "consent-management"}
            onClick={() => setCurrentView("consent-management")}
          />

          {/* Activity Log with Submenu (WD-AL-01) */}
          <NavItem
            icon={<Activity size={20} />}
            label={t("nav.accessHistory")}
            active={currentView === "access-history" || currentView === "security-export"}
            onClick={() => {
              if (currentView === "access-history") {
                setCurrentView("dashboard"); // simple toggle behavior or just keep
              } else {
                setCurrentView("access-history");
              }
            }}
            hasSubmenu
            expanded={currentView === "access-history" || currentView === "security-export"}
          />

          {(currentView === "access-history" || currentView === "security-export") && (
            <div className="space-y-1 mt-1">
              <SubNavItem
                label={t("nav.accessHistorySub.log")}
                active={currentView === "access-history"}
                onClick={() => setCurrentView("access-history")}
              />
              <SubNavItem
                label={t("nav.accessHistorySub.export")}
                active={currentView === "security-export"}
                onClick={() => setCurrentView("security-export")}
              />
            </div>
          )}

          {/* Security with Submenu (IN-01) */}
          <NavItem
            icon={<Lock size={20} />}
            label={t("nav.security")}
            active={
              currentView.startsWith("security-") && currentView !== "security-export" ||
              currentView === "data-categories"
            }
            onClick={() => {
              setSecurityExpanded(!securityExpanded);
              if (!securityExpanded) {
                setCurrentView("data-categories");
              }
            }}
            hasSubmenu
            expanded={securityExpanded}
          />

          {securityExpanded && (
            <div className="space-y-1 mt-1">
              <SubNavItem
                label={t("nav.dataCategories")}
                active={currentView === "data-categories"}
                onClick={() =>
                  setCurrentView("data-categories")
                }
              />
              <SubNavItem
                label={t("nav.securitySub.privacyRights")}
                active={currentView === "security-rights"}
                onClick={() =>
                  setCurrentView("security-rights")
                }
              />
              <SubNavItem
                label={t("nav.securitySub.dataTransfer")}
                active={currentView === "security-transfer"}
                onClick={() =>
                  setCurrentView("security-transfer")
                }
              />
              <SubNavItem
                label={t("nav.securitySub.contact")}
                active={currentView === "security-contact"}
                onClick={() =>
                  setCurrentView("security-contact")
                }
              />
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-4" />

        {/* Secondary Navigation (IN-01) */}
        <div className="space-y-1">
          <NavItem
            icon={<Settings size={18} />}
            label={t("nav.settings")}
            secondary
            onClick={() => setCurrentView("settings")}
          />

          <NavItem
            icon={<HelpCircle size={18} />}
            label={t("nav.help")}
            secondary
            onClick={() => setCurrentView("help")}
          />

          <NavItem
            icon={<Mail size={18} />}
            label={t("nav.contact")}
            secondary
            onClick={() => setCurrentView("contact")}
          />
        </div>
      </nav>

      {/* Quick Actions (WD-QA-01) - Split variant with lighter background */}
      <div
        className={cn(
          "border-t border-white/10 p-4 space-y-1",
          variant === "split" &&
            "bg-[var(--fida-sidebar-light)]",
        )}
      >
        <div className="text-xs uppercase tracking-wider text-white/60 mb-2 px-4">
          {t("quickActions.title")}
        </div>

        {/* 1. Schnellsuche */}
        {!searchExpanded ? (
          <button
            onClick={handleSearchToggle}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
          >
            <Search size={16} />
            <span>{t("quickActions.search")}</span>
          </button>
        ) : (
          <div className="px-2 py-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("quickActions.searchPlaceholder")}
                autoFocus
                className="w-full px-3 py-2 pr-8 text-sm bg-white/10 text-white placeholder:text-white/50 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)] focus:border-transparent"
              />
              <button
                onClick={handleSearchToggle}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/70 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
            
            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-2 bg-white/5 border border-white/10 rounded-md overflow-hidden">
                {searchResults.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleSearchResultClick(service.id)}
                    className="w-full px-3 py-2 text-left text-sm text-white/90 hover:bg-white/10 transition-colors flex items-center gap-2"
                  >
                    <span className="text-lg">{service.logo}</span>
                    <span>{service.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. Protokoll exportieren */}
        <button
          onClick={() => setShowExportModal(true)}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
        >
          <Download size={16} />
          <span>{t("quickActions.exportProtocol")}</span>
        </button>

        {/* 3. Zugriffe pausieren */}
        <button
          onClick={() => setShowPauseModal(true)}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
        >
          <PauseCircle size={16} />
          <span>{t("quickActions.pauseAccess")}</span>
        </button>

        {/* 4. Benachrichtigungen */}
        <button
          onClick={() => setCurrentView("notifications")}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/90 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--fida-info)]"
        >
          <Bell size={16} />
          <span>{t("quickActions.notifications")}</span>
          {unreadNotifications > 0 && (
            <span className="ml-auto px-2 py-0.5 text-xs bg-[var(--fida-warning)] text-white rounded-full">
              {unreadNotifications}
            </span>
          )}
        </button>
      </div>

      {/* Modals */}
      <ExportProtocolModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={handleExportProtocol}
      />
      <PauseAccessModal
        isOpen={showPauseModal}
        onClose={() => setShowPauseModal(false)}
        onConfirm={handlePauseAccess}
        activeServicesCount={activeServices.length}
        categoriesCount={totalSharedCategories}
      />
    </aside>
  );
};