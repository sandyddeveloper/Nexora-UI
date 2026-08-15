"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, ShieldCheck, Clock, BellRing, CheckCircle2, RefreshCw, Mail } from "lucide-react";

export default function MaintenancePage() {
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setNotified(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Friendly Visual Icon */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 shadow-sm mx-auto">
            <Sparkles className="h-12 w-12" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="purple" size="md">
                Scheduled Maintenance
              </Badge>
              <span className="text-xs font-medium text-zinc-500">Back in ~15 mins</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              We&apos;re Improving Your Experience
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              Nexora is currently undergoing scheduled platform updates to give you faster speeds and better reliability. We&apos;ll be right back!
            </p>
          </div>

          {/* User Reassurance Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Data Safe & Secure</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">All workspaces and files are fully protected and untouched.</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
              <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Almost Done</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">Estimated completion in approximately 15 minutes.</p>
              </div>
            </div>
          </div>

          {/* Email Notification Subscription Form */}
          <div className="p-6 rounded-3xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 max-w-md mx-auto">
            {notified ? (
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-purple-700 dark:text-purple-300 py-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600" />
                <span>We&apos;ll email you the moment we&apos;re back online!</span>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  <BellRing className="h-3.5 w-3.5 text-purple-600" />
                  <span>Get notified as soon as we&apos;re back:</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <Button variant="primary" size="sm" type="submit">
                    Notify Me
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Refresh Page Action */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="md"
              onClick={() => window.location.reload()}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
