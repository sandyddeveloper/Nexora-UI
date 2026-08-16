"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useCountries } from "@/hooks/useCountries";
import { useOrganization } from "@/context/OrganizationContext";
import {
  CreateOrganizationPayload,
  OrganizationType,
  IndustryType,
  CompanySizeType,
  ORGANIZATION_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COUNTRY_SUGGESTIONS,
  Organization,
} from "@/services/organizationService";
import {
  Building2,
  Globe,
  Clock,
  Coins,
  Languages,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Server,
  Layers,
  ChevronRight,
  AlertCircle,
  HelpCircle,
  ShieldAlert,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function OrganizationOnboardingPage() {
  const router = useRouter();
  const { role } = useAuth();
  const { createOrganization } = useOrganization();
  const { countries } = useCountries();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [orgType, setOrgType] = useState<OrganizationType>("company");
  const [industry, setIndustry] = useState<IndustryType>("information_technology");
  const [companySize, setCompanySize] = useState<CompanySizeType>("1-10");

  // Regional settings
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");
  const [languageCode, setLanguageCode] = useState("EN");
  const [domain, setDomain] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [createdOrg, setCreatedOrg] = useState<Organization | null>(null);

  // Auto-fill when country changes
  useEffect(() => {
    if (countryCode && COUNTRY_SUGGESTIONS[countryCode]) {
      const s = COUNTRY_SUGGESTIONS[countryCode];
      setTimezone(s.timezone);
      setCurrency(s.currency);
      setLanguageCode(s.language);
    }
  }, [countryCode]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: ["Organization name cannot be empty."] });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setGeneralError(null);
    setIsSubmitting(true);

    const payload: CreateOrganizationPayload = {
      name: name.trim(),
      country_code: countryCode,
      organization_type: orgType,
      industry: industry,
      company_size: companySize,
      timezone,
      currency,
      language_code: languageCode,
      domain: domain.trim() || undefined,
      billing_email: billingEmail.trim() || undefined,
    };

    try {
      const org = await createOrganization(payload);
      setCreatedOrg(org);
      setStep(3);
    } catch (err: any) {
      if (err?.errors) {
        setErrors(err.errors);
      } else {
        setGeneralError(err?.message || "Failed to create organization. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Staff-Only Guard
  if (role !== "staff") {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between p-4 sm:p-8">
        <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4">
          <Logo size="md" />
          <Link href="/dashboard/workspaces">
            <Button variant="outline" size="sm">Back to Workspaces</Button>
          </Link>
        </header>

        <main className="max-w-md w-full mx-auto my-auto">
          <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl p-8 text-center space-y-5">
            <div className="h-16 w-16 rounded-3xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 flex items-center justify-center mx-auto shadow-sm">
              <ShieldAlert className="h-8 w-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Staff Authorization Required
              </h2>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Organization and tenant provisioning is restricted to Staff Administrators. Standard users can access their assigned workspaces.
              </p>
            </div>

            <div className="pt-3 space-y-2.5">
              <Link href="/dashboard" className="block">
                <Button variant="primary" size="md" className="w-full justify-center text-xs">
                  Return to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <footer className="max-w-4xl w-full mx-auto py-4 text-center text-xs text-zinc-400">
          Nexora Platform Enterprise Multi-Tenancy Architecture
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <header className="max-w-4xl w-full mx-auto flex items-center justify-between py-4">
        <Logo size="md" />
        <div className="flex items-center gap-2">
          <Badge variant="purple" size="sm">Staff Provisioning</Badge>
          <Link href="/dashboard/workspaces">
            <Button variant="ghost" size="sm">Cancel</Button>
          </Link>
        </div>
      </header>

      {/* Main Card */}
      <main className="max-w-2xl w-full mx-auto my-auto">
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl p-6 sm:p-10 space-y-6">
          {/* Header Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 mb-2">
              <Building2 className="h-6 w-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {step === 3
                ? "Organization Ready!"
                : step === 2
                ? "Configure Regional & Enterprise Defaults"
                : "Create Your Organization"}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-md mx-auto">
              {step === 3
                ? "Your multi-tenant schema partition has been isolated and provisioned."
                : step === 2
                ? "Customize your company's operating currency, timezone, and custom domain."
                : "Set up your workspace to manage deployments, access permissions, and billing."}
            </p>
          </div>

          {/* Stepper Dots */}
          {step !== 3 && (
            <div className="flex items-center justify-center gap-2 pt-2">
              <span className={cn("h-2 rounded-full transition-all", step === 1 ? "w-8 bg-purple-600" : "w-2 bg-zinc-300 dark:bg-zinc-700")} />
              <span className={cn("h-2 rounded-full transition-all", step === 2 ? "w-8 bg-purple-600" : "w-2 bg-zinc-300 dark:bg-zinc-700")} />
            </div>
          )}

          {generalError && (
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{generalError}</span>
            </div>
          )}

          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Organization / Company Name <span className="text-purple-600">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Noventra Dynamic Tech Solutions"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors((prev) => {
                        const n = { ...prev };
                        delete n.name;
                        return n;
                      });
                    }
                  }}
                  required
                  className={cn(
                    "w-full rounded-2xl border bg-zinc-50 dark:bg-zinc-800/80 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500",
                    errors.name ? "border-red-500" : "border-zinc-200 dark:border-zinc-700"
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600 font-semibold">{errors.name.join(" ")}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Primary Country <span className="text-purple-600">*</span>
                </label>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-4 py-3 text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {countries.map((c) => (
                    <option key={c.id} value={c.code}>
                      {c.flag} {c.name} ({c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Entity Type
                  </label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value as OrganizationType)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {ORGANIZATION_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Industry
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value as IndustryType)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {INDUSTRY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Company Size
                  </label>
                  <select
                    value={companySize}
                    onChange={(e) => setCompanySize(e.target.value as CompanySizeType)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {COMPANY_SIZE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Continue to Regional Settings
                </Button>
              </div>
            </form>
          )}

          {/* STEP 2: Regional Defaults */}
          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4 pt-2">
              <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 text-xs text-purple-900 dark:text-purple-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-600 shrink-0" />
                <span>Defaults auto-filled from <strong>{countryCode}</strong> country profile.</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Timezone
                  </label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Currency
                  </label>
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Language
                  </label>
                  <input
                    type="text"
                    value={languageCode}
                    onChange={(e) => setLanguageCode(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Domain (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="noventra.com"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                    Billing Email (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="billing@noventra.com"
                    value={billingEmail}
                    onChange={(e) => setBillingEmail(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between gap-3">
                <Button type="button" variant="outline" size="lg" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="flex-1 justify-center"
                  rightIcon={<Building2 className="h-4 w-4" />}
                >
                  Provision & Launch Organization
                </Button>
              </div>
            </form>
          )}

          {/* STEP 3: Complete */}
          {step === 3 && createdOrg && (
            <div className="py-6 space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="h-16 w-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50">
                  {createdOrg.name} is Provisioned!
                </h3>
                <p className="text-xs text-zinc-500">
                  Tenant schema <code className="text-purple-600 font-bold">{createdOrg.tenant?.schema_name || `tenant_${createdOrg.slug}`}</code> is ready.
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => router.push("/dashboard/workspaces")}
                  className="w-full justify-center"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Enter Workspace
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl w-full mx-auto py-4 text-center text-xs text-zinc-400">
        Nexora Platform Enterprise Multi-Tenancy Architecture • Protected by SLA
      </footer>
    </div>
  );
}
