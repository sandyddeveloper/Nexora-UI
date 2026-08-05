'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200 overflow-hidden">
      {/* Top Ambient Glow Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-[var(--primary-purple)]/10 blur-[150px] pointer-events-none" />

      {/* Top Header Logo */}
      <header className="relative z-10 flex items-center justify-between p-6 max-w-7xl w-full mx-auto">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8b5cf6] via-[#a855f7] to-[#c084fc] p-0.5 shadow-md shadow-[#8b5cf6]/30 overflow-hidden">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[var(--bg-primary)] overflow-hidden">
              <Image src="/Nexora.png" alt="Nexora Business OS" width={36} height={36} className="h-full w-full object-contain p-0.5" priority />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-wider text-[var(--text-primary)]">NEXORA</span>
            <span className="text-[9px] font-bold text-[var(--primary-purple)] tracking-widest uppercase">BUSINESS OS</span>
          </div>
        </Link>
      </header>

      {/* Main Public Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-xs text-[var(--text-muted)] border-t border-[var(--border-color)]/30">
        © 2026 Nexora Business Platform Inc. All rights reserved. Enterprise Security & Encryption Active.
      </footer>
    </div>
  );
}
