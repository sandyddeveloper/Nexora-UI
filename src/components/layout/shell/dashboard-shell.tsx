'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { CommandPaletteModal } from '@/components/layout/header/search-bar';
import { AiAssistantModal } from '@/components/layout/header/ai-assistant-modal';
import { FadeIn } from '@/components/animations';

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
      {/* Container Sidebar (Sticky Viewport Height) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 min-h-screen overflow-x-hidden">
        <Header />
        <main className="flex-1 p-3 sm:p-5 md:p-6 lg:p-8 2xl:p-10 4xl:p-12 max-w-[2400px] w-full mx-auto">
          <FadeIn>{children}</FadeIn>
        </main>
      </div>

      {/* Modals & Command Palettes */}
      <CommandPaletteModal />
      <AiAssistantModal />
    </div>
  );
}
