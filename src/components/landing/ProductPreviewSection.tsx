'use client';

import React from 'react';
import { Layers, Briefcase, Users, DollarSign, Activity, ArrowRight } from 'lucide-react';

export function ProductPreviewSection() {
  const suites = [
    {
      icon: Briefcase,
      title: 'Projects Engine',
      subtitle: 'Linear-grade issue tracking & sprint velocity.',
      desc: 'Real-time task filtering, automated Git pull request linking, and velocity charts with zero latency.'
    },
    {
      icon: Users,
      title: 'Autonomous CRM',
      subtitle: 'Predictive account intelligence & lead scoring.',
      desc: 'Auto-sync customer interaction vectors and enrich pipeline metrics without manual data entry.'
    },
    {
      icon: DollarSign,
      title: 'Global HRMS Suite',
      subtitle: 'Biometric attendance & multi-country payroll.',
      desc: 'Calculate regional tax withholdings and disburse automated direct deposits with 100% compliance.'
    },
    {
      icon: Activity,
      title: 'Real-Time Telemetry',
      subtitle: 'Sub-millisecond compute & vector RAG monitoring.',
      desc: 'Track GPU memory enclaves, active token burn rates, and cryptographic audit logs live.'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#faf8ff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Layers className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>UNIFIED OPERATIONAL CANVAS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            One Operating System for Your Entire Enterprise.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
            Replace fragmented SaaS tools with one single-tenant platform.
          </p>
        </div>

        {/* 4 Clean Minimal Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {suites.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#ffffff] border border-[#e9d5ff] p-8 shadow-sm hover:shadow-md hover:border-[#7c3aed] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#f4f0ff] border border-[#e9d5ff] text-[#7c3aed] flex items-center justify-center mb-6 group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xl font-bold text-[#0f172a] group-hover:text-[#7c3aed] transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-semibold text-[#7c3aed] mt-1">{item.subtitle}</div>

                <p className="mt-3 text-sm text-[#475569] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e9d5ff] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#7c3aed] group-hover:text-[#6d28d9] flex items-center gap-1">
                  Inspect module <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-[#94a3b8]">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
