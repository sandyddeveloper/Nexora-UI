"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LandingFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 2000);
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 pt-16 pb-12 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 pb-12 border-b border-zinc-100 dark:border-zinc-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm">
                <Layers className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-purple-700 dark:text-purple-400">
                NEXORA
              </span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-sm">
              Unified intelligence, real-time metrics, and automated staff incident operations built for modern cloud platforms.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-purple-600 hover:border-purple-300 transition-colors" title="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-purple-600 hover:border-purple-300 transition-colors" title="GitHub">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              </a>
              <a href="#" className="h-8 w-8 rounded-lg border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-purple-600 hover:border-purple-300 transition-colors" title="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Col 1: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Product</h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li><a href="#features" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Dual Role Engine</a></li>
              <li><a href="#preview" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Live Triage Queue</a></li>
              <li><a href="#preview" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Real-Time Metrics</a></li>
              <li><a href="#pricing" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Links Col 2: Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Solutions</h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li><Link href="/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Customer Workspace</Link></li>
              <li><Link href="/dashboard/staff" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Staff Operations Desk</Link></li>
              <li><Link href="/dashboard/profile" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Security & RBAC</Link></li>
              <li><Link href="/signup" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Developer Sandbox</Link></li>
            </ul>
          </div>

          {/* Links Col 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">Stay Updated</h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Get product releases and system architecture insights directly in your inbox.
            </p>
            {subscribed ? (
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="developer@company.com"
                  className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
                <Button variant="primary" size="sm" className="w-full">
                  Subscribe to Updates
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© 2026 Nexora Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Contact Support</Link>
            <Link href="/changelog" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Changelog</Link>
            <Link href="/privacy" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
