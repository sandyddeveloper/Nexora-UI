'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  Sparkles,
  Search,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSidebarStore } from '@/store/use-sidebar-store';
import { useUIStore } from '@/store/use-ui-store';
import { useAIPanelStore } from '@/store/use-ai-panel-store';
import { SIDEBAR_NAV_CONFIG } from '@/config/nav.config';
import { WorkspaceSwitcher } from './workspace-switcher';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, isMobileOpen, toggleSidebar, setMobileOpen } = useSidebarStore();
  const { setSearchOpen } = useUIStore();
  const { togglePanel: toggleAIPanel } = useAIPanelStore();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  const renderNavContent = (collapsed: boolean) => (
    <div className="flex h-full flex-col justify-between p-4 select-none overflow-hidden">
      {/* Top Header Section */}
      <div className="flex flex-col gap-3.5 pb-3 border-b border-[var(--border-color)] shrink-0">
        {/* Brand Logo & Expand/Collapse */}
        <div className="flex items-center justify-between px-1 pt-0.5">
          <Link href="/workspace" className="flex items-center gap-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8b5cf6] via-[#a855f7] to-[#c084fc] p-0.5 shadow-md shadow-[#8b5cf6]/30">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[var(--bg-primary)]">
                <Zap className="h-4.5 w-4.5 text-[#8b5cf6]" />
              </div>
            </div>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <span className="text-sm font-black tracking-wider text-[var(--text-primary)]">NEXORA</span>
                <span className="text-[9px] font-bold text-[var(--primary-purple)] tracking-widest uppercase">BUSINESS OS</span>
              </motion.div>
            )}
          </Link>

          <button
            onClick={toggleSidebar}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-muted)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
          </button>
        </div>

        {/* Workspace Switcher */}
        <WorkspaceSwitcher isCollapsed={collapsed} />

        {/* Quick Search Launcher */}
        {!collapsed ? (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-between gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] px-3 py-2 text-xs text-[var(--text-muted)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] hover:border-[var(--primary-purple)]/40 transition-all"
          >
            <div className="flex items-center gap-2">
              <Search className="h-3.5 w-3.5 text-[var(--primary-purple)]" />
              <span>Search workspace...</span>
            </div>
            <kbd className="rounded border border-[var(--border-color)] bg-[var(--state-hover)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--text-secondary)]">
              Ctrl+K
            </kbd>
          </button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-full items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-muted)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)]"
              >
                <Search className="h-4 w-4 text-[var(--primary-purple)]" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Search (Ctrl+K)</TooltipContent>
          </Tooltip>
        )}
      </div>

      {/* Middle Navigation Section (Dynamic flex-1 scrolling) */}
      <div className="flex-1 min-h-0 overflow-y-auto py-3 space-y-4 custom-scrollbar pr-0.5">
        {SIDEBAR_NAV_CONFIG.map((group, groupIdx) => (
          <div key={groupIdx} className="flex flex-col gap-1">
            {!collapsed && group.groupTitle && (
              <span className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                {group.groupTitle}
              </span>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              const navLink = (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'relative flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-200 group',
                    isActive
                      ? 'text-[var(--text-primary)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)]'
                  )}
                >
                  {/* Active Purple Pill Highlight */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActivePill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--primary-purple)]/20 to-[var(--secondary-purple)]/10 border border-[var(--primary-purple)]/40 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {Icon && (
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-colors z-10',
                        isActive ? 'text-[var(--primary-purple)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-primary)]'
                      )}
                    />
                  )}

                  {!collapsed && (
                    <div className="flex w-full items-center justify-between z-10 overflow-hidden">
                      <span className="truncate">{item.title}</span>
                      {item.badge && (
                        <Badge variant="purple" className="text-[10px] px-1.5 py-0 bg-[var(--primary-purple)]/15 text-[var(--primary-purple)] border-[var(--primary-purple)]/30">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                </Link>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                    <TooltipContent side="right" className="flex items-center gap-2">
                      <span>{item.title}</span>
                      {item.badge && <Badge variant="purple">{item.badge}</Badge>}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return navLink;
            })}
          </div>
        ))}
      </div>

      {/* Bottom Pinned Section */}
      <div className="flex flex-col gap-2.5 pt-3 border-t border-[var(--border-color)] shrink-0">
        {!collapsed ? (
          <button
            onClick={toggleAIPanel}
            className="flex items-center justify-between rounded-xl bg-[var(--primary-purple)]/15 border border-[var(--primary-purple)]/30 p-2.5 text-xs text-[var(--text-primary)] hover:bg-[var(--primary-purple)]/25 transition-all shadow-sm"
          >
            <div className="flex items-center gap-2 font-medium">
              <Sparkles className="h-4 w-4 text-[var(--primary-purple)] animate-pulse" />
              <span>AI Copilot</span>
            </div>
            <span className="rounded bg-[var(--primary-purple)]/30 px-1.5 py-0.5 text-[10px] font-bold text-[var(--primary-purple)]">
              v2.5
            </span>
          </button>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleAIPanel}
                className="flex h-9 w-full items-center justify-center rounded-xl bg-[var(--primary-purple)]/15 border border-[var(--primary-purple)]/30 text-[var(--primary-purple)] hover:bg-[var(--primary-purple)]/25"
              >
                <Sparkles className="h-4 w-4 animate-pulse" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Launch AI Copilot</TooltipContent>
          </Tooltip>
        )}

        <div className="flex items-center justify-between rounded-xl bg-[var(--glass-bg)] p-2 border border-[var(--border-color)]">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <Avatar className="h-8 w-8 shrink-0 border border-[var(--primary-purple)]/30">
              <AvatarFallback className="bg-gradient-to-tr from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-xs font-semibold">
                NX
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs font-semibold text-[var(--text-primary)]">Alex Mercer</span>
                <span className="truncate text-[10px] text-[var(--text-muted)]">Workspace Admin</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <Link
              href="/login"
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--state-hover)] hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Viewport Docked Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:flex h-screen sticky top-0 left-0 flex-col border-r border-[var(--border-color)] bg-[var(--sidebar-bg)] shrink-0 z-40 select-none"
      >
        {renderNavContent(isCollapsed)}
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Mobile Drawer Container */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="relative w-[280px] h-full bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] z-50 flex flex-col"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 z-50 p-1.5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="h-4 w-4" />
              </button>
              {renderNavContent(false)}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}