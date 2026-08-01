'use client';

import React from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { CommandPaletteModal } from '@/components/layout/header/search-bar';
import { RightAIPanel } from '@/components/layout/ai-panel/right-ai-panel';
import { Footer } from '@/components/layout/footer';
import { FadeIn } from '@/components/animations';

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
      {/* Container Sidebar (Sticky Viewport Height) */}
      <Sidebar />

      {/* Main Workspace Content */}
      <div className="flex flex-1 flex-col min-w-0 h-screen overflow-hidden">
        <Header />
        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
          <main className="p-3 sm:p-5 md:p-6 lg:p-8 2xl:p-10 4xl:p-12 max-w-[2400px] w-full mx-auto">
            <FadeIn>{children}</FadeIn>
          </main>
          <Footer />
        </div>
      </div>

      {/* Right AI Panel & Command Palette */}
      <RightAIPanel />
      <CommandPaletteModal />
    </div>
  );
}
