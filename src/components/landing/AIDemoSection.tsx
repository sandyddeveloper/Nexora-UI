'use client';

import React, { useState } from 'react';
import { Sparkles, Bot, ArrowRight, CheckCircle2, Cpu, Play } from 'lucide-react';

export function AIDemoSection() {
  const [activeTab, setActiveTab] = useState(0);

  const demos = [
    {
      title: "Data Intelligence Agent",
      role: "Financial & Revenue Audit",
      prompt: "Execute Q3 enterprise revenue audit across multi-region AWS billing endpoints.",
      result: "Revenue variance calculated at +14.2% YoY across APAC nodes. 100% RAG vector accuracy verified.",
      metrics: ["18,400 tokens/sec", "0.42ms Latency", "SOC2 Compliant"]
    },
    {
      title: "Security & Code Agent",
      role: "Static Analysis & Vulnerabilities",
      prompt: "Inspect Pull Request #482 for memory leaks and OWASP security violations.",
      result: "0 Vulnerabilities found. AST tree parsed across 42 source files in 9.8ms. Approved for production staging.",
      metrics: ["24,100 tokens/sec", "9.8ms Latency", "Zero Data Egress"]
    },
    {
      title: "Workforce & HRMS Agent",
      role: "Automated Global Payroll",
      prompt: "Calculate August employee attendance compliance and disburse multi-currency payroll.",
      result: "$4.82M disbursement processed across 4,200 employees with zero tax calculation discrepancies.",
      metrics: ["15,800 tokens/sec", "16.4ms Latency", "100% Audit Pass"]
    }
  ];

  const current = demos[activeTab];

  return (
    <section id="ai-demo" className="py-24 md:py-32 bg-[#ffffff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Bot className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>AUTONOMOUS AI WORKFORCE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Autonomous AI Employees for Every Department.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
            Assign complex multi-step jobs to specialized neural agents with deterministic execution.
          </p>
        </div>

        {/* Minimal Tab Buttons */}
        <div className="mt-12 flex justify-center gap-3 flex-wrap">
          {demos.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === idx
                  ? 'bg-[#7c3aed] text-white shadow-md'
                  : 'bg-[#f4f0ff] text-[#475569] hover:text-[#7c3aed] border border-[#e9d5ff]'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* Minimal Card Showcase */}
        <div className="mt-10 max-w-4xl mx-auto rounded-3xl bg-[#faf8ff] border border-[#e9d5ff] p-8 md:p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Column: Prompt & Role */}
            <div>
              <div className="text-xs font-mono text-[#7c3aed] font-bold uppercase">{current.role}</div>
              <h3 className="text-2xl font-bold text-[#0f172a] mt-1">{current.title}</h3>
              
              <div className="mt-6 p-4 rounded-2xl bg-[#ffffff] border border-[#e9d5ff]">
                <div className="text-xs font-mono text-[#94a3b8]">PROMPT:</div>
                <p className="text-sm font-medium text-[#0f172a] mt-1">"{current.prompt}"</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {current.metrics.map((m, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#7c3aed]/10 text-[#7c3aed]">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Result Output Card */}
            <div className="p-6 rounded-2xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#10b981] mb-3">
                <CheckCircle2 className="w-4 h-4" />
                <span>EXECUTION COMPLETED</span>
              </div>
              <p className="text-sm text-[#0f172a] leading-relaxed font-medium">
                {current.result}
              </p>
              <div className="mt-6 pt-4 border-t border-[#e9d5ff] flex items-center justify-between text-xs font-mono text-[#64748b]">
                <span>STATUS: 100% ACCURATE</span>
                <span className="text-[#7c3aed] font-bold">AIR-GAPPED VPC</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
