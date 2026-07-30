'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Zap,
  Users,
  FolderKanban,
  UserCheck,
  FileText,
  Calendar as CalendarIcon,
  BarChart3,
  Store,
  Blocks,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  Plus,
  Play,
} from 'lucide-react';
import { SectionHeader, StatCard } from '@/components/ui/stat-card';
import { AppCard } from '@/components/ui/app-card';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import { useAIPanelStore } from '@/store/use-ai-panel-store';
import { toast } from 'sonner';

const BUSINESS_APPS = [
  {
    id: 'automation',
    title: 'Workflow Automation',
    category: 'Core OS',
    description: 'Autonomous multi-step triggers, webhooks, and AI agent actions.',
    icon: <Zap className="h-6 w-6 text-[var(--primary-purple)]" />,
    route: '/workspace/apps/automation',
  },
  {
    id: 'crm',
    title: 'Enterprise CRM',
    category: 'Sales & Deals',
    description: 'Pipeline management, lead scoring, and automated client touchpoints.',
    icon: <Users className="h-6 w-6 text-[var(--primary-purple)]" />,
    route: '/workspace/apps/crm',
  },
  {
    id: 'projects',
    title: 'Projects & Tasks',
    category: 'Productivity',
    description: 'Linear-style issue tracking, sprint cycles, and roadmap planning.',
    icon: <FolderKanban className="h-6 w-6 text-[var(--primary-purple)]" />,
    route: '/workspace/apps/projects',
  },
  {
    id: 'hrms',
    title: 'HRMS & Talent',
    category: 'People',
    description: 'Employee directory, payroll automation, and performance reviews.',
    icon: <UserCheck className="h-6 w-6 text-[var(--primary-purple)]" />,
    route: '/workspace/apps/hrms',
  },
  {
    id: 'documents',
    title: 'Docs & Knowledge',
    category: 'Content',
    description: 'Notion-inspired collaborative workspace, specs, and knowledge base.',
    icon: <FileText className="h-6 w-6 text-[var(--primary-purple)]" />,
    route: '/workspace/apps/documents',
  },
  {
    id: 'analytics',
    title: 'Executive Analytics',
    category: 'Intelligence',
    description: 'Real-time revenue metrics, churn telemetry, and custom BI dashboards.',
    icon: <BarChart3 className="h-6 w-6 text-[var(--primary-purple)]" />,
    route: '/workspace/apps/analytics',
  },
];

const RECENT_AUTOMATIONS = [
  { id: 'auto-1', title: 'Qualify inbound enterprise leads via AI Agent', status: 'Active', trigger: 'Typeform webhook', lastRun: '2m ago', executionCount: 1420 },
  { id: 'auto-2', title: 'Sync closed deals to Stripe Billing & Slack', status: 'Active', trigger: 'Hubspot deal closed', lastRun: '15m ago', executionCount: 890 },
  { id: 'auto-3', title: 'Generate Q3 Performance Summaries for HR', status: 'Scheduled', trigger: 'Weekly CRON (Mon 09:00)', lastRun: '3d ago', executionCount: 45 },
  { id: 'auto-[#4f8cff]', title: 'Automated Security RBAC Compliance Audit', status: 'Active', trigger: 'Daily security daemon', lastRun: '1h ago', executionCount: 312 },
];

