"use client";

import React, { useState } from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import {
  Mail,
  MessageSquare,
  Building,
  Phone,
  Clock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Headphones,
  HelpCircle,
} from "lucide-react";

type InquiryCategory = "technical" | "sales" | "billing" | "partnership";

export default function ContactPage() {
  const [category, setCategory] = useState<InquiryCategory>("technical");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API ticket creation
    setTimeout(() => {
      setIsSubmitting(false);
      const ticketId = `NEX-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedTicket(ticketId);
    }, 1200);
  };

  const handleReset = () => {
    setSubmittedTicket(null);
    setName("");
    setEmail("");
    setCompany("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-8 mb-12 text-center max-w-3xl mx-auto">
          <Badge variant="purple" size="md">
            <Headphones className="h-3 w-3 mr-1" /> Get in Touch
          </Badge>
          <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            How Can We Help Your Team?
          </h1>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Have questions about high-throughput clusters, custom SLAs, enterprise migration, or need technical assistance? Our team is available 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Support Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-6">
              <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Direct Channels
              </h2>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Email Support</h4>
                    <p className="text-zinc-500 mt-0.5">support@nexora.io</p>
                    <span className="text-[10px] font-semibold text-purple-600 dark:text-purple-400">Avg response: &lt; 15 mins</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Enterprise Hotline</h4>
                    <p className="text-zinc-500 mt-0.5">+1 (800) 555-NEXORA</p>
                    <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">Available 24/7 for Tier-1</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center shrink-0">
                    <Building className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Headquarters</h4>
                    <p className="text-zinc-500 mt-0.5">500 Howard Street, Suite 400</p>
                    <p className="text-zinc-400">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Guarantee Box */}
            <div className="p-6 rounded-3xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-purple-600" />
                <h3 className="font-bold text-xs uppercase tracking-wider text-purple-950 dark:text-purple-200">
                  Enterprise SLA Commitment
                </h3>
              </div>
              <p className="text-xs text-purple-800 dark:text-purple-300 leading-relaxed">
                Enterprise plan customers receive guaranteed 15-minute response times from dedicated site reliability engineers.
              </p>
              <Link href="/#pricing" className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 dark:text-purple-300 hover:underline">
                <span>View Enterprise Plans</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              {submittedTicket ? (
                <div className="py-12 text-center space-y-6">
                  <div className="h-16 w-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <Badge variant="emerald" size="md">
                      Ticket Created: {submittedTicket}
                    </Badge>
                    <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
                      Message Received!
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting Nexora. A confirmation has been dispatched to <strong>{email}</strong>. Our staff queue has picked up your request.
                    </p>
                  </div>

                  <div className="pt-4 flex items-center justify-center gap-3">
                    <Button variant="primary" size="md" onClick={handleReset}>
                      Submit Another Inquiry
                    </Button>
                    <Link href="/">
                      <Button variant="outline" size="md">
                        Return Home
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Category Pill Selector */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2.5">
                      Inquiry Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "technical", label: "Technical Support" },
                        { id: "sales", label: "Enterprise Sales" },
                        { id: "billing", label: "Billing & Plans" },
                        { id: "partnership", label: "Partnerships" },
                      ].map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setCategory(cat.id as InquiryCategory)}
                          className={`p-2.5 rounded-xl text-xs font-semibold border transition-all text-center ${
                            category === cat.id
                              ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                              : "bg-zinc-50 dark:bg-zinc-800/80 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-purple-300"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Your Full Name"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />

                    <Input
                      label="Work Email Address"
                      type="email"
                      placeholder="jane@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Company / Organization"
                      placeholder="Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                        Priority Level
                      </label>
                      <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/80 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="low">Low - General Question</option>
                        <option value="normal">Normal - Standard Request</option>
                        <option value="high">High - Urgent Production Issue</option>
                        <option value="critical">Critical - SLA Escalation</option>
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Subject"
                    placeholder="Brief description of your question or issue..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                      Message Details
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Please provide details, environment links, or questions for our engineering and sales teams..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/80 p-3.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full h-12"
                    isLoading={isSubmitting}
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                  >
                    Submit Inquiry & Create Ticket
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
