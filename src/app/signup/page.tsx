"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { UserRole } from "@/types/auth";
import { Layers, Mail, Lock, User, Shield, ArrowRight, Sun, Moon, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const { signup, isLoading } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("user");
  const [agreed, setAgreed] = useState(true);

  // Simple password strength calculation
  const getPasswordStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/[0-9]/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;
    return score;
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    await signup(name, email, role);
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

      {/* Signup Card */}
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 p-6 sm:p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl z-10 animate-in fade-in duration-300 my-12">
        <div className="text-center space-y-1.5 mb-6">
          <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Get started with 14 days free trial. No credit card required.
          </p>
        </div>

        {/* Account Role Selector */}
        <div className="space-y-1.5 mb-4 text-left">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Account Role Preference
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole("user")}
              className={cn(
                "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all",
                role === "user"
                  ? "border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-purple-300"
              )}
            >
              <User className="h-3.5 w-3.5" />
              Standard User
            </button>
            <button
              type="button"
              onClick={() => setRole("staff")}
              className={cn(
                "flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all",
                role === "staff"
                  ? "border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20"
                  : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-purple-300"
              )}
            >
              <Shield className="h-3.5 w-3.5" />
              Staff / Admin
            </button>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Alex Morgan"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="h-4 w-4" />}
            required
          />

          <Input
            label="Work Email"
            type="email"
            placeholder="alex@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="h-4 w-4" />}
            required
          />

          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Create strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="h-4 w-4" />}
              required
            />
            {/* Password strength meter */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    style={{ width: `${strength}%` }}
                    className={cn(
                      "h-full transition-all duration-300",
                      strength <= 25 && "bg-red-500",
                      strength > 25 && strength <= 50 && "bg-amber-500",
                      strength > 50 && strength <= 75 && "bg-blue-500",
                      strength > 75 && "bg-emerald-500"
                    )}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-zinc-400">
                  <span>Strength</span>
                  <span className="font-semibold">
                    {strength <= 25 ? "Weak" : strength <= 50 ? "Fair" : strength <= 75 ? "Good" : "Excellent"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 rounded border-zinc-300 text-purple-600 focus:ring-purple-500 h-3.5 w-3.5"
              required
            />
            <label htmlFor="terms" className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed cursor-pointer">
              I agree to the{" "}
              <Link href="/terms" target="_blank" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" target="_blank" className="text-purple-600 dark:text-purple-400 font-semibold hover:underline">
                Privacy Policy
              </Link>.
            </label>
          </div>

          <Button
            type="submit"
            variant="purple-glow"
            className="w-full h-11 text-sm font-semibold"
            isLoading={isLoading}
            disabled={!agreed}
            rightIcon={<ArrowRight className="h-4 w-4" />}
          >
            Create Account & Launch
          </Button>
        </form>

        {/* Footer Link */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Already have an account?{" "}
          <Link href="/login" className="font-bold text-purple-600 dark:text-purple-400 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
