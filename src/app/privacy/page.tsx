"use client";

import React from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="purple" size="md">
              <ShieldCheck className="h-3 w-3 mr-1" /> Privacy & Data Protection
            </Badge>
            <span className="text-xs text-zinc-500 font-mono">Effective: August 15, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Your privacy is fundamental to our architecture. This policy explains how Nexora collects, uses, protects, and handles your personal data and workspace telemetry.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-10 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1. Information We Collect</h2>
            <p>
              We collect information you provide directly when creating accounts, setting up workspaces, or contacting our support team:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li><strong>Account Identifiers:</strong> Full name, business email, role designation, and avatar metadata.</li>
              <li><strong>Authentication Data:</strong> Two-factor authentication configuration tokens and encrypted password hashes.</li>
              <li><strong>Operational Telemetry:</strong> API invocation counts, response latency percentiles, error rates, and support ticket triage communications.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">2. How We Utilize Your Data</h2>
            <p>
              Nexora processes your data exclusively to deliver and safeguard platform operations:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li>Providing role-separated user and staff dashboard interfaces.</li>
              <li>Executing real-time support ticket resolution and SLA monitoring.</li>
              <li>Analyzing global edge network performance and mitigating DDoS incidents.</li>
              <li>Delivering critical service broadcast announcements and maintenance alerts.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">3. Multi-Tenant Workspace Privacy & Isolation</h2>
            <p>
              Every workspace is logically isolated. Customer data in one organization cannot be queried or accessed by users from another organization. Access by staff members is restricted to authorized Tier-2 engineers with active incident tickets under audited session controls.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">4. Cookies & Local Storage</h2>
            <p>
              We utilize browser localStorage solely to persist your theme preference (Light vs. Dark mode) and session authentication tokens. We do not sell tracking cookies or share behavioral profiling data with third-party advertisers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">5. GDPR & CCPA Compliance Rights</h2>
            <p>
              Under global privacy frameworks including GDPR (Europe) and CCPA (California), you possess the right to access, rectify, export, or permanently erase your personal data at any time from your <Link href="/dashboard/profile" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">Profile Settings</Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">6. Data Security & Encryption</h2>
            <p>
              All network transmissions are encrypted with TLS 1.3 in transit and AES-256 at rest. We enforce strict role-based access control and regular automated penetration testing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">7. Data Privacy Officer Contact</h2>
            <p>
              For privacy requests, GDPR data erasure petitions, or compliance audits, contact our Data Protection Officer at <a href="mailto:privacy@nexora.io" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">privacy@nexora.io</a>.
            </p>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
