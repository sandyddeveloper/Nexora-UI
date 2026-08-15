import React from "react";
import { StatMetric } from "@/types/dashboard";
import { DollarSign, FolderKanban, Zap, Users, LifeBuoy, Clock, Activity, ShieldAlert, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ReactNode> = {
  DollarSign: <DollarSign className="h-5 w-5" />,
  FolderKanban: <FolderKanban className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Users: <Users className="h-5 w-5" />,
  LifeBuoy: <LifeBuoy className="h-5 w-5" />,
  Clock: <Clock className="h-5 w-5" />,
  Activity: <Activity className="h-5 w-5" />,
  ShieldAlert: <ShieldAlert className="h-5 w-5" />,
};

export function StatCard({ metric }: { metric: StatMetric }) {
  return (
    <div className="group relative rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 p-5 shadow-sm hover:border-purple-300 dark:hover:border-purple-700/60 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
      {/* Top row: Title and Icon */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {metric.title}
        </span>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-200/50 dark:border-purple-800/40 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
          {ICONS[metric.iconName] || <Activity className="h-5 w-5" />}
        </div>
      </div>

      {/* Main Metric Value */}
      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          {metric.value}
        </h3>
      </div>

      {/* Sparkline & Trend Details */}
      <div className="mt-3 flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md",
              metric.isPositive
                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300"
                : "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300"
            )}
          >
            {metric.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {metric.change}
          </span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate">{metric.timeframe}</span>
        </div>

        {/* Mini SVG Sparkline */}
        {metric.sparklineData && (
          <div className="h-6 w-16 opacity-70 group-hover:opacity-100 transition-opacity">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 100 30">
              <path
                d={`M 0 ${30 - (metric.sparklineData[0] / Math.max(...metric.sparklineData)) * 25} ${metric.sparklineData
                  .map(
                    (val, i) =>
                      `L ${(i / (metric.sparklineData!.length - 1)) * 100} ${
                        30 - (val / Math.max(...metric.sparklineData!)) * 25
                      }`
                  )
                  .join(" ")}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className={metric.isPositive ? "text-purple-600 dark:text-purple-400" : "text-rose-500"}
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
