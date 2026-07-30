import { create } from 'zustand';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  read: boolean;
}

interface NotificationState {
  notifications: NotificationItem[];
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Cluster Auto-scale Triggered',
    message: 'us-east-1a expanded from 12 to 18 Kubernetes nodes.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: 'info',
    read: false,
  },
  {
    id: 'n-2',
    title: 'Canary Deployment Succeeded',
    message: 'nexora-api:v2.4.0 passed 100% health checks.',
    timestamp: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    type: 'success',
    read: false,
  },
  {
    id: 'n-3',
    title: 'High Memory Spike Detected',
    message: 'Pod redis-cache-0 reached 89% RAM threshold.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
    type: 'warning',
    read: false,
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  clearNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: `n-${Date.now()}`,
          timestamp: new Date().toISOString(),
          read: false,
        },
        ...state.notifications,
      ],
    })),
}));
