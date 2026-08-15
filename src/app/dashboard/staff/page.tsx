"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { STAFF_STATS } from "@/data/mockData";
import { StatCard } from "@/components/dashboard/StatCard";
import { StaffTicketQueue } from "@/components/dashboard/StaffTicketQueue";
import { SystemHealthCard } from "@/components/dashboard/SystemHealthCard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  Zap,
  Users,
  Server,
  BellRing,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";

const ON_CALL_STAFF = [
  { name: "Jordan Hayes", role: "Primary Tier-2 Lead", activeTickets: 6, shift: "08:00 - 16:00 EST", status: "online" },
  { name: "Alex Chen", role: "DevOps / Infra SRE", activeTickets: 3, shift: "08:00 - 16:00 EST", status: "online" },
  { name: "Elena Rostova", role: "Billing Specialist", activeTickets: 4, shift: "09:00 - 17:00 EST", status: "away" },
  { name: "Marcus Vance", role: "Security & SAML Lead", activeTickets: 1, shift: "12:00 - 20:00 EST", status: "online" },
];

export default function StaffDashboardPage() {
  const { user } = useAuth();
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastSent, setBroadcastSent] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState("");

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage("");
      setIsBroadcastModalOpen(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Staff Command Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm" dot>
              Staff Shift Active: Tier-2 On Call
            </Badge>
            <span className="text-xs text-zinc-400 font-mono">Operator ID: #STF-44021</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Staff Operations Center
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Triage customer incidents, oversee cluster health percentiles, and resolve SLA escalations.
          </p>
        </div>

        {/* Staff Quick Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsBroadcastModalOpen(true)}
            className="text-xs"
            leftIcon={<BellRing className="h-3.5 w-3.5 text-amber-500" />}
          >
            System Broadcast
          </Button>
          <Button
            variant="purple-glow"
            size="sm"
            className="text-xs"
            leftIcon={<ShieldAlert className="h-3.5 w-3.5" />}
          >
            Trigger Incident Escalation
          </Button>
        </div>
      </div>

      {/* 4 Staff Operational Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {STAFF_STATS.map((stat) => (
          <StatCard key={stat.id} metric={stat} />
        ))}
      </div>

      {/* Dedicated Support Ticket Queue */}
      <div id="tickets">
        <StaffTicketQueue />
      </div>

      {/* Infrastructure Health & On-Call Shift Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch" id="system">
        <div className="lg:col-span-2">
          <SystemHealthCard />
        </div>

        {/* On-Call Team Roster */}
        <div className="lg:col-span-1">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">On-Call Staff Roster</CardTitle>
                <Badge variant="emerald" size="sm" dot>4 Active</Badge>
              </div>
              <CardDescription>Engineers assigned to active SLA rotation</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                {ON_CALL_STAFF.map((staff, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{staff.name}</span>
                      <span className="text-[10px] text-zinc-400">{staff.role}</span>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                        {staff.activeTickets} tickets
                      </span>
                      <p className="text-[9px] text-zinc-400">{staff.shift}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Broadcast Modal */}
      <Modal
        isOpen={isBroadcastModalOpen}
        onClose={() => {
          setIsBroadcastModalOpen(false);
          setBroadcastSent(false);
        }}
        title="Global System Status Broadcast"
        description="Publish an emergency banner or maintenance notice to all active customer dashboards."
      >
        {broadcastSent ? (
          <div className="py-6 text-center space-y-2">
            <ShieldCheck className="h-10 w-10 text-emerald-500 mx-auto" />
            <h4 className="text-sm font-bold">Broadcast Published!</h4>
            <p className="text-xs text-zinc-500">Notice pushed to all connected client webhooks & headers.</p>
          </div>
        ) : (
          <form onSubmit={handleBroadcast} className="space-y-4 pt-2">
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Notice Severity
              </label>
              <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100">
                <option>Information / Scheduled Maintenance</option>
                <option>Degraded Performance Notice</option>
                <option>Emergency Service Outage</option>
              </select>
            </div>

            <Input
              label="Broadcast Banner Text"
              placeholder="e.g. Scheduled database indexing will occur at 02:00 UTC."
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              required
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsBroadcastModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Publish to All Workspaces
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
