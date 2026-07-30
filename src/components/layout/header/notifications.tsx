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
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white transition-all focus:outline-none">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ff5c7a] text-[9px] font-bold text-white shadow-md shadow-[#ff5c7a]/40">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-1.5rem)] p-0">
        <div className="flex items-center justify-between p-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-white">Telemetry Alerts</span>
            <span className="rounded-full bg-[#4f8cff]/20 px-2 py-0.5 text-[10px] font-bold text-[#4f8cff]">
              {unreadCount} new
            </span>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1 text-[11px] text-[#4f8cff] hover:underline"
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </button>
          )}
        </div>

        <div className="max-h-72 overflow-y-auto divide-y divide-white/5">
          {notifications.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">No telemetry notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className={`flex gap-3 p-3 text-xs transition-colors cursor-pointer ${
                  n.read ? 'opacity-60 bg-transparent' : 'bg-white/[0.03]'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {n.type === 'danger' && <ShieldAlert className="h-4 w-4 text-[#ff5c7a]" />}
                  {n.type === 'warning' && <AlertTriangle className="h-4 w-4 text-[#f7b500]" />}
                  {n.type === 'success' && <CheckCircle className="h-4 w-4 text-[#10d876]" />}
                  {n.type === 'info' && <Info className="h-4 w-4 text-[#4f8cff]" />}
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  <span className="font-semibold text-white leading-tight">{n.title}</span>
                  <span className="text-slate-400 text-[11px] leading-relaxed">{n.message}</span>
                  <span className="text-[9px] text-slate-500 mt-1">{formatRelativeTime(n.timestamp)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
