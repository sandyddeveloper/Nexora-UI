'use client';

import React from 'react';
import { LucideIcon, Sparkles, Plus, Download, SlidersHorizontal, Layers } from 'lucide-react';
import { StatCard, StatCardProps } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EnterpriseModuleViewProps {
  title: string;
  subtitle: string;
  badge?: string;
  icon: LucideIcon;
  stats?: StatCardProps[];
  children?: React.ReactNode;
}

export function EnterpriseModuleView({
  title,
  subtitle,
  badge = 'Enterprise Module',
  icon: Icon,
  stats = [],
  children,
}: EnterpriseModuleViewProps) {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Module Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <Icon className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              {title}
            </h1>
            <Badge variant="purple" className="ml-2">{badge}</Badge>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="text-xs border-[var(--border-color)]">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            Filters
          </Button>
          <Button className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-xs shadow-md shadow-[#8b5cf6]/20">
            <Plus className="h-4 w-4 mr-1.5" />
            Add New Record
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      {stats.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      )}

      {/* Custom Body or Default Enterprise Surface */}
      {children ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[400px] rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-8 text-center shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)] mb-4">
            <Layers className="h-7 w-7" />
          </div>
          <h3 className="text-base font-bold text-[var(--text-primary)]">{title} Control Hub</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-md mt-1 leading-relaxed">
            Architected for enterprise scale with full API endpoints, RBAC permissions, and real-time streaming hooks.
          </p>
          <Button variant="outline" size="sm" className="mt-4 text-xs border-[var(--border-color)]">
            <Sparkles className="h-3.5 w-3.5 mr-1.5 text-[var(--primary-purple)]" />
            Launch AI Copilot Insights
          </Button>
        </div>
      )}
    </div>
  );
}
