'use client';

import React from 'react';
import { Star, Building2, Quote } from 'lucide-react';

export function CustomerStoriesSection() {
  const stories = [
    {
      quote: "Nexora Engine allowed us to replace 8 fragmented SaaS subscriptions with one single-tenant instance. Our annual infrastructure TCO dropped by 68% while AI agent throughput increased 10x.",
      author: "Marcus Vance",
      title: "Chief Information Security Officer",
      company: "Vertex Defense Networks",
      metric: "-68% TCO Savings"
    },
    {
      quote: "The air-gapped VPC deployment gave our legal compliance team 100% confidence. We run automated payroll and project workflows across 4,200 employees with zero data egress risks.",
      author: "Elena Rostova",
      title: "VP of Enterprise Infrastructure",
      company: "Aether Financial Group",
      metric: "99.999% SLA Uptime"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#faf8ff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Building2 className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>VERIFIED CISO & EXECUTIVE TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Trusted by Global Enterprise Leaders.
          </h2>
        </div>

        {/* 2 Story Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#ffffff] border border-[#e9d5ff] shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <Quote className="w-8 h-8 text-[#7c3aed]/30 mb-4" />
                <p className="text-base text-[#0f172a] font-medium leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#e9d5ff] flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0f172a]">{story.author}</h4>
                  <p className="text-xs text-[#64748b]">{story.title} • <strong className="text-[#7c3aed]">{story.company}</strong></p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20">
                  {story.metric}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
