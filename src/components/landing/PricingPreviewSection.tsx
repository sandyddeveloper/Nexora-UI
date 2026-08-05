'use client';

import React, { useState } from 'react';
import { Check, Zap, ArrowRight, DollarSign } from 'lucide-react';

export function PricingPreviewSection() {
  const [annualBilling, setAnnualBilling] = useState(true);

  const tiers = [
    {
      name: 'Core Cluster',
      desc: 'For high-growth engineering teams scaling low-latency AI pipelines.',
      priceMonthly: 599,
      priceAnnual: 499,
      badge: null,
      features: [
        '5 Autonomous AI Employees',
        'Projects, CRM & HRMS Suites',
        '10M RAG Vector Storage',
        '99.9% Uptime SLA',
        'Standard Support & Webhooks'
      ],
      cta: 'Start 14-Day Free Trial',
      highlight: false
    },
    {
      name: 'Enterprise Sovereign',
      desc: 'Dedicated multi-region deployment with custom fine-tuning and 99.999% SLA.',
      priceMonthly: 2399,
      priceAnnual: 1999,
      badge: 'MOST POPULAR',
      features: [
        'Unlimited AI Employees & Agents',
        'Customer VPC / Air-Gapped Option',
        'Customer KMS Encryption Keys',
        '100M RAG Vector Storage',
        '99.999% Active-Active SLA',
        '24/7 Dedicated Solutions Engineer'
      ],
      cta: 'Deploy Sovereign Instance',
      highlight: true
    },
    {
      name: 'Global Institution',
      desc: 'Custom air-gapped infrastructure, zero-trust hardware enclaves, and CISO audit support.',
      priceMonthly: null,
      priceAnnual: null,
      badge: 'AIR-GAPPED HARDWARE',
      features: [
        'On-Premise Hardware Enclave',
        'Custom LLM Fine-Tuning Pipelines',
        'Zero Data Egress Verification',
        'CISO Security Audit Pack',
        'Custom SLA & Contract Guarantees'
      ],
      cta: 'Contact Executive Engineering',
      highlight: false
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-[#ffffff] relative border-b border-[#e9d5ff]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-mono text-[#7c3aed] font-bold">
            <DollarSign className="w-3.5 h-3.5" />
            <span>TRANSPARENT COMPUTE TIERS</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-bold tracking-tight text-gradient-hero font-display">
            Predictable Compute Pricing. Zero Per-Seat Taxes.
          </h2>
          <p className="mt-4 text-base text-[#475569] font-medium">
            Scale your enterprise operational intelligence without ballooning seat-license costs.
          </p>

          {/* Billing Toggle Switch */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <span className={`text-xs font-mono ${!annualBilling ? 'text-[#0f172a] font-bold' : 'text-[#64748b]'}`}>MONTHLY</span>
            <button
              onClick={() => setAnnualBilling(!annualBilling)}
              className="relative inline-flex h-6 w-12 items-center rounded-full bg-[#e9d5ff] p-1 transition-colors"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[#7c3aed] transition-transform ${
                  annualBilling ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-mono ${annualBilling ? 'text-[#0f172a] font-bold' : 'text-[#64748b]'}`}>
              ANNUAL <span className="text-[#10b981] font-bold">(20% SAVINGS)</span>
            </span>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`glass-card p-6 flex flex-col justify-between relative ${
                tier.highlight
                  ? 'border-2 border-[#7c3aed] shadow-[0_12px_40px_rgba(124,58,237,0.2)] bg-[#faf8ff]'
                  : 'bg-[#ffffff]'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider text-white bg-[#7c3aed] shadow-sm">
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-[#0f172a] font-display">{tier.name}</h3>
                <p className="mt-2 text-xs text-[#64748b] leading-relaxed font-medium">{tier.desc}</p>

                <div className="mt-6 pb-6 border-b border-[#e9d5ff]">
                  {tier.priceAnnual !== null ? (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[#0f172a] font-mono">
                        ${annualBilling ? tier.priceAnnual : tier.priceMonthly}
                      </span>
                      <span className="text-xs font-mono text-[#64748b]">/ month base</span>
                    </div>
                  ) : (
                    <div className="text-3xl font-extrabold text-[#0f172a] font-mono">
                      Custom Quote
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="text-xs font-mono text-[#7c3aed] font-bold uppercase tracking-wider">INCLUDED CAPABILITIES:</div>
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#475569] font-medium">
                      <Check className="w-4 h-4 text-[#10b981] shrink-0 font-bold" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <a
                  href="#pricing"
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-xs font-semibold transition-all ${
                    tier.highlight
                      ? 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white shadow-md'
                      : 'bg-[#f4f0ff] hover:bg-[#e9d5ff] text-[#7c3aed] border border-[#e9d5ff]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
