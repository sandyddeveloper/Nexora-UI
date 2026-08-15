import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_SYSTEM_SERVICES } from "@/data/mockData";
import { Server, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function SystemHealthCard() {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Infrastructure & Cluster Health</CardTitle>
            <Badge variant="emerald" dot size="sm">
              Global Grid Healthy
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Real-time latency metrics, uptime percentiles, and resource loads
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {MOCK_SYSTEM_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-purple-300 dark:hover:border-purple-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{srv.name}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-zinc-500 font-mono">Latency: {srv.latency}</span>
                  <Badge variant={srv.status === "operational" ? "emerald" : "amber"} size="sm">
                    {srv.status === "operational" ? "Operational" : "Degraded"}
                  </Badge>
                </div>
              </div>

              {/* Progress bar of CPU / Traffic load */}
              <div className="mt-2.5 flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                  <div
                    style={{ width: `${srv.loadPercentage}%` }}
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      srv.loadPercentage > 80
                        ? "bg-amber-500"
                        : "bg-purple-600 dark:bg-purple-500"
                    )}
                  />
                </div>
                <span className="text-[10px] font-mono font-semibold text-zinc-500 dark:text-zinc-400">
                  {srv.loadPercentage}% Load
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
