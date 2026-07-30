'use client';

import React from 'react';
import { ThemeProvider } from './theme-provider';
import { QueryProvider } from './query-provider';
import { Toaster } from 'sonner';
import { TooltipProvider } from '@radix-ui/react-tooltip';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <QueryProvider>
        <TooltipProvider delayDuration={200}>
          {children}
          <Toaster position="bottom-right" theme="dark" richColors />
        </TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
