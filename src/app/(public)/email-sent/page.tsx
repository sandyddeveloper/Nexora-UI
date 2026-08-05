'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EmailSentPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email address';
  const isReset = searchParams.get('type') === 'reset';

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-8 text-center shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
          <Mail className="h-8 w-8" />
        </div>
        <h1 className="text-xl font-black text-[var(--text-primary)]">Check Your Inbox</h1>
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          We sent {isReset ? 'a password reset link' : 'an email verification link'} to{' '}
          <span className="font-bold text-[var(--text-primary)]">{email}</span>.
        </p>
        <div className="p-3.5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[11px] text-[var(--text-muted)] text-left w-full mt-2 space-y-1">
          <p className="font-bold text-[var(--text-primary)] flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[var(--primary-purple)]" /> What happens next?
          </p>
          <p>Click the secure link in the email to complete authentication.</p>
        </div>
        <Link href="/login" className="w-full mt-4">
          <Button className="w-full bg-[var(--primary-purple)] text-white text-xs h-10 font-bold">
            Return to Sign In <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
