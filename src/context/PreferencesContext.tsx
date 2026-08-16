"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { utilitiesService, APILanguage } from "@/services/utilitiesService";
import { countryCodeToFlag } from "@/hooks/useLanguages";

export type ThemeMode = "light" | "dark" | "system";

export interface SelectedLanguage {
  id?: number;
  code: string;
  name: string;
  country: string | null;
  flag: string;
}

export const DEFAULT_LANGUAGE: SelectedLanguage = {
  id: 1,
  code: "en",
  name: "English",
  country: "US",
  flag: "🇺🇸",
};

export interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  securityAlerts: boolean;
  slaBreach: boolean;
  weeklyDigest: boolean;
}

interface PreferencesContextType {
  // 1. Theme
  theme: ThemeMode;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;

  // 2. Language
  language: SelectedLanguage;
  setLanguage: (lang: SelectedLanguage | APILanguage | string) => void;

  // 3. Notifications
  notifications: NotificationPreferences;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationPreferences>>;
  toggleNotification: (key: keyof NotificationPreferences) => void;

  // General Save
  savePreferences: () => Promise<void>;
  isSaving: boolean;
  lastSaved: string | null;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  // 1. Theme State
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // 2. Language State
  const [language, setLanguageState] = useState<SelectedLanguage>(DEFAULT_LANGUAGE);

  // 3. Notification State
  const [notifications, setNotifications] = useState<NotificationPreferences>({
    email: true,
    sms: false,
    securityAlerts: true,
    slaBreach: true,
    weeklyDigest: false,
  });

  const [mounted, setMounted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Initialize from LocalStorage & Backend API
  useEffect(() => {
    try {
      // Theme
      const savedTheme = localStorage.getItem("nexora-theme") as ThemeMode | null;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system")) {
        setThemeState(savedTheme);
      }

      // Language
      const savedLang = localStorage.getItem("nexora-language-object");
      if (savedLang) {
        setLanguageState(JSON.parse(savedLang));
      } else {
        const savedCode = localStorage.getItem("nexora-language");
        if (savedCode) {
          setLanguageState({
            code: savedCode,
            name: savedCode.toUpperCase(),
            country: null,
            flag: "🌐",
          });
        }
      }

      // Notifications
      const savedNotifs = localStorage.getItem("nexora-notifications");
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      }
    } catch {}

    // Async fetch preferences from backend API if available
    const syncFromBackend = async () => {
      try {
        const pref = await utilitiesService.getUserPreferences();
        if (pref) {
          if (pref.theme) setThemeState(pref.theme);
          if (pref.language) {
            setLanguageState({
              id: pref.language.id,
              name: pref.language.name,
              code: pref.language.code,
              country: pref.language.country,
              flag: countryCodeToFlag(pref.language.country),
            });
          }
          if (pref.email_notifications !== undefined || pref.sms_notifications !== undefined) {
            setNotifications((prev) => ({
              ...prev,
              email: pref.email_notifications ?? prev.email,
              sms: pref.sms_notifications ?? prev.sms,
            }));
          }
        }
      } catch {
        // Backend not logged in or offline -> local persistence remains active
      }
    };

    syncFromBackend();
    setMounted(true);
  }, []);

  // Synchronize Theme class on HTML
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    let effective: "light" | "dark" = "light";

    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      effective = prefersDark ? "dark" : "light";
    } else {
      effective = theme;
    }

    setResolvedTheme(effective);

    if (effective === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem("nexora-theme", theme);
    } catch {}
  }, [theme, mounted]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    setThemeState((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "light";
      return resolvedTheme === "dark" ? "light" : "dark";
    });
  };

  const setLanguage = (lang: SelectedLanguage | APILanguage | string) => {
    if (typeof lang === "string") {
      const newLang: SelectedLanguage = {
        code: lang.toLowerCase(),
        name: lang,
        country: null,
        flag: "🌐",
      };
      setLanguageState(newLang);
      try {
        localStorage.setItem("nexora-language", newLang.code);
        localStorage.setItem("nexora-language-object", JSON.stringify(newLang));
      } catch {}
    } else {
      const newLang: SelectedLanguage = {
        id: lang.id,
        code: lang.code,
        name: lang.name,
        country: lang.country,
        flag: "flag" in lang ? lang.flag : countryCodeToFlag(lang.country),
      };
      setLanguageState(newLang);
      try {
        localStorage.setItem("nexora-language", newLang.code);
        localStorage.setItem("nexora-language-object", JSON.stringify(newLang));
      } catch {}
    }
  };

  const toggleNotification = (key: keyof NotificationPreferences) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("nexora-notifications", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem("nexora-theme", theme);
      localStorage.setItem("nexora-language", language.code);
      localStorage.setItem("nexora-language-object", JSON.stringify(language));
      localStorage.setItem("nexora-notifications", JSON.stringify(notifications));

      // Attempt to sync with backend API
      try {
        await utilitiesService.saveUserPreferences({
          theme,
          language_id: language.id,
          language_code: language.code,
          email_notifications: notifications.email,
          sms_notifications: notifications.sms,
        });
      } catch {
        // Fallback succeeds locally
      }

      setLastSaved(new Date().toLocaleTimeString());
    } finally {
      setTimeout(() => setIsSaving(false), 400);
    }
  };

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        notifications,
        setNotifications,
        toggleNotification,
        savePreferences,
        isSaving,
        lastSaved,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used within a PreferencesProvider");
  }
  return context;
}
