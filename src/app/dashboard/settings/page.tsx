"use client";

import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Sun, Moon, Laptop, Bell, Key, Copy, Check, Trash2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [slaAlerts, setSlaAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Platform Settings & Appearance
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Customize your application theme, notification channels, and programmatic API access.
        </p>
      </div>

      {/* Theme Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance & Theme</CardTitle>
          <CardDescription>
            Select your preferred visual aesthetic for all workspaces and dashboard views.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Light Mode Box */}
            <button
              type="button"
              onClick={() => setTheme("light")}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all relative overflow-hidden",
                theme === "light"
                  ? "border-purple-600 ring-2 ring-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-purple-300"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Sun className="h-5 w-5" />
                </div>
                {theme === "light" && <Badge variant="purple" size="sm">Active</Badge>}
              </div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Light Theme</h4>
              <p className="text-xs text-zinc-500 mt-1">Crisp white surfaces with rich purple brand accents.</p>
            </button>

            {/* Dark Mode Box */}
            <button
              type="button"
              onClick={() => setTheme("dark")}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all relative overflow-hidden",
                theme === "dark"
                  ? "border-purple-600 ring-2 ring-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-purple-300"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-800 text-purple-400">
                  <Moon className="h-5 w-5" />
                </div>
                {theme === "dark" && <Badge variant="purple" size="sm">Active</Badge>}
              </div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Dark Theme</h4>
              <p className="text-xs text-zinc-500 mt-1">Deep slate background with glowing neon violet accents.</p>
            </button>

            {/* System Auto Box */}
            <button
              type="button"
              onClick={() => setTheme("system")}
              className={cn(
                "p-4 rounded-2xl border text-left transition-all relative overflow-hidden",
                theme === "system"
                  ? "border-purple-600 ring-2 ring-purple-500/30 bg-purple-50/50 dark:bg-purple-950/20"
                  : "border-zinc-200 dark:border-zinc-800 hover:border-purple-300"
              )}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                  <Laptop className="h-5 w-5" />
                </div>
                {theme === "system" && <Badge variant="purple" size="sm">Active</Badge>}
              </div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">System Preference</h4>
              <p className="text-xs text-zinc-500 mt-1">Automatically match OS day/night schedule.</p>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Matrix Card */}
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Configure which event streams trigger email or webhook dispatches</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Emergency SLA Breaches</h4>
              <p className="text-[11px] text-zinc-500">Send high-priority SMS and email for unresolved tier-2 tickets.</p>
            </div>
            <input
              type="checkbox"
              checked={slaAlerts}
              onChange={(e) => setSlaAlerts(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Deployment Updates</h4>
              <p className="text-[11px] text-zinc-500">Notify team when new edge workers or cluster builds complete.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
            <div>
              <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Weekly Performance Digest</h4>
              <p className="text-[11px] text-zinc-500">Receive summary KPI chart and revenue velocity insights each Monday.</p>
            </div>
            <input
              type="checkbox"
              checked={weeklyDigest}
              onChange={(e) => setWeeklyDigest(e.target.checked)}
              className="rounded text-purple-600 focus:ring-purple-500 h-4 w-4"
            />
          </div>
        </CardContent>
      </Card>

      {/* API Key Management */}
      <Card id="api-keys">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div>
            <CardTitle>Programmatic API Keys</CardTitle>
            <CardDescription>Manage secrets used to authenticate backend server requests</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            + Generate New Key
          </Button>
        </CardHeader>

        <CardContent className="space-y-3 pt-2">
          <div className="p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Key className="h-4 w-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Production Secret Key</span>
                <p className="text-[11px] font-mono text-zinc-400">nx_live_89128f9a23c09b...</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleCopy("nx_live_89128f9a23c09b776a0129", "key_1")}
              >
                {copiedKey === "key_1" ? <Check className="h-3.5 w-3.5 text-emerald-500 mr-1" /> : <Copy className="h-3.5 w-3.5 mr-1" />}
                {copiedKey === "key_1" ? "Copied" : "Copy Secret"}
              </Button>
              <button className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
