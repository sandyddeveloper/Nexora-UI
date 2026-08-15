"use client";

import React, { useState } from "react";
import { User, Shield, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PreviewSection() {
  const [tab, setTab] = useState<"user" | "staff">("user");

  return (
    <section id="preview" className="py-16 md:py-24 relative bg-zinc-50/60 dark:bg-zinc-950/60 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="purple" size="md">
            Interactive Product Preview
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            One Core Engine. Dedicated Experiences.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Switch between user growth metrics and staff operational workflows with a single click.
          </p>

          {/* Interactive Role Switcher Pill */}
          <div className="mt-6 inline-flex items-center rounded-2xl bg-white dark:bg-zinc-900 p-1.5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <button
              onClick={() => setTab("user")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all",
                tab === "user"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <User className="h-4 w-4" />
              Customer / User Dashboard
            </button>
            <button
              onClick={() => setTab("staff")}
              className={cn(
                "flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all",
                tab === "staff"
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              <Shield className="h-4 w-4" />
              Staff / Admin Operations
            </button>
          </div>
        </div>

        {/* Dashboard Frame Window */}
        <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-6 shadow-xl transition-colors">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs font-mono text-zinc-400 hidden sm:inline">
                https://nexora.app/dashboard/{tab === "staff" ? "staff" : "user"}
              </span>
            </div>

            <Link href={tab === "staff" ? "/dashboard/staff" : "/dashboard"}>
              <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Launch Full {tab === "staff" ? "Staff" : "User"} App
              </Button>
            </Link>
          </div>

          {/* Dynamic Mock View */}
          {tab === "user" ? (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* User Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Revenue</span>
                  <div className="mt-2 text-2xl font-extrabold text-purple-700 dark:text-purple-300">$48,250.00</div>
                  <Badge variant="emerald" size="sm" className="mt-2">+14.8% vs last month</Badge>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Active Workspaces</span>
                  <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">18 Teams</div>
                  <Badge variant="blue" size="sm" className="mt-2">3 new added</Badge>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">API Invocations</span>
                  <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">1.42M</div>
                  <Badge variant="purple" size="sm" className="mt-2">+28.4% capacity</Badge>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Collaborators</span>
                  <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">34 Active</div>
                  <Badge variant="emerald" size="sm" className="mt-2">All seats verified</Badge>
                </div>
              </div>

              {/* Chart simulation banner */}
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Live API Velocity Trend</h4>
                  <p className="text-xs text-zinc-500">Average response time: 22ms across 12 edge points of presence.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="purple" dot>Cluster Stable</Badge>
                  <Link href="/dashboard">
                    <Button variant="primary" size="sm">Explore Analytics</Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Staff Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Triage Queue</span>
                  <div className="mt-2 text-2xl font-extrabold text-purple-700 dark:text-purple-300">42 Tickets</div>
                  <Badge variant="rose" size="sm" className="mt-2">SLA target &lt; 15m</Badge>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Avg Resolution</span>
                  <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">1h 18m</div>
                  <Badge variant="emerald" size="sm" className="mt-2">24m faster</Badge>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Global Uptime</span>
                  <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">99.98%</div>
                  <Badge variant="emerald" size="sm" className="mt-2">All nodes online</Badge>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Verifications</span>
                  <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">9 Pending</div>
                  <Badge variant="amber" size="sm" className="mt-2">Tier-2 review</Badge>
                </div>
              </div>

              {/* Staff ticket preview */}
              <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Badge variant="rose" dot>Urgent SLA</Badge>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">#TICK-8842: Webhook latency spikes</h4>
                    <p className="text-xs text-zinc-500">Customer: Sarah Jenkins (Acme Corp) • SLA Time Left: 14 mins</p>
                  </div>
                </div>
                <Link href="/dashboard/staff">
                  <Button variant="primary" size="sm">Open Triage Station</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
