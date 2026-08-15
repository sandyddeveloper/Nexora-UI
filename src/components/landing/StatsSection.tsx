import React from "react";

const STATS = [
  { value: "99.99%", label: "Uptime SLA Guarantee", sublabel: "Backed by multi-region redundancy" },
  { value: "12M+", label: "Daily API Invocations", sublabel: "Zero packet loss at peak burst" },
  { value: "45ms", label: "P99 Global Latency", sublabel: "Edge caching network across 12 hubs" },
  { value: "500+", label: "Enterprise Teams", sublabel: "Scaling production with Nexora" },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-purple-50/50 dark:bg-zinc-900 border border-purple-200/70 dark:border-zinc-800 shadow-sm"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-purple-600 dark:text-purple-400 tracking-tight">
                {stat.value}
              </div>
              <div className="mt-2 text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100">
                {stat.label}
              </div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
