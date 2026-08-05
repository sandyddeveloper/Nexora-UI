'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does Nexora Engine differ from traditional per-seat SaaS tools?',
      a: 'Traditional SaaS solutions charge hefty per-seat licenses (e.g. $180/user/month across Jira, Salesforce, Workday). Nexora Engine operates on predictable compute-based pricing, allowing unlimited employees and AI agents on a single sovereign cluster.'
    },
    {
      q: 'Can Nexora Engine be deployed in an air-gapped VPC or on-premise hardware?',
      a: 'Yes. Nexora Engine supports full single-tenant deployment inside your AWS, GCP, Azure, or bare-metal hardware enclaves with zero external data egress. You retain 100% cryptographic control over KMS keys and model parameters.'
    },
    {
      q: 'Are our enterprise data and RAG vector indices used to train public models?',
      a: 'Never. All customer data, vector embeddings, and operational logs are strictly isolated within your private enclave and are never shared or used to train foundation models.'
    },
    {
      q: 'What SLA uptime guarantees are provided?',
      a: 'Nexora Enterprise Sovereign and Global Institution tiers include a 99.999% active-active multi-region SLA with 24/7 dedicated solutions engineering support.'
    },
    {
      q: 'How fast is the typical enterprise migration or deployment?',
      a: 'Single-tenant clusters deploy automatically in under 4 minutes. Pre-built data connectors sync PostgreSQL, Snowflake, SAML SSO, and Slack webhooks in hours rather than months.'
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#faf8ff] border-b border-[#e9d5ff] relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Frequently Asked Questions.
          </h2>
        </div>

        {/* Accordions */}
        <div className="mt-14 space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-[#ffffff] border border-[#e9d5ff] overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#0f172a] hover:text-[#7c3aed] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#7c3aed] shrink-0 transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>

              {openIdx === idx && (
                <div className="px-6 pb-6 pt-0 text-sm text-[#475569] leading-relaxed font-medium border-t border-[#e9d5ff]/50">
                  <p className="pt-4">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
