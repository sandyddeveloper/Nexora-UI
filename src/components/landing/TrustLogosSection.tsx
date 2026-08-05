'use client';

import React from 'react';
import { Shield, Cpu, Zap, Globe, Layers, Lock, Award, Server } from 'lucide-react';

export function TrustLogosSection() {
  const logos = [
    { name: 'VERTEX DEFENSE NETWORKS', icon: Shield, metric: '99.999% SLA' },
    { name: 'AETHER FINANCIAL GROUP', icon: Zap, metric: '4.2B TOKENS/DAY' },
    { name: 'QUANTUM HEALTHCARE', icon: Award, metric: 'HIPAA COMPLIANT' },
    { name: 'NEXUS GLOBAL SYSTEMS', icon: Globe, metric: 'AIR-GAPPED VPC' },
    { name: 'CYPHER SECURITY CAPITAL', icon: Lock, metric: 'SOC2 TYPE II' },
    { name: 'TITAN INFRASTRUCTURE', icon: Server, metric: 'SUB-12MS LATENCY' },
    { name: 'SYNAPSE AUTONOMOUS', icon: Cpu, metric: '100% SOVEREIGN' },
    { name: 'OMNI DATA CORP', icon: Layers, metric: '0.42ms RUNTIME' },
  ];

  return (
    <section className="py-12 bg-[#ffffff] border-y border-[#e9d5ff] relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
        <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#7c3aed]">
          POWERING SOVEREIGN COMPUTE FOR GLOBAL INSTITUTIONS & FORTUNE 500 LEADERBOARD
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#ffffff] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#ffffff] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-12 py-2">
          {[...logos, ...logos].map((logo, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-5 py-2.5 rounded-lg bg-[#faf8ff] border border-[#e9d5ff] hover:border-[#7c3aed] transition-all group shrink-0 shadow-sm"
            >
              <logo.icon className="w-4 h-4 text-[#7c3aed] group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wider font-mono text-[#0f172a] group-hover:text-[#7c3aed] transition-colors">
                  {logo.name}
                </span>
                <span className="text-[10px] font-mono text-[#64748b]">
                  {logo.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
