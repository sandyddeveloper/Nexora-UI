'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-8 text-center shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-danger)]/20 text-[var(--color-danger)]">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-black text-[var(--text-primary)]">403 Unauthorized Access</h1>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          You do not have administrative permissions to view the requested page or resource.
        </p>
        <Link href="/workspace" className="w-full mt-4">
          <Button variant="outline" className="w-full border-[var(--border-color)] text-xs h-10 font-bold">
            <ArrowLeft className="h-4 w-4 mr-2" /> Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
