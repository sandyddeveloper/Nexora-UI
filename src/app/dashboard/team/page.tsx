"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Search,
  ShieldAlert,
  CheckCircle2,
  Lock,
  Key,
  Mail,
  MoreVertical,
  Trash2,
  Edit2,
  Sparkles,
  Filter,
} from "lucide-react";

type StaffRole = "Owner" | "Staff Lead" | "Staff Engineer" | "Workspace Admin" | "Member" | "Viewer";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: StaffRole;
  department: string;
  avatar: string;
  twoFactor: boolean;
  status: "Active" | "Pending" | "Suspended";
  lastActive: string;
}

const INITIAL_MEMBERS: TeamMember[] = [
  {
    id: "MEM-001",
    name: "Jordan Hayes",
    email: "jordan.hayes@staff.nexora.io",
    role: "Staff Lead",
    department: "Reliability & SRE",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    twoFactor: true,
    status: "Active",
    lastActive: "Just now",
  },
  {
    id: "MEM-002",
    name: "Elena Vance",
    email: "elena.vance@nexora.io",
    role: "Owner",
    department: "Executive",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    twoFactor: true,
    status: "Active",
    lastActive: "15 mins ago",
  },
  {
    id: "MEM-003",
    name: "David Chen",
    email: "david.chen@staff.nexora.io",
    role: "Staff Engineer",
    department: "Core Edge Engine",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    twoFactor: true,
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: "MEM-004",
    name: "Marcus Sterling",
    email: "marcus.sterling@staff.nexora.io",
    role: "Staff Engineer",
    department: "Incident Triage",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    twoFactor: true,
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: "MEM-005",
    name: "Sarah Jenkins",
    email: "sarah.j@acmecorp.com",
    role: "Workspace Admin",
    department: "Customer Organization",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    twoFactor: true,
    status: "Active",
    lastActive: "Yesterday",
  },
  {
    id: "MEM-006",
    name: "Tariq Al-Mansoor",
    email: "tariq.m@staff.nexora.io",
    role: "Staff Engineer",
    department: "Security & Compliance",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    twoFactor: false,
    status: "Pending",
    lastActive: "Invited 2 days ago",
  },
];