export default function WorkspacePage() {
  const router = useRouter();
  const { togglePanel: toggleAIPanel } = useAIPanelStore();

  const handleLaunchApp = (appTitle: string, route: string) => {
    toast.info(`Launching ${appTitle}...`, {
      description: 'Synchronizing workspace state and permissions.',
    });
    router.push(route);
  };

  return (
    <StaggerContainer className="flex flex-col gap-8">
      {/* Top Banner / Workspace Overview */}
      <StaggerItem>
        <div className="relative overflow-hidden rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 sm:p-8 shadow-xl">
          <div className="absolute top-0 right-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[var(--primary-purple)]/15 via-[var(--secondary-purple)]/5 to-transparent pointer-events-none" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--primary-purple)] to-[var(--secondary-purple)] shadow-lg text-white">
                <Building2 className="h-7 w-7" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">Acme Global Workspace OS</h1>
                  <Badge variant="purple" className="text-[10px] bg-[var(--primary-purple)]/15 text-[var(--primary-purple)] border-[var(--primary-purple)]/30">
                    ENTERPRISE EDITION
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-[var(--text-secondary)]">
                  Unified Business Operating System. 6 core apps online, 128 automated workflows active.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={toggleAIPanel} variant="primary" leftIcon={<Sparkles className="h-4 w-4" />}>
                Ask AI Agent
              </Button>
              <Button variant="glass" leftIcon={<Plus className="h-4 w-4 text-[var(--primary-purple)]" />}>
                Add Business App
              </Button>
            </div>
          </div>
        </div>
      </StaggerItem>

      {/* Business Telemetry Stat Cards */}
      <StaggerItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4 gap-4 sm:gap-6">
          <StatCard
            title="Monthly Recurring Revenue"
            value="$148,250"
            change={14.2}
            trend="up"
            icon={<CreditCard className="h-4 w-4 text-[var(--primary-purple)]" />}
            changeLabel="vs last month"
          />
          <StatCard
            title="Active CRM Pipeline"
            value="$2,450,000"
            change={8.7}
            trend="up"
            icon={<Users className="h-4 w-4 text-[var(--primary-purple)]" />}
            changeLabel="48 qualified deals"
          />
          <StatCard
            title="Automated Workflows"
            value="128 Active"
            change={24.0}
            trend="up"
            icon={<Zap className="h-4 w-4 text-[var(--primary-purple)]" />}
            changeLabel="2,355 executions today"
          />
          <StatCard
            title="Team Productivity Velocity"
            value="98.4%"
            change={1.2}
            trend="up"
            icon={<TrendingUp className="h-4 w-4 text-[var(--primary-purple)]" />}
            changeLabel="SLA resolution target"
          />
        </div>
      </StaggerItem>

      {/* Business Apps Hub Grid */}
      <StaggerItem>
        <SectionHeader
          title="Business Operating Apps"
          description="Access installed enterprise applications or expand your OS capabilities via the Marketplace."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6 gap-4 sm:gap-6">
          {BUSINESS_APPS.map((app) => (
            <AppCard
              key={app.id}
              title={app.title}
              category={app.category}
              description={app.description}
              icon={app.icon}
              onClick={() => handleLaunchApp(app.title, app.route)}
            />
          ))}
        </div>
      </StaggerItem>

      {/* Autonomous Workflows & Telemetry Section */}
      <StaggerItem>
        <Card className="bg-[var(--card-bg)] border-[var(--border-color)] p-4 sm:p-6 shadow-xl">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-[var(--primary-purple)]" />
                <CardTitle className="text-base sm:text-lg">Autonomous Workflows & Telemetry</CardTitle>
              </div>
              <CardDescription className="mt-1 text-xs">
                Real-time background agent triggers orchestrating CRM, HRMS, Documents, and Billing.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="xs" leftIcon={<Play className="h-3 w-3 text-[var(--primary-purple)]" />}>
                Trigger All
              </Button>
              <Button variant="ghost" size="xs">
                View All <ArrowUpRight className="h-3 w-3 ml-1 text-[var(--primary-purple)]" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-2 overflow-x-auto custom-scrollbar">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Workflow Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Trigger Source</TableHead>
                  <TableHead>Last Execution</TableHead>
                  <TableHead className="text-right">Executions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_AUTOMATIONS.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-bold text-[var(--text-primary)]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-[var(--primary-purple)]/15 text-[var(--primary-purple)]">
                          <Zap className="h-3.5 w-3.5" />
                        </div>
                        <span>{row.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {row.status === 'Active' ? (
                        <Badge variant="purple" className="text-[10px] bg-[#22c55e]/15 text-[#22c55e] border-[#22c55e]/30 px-2 py-0.5">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="purple" className="text-[10px] bg-[var(--primary-purple)]/15 text-[var(--primary-purple)] border-[var(--primary-purple)]/30 px-2 py-0.5">
                          Scheduled
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-[var(--text-secondary)] font-medium">{row.trigger}</TableCell>
                    <TableCell className="text-[var(--text-muted)] text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3 w-3 text-[var(--text-muted)]" />
                        <span>{row.lastRun}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-[var(--text-primary)]">
                      {row.executionCount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </StaggerItem>
    </StaggerContainer>
  );
}
