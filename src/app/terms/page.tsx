"use client";

import React from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, ShieldCheck, FileText } from "lucide-react";

export default function TermsPage() {
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
              <FileText className="h-3 w-3 mr-1" /> Legal Agreement
            </Badge>
            <span className="text-xs text-zinc-500 font-mono">Last updated: August 15, 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Terms of Service & Conditions
          </h1>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Please read these terms and conditions carefully before using the Nexora cloud platform, workspaces, APIs, and operational services.
          </p>
        </div>

        {/* Legal Sections Content */}
        <div className="space-y-10 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">1. Acceptance of Terms</h2>
            <p>
              By creating an account, accessing workspaces, using our API keys, or logging into the Customer and Staff dashboards, you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company or legal entity, you represent that you possess the authority to bind such entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">2. Account Roles & Access Credentials</h2>
            <p>
              Nexora provides separated access tiers for Standard Users and Staff/Administrators. You are responsible for safeguarding your login credentials, enabling Two-Factor Authentication (2FA), and restricting API secret exposure.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-600 dark:text-zinc-400">
              <li><strong>User Role:</strong> Granted access to project workspaces, analytical charts, billing, and team collaboration.</li>
              <li><strong>Staff Role:</strong> Restricted to authorized support engineers handling customer triage, incident escalation, and cluster monitoring.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">3. Workspace Licenses & Fair Usage</h2>
            <p>
              Workspaces are provisioned according to your subscription tier (Starter, Growth Pro, or Enterprise). You agree not to exceed allocated monthly API invocation limits, abuse rate limits, or deploy unauthorized high-frequency automated scraping against our edge network.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">4. Service Availability & SLA Commitments</h2>
            <p>
              We strive to maintain a 99.99% uptime availability across our distributed edge clusters. Scheduled maintenance windows will be communicated via topbar broadcasts or email notifications at least 24 hours in advance, except in emergency security remediation scenarios.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">5. Data Ownership & Intellectual Property</h2>
            <p>
              You retain all rights, title, and interest in and to any data, configurations, and assets uploaded to your workspaces. Nexora claims no ownership over customer data and processes such information strictly to deliver platform services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">6. Termination & Suspension</h2>
            <p>
              We reserve the right to suspend or terminate access to any workspace or staff account that violates our security policies, fails to remit subscription fees, or engages in malicious network activities.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">7. Contact Information</h2>
            <p>
              For legal inquiries, terms compliance, or enterprise master service agreements, contact our legal counsel at <a href="mailto:legal@nexora.io" className="font-semibold text-purple-600 dark:text-purple-400 hover:underline">legal@nexora.io</a>.
            </p>
          </section>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
