export interface NavItem {
  title: string;
  href: string;
  icon: string;
  badge?: string | number;
  badgeColor?: string;
  roleRequired?: "user" | "staff" | "all";
}

export interface NavSection {
  sectionTitle: string;
  items: NavItem[];
}

export const USER_NAV_SECTIONS: NavSection[] = [
  {
    sectionTitle: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: "LayoutDashboard", roleRequired: "user" },
      { title: "Workspaces", href: "/dashboard/workspaces", icon: "FolderKanban", badge: "18", roleRequired: "user" },
      { title: "Analytics", href: "/dashboard/analytics", icon: "BarChart3", roleRequired: "user" },
    ],
  },
  {
    sectionTitle: "Management",
    items: [
      { title: "API Keys", href: "/dashboard/api-keys", icon: "Key", roleRequired: "user" },
      { title: "Team Members", href: "/dashboard/team", icon: "Users", badge: "34", roleRequired: "user" },
      { title: "Billing & Plans", href: "/dashboard/billing", icon: "CreditCard", roleRequired: "user" },
    ],
  },
  {
    sectionTitle: "Account",
    items: [
      { title: "Profile", href: "/dashboard/profile", icon: "User", roleRequired: "all" },
      { title: "Settings", href: "/dashboard/settings", icon: "Settings", roleRequired: "all" },
    ],
  },
];

export const STAFF_NAV_SECTIONS: NavSection[] = [
  {
    sectionTitle: "Staff Operations",
    items: [
      { title: "Staff Dashboard", href: "/dashboard/staff", icon: "ShieldCheck", roleRequired: "staff" },
      { title: "Triage Queue", href: "/dashboard/staff/tickets", icon: "LifeBuoy", badge: "42", badgeColor: "purple", roleRequired: "staff" },
      { title: "System Health", href: "/dashboard/staff/system", icon: "Activity", badge: "99.98%", badgeColor: "emerald", roleRequired: "staff" },
    ],
  },
  {
    sectionTitle: "Administration",
    items: [
      { title: "Staff Permissions", href: "/dashboard/team", icon: "Users", badge: "34", roleRequired: "staff" },
      { title: "Verifications", href: "/dashboard/staff/verifications", icon: "ShieldAlert", badge: "9", badgeColor: "amber", roleRequired: "staff" },
      { title: "Customer Accounts", href: "/dashboard/staff/accounts", icon: "Building2", roleRequired: "staff" },
      { title: "Audit Logs", href: "/dashboard/staff/audit", icon: "FileText", roleRequired: "staff" },
    ],
  },
  {
    sectionTitle: "Account",
    items: [
      { title: "Profile", href: "/dashboard/profile", icon: "User", roleRequired: "all" },
      { title: "Settings", href: "/dashboard/settings", icon: "Settings", roleRequired: "all" },
    ],
  },
];
