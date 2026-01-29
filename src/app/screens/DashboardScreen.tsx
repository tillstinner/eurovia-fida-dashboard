import React, { useState } from "react";
import {
  Share2,
  Calendar,
  Bell,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Clock,
  Activity,
} from "lucide-react";
import { useFida } from "@/app/context/FidaContext";
import {
  DashboardCard,
  SensitivityBadge,
} from "@/app/components/FidaComponents";
import { ExtendAccessModal } from "@/app/components/FidaModals";
import { dataCategories } from "@/app/data/mockData";
import { toast } from "sonner";

export const DashboardScreen: React.FC = () => {
  const {
    t,
    partnerServices,
    notifications,
    auditLog,
    setCurrentView,
    setSelectedPartnerId,
    extendAccess,
  } = useFida();

  const [extendModalOpen, setExtendModalOpen] = useState(false);
  const [
    selectedPartnerId_extend,
    setSelectedPartnerId_extend,
  ] = useState<string | null>(null);

  const activeServices = partnerServices.filter(
    (p) => p.status === "active",
  );
  const pendingRequests = partnerServices.filter(
    (p) => p.status === "pending",
  );

  const expiringServices = partnerServices.filter((p) => {
    if (p.status !== "active") return false;
    const daysUntilExpiry = Math.ceil(
      (new Date(p.validUntil).getTime() -
        new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  });

  const unreadNotifications = notifications.filter(
    (n) => !n.read,
  );

  // Determine overall system status
  const hasUrgentActions =
    pendingRequests.length > 0 || expiringServices.length > 0;
  const statusMessage = hasUrgentActions
    ? t("dashboard.actionsRequired")
    : t("dashboard.allCurrentStatus");
  const statusDescription = hasUrgentActions
    ? t("dashboard.actionsRequiredDesc")
    : t("dashboard.allCurrentDesc");

  // Calculate shared data summary for left column
  const totalSharedCategories = activeServices.reduce(
    (sum, service) => {
      return sum + service.categories.length;
    },
    0,
  );

  const highestSensitivityLevel = activeServices.reduce(
    (max, service) => {
      const serviceMax = Math.max(
        ...service.categories.map((c) => c.sensitivityLevel),
      );
      return Math.max(max, serviceMax);
    },
    0,
  ) as 1 | 2 | 3 | 0;

  const handleExtendClick = (partnerId: string) => {
    setSelectedPartnerId_extend(partnerId);
    setExtendModalOpen(true);
  };

  const handleExtendConfirm = (days: number) => {
    if (!selectedPartnerId_extend) return;

    const partner = partnerServices.find(
      (p) => p.id === selectedPartnerId_extend,
    );
    extendAccess(selectedPartnerId_extend, days);
    toast.success(
      `Zugriff für ${partner?.name} wurde um ${days} Tage verlängert`,
    );

    setExtendModalOpen(false);
    setSelectedPartnerId_extend(null);
  };

  // Get latest 3 audit entries for preview
  const latestAuditEntries = auditLog.slice(0, 3);

  return (
    <div className="p-8 space-y-6">
      {/* LAYER 1 - FULL WIDTH: Status */}
      <DashboardCard title={t("dashboard.status")}>
        <div
          className={`p-4 rounded-lg ${
            hasUrgentActions
              ? "bg-amber-50 border border-amber-200"
              : "bg-green-50 border border-green-200"
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                hasUrgentActions
                  ? "bg-amber-100"
                  : "bg-green-100"
              }`}
            >
              {hasUrgentActions ? (
                <AlertTriangle
                  size={20}
                  className="text-amber-600"
                />
              ) : (
                <CheckCircle
                  size={20}
                  className="text-green-600"
                />
              )}
            </div>
            <div className="flex-1">
              <h3
                className={`font-semibold mb-1 ${
                  hasUrgentActions
                    ? "text-amber-900"
                    : "text-green-900"
                }`}
              >
                {statusMessage}
              </h3>
              <p
                className={`text-sm ${
                  hasUrgentActions
                    ? "text-amber-800"
                    : "text-green-800"
                }`}
              >
                {statusDescription}
              </p>
            </div>
            {hasUrgentActions && (
              <button
                onClick={() =>
                  setCurrentView(
                    pendingRequests.length > 0
                      ? "consent-management"
                      : "data-sharing",
                  )
                }
                className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm font-medium flex items-center gap-2 flex-shrink-0"
              >
                {pendingRequests.length > 0
                  ? t("dashboard.toRequest")
                  : t("dashboard.toOverview")}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </DashboardCard>

      {/* LAYER 2 - FULL WIDTH: Übersicht & Verwaltung */}
      <DashboardCard title={t("dashboard.overviewManagement")}>
        {/* NEW LAYOUT: Horizontal 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_2fr] gap-6">
          {/* LEFT COLUMN - Datenfreigaben */}
          <div>
            {/* Header aligned with right column + link */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Share2
                  size={20}
                  className="text-[var(--fida-primary-sidebar)]"
                />
                <h4 className="font-semibold text-[var(--fida-text-primary)]">
                  {t("dashboard.dataSharing")}
                </h4>
              </div>
              <button
                onClick={() => setCurrentView("data-sharing")}
                className="text-sm text-[var(--fida-info)] hover:underline flex items-center gap-1"
              >
                {t("dashboard.toOverview")}
              </button>
            </div>

            {/* Content section - Summary lines with right-aligned values in a compact container (WD-MA-01) */}
            <div className="pl-[32px] space-y-3 max-w-[320px]">
              {/* Active partner services count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--fida-text-secondary)]">
                  {t("dashboard.activePartnerServicesLabel")}
                </span>
                <span className="text-lg font-semibold text-[var(--fida-text-primary)]">
                  {activeServices.length}
                </span>
              </div>

              {/* Shared categories count */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--fida-text-secondary)]">
                  {t("dashboard.currentActiveSharing")}
                </span>
                <span className="text-sm font-semibold text-[var(--fida-text-primary)]">
                  {totalSharedCategories} {t("dashboard.categories")}
                </span>
              </div>

              {/* Highest sensitivity level - STATIC PLACEHOLDER LEVEL 3 */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--fida-text-secondary)]">
                  {t("dashboard.highestLevel")}
                </span>
                <SensitivityBadge level={3} />
              </div>
            </div>
          </div>

          {/* VERTICAL DIVIDER */}
          <div className="hidden lg:block w-px bg-[var(--fida-divider)] self-stretch"></div>

          {/* RIGHT COLUMN - Consent-Management (2-column sub-grid) */}
          <div>
            {/* Header + link */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Clock
                  size={20}
                  className="text-[var(--fida-primary-sidebar)]"
                />
                <h4 className="font-semibold text-[var(--fida-text-primary)]">
                  {t("dashboard.consentManagement")}
                </h4>
              </div>
              <button
                onClick={() =>
                  setCurrentView("consent-management")
                }
                className="text-sm text-[var(--fida-info)] hover:underline flex items-center gap-1"
              >
                {t("dashboard.toOverview")}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* B1) Bald ablaufende Freigaben */}
              <div className="p-4 bg-[var(--fida-surface-2)] rounded-lg">
                <h5 className="text-sm font-medium text-[var(--fida-text-primary)] mb-3">
                  {t("dashboard.expiringShares")}
                </h5>
                {expiringServices.length === 0 ? (
                  <p className="text-sm text-[var(--fida-text-secondary)]">
                    {t("dashboard.noExpiring")}
                  </p>
                ) : (
                  <div className="space-y-2">
                    {expiringServices
                      .slice(0, 2)
                      .map((service) => {
                        const daysLeft = Math.ceil(
                          (new Date(
                            service.validUntil,
                          ).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24),
                        );
                        return (
                          <div
                            key={service.id}
                            className="flex items-center justify-between p-3 bg-white border border-amber-200 rounded-md"
                          >
                            <div className="flex items-center gap-2 flex-1">
                              <span className="text-lg">
                                {service.logo}
                              </span>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                                  {service.name}
                                </div>
                                <div className="text-xs text-amber-800">
                                  {t("dates.validUntil")}{" "}
                                  {new Date(
                                    service.validUntil,
                                  ).toLocaleDateString(
                                    t("language") === "de"
                                      ? "de-DE"
                                      : t("language") === "fr"
                                        ? "fr-FR"
                                        : "en-US",
                                  )}{" "}
                                  ({daysLeft}{" "}
                                  {t("dashboard.days")})
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() =>
                                handleExtendClick(service.id)
                              }
                              className="px-3 py-1.5 text-xs bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:bg-[var(--fida-primary-sidebar)]/90 transition-colors whitespace-nowrap ml-2"
                            >
                              {t("actions.extendAccess")}
                            </button>
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>

              {/* B2) Offene Zugriffsanfragen */}
              <div className="p-4 bg-[var(--fida-surface-2)] rounded-lg">
                <h5 className="text-sm font-medium text-[var(--fida-text-primary)] mb-3">
                  {t("dashboard.openRequests")}
                </h5>
                {pendingRequests.length === 0 ? (
                  <p className="text-sm text-[var(--fida-text-secondary)]">
                    {t("dashboard.noOpenRequests")}
                  </p>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-blue-600">
                          {pendingRequests.length}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                          {pendingRequests.length === 1
                            ? t("dashboard.newRequest")
                            : t("dashboard.newRequests")}
                        </div>
                        {pendingRequests.length === 1 && (
                          <div className="text-xs text-[var(--fida-text-secondary)]">
                            {t("dashboard.from")}{" "}
                            {pendingRequests[0].name}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setCurrentView("consent-management")
                      }
                      className="w-full px-4 py-2 bg-[var(--fida-primary-sidebar)] text-white rounded-md hover:bg-[var(--fida-primary-sidebar)]/90 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      {t("dashboard.toRequest")}
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DashboardCard>

      {/* LAYER 3 - TWO HALF-WIDTH CARDS */}
      <div className="grid grid-cols-2 gap-6">
        {/* LEFT: Benachrichtigungen */}
        <DashboardCard
          title={t("dashboard.notifications")}
          action={
            unreadNotifications.length > 0
              ? {
                  label: t("dashboard.toOverview"),
                  onClick: () =>
                    setCurrentView("notifications"),
                }
              : undefined
          }
        >
          {unreadNotifications.length === 0 ? (
            <div className="text-sm text-[var(--fida-text-secondary)] py-4">
              {t("dashboard.noOpenRequests")}
            </div>
          ) : (
            <div className="space-y-2">
              {unreadNotifications.slice(0, 2).map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start gap-3 p-3 bg-[var(--fida-surface-2)] rounded-md hover:bg-[var(--fida-surface-2)]/70 transition-colors cursor-pointer"
                  onClick={() =>
                    setCurrentView("notifications")
                  }
                >
                  <Bell
                    size={16}
                    className="text-[var(--fida-info)] flex-shrink-0 mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--fida-text-primary)]">
                      {notif.title[
                        t("language") as "de" | "en" | "fr"
                      ] || notif.title.de}
                    </div>
                    <div className="text-xs text-[var(--fida-text-secondary)] mt-1 line-clamp-1">
                      {notif.message[
                        t("language") as "de" | "en" | "fr"
                      ] || notif.message.de}
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[var(--fida-info)] flex-shrink-0 mt-1.5" />
                </div>
              ))}
            </div>
          )}
        </DashboardCard>

        {/* RIGHT: Aktivitätsprotokoll */}
        <DashboardCard
          title={t("dashboard.activityLog")}
          action={{
            label: t("dashboard.toFullLog"),
            onClick: () => setCurrentView("access-history"),
          }}
        >
          {latestAuditEntries.length === 0 ? (
            <div className="text-sm text-[var(--fida-text-secondary)] py-4">
              {t("dashboard.noActivity")}
            </div>
          ) : (
            <div className="space-y-2">
              {latestAuditEntries.map((entry) => {
                const partner = partnerServices.find(
                  (p) => p.id === entry.partnerId,
                );

                // Helper to get activity label (copied from AccessHistoryScreen logic)
                const getActivityLabel = (entry: any) => {
                  if (
                    entry.activityKey === "dataAccess" &&
                    entry.categoryId
                  ) {
                    const category = dataCategories.find(
                      (c) => c.id === entry.categoryId,
                    );
                    const catName =
                      (category?.name as any)?.[t("language")] ||
                      entry.categoryId;
                    return t("audit.activities.dataAccess")
                      .replace("{category}", catName)
                      .replace("{level}", String(entry.level || ""));
                  }
                  // Fallback to localized activity key, then a generic label if missing
                  const label = t(`audit.activities.${entry.activityKey}`);
                  return label.includes("audit.activities")
                    ? t("audit.action")
                    : label;
                };

                return (
                  <div
                    key={entry.id}
                    className="p-3 bg-[var(--fida-surface-2)] rounded-md hover:bg-[var(--fida-surface-2)]/70 transition-colors cursor-pointer"
                    onClick={() =>
                      setCurrentView("access-history")
                    }
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-[var(--fida-text-primary)] mb-0.5">
                          {getActivityLabel(entry)}
                        </div>
                        <div className="text-xs text-[var(--fida-text-secondary)]">
                          {partner?.name || "System"}
                        </div>
                      </div>
                      <div className="text-xs text-[var(--fida-text-secondary)] flex items-center gap-1 flex-shrink-0">
                        {new Date(
                          entry.timestamp,
                        ).toLocaleDateString(
                          t("language") === "de"
                            ? "de-DE"
                            : t("language") === "fr"
                              ? "fr-FR"
                              : "en-US",
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </DashboardCard>
      </div>

      {/* Extend Access Modal */}
      {selectedPartnerId_extend && (
        <ExtendAccessModal
          isOpen={extendModalOpen}
          onClose={() => {
            setExtendModalOpen(false);
            setSelectedPartnerId_extend(null);
          }}
          onConfirm={handleExtendConfirm}
          partnerName={
            partnerServices.find(
              (p) => p.id === selectedPartnerId_extend,
            )?.name
          }
        />
      )}
    </div>
  );
};