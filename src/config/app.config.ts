import { Workspace } from '@/types';

export const DEFAULT_WORKSPACE: Workspace = {
  id: 'ws-acme-corp',
  name: 'Acme Global Inc.',
  slug: 'acme-global',
  plan: 'Enterprise',
  region: 'us-east-1',
};

export const APP_CONFIG = {
  name: 'Nexora Business OS',
  tagline: 'AI-Powered Business Operating System',
  description:
    'Nexora Business OS is an AI-powered enterprise platform that unifies workflow automation, CRM, HRMS, project management, analytics, knowledge, and intelligent business operations into one modern workspace.',
  url: 'https://nexora.io',
  defaultWorkspace: DEFAULT_WORKSPACE,
};
