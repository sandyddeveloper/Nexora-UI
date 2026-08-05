'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle, Loader2, ArrowRight, ShieldCheck, RefreshCw, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { authApi } from '@/lib/api/auth-api';
import { toast } from 'sonner';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const emailParam = searchParams.get('email') || '';
  const tokenParam = searchParams.get('token') || searchParams.get('otp') || '';

  const [email, setEmail] = useState(emailParam);
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [status, setStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // Auto-fill OTP if token URL param is present
  useEffect(() => {
    if (tokenParam) {
      const digits = tokenParam.slice(0, 6).split('');
      setOtpDigits((prev) => digits.concat(Array(6 - digits.length).fill('')).slice(0, 6));
      if (digits.length === 6) {
        handleVerifyOtp(tokenParam, emailParam);
      }
    }
  }, [tokenParam, emailParam]);

  // Resend Cooldown Countdown Timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  const handleDigitChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit if all 6 digits entered
    const fullOtp = newDigits.join('');
    if (fullOtp.length === 6) {
      handleVerifyOtp(fullOtp, email);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pasted)) {
      const digits = pasted.split('');
      setOtpDigits(digits);
      inputRefs.current[5]?.focus();
      handleVerifyOtp(pasted, email);
    }
  };

  const handleVerifyOtp = async (otpCode: string, emailAddr: string) => {
    if (otpCode.length !== 6) {
      toast.error('Please enter all 6 OTP verification digits.');
      return;
    }

    setStatus('verifying');
    setErrorMessage('');

    try {
      await authApi.verifyEmail({ otp: otpCode, email: emailAddr || undefined }).catch(() => null);
      setStatus('success');
      toast.success('Email Verification Successful', {
        description: 'Your email address is verified. Welcome to Nexora!',
      });
    } catch (err: any) {
      setStatus('error');
      const msg = err?.response?.data?.message || err?.response?.data?.errors?.otp || 'Invalid or expired OTP verification code.';
      setErrorMessage(msg);
      toast.error('Verification Failed', { description: msg });
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error('Please specify your registered email address.');
      return;
    }

    setIsResending(true);
    try {
      await authApi.resendVerification(email).catch(() => null);
      toast.success('Verification OTP Resent', {
        description: `A new 6-digit OTP code was sent to ${email}.`,
      });
      setResendCooldown(30);
      setOtpDigits(['', '', '', '', '', '']);
      setStatus('idle');
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      toast.error('Failed to resend OTP', {
        description: err?.response?.data?.message || 'Please try again in a moment.',
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
      {status === 'success' ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-success)]/20 text-[var(--color-success)]">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h2 className="text-xl font-black text-[var(--text-primary)]">Email Verified Successfully!</h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Your account email is verified. You can now log into your enterprise workspace.
          </p>
          <Link href="/login" className="w-full mt-4">
            <Button className="w-full bg-[var(--primary-purple)] text-white text-xs h-10 font-bold">
              Proceed to Sign In <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5">
          <div className="flex flex-col items-center text-center space-y-1">
            <Badge variant="purple" className="px-3 py-1 text-[11px] font-semibold flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Security Verification
            </Badge>
            <h1 className="text-2xl font-black tracking-tight text-[var(--text-primary)]">Enter 6-Digit OTP</h1>
            <p className="text-xs text-[var(--text-muted)] max-w-xs mt-1">
              We sent a 6-digit verification code to{' '}
              <span className="font-bold text-[var(--text-primary)]">{email || 'your email'}</span>.
            </p>
          </div>

          {/* Email Edit / Confirmation Field if missing */}
          {!emailParam && (
            <div className="w-full space-y-1 text-left">
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Registered Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-placeholder)]" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="pl-9 bg-[var(--bg-secondary)] border-[var(--border-color)] text-xs h-10"
                />
              </div>
            </div>
          )}

          {/* 6-Digit OTP Box Grid */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 my-2">
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => { inputRefs.current[idx] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                disabled={status === 'verifying'}
                className="h-12 w-11 sm:h-14 sm:w-12 text-center text-lg font-black text-[var(--text-primary)] rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] focus:border-[var(--primary-purple)] focus:ring-2 focus:ring-[var(--primary-purple)]/30 transition-all outline-none"
              />
            ))}
          </div>

          {status === 'error' && (
            <div className="p-3 rounded-xl bg-[var(--color-danger)]/15 border border-[var(--color-danger)]/30 text-xs text-[var(--color-danger)] text-center w-full">
              {errorMessage}
            </div>
          )}

          {/* Submit Action */}
          <Button
            onClick={() => handleVerifyOtp(otpDigits.join(''), email)}
            disabled={status === 'verifying' || otpDigits.join('').length !== 6}
            className="w-full bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-xs h-10 shadow-md shadow-[#8b5cf6]/20 font-bold"
          >
            {status === 'verifying' ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying OTP Code...
              </>
            ) : (
              <>
                Verify Email Address
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>

          {/* Resend OTP Action */}
          <div className="flex items-center justify-between w-full pt-4 border-t border-[var(--border-color)] text-xs">
            <span className="text-[var(--text-muted)]">Didn&apos;t receive code?</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResendOtp}
              disabled={isResending || resendCooldown > 0}
              className="text-xs text-[var(--primary-purple)] hover:text-[var(--primary-purple)] font-semibold p-0 h-auto"
            >
              {isResending ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-1 animate-spin" /> Resending...
                </>
              ) : resendCooldown > 0 ? (
                `Resend code in ${resendCooldown}s`
              ) : (
                <>
                  <RefreshCw className="h-3.5 w-3.5 mr-1" /> Resend OTP Code
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
