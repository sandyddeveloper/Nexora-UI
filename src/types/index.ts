export * from './nav';
export * from './ui';

export type ThemeMode = 'dark' | 'light' | 'system';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'engineer' | 'viewer';
  workspace: string;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  plan: 'Enterprise' | 'Pro' | 'Team';
  region: string;
}

export interface MetricsSummary {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  status?: 'healthy' | 'warning' | 'critical';
}
