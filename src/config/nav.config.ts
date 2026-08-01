import {
  LayoutDashboard,
  Inbox,
  Search,
  Sparkles,
  UserCheck,
  FolderKanban,
  Briefcase,
  BarChart3,
  FileText,
  Calendar as CalendarIcon,
  Building2,
  Users,
  Network,
  UserCog,
  ShieldCheck,
  Lock,
  FileSpreadsheet,
  Store,
  Blocks,
  Code2,
  CreditCard,
  Settings,
  Target,
  DollarSign,
  Package,
  Boxes,
  UserPlus,
  Award,
  BookOpen,
  Bot,
} from 'lucide-react';
import { SidebarConfig } from '@/types/nav';
import { ROUTES } from '@/constants/routes';

export const SIDEBAR_NAV_CONFIG: SidebarConfig = [
  {
    groupTitle: 'Workspace',
    items: [
      {
        title: 'Dashboard',
        href: ROUTES.WORKSPACE.HOME,
        icon: LayoutDashboard,
      },
      {
        title: 'Inbox',
        href: ROUTES.WORKSPACE.INBOX,
        icon: Inbox,
        badge: '5 New',
        badgeVariant: 'purple',
      },
      {
        title: 'Search',
        href: ROUTES.WORKSPACE.SEARCH,
        icon: Search,
      },
      {
        title: 'AI Assistant',
        href: ROUTES.WORKSPACE.AI_COPILOT,
        icon: Sparkles,
        badge: 'GPT-4o',
        badgeVariant: 'default',
      },
    ],
  },
  {
    groupTitle: 'Business Apps',
    items: [
      {
        title: 'HRMS',
        href: ROUTES.WORKSPACE.APPS.HRMS,
        icon: UserCheck,
      },
      {
        title: 'Projects',
        href: ROUTES.WORKSPACE.APPS.PROJECTS,
        icon: FolderKanban,
      },
      {
        title: 'Portfolio',
        href: ROUTES.WORKSPACE.APPS.PORTFOLIO,
        icon: Briefcase,
      },
      {
        title: 'Reports',
        href: ROUTES.WORKSPACE.APPS.REPORTS,
        icon: BarChart3,
      },
      {
        title: 'Documents',
        href: ROUTES.WORKSPACE.APPS.DOCUMENTS,
        icon: FileText,
      },
      {
        title: 'Calendar',
        href: ROUTES.WORKSPACE.APPS.CALENDAR,
        icon: CalendarIcon,
      },
    ],
  },
  {
    groupTitle: 'Administration',
    items: [
      {
        title: 'Organizations',
        href: ROUTES.WORKSPACE.ADMIN.ORGANIZATIONS,
        icon: Building2,
      },
      {
        title: 'People',
        href: ROUTES.WORKSPACE.ADMIN.PEOPLE,
        icon: Users,
      },
      {
        title: 'Departments',
        href: ROUTES.WORKSPACE.ADMIN.DEPARTMENTS,
        icon: Network,
      },
      {
        title: 'Teams',
        href: ROUTES.WORKSPACE.ADMIN.TEAMS,
        icon: UserCog,
      },
      {
        title: 'Roles',
        href: ROUTES.WORKSPACE.ADMIN.ROLES,
        icon: ShieldCheck,
      },
      {
        title: 'Permissions',
        href: ROUTES.WORKSPACE.ADMIN.PERMISSIONS,
        icon: Lock,
      },
      {
        title: 'Audit Logs',
        href: ROUTES.WORKSPACE.ADMIN.AUDIT_LOGS,
        icon: FileSpreadsheet,
      },
    ],
  },
  {
    groupTitle: 'Platform',
    items: [
      {
        title: 'Marketplace',
        href: ROUTES.WORKSPACE.PLATFORM.MARKETPLACE,
        icon: Store,
        badge: 'New',
        badgeVariant: 'warning',
      },
      {
        title: 'Integrations',
        href: ROUTES.WORKSPACE.PLATFORM.INTEGRATIONS,
        icon: Blocks,
      },
      {
        title: 'API',
        href: ROUTES.WORKSPACE.PLATFORM.API,
        icon: Code2,
      },
      {
        title: 'Billing',
        href: ROUTES.WORKSPACE.PLATFORM.BILLING,
        icon: CreditCard,
      },
    ],
  },
  {
    groupTitle: 'Settings',
    items: [
      {
        title: 'Settings',
        href: ROUTES.WORKSPACE.SETTINGS,
        icon: Settings,
      },
    ],
  },
  {
    groupTitle: 'Future',
    items: [
      {
        title: 'CRM',
        href: ROUTES.WORKSPACE.FUTURE.CRM,
        icon: Target,
      },
      {
        title: 'Finance',
        href: ROUTES.WORKSPACE.FUTURE.FINANCE,
        icon: DollarSign,
      },
      {
        title: 'Assets',
        href: ROUTES.WORKSPACE.FUTURE.ASSETS,
        icon: Package,
      },
      {
        title: 'Inventory',
        href: ROUTES.WORKSPACE.FUTURE.INVENTORY,
        icon: Boxes,
      },
      {
        title: 'Recruitment',
        href: ROUTES.WORKSPACE.FUTURE.RECRUITMENT,
        icon: UserPlus,
      },
      {
        title: 'Performance',
        href: ROUTES.WORKSPACE.FUTURE.PERFORMANCE,
        icon: Award,
      },
      {
        title: 'Knowledge',
        href: ROUTES.WORKSPACE.FUTURE.KNOWLEDGE,
        icon: BookOpen,
      },
      {
        title: 'AI Agents',
        href: ROUTES.WORKSPACE.FUTURE.AI_AGENTS,
        icon: Bot,
      },
    ],
  },
];
