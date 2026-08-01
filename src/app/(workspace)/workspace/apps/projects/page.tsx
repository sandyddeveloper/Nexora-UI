'use client';

import React, { useState } from 'react';
import {
  FolderKanban,
  Kanban as KanbanIcon,
  Table as TableIcon,
  Calendar as CalendarIcon,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Sparkles,
  Filter,
  SlidersHorizontal,
} from 'lucide-react';
import { KanbanBoard, KanbanColumn, KanbanItem } from '@/components/shared/kanban-board';
import { DataGrid, Column } from '@/components/shared/data-grid';
import { TimelineView, TimelineTask } from '@/components/shared/timeline-view';
import { ContextDrawer } from '@/components/shared/context-drawer';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const MOCK_COLUMNS: KanbanColumn[] = [
  { id: 'backlog', title: 'Backlog', color: '#a1a1aa' },
  { id: 'in_progress', title: 'In Progress', color: '#8b5cf6' },
  { id: 'in_review', title: 'Code Review', color: '#f59e0b' },
  { id: 'completed', title: 'Completed', color: '#22c55e' },
];

const MOCK_TASKS: KanbanItem[] = [
  {
    id: 'TSK-101',
    title: 'Architect Next.js 15 App Router Enterprise Core',
    description: 'Implement domain-driven layout architecture with Server Components & dynamic streaming.',
    status: 'in_progress',
    priority: 'urgent',
    assignee: { name: 'Alex Morgan', initials: 'AM' },
    dueDate: 'Aug 12',
    commentsCount: 8,
    attachmentsCount: 3,
    tags: ['Architecture', 'Next.js'],
  },
  {
    id: 'TSK-102',
    title: 'Design Purple Glassmorphism Component Library',
    description: 'Create atomic primitives with Geist typography and Radix accessibility hooks.',
    status: 'completed',
    priority: 'high',
    assignee: { name: 'Sarah Chen', initials: 'SC' },
    dueDate: 'Aug 08',
    commentsCount: 14,
    tags: ['Design System', 'UI'],
  },
  {
    id: 'TSK-103',
    title: 'Configure Immutable Security Audit Log Streams',
    description: 'Stream user auth & RBAC permission modifications directly to audit ledger.',
    status: 'in_review',
    priority: 'medium',
    assignee: { name: 'David Kim', initials: 'DK' },
    dueDate: 'Aug 15',
    commentsCount: 4,
    tags: ['Security', 'Backend'],
  },
  {
    id: 'TSK-104',
    title: 'Build AI Agent Task Auto-Triage Pipeline',
    description: 'Autonomous workflow agent for triaging incoming support & bug tickets.',
    status: 'backlog',
    priority: 'high',
    assignee: { name: 'Priya Sharma', initials: 'PS' },
    dueDate: 'Aug 20',
    commentsCount: 2,
    tags: ['AI Agent', 'Automation'],
  },
];

const MOCK_TIMELINE_TASKS: TimelineTask[] = [
  { id: 'TSK-101', title: 'App Router Core Architecture', startDate: 'Aug 01', endDate: 'Aug 12', progress: 75, status: 'in_progress', assignee: { name: 'Alex Morgan', initials: 'AM' } },
  { id: 'TSK-102', title: 'Purple UI Design System', startDate: 'Jul 20', endDate: 'Aug 08', progress: 100, status: 'completed', assignee: { name: 'Sarah Chen', initials: 'SC' } },
  { id: 'TSK-103', title: 'RBAC Audit Log Streams', startDate: 'Aug 05', endDate: 'Aug 15', progress: 50, status: 'in_progress', assignee: { name: 'David Kim', initials: 'DK' } },
];

