import { create } from 'zustand';
import { Workspace } from '@/types';
import { APP_CONFIG } from '@/config/app.config';

interface WorkspaceState {
  currentWorkspace: Workspace;
  workspaces: Workspace[];
  enabledApps: string[];
  setWorkspace: (workspace: Workspace) => void;
  toggleApp: (appId: string) => void;
}

const DEFAULT_WORKSPACES: Workspace[] = [
  {
    id: 'ws-acme-corp',
    name: 'Acme Global Inc.',
    slug: 'acme-global',
    plan: 'Enterprise',
    region: 'us-east-1',
  },
  {
    id: 'ws-[#4f8cff]-labs',
    name: 'Nexora AI Labs',
    slug: 'nexora-labs',
    plan: 'Pro',
    region: 'eu-central-1',
  },
  {
    id: 'ws-apex-group',
    name: 'Apex Ventures',
    slug: 'apex-ventures',
    plan: 'Team',
    region: 'us-west-2',
  },
];

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  currentWorkspace: APP_CONFIG.defaultWorkspace,
  workspaces: DEFAULT_WORKSPACES,
  enabledApps: ['automation', 'crm', 'projects', 'documents', 'analytics', 'calendar'],
  setWorkspace: (workspace) => set({ currentWorkspace: workspace }),
  toggleApp: (appId) =>
    set((state) => ({
      enabledApps: state.enabledApps.includes(appId)
        ? state.enabledApps.filter((id) => id !== appId)
        : [...state.enabledApps, appId],
    })),
}));
