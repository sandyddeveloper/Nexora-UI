'use client';

import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Clock, TrendingDown, ArrowRight, Calculator } from 'lucide-react';

export function EnterpriseBenefitsSection() {
  const [headcount, setHeadcount] = useState(250);

  const currentSaaSExpense = headcount * 180 * 12;
  const nexoraExpense = headcount * 45 * 12 + 12000;
  const annualSavings = Math.max(0, currentSaaSExpense - nexoraExpense);
  const tcoReductionPercent = Math.round((annualSavings / currentSaaSExpense) * 100);

  return (
    <section id="enterprise-benefits" className="py-24 bg-[#ffffff] relative border-b border-[#e9d5ff]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-mono text-[#7c3aed] font-bold">
            <TrendingDown className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>FINANCIAL ROI & PERFORMANCE BENCHMARKS</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-gradient-hero font-display">
            68% Lower Infrastructure TCO. 10x Faster Execution.
          </h2>
          <p className="mt-4 text-base text-[#475569] font-medium">
            Eliminate expensive per-seat SaaS taxes and fragmented integration maintenance with transparent compute-based pricing.
          </p>
        </div>

        {/* 3 Metric Stat Cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-card p-6 border-l-4 border-l-[#10b981]">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>TCO REDUCTION</span>
              <DollarSign className="w-4 h-4 text-[#10b981]" />
            </div>
            <div className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-display">
              -68%
            </div>
            <div className="mt-2 text-sm font-bold text-[#10b981]">Consolidated Infrastructure Savings</div>
            <p className="mt-1 text-xs text-[#64748b]">Replacing legacy Jira, Salesforce, Workday, and Notion seat taxes.</p>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-[#7c3aed]">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>RESPONSE LATENCY</span>
              <Clock className="w-4 h-4 text-[#7c3aed]" />
            </div>
            <div className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-display">
              &lt;12ms
            </div>
            <div className="mt-2 text-sm font-bold text-[#7c3aed]">Token-to-First-Byte Edge Retrieval</div>
            <p className="mt-1 text-xs text-[#64748b]">Dynamic vector caching eliminates inference queue bottlenecks.</p>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-[#3b82f6]">
            <div className="flex items-center justify-between text-xs font-mono text-[#64748b]">
              <span>AVAILABILITY SLA</span>
              <ShieldCheck className="w-4 h-4 text-[#3b82f6]" />
            </div>
            <div className="mt-4 text-4xl sm:text-5xl font-extrabold text-[#0f172a] font-display">
              99.999%
            </div>
            <div className="mt-2 text-sm font-bold text-[#3b82f6]">Multi-Region Active-Active Uptime</div>
            <p className="mt-1 text-xs text-[#64748b]">Automated cluster failover with zero data loss guarantees.</p>
          </div>

        </div>

        {/* Calculator */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#faf8ff] border border-[#e9d5ff] shadow-[0_20px_50px_-10px_rgba(124,58,237,0.15)] max-w-4xl mx-auto">
          <div className="flex items-center gap-3 pb-4 border-b border-[#e9d5ff]">
            <div className="p-2 rounded-lg bg-[#7c3aed]/15 text-[#7c3aed]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0f172a]">Interactive Infrastructure ROI Calculator</h3>
              <p className="text-xs text-[#64748b]">Estimate annual cost savings by consolidating your enterprise stack to Nexora Engine.</p>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#64748b] font-bold">ENTERPRISE HEADCOUNT PERSONNEL:</span>
                <span className="text-base font-extrabold text-[#7c3aed]">{headcount} Employees</span>
              </div>
              <input
                type="range"
                min={20}
                max={2500}
                step={10}
                value={headcount}
                onChange={e => setHeadcount(Number(e.target.value))}
                className="w-full mt-3 h-2 bg-[#e9d5ff] rounded-lg appearance-none cursor-pointer accent-[#7c3aed]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#64748b] mt-1 font-semibold">
                <span>20 Employees</span>
                <span>500 Employees</span>
                <span>2,500+ Enterprise</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-[#ffffff] border border-[#e9d5ff] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center shadow-sm">
              <div>
                <div className="text-[11px] font-mono text-[#64748b] font-bold">LEGACY FRAGMENTED STACK</div>
                <div className="text-xl font-extrabold text-[#ef4444] mt-1">${(currentSaaSExpense / 1000).toFixed(0)}k /yr</div>
                <div className="text-[10px] text-[#64748b] mt-0.5 font-medium">Avg $180/user seat licenses</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-[#64748b] font-bold">NEXORA ENGINE COMPUTE</div>
                <div className="text-xl font-extrabold text-[#10b981] mt-1">${(nexoraExpense / 1000).toFixed(0)}k /yr</div>
                <div className="text-[10px] text-[#10b981] mt-0.5 font-bold">Fixed compute base</div>
              </div>

              <div className="sm:border-l border-[#e9d5ff] sm:pl-4">
                <div className="text-[11px] font-mono text-[#7c3aed] font-bold">ESTIMATED ANNUAL SAVINGS</div>
                <div className="text-2xl font-extrabold text-[#7c3aed] mt-1">${(annualSavings / 1000).toFixed(0)}k /yr</div>
                <div className="text-[10px] font-mono text-[#7c3aed] mt-0.5 font-bold">{tcoReductionPercent}% TCO Reduction</div>
              </div>
            </div>

            <div className="flex justify-center pt-2">
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] shadow-md transition-all"
              >
                <span>Request Custom Enterprise ROI Audit</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
