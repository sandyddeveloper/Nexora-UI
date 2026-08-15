"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { WifiOff, Wifi, RefreshCw, X, ArrowRight } from "lucide-react";

export function NetworkDetector() {
  const [isOnline, setIsOnline] = useState(true);
  const [showRestoredToast, setShowRestoredToast] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
      setDismissed(false);
      setShowRestoredToast(true);
      const timer = setTimeout(() => setShowRestoredToast(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setDismissed(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showRestoredToast) return null;

  return (
    <>
      {/* Offline Alert Banner */}
      {!isOnline && !dismissed && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-3 duration-300">
          <div className="rounded-2xl border border-red-200 dark:border-red-800 bg-white dark:bg-zinc-900 p-4 shadow-2xl flex items-start gap-3">
            <div className="h-9 w-9 rounded-xl bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
              <WifiOff className="h-5 w-5 animate-pulse" />
            </div>

            <div className="flex-1 text-left">
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Connection Lost</h4>
              <p className="text-[11px] text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                You appear to be offline. Workspace updates and realtime telemetry are paused.
              </p>

              <div className="mt-2.5 flex items-center gap-3">
                <Link
                  href="/connection-lost"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  <span>Troubleshoot</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>

                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reload</span>
                </button>
              </div>
            </div>

            <button
              onClick={() => setDismissed(true)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-lg"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Online Restored Toast */}
      {showRestoredToast && (
        <div className="fixed bottom-4 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/80 px-4 py-3 shadow-xl flex items-center gap-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
            <Wifi className="h-4 w-4 text-emerald-600" />
            <span>Connection restored! You are back online.</span>
          </div>
        </div>
      )}
    </>
  );
}
