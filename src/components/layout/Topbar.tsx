"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { NotificationItem } from "@/types/auth";
import { usePreferences } from "@/context/PreferencesContext";
import { PreferencesModal } from "@/components/common/PreferencesModal";
import { useOrganization } from "@/context/OrganizationContext";
import { CreateOrganizationModal } from "@/components/organizations/CreateOrganizationModal";
import { countryCodeToFlag } from "@/hooks/useLanguages";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Shield,
  User,
  Settings,
  LogOut,
  CheckCheck,
  Sparkles,
  Command,
  ChevronDown,
  Globe,
  SlidersHorizontal,
  Building2,
  Plus,
  Check,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuToggle: () => void;
}

export function Topbar({ onMenuToggle }: TopbarProps) {
  const pathname = usePathname();
  const { user, role, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { language } = usePreferences();
  const { currentOrganization, organizations, switchOrganization } = useOrganization();

  // Dropdown states
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
  const [isOrgDropdownOpen, setIsOrgDropdownOpen] = useState(false);
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const orgRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (orgRef.current && !orgRef.current.contains(event.target as Node)) {
        setIsOrgDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getPageTitle = () => {
    if (pathname.includes("/dashboard/staff")) return "Staff Operations Center";
    if (pathname.includes("/dashboard/profile")) return "Account & Security Profile";
    if (pathname.includes("/dashboard/settings")) return "Preferences & Settings";
    return "Workspace Overview";
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 px-4 md:px-6 backdrop-blur-md transition-colors">
        {/* Left Side: Mobile Menu Button & Breadcrumb */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight md:text-base">
              {getPageTitle()}
            </h1>
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
              <span>Nexora</span>
              <span>/</span>
              <span className="text-purple-600 dark:text-purple-400 capitalize">{role}</span>
              <span>/</span>
              <span className="text-zinc-600 dark:text-zinc-300">{getPageTitle()}</span>
            </div>
          </div>

          {/* Active Organization Selector Pill */}
          {currentOrganization && (
            <div className="relative hidden xl:block ml-2" ref={orgRef}>
              <button
                type="button"
                onClick={() => setIsOrgDropdownOpen((prev) => !prev)}
                className="flex items-center gap-2 h-9 px-3 rounded-xl border border-purple-200/80 dark:border-purple-800/80 bg-purple-50/60 dark:bg-purple-950/30 text-xs font-bold text-purple-900 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-950/60 transition-all cursor-pointer"
              >
                <Building2 className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                <span className="max-w-[140px] truncate">{currentOrganization.name}</span>
                <span className="text-xs">{countryCodeToFlag(currentOrganization.country_code)}</span>
                <ChevronDown className="h-3 w-3 text-purple-400" />
              </button>

              {/* Dropdown Menu */}
              {isOrgDropdownOpen && (
                <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl z-50 p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center justify-between">
                    <span>Your Organizations</span>
                    <Badge variant="purple" size="sm">{organizations.length}</Badge>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
                    {organizations.map((org) => {
                      const isSelected = currentOrganization.id === org.id;
                      return (
                        <button
                          key={org.id}
                          onClick={() => {
                            switchOrganization(org);
                            setIsOrgDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer",
                            isSelected
                              ? "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-bold"
                              : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-sm">{countryCodeToFlag(org.country_code)}</span>
                            <span className="truncate">{org.name}</span>
                          </div>
                          {isSelected && <Check className="h-3.5 w-3.5 text-purple-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-1.5 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-2">
                    <Link
                      href="/dashboard/workspaces"
                      onClick={() => setIsOrgDropdownOpen(false)}
                      className="text-[11px] font-semibold text-zinc-500 hover:text-purple-600 px-2 py-1"
                    >
                      Manage All
                    </Link>

                    {role === "staff" && (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          setIsOrgDropdownOpen(false);
                          setIsCreateOrgModalOpen(true);
                        }}
                        leftIcon={<Plus className="h-3 w-3" />}
                        className="text-[11px] py-1 px-2.5"
                      >
                        New Org
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center: Quick Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="w-full flex items-center justify-between rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/60 px-3.5 py-2 text-xs text-zinc-400 hover:border-purple-300 dark:hover:border-purple-700/60 hover:bg-white dark:hover:bg-zinc-900 transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-zinc-400" />
              <span>Search workspaces, tickets, commands...</span>
            </div>
            <kbd className="flex items-center gap-0.5 rounded bg-zinc-200/80 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              <Command className="h-2.5 w-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Platform Preferences (Language, Notifications, Theme) */}
          <button
            onClick={() => setIsPrefModalOpen(true)}
            className="flex items-center gap-1.5 h-9 px-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 transition-colors"
            title="Platform Preferences (Language, Notifications, Theme)"
          >
            <span className="text-sm leading-none">{language.flag}</span>
            <span className="hidden sm:inline text-xs font-semibold">{language.code.toUpperCase()}</span>
            <SlidersHorizontal className="h-3 w-3 text-zinc-400" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} mode`}
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="h-4 w-4 text-purple-600 transition-transform rotate-0 hover:-rotate-12" />
            )}
          </button>

          {/* Notification Center */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Notifications</h4>
                    {unreadCount > 0 && <Badge variant="purple">{unreadCount} New</Badge>}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllRead}
                      className="flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                    >
                      <CheckCheck className="h-3 w-3" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80 max-h-72 overflow-y-auto mt-2">
                  {notifications.length === 0 ? (
                    <p className="py-6 text-center text-xs text-zinc-400">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={cn(
                          "py-3 px-2 rounded-xl transition-colors",
                          !n.read ? "bg-purple-50/50 dark:bg-purple-950/20" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">{n.title}</span>
                          <span className="text-[10px] text-zinc-400 shrink-0">{n.time}</span>
                        </div>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 rounded-xl border border-zinc-200 dark:border-zinc-800 p-1 hover:border-purple-300 dark:hover:border-purple-700 transition-all"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || "User")}`}
                alt={user?.name || "Profile"}
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-purple-500/40"
              />
              <ChevronDown className="h-3 w-3 text-zinc-400 pr-0.5" />
            </button>

            {/* Profile Dropdown Panel */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || "User")}`}
                    alt={user?.name || "User"}
                    className="h-10 w-10 rounded-xl object-cover ring-2 ring-purple-500/40"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">{user?.name}</p>
                    <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                    <Badge variant={role === "staff" ? "amber" : "purple"} size="sm" className="mt-1">
                      {role === "staff" ? "Staff Member" : "Standard User"}
                    </Badge>
                  </div>
                </div>

                <div className="p-1 space-y-0.5">
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                  >
                    <User className="h-3.5 w-3.5 text-zinc-400" />
                    My Profile
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                  >
                    <Settings className="h-3.5 w-3.5 text-zinc-400" />
                    Settings & Security
                  </Link>
                </div>

                <div className="p-1 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <Modal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        title="Quick Command & Search"
        description="Search across pages, support tickets, workspaces, and system settings."
      >
        <div className="space-y-4">
          <Input
            autoFocus
            leftIcon={<Search className="h-4 w-4" />}
            placeholder="Type a query or command (e.g. 'tickets', 'profile', 'theme')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Quick Navigation</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/dashboard"
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors"
              >
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span>User Dashboard</span>
              </Link>
              <Link
                href="/dashboard/staff"
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors"
              >
                <Shield className="h-4 w-4 text-purple-600" />
                <span>Staff Operations</span>
              </Link>
              <Link
                href="/dashboard/profile"
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors"
              >
                <User className="h-4 w-4 text-purple-600" />
                <span>Edit Profile</span>
              </Link>
              <Link
                href="/dashboard/settings"
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors"
              >
                <Settings className="h-4 w-4 text-purple-600" />
                <span>System Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </Modal>

      {/* Platform Preferences Modal (Language, Notifications, Theme) */}
      <PreferencesModal
        isOpen={isPrefModalOpen}
        onClose={() => setIsPrefModalOpen(false)}
      />

      {/* Quick Organization Creation Modal */}
      <CreateOrganizationModal
        isOpen={isCreateOrgModalOpen}
        onClose={() => setIsCreateOrgModalOpen(false)}
      />
    </>
  );
}
