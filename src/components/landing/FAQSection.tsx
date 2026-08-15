"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "How does the dual User and Staff role architecture work?",
    answer:
      "Nexora provides dedicated views and security boundaries. Customers access standard workspaces, analytics, and billing, while staff members access the internal operational station, SLA-tracked ticket queues, and system cluster health monitors.",
  },
  {
    question: "Is there full Dark and Light mode theme support?",
    answer:
      "Yes! The light mode features a refined crisp white palette with vibrant purple brand accents, while the dark mode features a deep slate canvas with glowing neon-violet highlights. The preference automatically persists and syncs with system settings.",
  },
  {
    question: "How quickly can we deploy to production?",
    answer:
      "Nexora is structured with the modern Next.js 14+ App Router, full TypeScript types, and Tailwind CSS. You can link your PostgreSQL or REST/GraphQL backends and deploy to Vercel, AWS, or Docker containers in minutes.",
  },
  {
    question: "Can we configure custom SLA countdowns and webhooks?",
    answer:
      "Absolutely. The staff triage station comes equipped with custom SLA tier targets (Urgent: < 15m, High: < 1h) and webhook triggers for automated Slack or PagerDuty incident notifications.",
  },
];

export function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="purple" size="md">
            Got Questions?
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Find answers to common questions about deployment, role access, and platform scalability.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;

            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-zinc-400 transition-transform duration-200 shrink-0 ml-4",
                      isOpen && "rotate-180 text-purple-600 dark:text-purple-400"
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
