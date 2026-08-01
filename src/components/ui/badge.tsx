import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-[#4f8cff]/15 text-[#4f8cff] border border-[#4f8cff]/30',
        purple: 'bg-[#7c5cff]/15 text-[#a78bfa] border border-[#7c5cff]/30',
        success: 'bg-[#10d876]/15 text-[#10d876] border border-[#10d876]/30',
        warning: 'bg-[#f7b500]/15 text-[#f7b500] border border-[#f7b500]/30',
        danger: 'bg-[#ff5c7a]/15 text-[#ff5c7a] border border-[#ff5c7a]/30',
        destructive: 'bg-[#ff5c7a]/15 text-[#ff5c7a] border border-[#ff5c7a]/30',
        secondary: 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)]',
        outline: 'border border-white/20 text-slate-300 bg-white/[0.03]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