export default function ProjectsPage() {
  const [tasks, setTasks] = useState<KanbanItem[]>(MOCK_TASKS);
  const [selectedTask, setSelectedTask] = useState<KanbanItem | null>(null);
  const [viewMode, setViewMode] = useState<'board' | 'table' | 'timeline'>('board');

  const handleItemMove = (itemId: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === itemId ? { ...t, status: newStatus } : t))
    );
  };

  const tableColumns: Column<KanbanItem>[] = [
    {
      key: 'title',
      header: 'Task Title',
      sortable: true,
      accessor: (row) => (
        <div className="flex flex-col">
          <span className="font-bold text-[var(--text-primary)] hover:text-[var(--primary-purple)] transition-colors">
            {row.title}
          </span>
          <span className="text-[10px] text-[var(--text-muted)]">{row.id}</span>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      accessor: (row) => {
        const col = MOCK_COLUMNS.find((c) => c.id === row.status);
        return <Badge variant="purple">{col?.title || row.status}</Badge>;
      },
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      accessor: (row) => (
        <Badge variant={row.priority === 'urgent' ? 'destructive' : row.priority === 'high' ? 'warning' : 'secondary'}>
          {row.priority}
        </Badge>
      ),
    },
    {
      key: 'assignee',
      header: 'Assignee',
      accessor: (row) => (
        <div className="flex items-center gap-2">
          {row.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-[var(--primary-purple)] text-white text-[10px] font-bold">
                {row.assignee.initials}
              </AvatarFallback>
            </Avatar>
          )}
          <span className="text-xs">{row.assignee?.name || 'Unassigned'}</span>
        </div>
      ),
    },
    {
      key: 'dueDate',
      header: 'Due Date',
      sortable: true,
      align: 'right',
      accessor: (row) => <span className="text-xs font-semibold">{row.dueDate}</span>,
    },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <FolderKanban className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Projects & Execution Engine
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Track agile deliverables, sprint progress, capacity planning, and automated task workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white shadow-md shadow-[#8b5cf6]/20 text-xs">
            <Plus className="h-4 w-4 mr-1.5" />
            Create Task
          </Button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Sprint Velocity" value="84 pts" change="+8% vs last sprint" icon={FolderKanban} trend="up" />
        <StatCard title="Task Completion Rate" value="91.2%" change="28 of 31 completed" icon={CheckCircle2} trend="up" />
        <StatCard title="Total Hours Logged" value="642 hrs" change="This month" icon={Clock} trend="neutral" />
        <StatCard title="Blocked / Urgent Items" value="2" change="Requires immediate triage" icon={AlertCircle} trend="down" />
      </div>

      {/* Multi-View Tabs Bar */}
      <div className="flex items-center justify-between gap-4 p-1.5 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] shadow-xs">
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={viewMode === 'board' ? 'purple' : 'ghost'}
            onClick={() => setViewMode('board')}
            className="text-xs h-8"
          >
            <KanbanIcon className="h-3.5 w-3.5 mr-1.5" />
            Kanban Board
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'table' ? 'purple' : 'ghost'}
            onClick={() => setViewMode('table')}
            className="text-xs h-8"
          >
            <TableIcon className="h-3.5 w-3.5 mr-1.5" />
            Data Table Grid
          </Button>
          <Button
            size="sm"
            variant={viewMode === 'timeline' ? 'purple' : 'ghost'}
            onClick={() => setViewMode('timeline')}
            className="text-xs h-8"
          >
            <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
            Gantt Timeline
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 text-xs border-[var(--border-color)]">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            Filters
          </Button>
        </div>
      </div>

      {/* View Mode Rendering */}
      {viewMode === 'board' && (
        <KanbanBoard
          columns={MOCK_COLUMNS}
          items={tasks}
          onItemMove={handleItemMove}
          onItemClick={(item) => setSelectedTask(item)}
          onAddItem={(colId) => alert(`Create task in column: ${colId}`)}
        />
      )}

      {viewMode === 'table' && (
        <DataGrid
          data={tasks}
          columns={tableColumns}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => setSelectedTask(item)}
        />
      )}

      {viewMode === 'timeline' && (
        <TimelineView tasks={MOCK_TIMELINE_TASKS} onTaskClick={(task) => alert(`Task ${task.title}`)} />
      )}

      {/* Task Context Drawer */}
      <ContextDrawer
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        title={selectedTask?.title || ''}
        subtitle={`Task ID: ${selectedTask?.id}`}
        actions={<Badge variant="purple">{selectedTask?.priority}</Badge>}
      >
        {selectedTask && (
          <div className="flex flex-col gap-6">
            <div className="space-y-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Description</h5>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                {selectedTask.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Assignee</span>
                <p className="text-xs font-bold text-[var(--text-primary)] mt-1">{selectedTask.assignee?.name}</p>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)]">
                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold">Due Date</span>
                <p className="text-xs font-bold text-[var(--text-primary)] mt-1">{selectedTask.dueDate}</p>
              </div>
            </div>

            {/* Connected HRMS / Project Data */}
            <div className="space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">Cross-Module Integration</h5>
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between text-xs">
                <span>Linked HRMS Employee</span>
                <Badge variant="secondary">{selectedTask.assignee?.name}</Badge>
              </div>
              <div className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--surface)] flex items-center justify-between text-xs">
                <span>Logged Hours On Task</span>
                <span className="font-bold text-[var(--text-primary)]">18.5 hrs</span>
              </div>
            </div>
          </div>
        )}
      </ContextDrawer>
    </div>
  );
}
