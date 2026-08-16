"use client";

import React, { useState } from "react";
import { PreferencesComponent } from "@/components/common/PreferencesComponent";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Key, Copy, Check, Trash2, Sliders, Shield } from "lucide-react";

export default function SettingsPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          Platform Settings & User Preferences
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Configure regional language, email and SMS notification delivery, visual themes, and programmatic API access.
        </p>
      </div>

      {/* Core Preferences Component: 1. Language | 2. Notifications [Email/SMS] | 3. Theme [Light/Dark/System] */}
      <PreferencesComponent />

      {/* API Key Management */}
      <Card id="api-keys">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
          <div>
            <CardTitle className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Key className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              Programmatic API Keys
            </CardTitle>
            <CardDescription className="text-xs">
              Manage secrets used to authenticate backend server requests & CLI bridges.
            </CardDescription>
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
              <button
                className="p-2 text-zinc-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title="Delete Key"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
