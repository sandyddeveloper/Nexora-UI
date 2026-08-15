import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Users, Zap, Shield, LifeBuoy, BarChart2, Moon, Lock, Sparkles, Layers } from "lucide-react";

const FEATURES = [
  {
    icon: <Users className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Dual Role Architecture",
    description: "Built-in role management providing dedicated customer growth dashboards and deep staff operational triage suites.",
    tag: "Multi-Role",
  },
  {
    icon: <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Sub-50ms Global Edge",
    description: "Ultra-low latency query distribution across 12 worldwide edge nodes ensuring lightning-fast user interactions.",
    tag: "High Velocity",
  },
  {
    icon: <Shield className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Enterprise RBAC & Security",
    description: "Granular permission layers, two-factor authentication, audit logs, and session management built for SOC-2 compliance.",
    tag: "Security First",
  },
  {
    icon: <LifeBuoy className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Automated Ticket Triage",
    description: "Intelligent staff ticketing center with SLA countdowns, priority sorting, and one-click incident escalation.",
    tag: "Operations",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Real-Time Visual Analytics",
    description: "Interactive KPI trend monitoring, cycle-over-cycle comparisons, and sparkline metrics that keep your team aligned.",
    tag: "Analytics",
  },
  {
    icon: <Moon className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    title: "Rich Purple Theming",
    description: "Tailored light mode with crisp white surfaces and rich purple accents, paired with a sleek, neon-violet dark theme.",
    tag: "Theme Ready",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-zinc-50/50 dark:bg-zinc-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" size="md">
            Engine Capabilities
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Everything You Need to Power Scalable Operations
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A production-ready foundation designed for high-performing engineering teams and enterprise products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl bg-white dark:bg-zinc-900/90 border border-zinc-200/90 dark:border-zinc-800 p-7 shadow-sm hover:border-purple-300 dark:hover:border-purple-700/60 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200/60 dark:border-purple-800/40 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                    {feature.icon}
                  </div>
                  <Badge variant="purple" size="sm">
                    {feature.tag}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center text-xs font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                Explore feature docs →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
