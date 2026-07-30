import { create } from 'zustand';
import { Workspace } from '@/types';
import { APP_CONFIG } from '@/config/app.config';

interface UIState {
  isSearchOpen: boolean;
  isAiModalOpen: boolean;
  isNotificationsOpen: boolean;
  currentWorkspace: Workspace;
  setSearchOpen: (open: boolean) => void;
  setAiModalOpen: (open: boolean) => void;
  setNotificationsOpen: (open: boolean) => void;
  setWorkspace: (workspace: Workspace) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSearchOpen: false,
  isAiModalOpen: false,
  isNotificationsOpen: false,
  currentWorkspace: APP_CONFIG.defaultWorkspace,
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setAiModalOpen: (open) => set({ isAiModalOpen: open }),
  setNotificationsOpen: (open) => set({ isNotificationsOpen: open }),
  setWorkspace: (workspace) => set({ currentWorkspace: workspace }),
}));
