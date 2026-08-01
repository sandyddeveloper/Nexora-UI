'use client';

import React, { useState } from 'react';
import {
  Inbox as InboxIcon,
  CheckCircle2,
  XCircle,
  Clock,
  Bell,
  Sparkles,
  Calendar,
  CreditCard,
  FolderKanban,
  UserCheck,
  CheckCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface NotificationItem {
  id: string;
  type: 'leave_approval' | 'task_assigned' | 'payroll_ready' | 'system_alert';
  title: string;
  sender: { name: string; initials: string; avatar?: string };
  module: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-1',
    type: 'leave_approval',
    title: 'Elena Rostova submitted a Leave Request (Aug 10 - Aug 18)',
    sender: { name: 'Elena Rostova', initials: 'ER' },
    module: 'HRMS',
    timestamp: '10 mins ago',
    isRead: false,
    actionRequired: true,
  },
  {
    id: 'NOTIF-2',
    type: 'task_assigned',
    title: 'You were assigned to task: "Architect Next.js 15 App Router Core"',
    sender: { name: 'Sarah Chen', initials: 'SC' },
    module: 'Projects',
    timestamp: '1 hour ago',
    isRead: false,
    actionRequired: false,
  },
  {
    id: 'NOTIF-3',
    type: 'payroll_ready',
    title: 'July 2026 Pay Cycle processing has been completed ($1.84M liability)',
    sender: { name: 'Finance Engine', initials: 'FE' },
    module: 'Payroll',
    timestamp: '4 hours ago',
    isRead: true,
    actionRequired: false,
  },
];

export default function InboxPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    alert(`Request ${id} ${status}`);
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <InboxIcon className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Universal Inbox & Action Center
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Streamlined approval queue for cross-module leave, payroll, project sign-offs, and notifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={markAllRead} className="text-xs border-[var(--border-color)]">
            <CheckCheck className="h-3.5 w-3.5 mr-1.5" />
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Notifications Container */}
      <div className="flex flex-col gap-3 max-w-4xl">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
              !notif.isRead
                ? 'border-[var(--primary-purple)]/40 bg-[var(--surface-elevated)] shadow-xs'
                : 'border-[var(--border-color)] bg-[var(--surface)] opacity-80'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Avatar className="h-9 w-9">
                <AvatarFallback className="bg-[var(--primary-purple)] text-white font-bold text-xs">
                  {notif.sender.initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">{notif.module}</Badge>
                  <span className="text-[10px] text-[var(--text-muted)]">{notif.timestamp}</span>
                </div>
                <p className="text-xs font-semibold text-[var(--text-primary)] mt-1">{notif.title}</p>
              </div>
            </div>

            {notif.actionRequired && (
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  size="sm"
                  onClick={() => handleAction(notif.id, 'approved')}
                  className="h-8 text-xs bg-[var(--color-success)] text-white hover:opacity-90"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleAction(notif.id, 'rejected')}
                  className="h-8 text-xs border-[var(--border-color)] text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10"
                >
                  <XCircle className="h-3.5 w-3.5 mr-1" />
                  Reject
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
