'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Rocket, GitBranch, Box, ArrowRight, FileQuestion, ServerCrash, Radio, Sparkles, UserCheck } from 'lucide-react';
import { Modal, ModalContent } from '@/components/ui/modal';
import { useUIStore } from '@/store/use-ui-store';
import { Input } from '@/components/ui/input';
import { ROUTES } from '@/constants/routes';

const QUICK_COMMANDS = [
  { icon: UserCheck, title: 'Open HRMS Directory & Leave Approvals', category: 'HRMS', href: ROUTES.WORKSPACE.APPS.HRMS },
  { icon: GitBranch, title: 'Inspect Projects & Sprint Boards', category: 'Projects', href: ROUTES.WORKSPACE.APPS.PROJECTS },
  { icon: Box, title: 'Open Executive Revenue Reports', category: 'Reports', href: ROUTES.WORKSPACE.APPS.REPORTS },
  { icon: Sparkles, title: 'Launch Nexora AI Copilot', category: 'AI Assistant', href: ROUTES.WORKSPACE.AI_COPILOT },
  { icon: Rocket, title: 'View Enterprise CRM Pipeline', category: 'CRM', href: ROUTES.WORKSPACE.FUTURE.CRM },
  { icon: FileQuestion, title: 'Preview 404 Not Found Page', category: 'Errors', href: ROUTES.ERRORS.NOT_FOUND },
  { icon: ServerCrash, title: 'Preview 500 Internal Server Error Page', category: 'Errors', href: ROUTES.ERRORS.INTERNAL_SERVER_ERROR },
  { icon: Radio, title: 'Preview 502 Bad Gateway Error Page', category: 'Errors', href: ROUTES.ERRORS.BAD_GATEWAY },
];

export function CommandPaletteModal() {
  const { isSearchOpen, setSearchOpen } = useUIStore();
  const router = useRouter();
  const [query, setQuery] = useState('');

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

  const filteredCommands = QUICK_COMMANDS.filter(
    (cmd) =>
      cmd.title.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setSearchOpen(false);
    router.push(href);
  };

  return (
    <Modal open={isSearchOpen} onOpenChange={setSearchOpen}>
      <ModalContent className="max-w-xl p-0 overflow-hidden bg-[var(--surface-elevated)] backdrop-blur-2xl border-[var(--border-color)] text-[var(--text-primary)]">
        <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-3">
          <Search className="h-5 w-5 text-[var(--primary-purple)]" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search modules or system pages..."
            className="border-none bg-transparent focus:ring-0 text-base placeholder:text-[var(--text-placeholder)] text-[var(--text-primary)]"
            autoFocus
          />
        </div>

        <div className="p-3 max-h-80 overflow-y-auto custom-scrollbar">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] px-3 py-1.5">
            Quick Actions & System Commands
          </div>
          <div className="flex flex-col gap-1 mt-1">
            {filteredCommands.length === 0 ? (
              <div className="p-6 text-center text-xs text-[var(--text-muted)]">No matching workspace commands found</div>
            ) : (
              filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(cmd.href)}
                    className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-colors group text-left"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-[var(--glass-bg)] text-[var(--primary-purple)] border border-[var(--border-color)] shrink-0">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="truncate">{cmd.title}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-[var(--text-muted)] border border-[var(--border-color)] rounded px-1.5 py-0.5">
                        {cmd.category}
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                );
              })
            )}
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
