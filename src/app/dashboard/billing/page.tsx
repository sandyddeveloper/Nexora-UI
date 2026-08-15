"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import {
  CreditCard,
  Download,
  CheckCircle2,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: "Paid" | "Pending" | "Failed";
}

const INVOICES: Invoice[] = [
  { id: "INV-2026-0801", date: "Aug 1, 2026", amount: "$79.00", plan: "Growth Pro Tier", status: "Paid" },
  { id: "INV-2026-0701", date: "Jul 1, 2026", amount: "$79.00", plan: "Growth Pro Tier", status: "Paid" },
  { id: "INV-2026-0601", date: "Jun 1, 2026", amount: "$79.00", plan: "Growth Pro Tier", status: "Paid" },
  { id: "INV-2026-0501", date: "May 1, 2026", amount: "$29.00", plan: "Starter Tier", status: "Paid" },
];

export default function BillingPage() {
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // New Card State
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardSaved, setCardSaved] = useState(false);

  const handleDownloadInvoice = (invId: string) => {
    setDownloadSuccess(`Downloading invoice ${invId}.pdf...`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    setCardSaved(true);
    setTimeout(() => {
      setCardSaved(false);
      setIsAddCardOpen(false);
      setCardNumber("");
      setCardExpiry("");
      setCardCvc("");
      setCardName("");
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="md">
              <CreditCard className="h-3 w-3 mr-1" /> Subscription & Financials
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Billing & Invoices
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Manage your active workspace tier, usage meters, payment methods, and downloadable tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddCardOpen(true)}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            Add Payment Method
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsUpgradeModalOpen(true)}
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
          >
            Change Plan
          </Button>
        </div>
      </div>

      {/* Download Alert Toast */}
      {downloadSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <span>{downloadSuccess}</span>
        </div>
      )}

      {/* Top Grid: Current Plan & Usage Meters */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Plan Card */}
        <Card className="lg:col-span-1 border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="purple">Active Subscription</Badge>
              <span className="text-xs font-bold text-purple-700 dark:text-purple-300">Renews Sept 1, 2026</span>
            </div>
            <CardTitle className="text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-3">
              Growth Pro Tier
            </CardTitle>
            <CardDescription className="text-xs">
              Full workspace collaboration, edge metrics, and priority incident triage SLA.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-purple-700 dark:text-purple-300">$79</span>
              <span className="text-xs text-zinc-500">/ per month (billed monthly)</span>
            </div>

            <div className="pt-2 border-t border-purple-200/60 dark:border-purple-800/40 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                <span>Up to 50 active team seats</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                <span>2,000,000 monthly API calls</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-purple-600 shrink-0" />
                <span>Sub-15 minute SLA response</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-full mt-2"
              onClick={() => setIsUpgradeModalOpen(true)}
            >
              Upgrade to Enterprise
            </Button>
          </CardContent>
        </Card>

        {/* Usage Quota Meters */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Monthly Usage Quota
            </CardTitle>
            <CardDescription className="text-xs">
              Cycle resets in 16 days. Overages are billed at standard tier rates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Meter 1: API Calls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">API Invocations</span>
                <span className="text-zinc-500 font-mono">1.42M / 2.00M (71%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-purple-600 dark:bg-purple-500 w-[71%]" />
              </div>
            </div>

            {/* Meter 2: Team Members */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Active Collaborators</span>
                <span className="text-zinc-500 font-mono">34 / 50 seats (68%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-purple-600 dark:bg-purple-500 w-[68%]" />
              </div>
            </div>

            {/* Meter 3: Storage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Workspace Artifact Storage</span>
                <span className="text-zinc-500 font-mono">84 GB / 200 GB (42%)</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full rounded-full bg-purple-600 dark:bg-purple-500 w-[42%]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method & Tax Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Payment Method Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Payment Method
              </CardTitle>
              <Badge variant="emerald" size="sm">Primary</Badge>
            </div>
            <CardDescription className="text-xs">
              Card used for automatic recurring subscription billing.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-14 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center tracking-wider">
                  VISA
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Visa ending in 4242</h4>
                  <p className="text-[11px] text-zinc-500">Expires 08/2029 • Added Aug 2024</p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAddCardOpen(true)}
              >
                Update
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoice & Tax Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Tax & Invoicing Information
            </CardTitle>
            <CardDescription className="text-xs">
              Details rendered on official PDF tax receipts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500">Billing Email</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">billing@acmecorp.com</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500">Tax ID / VAT</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">US-884920194</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-500">Billing Address</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right">500 Howard St, SF, CA</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Invoice History
              </CardTitle>
              <CardDescription className="text-xs">
                Download past tax receipts and transaction statements.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">
                  <th className="pb-3 pl-2">Invoice ID</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Plan / Description</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                {INVOICES.map((inv) => (
                  <tr key={inv.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                    <td className="py-3.5 pl-2 font-mono font-bold text-zinc-900 dark:text-zinc-100">
                      {inv.id}
                    </td>
                    <td className="py-3.5 text-zinc-600 dark:text-zinc-400 font-medium">
                      {inv.date}
                    </td>
                    <td className="py-3.5 text-zinc-800 dark:text-zinc-200 font-semibold">
                      {inv.plan}
                    </td>
                    <td className="py-3.5 font-bold text-zinc-900 dark:text-zinc-100">
                      {inv.amount}
                    </td>
                    <td className="py-3.5">
                      <Badge variant="emerald" size="sm" dot>
                        {inv.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 pr-2 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadInvoice(inv.id)}
                        leftIcon={<Download className="h-3.5 w-3.5" />}
                      >
                        PDF
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Payment Method Modal */}
      <Modal
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        title="Add Payment Method"
        description="Add a new credit card for automated workspace subscriptions."
      >
        {cardSaved ? (
          <div className="py-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Card Added Successfully!</h4>
            <p className="text-xs text-zinc-500">Your new primary card has been updated.</p>
          </div>
        ) : (
          <form onSubmit={handleSaveCard} className="space-y-4 pt-2">
            <Input
              label="Cardholder Name"
              placeholder="Jane Doe"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
            <Input
              label="Card Number"
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Expiration"
                placeholder="MM / YY"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                required
              />
              <Input
                label="CVC / CVV"
                placeholder="123"
                type="password"
                maxLength={4}
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                required
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddCardOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save & Set Primary
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Upgrade Tier Modal */}
      <Modal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        title="Upgrade Workspace Subscription"
        description="Choose the capacity tier that fits your team's throughput requirements."
      >
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-2xl border-2 border-purple-600 bg-purple-50/50 dark:bg-purple-950/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-sm text-purple-900 dark:text-purple-200">Enterprise Cluster Tier</span>
              <span className="text-sm font-black text-purple-700 dark:text-purple-300">$299/mo</span>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Unlimited team seats, 20M API requests/mo, custom SRE SLA, and dedicated Slack triage bridge.
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => setIsUpgradeModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                alert("Enterprise upgrade request initiated!");
                setIsUpgradeModalOpen(false);
              }}
            >
              Confirm Upgrade
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
