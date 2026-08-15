"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle, RefreshCw, Home, WifiOff } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* Error Visual Icon */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 shadow-sm mx-auto">
            <AlertTriangle className="h-12 w-12" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="rose" size="md">
                Application Exception
              </Badge>
              {error.digest && (
                <span className="text-xs font-mono text-zinc-400">Digest: {error.digest}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Something Went Wrong
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              We encountered an unexpected error while processing this request. Our staff operations team has been notified.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => reset()}
              leftIcon={<RefreshCw className="h-4 w-4" />}
            >
              Try Again
            </Button>

            <Link href="/connection-lost" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<WifiOff className="h-4 w-4" />}>
                Check Connection
              </Button>
            </Link>

            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<Home className="h-4 w-4" />}>
                Homepage
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
