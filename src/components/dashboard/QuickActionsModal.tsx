"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FolderPlus, UserPlus, Key, AlertCircle, CheckCircle2 } from "lucide-react";

interface QuickActionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAction?: "workspace" | "invite" | "apikey" | "ticket";
}

export function QuickActionsModal({ isOpen, onClose, defaultAction = "workspace" }: QuickActionsModalProps) {
  const [activeTab, setActiveTab] = useState<"workspace" | "invite" | "apikey" | "ticket">(defaultAction);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName("");
      setEmail("");
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Quick Workspace Launcher"
      description="Select an action to trigger immediate workspace deployment or team management."
    >
      <div className="space-y-4">
        {/* Action Select Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => { setActiveTab("workspace"); setIsSuccess(false); }}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
              activeTab === "workspace"
                ? "border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-purple-300"
            }`}
          >
            <FolderPlus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            Workspace
          </button>
          <button
            onClick={() => { setActiveTab("invite"); setIsSuccess(false); }}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
              activeTab === "invite"
                ? "border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-purple-300"
            }`}
          >
            <UserPlus className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            Invite
          </button>
          <button
            onClick={() => { setActiveTab("apikey"); setIsSuccess(false); }}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
              activeTab === "apikey"
                ? "border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-purple-300"
            }`}
          >
            <Key className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            API Key
          </button>
          <button
            onClick={() => { setActiveTab("ticket"); setIsSuccess(false); }}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-semibold transition-all ${
              activeTab === "ticket"
                ? "border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20"
                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-purple-300"
            }`}
          >
            <AlertCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            Support
          </button>
        </div>

        {/* Dynamic Form Area */}
        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Action Completed Successfully!</p>
            <p className="text-xs text-zinc-500">Your configuration is active and synchronized across clusters.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            {activeTab === "workspace" && (
              <>
                <Input
                  label="Workspace Name"
                  placeholder="e.g. Production Analytics Engine"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Region Cluster"
                  defaultValue="US-East (N. Virginia) - AWS"
                />
              </>
            )}

            {activeTab === "invite" && (
              <>
                <Input
                  label="Teammate Email"
                  type="email"
                  placeholder="colleague@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Role Access Level
                  </label>
                  <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100">
                    <option>Developer (Read/Write to Workspaces)</option>
                    <option>Admin (Full Project Access)</option>
                    <option>Billing Specialist</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === "apikey" && (
              <>
                <Input
                  label="API Key Description"
                  placeholder="e.g. CI/CD GitHub Actions Secret"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Rate Limit Tier"
                  defaultValue="10,000 requests / minute (Unlimited Burst)"
                  disabled
                />
              </>
            )}

            {activeTab === "ticket" && (
              <>
                <Input
                  label="Incident Summary"
                  placeholder="e.g. Webhook delivery delay on endpoint /events"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Priority Level
                  </label>
                  <select className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100">
                    <option>High (SLA &lt; 15 mins)</option>
                    <option>Medium (SLA &lt; 1 hour)</option>
                    <option>Low (General question)</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                Confirm & Create
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
}
