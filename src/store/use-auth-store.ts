'use client';

import { create } from 'zustand';

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  first_name: string;
  last_name: string;
  email_verified?: boolean;
  avatar_url?: string;
}

export interface OrganizationContext {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  status?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isInitializing: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  organization: OrganizationContext | null;
  organizations: OrganizationContext[];
  roles: string[];
  permissions: string[];
  featureFlags: Record<string, boolean>;
  unreadNotificationsCount: number;

  // Actions
  setAccessToken: (token: string | null) => void;
  setRefreshToken: (token: string | null) => void;
  setAuthData: (data: Partial<AuthState>) => void;
  setOrganization: (org: OrganizationContext) => void;
  resetAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  isInitializing: true,
  accessToken: null,
  refreshToken: null,
  user: null,
  organization: null,
  organizations: [],
  roles: [],
  permissions: [],
  featureFlags: {},
  unreadNotificationsCount: 0,

  setAccessToken: (accessToken) =>
    set((state) => ({
      accessToken,
      isAuthenticated: !!accessToken || state.isAuthenticated,
    })),

  setRefreshToken: (refreshToken) =>
    set({ refreshToken }),

  setAuthData: (data) =>
    set((state) => ({
      ...state,
      ...data,
      isAuthenticated: data.accessToken !== undefined ? !!data.accessToken : state.isAuthenticated,
    })),

  setOrganization: (organization) =>
    set({ organization }),

  resetAuth: () =>
    set({
      isAuthenticated: false,
      isInitializing: false,
      accessToken: null,
      refreshToken: null,
      user: null,
      organization: null,
      organizations: [],
      roles: [],
      permissions: [],
      featureFlags: {},
      unreadNotificationsCount: 0,
    }),
}));
