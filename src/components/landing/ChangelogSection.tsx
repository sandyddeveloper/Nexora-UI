"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Sparkles, ArrowRight, CheckCircle2, Calendar, Tag, Layers, Zap, Shield } from "lucide-react";

export function ChangelogSection() {
  return (
    <section className="py-16 md:py-24 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="purple" size="md">
            <Sparkles className="h-3 w-3 mr-1" /> What&apos;s New
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Shipped Fast. Built for Reliability.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            We deploy continuous improvements and performance optimizations every week.
          </p>
        </div>

        {/* Featured Release Highlight Card */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-purple-700 dark:text-purple-400 font-mono">
                v2.4.0
              </span>
              <Badge variant="purple" size="sm">
                Latest Major Release
              </Badge>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>August 15, 2026</span>
            </div>
          </div>

          <div className="py-6 space-y-4">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              Dual-Role Architecture & Real-Time Incident Triage Station
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Experience separated User growth metrics and Staff operational desks with 1-click RBAC switching, live SLA countdown trackers, and sub-50ms query processing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Separated User & Staff dashboard interfaces</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Live SLA ticket queue with instant resolver</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Offline network detection & reconnect test</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                <span>Class-based Dark/Light mode with solid palette</span>
              </div>
            </div>
          </div>

          {/* Card Footer CTA */}
          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <Tag className="h-3.5 w-3.5 text-purple-600" />
              <span>Previous releases: v2.3.5, v2.2.0, v2.0.0</span>
            </div>

            <Link href="/changelog" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="sm"
                className="w-full sm:w-auto"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                View Full Changelog & Notes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
