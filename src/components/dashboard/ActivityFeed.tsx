"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { ActivityItem } from "@/types/auth";
import { Badge } from "@/components/ui/Badge";
import { PlusCircle, RefreshCw, CheckCircle2, ShieldCheck, Clock, Activity } from "lucide-react";

export function ActivityFeed() {
  const [activities] = useState<ActivityItem[]>([]);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "create":
        return <Badge variant="purple" size="sm"><PlusCircle className="h-2.5 w-2.5 mr-1" />Created</Badge>;
      case "resolve":
        return <Badge variant="emerald" size="sm"><CheckCircle2 className="h-2.5 w-2.5 mr-1" />Resolved</Badge>;
      case "update":
        return <Badge variant="blue" size="sm"><RefreshCw className="h-2.5 w-2.5 mr-1" />Updated</Badge>;
      default:
        return <Badge variant="gray" size="sm"><Clock className="h-2.5 w-2.5 mr-1" />Activity</Badge>;
    }
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Live Activity Stream</CardTitle>
        <CardDescription>Real-time audit log of team actions and workspace events</CardDescription>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <div className="py-8 text-center space-y-2 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mx-auto">
              <Activity className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">No Recent Activities</p>
            <p className="text-[11px] text-zinc-400">Events and audit trails will appear here automatically.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((act) => (
              <div
                key={act.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={act.avatar}
                  alt={act.user}
                  className="h-8 w-8 rounded-lg object-cover ring-1 ring-purple-500/30 shrink-0 mt-0.5"
                />

                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {act.user}
                    </span>
                    <span className="text-[10px] text-zinc-400 shrink-0">{act.time}</span>
                  </div>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                    {act.action} <span className="font-semibold text-purple-600 dark:text-purple-400">{act.target}</span>
                  </p>

                  <div className="mt-2">{getTypeBadge(act.type)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
