"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrganization } from "@/context/OrganizationContext";
import { CreateOrganizationModal } from "@/components/organizations/CreateOrganizationModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { countryCodeToFlag } from "@/hooks/useLanguages";
import {
  Building2,
  Plus,
  Search,
  CheckCircle2,
  ShieldCheck,
  Server,
  Layers,
  Users,
  Globe,
  Coins,
  Clock,
  ExternalLink,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkspacesPage() {
  const { role } = useAuth();
  const { organizations, currentOrganization, switchOrganization, isLoading } = useOrganization();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const isStaff = role === "staff";

  const filteredOrgs = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.country_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (org.tenant?.tenant_id && org.tenant.tenant_id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Workspaces & Organizations
            </h1>
            <Badge variant="purple" size="sm">Phase 1 Multi-Tenant</Badge>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Manage multi-tenant isolated enterprise workspaces, schema partitions, and regional compliance.
          </p>
        </div>

        {isStaff ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
            className="shadow-sm"
          >
            Create Organization
          </Button>
        ) : (
          <Badge variant="gray" size="md">
            <Shield className="h-3.5 w-3.5 mr-1 text-purple-600" />
            Staff Managed Provisioning
          </Badge>
        )}
      </div>

      {/* Active Organization Hero Banner */}
      {currentOrganization && (
        <div className="rounded-3xl bg-linear-to-r from-purple-900/10 via-purple-600/5 to-transparent border border-purple-200/80 dark:border-purple-800/80 p-6 sm:p-7 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-md">
                {currentOrganization.name.charAt(0).toUpperCase()}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50">
                    {currentOrganization.name}
                  </h2>
                  <span className="text-lg leading-none">
                    {countryCodeToFlag(currentOrganization.country_code)}
                  </span>
                  <Badge variant="emerald" size="sm" dot>Active Workspace</Badge>
                  {currentOrganization.organization_type && (
                    <Badge variant="purple" size="sm">
                      {currentOrganization.organization_type.toUpperCase()}
                    </Badge>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                  <span>Tenant ID: <strong className="text-purple-600 dark:text-purple-400">{currentOrganization.tenant?.tenant_id || `org_${currentOrganization.id}`}</strong></span>
                  <span>•</span>
                  <span>Schema: <strong className="text-zinc-700 dark:text-zinc-300">{currentOrganization.tenant?.schema_name || `tenant_${currentOrganization.slug}`}</strong></span>
                  <span>•</span>
                  <span>Currency: <strong className="text-zinc-700 dark:text-zinc-300">{currentOrganization.currency}</strong></span>
                  <span>•</span>
                  <span>Timezone: <strong className="text-zinc-700 dark:text-zinc-300">{currentOrganization.timezone}</strong></span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start lg:self-center">
              <Badge variant="gray" size="md">
                <Users className="h-3.5 w-3.5 mr-1" />
                {currentOrganization.members_count || 1} Team Members
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Directory Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search organizations or tenant ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-9 pr-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <span className="text-xs text-zinc-400">
          Showing {filteredOrgs.length} of {organizations.length} organizations
        </span>
      </div>

      {/* Organizations Grid */}
      {filteredOrgs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center space-y-3 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
            <Building2 className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">No Organizations Found</h3>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto">
            {searchQuery ? `No organizations matched "${searchQuery}"` : "No tenant organizations have been registered yet."}
          </p>
          {isStaff && !searchQuery && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              leftIcon={<Plus className="h-3.5 w-3.5" />}
              className="mt-2"
            >
              Provision First Organization
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrgs.map((org) => {
            const isActive = currentOrganization?.id === org.id;
            const flag = countryCodeToFlag(org.country_code);

            return (
              <div
                key={org.id}
                className={cn(
                  "rounded-3xl border p-5 transition-all flex flex-col justify-between space-y-4 relative bg-white dark:bg-zinc-900",
                  isActive
                    ? "border-purple-600 ring-2 ring-purple-500/20 shadow-xs"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-purple-300 dark:hover:border-zinc-700"
                )}
              >
                {/* Header info */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 flex items-center justify-center font-bold text-sm">
                        {flag || org.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                          {org.name}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400">
                          {org.tenant?.tenant_id || `ID: #${org.id}`}
                        </span>
                      </div>
                    </div>

                    {org.status === "active" && (
                      <span className="h-2 w-2 rounded-full bg-emerald-500" title="Active Schema Partition" />
                    )}
                  </div>

                  {/* Metadata Tags */}
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between text-zinc-500">
                      <span>Country:</span>
                      <span className="font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                        <span>{flag}</span> {org.country_name || org.country_code}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-500">
                      <span>Schema:</span>
                      <span className="font-mono text-[10px] text-purple-600 dark:text-purple-400 truncate max-w-[150px]">
                        {org.tenant?.schema_name || "isolated"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-zinc-500">
                      <span>Defaults:</span>
                      <span className="text-zinc-700 dark:text-zinc-300">{org.currency} • {org.timezone}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <span className="text-xs text-zinc-400">
                    {org.members_count || 1} member{org.members_count === 1 ? "" : "s"}
                  </span>

                  {isActive ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400">
                      <Check className="h-3.5 w-3.5" /> Active Session
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => switchOrganization(org)}
                      className="text-xs"
                    >
                      Switch Workspace
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Creation Modal - Only Accessible to Staff */}
      {isStaff && (
        <CreateOrganizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
