'use client';

import React, { useState } from 'react';
import {
  Users,
  Building2,
  DollarSign,
  TrendingUp,
  Plus,
  Filter,
  SlidersHorizontal,
  Mail,
  Phone,
  ArrowUpRight,
  Briefcase,
  Sparkles,
} from 'lucide-react';
import { KanbanBoard, KanbanColumn, KanbanItem } from '@/components/shared/kanban-board';
import { DataGrid, Column } from '@/components/shared/data-grid';
import { ContextDrawer } from '@/components/shared/context-drawer';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const MOCK_PIPELINE_COLUMNS: KanbanColumn[] = [
  { id: 'lead', title: 'New Leads', color: '#a1a1aa' },
  { id: 'qualified', title: 'Qualified', color: '#8b5cf6' },
  { id: 'proposal', title: 'Proposal Sent', color: '#a855f7' },
  { id: 'negotiation', title: 'Negotiation', color: '#f59e0b' },
  { id: 'closed_won', title: 'Closed Won', color: '#22c55e' },
];

const MOCK_DEALS: KanbanItem[] = [
  {
    id: 'DEAL-101',
    title: 'Acme Corp Enterprise License Expansion',
    description: '1,500 active seat enterprise subscription expansion + SLA support.',
    status: 'proposal',
    priority: 'urgent',
    assignee: { name: 'Sarah Chen', initials: 'SC' },
    dueDate: 'Est. $240,000',
    tags: ['Enterprise', 'SaaS'],
  },
  {
    id: 'DEAL-102',
    title: 'Starlight Media Platform Deployment',
    description: 'Custom HRMS + Project Engine deployment across 3 global entities.',
    status: 'negotiation',
    priority: 'high',
    assignee: { name: 'Alex Morgan', initials: 'AM' },
    dueDate: 'Est. $185,000',
    tags: ['Custom', 'HRMS'],
  },
  {
    id: 'DEAL-103',
    title: 'Nexus Financial AI Copilot Integration',
    description: 'Autonomous AI Copilot deployment for automated compliance parsing.',
    status: 'qualified',
    priority: 'medium',
    assignee: { name: 'Priya Sharma', initials: 'PS' },
    dueDate: 'Est. $95,000',
    tags: ['AI Agent', 'Finance'],
  },
];

interface Account {
  id: string;
  name: string;
  industry: string;
  arr: string;
  contacts: number;
  status: 'Active' | 'Prospect' | 'Churn Risk';
}

const MOCK_ACCOUNTS: Account[] = [
  { id: 'ACC-1', name: 'Acme Global Holdings', industry: 'Fintech', arr: '$240,000', contacts: 14, status: 'Active' },
  { id: 'ACC-2', name: 'Starlight Media Network', industry: 'Media & Tech', arr: '$185,000', contacts: 8, status: 'Prospect' },
  { id: 'ACC-3', name: 'Nexus Financial Group', industry: 'Banking', arr: '$95,000', contacts: 22, status: 'Active' },
];

export default function CRMPage() {
  const [deals, setDeals] = useState<KanbanItem[]>(MOCK_DEALS);
  const [selectedDeal, setSelectedDeal] = useState<KanbanItem | null>(null);

  const accountColumns: Column<Account>[] = [
    {
      key: 'name',
      header: 'Account Name',
      sortable: true,
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)] font-bold text-xs">
            <Building2 className="h-4 w-4" />
          </div>
          <span className="font-bold text-[var(--text-primary)]">{row.name}</span>
        </div>
      ),
    },
    { key: 'industry', header: 'Industry', sortable: true },
    { key: 'arr', header: 'Annual Revenue (ARR)', sortable: true, align: 'right', accessor: (row) => <span className="font-bold">{row.arr}</span> },
    { key: 'status', header: 'Status', accessor: (row) => <Badge variant={row.status === 'Active' ? 'success' : 'purple'}>{row.status}</Badge> },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <Users className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Customer Relationship Management (CRM)
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Manage enterprise sales pipelines, key account portfolios, deal velocity, and revenue forecasts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white shadow-md shadow-[#8b5cf6]/20 text-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Add Deal
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Pipeline Value" value="$1.42M" change="+14% this month" icon={DollarSign} trend="up" />
        <StatCard title="Deal Win Rate" value="68.4%" change="+4.2% vs target" icon={TrendingUp} trend="up" />
        <StatCard title="Active Enterprise Accounts" value="142" change="18 in final stage" icon={Building2} trend="neutral" />
        <StatCard title="Avg Deal Cycle Length" value="18 days" change="-3 days velocity boost" icon={Briefcase} trend="up" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pipeline" className="w-full">
        <TabsList className="bg-[var(--surface)] border border-[var(--border-color)] p-1 rounded-2xl">
          <TabsTrigger value="pipeline" className="text-xs font-semibold rounded-xl">Deal Pipeline</TabsTrigger>
          <TabsTrigger value="accounts" className="text-xs font-semibold rounded-xl">Accounts & Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="mt-4">
          <KanbanBoard
            columns={MOCK_PIPELINE_COLUMNS}
            items={deals}
            onItemMove={(id, newStatus) =>
              setDeals((prev) => prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d)))
            }
            onItemClick={(item) => setSelectedDeal(item)}
          />
        </TabsContent>

        <TabsContent value="accounts" className="mt-4">
          <DataGrid
            data={MOCK_ACCOUNTS}
            columns={accountColumns}
            keyExtractor={(item) => item.id}
          />
        </TabsContent>
      </Tabs>

      {/* Context Drawer */}
      <ContextDrawer
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        title={selectedDeal?.title || ''}
        subtitle={`Deal ID: ${selectedDeal?.id}`}
      >
        {selectedDeal && (
          <div className="flex flex-col gap-4 text-xs">
            <p className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
              {selectedDeal.description}
            </p>
            <div className="flex justify-between items-center p-3 rounded-xl border border-[var(--border-color)]">
              <span>Estimated Contract Value</span>
              <span className="font-extrabold text-[var(--color-success)] text-sm">{selectedDeal.dueDate}</span>
            </div>
          </div>
        )}
      </ContextDrawer>
    </div>
  );
}
