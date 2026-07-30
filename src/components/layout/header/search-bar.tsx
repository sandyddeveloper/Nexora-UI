'use client';

import React, { useEffect } from 'react';
import { Search, Server, Rocket, GitBranch, Box, ArrowRight } from 'lucide-react';
import { Modal, ModalContent } from '@/components/ui/modal';
import { useUIStore } from '@/store/use-ui-store';
import { Input } from '@/components/ui/input';

const QUICK_COMMANDS = [
  { icon: Server, title: 'Open Workflow Automations Engine', category: 'Automation' },
  { icon: Rocket, title: 'View Active CRM Enterprise Deals', category: 'CRM' },
  { icon: GitBranch, title: 'Inspect Q3 Sprint Board & Roadmaps', category: 'Projects' },
  { icon: Box, title: 'Open Executive Revenue Analytics', category: 'Analytics' },
];

export function CommandPaletteModal() {
  const { isSearchOpen, setSearchOpen } = useUIStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  return (
    <Modal open={isSearchOpen} onOpenChange={setSearchOpen}>
      <ModalContent className="max-w-xl p-0 overflow-hidden bg-[var(--surface-elevated)] backdrop-blur-2xl border-[var(--border-color)] text-[var(--text-primary)]">
        <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-3">
          <Search className="h-5 w-5 text-[var(--primary-purple)]" />
          <Input
            placeholder="Type a command, search workspace, or ask AI..."
            className="border-none bg-transparent focus:ring-0 text-base placeholder:text-[var(--text-placeholder)] text-[var(--text-primary)]"
            autoFocus
          />
        </div>

        <div className="p-3 max-h-80 overflow-y-auto">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5">
            Quick Actions & Commands
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {QUICK_COMMANDS.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={idx}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-colors group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--glass-bg)] text-[var(--primary-purple)] border border-[var(--border-color)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span>{cmd.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[var(--text-muted)] border border-[var(--border-color)] rounded px-1.5 py-0.5">
                      {cmd.category}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-3 bg-[var(--glass-bg)] border-t border-[var(--border-color)] flex items-center justify-between text-[11px] text-[var(--text-muted)] px-4">
          <span>Navigate with <kbd className="px-1 py-0.5 border border-[var(--border-color)] rounded bg-[var(--state-hover)] font-mono">↑</kbd> <kbd className="px-1 py-0.5 border border-[var(--border-color)] rounded bg-[var(--state-hover)] font-mono">↓</kbd></span>
          <span>Open with <kbd className="px-1 py-0.5 border border-[var(--border-color)] rounded bg-[var(--state-hover)] font-mono">↵</kbd></span>
        </div>
      </ModalContent>
    </Modal>
  );
}
