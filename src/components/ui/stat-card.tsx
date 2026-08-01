import * as React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from './card';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: number | string;
  changeLabel?: string;
  icon?: React.ElementType | React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  changeLabel = 'vs last period',
  icon: IconComponent,
  trend = 'up',
  className,
}: StatCardProps) {
  const renderIcon = () => {
    if (!IconComponent) return null;
    if (React.isValidElement(IconComponent)) return IconComponent;
    if (typeof IconComponent === 'function' || typeof IconComponent === 'object') {
      const Icon = IconComponent as React.ElementType;
      return <Icon className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <Card className={cn('relative overflow-hidden transition-all duration-300 hover:scale-[1.01] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border-l-4 border-l-[var(--primary-purple)] border-[var(--border-color)] hover:border-[var(--primary-purple)]/50 shadow-sm hover:shadow-md p-4 flex flex-col justify-between', className)}>
      <div className="flex items-center justify-between pb-2">
        <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{title}</span>
        {IconComponent && (
          <div className="p-2 rounded-xl bg-[var(--primary-purple)]/10 text-[var(--primary-purple)] border border-[var(--primary-purple)]/20">
            {renderIcon()}
          </div>
        )}
      </div>

      <div className="mt-1 flex items-baseline justify-between">
        <div className="text-2xl font-black text-[var(--text-primary)] tracking-tight">{value}</div>
      </div>

      {change !== undefined && (
        <div className="mt-2 flex items-center justify-between">
          <div
            className={cn(
              'inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border',
              trend === 'up'
                ? 'bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30'
                : trend === 'down'
                ? 'bg-[#ef4444]/15 text-[#ef4444] border-[#ef4444]/30'
                : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border-[var(--border-color)]'
            )}
          >
            {trend === 'up' ? (
              <ArrowUpRight className="w-3 h-3 mr-0.5" />
            ) : trend === 'down' ? (
              <ArrowDownRight className="w-3 h-3 mr-0.5" />
            ) : (
              <Minus className="w-3 h-3 mr-0.5" />
            )}
            {typeof change === 'number' ? (change > 0 ? `+${change}%` : `${change}%`) : change}
          </div>
        </div>
      )}
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
