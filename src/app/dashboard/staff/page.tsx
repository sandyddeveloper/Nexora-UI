"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useOrganization } from "@/context/OrganizationContext";
import { StaffTicketQueue } from "@/components/dashboard/StaffTicketQueue";
import { SystemHealthCard } from "@/components/dashboard/SystemHealthCard";
import { CreateOrganizationModal } from "@/components/organizations/CreateOrganizationModal";
import { CreateUserModal } from "@/components/staff/CreateUserModal";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  UserPlus,
  Plus,
  ArrowRight,
  Users,
  Server,
  Layers,
  Sparkles,
  Activity,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

export default function StaffDashboardPage() {
  const router = useRouter();
  const { user, role, isInitialized } = useAuth();
  const { organizations } = useOrganization();

  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isCreateOrgModalOpen, setIsCreateOrgModalOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  // Access Control: Normal user cannot see staff dashboard
  useEffect(() => {
    if (isInitialized && role !== "staff") {
      router.replace("/dashboard");
    }
  }, [isInitialized, role, router]);

  if (role !== "staff") {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <ShieldAlert className="h-10 w-10 text-amber-500 mb-3" />
        <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">Restricted Staff Area</h3>
        <p className="text-xs text-zinc-500 mt-1">Redirecting to your workspace dashboard...</p>
      </div>
    );
  }

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage("");
      setIsBroadcastModalOpen(false);
    }, 1500);
  };

  const activePartitionsCount = organizations.filter((o) => o.status === "active").length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Staff Command Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm" dot>
              Staff Shift Active: Super Admin Tier
            </Badge>
            <span className="text-xs text-zinc-400 font-mono">Company Staff Core</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Staff Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Provision client organizations, register client users & assign roles, and oversee tenant telemetry.
          </p>
        </div>

        {/* Staff Quick Action Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsCreateOrgModalOpen(true)}
            className="text-xs font-bold"
            leftIcon={<Building2 className="h-3.5 w-3.5" />}
          >
            + Provision Organization
          </Button>

          <Button
            variant="purple-glow"
            size="sm"
            onClick={() => setIsCreateUserModalOpen(true)}
            className="text-xs font-bold"
            leftIcon={<UserPlus className="h-3.5 w-3.5" />}
          >
            + Create User & Assign Role
          </Button>
        </div>
      </div>

      {/* 4 Dynamic Operational Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Client Tenants</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Building2 className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-2">
            {organizations.length}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            {organizations.length === 1 ? "1 Registered Organization" : `${organizations.length} Registered Organizations`}
          </p>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Active Schema Partitions</span>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-2">
            {activePartitionsCount}
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            PostgreSQL multi-tenant schemas
          </p>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Platform Core Services</span>
            <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Server className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-2">
            100%
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            All API endpoints operational
          </p>
        </Card>

        <Card variant="default" className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Authority Level</span>
            <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <ShieldCheck className="h-4 w-4" />
            </div>
          </div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 mt-2">
            Super Admin
          </h3>
          <p className="text-xs text-zinc-500 mt-1">
            Internal Company Staff
          </p>
        </Card>
      </div>

      {/* Support Incident Queue */}
      <div id="tickets">
        <StaffTicketQueue />
      </div>

      {/* Bottom Grid: Cluster Health & Active Operator Session */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Health Telemetry */}
        <div className="lg:col-span-2">
          <SystemHealthCard />
        </div>

        {/* Active Operator Session Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Staff Operator Session
              </CardTitle>
              <Badge variant="purple" size="sm">Active Shift</Badge>
            </div>
            <CardDescription>Internal Nexora company operator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.name || "Staff")}`}
                    alt="Staff"
                    className="h-9 w-9 rounded-xl object-cover ring-1 ring-purple-500/40"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{user?.name || "Staff Admin"}</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500" title="Online" />
                    </div>
                    <p className="text-[10px] text-zinc-400">Platform Operations • Super Admin Active</p>
                  </div>
                </div>
                <Badge variant="purple" size="sm">
                  Online
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Provision Organization Modal */}
      <CreateOrganizationModal
        isOpen={isCreateOrgModalOpen}
        onClose={() => setIsCreateOrgModalOpen(false)}
      />

      {/* Staff Create User & Assign Role Modal */}
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
      />
    </div>
  );
}
