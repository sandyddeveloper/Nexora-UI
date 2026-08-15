"use client";

import React from "react";
import Link from "next/link";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Home, LayoutDashboard, ArrowLeft, Search, HelpCircle, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* 404 Visual Pill */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 shadow-sm mx-auto">
            <FileQuestion className="h-12 w-12" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5">
              <Badge variant="purple" size="md">
                Error 404
              </Badge>
              <span className="text-xs font-mono text-zinc-400">Route Unresolved</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Page Not Found
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              The page or resource you are searching for might have been moved, renamed, or is temporarily unavailable.
            </p>
          </div>

          {/* Quick Helpful Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto text-left">
            <Link
              href="/"
              className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 hover:bg-purple-50/40 dark:hover:bg-purple-950/30 transition-all flex items-center gap-3 group"
            >
              <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Home className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Homepage</h4>
                <p className="text-[11px] text-zinc-500">Return to landing page</p>
              </div>
            </Link>

            <Link
              href="/dashboard"
              className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-purple-400 hover:bg-purple-50/40 dark:hover:bg-purple-950/30 transition-all flex items-center gap-3 group"
            >
              <div className="h-8 w-8 rounded-xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Dashboard</h4>
                <p className="text-[11px] text-zinc-500">Access your workspace</p>
              </div>
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto" leftIcon={<Home className="h-4 w-4" />}>
                Go to Homepage
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => window.history.back()}
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Go Back
            </Button>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
