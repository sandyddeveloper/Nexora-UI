"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrganization } from "@/context/OrganizationContext";
import { MetricChartCard } from "@/components/dashboard/MetricChartCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickActionsModal } from "@/components/dashboard/QuickActionsModal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { countryCodeToFlag } from "@/hooks/useLanguages";
import {
  Plus,
  ArrowUpRight,
  FolderKanban,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  Share2,
  Users,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UserDashboardPage() {
  const { user } = useAuth();
  const { currentOrganization, organizations } = useOrganization();
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
              Client Workspace Portal
            </span>
            <Badge variant="purple" size="sm">
              <Sparkles className="h-2.5 w-2.5 mr-1" /> Active Session
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Overview of your active workspace environments, isolated tenant schema, and team access.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/dashboard/workspaces">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              leftIcon={<Building2 className="h-3.5 w-3.5" />}
            >
              All Workspaces ({organizations.length})
            </Button>
          </Link>
          <Link href="/dashboard/team">
            <Button
              variant="primary"
              size="sm"
              className="text-xs"
              leftIcon={<Users className="h-4 w-4" />}
            >
              Team Directory
            </Button>
          </Link>
        </div>
      </div>

      {/* Dynamic Workspace Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Active Workspace</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 mt-2 truncate">
            {currentOrganization?.name || "No Active Org"}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
            {currentOrganization?.country_code ? (
              <span>{countryCodeToFlag(currentOrganization.country_code)} {currentOrganization.country_name || currentOrganization.country_code}</span>
            ) : (
              <span>Unassigned</span>
            )}
          </p>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Tenant Partition</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-sm font-mono font-bold text-purple-600 dark:text-purple-400 mt-2 truncate">
            {currentOrganization?.tenant?.tenant_id || "schema_isolated"}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {currentOrganization?.status === "active" ? "Dedicated Schema Active" : "Provisioning Ready"}
          </p>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Your Assigned Role</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <Shield className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 mt-2">
            {user?.title || "Organization Member"}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {user?.role === "staff" ? "Platform Administrator" : "Workspace Authorized"}
          </p>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Workspaces</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-2">
            {organizations.length}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {organizations.length === 1 ? "1 Assigned Tenant" : `${organizations.length} Accessible Tenants`}
          </p>
        </Card>
      </div>

      {/* Analytics Chart & Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <MetricChartCard
            title="Workspace API Invocations & Resource Utilization"
            description="Tenant traffic metrics and query rate distribution"
          />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed />
        </div>
      </div>

      {/* Active Workspaces Directory Card */}
      <Card id="workspaces">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>Your Tenant Workspaces</CardTitle>
              <Badge variant="purple" size="sm">{organizations.length} Active</Badge>
            </div>
            <CardDescription className="mt-1">
              Isolated database partitions and compliance regions
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/workspaces">
              <Button variant="outline" size="sm" className="text-xs" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
                Manage Workspaces
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent>
          {organizations.length === 0 ? (
            <div className="py-10 text-center space-y-2 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <Building2 className="h-8 w-8 text-zinc-400 mx-auto" />
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">No Workspaces Registered</p>
              <p className="text-[11px] text-zinc-400">Your company staff will provision and assign your client workspace.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                  <tr>
                    <th className="px-4 py-3">Workspace Name</th>
                    <th className="px-4 py-3">Tenant ID</th>
                    <th className="px-4 py-3">Region / Country</th>
                    <th className="px-4 py-3">Defaults</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 bg-white dark:bg-zinc-950">
                  {organizations.map((org) => (
                    <tr
                      key={org.id}
                      className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-colors"
                    >
                      <td className="px-4 py-3.5 font-bold text-zinc-900 dark:text-zinc-100">
                        {org.name}
                      </td>
                      <td className="px-4 py-3.5 text-purple-600 dark:text-purple-400 font-mono">
                        {org.tenant?.tenant_id || `org_${org.id}`}
                      </td>
                      <td className="px-4 py-3.5 text-zinc-600 dark:text-zinc-300">
                        <span className="flex items-center gap-1.5">
                          <span>{countryCodeToFlag(org.country_code)}</span>
                          <span>{org.country_name || org.country_code}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-zinc-500">
                        {org.currency} • {org.timezone}
                      </td>
                      <td className="px-4 py-3.5">
                        <Badge variant="emerald" dot size="sm">
                          {org.status || "Active"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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
