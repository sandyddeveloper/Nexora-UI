export const ROUTES = {
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
  WORKSPACE: {
    HOME: '/workspace',
    INBOX: '/workspace/inbox',
    AI_COPILOT: '/workspace/copilot',
    APPS: {
      AUTOMATION: '/workspace/apps/automation',
      CRM: '/workspace/apps/crm',
      PROJECTS: '/workspace/apps/projects',
      HRMS: '/workspace/apps/hrms',
      DOCUMENTS: '/workspace/apps/documents',
      CALENDAR: '/workspace/apps/calendar',
      ANALYTICS: '/workspace/apps/analytics',
      MARKETPLACE: '/workspace/apps/marketplace',
      INTEGRATIONS: '/workspace/apps/integrations',
    },
    ADMIN: {
      PEOPLE: '/workspace/admin/people',
      TEAMS: '/workspace/admin/teams',
      ROLES: '/workspace/admin/roles',
      ORGANIZATIONS: '/workspace/admin/organizations',
      BILLING: '/workspace/admin/billing',
      SECURITY: '/workspace/admin/security',
      SETTINGS: '/workspace/admin/settings',
    },
  },
} as const;
