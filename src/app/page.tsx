import React from "react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { CompanyLogosMarquee } from "@/components/landing/CompanyLogosMarquee";
import { PreviewSection } from "@/components/landing/PreviewSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { ChangelogSection } from "@/components/landing/ChangelogSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors">
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <CompanyLogosMarquee />
        <PreviewSection />
        <StatsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ChangelogSection />
        <PricingSection />
        <ContactSection />
        <FAQSection />
      </main>
      <LandingFooter />
    </div>
  );
}
