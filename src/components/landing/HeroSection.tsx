import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowRight, CheckCircle2, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 bg-white dark:bg-zinc-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Release Pill Badge */}
        <Link
          href="/changelog"
          className="inline-flex items-center gap-2 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/60 px-4 py-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 shadow-sm mb-8 hover:bg-purple-100 dark:hover:bg-purple-900/60 hover:border-purple-300 transition-all cursor-pointer group"
        >
          <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
          <span>Next-Gen Enterprise Engine 2.4 is Live</span>
          <ArrowRight className="h-3 w-3 text-purple-600 dark:text-purple-400 group-hover:translate-x-0.5 transition-transform" />
        </Link>

        {/* Hero Headline with Solid Colors */}
        <h1 className="mx-auto max-w-4xl text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1] md:leading-[1.1]">
          Unified Intelligence & Operations for{" "}
          <span className="text-purple-600 dark:text-purple-400">
            Modern SaaS Teams
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          Accelerate your workflows with unified role-based dashboards, automated incident triage, real-time analytics, and lightning-fast workspace collaboration.
        </p>

        {/* CTA Button Group */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto text-base px-8 h-12 shadow-md bg-purple-600 hover:bg-purple-700 text-white"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              Start Free Trial
            </Button>
          </Link>
          <a href="#preview" className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base px-6 h-12"
              leftIcon={<Play className="h-4 w-4 fill-purple-600 text-purple-600" />}
            >
              Explore Live Demo
            </Button>
          </a>
        </div>

        {/* Guarantee Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>14-day full feature trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            <span>Instant User & Staff role switching</span>
          </div>
        </div>
      </div>
    </section>
  );
}
