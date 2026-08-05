'use client';

import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

export function IntegrationsSection() {
  const integrations = [
    'PostgreSQL', 'Snowflake', 'AWS KMS', 'Google Cloud', 
    'Azure AD', 'Okta SAML', 'Stripe API', 'Slack Webhooks',
    'GitHub Actions', 'Datadog', 'Kubernetes', 'Redis Enclave'
  ];

  return (
    <section className="py-20 bg-[#ffffff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
          <Layers className="w-3.5 h-3.5 text-[#7c3aed]" />
          <span>NATIVE ENTERPRISE CONNECTORS</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[#0f172a] font-display">
          Seamlessly Connects With Your Existing Stack.
        </h2>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {integrations.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#faf8ff] border border-[#e9d5ff] flex items-center justify-center gap-2 text-xs font-bold text-[#0f172a] hover:border-[#7c3aed] transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
