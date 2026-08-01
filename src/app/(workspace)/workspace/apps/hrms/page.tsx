'use client';

import React, { useState } from 'react';
import {
  UserCheck,
  Users,
  Calendar,
  CreditCard,
  Building2,
  Plus,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
  Sparkles,
  Download,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { DataGrid, Column } from '@/components/shared/data-grid';
import { OrgChart, OrgNode } from '@/components/shared/org-chart';
import { ContextDrawer } from '@/components/shared/context-drawer';
import { Wizard, WizardStep } from '@/components/shared/wizard';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';

interface Employee {
  id: string;
  name: string;
  code: string;
  email: string;
  role: string;
  department: string;
  type: 'Full-Time' | 'Contract' | 'Part-Time';
  status: 'Active' | 'On Leave' | 'Terminated';
  joinDate: string;
  salary: string;
  initials: string;
}

const MOCK_EMPLOYEES: Employee[] = [
  { id: 'EMP-101', name: 'Alex Morgan', code: 'NEX-0101', email: 'alex.morgan@nexora.io', role: 'Staff Software Engineer', department: 'Engineering', type: 'Full-Time', status: 'Active', joinDate: '2022-03-15', salary: '$165,000', initials: 'AM' },
  { id: 'EMP-102', name: 'Sarah Chen', code: 'NEX-0102', email: 'sarah.chen@nexora.io', role: 'Lead UX Architect', department: 'Product Design', type: 'Full-Time', status: 'Active', joinDate: '2021-08-01', salary: '$155,000', initials: 'SC' },
  { id: 'EMP-103', name: 'David Kim', code: 'NEX-0103', email: 'david.kim@nexora.io', role: 'HR Director', department: 'People Operations', type: 'Full-Time', status: 'Active', joinDate: '2020-01-10', salary: '$140,000', initials: 'DK' },
  { id: 'EMP-104', name: 'Elena Rostova', code: 'NEX-0104', email: 'elena.r@nexora.io', role: 'Financial Controller', department: 'Finance', type: 'Full-Time', status: 'On Leave', joinDate: '2023-02-01', salary: '$135,000', initials: 'ER' },
  { id: 'EMP-105', name: 'Marcus Vance', code: 'NEX-0105', email: 'marcus.v@nexora.io', role: 'DevOps Specialist', department: 'Engineering', type: 'Contract', status: 'Active', joinDate: '2023-11-20', salary: '$120,000', initials: 'MV' },
  { id: 'EMP-106', name: 'Priya Sharma', code: 'NEX-0106', email: 'priya.s@nexora.io', role: 'Product Manager', department: 'Product', type: 'Full-Time', status: 'Active', joinDate: '2022-09-05', salary: '$145,000', initials: 'PS' },
];

const MOCK_ORG_DATA: OrgNode = {
  id: 'EMP-103',
  name: 'David Kim',
  role: 'Chief People Officer',
  department: 'Executive',
  email: 'david.kim@nexora.io',
  avatarInitials: 'DK',
  directReports: [
    {
      id: 'EMP-102',
      name: 'Sarah Chen',
      role: 'Head of Product Experience',
      department: 'Design',
      email: 'sarah.chen@nexora.io',
      avatarInitials: 'SC',
      directReports: [
        {
          id: 'EMP-101',
          name: 'Alex Morgan',
          role: 'Principal UI Architect',
          department: 'Engineering',
          email: 'alex.morgan@nexora.io',
          avatarInitials: 'AM',
        },
      ],
    },
    {
      id: 'EMP-106',
      name: 'Priya Sharma',
      role: 'Group Product Director',
      department: 'Product',
      email: 'priya.s@nexora.io',
      avatarInitials: 'PS',
    },
  ],
};

export default function HRMSPage() {
  const [activeTab, setActiveTab] = useState('directory');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isHireWizardOpen, setIsHireWizardOpen] = useState(false);

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      header: 'Employee',
      sortable: true,
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 ring-2 ring-[var(--primary-purple)]/20">
            <AvatarFallback className="bg-gradient-to-tr from-[#8b5cf6] to-[#a855f7] text-white text-xs font-bold">
              {row.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-[var(--text-primary)] hover:text-[var(--primary-purple)] transition-colors">
              {row.name}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">{row.code}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role & Dept',
      sortable: true,
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-[var(--text-primary)]">{row.role}</span>
          <span className="text-[10px] text-[var(--text-muted)]">{row.department}</span>
        </div>
      ),
    },
    {
      key: 'type',
      header: 'Employment',
      sortable: true,
      accessor: (row) => <Badge variant="secondary">{row.type}</Badge>,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      accessor: (row) => (
        <Badge variant={row.status === 'Active' ? 'success' : row.status === 'On Leave' ? 'warning' : 'destructive'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'salary',
      header: 'Compensation',
      sortable: true,
      align: 'right',
      accessor: (row) => <span className="font-bold text-[var(--text-primary)]">{row.salary}</span>,
    },
    {
      key: 'actions',
      header: 'Action',
      align: 'center',
      accessor: (row) => (
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedEmployee(row);
          }}
          className="h-7 text-[11px] border-[var(--border-color)]"
        >
          <Eye className="h-3 w-3 mr-1" />
          Inspect
        </Button>
      ),
    },
  ];

  const wizardSteps: WizardStep[] = [
    {
      id: 'personal',
      title: 'Personal Info',
      description: 'Employee details & credentials',
      component: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Full Name</label>
            <Input placeholder="e.g. Jane Doe" className="bg-[var(--bg-secondary)] border-[var(--border-color)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Work Email</label>
            <Input placeholder="jane.doe@nexora.io" className="bg-[var(--bg-secondary)] border-[var(--border-color)]" />
          </div>
        </div>
      ),
    },
    {
      id: 'job',
      title: 'Job & Role',
      description: 'Department & manager assignment',
      component: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Department</label>
            <Input placeholder="Engineering" className="bg-[var(--bg-secondary)] border-[var(--border-color)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Role Title</label>
            <Input placeholder="Senior Frontend Engineer" className="bg-[var(--bg-secondary)] border-[var(--border-color)]" />
          </div>
        </div>
      ),
    },
    {
      id: 'compensation',
      title: 'Compensation',
      description: 'Salary & pay grade setup',
      component: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Annual Base Salary ($)</label>
            <Input placeholder="150,000" className="bg-[var(--bg-secondary)] border-[var(--border-color)]" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--text-muted)]">Pay Frequency</label>
            <Input placeholder="Semi-Monthly" className="bg-[var(--bg-secondary)] border-[var(--border-color)]" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <UserCheck className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Human Resource Operating System (HRMS)
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Manage global talent workforce, attendance matrix, payroll liability, and organizational hierarchy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsHireWizardOpen(true)}
            className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white shadow-md shadow-[#8b5cf6]/20 hover:opacity-90 transition-opacity text-xs"
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Onboard Employee
          </Button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Headcount" value="1,248" change="+12% this qtr" icon={Users} trend="up" />
        <StatCard title="Active Attendance Rate" value="96.4%" change="+1.8% vs last week" icon={UserCheck} trend="up" />
        <StatCard title="Monthly Payroll Liability" value="$1.84M" change="Next cycle: Aug 15" icon={CreditCard} trend="neutral" />
        <StatCard title="Pending Leave Requests" value="14" change="Requires manager action" icon={Calendar} trend="down" />
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="directory" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-[var(--surface)] border border-[var(--border-color)] p-1 rounded-2xl">
          <TabsTrigger value="directory" className="text-xs font-semibold rounded-xl">
            <Users className="h-3.5 w-3.5 mr-2" />
            Employee Directory
          </TabsTrigger>
          <TabsTrigger value="org-chart" className="text-xs font-semibold rounded-xl">
            <Building2 className="h-3.5 w-3.5 mr-2" />
            Interactive Org Chart
          </TabsTrigger>
          <TabsTrigger value="leave" className="text-xs font-semibold rounded-xl">
            <Calendar className="h-3.5 w-3.5 mr-2" />
            Leave & Attendance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="mt-4">
          <DataGrid
            data={MOCK_EMPLOYEES}
            columns={columns}
            keyExtractor={(item) => item.id}
            title="Global Talent Directory"
            description="Filtered roster of active organizational personnel across departments."
            onRowClick={(emp) => setSelectedEmployee(emp)}
            pageSize={5}
            bulkActions={[
              {
                label: 'Export Records',
                icon: Download,
                onClick: (rows) => alert(`Exporting ${rows.length} employee records`),
              },
            ]}
          />
        </TabsContent>

        <TabsContent value="org-chart" className="mt-4">
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-4 shadow-sm">
            <OrgChart data={MOCK_ORG_DATA} onNodeClick={(node) => alert(`Selected ${node.name} (${node.role})`)} />
          </div>
        </TabsContent>

        <TabsContent value="leave" className="mt-4">
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">Leave Request Approval Queue</h3>
            <p className="text-xs text-[var(--text-muted)] mb-4">Pending manager sign-offs integrated with team coverage timelines.</p>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Elena Rostova', type: 'Annual Leave', dates: 'Aug 10 - Aug 18', status: 'Pending Approval' },
                { name: 'Marcus Vance', type: 'Sick Leave', dates: 'Aug 04 - Aug 05', status: 'Approved' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-[var(--primary-purple)] text-white text-xs font-bold">
                        {item.name.split(' ').map((n) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--text-primary)]">{item.name}</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">{item.type} • {item.dates}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={item.status === 'Approved' ? 'success' : 'warning'}>{item.status}</Badge>
                    {item.status === 'Pending Approval' && (
                      <Button size="sm" className="h-7 text-xs bg-[var(--color-success)] text-white">Approve</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Employee Detail Context Drawer */}
      <ContextDrawer
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
        title={selectedEmployee?.name || ''}
        subtitle={`${selectedEmployee?.role} • ${selectedEmployee?.department}`}
        actions={
          <Badge variant={selectedEmployee?.status === 'Active' ? 'success' : 'warning'}>
            {selectedEmployee?.status}
          </Badge>
        }
      >
        {selectedEmployee && (
          <div className="flex flex-col gap-6">
            {/* Header Identity Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
              <Avatar className="h-14 w-14 ring-4 ring-[var(--primary-purple)]/30">
                <AvatarFallback className="bg-gradient-to-tr from-[#8b5cf6] to-[#a855f7] text-white text-base font-black">
                  {selectedEmployee.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h4 className="text-sm font-bold text-[var(--text-primary)]">{selectedEmployee.name}</h4>
                <span className="text-xs text-[var(--text-muted)]">{selectedEmployee.code}</span>
                <span className="text-xs font-semibold text-[var(--primary-purple)] mt-1">{selectedEmployee.email}</span>
              </div>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Annual Compensation</span>
                <p className="text-sm font-extrabold text-[var(--text-primary)] mt-0.5">{selectedEmployee.salary}</p>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Employment Type</span>
                <p className="text-sm font-extrabold text-[var(--text-primary)] mt-0.5">{selectedEmployee.type}</p>
              </div>
            </div>

            {/* Cross-Module Linked Data */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                Connected Business Modules
              </h5>
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between text-xs">
                <span>Active Project Allocations</span>
                <Badge variant="purple">3 Projects</Badge>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between text-xs">
                <span>Logged Hours (This Month)</span>
                <span className="font-bold text-[var(--text-primary)]">148.5 hrs</span>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between text-xs">
                <span>Next Payroll Pay Out</span>
                <span className="font-bold text-[var(--color-success)]">$6,875 (Aug 15)</span>
              </div>
            </div>
          </div>
        )}
      </ContextDrawer>

      {/* Onboard Wizard Modal */}
      <Modal isOpen={isHireWizardOpen} onClose={() => setIsHireWizardOpen(false)} title="Onboard New Employee">
        <Wizard
          steps={wizardSteps}
          onComplete={() => {
            alert('Employee onboarding process initiated!');
            setIsHireWizardOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
