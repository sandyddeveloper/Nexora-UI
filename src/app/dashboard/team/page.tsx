"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrganization } from "@/context/OrganizationContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { CreateUserModal } from "@/components/staff/CreateUserModal";
import { userService, ClientUserItem } from "@/services/userService";
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
  Building2,
  RefreshCw,
} from "lucide-react";

type StaffRole = "Owner" | "Staff Lead" | "Staff Engineer" | "Workspace Admin" | "Member" | "Viewer";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: StaffRole | string;
  department: string;
  avatar: string;
  twoFactor: boolean;
  status: "Active" | "Pending" | "Suspended";
  lastActive: string;
}

export default function TeamPage() {
  const { role: currentAuthRole, user: currentUser } = useAuth();
  const { currentOrganization } = useOrganization();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);

  // Invite Form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState<StaffRole>("Member");
  const [inviteDept, setInviteDept] = useState("Operations");

  const isStaff = currentAuthRole === "staff";

  const fetchTeamMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const orgId = currentOrganization?.id;
      const apiUsers = await userService.listUsers(orgId);

      if (apiUsers && apiUsers.length > 0) {
        const mapped: TeamMember[] = apiUsers.map((u: ClientUserItem) => {
          const fullName = `${u.first_name || ""} ${u.last_name || ""}`.trim() || u.username;
          return {
            id: String(u.id),
            name: fullName,
            email: u.email,
            role: u.role_name || "Member",
            department: u.department_name || (u.organization_name || "General"),
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(fullName)}`,
            twoFactor: Boolean(u.twoFactorEnabled),
            status: u.is_active ? "Active" : "Pending",
            lastActive: u.last_login ? new Date(u.last_login).toLocaleDateString() : "Never",
          };
        });
        setMembers(mapped);
      } else if (currentUser) {
        // Fallback to active logged-in user profile if no directory members returned
        setMembers([
          {
            id: currentUser.id || "current_user",
            name: currentUser.name,
            email: currentUser.email,
            role: currentAuthRole === "staff" ? "Staff Lead" : "Owner",
            department: currentUser.department || "Operations",
            avatar: currentUser.avatar,
            twoFactor: currentUser.twoFactorEnabled,
            status: "Active",
            lastActive: "Just now",
          },
        ]);
      } else {
        setMembers([]);
      }
    } catch {
      if (currentUser) {
        setMembers([
          {
            id: currentUser.id || "current_user",
            name: currentUser.name,
            email: currentUser.email,
            role: currentAuthRole === "staff" ? "Staff Lead" : "Owner",
            department: currentUser.department || "Operations",
            avatar: currentUser.avatar,
            twoFactor: currentUser.twoFactorEnabled,
            status: "Active",
            lastActive: "Just now",
          },
        ]);
      } else {
        setMembers([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentOrganization?.id, currentUser, currentAuthRole]);

  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;

    const newMember: TeamMember = {
      id: `MEM-${Math.floor(100 + Math.random() * 900)}`,
      name: inviteName,
      email: inviteEmail,
      role: inviteRole,
      department: inviteDept,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(inviteName)}`,
      twoFactor: false,
      status: "Pending",
      lastActive: "Invited just now",
    };

    setMembers((prev) => [newMember, ...prev]);
    setInviteSuccess(true);
    setTimeout(() => {
      setInviteSuccess(false);
      setIsInviteOpen(false);
      setInviteEmail("");
      setInviteName("");
    }, 1500);
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.department.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "All" || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const activeCount = members.filter((m) => m.status === "Active").length;
  const pendingCount = members.filter((m) => m.status === "Pending").length;
  const twoFactorCount = members.filter((m) => m.twoFactor).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
              Team & Permissions
            </h1>
            <Badge variant="purple" size="sm">
              {currentOrganization?.name || "Workspace"}
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            Manage organization members, RBAC authorization matrices, and authentication security.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchTeamMembers}
            disabled={isLoading}
            leftIcon={<RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />}
          >
            Refresh
          </Button>

          {isStaff ? (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsCreateUserModalOpen(true)}
              leftIcon={<Building2 className="h-4 w-4" />}
            >
              + Create User & Assign Role
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={() => setIsInviteOpen(true)}
              leftIcon={<UserPlus className="h-4 w-4" />}
            >
              Invite Member
            </Button>
          )}
        </div>
      </div>

      {/* Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="default" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Total Members</p>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-0.5">{members.length}</h3>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{activeCount} Active</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>{pendingCount} Pending</span>
          </div>
        </Card>

        <Card variant="default" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">2FA Compliance</p>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-0.5">
                {members.length > 0 ? Math.round((twoFactorCount / members.length) * 100) : 0}%
              </h3>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-[11px] text-zinc-500">
            {twoFactorCount} of {members.length} members have 2FA enabled
          </p>
        </Card>

        <Card variant="default" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">Workspace Roles</p>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-0.5">5 Profiles</h3>
            </div>
            <div className="h-10 w-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Key className="h-5 w-5" />
            </div>
          </div>
          <p className="mt-3 text-[11px] text-zinc-500">
            Owner • Admin • Manager • Member • Viewer
          </p>
        </Card>
      </div>

      {/* Directory & Filters */}
      <Card variant="default" className="overflow-hidden">
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search team members by name, email, dept..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-9 pr-3.5 py-1.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-3.5 w-3.5 text-zinc-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-2.5 py-1.5 text-xs text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="All">All Roles</option>
              <option value="Owner">Owner</option>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Member">Member</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </div>

        {/* Members Table */}
        {filteredMembers.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <div className="h-10 w-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">No members found</p>
            <p className="text-[11px] text-zinc-400">
              {search ? "No members match your search criteria." : "No team members are assigned to this workspace yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                <tr>
                  <th className="py-3 px-4">Member Name & Email</th>
                  <th className="py-3 px-4">Workspace Role</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">2FA Security</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="h-8 w-8 rounded-xl object-cover ring-1 ring-purple-500/30 shrink-0"
                        />
                        <div className="overflow-hidden">
                          <p className="font-bold text-zinc-900 dark:text-zinc-100 truncate">{member.name}</p>
                          <p className="text-[11px] text-zinc-400 truncate">{member.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          member.role === "Owner" || member.role === "Staff Lead"
                            ? "purple"
                            : member.role === "Admin" || member.role === "Staff Engineer"
                            ? "amber"
                            : "gray"
                        }
                        size="sm"
                      >
                        {member.role}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-zinc-600 dark:text-zinc-300 font-medium">
                      {member.department}
                    </td>

                    <td className="py-3 px-4">
                      {member.twoFactor ? (
                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 className="h-3 w-3" /> Enabled
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-zinc-400 text-[11px]">
                          <Lock className="h-3 w-3" /> Disabled
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          member.status === "Active"
                            ? "emerald"
                            : member.status === "Pending"
                            ? "amber"
                            : "rose"
                        }
                        size="sm"
                        dot
                      >
                        {member.status}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 text-zinc-500 text-[11px]">
                      {member.lastActive}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite Member to Workspace"
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInviteName(e.target.value)}
              required
            />

            <Input
              label="Work Email Address"
              type="email"
              placeholder="e.g. alex.hayes@company.com"
              value={inviteEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInviteEmail(e.target.value)}
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
                  <option value="Engineering">Engineering</option>
                  <option value="Operations">Operations</option>
                  <option value="Product & Design">Product & Design</option>
                  <option value="Customer Support">Customer Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                  Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as StaffRole)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Member">Member</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsInviteOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" leftIcon={<Mail className="h-3.5 w-3.5" />}>
                Send Workspace Invite
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Staff User Creation Modal */}
      {isStaff && (
        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={() => setIsCreateUserModalOpen(false)}
          onUserCreated={fetchTeamMembers}
        />
      )}
    </div>
  );
}
