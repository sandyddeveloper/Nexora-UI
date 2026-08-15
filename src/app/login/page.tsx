"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { UserRole } from "@/types/auth";
import { Layers, Mail, Lock, ArrowRight, User, Shield, Sun, Moon, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();

  const [email, setEmail] = useState("alex.morgan@company.com");
  const [password, setPassword] = useState("••••••••••••");
  const [role, setRole] = useState<UserRole>("user");
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, role);
  };

  const handleQuickDemo = async (demoRole: UserRole) => {
    if (demoRole === "staff") {
      setEmail("jordan.hayes@staff.nexora.io");
      setRole("staff");
      await login("jordan.hayes@staff.nexora.io", "staff");
    } else {
      setEmail("alex.morgan@company.com");
      setRole("user");
      await login("alex.morgan@company.com", "user");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 transition-colors overflow-hidden">
      {/* Top Bar with Brand & Theme Toggle */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
            <Layers className="h-4 w-4" />
          </div>
          <span className="font-extrabold text-base tracking-tight text-purple-700 dark:text-purple-400">
            NEXORA
          </span>
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
            Sign in to access your workspaces and operational command center
          </p>
        </div>

        {/* Quick Demo Role Selector */}
        <div className="p-3 mb-6 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/70 dark:border-purple-800/40 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-semibold text-purple-900 dark:text-purple-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-purple-600" /> Quick 1-Click Demo Login:
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickDemo("user")}
              className="text-xs justify-center bg-white dark:bg-zinc-900 font-semibold"
              leftIcon={<User className="h-3 w-3 text-purple-600" />}
            >
              As User
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleQuickDemo("staff")}
              className="text-xs justify-center bg-white dark:bg-zinc-900 font-semibold"
              leftIcon={<Shield className="h-3 w-3 text-purple-600" />}
            >
              As Staff
            </Button>
          </div>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setIsForgotModalOpen(true)}
                className="text-xs font-medium text-purple-600 dark:text-purple-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <Input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              required
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-zinc-300 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5"
              />
              <span>Remember this browser</span>
            </label>
          </div>

          <Button
            type="submit"
            variant="purple-glow"
            className="w-full h-11 text-sm font-semibold"
            isLoading={isLoading}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Sign In to Dashboard
          </Button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Don't have an account yet?{" "}
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
            <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Recovery Email Sent!</h4>
            <p className="text-xs text-zinc-500">Check your inbox for a magic link to reset your account password.</p>
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
              defaultValue={email}
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
