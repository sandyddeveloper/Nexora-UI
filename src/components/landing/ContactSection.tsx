"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Headphones,
  ArrowRight,
  Mail,
  ShieldCheck,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <Badge variant="purple" size="md">
                <Headphones className="h-3 w-3 mr-1" /> 24/7 Dedicated Support
              </Badge>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
                Have Questions? Talk with Our Solutions Team
              </h2>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
                Whether you need assistance sizing your enterprise cluster, custom SLA guarantees, or immediate technical support, our team of reliability engineers is ready to help.
              </p>

              {/* Channel Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900/80 border border-purple-200/80 dark:border-purple-800/80">
                  <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Email Dispatch</h4>
                    <p className="text-[11px] text-zinc-500">support@nexora.io (&lt;15m SLA)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900/80 border border-purple-200/80 dark:border-purple-800/80">
                  <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Enterprise SLA</h4>
                    <p className="text-[11px] text-zinc-500">Dedicated SRE bridge</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Open Contact & Ticket Center
                  </Button>
                </Link>

                <a href="mailto:support@nexora.io" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                    leftIcon={<Mail className="h-4 w-4" />}
                  >
                    Direct Email
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Card Feature Box */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Direct Escalation Categories
                </h3>

                <div className="space-y-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">🛠️ Technical Support & Bugs</span>
                    <Badge variant="purple" size="sm">Priority Queue</Badge>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">💼 Custom Quotas & Sales</span>
                    <Badge variant="blue" size="sm">1-on-1 Demo</Badge>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">💳 Billing & Invoicing</span>
                    <Badge variant="gray" size="sm">Finance Team</Badge>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    <span>Submit your inquiry in the contact center</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
