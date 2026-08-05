'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/api/auth-api';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    try {
      await authApi.forgotPassword(email).catch(() => null);
      toast.success('Password Reset Email Sent', {
        description: 'Check your inbox for password reset instructions.',
      });
      router.push(`/email-sent?type=reset&email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      toast.error('Request Failed', {
        description: 'Unable to send password reset link.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col items-center text-center space-y-2 mb-6">
        <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Forgot Password?</h1>
        <p className="text-xs text-[var(--text-muted)]">
          Enter your registered email address to receive a secure password reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">Work Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-placeholder)]" />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@company.com"
              className="pl-9 bg-[var(--bg-secondary)] border-[var(--border-color)] text-xs h-10"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-xs h-10 shadow-md shadow-[#8b5cf6]/20 font-bold"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Send Reset Link
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-[var(--border-color)] text-center">
        <Link href="/login" className="inline-flex items-center text-xs font-bold text-[var(--primary-purple)] hover:underline">
          <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
