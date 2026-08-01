'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import {
  Sun,
  Moon,
  Search,
  Sparkles,
  ChevronRight,
  User,
  Shield,
  LogOut,
  Sliders,
  Menu,
  Plus,
} from 'lucide-react';
import { useUIStore } from '@/store/use-ui-store';
import { useSidebarStore } from '@/store/use-sidebar-store';
import { useAIPanelStore } from '@/store/use-ai-panel-store';
import { NotificationsCenter } from './notifications';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { useMounted } from '@/hooks/use-mounted';

export function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const { setSearchOpen } = useUIStore();
  const { setMobileOpen } = useSidebarStore();
  const { togglePanel: toggleAIPanel } = useAIPanelStore();

  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-[var(--border-color)] bg-[var(--header-bg)] px-3.5 sm:px-6 lg:px-8 2xl:px-10 4xl:px-12 backdrop-blur-xl transition-all">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] md:hidden hover:bg-[var(--state-hover)]"
        >
          <Menu className="h-4 w-4" />
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Link href="/workspace" className="flex items-center gap-2 hover:text-[var(--text-primary)] font-semibold text-[var(--text-primary)] transition-colors">
            <Image src="/Nexora.png" alt="Nexora OS Logo" width={20} height={20} className="h-5 w-5 object-contain" />
            <span>Nexora OS</span>
          </Link>
          {pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const isLast = index === pathSegments.length - 1;
            const title = segment.charAt(0).toUpperCase() + segment.slice(1);

            return (
              <React.Fragment key={href}>
                <ChevronRight className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-60" />
                {isLast ? (
                  <span className="font-semibold text-[var(--text-primary)] capitalize">{title}</span>
                ) : (
                  <Link href={href} className="hover:text-[var(--text-primary)] capitalize">
                    {title}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Right: Actions, Search, Quick Create, Notifications, AI Panel, Profile */}
      <div className="flex items-center gap-3">
        {/* Quick Create Action Button */}
        <Button variant="glass" size="xs" leftIcon={<Plus className="h-3.5 w-3.5 text-[var(--primary-purple)]" />}>
          <span className="hidden sm:inline">Quick Create</span>
        </Button>

        {/* Search Launcher */}
        <button
          onClick={() => setSearchOpen(true)}
          className="hidden md:flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] px-3.5 py-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--primary-purple)]/40 transition-all shadow-sm"
        >
          <Search className="h-3.5 w-3.5 text-[var(--primary-purple)]" />
          <span>Search OS...</span>
          <kbd className="rounded border border-[var(--border-color)] bg-[var(--state-hover)] px-1.5 py-0.5 text-[10px] font-mono">
            Ctrl+K
          </kbd>
        </button>

        {/* Right AI Panel Drawer Trigger */}
        <button
          onClick={toggleAIPanel}
          className="flex items-center gap-2 rounded-xl bg-[var(--primary-purple)]/15 border border-[var(--primary-purple)]/40 px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--primary-purple)]/25 transition-all shadow-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--primary-purple)] animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Notifications */}
        <NotificationsCenter />

        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-all"
          title="Toggle Dark / Light Theme"
        >
          {mounted && theme === 'light' ? (
            <Sun className="h-4 w-4 text-amber-500" />
          ) : (
            <Moon className="h-4 w-4 text-purple-400" />
          )}
        </button>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] p-1 pr-2 hover:bg-[var(--state-hover)] transition-all focus:outline-none">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-gradient-to-tr from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-[10px]">
                  AM
                </AvatarFallback>
              </Avatar>
              <span className="hidden lg:inline text-xs font-medium text-[var(--text-primary)]">Alex Mercer</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[var(--text-primary)]">Alex Mercer</span>
                <span className="text-[10px] text-[var(--text-muted)]">alex@acme.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <span>Workspace Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Shield className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <span>Security & Roles</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Sliders className="h-3.5 w-3.5 text-[var(--text-muted)]" />
              <span>Preferences</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="gap-2 text-red-500 focus:text-red-400">
              <Link href="/login">
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
