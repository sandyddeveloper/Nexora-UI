'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTheme } from 'next-themes';
import {
  Zap,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  GitBranch,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Building2,
  Users,
  Shield,
  Eye,
  EyeOff,
} from 'lucide-react';
import { loginSchema, LoginFormData } from '@/utils/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StaggerContainer, StaggerItem, FadeIn, SlideUp } from '@/components/animations';
import { useMounted } from '@/hooks/use-mounted';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex@nexora.io',
      password: 'password123',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Authentication Successful', {
        description: 'Welcome back to Nexora Business OS.',
      });
      router.push('/workspace');
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-12 bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      {/* Left Column: Feature Banner & Telemetry Showcase (Desktop & Large screens) */}
      <div className="hidden lg:col-span-7 lg:flex flex-col items-center justify-between p-8 xl:p-14 bg-gradient-to-br from-[var(--surface)] via-[var(--bg-secondary)] to-[var(--surface-elevated)] relative overflow-hidden border-r border-[var(--border-color)] order-2 lg:order-1 min-h-screen">
        {/* Glowing Background Radial Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[480px] w-[480px] rounded-full bg-[var(--primary-purple)]/15 blur-[140px] pointer-events-none" />

        {/* Top Feature Pill Badges */}
        <div className="relative z-10 flex items-center justify-center gap-3 w-full">
          <Badge variant="purple" className="px-3 py-1 bg-[var(--primary-purple)]/15 text-[var(--primary-purple)] border-[var(--primary-purple)]/30 font-semibold text-xs flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 animate-pulse" /> AI Agent Engine Active
          </Badge>
          <Badge variant="outline" className="px-3 py-1 border-[var(--border-color)] text-[var(--text-secondary)] font-medium text-xs flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5 text-[#22c55e]" /> SOC2 Type II Certified
          </Badge>
        </div>

        {/* Center Hero Banner Content & Live Telemetry Showcase */}
        <div className="relative z-10 my-auto py-6 space-y-6 w-full max-w-lg mx-auto flex flex-col items-center">
          <StaggerContainer className="space-y-6 w-full flex flex-col items-center text-center">
            <StaggerItem className="w-full">
              <h2 className="text-3xl xl:text-4xl font-black text-[var(--text-primary)] tracking-tight leading-tight text-center">
                Unified Operating System for High-Growth Enterprises
              </h2>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed text-center max-w-md mx-auto">
                Orchestrate CRM deals, HRMS talent pipelines, Notion-like documentation, and background AI workflows from a single command center.
              </p>
            </StaggerItem>

            {/* Live Telemetry Preview Glass Card */}
            <StaggerItem className="w-full">
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--glass-bg)] p-5 backdrop-blur-2xl shadow-2xl space-y-4 text-left w-full">
                <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[var(--primary-purple)]/15 text-[var(--primary-purple)]">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">Acme Global Live Telemetry</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">Real-time enterprise metrics</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded-full border border-[#22c55e]/30">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-ping" /> Live Sync
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)] flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">Active Workflows</span>
                    <span className="text-base font-extrabold text-[var(--text-primary)] mt-1">128 Active</span>
                    <span className="text-[9px] text-[#22c55e] mt-0.5">+24.0% today</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)] flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">CRM Pipeline</span>
                    <span className="text-base font-extrabold text-[var(--text-primary)] mt-1">$2.45M</span>
                    <span className="text-[9px] text-[#22c55e] mt-0.5">48 qualified deals</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[var(--surface-elevated)] border border-[var(--border-color)] flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[var(--text-muted)]">SLA Uptime</span>
                    <span className="text-base font-extrabold text-[var(--text-primary)] mt-1">99.99%</span>
                    <span className="text-[9px] text-[var(--primary-purple)] mt-0.5">Zero anomalies</span>
                  </div>
                </div>
              </div>
            </StaggerItem>

            {/* Customer Testimonial Card */}
            <StaggerItem className="w-full">
              <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]/60 p-4 backdrop-blur-xl flex items-start gap-3.5 shadow-md text-left w-full">
                <Avatar className="h-10 w-10 shrink-0 border border-[var(--primary-purple)]/30">
                  <AvatarFallback className="bg-gradient-to-tr from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-xs font-bold">
                    SL
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-xs text-[var(--text-secondary)] italic leading-relaxed">
                    "Nexora consolidated our entire CRM, HRMS, and automated workflows into one cohesive, lightning-fast OS. It cut our operational friction by 60%."
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)]">Sarah Lin</span>
                    <span className="text-[10px] text-[var(--text-muted)]">VP of Technology @ Acme Global</span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>

        {/* Bottom Feature Badges Bar */}
        <div className="relative z-10 pt-4 border-t border-[var(--border-color)] flex items-center justify-center gap-6 w-full text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--primary-purple)]" />
            <span>Autonomous AI Workflows</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--primary-purple)]" />
            <span>Enterprise RBAC Roles</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[var(--primary-purple)]" />
            <span>Multi-Region Cloud Sync</span>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form & Theme Action Header */}
      <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-10 lg:p-14 xl:p-16 min-h-screen z-10 bg-[var(--bg-primary)] order-1 lg:order-2">
        {/* Top Header: Brand & Theme Toggle */}
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#8b5cf6] via-[#a855f7] to-[#c084fc] p-0.5 shadow-lg shadow-[#8b5cf6]/30 overflow-hidden">
              <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-[var(--bg-primary)] overflow-hidden">
                <Image src="/Nexora.png" alt="Nexora Business OS Logo" width={40} height={40} className="h-full w-full object-contain p-0.5" priority />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black tracking-wider text-[var(--text-primary)]">NEXORA</span>
              <span className="text-[9px] font-bold text-[var(--primary-purple)] tracking-widest uppercase">BUSINESS OS</span>
            </div>
          </Link>

          {/* Dark / Light Theme Switcher */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-all"
            title="Toggle Dark / Light Mode"
          >
            {mounted && theme === 'light' ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 text-purple-400" />
            )}
          </button>
        </div>

        {/* Center: Auth Card Form */}
        <SlideUp className="my-auto py-8 w-full max-w-md mx-auto">
          <div className="flex flex-col mb-8">
            <h1 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight">Welcome Back</h1>
            <p className="mt-2 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
              Sign in to access your unified CRM, HRMS, Documents, and Autonomous AI workflows.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-primary)] mb-1.5 uppercase tracking-wider">
                Work Email
              </label>
              <Input
                type="email"
                placeholder="alex@company.com"
                leftIcon={<Mail className="h-4 w-4 text-[var(--primary-purple)]" />}
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-[var(--text-primary)] uppercase tracking-wider">
                  Password
                </label>
                <a href="#" className="text-xs font-medium text-[var(--primary-purple)] hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                leftIcon={<Lock className="h-4 w-4 text-[var(--primary-purple)]" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors p-1"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                error={errors.password?.message}
                {...register('password')}
              />
            </div>

            <div className="flex items-center justify-between my-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[var(--text-muted)] select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--primary-purple)] focus:ring-[var(--primary-purple)]/40 h-4 w-4"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              variant="primary"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="mt-2 w-full py-2.5 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#8b5cf6]/25"
            >
              Authenticate & Launch OS
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--border-color)]" />
            </div>
            <span className="relative bg-[var(--bg-primary)] px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
              Or continue with SSO
            </span>
          </div>

          {/* Glossy SSO Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => router.push('/workspace')}
              className="group relative flex items-center justify-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[var(--primary-purple)]/60 hover:bg-[var(--state-hover)] transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--primary-purple)]/15 border border-[var(--primary-purple)]/30 text-[var(--primary-purple)] group-hover:scale-110 transition-transform">
                <GitBranch className="h-4 w-4" />
              </div>
              <span>GitHub SSO</span>
            </button>

            <button
              type="button"
              onClick={() => router.push('/workspace')}
              className="group relative flex items-center justify-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--surface-elevated)] p-2.5 text-xs font-semibold text-[var(--text-primary)] hover:border-[#22c55e]/60 hover:bg-[var(--state-hover)] transition-all duration-300 shadow-sm hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:-translate-y-0.5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] group-hover:scale-110 transition-transform">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <span>Okta SSO</span>
            </button>
          </div>
        </SlideUp>

        {/* Footer info */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[var(--text-muted)] gap-2 pt-4 border-t border-[var(--border-color)]">
          <span>© 2026 Nexora Inc. Enterprise OS v2.5</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[var(--text-primary)] transition-colors">Security Audit</a>
          </div>
        </div>
      </div>
    </div>
  );
}
