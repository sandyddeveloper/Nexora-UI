'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Clock, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SessionExpiredPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/workspace';

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-8 text-center shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-warning)]/20 text-[var(--color-warning)]">
          <Clock className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Session Expired</h1>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          Your security access token has expired. Please log in again to continue your active enterprise session.
        </p>
        <Link href={`/login?redirect=${encodeURIComponent(redirectUrl)}`} className="w-full mt-4">
          <Button className="w-full bg-[var(--primary-purple)] text-white text-xs h-10 font-bold">
            <LogIn className="h-4 w-4 mr-2" /> Re-Authenticate
          </Button>
        </Link>
      </div>
    </div>
  );
}
