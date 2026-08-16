"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Spinner } from "@/components/ui/Loader";
import { useCountries } from "@/hooks/useCountries";
import { useLanguages } from "@/hooks/useLanguages";
import {
  Organization,
  CreateOrganizationPayload,
  OrganizationType,
  IndustryType,
  CompanySizeType,
  ORGANIZATION_TYPE_OPTIONS,
  INDUSTRY_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  COUNTRY_SUGGESTIONS,
} from "@/services/organizationService";
import { useOrganization } from "@/context/OrganizationContext";
import {
  Building2,
  Globe,
  Briefcase,
  Users,
  Clock,
  Coins,
  Languages,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Server,
  Layers,
  ChevronRight,
  AlertCircle,
  UserCheck,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CreateOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newOrg: Organization) => void;
}

export function CreateOrganizationModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateOrganizationModalProps) {
  const { createOrganization } = useOrganization();
  const { countries, isLoading: isCountriesLoading } = useCountries();
  const { languages } = useLanguages();

  // Form Step (1: General Info, 2: Regional & Owner Credentials, 3: Success Created)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [orgType, setOrgType] = useState<OrganizationType>("company");
  const [industry, setIndustry] = useState<IndustryType>("information_technology");
  const [companySize, setCompanySize] = useState<CompanySizeType>("1-10");

  // Regional settings (auto-suggested from country)
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");
  const [languageCode, setLanguageCode] = useState("EN");
  const [domain, setDomain] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [logoUrl, setLogoUrl] = useState("");

  // Client Owner Credentials (created by Staff for Client)
  const [ownerFirstName, setOwnerFirstName] = useState("");
  const [ownerLastName, setOwnerLastName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerUsername, setOwnerUsername] = useState("");
  const [ownerPassword, setOwnerPassword] = useState("");

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [createdOrg, setCreatedOrg] = useState<Organization | null>(null);

  // Trigger dynamic defaults when Country changes
  useEffect(() => {
    if (countryCode && COUNTRY_SUGGESTIONS[countryCode]) {
      const suggestion = COUNTRY_SUGGESTIONS[countryCode];
      setTimezone(suggestion.timezone);
      setCurrency(suggestion.currency);
      setLanguageCode(suggestion.language);
    }
  }, [countryCode]);

  const resetForm = () => {
    setName("");
    setCountryCode("IN");
    setOrgType("company");
    setIndustry("information_technology");
    setCompanySize("1-10");
    setTimezone("Asia/Kolkata");
    setCurrency("INR");
    setLanguageCode("EN");
    setDomain("");
    setBillingEmail("");
    setLogoUrl("");
    setOwnerFirstName("");
    setOwnerLastName("");
    setOwnerEmail("");
    setOwnerUsername("");
    setOwnerPassword("ClientOwner2026!");
    setErrors({});
    setGeneralError(null);
    setCreatedOrg(null);
    setStep(1);
  };

  const handleCountryChange = (code: string) => {
    setCountryCode(code);
    if (errors.country) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.country;
        return next;
      });
    }
  };

  const handleOwnerEmailChange = (val: string) => {
    setOwnerEmail(val);
    if (!ownerUsername && val.includes("@")) {
      setOwnerUsername(val.split("@")[0]);
    }
    if (!billingEmail) {
      setBillingEmail(val);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrors({ name: ["Organization name cannot be empty."] });
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      timezone: timezone,
      currency: currency,
      language_code: languageCode,
      domain: domain.trim() || undefined,
      billing_email: billingEmail.trim() || undefined,
      logo_url: logoUrl.trim() || undefined,
      // Client Owner Credentials
      owner_first_name: ownerFirstName.trim() || undefined,
      owner_last_name: ownerLastName.trim() || undefined,
      owner_email: ownerEmail.trim() || undefined,
      owner_username: ownerUsername.trim() || undefined,
      owner_password: ownerPassword || undefined,
    };

    try {
      const newOrg = await createOrganization(payload);
      setCreatedOrg(newOrg);
      setStep(3);
      if (onSuccess) onSuccess(newOrg);
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === 3
          ? "Client Organization Provisioned"
          : step === 2
          ? "Regional & Client Owner Credentials"
          : "Staff: Register Client Organization"
      }
      description={
        step === 3
          ? "Client multi-tenant isolated schema and owner membership have been generated."
          : step === 2
          ? "Configure currency, timezone, and initial client owner access credentials."
          : "Staff administrator tool to provision a new client organization tenant."
      }
      maxWidth="xl"
    >
      <div className="space-y-5">
        {/* Step Indicator */}
        {step !== 3 && (
          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-xs">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-colors",
              step === 1 ? "bg-purple-600 text-white shadow-xs" : "text-zinc-500"
            )}>
              <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">1</span>
              <span>Organization Details</span>
            </div>

            <ChevronRight className="h-4 w-4 text-zinc-400 shrink-0" />

            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl font-bold transition-colors",
              step === 2 ? "bg-purple-600 text-white shadow-xs" : "text-zinc-500"
            )}>
              <span className="h-5 w-5 rounded-full bg-white/20 flex items-center justify-center text-[11px]">2</span>
              <span>Regional & Client Owner</span>
            </div>
          </div>
        )}

        {/* General Error Banner */}
        {generalError && (
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        {/* STEP 1: General Info */}
        {step === 1 && (
          <form onSubmit={handleNext} className="space-y-4">
            {/* Organization Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                Client Organization Name <span className="text-purple-600">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Tata Digital Enterprises"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors((prev) => {
                      const next = { ...prev };
                      delete next.name;
                      return next;
                    });
                  }
                }}
                required
                className={cn(
                  "w-full rounded-xl border bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors",
                  errors.name ? "border-red-500 ring-1 ring-red-500" : "border-zinc-200 dark:border-zinc-700"
                )}
              />
              {errors.name && (
                <p className="mt-1 text-[11px] font-semibold text-red-600 dark:text-red-400">
                  {errors.name.join(" ")}
                </p>
              )}
            </div>

            {/* Operating Country Selection with Live suggestions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Operating Country <span className="text-purple-600">*</span>
                </label>
                <span className="text-[10px] text-zinc-400">Auto-derives timezone & currency</span>
              </div>

              <select
                value={countryCode}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3.5 py-2.5 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 font-semibold"
              >
                {countries.map((c) => (
                  <option key={c.id} value={c.code}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Grid for Org Type, Industry, Company Size */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Entity Type
                </label>
                <select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value as OrganizationType)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {COMPANY_SIZE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-100 dark:border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue to Client Owner Setup
              </Button>
            </div>
          </form>
        )}

        {/* STEP 2: Regional & Client Owner Credentials */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Section A: Regional Settings */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5" /> Regional Tenant Parameters
                </span>
                <Badge variant="purple" size="sm">Auto-filled</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">Timezone</label>
                  <input
                    type="text"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">Currency</label>
                  <input
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-zinc-600 dark:text-zinc-400 mb-1">Language</label>
                  <input
                    type="text"
                    value={languageCode}
                    onChange={(e) => setLanguageCode(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500 uppercase font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Section B: Client Owner Provisioning (Optional but Recommended) */}
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/20 border border-purple-200/80 dark:border-purple-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                  <UserCheck className="h-3.5 w-3.5 text-purple-600" /> Primary Client Owner Credentials
                </span>
                <span className="text-[10px] text-zinc-500">Auto-creates client user with Owner role</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ratan"
                    value={ownerFirstName}
                    onChange={(e) => setOwnerFirstName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Tata"
                    value={ownerLastName}
                    onChange={(e) => setOwnerLastName(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Owner Email</label>
                  <input
                    type="email"
                    placeholder="ratan.tata@tatadigital.com"
                    value={ownerEmail}
                    onChange={(e) => handleOwnerEmailChange(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Owner Username</label>
                  <input
                    type="text"
                    placeholder="ratantata"
                    value={ownerUsername}
                    onChange={(e) => setOwnerUsername(e.target.value)}
                    className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1">Initial Owner Password</label>
                <input
                  type="text"
                  value={ownerPassword}
                  onChange={(e) => setOwnerPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 font-mono"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmitting}
                rightIcon={<Building2 className="h-4 w-4" />}
              >
                Provision Client Organization
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: Success Confirmation */}
        {step === 3 && createdOrg && (
          <div className="py-4 space-y-6 text-center animate-in zoom-in-95 duration-200">
            <div className="h-14 w-14 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50">
                {createdOrg.name} is Provisioned!
              </h3>
              <p className="text-xs text-zinc-500">
                Client tenant partition and initial owner account have been created.
              </p>
            </div>

            {/* Tenant Metadata Box */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-left space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Tenant ID:</span>
                <Badge variant="purple" size="sm">{createdOrg.tenant?.tenant_id || `org_${createdOrg.id}`}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Client Owner:</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200 truncate">{createdOrg.owner_username || ownerUsername || "Assigned"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-400">Region & Currency:</span>
                <span className="text-zinc-700 dark:text-zinc-300">{createdOrg.country_code} • {createdOrg.currency}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleClose}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Done & Return to Workspace Directory
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
