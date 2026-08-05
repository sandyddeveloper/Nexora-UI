'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Play, Terminal, CheckCircle2, Cpu } from 'lucide-react';

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('Audit Q3 enterprise revenue variance across AWS nodes');

  const samplePrompts = [
    "Audit Q3 revenue variance",
    "Deploy AI Employee for payroll",
    "Check SOC2 Type II compliance",
    "Optimize gRPC API latency"
  ];

  return (
    <section className="relative pt-20 pb-24 md:pt-32 md:pb-36 bg-[#ffffff] text-[#0f172a] overflow-hidden">
      {/* Background Gradient Spotlights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-radial from-[#f3ebff] via-[#faf8ff] to-transparent pointer-events-none opacity-70" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10 text-center">
        
        {/* Google Style Release Badge Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-medium text-[#7c3aed] shadow-sm mb-8">
          <Sparkles className="w-4 h-4 text-[#7c3aed]" />
          <span className="font-semibold">NEXORA V2.4 RELEASED</span>
          <span className="text-[#c4b5fd]">•</span>
          <span className="text-[#475569]">Sub-Millisecond Neural Architecture</span>
        </div>

        {/* Clean Google Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#0f172a] max-w-4xl mx-auto leading-[1.08] font-display">
          AI Operating System for Modern Enterprises
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto font-normal leading-relaxed">
          Unify AI Employees, CRM, HRMS, Projects, and Analytics under one single-tenant neural core with air-gapped security.
        </p>

        {/* Google Search Style AI Command Bar */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="p-2 rounded-full bg-[#ffffff] border border-[#e9d5ff] shadow-[0_8px_30px_rgb(124,58,237,0.12)] flex items-center justify-between gap-2 hover:border-[#7c3aed] transition-all">
            <div className="flex items-center gap-3 pl-4 w-full">
              <Sparkles className="w-5 h-5 text-[#7c3aed] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Ask Nexora Engine to execute a task or audit data..."
                className="w-full bg-transparent text-sm font-medium text-[#0f172a] focus:outline-none placeholder-[#94a3b8]"
              />
            </div>
            <button
              onClick={() => {}}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold rounded-full shadow-md transition-all shrink-0 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Execute</span>
            </button>
          </div>

          {/* Quick Prompt Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(prompt)}
                className="px-3 py-1 rounded-full bg-[#f4f0ff] hover:bg-[#e9d5ff] text-[12px] font-medium text-[#7c3aed] border border-[#e9d5ff] transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Stack */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] rounded-full shadow-[0_4px_20px_rgba(124,58,237,0.35)] transition-all active:scale-95 group"
          >
            <Zap className="w-4 h-4 fill-current" />
            <span>Deploy Sovereign Instance</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#security"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-[#0f172a] bg-[#f4f0ff] hover:bg-[#e9d5ff] border border-[#e9d5ff] rounded-full transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-[#10b981]" />
            <span>Explore Architecture</span>
          </a>
        </div>

        {/* Micro Guarantees */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748b] font-medium">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#10b981]" /> SOC2 Type II Certified</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#10b981]" /> No Credit Card Required</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#10b981]" /> Air-Gapped VPC Ready</span>
        </div>

        {/* Minimal Google Style Dashboard Frame */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="rounded-3xl bg-[#ffffff] border border-[#e9d5ff] p-6 sm:p-8 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.15)] text-left">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-6 border-b border-[#e9d5ff]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#7c3aed]/10 text-[#7c3aed]">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0f172a]">Nexora Sovereign Core Console</h3>
                  <p className="text-xs text-[#64748b]">console.nexora.io // enterprise-cluster-01</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20">
                ● 99.999% SLA Active
              </span>
            </div>

            {/* 3 Metric Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#e9d5ff]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#7c3aed]">
                  <span>AI AGENT NODE</span>
                  <span className="text-[#10b981]">ACTIVE</span>
                </div>
                <div className="mt-3 text-lg font-bold text-[#0f172a]">Data Analyst Agent #04</div>
                <p className="mt-1 text-xs text-[#64748b]">Auditing revenue forecast vectors...</p>
                <div className="mt-4 pt-3 border-t border-[#e9d5ff] text-xs font-mono text-[#7c3aed] font-semibold">
                  18,400 tokens/sec
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#e9d5ff]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#7c3aed]">
                  <span>NEURAL ROUTER</span>
                  <span className="text-[#7c3aed]">BALANCED</span>
                </div>
                <div className="mt-3 text-lg font-bold text-[#0f172a]">GPT-4o ↔ Claude Failover</div>
                <p className="mt-1 text-xs text-[#64748b]">Auto-switching model context...</p>
                <div className="mt-4 pt-3 border-t border-[#e9d5ff] text-xs font-mono text-[#10b981] font-semibold">
                  -68% TCO Savings
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#faf8ff] border border-[#e9d5ff]">
                <div className="flex items-center justify-between text-xs font-semibold text-[#10b981]">
                  <span>AIR-GAPPED VPC</span>
                  <span className="text-[#10b981]">ENCRYPTED</span>
                </div>
                <div className="mt-3 text-lg font-bold text-[#0f172a]">KMS Customer Key Enclave</div>
                <p className="mt-1 text-xs text-[#64748b]">Zero data egress outside VPC...</p>
                <div className="mt-4 pt-3 border-t border-[#e9d5ff] text-xs font-mono text-[#10b981] font-semibold">
                  SOC2 Type II Audited
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[#e9d5ff] flex items-center justify-between text-xs font-mono text-[#64748b]">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#7c3aed]" />
                <span>$ nexora deploy --cluster=prod-us-east-1</span>
              </div>
              <span className="text-[#10b981] font-bold">✔ DEPLOYED IN 4.2s</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
