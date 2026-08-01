'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, User, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export interface TimelineTask {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: 'completed' | 'in_progress' | 'delayed' | 'pending';
  assignee?: {
    name: string;
    initials: string;
  };
}

interface TimelineViewProps {
  tasks: TimelineTask[];
  onTaskClick?: (task: TimelineTask) => void;
}

export function TimelineView({ tasks, onTaskClick }: TimelineViewProps) {
  const getStatusBadge = (status: TimelineTask['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success" className="text-[9px] uppercase font-bold py-0">Completed</Badge>;
      case 'in_progress':
        return <Badge variant="purple" className="text-[9px] uppercase font-bold py-0">In Progress</Badge>;
      case 'delayed':
        return <Badge variant="destructive" className="text-[9px] uppercase font-bold py-0">Delayed</Badge>;
      default:
        return <Badge variant="secondary" className="text-[9px] uppercase font-bold py-0">Pending</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-[var(--primary-purple)]" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
            Project Schedule & Gantt Timeline
          </h3>
        </div>
        <span className="text-xs text-[var(--text-muted)] font-medium">
          {tasks.length} Scheduled Tasks
        </span>
      </div>

      {/* Task Bars List */}
      <div className="flex flex-col gap-3 pt-1 overflow-x-auto custom-scrollbar">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => onTaskClick && onTaskClick(task)}
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] hover:bg-[var(--card-hover)] hover:border-[var(--primary-purple)]/50 transition-all cursor-pointer"
          >
            {/* Task Info Left */}
            <div className="flex flex-col gap-1 min-w-[200px]">
              <div className="flex items-center gap-2">
                {getStatusBadge(task.status)}
                <h4 className="text-xs font-bold text-[var(--text-primary)] group-hover:text-[var(--primary-purple)] transition-colors">
                  {task.title}
                </h4>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-[var(--text-muted)] mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {task.startDate} — {task.endDate}
                </span>
                {task.assignee && (
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {task.assignee.name}
                  </span>
                )}
              </div>
            </div>

            {/* Progress Timeline Bar Right */}
            <div className="flex flex-col gap-1.5 flex-1 max-w-md">
              <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] font-medium">
                <span>Progress</span>
                <span className="font-bold text-[var(--text-primary)]">{task.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] transition-all duration-500"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
