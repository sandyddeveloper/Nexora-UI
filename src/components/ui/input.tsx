import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leftIcon, rightIcon, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[var(--primary-purple)] z-10">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              'flex h-11 w-full rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] backdrop-blur-md transition-all duration-200 focus:outline-none focus:border-[var(--primary-purple)] focus:ring-2 focus:ring-[var(--primary-purple)]/25 disabled:cursor-not-allowed disabled:opacity-50 shadow-sm',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              error && 'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/25',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center z-10">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1.5 text-xs text-[#ef4444] font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] backdrop-blur-md transition-all duration-200 focus:outline-none focus:border-[var(--primary-purple)] focus:ring-2 focus:ring-[var(--primary-purple)]/25 disabled:cursor-not-allowed disabled:opacity-50 resize-y shadow-sm',
            error && 'border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/25',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-[#ef4444] font-medium">{error}</p>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
