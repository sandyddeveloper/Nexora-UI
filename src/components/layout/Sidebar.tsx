"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { USER_NAV_SECTIONS, STAFF_NAV_SECTIONS, NavItem } from "@/data/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Key,
  Users,
  CreditCard,
  User,
  Settings,
  ShieldCheck,
  LifeBuoy,
  Activity,
  ShieldAlert,
  Building2,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="h-4 w-4" />,
  FolderKanban: <FolderKanban className="h-4 w-4" />,
  BarChart3: <BarChart3 className="h-4 w-4" />,
  Key: <Key className="h-4 w-4" />,
  Users: <Users className="h-4 w-4" />,
  CreditCard: <CreditCard className="h-4 w-4" />,
  User: <User className="h-4 w-4" />,
  Settings: <Settings className="h-4 w-4" />,
  ShieldCheck: <ShieldCheck className="h-4 w-4" />,
  LifeBuoy: <LifeBuoy className="h-4 w-4" />,
  Activity: <Activity className="h-4 w-4" />,
  ShieldAlert: <ShieldAlert className="h-4 w-4" />,
  Building2: <Building2 className="h-4 w-4" />,
  FileText: <FileText className="h-4 w-4" />,
};

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user, role, logout } = useAuth();

  const navSections = role === "staff" ? STAFF_NAV_SECTIONS : USER_NAV_SECTIONS;

  const handleLinkClick = () => {
    if (onMobileClose) onMobileClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-zinc-950/60 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 flex flex-col bg-white dark:bg-zinc-950 border-r border-zinc-200/80 dark:border-zinc-800/80 transition-all duration-300 ease-in-out",
          // Mobile state
          isMobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0",
          // Desktop collapsed state
          isCollapsed ? "lg:w-20" : "lg:w-64"
        )}
      >
        {/* Header / Brand Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-2.5 overflow-hidden transition-transform active:scale-95"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-white shadow-xs border border-zinc-200/80 dark:border-zinc-800 p-0.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Nexora.png"
                alt="Nexora Logo"
                className="h-full w-full object-contain"
              />
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-purple-700 dark:text-purple-400">
                  NEXORA
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
                  {role === "staff" ? "Staff Control" : "Workspace"}
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50/60 dark:hover:bg-purple-950/40 transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Role Identity Badge */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="px-3 pt-3 pb-1">
            <div className="flex items-center justify-between p-2 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40">
              <div className="flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-semibold text-purple-900 dark:text-purple-200">
                  {role === "staff" ? "Company Staff" : "Client Workspace"}
                </span>
              </div>
              <Badge variant={role === "staff" ? "purple" : "gray"} size="sm">
                {role === "staff" ? "Admin" : "Active"}
              </Badge>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {(!isCollapsed || isMobileOpen) && (
                <p className="px-3 text-[11px] font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
                  {section.sectionTitle}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item: NavItem) => {
                  const isActive = pathname === item.href || (item.href.includes("#") && pathname === item.href.split("#")[0]);

                  return (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-purple-600 text-white shadow-md shadow-purple-600/25 font-semibold"
                          : "text-zinc-600 dark:text-zinc-400 hover:bg-purple-50 dark:hover:bg-purple-950/40 hover:text-purple-700 dark:hover:text-purple-300",
                        isCollapsed && !isMobileOpen && "justify-center px-2"
                      )}
                      title={isCollapsed && !isMobileOpen ? item.title : undefined}
                    >
                      <div
                        className={cn(
                          "transition-transform duration-200 group-hover:scale-110",
                          isActive ? "text-white" : "text-zinc-400 dark:text-zinc-500 group-hover:text-purple-600 dark:group-hover:text-purple-400"
                        )}
                      >
                        {ICON_MAP[item.icon] || <LayoutDashboard className="h-4 w-4" />}
                      </div>

                      {(!isCollapsed || isMobileOpen) && (
                        <div className="flex flex-1 items-center justify-between overflow-hidden">
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full",
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800/60"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Mini Profile Footer */}
        <div className="p-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div
            className={cn(
              "flex items-center gap-3 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60",
              isCollapsed && !isMobileOpen && "justify-center p-1.5"
            )}
          >
            {/* Avatar */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || "User")}`}
              alt={user?.name || "User"}
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-purple-500/30"
            />

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex flex-1 flex-col overflow-hidden text-left">
                <span className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {user?.name || (role === "staff" ? "Staff Member" : "Workspace User")}
                </span>
                <span className="truncate text-[10px] text-zinc-400 dark:text-zinc-500">
                  {user?.email || ""}
                </span>
              </div>
            )}

            {(!isCollapsed || isMobileOpen) && (
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title="Log out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
