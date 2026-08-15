import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { MOCK_ACTIVITIES } from "@/data/mockData";
import { Badge } from "@/components/ui/Badge";
import { PlusCircle, RefreshCw, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

export function ActivityFeed() {
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
        <CardDescription>Real-time audit log of team actions and system events</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {MOCK_ACTIVITIES.map((act) => (
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
      </CardContent>
    </Card>
  );
}
