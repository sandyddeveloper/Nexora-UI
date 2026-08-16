"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Server, Zap, CheckCircle2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const CORE_SERVICES = [
  { id: "srv_api", name: "Nexora Engine API Core", status: "operational", endpoint: "localhost:8000/api", latency: "18ms", loadPercentage: 28 },
  { id: "srv_auth", name: "Authentication & JWT Service", status: "operational", endpoint: "/api/auth/", latency: "12ms", loadPercentage: 35 },
  { id: "srv_multi_tenant", name: "Multi-Tenant PostgreSQL Partitioning", status: "operational", endpoint: "apps.users.tenant", latency: "24ms", loadPercentage: 40 },
  { id: "srv_utilities", name: "Utilities & Regional Master Data", status: "operational", endpoint: "/api/utilities/", latency: "15ms", loadPercentage: 20 },
];

export function SystemHealthCard() {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Infrastructure & Platform Health</CardTitle>
            <Badge variant="emerald" dot size="sm">
              All Services Operational
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Real-time status of backend service endpoints and tenant schemas
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {CORE_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-3 rounded-xl border border-zinc-200/70 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-purple-300 dark:hover:border-purple-700/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <div>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">{srv.name}</span>
                    <span className="text-[10px] font-mono text-zinc-400">{srv.endpoint}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-zinc-500 font-mono">Latency: {srv.latency}</span>
                  <Badge variant={srv.status === "operational" ? "emerald" : "amber"} size="sm">
                    {srv.status === "operational" ? "Healthy" : "Degraded"}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
