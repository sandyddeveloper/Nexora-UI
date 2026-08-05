'use client';

import React from 'react';
import { Zap, Shield, Cpu, ArrowRight } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    { step: '01', title: 'Provision Sovereign VPC Node', desc: 'Deploy single-tenant isolated cluster in your preferred cloud or on-premise hardware.' },
    { step: '02', title: 'Connect Enterprise Data Connectors', desc: 'Sync PostgreSQL, Snowflake, SAML SSO, and Slack webhooks with zero code.' },
    { step: '03', title: 'Assign Autonomous AI Agents', desc: 'Deploy pre-built AI Employees or custom reasoning graphs to automate complex workflows.' }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#faf8ff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Zap className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>RAPID 4-MINUTE DEPLOYMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            How Nexora Engine Deploys in Your Environment.
          </h2>
        </div>

        {/* 3 Step Flow Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm hover:shadow-md transition-all relative flex flex-col justify-between"
            >
              <div>
                <span className="text-3xl font-extrabold text-[#7c3aed] font-mono">{item.step}</span>
                <h3 className="text-lg font-bold text-[#0f172a] mt-4 mb-2">{item.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed font-medium">{item.desc}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#e9d5ff] flex items-center justify-between text-xs font-semibold text-[#7c3aed]">
                <span>READY TO DEPLOY</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
