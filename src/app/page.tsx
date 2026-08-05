import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { TrustLogosSection } from '@/components/landing/TrustLogosSection';
import { AIDemoSection } from '@/components/landing/AIDemoSection';
import { ProductPreviewSection } from '@/components/landing/ProductPreviewSection';
import { FeatureGridSection } from '@/components/landing/FeatureGridSection';
import { EnterpriseBenefitsSection } from '@/components/landing/EnterpriseBenefitsSection';
import { AutomationShowcaseSection } from '@/components/landing/AutomationShowcaseSection';
import { AnalyticsShowcaseSection } from '@/components/landing/AnalyticsShowcaseSection';
import { SecuritySection } from '@/components/landing/SecuritySection';
import { CustomerStoriesSection } from '@/components/landing/CustomerStoriesSection';
import { IntegrationsSection } from '@/components/landing/IntegrationsSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { DeveloperAPISection } from '@/components/landing/DeveloperAPISection';
import { PricingPreviewSection } from '@/components/landing/PricingPreviewSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { CTASection } from '@/components/landing/CTASection';
import { Footer } from '@/components/landing/Footer';

export const metadata = {
  title: 'Nexora Engine | The Sovereign AI Operating System for Modern Enterprises',
  description: 'Orchestrate AI Employees, CRM, HRMS, and multi-cloud workflows on a single air-gapped neural engine with sub-millisecond latency.',
};

export default function RootLandingPage() {
  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#0f172a] font-sans selection:bg-[#7c3aed]/20 selection:text-[#7c3aed]">
      {/* Navigation Header Bar */}
      <Navbar />

      {/* 17 Sequential Landing Page Sections */}
      <main>
        <HeroSection />
        <TrustLogosSection />
        <AIDemoSection />
        <ProductPreviewSection />
        <FeatureGridSection />
        <EnterpriseBenefitsSection />
        <AutomationShowcaseSection />
        <AnalyticsShowcaseSection />
        <SecuritySection />
        <CustomerStoriesSection />
        <IntegrationsSection />
        <HowItWorksSection />
        <DeveloperAPISection />
        <PricingPreviewSection />
        <FAQSection />
        <CTASection />
      </main>

      {/* Matrix Enterprise Footer */}
      <Footer />
    </div>
  );
}
