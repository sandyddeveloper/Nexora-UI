"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Layers, Sun, Moon, ArrowRight, Menu, X, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function LandingNavbar() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { isAuthenticated, role } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "About", href: "/about", isRoute: true },
    { label: "Features", href: "/#features", isRoute: false },
    { label: "Platform", href: "/#preview", isRoute: false },
    { label: "Pricing", href: "/#pricing", isRoute: false },
    { label: "Changelog", href: "/changelog", isRoute: true },
    { label: "Contact", href: "/contact", isRoute: true },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center transition-transform active:scale-95 z-50">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Desktop Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-purple-50 dark:hover:bg-zinc-800 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              title={`Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} mode`}
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-purple-600" />
              )}
            </button>

            {isAuthenticated ? (
              <Link href={role === "staff" ? "/dashboard/staff" : "/dashboard"}>
                <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2 z-50">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-purple-600" />
              )}
            </button>

            {/* Mobile Hamburger / Close Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 active:scale-95 transition-transform"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-purple-600" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-16 z-40 bg-zinc-950/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 md:hidden border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top-2 duration-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="space-y-1">
            {navLinks.map((link) =>
              link.isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-200 hover:bg-purple-50 dark:hover:bg-purple-950/50 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                </a>
              )
            )}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5">
            {isAuthenticated ? (
              <Link href={role === "staff" ? "/dashboard/staff" : "/dashboard"} onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full h-11" leftIcon={<LayoutDashboard className="h-4 w-4" />}>
                  Open {role === "staff" ? "Staff" : "User"} Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-11">
                    Sign In
                  </Button>
                </Link>
                <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full h-11" rightIcon={<ArrowRight className="h-4 w-4" />}>
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
