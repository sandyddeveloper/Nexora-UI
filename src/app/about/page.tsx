"use client";

import React from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Users,
  Globe2,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const VALUES = [
  {
    icon: <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Velocity & Reliability",
    description:
      "We believe operations should never slow down engineering. We engineer every component for sub-50ms edge processing and 99.99% uptime.",
  },
  {
    icon: <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Dual-Role Architecture",
    description:
      "Customer growth and staff operations belong in harmony. We bridge the gap between user-facing workspaces and internal engineering triage.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Uncompromised Security",
    description:
      "Every workspace is strictly isolated. We adhere to SOC-2 Type II standards, end-to-end encryption, and role-based access control.",
  },
  {
    icon: <Globe2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Global Distribution",
    description:
      "Our infrastructure spans 12 global points of presence to deliver seamless performance regardless of user geography.",
  },
];

const LEADERSHIP = [
  {
    name: "Elena Vance",
    role: "Chief Executive Officer & Co-Founder",
    bio: "Former VP of Infrastructure at Cloudscale. 15+ years scaling distributed systems and enterprise developer platforms.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "David Chen",
    role: "Chief Technology Officer & Co-Founder",
    bio: "Pioneer in edge computing and real-time observability pipelines. Previously Staff Architect at Datadog.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  },
  {
    name: "Marcus Sterling",
    role: "VP of Product Engineering",
    bio: "Design-led technologist passionate about developer experience, clean UI frameworks, and multi-tenant architectures.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="purple" size="md">
              About Nexora Inc.
            </Badge>

            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Building the Future of{" "}
              <span className="text-purple-600 dark:text-purple-400">Cloud Operations</span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Nexora was founded with a singular conviction: modern SaaS teams shouldn’t have to piece together fragmented monitoring tools, ticket queues, and workspace analytics. We built a unified platform where customer growth and internal operations live seamlessly under one roof.
            </p>
          </div>
        </section>

        {/* Company Numbers / Stats */}
        <section className="py-12 border-b border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">2024</div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">Founded</p>
              </div>
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">12M+</div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">Daily API Events</p>
              </div>
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">500+</div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">Enterprise Clients</p>
              </div>
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-purple-600 dark:text-purple-400">99.99%</div>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">Global Uptime</p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Story */}
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-4">
                <Badge variant="purple">Our Mission</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  Empower engineering teams to operate at maximum velocity
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We empower developers, support engineers, and product leaders with high-fidelity telemetry, instant role context switching, and automated incident triage so they can focus on what matters most: building extraordinary products.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-3">
                <h3 className="font-bold text-base text-purple-900 dark:text-purple-200">Our Core Architecture Principles</h3>
                <ul className="space-y-2 text-xs text-purple-800 dark:text-purple-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" />
                    <span>Zero latency compromise with distributed edge nodes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" />
                    <span>Built-in dual-role RBAC for Users and Staff Operations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" />
                    <span>Accessible Dark and Light modes with solid brand aesthetics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-purple-600 shrink-0" />
                    <span>Enterprise SOC-2 Type II audit trail readiness</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="py-16 bg-zinc-50/60 dark:bg-zinc-900/40 border-y border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <Badge variant="purple">Company Values</Badge>
              <h2 className="mt-3 text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
                What Guides Our Technology
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((val, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-12 w-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 flex items-center justify-center mb-4">
                      {val.icon}
                    </div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{val.title}</h3>
                    <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="purple">Leadership</Badge>
              <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50">
                Meet the Team Behind Nexora
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Engineers, architects, and operators building tools they love to use every day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEADERSHIP.map((leader, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 shadow-sm flex flex-col items-center text-center hover:border-purple-300 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={leader.avatar}
                    alt={leader.name}
                    className="h-24 w-24 rounded-2xl object-cover ring-4 ring-purple-500/20 mb-4"
                  />
                  <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">{leader.name}</h3>
                  <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-0.5">{leader.role}</p>
                  <p className="mt-3 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Call to Action */}
        <section className="py-16 bg-purple-50/50 dark:bg-purple-950/20 border-t border-purple-200/60 dark:border-purple-800/40 text-center">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
              Ready to Accelerate Your Operations?
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
              Join hundreds of forward-thinking teams using Nexora for customer growth and staff incident triage.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/signup">
                <Button variant="primary" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Start 14-Day Free Trial
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg">
                  Sign In to Workspace
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <LandingFooter />
    </div>
  );
}
