'use client';

import React from 'react';
import { ShieldCheck, Lock, FileLock2, Award, Server, CheckCircle2 } from 'lucide-react';

export function SecuritySection() {
  const complianceBadges = [
    { title: 'SOC2 Type II Certified', desc: 'Audited annual SOC2 compliance by independent Big Four firm.', icon: ShieldCheck },
    { title: 'ISO27001 & ISO27018', desc: 'International standard for cloud data privacy and security management.', icon: Award },
    { title: 'Air-Gapped VPC Isolation', desc: 'Deploy within customer AWS/GCP/Azure VPCs with zero data egress.', icon: Server },
    { title: 'Cryptographic Audit Trail', desc: 'Immutable append-only log ledger for all AI agent prompt actions.', icon: FileLock2 }
  ];

  return (
    <section id="security" className="py-24 md:py-32 bg-[#ffffff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Lock className="w-3.5 h-3.5 text-[#10b981]" />
            <span>SOVEREIGN SECURITY & TRUST CENTER</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Built for Zero-Trust Enterprise Security Requirements.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
            Your data never trains public models. Retain 100% cryptographic sovereignty over model weights and customer data enclaves.
          </p>
        </div>

        {/* 4 Compliance Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {complianceBadges.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#faf8ff] border border-[#e9d5ff] shadow-sm hover:border-[#7c3aed] transition-all flex items-start gap-5"
            >
              <div className="p-3 rounded-2xl bg-[#ffffff] border border-[#e9d5ff] text-[#7c3aed] shadow-sm shrink-0">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0f172a]">{item.title}</h3>
                <p className="mt-2 text-sm text-[#475569] leading-relaxed font-medium">{item.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#10b981]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>VERIFIED COMPLIANT</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
