import * as React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './card';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon,
  trend = 'up',
  className,
}: StatCardProps) {
  return (
    <Card className={cn('relative overflow-hidden transition-all duration-300 hover:scale-[1.01] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border-l-4 border-l-[var(--primary-purple)] border-[var(--border-color)] hover:border-[var(--primary-purple)]/50 shadow-sm hover:shadow-md', className)}>
      <div className="flex items-center justify-between pb-2">
        <span className="text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider">{title}</span>
        {icon && <div className="p-2 rounded-xl bg-[var(--glass-bg)] text-[var(--primary-purple)] border border-[var(--border-color)]">{icon}</div>}
      </div>

      <div className="mt-1 flex items-baseline justify-between">
        <div className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{value}</div>
        {change !== undefined && (
          <div
            className={cn(
              'inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border',
              trend === 'up'
                ? 'bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30'
                : trend === 'down'
                ? 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30'
                : 'bg-slate-500/15 text-slate-400 border-slate-500/30'
            )}
          >
            {trend === 'up' ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : trend === 'down' ? (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            ) : (
              <Minus className="w-3 h-3 mr-0.5" />
            )}
            {change > 0 ? `+${change}%` : `${change}%`}
          </div>
        )}
      </div>

      {changeLabel && <p className="mt-2 text-[11px] text-[var(--text-muted)]">{changeLabel}</p>}
    </Card>
  );
}

export function SectionHeader({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6', className)}>
      <div>
        <h2 className="text-xl font-bold text-[var(--text-primary)] tracking-tight">{title}</h2>
        {description && <p className="text-xs text-[var(--text-secondary)] mt-1">{description}</p>}
      </div>
      {action && <div className="flex items-center gap-2">{action}</div>}
    </div>
  );
}
