'use client';

import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { Card } from './card';

export interface AppCardProps {
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  isInstalled?: boolean;
  isAiEnabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export function AppCard({
  title,
  description,
  category,
  icon,
  isInstalled = true,
  isAiEnabled = true,
  onClick,
  className,
}: AppCardProps) {
  return (
    <Card
      onClick={onClick}
      className={cn(
        'group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] border-[var(--border-color)] hover:border-[var(--primary-purple)]/50 shadow-md hover:shadow-xl',
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-purple)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10 flex flex-col justify-between h-full gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--glass-bg)] border border-[var(--border-color)] text-[var(--primary-purple)] shadow-sm group-hover:border-[var(--primary-purple)]/50 group-hover:text-[var(--primary-purple)] transition-all">
            {icon}
          </div>
          <div className="flex items-center gap-1.5">
            {isAiEnabled && (
              <Badge variant="purple" className="text-[9px] px-1.5 py-0 flex items-center gap-1 bg-[var(--primary-purple)]/15 text-[var(--primary-purple)] border-[var(--primary-purple)]/30">
                <Sparkles className="h-2.5 w-2.5" /> AI Ready
              </Badge>
            )}
            <Badge variant={isInstalled ? 'purple' : 'outline'} className="text-[9px] px-1.5 py-0">
              {isInstalled ? 'Active' : 'Install'}
            </Badge>
          </div>
        </div>

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">{category}</span>
          <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--primary-purple)] transition-colors mt-0.5 flex items-center justify-between">
            <span>{title}</span>
            <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </h3>
          <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed">{description}</p>
        </div>
      </div>
    </Card>
  );
}
