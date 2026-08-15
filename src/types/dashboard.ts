export interface StatMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  timeframe: string;
  iconName: string;
  sparklineData?: number[];
  colorVariant?: "purple" | "blue" | "emerald" | "amber" | "rose";
}

export interface SupportTicket {
  id: string;
  customerName: string;
  customerEmail: string;
  subject: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "pending";
  assignedStaff?: string;
  category: "Technical" | "Billing" | "Account" | "Feature";
  createdAt: string;
  slaTimeLeft: string;
}

export interface SystemServiceStatus {
  id: string;
  name: string;
  status: "operational" | "degraded" | "outage" | "maintenance";
  uptime: string;
  latency: string;
  loadPercentage: number;
}

export interface ProjectTask {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  progress: number;
  status: "todo" | "in_progress" | "review" | "completed";
}
