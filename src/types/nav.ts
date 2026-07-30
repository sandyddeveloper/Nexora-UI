import { ComponentType } from 'react';

export interface NavItem {
  title: string;
  href: string;
  icon?: ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'default' | 'success' | 'warning' | 'purple';
  isExternal?: boolean;
  disabled?: boolean;
  permission?: string;
  children?: NavItem[];
}

export interface NavGroup {
  groupTitle?: string;
  items: NavItem[];
}

export type SidebarConfig = NavGroup[];
