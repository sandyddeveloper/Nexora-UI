import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AIPanelState {
  isOpen: boolean;
  activeContext: string | null;
  togglePanel: () => void;
  setOpen: (open: boolean) => void;
  setActiveContext: (context: string | null) => void;
}

export const useAIPanelStore = create<AIPanelState>()(
  persist(
    (set) => ({
      isOpen: false,
      activeContext: null,
      togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      setActiveContext: (context) => set({ activeContext: context }),
    }),
    {
      name: 'nexora_ai_panel_open',
    }
  )
);
