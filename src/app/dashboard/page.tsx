"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { USER_STATS, MOCK_PROJECT_TASKS } from "@/data/mockData";
import { StatCard } from "@/components/dashboard/StatCard";
import { MetricChartCard } from "@/components/dashboard/MetricChartCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActionsModal } from "@/components/dashboard/QuickActionsModal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Plus,
  ArrowUpRight,
  FolderKanban,
  CheckCircle2,
  Clock,
  Sparkles,
  Download,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"workspace" | "invite" | "apikey" | "ticket">("workspace");

  const openAction = (tab: "workspace" | "invite" | "apikey" | "ticket") => {
    setModalTab(tab);
    setIsActionModalOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Personalized Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Customer Growth Suite
            </span>
            <Badge variant="purple" size="sm">
              <Sparkles className="h-2.5 w-2.5 mr-1" /> Pro Plan Active
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "Alex"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Here is your workspace velocity, active deployment tasks, and revenue trends.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => openAction("apikey")}
            className="text-xs"
            leftIcon={<Share2 className="h-3.5 w-3.5" />}
          >
            API Credentials
          </Button>
          <Button
            variant="purple-glow"
            size="sm"
            onClick={() => openAction("workspace")}
            className="text-xs"
            leftIcon={<Plus className="h-4 w-4" />}
          >
            New Workspace
          </Button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {USER_STATS.map((stat) => (
          <StatCard key={stat.id} metric={stat} />
        ))}
      </div>

      {/* Analytics Chart & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <MetricChartCard
            title="API Invocations & Revenue Velocity"
            description="Cycle comparison of API payload volume and query bursts"
          />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* Active Workspaces & Deployment Tasks */}
      <Card id="workspaces">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>Active Workspace Projects</CardTitle>
              <Badge variant="purple" size="sm">4 In Progress</Badge>
            </div>
            <CardDescription className="mt-1">
              Real-time synchronization status and engineering sprint deliverables
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openAction("invite")}
              className="text-xs"
            >
              + Invite Teammate
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Task Deliverable</th>
                  <th className="px-4 py-3">Project Workspace</th>
                  <th className="px-4 py-3">Target Due</th>
                  <th className="px-4 py-3">Progress</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 bg-white dark:bg-zinc-950">
                {MOCK_PROJECT_TASKS.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-colors"
                  >
                    <td className="px-4 py-3.5 font-semibold text-zinc-900 dark:text-zinc-100">
                      {task.title}
                    </td>
                    <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-300">
                      <div className="flex items-center gap-1.5">
                        <FolderKanban className="h-3.5 w-3.5 text-purple-600" />
                        <span>{task.project}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-zinc-500 font-mono">
                      {task.dueDate}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                          <div
                            style={{ width: `${task.progress}%` }}
                            className={cn(
                              "h-full rounded-full transition-all",
                              task.progress === 100
                                ? "bg-emerald-500"
                                : "bg-purple-600 dark:bg-purple-500"
                            )}
                          />
                        </div>
                        <span className="text-[11px] font-mono text-zinc-500">{task.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      {task.status === "completed" ? (
                        <Badge variant="emerald">Completed</Badge>
                      ) : task.status === "in_progress" ? (
                        <Badge variant="purple" dot>In Flight</Badge>
                      ) : (
                        <Badge variant="amber">To Do</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Action Modal */}
      <QuickActionsModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        defaultAction={modalTab}
      />
    </div>
  );
}
