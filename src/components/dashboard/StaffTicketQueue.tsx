"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SupportTicket } from "@/types/dashboard";
import { CheckCircle, AlertTriangle, Clock, Search, Filter, ShieldCheck, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

export function StaffTicketQueue() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [filter, setFilter] = useState<"all" | "urgent" | "in_progress" | "resolved">("all");
  const [search, setSearch] = useState("");

  const handleResolve = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "resolved", slaTimeLeft: "Resolved" } : t))
    );
  };

  const getPriorityBadge = (priority: SupportTicket["priority"]) => {
    switch (priority) {
      case "urgent":
        return <Badge variant="rose" dot>Urgent</Badge>;
      case "high":
        return <Badge variant="amber">High</Badge>;
      case "medium":
        return <Badge variant="blue">Medium</Badge>;
      case "low":
        return <Badge variant="gray">Low</Badge>;
    }
  };

  const getStatusBadge = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open":
        return <Badge variant="purple">Open</Badge>;
      case "in_progress":
        return <Badge variant="blue" dot>In Progress</Badge>;
      case "resolved":
        return <Badge variant="emerald">Resolved</Badge>;
      case "pending":
        return <Badge variant="amber">Pending</Badge>;
    }
  };

  const filteredTickets = tickets.filter((t) => {
    if (filter === "urgent" && t.priority !== "urgent") return false;
    if (filter === "in_progress" && t.status !== "in_progress") return false;
    if (filter === "resolved" && t.status !== "resolved") return false;
    if (search && !t.subject.toLowerCase().includes(search.toLowerCase()) && !t.customerName.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle>Staff Incident & Support Triage</CardTitle>
            <Badge variant="purple" size="sm">
              <ShieldCheck className="h-3 w-3 mr-1" /> SLA Monitored
            </Badge>
          </div>
          <CardDescription className="mt-1">
            Real-time customer escalation queue, tier-2 triage, and resolution controls
          </CardDescription>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 p-1 border border-zinc-200/80 dark:border-zinc-700/80">
            {(["all", "urgent", "in_progress", "resolved"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all",
                  filter === f
                    ? "bg-white dark:bg-zinc-900 text-purple-700 dark:text-purple-300 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                )}
              >
                {f.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {filteredTickets.length === 0 ? (
          <div className="py-12 text-center space-y-2 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="h-10 w-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mx-auto">
              <Inbox className="h-5 w-5" />
            </div>
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">No Support Tickets in Queue</p>
            <p className="text-[11px] text-zinc-400">All customer systems are operational and SLA thresholds are met.</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 dark:bg-zinc-900/80 text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
                <tr>
                  <th className="px-4 py-3">Ticket ID & Subject</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">SLA Target</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/60 dark:divide-zinc-800/60 bg-white dark:bg-zinc-950">
                {filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20 transition-colors"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                            {ticket.id}
                          </span>
                          <span className="text-[10px] text-zinc-400">({ticket.category})</span>
                        </div>
                        <span className="font-medium text-zinc-800 dark:text-zinc-200 max-w-sm truncate mt-0.5">
                          {ticket.subject}
                        </span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex flex-col">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">{ticket.customerName}</span>
                        <span className="text-[11px] text-zinc-400 truncate">{ticket.customerEmail}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">{getPriorityBadge(ticket.priority)}</td>

                    <td className="px-4 py-3.5">{getStatusBadge(ticket.status)}</td>

                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300 font-medium">
                        <Clock className="h-3 w-3 text-zinc-400" />
                        <span>{ticket.slaTimeLeft}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 text-right">
                      {ticket.status !== "resolved" ? (
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => handleResolve(ticket.id)}
                          className="text-xs"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Resolve
                        </Button>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-end gap-1">
                          <CheckCircle className="h-3 w-3" /> Closed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
