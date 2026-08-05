'use client';

import React from 'react';
import { 
  Bot, 
  Briefcase, 
  Users, 
  DollarSign, 
  Workflow, 
  FileText, 
  ArrowRight, 
  Sparkles 
} from 'lucide-react';

export function FeatureGridSection() {
  const features = [
    {
      icon: Bot,
      title: 'Autonomous AI Employees',
      desc: 'Deploy pre-configured digital workers that execute multi-step jobs across departments with 100% deterministic accuracy.',
      tag: 'AI WORKFORCE'
    },
    {
      icon: Briefcase,
      title: 'Issue & Project Management',
      desc: 'Linear-grade task velocity, sprint analytics, and automated Git pull request linking with sub-millisecond filtering.',
      tag: 'PROJECTS'
    },
    {
      icon: Users,
      title: 'Enterprise Account CRM',
      desc: 'Predictive lead scoring, pipeline health telemetry, and automated customer interaction context enrichment.',
      tag: 'CRM SUITE'
    },
    {
      icon: DollarSign,
      title: 'HRMS & Automated Payroll',
      desc: 'Biometric attendance sync, multi-country tax compliance, and instant direct deposit disbursements.',
      tag: 'HRMS & PAYROLL'
    },
    {
      icon: Workflow,
      title: 'Visual Neural Workflow Builder',
      desc: 'Connect webhooks, database triggers, LLM reasoning nodes, and notifications on a visual drag-and-drop canvas.',
      tag: 'AUTOMATION'
    },
    {
      icon: FileText,
      title: 'Vectorized Knowledge RAG Base',
      desc: 'Index millions of enterprise documents, PDFs, and API specs for instant sub-12ms AI Copilot semantic retrieval.',
      tag: 'KNOWLEDGE RAG'
    }
  ];

  return (
    <section id="features" className="py-24 md:py-32 bg-[#faf8ff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Clean Google Headline Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>ENTERPRISE MODULES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Everything your enterprise needs in one platform.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
            Six core operational engines unified under a single air-gapped neural architecture. No per-seat tax.
          </p>
        </div>

        {/* Clean 3-Column Minimal Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#ffffff] border border-[#e9d5ff] p-8 shadow-sm hover:shadow-md hover:border-[#7c3aed] transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Icon Pill */}
                <div className="w-12 h-12 rounded-2xl bg-[#f4f0ff] border border-[#e9d5ff] text-[#7c3aed] flex items-center justify-center mb-6 group-hover:bg-[#7c3aed] group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>

                <span className="text-[11px] font-mono font-bold tracking-wider text-[#7c3aed] uppercase">
                  {item.tag}
                </span>

                <h3 className="text-xl font-bold text-[#0f172a] mt-2 mb-3 group-hover:text-[#7c3aed] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[#475569] leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e9d5ff] flex items-center justify-between">
                <span className="text-xs font-semibold text-[#7c3aed] group-hover:text-[#6d28d9] flex items-center gap-1">
                  Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
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
