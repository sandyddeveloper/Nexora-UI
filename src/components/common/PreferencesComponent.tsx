"use client";

import React, { useState } from "react";
import { usePreferences, ThemeMode } from "@/context/PreferencesContext";
import { useLanguages, countryCodeToFlag } from "@/hooks/useLanguages";
import { APILanguage } from "@/services/utilitiesService";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Loader";
import {
  Globe,
  Bell,
  Sun,
  Moon,
  Laptop,
  Mail,
  Smartphone,
  Check,
  ShieldCheck,
  Search,
  Save,
  CheckCircle2,
  RefreshCw,
  Radio,
  Lock,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PreferencesComponentProps {
  compact?: boolean;
  onSaved?: () => void;
}

type PrefTab = "language" | "notifications" | "theme";

export function PreferencesComponent({ compact = false, onSaved }: PreferencesComponentProps) {
  const {
    theme,
    setTheme,
    language,
    setLanguage,
    notifications,
    toggleNotification,
    savePreferences,
    isSaving,
    lastSaved,
  } = usePreferences();

  const [activeTab, setActiveTab] = useState<PrefTab>("language");
  const { languages, search, setSearch, isLoading, isLiveApi, refetch } = useLanguages();
  const [saveToast, setSaveToast] = useState(false);

  const handleSelectLanguage = (lang: APILanguage) => {
    setLanguage({
      id: lang.id,
      name: lang.name,
      code: lang.code,
      country: lang.country,
      flag: countryCodeToFlag(lang.country),
    });
  };

  const handleSave = async () => {
    await savePreferences();
    setSaveToast(true);
    if (onSaved) onSaved();
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-4 max-w-full">
      {/* Tab Navigation Header */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("language")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
            activeTab === "language"
              ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-400 shadow-xs border border-zinc-200/80 dark:border-zinc-700"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          <span className="text-sm leading-none">{language.flag}</span>
          <span>1. Language</span>
          <span className="hidden sm:inline text-[10px] font-mono opacity-70">({language.code.toUpperCase()})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("notifications")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
            activeTab === "notifications"
              ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-400 shadow-xs border border-zinc-200/80 dark:border-zinc-700"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          <Bell className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
          <span>2. Notifications</span>
          <span className="hidden sm:inline text-[10px] font-semibold text-zinc-400">
            ({notifications.email ? "Email" : ""}{notifications.email && notifications.sms ? "+" : ""}{notifications.sms ? "SMS" : ""})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("theme")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer",
            activeTab === "theme"
              ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-400 shadow-xs border border-zinc-200/80 dark:border-zinc-700"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
          )}
        >
          <Sun className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
          <span>3. Theme</span>
          <span className="hidden sm:inline text-[10px] font-semibold capitalize opacity-70">({theme})</span>
        </button>
      </div>

      {/* Tab 1: Language with Live API Search */}
      {activeTab === "language" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in fade-in duration-150">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  Select Display Language
                </h4>
                {isLiveApi ? (
                  <Badge variant="emerald" size="sm" dot>Live Engine API</Badge>
                ) : (
                  <Badge variant="purple" size="sm">Active</Badge>
                )}
              </div>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Active: <span className="font-bold text-purple-700 dark:text-purple-400">{language.name} {language.country ? `(${language.country})` : ""} [{language.code.toUpperCase()}]</span>
              </p>
            </div>

            {/* Live Search Input connected to /api/utilities/languages/?search= */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search e.g. Tamil, English, IN, es..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/80 pl-8 pr-8 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {isLoading && (
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2">
                  <Spinner size="sm" />
                </div>
              )}
            </div>
          </div>

          {/* Grid of Languages from API */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-60 overflow-y-auto pr-1">
            {languages.map((lang) => {
              const isSelected =
                (language.id && lang.id && language.id === lang.id) ||
                (language.code.toLowerCase() === lang.code.toLowerCase() && language.country === lang.country);

              const flag = countryCodeToFlag(lang.country);

              return (
                <button
                  key={`${lang.id}-${lang.code}-${lang.country}`}
                  type="button"
                  onClick={() => handleSelectLanguage(lang)}
                  className={cn(
                    "flex items-center justify-between p-2.5 rounded-xl text-left border transition-all cursor-pointer",
                    isSelected
                      ? "bg-purple-50/80 dark:bg-purple-950/40 border-purple-600 dark:border-purple-600 ring-1 ring-purple-500/30 text-purple-900 dark:text-purple-200"
                      : "bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700/80 hover:border-purple-300 text-zinc-800 dark:text-zinc-200"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-lg leading-none shrink-0">{flag}</span>
                    <div className="truncate">
                      <div className="font-bold text-xs truncate">
                        {lang.name}
                        {lang.country && (
                          <span className="ml-1 text-[10px] font-semibold text-purple-600 dark:text-purple-400">
                            ({lang.country})
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 truncate">
                        Code: {lang.code.toUpperCase()}{lang.country ? ` • ${lang.country}` : ""}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0 ml-1" />}
                </button>
              );
            })}

            {languages.length === 0 && !isLoading && (
              <div className="col-span-full py-8 text-center text-xs text-zinc-400">
                No languages found matching &quot;{search}&quot;. Try another term.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Notifications */}
      {activeTab === "notifications" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Bell className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Delivery Channels & Alert Triggers
            </h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Configure real-time dispatch routes for incident triage, SLA notices, and security events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Email Notifications Toggle */}
            <div
              onClick={() => toggleNotification("email")}
              className={cn(
                "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3",
                notifications.email
                  ? "bg-purple-50/60 dark:bg-purple-950/30 border-purple-500 dark:border-purple-600 ring-1 ring-purple-500/20"
                  : "bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 hover:border-purple-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
                  notifications.email ? "bg-purple-600 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500"
                )}>
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Email Alerts</h5>
                  <p className="text-[10px] text-zinc-500">Digest, reports & triage</p>
                </div>
              </div>

              <div className={cn(
                "w-9 h-5 rounded-full transition-colors relative flex items-center shrink-0",
                notifications.email ? "bg-purple-600" : "bg-zinc-300 dark:bg-zinc-700"
              )}>
                <span className={cn(
                  "w-3.5 h-3.5 rounded-full bg-white transition-transform transform",
                  notifications.email ? "translate-x-4.5" : "translate-x-1"
                )} />
              </div>
            </div>

            {/* SMS Notifications Toggle */}
            <div
              onClick={() => toggleNotification("sms")}
              className={cn(
                "p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3",
                notifications.sms
                  ? "bg-purple-50/60 dark:bg-purple-950/30 border-purple-500 dark:border-purple-600 ring-1 ring-purple-500/20"
                  : "bg-zinc-50/50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 hover:border-purple-300"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-xl flex items-center justify-center shrink-0",
                  notifications.sms ? "bg-purple-600 text-white" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500"
                )}>
                  <Smartphone className="h-4 w-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">SMS Text Alerts</h5>
                  <p className="text-[10px] text-zinc-500">Urgent Sev-1 outages</p>
                </div>
              </div>

              <div className={cn(
                "w-9 h-5 rounded-full transition-colors relative flex items-center shrink-0",
                notifications.sms ? "bg-purple-600" : "bg-zinc-300 dark:bg-zinc-700"
              )}>
                <span className={cn(
                  "w-3.5 h-3.5 rounded-full bg-white transition-transform transform",
                  notifications.sms ? "translate-x-4.5" : "translate-x-1"
                )} />
              </div>
            </div>
          </div>

          {/* Sub Alert Checkboxes */}
          <div className="pt-2 space-y-2 text-xs">
            <div
              onClick={() => toggleNotification("securityAlerts")}
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/80 cursor-pointer"
            >
              <span className="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200">
                <Lock className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                Security & Multi-Factor Login Alerts
              </span>
              <input
                type="checkbox"
                checked={notifications.securityAlerts}
                onChange={() => {}}
                className="h-4 w-4 rounded text-purple-600 pointer-events-none"
              />
            </div>

            <div
              onClick={() => toggleNotification("slaBreach")}
              className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/80 cursor-pointer"
            >
              <span className="flex items-center gap-2 font-semibold text-zinc-800 dark:text-zinc-200">
                <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                SLA Escalation Warnings (&lt; 15 mins)
              </span>
              <input
                type="checkbox"
                checked={notifications.slaBreach}
                onChange={() => {}}
                className="h-4 w-4 rounded text-purple-600 pointer-events-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Theme */}
      {activeTab === "theme" && (
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 animate-in fade-in duration-150">
          <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Sun className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Theme & Aesthetic Appearance
            </h4>
            <p className="text-[11px] text-zinc-500 mt-0.5">
              Select your visual style across all dashboards, workspaces, and tables.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Light Mode Box */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={cn(
                "p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden",
                theme === "light"
                  ? "border-purple-600 ring-2 ring-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-purple-300"
              )}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Sun className="h-4 w-4" />
                </div>
                {theme === "light" && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-white text-[9px]">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                )}
              </div>
              <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Light Theme</h5>
              <p className="text-[10px] text-zinc-500 mt-0.5">Solid purple & crisp white.</p>
            </button>

            {/* Dark Mode Box */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={cn(
                "p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden",
                theme === "dark"
                  ? "border-purple-600 ring-2 ring-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-purple-300"
              )}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-950 text-purple-400">
                  <Moon className="h-4 w-4" />
                </div>
                {theme === "dark" && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-white text-[9px]">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                )}
              </div>
              <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">Dark Theme</h5>
              <p className="text-[10px] text-zinc-500 mt-0.5">Deep slate & purple neon.</p>
            </button>

            {/* System Mode Box */}
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={cn(
                "p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden",
                theme === "system"
                  ? "border-purple-600 ring-2 ring-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 shadow-xs"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-purple-300"
              )}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  <Laptop className="h-4 w-4" />
                </div>
                {theme === "system" && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-white text-[9px]">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                )}
              </div>
              <h5 className="font-bold text-xs text-zinc-900 dark:text-zinc-100">System Auto</h5>
              <p className="text-[10px] text-zinc-500 mt-0.5">Follows OS scheduler.</p>
            </button>
          </div>
        </div>
      )}

      {/* Save Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <ShieldCheck className="h-3.5 w-3.5 text-purple-600" />
          <span>
            {lastSaved ? `Synced at ${lastSaved}` : "Auto-saved to your local session & backend"}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {saveToast && (
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" /> Preferences Saved!
            </span>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={handleSave}
            isLoading={isSaving}
            className="w-full sm:w-auto text-xs"
            leftIcon={<Save className="h-3.5 w-3.5" />}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
