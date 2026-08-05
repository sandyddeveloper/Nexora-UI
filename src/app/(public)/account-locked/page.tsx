'use client';

import React from 'react';
import Link from 'next/link';
import { Lock, ShieldAlert, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AccountLockedPage() {
  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-8 text-center shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-danger)]/20 text-[var(--color-danger)]">
          <Lock className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Account Temporarily Locked</h1>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Due to multiple consecutive failed authentication attempts, your account has been temporarily locked to protect organizational security.
        </p>
        <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] text-left w-full mt-2">
          <p className="font-bold text-[var(--text-primary)] mb-1">Security Protocol</p>
          <p>Please wait 15 minutes or click below to request an account unlock link via email.</p>
        </div>
        <Link href="/forgot-password" className="w-full mt-4">
          <Button className="w-full bg-[var(--primary-purple)] text-white text-xs h-10 font-bold">
            <Mail className="h-4 w-4 mr-2" /> Unlock via Email Reset
          </Button>
        </Link>
      </div>
    </div>
  );
}
