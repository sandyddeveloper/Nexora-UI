"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  ArrowLeft,
  Calendar,
  Tag,
  CheckCircle2,
  Zap,
  Shield,
  Layers,
  Search,
} from "lucide-react";

interface ReleaseItem {
  version: string;
  date: string;
  badge: "Major" | "Enhancement" | "Security" | "Patch";
  title: string;
  summary: string;
  features: string[];
  improvements: string[];
  fixes: string[];
}

const RELEASES: ReleaseItem[] = [
  {
    version: "v2.4.0",
    date: "August 15, 2026",
    badge: "Major",
    title: "Dual-Role Architecture & Real-Time Incident Triage Station",
    summary:
      "A landmark release introducing distinct user and staff operational environments, sub-50ms ticket resolution routing, and enhanced multi-tenant security guarantees.",
    features: [
      "Separated User and Staff dashboards with instant 1-click RBAC switching.",
      "Staff Ticket Queue with live SLA countdown timers and resolution status workflows.",
      "Global Network Detector with automatic reconnect ping diagnostics and offline alerts.",
      "Right-to-left high performance brand ticker and verified company ecosystems.",
    ],
    improvements: [
      "Solid purple theme system with zero gradient overhead for maximum clarity.",
      "Optimized Next.js App Router static compilation with 100% native Turbopack support.",
      "Enhanced keyboard search navigation with quick-jump Command+K triggers.",
    ],
    fixes: [
      "Fixed dark mode hydration sync to respect class-level toggles seamlessly.",
      "Resolved mobile menu overflow backdrop scrolling on iOS Safari.",
    ],
  },
  {
    version: "v2.3.5",
    date: "July 28, 2026",
    badge: "Enhancement",
    title: "Live Edge Analytics & Velocity Graphs",
    summary:
      "Upgraded cluster telemetry pipeline with 12 edge points of presence and instant P99 latency tracking.",
    features: [
      "Interactive multi-cycle comparison charts for workspace API traffic.",
      "Custom CSV and JSON export actions for analytical reports.",
    ],
    improvements: [
      "Reduced metric query latencies from 120ms to 24ms across global nodes.",
      "Enhanced dark mode contrast for high-density monitors.",
    ],
    fixes: [
      "Fixed timestamp timezone offset in staff audit logs.",
    ],
  },
  {
    version: "v2.2.0",
    date: "June 14, 2026",
    badge: "Security",
    title: "Enterprise SOC-2 Compliance & 2FA Enforcement",
    summary:
      "Comprehensive security hardening featuring mandatory Two-Factor Authentication, token rotation, and immutable session audit trails.",
    features: [
      "Time-based One-Time Password (TOTP) authenticator integration.",
      "Audit logging for all staff tier privilege escalations.",
      "Automated IP allowlisting for enterprise workspaces.",
    ],
    improvements: [
      "Upgraded database encryption to AES-256 in transit and at rest.",
      "Streamlined API secret generator with granular scope restrictions.",
    ],
    fixes: [
      "Resolved expired session edge token cache invalidation.",
    ],
  },
];

export default function ChangelogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTag, setFilterTag] = useState<string>("All");

  const filteredReleases = RELEASES.filter((rel) => {
    const matchesSearch =
      rel.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rel.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = filterTag === "All" || rel.badge === filterTag;

    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="purple" size="md">
              <Sparkles className="h-3 w-3 mr-1" /> Product Updates
            </Badge>
            <span className="text-xs font-mono text-zinc-400">Continuous Delivery</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Changelog & Release Notes
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Follow along with the newest features, architectural enhancements, security upgrades, and performance milestones shipped to Nexora.
          </p>

          {/* Search & Tag Filter Bar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search releases or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 pl-10 pr-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              {["All", "Major", "Enhancement", "Security"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    filterTag === tag
                      ? "bg-purple-600 text-white shadow-sm"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Release Timeline */}
        <div className="space-y-12 relative before:absolute before:left-3 sm:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
          {filteredReleases.map((release) => (
            <div key={release.version} className="relative pl-9 sm:pl-12 space-y-4">
              {/* Timeline Indicator Dot */}
              <div className="absolute left-1.5 sm:left-2.5 top-1.5 -translate-x-1/2 h-4 w-4 rounded-full bg-purple-600 ring-4 ring-purple-100 dark:ring-purple-950/80" />

              {/* Release Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xl sm:text-2xl font-black text-purple-700 dark:text-purple-400 font-mono">
                      {release.version}
                    </span>
                    <Badge
                      variant={
                        release.badge === "Major"
                          ? "purple"
                          : release.badge === "Security"
                          ? "rose"
                          : "blue"
                      }
                      size="sm"
                    >
                      {release.badge}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-medium">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{release.date}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    {release.title}
                  </h2>
                  <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {release.summary}
                  </p>
                </div>

                {/* What's New Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" /> New Capabilities
                  </h3>
                  <ul className="space-y-2">
                    {release.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Improvements Section */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Improvements & Performance
                  </h3>
                  <ul className="space-y-1.5">
                    {release.improvements.map((imp, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 shrink-0 mt-1.5" />
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fixes Section */}
                {release.fixes.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
                    <h3 className="text-xs font-bold text-zinc-500">Bug Fixes</h3>
                    <ul className="space-y-1 text-xs text-zinc-500">
                      {release.fixes.map((fix, idx) => (
                        <li key={idx}>• {fix}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredReleases.length === 0 && (
            <div className="p-12 text-center text-zinc-500 text-sm">
              No releases match your search query. Try searching for a different keyword.
            </div>
          )}
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
