"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ShieldAlert, ArrowLeft, LayoutDashboard, Key, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";

export default function AccessDeniedPage() {
  const { role, switchRole, user } = useAuth();
  const [accessRequested, setAccessRequested] = useState(false);

  const handleRequestAccess = () => {
    setAccessRequested(true);
    setTimeout(() => {
      setAccessRequested(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      <LandingNavbar />

      <main className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl w-full text-center space-y-8">
          {/* 403 Restricted Icon */}
          <div className="inline-flex items-center justify-center h-24 w-24 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 shadow-sm mx-auto">
            <ShieldAlert className="h-12 w-12" />
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="amber" size="md">
                Error 403 • Restricted Area
              </Badge>
              <span className="text-xs font-mono text-zinc-400">RBAC Enforcement</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
              Access Restricted
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
              You do not currently possess the required role permissions to view this resource. This zone requires elevated staff clearance or workspace administrative ownership.
            </p>
          </div>

          {/* Current Role Context Card */}
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-md mx-auto text-left space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">Your Active Session</span>
              <Badge variant={role === "staff" ? "purple" : "blue"} size="sm">
                Current Role: {role.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={user?.name || "User"}
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-purple-500/20"
              />
              <div className="flex-1 text-left">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{user?.name || "Alex Morgan"}</h4>
                <p className="text-[11px] text-zinc-500">{user?.email || "alex@nexora.io"}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400 pt-1">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">How to resolve this:</p>
              <ul className="space-y-1 pl-4 list-disc">
                <li>If you are a member of staff, switch your active role to Staff Operations.</li>
                <li>If you require workspace permissions, request an invite from your team admin.</li>
              </ul>
            </div>

            {/* Quick 1-Click Role Switch */}
            <div className="pt-2">
              <button
                onClick={() => switchRole(role === "staff" ? "user" : "staff")}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition-colors"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Switch Role to {role === "staff" ? "Standard User" : "Staff Operations"}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {accessRequested ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 py-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>Access request logged with workspace administrator!</span>
              </div>
            ) : (
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                onClick={handleRequestAccess}
                leftIcon={<Key className="h-4 w-4" />}
              >
                Request Elevated Access
              </Button>
            )}

            <Link href={role === "staff" ? "/dashboard/staff" : "/dashboard"} className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto" leftIcon={<LayoutDashboard className="h-4 w-4" />}>
                Return to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <LandingFooter />
    </div>
  );
}