export default function TeamPage() {
  const { role: currentAuthRole } = useAuth();
  const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Invite Form State
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteDept, setInviteDept] = useState("Reliability & SRE");
  const [inviteRole, setInviteRole] = useState<StaffRole>("Staff Engineer");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newMember: TeamMember = {
      id: `MEM-${Math.floor(100 + Math.random() * 900)}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      department: inviteDept,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      twoFactor: false,
      status: "Pending",
      lastActive: "Invited just now",
    };

    setMembers([newMember, ...members]);
    setInviteSuccess(true);

    setTimeout(() => {
      setInviteSuccess(false);
      setIsInviteOpen(false);
      setInviteName("");
      setInviteEmail("");
    }, 1500);
  };

  const handleRemoveMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "All" || m.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="md">
              <ShieldCheck className="h-3 w-3 mr-1" /> Staff & RBAC Permissions
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Team & Permissions Management
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage staff engineering roster, role assignments, two-factor compliance, and invitation workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsInviteOpen(true)}
            leftIcon={<UserPlus className="h-4 w-4" />}
          >
            Invite Staff Member
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Total Staff Roster</span>
            <Users className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-purple-700 dark:text-purple-300">
            {members.length} Members
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">Across 5 departments</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">2FA Compliance</span>
            <Lock className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
            94.2%
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">SOC-2 Compliant</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Active Staff SREs</span>
            <ShieldCheck className="h-4 w-4 text-purple-600" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
            5 On-Call
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">Triage response &lt; 15 mins</p>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">Pending Invites</span>
            <Mail className="h-4 w-4 text-amber-500" />
          </div>
          <div className="mt-2 text-2xl font-extrabold text-zinc-900 dark:text-zinc-100">
            {members.filter((m) => m.status === "Pending").length} Invites
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">Awaiting acceptance</p>
        </div>
      </div>

      {/* Roster Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Staff & Collaborators Directory
              </CardTitle>
              <CardDescription className="text-xs">
                Manage roles, department assignments, and security enforcement.
              </CardDescription>
            </div>

            {/* Filter & Search */}
            <div className="flex flex-col sm:flex-row items-center gap-2.5">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search staff by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 pl-9 pr-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full sm:w-auto rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">All Roles</option>
                <option value="Staff Lead">Staff Lead</option>
                <option value="Staff Engineer">Staff Engineer</option>
                <option value="Owner">Owner</option>
                <option value="Workspace Admin">Workspace Admin</option>
                <option value="Member">Member</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Staff Member</th>
                  <th className="pb-3">Role & Department</th>
                  <th className="pb-3">2FA Security</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Last Active</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3.5 pl-2">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-8 w-8 rounded-lg object-cover ring-2 ring-purple-500/20"
                        />
                        <div>
                          <div className="font-bold text-zinc-900 dark:text-zinc-100">{member.name}</div>
                          <div className="text-[11px] text-zinc-500">{member.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <div className="space-y-0.5">
                        <Badge
                          variant={
                            member.role === "Owner"
                              ? "rose"
                              : member.role.includes("Staff")
                              ? "purple"
                              : "blue"
                          }
                          size="sm"
                        >
                          {member.role}
                        </Badge>
                        <div className="text-[11px] text-zinc-500">{member.department}</div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      {member.twoFactor ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                          <ShieldAlert className="h-3.5 w-3.5" /> Pending Setup
                        </span>
                      )}
                    </td>

                    <td className="py-3.5">
                      <Badge
                        variant={member.status === "Active" ? "emerald" : "amber"}
                        size="sm"
                        dot
                      >
                        {member.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 text-zinc-500 font-medium">
                      {member.lastActive}
                    </td>

                    <td className="py-3.5 pr-2 text-right">
                      <button
                        onClick={() => handleRemoveMember(member.id)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        title="Remove Member"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Role Capabilities Matrix */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Role Permission Matrix
          </CardTitle>
          <CardDescription className="text-xs">
            Overview of access privileges across role tiers in Nexora.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">System Capability</th>
                  <th className="pb-3 text-center">Owner</th>
                  <th className="pb-3 text-center">Staff Lead</th>
                  <th className="pb-3 text-center">Staff Engineer</th>
                  <th className="pb-3 text-center">Workspace Member</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                <tr>
                  <td className="py-3 pl-2 font-medium">Resolve SLA Triage Queue Tickets</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-zinc-400">—</td>
                </tr>
                <tr>
                  <td className="py-3 pl-2 font-medium">Manage Global Edge Nodes & Clusters</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-zinc-400">—</td>
                  <td className="py-3 text-center text-zinc-400">—</td>
                </tr>
                <tr>
                  <td className="py-3 pl-2 font-medium">Elevate Staff Access & Role Assignments</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-zinc-400">—</td>
                  <td className="py-3 text-center text-zinc-400">—</td>
                </tr>
                <tr>
                  <td className="py-3 pl-2 font-medium">Manage Workspace Billing & Subscriptions</td>
                  <td className="py-3 text-center text-emerald-500">✓</td>
                  <td className="py-3 text-center text-zinc-400">—</td>
                  <td className="py-3 text-center text-zinc-400">—</td>
                  <td className="py-3 text-center text-emerald-500">✓ (Admin)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite Staff or Team Member"
        description="Provision a new staff operational seat or workspace collaborator."
      >
        {inviteSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Invitation Dispatched!</h4>
            <p className="text-xs text-zinc-500">An onboarding link has been sent to {inviteEmail}.</p>
          </div>
        ) : (
          <form onSubmit={handleInvite} className="space-y-4 pt-2">
            <Input
              label="Full Name"
              placeholder="e.g. Alex Hayes"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
              required
            />

            <Input
              label="Work Email Address"
              type="email"
              placeholder="alex.hayes@staff.nexora.io"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Department
                </label>
                <select
                  value={inviteDept}
                  onChange={(e) => setInviteDept(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Reliability & SRE">Reliability & SRE</option>
                  <option value="Core Edge Engine">Core Edge Engine</option>
                  <option value="Incident Triage">Incident Triage</option>
                  <option value="Security & Compliance">Security & Compliance</option>
                  <option value="Customer Success">Customer Success</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Role Tier
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as StaffRole)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Staff Engineer">Staff Engineer</option>
                  <option value="Staff Lead">Staff Lead</option>
                  <option value="Workspace Admin">Workspace Admin</option>
                  <option value="Member">Standard Member</option>
                  <option value="Viewer">Viewer (Read-Only)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Send Invitation
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
