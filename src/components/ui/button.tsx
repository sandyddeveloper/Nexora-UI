import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b5cf6] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] text-white shadow-[0_4px_20px_rgba(139,92,246,0.35)] hover:from-[#7c3aed] hover:to-[#6d28d9] hover:shadow-[0_6px_24px_rgba(139,92,246,0.45)] hover:-translate-y-0.5 border border-[#c084fc]/30',
        secondary:
          'bg-white/[0.06] text-[var(--text-primary)] hover:bg-white/[0.12] border border-white/10 shadow-sm hover:-translate-y-0.5',
        glass:
          'bg-white/[0.04] backdrop-blur-md text-[var(--text-primary)] border border-white/10 hover:bg-white/[0.08] hover:border-[#8b5cf6]/40 shadow-sm hover:-translate-y-0.5',
        outline:
          'border border-white/15 bg-transparent text-[var(--text-primary)] hover:bg-white/[0.05] hover:border-[#8b5cf6]/50',
        ghost: 'text-[var(--text-muted)] hover:bg-white/10 hover:text-[var(--text-primary)]',
        danger:
          'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow-md hover:from-[#dc2626] hover:to-[#b91c1c] shadow-[0_4px_20px_rgba(239,68,68,0.35)]',
        success:
          'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold shadow-md hover:from-[#16a34a] hover:to-[#15803d]',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs rounded-md',
        sm: 'h-8 px-3 text-xs rounded-lg',
        md: 'h-10 px-4 text-sm rounded-xl',
        lg: 'h-12 px-6 text-base rounded-2xl',
        icon: 'h-9 w-9 p-0 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
        ) : leftIcon ? (
          <span className="mr-2 inline-flex items-center">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!isLoading && rightIcon ? <span className="ml-2 inline-flex items-center">{rightIcon}</span> : null}
      </button>
    );
  }
);
Button.displayName = 'Button';
