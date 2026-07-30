import {
  Home,
  Inbox,
  Sparkles,
  Zap,
  Users,
  FolderKanban,
  UserCheck,
  FileText,
  Calendar as CalendarIcon,
  BarChart3,
  Store,
  Blocks,
  UserCog,
  Shield,
  CreditCard,
  Lock,
  Settings,
  Building2,
} from 'lucide-react';
import { SidebarConfig } from '@/types/nav';
import { ROUTES } from '@/constants/routes';

export const SIDEBAR_NAV_CONFIG: SidebarConfig = [
  {
    groupTitle: 'Workspace',
    items: [
      {
        title: 'Home',
        href: ROUTES.WORKSPACE.HOME,
        icon: Home,
      },
      {
        title: 'Inbox',
        href: ROUTES.WORKSPACE.INBOX,
        icon: Inbox,
        badge: '5 New',
        badgeVariant: 'purple',
      },
      {
        title: 'AI Copilot',
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
        title: 'Automation',
        href: ROUTES.WORKSPACE.APPS.AUTOMATION,
        icon: Zap,
        badge: '18 Active',
        badgeVariant: 'success',
      },
      {
        title: 'CRM',
        href: ROUTES.WORKSPACE.APPS.CRM,
        icon: Users,
      },
      {
        title: 'Projects',
        href: ROUTES.WORKSPACE.APPS.PROJECTS,
        icon: FolderKanban,
      },
      {
        title: 'HRMS',
        href: ROUTES.WORKSPACE.APPS.HRMS,
        icon: UserCheck,
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
      {
        title: 'Analytics',
        href: ROUTES.WORKSPACE.APPS.ANALYTICS,
        icon: BarChart3,
      },
      {
        title: 'Marketplace',
        href: ROUTES.WORKSPACE.APPS.MARKETPLACE,
        icon: Store,
        badge: 'New',
        badgeVariant: 'warning',
      },
      {
        title: 'Integrations',
        href: ROUTES.WORKSPACE.APPS.INTEGRATIONS,
        icon: Blocks,
      },
    ],
  },
  {
    groupTitle: 'Administration',
    items: [
      {
        title: 'People',
        href: ROUTES.WORKSPACE.ADMIN.PEOPLE,
        icon: UserCog,
      },
      {
        title: 'Teams',
        href: ROUTES.WORKSPACE.ADMIN.TEAMS,
        icon: Building2,
      },
      {
        title: 'Roles & RBAC',
        href: ROUTES.WORKSPACE.ADMIN.ROLES,
        icon: Shield,
      },
      {
        title: 'Organizations',
        href: ROUTES.WORKSPACE.ADMIN.ORGANIZATIONS,
        icon: Building2,
      },
      {
        title: 'Billing & Plan',
        href: ROUTES.WORKSPACE.ADMIN.BILLING,
        icon: CreditCard,
      },
      {
        title: 'Security',
        href: ROUTES.WORKSPACE.ADMIN.SECURITY,
        icon: Lock,
      },
      {
        title: 'Workspace Settings',
        href: ROUTES.WORKSPACE.ADMIN.SETTINGS,
        icon: Settings,
      },
    ],
  },
];
