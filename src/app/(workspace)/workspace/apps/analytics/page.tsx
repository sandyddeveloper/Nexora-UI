'use client';

import React from 'react';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Activity,
  Download,
  Calendar,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <BarChart3 className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Executive Business Intelligence & Analytics
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Real-time cross-module metrics connecting HRMS, Projects, Payroll, and Financial Performance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-xs border-[var(--border-color)]">
            <Calendar className="h-3.5 w-3.5 mr-1.5" />
            Q3 2026
          </Button>
          <Button className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white shadow-md shadow-[#8b5cf6]/20 text-xs">
            <Download className="h-4 w-4 mr-1.5" />
            Export Executive Deck
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Annual Recurring Revenue (ARR)" value="$14.8M" change="+22.4% YoY" icon={DollarSign} trend="up" />
        <StatCard title="Overall Team Utilization Rate" value="88.2%" change="+3.1% vs Q2" icon={Activity} trend="up" />
        <StatCard title="Revenue Per Employee" value="$118,500" change="+6.5% efficiency" icon={Users} trend="up" />
        <StatCard title="Net Profit Margin" value="34.8%" change="Healthy operational ratio" icon={TrendingUp} trend="neutral" />
      </div>

      {/* Analytics Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Payroll Chart Widget */}
        <div className="lg:col-span-2 flex flex-col gap-4 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[var(--text-primary)]">Revenue vs Payroll Outflow</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">Monthly trajectory across FY 2026 quarters.</p>
            </div>
            <Badge variant="purple">Live Data Stream</Badge>
          </div>

          {/* Synthetic Chart Visualization Bars */}
          <div className="h-64 flex items-end justify-between gap-3 pt-8 pb-2 border-b border-[var(--border-color)]">
            {[
              { month: 'Jan', rev: 70, pay: 40 },
              { month: 'Feb', rev: 75, pay: 42 },
              { month: 'Mar', rev: 85, pay: 45 },
              { month: 'Apr', rev: 80, pay: 44 },
              { month: 'May', rev: 92, pay: 48 },
              { month: 'Jun', rev: 98, pay: 50 },
              { month: 'Jul', rev: 105, pay: 52 },
              { month: 'Aug', rev: 115, pay: 55 },
            ].map((bar, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full flex items-end justify-center gap-1 h-full">
                  <div
                    className="w-1/2 rounded-t-lg bg-gradient-to-t from-[var(--primary-purple)] to-[#c084fc] transition-all duration-300 group-hover:brightness-125"
                    style={{ height: `${bar.rev}%` }}
                    title={`Revenue: $${bar.rev * 10}k`}
                  />
                  <div
                    className="w-1/2 rounded-t-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] transition-all duration-300"
                    style={{ height: `${bar.pay}%` }}
                    title={`Payroll: $${bar.pay * 10}k`}
                  />
                </div>
                <span className="text-[10px] font-bold text-[var(--text-muted)]">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] pt-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary-purple)]" />
                Gross Revenue ($)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)]" />
                Payroll Outflow ($)
              </span>
            </div>
            <span className="font-bold text-[var(--color-success)]">+38% Net Expansion</span>
          </div>
        </div>

        {/* Cross-Module Allocation Widget */}
        <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm">
          <h3 className="text-sm font-bold text-[var(--text-primary)]">Departmental Cost Breakdown</h3>
          <p className="text-xs text-[var(--text-muted)]">Budget allocation across organizational units.</p>

          <div className="space-y-4 pt-2">
            {[
              { dept: 'Engineering & R&D', pct: 45, val: '$828,000' },
              { dept: 'Product & Design', pct: 25, val: '$460,000' },
              { dept: 'Sales & Marketing', pct: 18, val: '$331,200' },
              { dept: 'People & Admin', pct: 12, val: '$220,800' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[var(--text-primary)]">{item.dept}</span>
                  <span className="text-[var(--text-muted)]">{item.val} ({item.pct}%)</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--primary-purple)] to-[#a855f7]"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-[var(--border-color)]">
            <Button variant="outline" className="w-full text-xs border-[var(--border-color)]">
              <Sparkles className="h-3.5 w-3.5 mr-2 text-[var(--primary-purple)]" />
              AI Copilot: Generate Cost Insights
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
