"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WifiOff, RefreshCw, CheckCircle2, Home, Radio, AlertOctagon } from "lucide-react";

export default function ConnectionLostPage() {
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleRetry = async () => {
    setIsChecking(true);
    setErrorMessage(null);

    try {
      // Attempt a no-cache head fetch
      const res = await fetch("/favicon.ico", { cache: "no-store", method: "HEAD" });
      if (res.ok) {
        // Connection is back, reload to restore application state
        window.location.href = "/";
      } else {
        setErrorMessage("Network is still unavailable. Please check your connection.");
      }
    } catch {
      setErrorMessage("Network is still unavailable. Please check your connection.");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Connection Lost Visual Icon */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 shadow-sm mx-auto">
            <WifiOff className="h-12 w-12" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="rose" size="md" dot>
                Offline • No Internet Connection
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Connection Lost
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              We&apos;re unable to reach the network. Please check your internet connection or Wi-Fi settings to continue using Nexora.
            </p>

            {errorMessage && (
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 dark:text-red-400 p-2.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 mt-2">
                <AlertOctagon className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          {/* User Troubleshooting Guide */}
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-md mx-auto text-left space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              <Radio className="h-4 w-4 text-purple-600" />
              <span>Things you can try:</span>
            </div>

            <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600 shrink-0" />
                <span>Check your Wi-Fi signal or ensure Ethernet cable is connected</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600 shrink-0" />
                <span>Turn off Airplane Mode if enabled on your device</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-600 shrink-0" />
                <span>Restart your local internet router or modem</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={handleRetry}
              isLoading={isChecking}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              Try Reconnecting
            </Button>

            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<Home className="h-4 w-4" />}>
                Go to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
