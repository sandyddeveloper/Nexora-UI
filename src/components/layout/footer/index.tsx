'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, GitBranch, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--surface)] text-[var(--text-secondary)] transition-colors duration-200 mt-8 py-3.5 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-[2400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left: Brand & Copyright */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Image src="/Nexora.png" alt="Nexora Logo" width={18} height={18} className="h-4.5 w-4.5 object-contain" />
            <span className="font-bold text-[var(--text-primary)]">Nexora OS</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--primary-purple)]/15 text-[var(--primary-purple)] font-semibold border border-[var(--primary-purple)]/30">
              v2.5
            </span>
          </div>
          <span className="hidden md:inline text-[var(--border-color)]">•</span>
          <span className="hidden md:inline text-[11px] text-[var(--text-muted)]">
            © 2026 Nexora Inc. All rights reserved.
          </span>
        </div>

        {/* Center: System Status Pill */}
        <div className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] bg-[var(--glass-bg)] px-2.5 py-1 rounded-full border border-[var(--border-color)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22c55e]" />
          </span>
          <span className="font-medium text-[var(--text-primary)]">Operational</span>
          <span>•</span>
          <span>99.99% Uptime</span>
        </div>

        {/* Right: Compact Links */}
        <div className="flex items-center gap-4 text-[11px]">
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
            Docs
          </a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
            API
          </a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1">
            <span>SOC2</span>
            <ShieldCheck className="h-3 w-3 text-[#22c55e]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
