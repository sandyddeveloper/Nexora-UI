"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { DashboardFooter } from "@/components/layout/DashboardFooter";
import { Logo } from "@/components/ui/Logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Strict Auth Guard: Without valid access_token cannot enter dashboard
  useEffect(() => {
    if (isInitialized) {
      const token = typeof window !== "undefined" ? localStorage.getItem("access") : null;
      if (!isAuthenticated || !token) {
        router.replace("/login");
      }
    }
  }, [isInitialized, isAuthenticated, router]);

  // Loading state while checking authentication tokens
  if (!isInitialized || !isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <div className="flex flex-col items-center gap-4 animate-pulse">
          <Logo size="lg" />
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-purple-600 animate-ping" />
            <span>Verifying session credentials...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/70 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Responsive Collapsible Sidebar */}
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area (Offset for Desktop Sidebar) */}
      <div className="flex flex-1 flex-col transition-all duration-300 lg:pl-64">
        {/* Sticky Topbar */}
        <Topbar onMenuToggle={() => setMobileMenuOpen(true)} />

        {/* Dynamic Page Slot */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

        {/* Dashboard Footer */}
        <DashboardFooter />
      </div>
    </div>
  );
}
