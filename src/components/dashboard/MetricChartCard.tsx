"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { BarChart3, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataPoint {
  label: string;
  value: number;
  prev: number;
}

export function MetricChartCard({
  title = "Telemetry & Resource Utilization",
  description = "Real-time query throughput and tenant execution load",
  dataPoints,
}: {
  title?: string;
  description?: string;
  dataPoints?: DataPoint[];
}) {
  const [period, setPeriod] = useState<"7D" | "30D" | "90D">("7D");

  const hasData = Boolean(dataPoints && dataPoints.length > 0);

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>{title}</CardTitle>
            <Badge variant="purple" size="sm">
              <TrendingUp className="h-3 w-3 mr-1" /> Live Metric
            </Badge>
          </div>
          <CardDescription className="mt-1">{description}</CardDescription>
        </div>

        {/* Time Period Filter Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 p-1 border border-zinc-200/80 dark:border-zinc-700/80">
          {(["7D", "30D", "90D"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setPeriod(t)}
              className={cn(
                "rounded-lg px-2.5 py-1 text-xs font-semibold transition-all",
                period === t
                  ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-300 shadow-sm"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        {!hasData ? (
          <div className="h-56 w-full flex flex-col items-center justify-center text-center space-y-2 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 p-6">
            <div className="h-10 w-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <BarChart3 className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">No Telemetry Traffic Recorded Yet</p>
            <p className="text-[11px] text-zinc-400 max-w-xs">
              Tenant throughput and query utilization charts will populate as API requests are processed.
            </p>
          </div>
        ) : (
          <div className="h-56 w-full flex items-end justify-between gap-2 sm:gap-4 pt-6 pb-2 px-1">
            {dataPoints!.map((item, idx) => {
              const maxValue = Math.max(...dataPoints!.map((d) => Math.max(d.value, d.prev))) || 1;
              const currentHeight = (item.value / maxValue) * 100;
              const prevHeight = (item.prev / maxValue) * 100;

              return (
                <div key={idx} className="group flex flex-1 flex-col items-center h-full justify-end gap-2">
                  <div className="opacity-0 group-hover:opacity-100 transition-all transform group-hover:-translate-y-1 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[10px] font-bold py-0.5 px-1.5 rounded shadow pointer-events-none mb-1">
                    {item.value}
                  </div>

                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    <div
                      style={{ height: `${prevHeight}%` }}
                      className="w-2 sm:w-3 rounded-t-md bg-zinc-200 dark:bg-zinc-800 transition-all duration-500"
                    />
                    <div
                      style={{ height: `${currentHeight}%` }}
                      className="w-3 sm:w-5 rounded-t-md bg-purple-600 dark:bg-purple-500 shadow-sm group-hover:bg-purple-700 transition-all duration-300"
                    />
                  </div>

                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-purple-600" />
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Active Cycle</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-zinc-300 dark:bg-zinc-700" />
            <span>Previous Cycle</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
