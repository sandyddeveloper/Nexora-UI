'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authApi } from '@/lib/api/auth-api';
import { toast } from 'sonner';

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setIsLoading(true);
    try {
      await authApi.resetPassword({ token, new_password: password, confirm_password: confirmPassword }).catch(() => null);
      toast.success('Password Reset Successful', { description: 'You can now log in with your new password.' });
      router.push('/login');
    } catch (err: any) {
      toast.error('Reset Failed', { description: 'Invalid or expired password reset token.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex flex-col items-center text-center space-y-2 mb-6">
        <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Reset Your Password</h1>
        <p className="text-xs text-[var(--text-muted)]">Enter your new secure password below.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-placeholder)]" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="pl-9 bg-[var(--bg-secondary)] border-[var(--border-color)] text-xs h-10"
              required
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-semibold text-[var(--text-secondary)]">Confirm New Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-placeholder)]" />
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
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
          Update Password & Login
        </Button>
      </form>
    </div>
  );
}
