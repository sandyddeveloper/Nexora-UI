import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export function DashboardFooter() {
  return (
    <footer className="mt-auto border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-950/50 px-4 md:px-6 py-4 transition-colors">
      <div className="flex flex-col py-[0.6rem] sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex items-center gap-3">
          <Badge variant="emerald" dot size="sm">
            Systems 100% Operational
          </Badge>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>
          <span className="text-[11px]">Nexora Platform v2.4.0 (Enterprise)</span>
        </div>

        <div className="flex items-center gap-4 text-[11px] font-medium">
          <Link href="/dashboard/settings" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Documentation
          </Link>
          <Link href="/dashboard/staff" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            API Health
          </Link>
          <Link href="/dashboard/profile" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
            Support Desk
          </Link>
          <span className="text-zinc-400">© 2026 Nexora Inc.</span>
        </div>
      </div>
    </footer>
  );
}
