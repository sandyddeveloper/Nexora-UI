'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
  Home,
  Sun,
  Moon,
  Sparkles,
  Loader2,
  RefreshCw,
  Zap,
  FolderKanban,
  Users,
  Search,
  CheckCircle,
  Play,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Spinner, FullPageLoader, Skeleton } from '@/components/ui/loader';
import { useMounted } from '@/hooks/use-mounted';

export default function LoaderShowcasePage() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [showFullLoader, setShowFullLoader] = useState(false);
  const [isSimulatingAction, setIsSimulatingAction] = useState(false);

  const handleSimulateAction = () => {
    setIsSimulatingAction(true);
    setTimeout(() => {
      setIsSimulatingAction(false);
    }, 2000);
  };

  const handleSimulateFullLoader = () => {
    setShowFullLoader(true);
    setTimeout(() => {
      setShowFullLoader(false);
    }, 2500);
  };

  if (showFullLoader) {
    return <FullPageLoader label="Simulating Workspace Data Sync..." sublabel="Loading modules and dashboard telemetry" />;
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[var(--primary-purple)]/20 via-[var(--secondary-purple)]/15 to-transparent blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 via-[var(--primary-purple)]/10 to-transparent blur-[140px]" />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Header Bar */}
      <header className="relative z-20 flex h-16 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--header-bg)] px-4 sm:px-8 backdrop-blur-xl shrink-0">
        <Link href="/workspace" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8b5cf6] via-[#a855f7] to-[#c084fc] p-0.5 shadow-md shadow-[#8b5cf6]/30 overflow-hidden">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[var(--bg-primary)] overflow-hidden">
              <Image src="/Nexora.png" alt="Nexora OS Logo" width={36} height={36} className="h-full w-full object-contain p-0.5" priority />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-[var(--text-primary)]">NEXORA</span>
            <span className="text-[9px] font-bold text-[var(--primary-purple)] tracking-widest uppercase">BUSINESS OS</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-all"
            title="Toggle Theme"
          >
            {mounted && theme === 'light' ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 text-purple-400" />
            )}
          </button>

          <Link href="/workspace">
            <Button variant="primary" size="xs" leftIcon={<Home className="h-3.5 w-3.5" />}>
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="w-full max-w-4xl space-y-6 my-auto">
          
          {/* Header Tile */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-[var(--primary-purple)]/30 bg-[var(--primary-purple)]/10 px-3.5 py-1 text-xs font-semibold text-[var(--primary-purple)]">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Nexora UI Design System</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)]">
              Loader & Loading UI Components
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto">
              Interactive preview of Nexora OS loading states, spinners, full-page overlays, and skeleton loaders.
            </p>
          </motion.div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Full Page Overlay Simulator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)]/90 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="purple" className="text-[10px] px-2 py-0.5">OVERLAY LOADER</Badge>
                  <span className="text-xs font-bold text-[var(--text-primary)]">Full Page Transition</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Trigger the full-page Nexora OS loading backdrop with pulse rings, brand logo, and smooth status animations.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
                <Button
                  onClick={handleSimulateFullLoader}
                  variant="primary"
                  size="sm"
                  className="w-full"
                  leftIcon={<Play className="h-3.5 w-3.5" />}
                >
                  Test Full Page Loader (2.5s)
                </Button>
              </div>
            </motion.div>

            {/* 2. Interactive Button & Spinner States */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)]/90 p-6 shadow-xl backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="warning" className="text-[10px] px-2 py-0.5">SPINNERS & BUTTONS</Badge>
                  <span className="text-xs font-bold text-[var(--text-primary)]">Inline Spinners</span>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <Spinner size="sm" />
                  <Spinner size="md" />
                  <Spinner size="lg" />
                  <Spinner size="xl" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <Button
                  onClick={handleSimulateAction}
                  isLoading={isSimulatingAction}
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
                >
                  {isSimulatingAction ? 'Processing Task...' : 'Simulate Async Action'}
                </Button>
              </div>
            </motion.div>

            {/* 3. Skeleton Loading Placeholders */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)]/90 p-6 shadow-xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)] mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="success" className="text-[10px] px-2 py-0.5">SKELETONS</Badge>
                  <span className="text-xs font-bold text-[var(--text-primary)]">Content Loading Card Skeleton</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">ANIMATED PULSE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--glass-bg)] space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-3.5 w-24" />
                        <Skeleton className="h-2.5 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-full rounded-xl" />
                    <div className="flex justify-between items-center pt-2">
                      <Skeleton className="h-3 w-12" />
                      <Skeleton className="h-5 w-14 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-20 flex h-11 w-full items-center justify-between border-t border-[var(--border-color)] bg-[var(--header-bg)] px-4 sm:px-8 text-[11px] text-[var(--text-muted)] backdrop-blur-xl shrink-0">
        <div>
          <span>Nexora UI Component Library</span>
        </div>
        <div>
          <span>Nexora Business OS v2.5.0</span>
        </div>
      </footer>
    </div>
  );
}
