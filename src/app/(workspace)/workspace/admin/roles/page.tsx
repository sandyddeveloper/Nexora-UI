'use client';

import React, { useState } from 'react';
import {
  Shield,
  Check,
  X,
  Plus,
  Save,
  Users,
  Lock,
  Sparkles,
  Info,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface PermissionResource {
  id: string;
  name: string;
  category: 'HRMS' | 'Projects' | 'Administration' | 'Platform';
}

const RESOURCES: PermissionResource[] = [
  { id: 'employees', name: 'Employee Profiles', category: 'HRMS' },
  { id: 'payroll', name: 'Payroll & Salaries', category: 'HRMS' },
  { id: 'leave', name: 'Leave Approvals', category: 'HRMS' },
  { id: 'projects', name: 'Project Creation', category: 'Projects' },
  { id: 'tasks', name: 'Task Management', category: 'Projects' },
  { id: 'time_logs', name: 'Time Logs', category: 'Projects' },
  { id: 'rbac', name: 'Roles & RBAC Config', category: 'Administration' },
  { id: 'audit_logs', name: 'Security Audit Logs', category: 'Administration' },
];

const ROLES = [
  { id: 'super_admin', name: 'Super Admin', description: 'Full system authorization across all workspace tenants' },
  { id: 'org_admin', name: 'Organization Admin', description: 'Administrative access for active organization' },
  { id: 'dept_manager', name: 'Department Manager', description: 'Managerial access bounded by department scope' },
  { id: 'employee', name: 'Standard Employee', description: 'Self-service view & task updates' },
];

export default function RolesPage() {
  const [selectedRole, setSelectedRole] = useState('dept_manager');
  const [matrix, setMatrix] = useState<Record<string, Record<string, boolean>>>({
    dept_manager: {
      employees: true,
      payroll: false,
      leave: true,
      projects: true,
      tasks: true,
      time_logs: true,
      rbac: false,
      audit_logs: false,
    },
  });

  const togglePermission = (resId: string) => {
    setMatrix((prev) => ({
      ...prev,
      [selectedRole]: {
        ...prev[selectedRole],
        [resId]: !prev[selectedRole]?.[resId],
      },
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <Shield className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Role-Based Access Control (RBAC) Architecture
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Define fine-grained permission matrixes, custom roles, and security boundaries across modules.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-xs">
            <Save className="h-4 w-4 mr-1.5" />
            Save Permission Matrix
          </Button>
        </div>
      </div>

      {/* Role Selection & Permission Matrix Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Roles List Left */}
        <div className="flex flex-col gap-3 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-4 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] px-2">
            System & Custom Roles
          </h3>
          <div className="flex flex-col gap-2">
            {ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all ${
                  selectedRole === role.id
                    ? 'border-[var(--primary-purple)] bg-[var(--primary-purple)]/10 text-[var(--text-primary)] shadow-sm'
                    : 'border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] hover:bg-[var(--state-hover)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">{role.name}</span>
                  {selectedRole === role.id && <Badge variant="purple">Active</Badge>}
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1 line-clamp-2">
                  {role.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid Right */}
        <div className="lg:col-span-3 flex flex-col gap-4 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">
                Permissions Matrix: {ROLES.find((r) => r.id === selectedRole)?.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Toggle resource entitlements for this role.</p>
            </div>
            <Badge variant="secondary">8 Protected Endpoints</Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[var(--text-muted)] uppercase text-[10px] font-bold">
                  <th className="p-3">Resource Target</th>
                  <th className="p-3">Domain Category</th>
                  <th className="p-3 text-center">Entitlement Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {RESOURCES.map((res) => {
                  const isGranted = !!matrix[selectedRole]?.[res.id];

                  return (
                    <tr key={res.id} className="hover:bg-[var(--state-hover)] transition-colors">
                      <td className="p-3 font-semibold text-[var(--text-primary)]">{res.name}</td>
                      <td className="p-3">
                        <Badge variant="secondary">{res.category}</Badge>
                      </td>
                      <td className="p-3 text-center">
                        <button
                          onClick={() => togglePermission(res.id)}
                          className={`inline-flex items-center justify-center h-8 w-20 rounded-xl font-bold text-xs transition-all ${
                            isGranted
                              ? 'bg-[var(--color-success)]/20 text-[var(--color-success)] border border-[var(--color-success)]/30'
                              : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)]'
                          }`}
                        >
                          {isGranted ? (
                            <>
                              <Check className="h-3.5 w-3.5 mr-1" />
                              Granted
                            </>
                          ) : (
                            <>
                              <X className="h-3.5 w-3.5 mr-1" />
                              Denied
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
