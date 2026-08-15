"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    description: "Ideal for early-stage startups and small projects testing workflows.",
    monthlyPrice: "$29",
    annualPrice: "$24",
    features: [
      "Up to 5 Workspace Seats",
      "Standard User Dashboard",
      "50,000 Monthly API Requests",
      "Email Support (24h SLA)",
      "Community Access & Docs",
    ],
    popular: false,
  },
  {
    name: "Growth Pro",
    description: "Built for scaling engineering teams requiring dedicated staff triage suites.",
    monthlyPrice: "$79",
    annualPrice: "$64",
    features: [
      "Up to 25 Workspace Seats",
      "Dual Role: User & Staff Dashboard",
      "500,000 Monthly API Requests",
      "Automated Incident Triage",
      "Live Analytics & Sparklines",
      "Priority Support (1h SLA)",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Tailored infrastructure, unlimited workspaces, and bespoke SLAs.",
    monthlyPrice: "$249",
    annualPrice: "$199",
    features: [
      "Unlimited Workspace Seats",
      "Full Staff Operations & RBAC",
      "Unlimited API Invocations",
      "Custom SLA & Dedicated Engineer",
      "SOC-2 & SAML SSO Integration",
      "Audit Log Export & Webhooks",
    ],
    popular: false,
  },
];

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section id="pricing" className="py-20 bg-zinc-50/50 dark:bg-zinc-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="purple" size="md">
            Flexible Pricing
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Transparent Pricing That Scales With You
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Start with our 14-day free trial. No credit card required. Cancel anytime.
          </p>

          {/* Billing Interval Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white dark:bg-zinc-900 p-1.5 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                !isAnnual
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              )}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                isAnnual
                  ? "bg-purple-600 text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              )}
            >
              <span>Annual Billing</span>
              <span className="rounded-full bg-emerald-100 dark:bg-emerald-950 text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 px-2 py-0.2">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, idx) => (
            <div
              key={idx}
              className={cn(
                "relative rounded-3xl p-8 transition-all duration-300 flex flex-col justify-between",
                plan.popular
                  ? "bg-white dark:bg-zinc-900 border-2 border-purple-600 shadow-2xl shadow-purple-600/20 lg:-translate-y-2"
                  : "bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-purple-300"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="purple" size="md" className="bg-purple-600 text-white border-0 shadow-md">
                    <Sparkles className="h-3 w-3 mr-1" /> Most Popular Choice
                  </Badge>
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{plan.name}</h3>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed min-h-[36px]">
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                  <span className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium">/ seat / month</span>
                </div>

                {/* Feature Checklist */}
                <div className="mt-6 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">Included Features:</p>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-zinc-700 dark:text-zinc-300">
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400">
                        <Check className="h-2.5 w-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link href="/signup" className="w-full block">
                  <Button
                    variant={plan.popular ? "purple-glow" : "outline"}
                    className="w-full"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Get Started with {plan.name}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
