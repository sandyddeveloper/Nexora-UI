'use client';

import React from 'react';
import { ChevronsUpDown, Check, Plus, ShieldCheck } from 'lucide-react';
import { useUIStore } from '@/store/use-ui-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { Badge } from '@/components/ui/badge';
import { Workspace } from '@/types';

const WORKSPACES: Workspace[] = [
  {
    id: 'ws-acme-corp',
    name: 'Acme Global Inc.',
    slug: 'acme-global',
    plan: 'Enterprise',
    region: 'us-east-1',
  },
  {
    id: 'ws-nexora-labs',
    name: 'Nexora AI Labs',
    slug: 'nexora-labs',
    plan: 'Pro',
    region: 'eu-central-1',
  },
  {
    id: 'ws-apex-group',
    name: 'Apex Ventures',
    slug: 'apex-ventures',
    plan: 'Team',
    region: 'us-west-2',
  },
];

export function WorkspaceSwitcher({ isCollapsed }: { isCollapsed: boolean }) {
  const { currentWorkspace, setWorkspace } = useUIStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] p-2.5 text-left transition-all hover:bg-[var(--state-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-purple)]/40"
          title={isCollapsed ? currentWorkspace.name : undefined}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary-purple)] to-[var(--secondary-purple)] font-bold text-white shadow-md">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col overflow-hidden">
                <span className="truncate text-xs font-semibold text-[var(--text-primary)]">{currentWorkspace.name}</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  <span className="text-[10px] text-[var(--text-muted)] font-medium">{currentWorkspace.plan}</span>
                </div>
              </div>
            )}
          </div>
          {!isCollapsed && <ChevronsUpDown className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-64 bg-[var(--surface-elevated)] border-[var(--border-color)]">
        <DropdownMenuLabel className="text-[var(--text-muted)]">Switch Workspace</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {WORKSPACES.map((ws) => (
          <DropdownMenuItem
            key={ws.id}
            onClick={() => setWorkspace(ws)}
            className="flex items-center justify-between py-2 text-[var(--text-primary)] hover:bg-[var(--state-hover)]"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-[var(--text-primary)]">{ws.name}</span>
              <span className="text-[10px] text-[var(--text-muted)]">{ws.region}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="purple" className="text-[10px] px-1.5 py-0">
                {ws.plan}
              </Badge>
              {currentWorkspace.id === ws.id && <Check className="h-4 w-4 text-[#22c55e]" />}
            </div>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 text-[var(--primary-purple)]">
          <Plus className="h-4 w-4" />
          <span>Create New Workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
