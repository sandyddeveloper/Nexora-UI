"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useOrganization } from "@/context/OrganizationContext";
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
  Building2,
} from "lucide-react";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  plan: string;
  status: "Paid" | "Pending" | "Failed";
}

export default function BillingPage() {
  const { user } = useAuth();
  const { currentOrganization } = useOrganization();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // New Card State
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardSaved, setCardSaved] = useState(false);
  const [savedCard, setSavedCard] = useState<{ last4: string; brand: string } | null>(null);

  const handleDownloadInvoice = (invId: string) => {
    setDownloadSuccess(`Downloading invoice ${invId}.pdf...`);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    const last4 = cardNumber.slice(-4) || "0000";
    setSavedCard({ last4, brand: "Card" });
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
            Manage active workspace tier, regional currency ({currentOrganization?.currency || "USD"}), and tax invoices.
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
        </div>
      </div>

      {/* Subscription Tier Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Plan Card */}
        <Card variant="default" className="md:col-span-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 dark:opacity-5 pointer-events-none">
            <Zap className="h-36 w-36 text-purple-600" />
          </div>

          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="purple" size="sm">
                Enterprise Partition
              </Badge>
              <span className="text-xs font-bold text-zinc-400">Current Plan</span>
            </div>
            <CardTitle className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-50 mt-2">
              {currentOrganization?.name ? `${currentOrganization.name} Dedicated Tier` : "Standard Client Tier"}
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm mt-1">
              Multi-tenant isolated schema with automated backups and RBAC authorization controls.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400">
                {currentOrganization?.currency === "INR" ? "₹0" : "$0"}
              </span>
              <span className="text-xs font-semibold text-zinc-500">/ workspace license</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Dedicated PostgreSQL Schema</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Custom Domain Binding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>2FA TOTP Security</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workspace Currency & Region Card */}
        <Card variant="default">
          <CardHeader>
            <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Regional Details
            </CardTitle>
            <CardDescription className="text-xs">
              Configured during organization provisioning
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-400">Currency</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{currentOrganization?.currency || "USD"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-zinc-100 dark:border-zinc-800">
                <span className="text-zinc-400">Timezone</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">{currentOrganization?.timezone || "UTC"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-zinc-400">Tenant ID</span>
                <span className="font-mono text-purple-600 dark:text-purple-400">{currentOrganization?.tenant?.tenant_id || "schema_isolated"}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method & Tax Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Payment Method Card */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                Payment Method
              </CardTitle>
              {savedCard && <Badge variant="emerald" size="sm">Primary</Badge>}
            </div>
            <CardDescription className="text-xs">
              Card used for automatic workspace licenses.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {savedCard ? (
              <div className="p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-14 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center tracking-wider">
                    CARD
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Card ending in {savedCard.last4}</h4>
                    <p className="text-[11px] text-zinc-500">Active payment profile</p>
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
            ) : (
              <div className="p-5 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-center space-y-2">
                <CreditCard className="h-7 w-7 text-zinc-400 mx-auto" />
                <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">No Payment Method Attached</p>
                <p className="text-[11px] text-zinc-400">Add a credit or debit card for billing.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAddCardOpen(true)}
                  className="mt-2 text-xs"
                >
                  + Add Card
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Invoice & Tax Settings */}
        <Card variant="default">
          <CardHeader>
            <CardTitle className="text-base font-bold text-zinc-900 dark:text-zinc-100">
              Tax & Invoicing Information
            </CardTitle>
            <CardDescription className="text-xs">
              Details rendered on official workspace tax invoices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500">Billing Contact</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {currentOrganization?.billing_email || user?.email || "Not specified"}
              </span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500">Organization Name</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                {currentOrganization?.name || "Workspace"}
              </span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-zinc-500">Country Region</span>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-right">
                {currentOrganization?.country_name || currentOrganization?.country_code || "Global"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoices History Table */}
      <Card variant="default">
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
          {invoices.length === 0 ? (
            <div className="py-10 text-center space-y-2 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
              <FileText className="h-8 w-8 text-zinc-400 mx-auto" />
              <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">No Invoices Found</p>
              <p className="text-[11px] text-zinc-400">Past subscription receipts will be listed here.</p>
            </div>
          ) : (
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
                  {invoices.map((inv) => (
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
          )}
        </CardContent>
      </Card>

      {/* Add Payment Method Modal */}
      <Modal
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        title="Add Payment Method"
        description="Add a new card for automated workspace subscriptions."
      >
        {cardSaved ? (
          <div className="py-6 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Card Added Successfully!</h4>
            <p className="text-xs text-zinc-500">Your payment method has been saved.</p>
          </div>
        ) : (
          <form onSubmit={handleSaveCard} className="space-y-4 pt-2">
            <Input
              label="Cardholder Name"
              placeholder="e.g. Alex Hayes"
              value={cardName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardName(e.target.value)}
              required
            />

            <Input
              label="Card Number"
              placeholder="•••• •••• •••• ••••"
              value={cardNumber}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardNumber(e.target.value)}
              maxLength={19}
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Expiration Date"
                placeholder="MM/YY"
                value={cardExpiry}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardExpiry(e.target.value)}
                maxLength={5}
                required
              />

              <Input
                label="CVC / Security Code"
                placeholder="CVC"
                type="password"
                value={cardCvc}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardCvc(e.target.value)}
                maxLength={4}
                required
              />
            </div>

            <div className="pt-4 flex items-center justify-end gap-2 border-t border-zinc-100 dark:border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsAddCardOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Save Payment Method
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
