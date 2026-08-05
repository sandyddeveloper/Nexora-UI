'use client';

import React from 'react';
import { Activity, BarChart3, Cpu, Zap, ArrowUpRight } from 'lucide-react';

export function AnalyticsShowcaseSection() {
  return (
    <section id="analytics" className="py-24 md:py-32 bg-[#faf8ff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Activity className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>SUB-MILLISECOND COMPUTE TELEMETRY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Real-Time Intelligence & Infrastructure Observability.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
            Monitor GPU cluster utilization, active token throughput, model failovers, and security audit logs in real time.
          </p>
        </div>

        {/* Telemetry Dashboard Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-3xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>GPU UTILIZATION</span>
              <Cpu className="w-4 h-4 text-[#7c3aed]" />
            </div>
            <div className="mt-4 text-3xl font-extrabold text-[#0f172a] font-display">94.2%</div>
            <div className="mt-2 text-xs font-semibold text-[#10b981] flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.4% Optimal Buffer
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>ACTIVE TOKEN RATE</span>
              <Zap className="w-4 h-4 text-[#7c3aed]" />
            </div>
            <div className="mt-4 text-3xl font-extrabold text-[#0f172a] font-display">4.28M/s</div>
            <div className="mt-2 text-xs font-semibold text-[#7c3aed] flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" /> 100% Vector Cache Hit
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>AVG INFERENCE TTFT</span>
              <Activity className="w-4 h-4 text-[#06b6d4]" />
            </div>
            <div className="mt-4 text-3xl font-extrabold text-[#0f172a] font-display">0.42ms</div>
            <div className="mt-2 text-xs font-semibold text-[#06b6d4] flex items-center gap-1">
              ⚡ Edge Cached
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>SYSTEM SLA</span>
              <BarChart3 className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="mt-4 text-3xl font-extrabold text-[#0f172a] font-display">99.999%</div>
            <div className="mt-2 text-xs font-semibold text-[#10b981] flex items-center gap-1">
              ✔ Zero Downtime
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
