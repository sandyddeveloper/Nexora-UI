'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-6 w-6 border-2',
    lg: 'h-8 w-8 border-3',
    xl: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-t-transparent border-[var(--primary-purple)]',
        sizeClasses[size],
        className
      )}
    />
  );
}

interface FullPageLoaderProps {
  label?: string;
  sublabel?: string;
}

export function FullPageLoader({
  label = 'Loading Nexora OS...',
  sublabel = 'Synchronizing workspace modules & environment data',
}: FullPageLoaderProps) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[var(--primary-purple)]/25 via-[var(--secondary-purple)]/15 to-transparent blur-[140px]" />
      <div className="pointer-events-none fixed -bottom-40 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/15 via-[var(--primary-purple)]/10 to-transparent blur-[140px]" />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(var(--text-primary) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Brand Pulse Container */}
        <div className="relative flex items-center justify-center mb-6">
          {/* Glowing Pulse Rings */}
          <motion.div
            animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-24 w-24 rounded-full bg-[var(--primary-purple)]/20 blur-md"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-20 w-20 rounded-full border border-[var(--primary-purple)]/40"
          />

          {/* Logo Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#8b5cf6] via-[#a855f7] to-[#c084fc] p-0.5 shadow-xl shadow-[#8b5cf6]/30 overflow-hidden"
          >
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[var(--bg-primary)] overflow-hidden">
              <Image src="/Nexora.png" alt="Nexora OS Logo" width={44} height={44} className="h-full w-full object-contain p-1" priority />
            </div>
          </motion.div>
        </div>

        {/* Text Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base font-black tracking-wider text-[var(--text-primary)]">NEXORA</span>
            <span className="text-[10px] font-bold text-[var(--primary-purple)] tracking-widest uppercase">BUSINESS OS</span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--primary-purple)] animate-pulse" />
            <span>{label}</span>
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)] max-w-xs leading-relaxed">
            {sublabel}
          </p>

          {/* Animated Progress Bar */}
          <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-[var(--border-color)]">
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="h-full w-full bg-gradient-to-r from-[var(--primary-purple)] via-[#c084fc] to-[var(--primary-purple)] rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-xl bg-[var(--border-color)]/50 dark:bg-[var(--border-color)]/30',
        className
      )}
    />
  );
}
