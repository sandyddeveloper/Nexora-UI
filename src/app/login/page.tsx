"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import {
  Mail,
  Lock,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    try {
      const result = await login({
        username: username.trim(),
        password,
      });

      if (result.success) {
        // Direct Dashboard Routing Decision Tree
        if (result.active_role === "super_admin" || result.active_role === "staff") {
          // Internal Company Staff / Super Admin -> Platform Staff Dashboard
          router.push("/dashboard/staff");
        } else if (result.org_id) {
          // Client User with Active Organization -> Client Workspaces Dashboard
          router.push("/dashboard/workspaces");
        } else {
          // Individual User without Organization -> Organization Setup Wizard
          router.push("/onboarding/organization");
        }
      }
    } catch (err: any) {
      if (err?.errors && typeof err.errors === "object") {
        setFieldErrors(err.errors);
      }
      setErrorMessage(err?.message || "Invalid username/email or password.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors overflow-hidden">
      {/* Top Bar with Brand & Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Logo size="md" />
        </Link>

        <button
          onClick={toggleTheme}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
          title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} mode`}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4 text-amber-400" />
          ) : (
            <Moon className="h-4 w-4 text-purple-600" />
          )}
        </button>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl z-10 animate-in fade-in duration-300">
        <div className="text-center space-y-1.5 mb-6">
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Sign in with your username or email to access your workspace
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-4 flex items-center gap-2.5 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold animate-in fade-in duration-150">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
              Username or Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="you@company.com or username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={cn(
                  "w-full rounded-xl border bg-zinc-50 dark:bg-zinc-800/80 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500",
                  fieldErrors.username ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                )}
              />
            </div>
            {fieldErrors.username && (
              <p className="mt-1 text-[11px] font-semibold text-red-600">{fieldErrors.username.join(" ")}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={cn(
                  "w-full rounded-xl border bg-zinc-50 dark:bg-zinc-800/80 pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500",
                  fieldErrors.password ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                )}
              />
            </div>
            {fieldErrors.password && (
              <p className="mt-1 text-[11px] font-semibold text-red-600">{fieldErrors.password.join(" ")}</p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-zinc-300 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5"
              />
              <span>Remember this session</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 text-sm font-bold shadow-md shadow-purple-600/20"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Sign In to Platform
          </Button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup" className="font-bold text-purple-600 dark:text-purple-400 hover:underline">
            Create account
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={isForgotModalOpen}
        onClose={() => {
          setIsForgotModalOpen(false);
          setResetSent(false);
        }}
        title="Reset Password"
        description="Enter your registered email address to receive password recovery instructions."
      >
        {resetSent ? (
          <div className="py-4 text-center space-y-2">
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Recovery Email Sent!</h4>
            <p className="text-xs text-zinc-500">Check your inbox for a link to reset your password.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                setIsForgotModalOpen(false);
                setResetSent(false);
              }}
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setResetSent(true);
            }}
            className="space-y-4 pt-2"
          >
            <Input
              label="Email"
              type="email"
              placeholder="you@company.com"
              defaultValue={username}
              required
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsForgotModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Send Reset Link
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
