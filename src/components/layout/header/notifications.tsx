'use client';

import React from 'react';
import { Bell, CheckCheck, Trash2, ShieldAlert, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import { useNotificationStore } from '@/store/use-notification-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown';
import { formatRelativeTime } from '@/utils/formatters';

export function NotificationsCenter() {
  const { notifications, markAsRead, markAllAsRead, clearNotification } = useNotificationStore();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-all focus:outline-none">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef4444] text-[9px] font-bold text-white shadow-md shadow-[#ef4444]/40">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-1.5rem)] p-0 border border-[var(--border-color)] bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between p-3 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-[var(--text-primary)]">Telemetry Alerts</span>
            <span className="rounded-full bg-[var(--primary-purple)]/15 px-2 py-0.5 text-[10px] font-bold text-[var(--primary-purple)]">
              {unreadCount} new
            </span>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-[11px] font-medium text-[var(--primary-purple)] hover:underline"
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-[var(--border-color)] custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-[var(--text-muted)]">No telemetry notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`flex gap-3 p-3 text-xs transition-colors cursor-pointer group hover:bg-[var(--state-hover)] ${
                  n.read ? 'opacity-65 bg-transparent' : 'bg-[var(--primary-purple)]/[0.06]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {n.type === 'danger' && <ShieldAlert className="h-4 w-4 text-[#ef4444]" />}
                  {n.type === 'warning' && <AlertTriangle className="h-4 w-4 text-[#f59e0b]" />}
                  {n.type === 'success' && <CheckCircle className="h-4 w-4 text-[#22c55e]" />}
                  {n.type === 'info' && <Info className="h-4 w-4 text-[var(--primary-purple)]" />}
                </div>
                <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                  <span className="font-semibold text-[var(--text-primary)] leading-tight truncate">{n.title}</span>
                  <span className="text-[var(--text-secondary)] text-[11px] leading-relaxed line-clamp-2">{n.message}</span>
                  <span className="text-[9px] text-[var(--text-muted)] mt-1">{formatRelativeTime(n.timestamp)}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearNotification(n.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-[var(--text-muted)] hover:text-[#ef4444] transition-opacity"
                  title="Remove notification"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
