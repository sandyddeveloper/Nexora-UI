'use client';

import React from 'react';
import { Zap, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-28 bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] text-white relative overflow-hidden">
      
      {/* Ambient Light Overlay */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] pointer-events-none opacity-20"
        style={{
          background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(124, 58, 237, 0) 100%)'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[rgba(255,255,255,0.15)] border border-[rgba(255,255,255,0.25)] text-xs font-mono text-white font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>INSTANT ENTERPRISE PROVISIONING</span>
        </div>

        <h2 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-display max-w-4xl mx-auto leading-tight">
          Architect Your Enterprise Operating System Today.
        </h2>

        <p className="mt-6 text-base sm:text-lg text-purple-100 max-w-2xl mx-auto font-medium">
          Join global institutions deploying sovereign AI infrastructure with sub-millisecond execution and 99.999% SLA guarantees.
        </p>

        {/* Dual CTA Button Stack */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-[#0f172a] bg-[#ffffff] hover:bg-purple-50 rounded-lg shadow-xl transition-all active:scale-95 group"
          >
            <Zap className="w-5 h-5 fill-current text-[#7c3aed]" />
            <span>Deploy Sovereign Instance</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#7c3aed]" />
          </a>

          <a
            href="#security"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 text-base font-semibold text-white bg-[rgba(255,255,255,0.12)] hover:bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.25)] rounded-lg transition-all"
          >
            <ShieldCheck className="w-5 h-5 text-[#10b981]" />
            <span>Schedule CISO Security Audit</span>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-purple-200 font-medium">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> Deploy in 4 Minutes</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> Full SOC2 Compliance Pack</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#10b981]" /> 99.999% SLA Guarantee</span>
        </div>

      </div>
    </section>
  );
}
