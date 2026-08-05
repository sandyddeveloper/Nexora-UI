'use client';

import React from 'react';
import { Workflow, Play, Zap, ArrowRight, CheckCircle2, Database, Bot, Bell } from 'lucide-react';

export function AutomationShowcaseSection() {
  const pipelineNodes = [
    { type: 'TRIGGER', name: 'PostgreSQL Webhook', detail: 'Event: customer.created', icon: Database, color: '#7c3aed' },
    { type: 'AI AGENT', name: 'Neural Enrichment Agent', detail: 'Model: Nexora-v2.4 (RAG)', icon: Bot, color: '#a855f7' },
    { type: 'ACTION', name: 'Slack & Email Dispatch', detail: 'Payload: #sales-exec-lead', icon: Bell, color: '#10b981' },
  ];

  return (
    <section id="automation" className="py-24 md:py-32 bg-[#ffffff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Workflow className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>VISUAL AUTOMATION PIPELINES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Build Complex Neural Pipelines Without Writing Code.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
            Drag and drop database triggers, AI reasoning nodes, and enterprise webhooks into real-time sub-millisecond workflows.
          </p>
        </div>

        {/* Visual Pipeline Showcase Frame */}
        <div className="mt-16 max-w-4xl mx-auto rounded-3xl bg-[#faf8ff] border border-[#e9d5ff] p-8 shadow-[0_20px_50px_-10px_rgba(124,58,237,0.15)]">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#e9d5ff] text-xs font-mono text-[#64748b]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
              <span className="text-[#0f172a] font-bold">PIPELINE #8421: Customer Onboarding Graph</span>
            </div>
            <span className="text-[#7c3aed] font-bold">EXECUTION SPEED: 0.42ms</span>
          </div>

          {/* Node Flow Horizontal Graph */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {pipelineNodes.map((node, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm hover:border-[#7c3aed] transition-all relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span 
                      className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold"
                      style={{ backgroundColor: `${node.color}15`, color: node.color }}
                    >
                      {node.type}
                    </span>
                    <span className="text-[10px] font-mono text-[#10b981] font-bold">✔ READY</span>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded-xl border bg-[#faf8ff]"
                      style={{ borderColor: `${node.color}30`, color: node.color }}
                    >
                      <node.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0f172a]">{node.name}</h4>
                      <p className="text-xs text-[#64748b] mt-0.5">{node.detail}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-[#e9d5ff] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
                  <span>STEP 0{idx + 1}</span>
                  <span className="text-[#7c3aed] font-semibold">Latency &lt; 0.1ms</span>
                </div>
              </div>
            ))}
          </div>

          {/* Execution Bar */}
          <div className="mt-8 pt-6 border-t border-[#e9d5ff] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
            <div className="flex items-center gap-2 text-[#10b981] font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>TEST RUN COMPLETED WITH ZERO ERRORS</span>
            </div>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-semibold rounded-full shadow-sm transition-all">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Publish Live Graph</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
