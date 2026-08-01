'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import {
  WifiOff,
  RefreshCw,
  Home,
  ArrowLeft,
  Sun,
  Moon,
  HelpCircle,
  FolderKanban,
  Users,
  Zap,
  BarChart3,
  Settings,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useMounted } from '@/hooks/use-mounted';

export default function BadGatewayPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    toast.info('Checking connection...');

    setTimeout(() => {
      setIsRetrying(false);
      toast.success('Connection Restored', {
        description: 'You are reconnected to Nexora Business OS.',
      });
      router.push('/workspace');
    }, 1200);
  };

  const QUICK_LINKS = [
    { title: 'CRM & Deals', href: '/workspace/apps/crm', icon: Users },
    { title: 'Projects & Tasks', href: '/workspace/apps/projects', icon: FolderKanban },
    { title: 'Automations', href: '/workspace/apps/automation', icon: Zap },
    { title: 'Analytics', href: '/workspace/apps/analytics', icon: BarChart3 },
    { title: 'Settings', href: '/workspace/admin/settings', icon: Settings },
  ];

  return (
    <div className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Ambient Glows */}
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-amber-500/20 via-[var(--primary-purple)]/15 to-transparent blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent blur-[140px]" />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      {/* Header Bar */}
      <header className="relative z-20 flex h-16 w-full items-center justify-between border-b border-[var(--border-color)] bg-[var(--header-bg)] px-4 sm:px-8 backdrop-blur-xl shrink-0">
        <Link href="/workspace" className="flex items-center gap-3 transition-transform hover:scale-105">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-[#8b5cf6] to-[#a855f7] p-0.5 shadow-md shadow-amber-500/20 overflow-hidden">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[var(--bg-primary)] overflow-hidden">
              <Image src="/Nexora.png" alt="Nexora OS Logo" width={36} height={36} className="h-full w-full object-contain p-0.5" priority />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-[var(--text-primary)]">NEXORA</span>
            <span className="text-[9px] font-bold text-amber-400 tracking-widest uppercase">BUSINESS OS</span>
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

      {/* Main Content (Strictly fitted within viewport) */}
      <main className="relative z-10 flex flex-1 items-center justify-center p-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-xl flex-col items-center text-center rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)]/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
        >
          {/* Badge */}
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-500">
            <WifiOff className="h-3.5 w-3.5" />
            <span>Connection Notice • Service Unavailable</span>
          </div>

          {/* Code */}
          <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-[#f59e0b] to-[var(--primary-purple)] drop-shadow-sm select-none">
            502
          </h1>

          <h2 className="mt-1 text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
            Service Temporarily Unavailable
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed max-w-md">
            We're having trouble connecting to the service right now. Please check your network or try again in a moment.
          </p>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Button
              onClick={handleRetry}
              isLoading={isRetrying}
              variant="primary"
              size="sm"
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Try Again
            </Button>

            <Button
              onClick={() => router.push('/workspace')}
              variant="secondary"
              size="sm"
              leftIcon={<Home className="h-3.5 w-3.5" />}
            >
              Back to Dashboard
            </Button>

            <Button
              onClick={() => router.back()}
              variant="glass"
              size="sm"
              leftIcon={<ArrowLeft className="h-3.5 w-3.5" />}
            >
              Go Back
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-6 w-full pt-4 border-t border-[var(--border-color)]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Explore Popular Modules:
            </span>
            <div className="flex flex-wrap justify-center gap-1.5">
              {QUICK_LINKS.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={idx}
                    href={link.href}
                    className="flex items-center gap-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--glass-bg)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] hover:border-[var(--primary-purple)]/50 transition-all"
                  >
                    <Icon className="h-3.5 w-3.5 text-[var(--primary-purple)]" />
                    <span>{link.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Bar */}
      <footer className="relative z-20 flex h-11 w-full items-center justify-between border-t border-[var(--border-color)] bg-[var(--header-bg)] px-4 sm:px-8 text-[11px] text-[var(--text-muted)] backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-1.5">
          <HelpCircle className="h-3.5 w-3.5 text-amber-400" />
          <span>Need help? Check network connectivity or contact support</span>
        </div>
        <div>
          <span>Nexora Business OS</span>
        </div>
      </footer>
    </div>
  );
}
