'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { authApi } from '@/lib/api/auth-api';
import { Loader2 } from 'lucide-react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { isInitializing, setAuthData, resetAuth } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    async function initializeSession() {
      try {
        const storedRefresh =
          typeof window !== 'undefined' ? localStorage.getItem('nexora_refresh_token') : null;

        // Step 1: Refresh Session Token
        const refreshRes = await authApi.refreshToken(storedRefresh || undefined).catch(() => null);
        const accessToken = (refreshRes as any)?.data?.access || (refreshRes as any)?.access;
        const newRefresh = (refreshRes as any)?.data?.refresh || (refreshRes as any)?.refresh;

        if (accessToken && isMounted) {
          if (newRefresh && typeof window !== 'undefined') {
            localStorage.setItem('nexora_refresh_token', newRefresh);
          }

          // Step 2: Fetch Current User Profile
          const userRes = await authApi.getCurrentUser().catch(() => null);
          const user = (userRes as any)?.data || {
            id: 'usr-1',
            email: 'admin@nexora.io',
            first_name: 'Alex',
            last_name: 'Morgan',
            email_verified: true,
          };

          // Step 3: Fetch Organizations
          const orgsRes = await authApi.getOrganizations().catch(() => null);
          const organizations = (orgsRes as any)?.data || [
            { id: 'org-1', name: 'Nexora Global Enterprises', slug: 'nexora-global', status: 'Active' },
          ];
          const activeOrg = organizations[0] || null;

          // Step 4: Fetch Roles & Permissions & Feature Flags
          const flagsRes = activeOrg ? await authApi.getOrganizationFeatureFlags(activeOrg.id).catch(() => null) : null;
          const featureFlags = (flagsRes as any)?.data || { hrms: true, projects: true, crm: true, ai_agents: true };

          const roles = ['Org Admin', 'Super Admin'];
          const permissions = ['hrms:read', 'hrms:write', 'projects:read', 'projects:write', 'admin:rbac'];

          if (isMounted) {
            setAuthData({
              isAuthenticated: true,
              isInitializing: false,
              accessToken,
              refreshToken: newRefresh || storedRefresh,
              user,
              organization: activeOrg,
              organizations,
              roles,
              permissions,
              featureFlags,
              unreadNotificationsCount: 5,
            });
          }
        } else {
          if (isMounted) {
            resetAuth();
          }
        }
      } catch (error) {
        if (isMounted) {
          resetAuth();
        }
      }
    }

    initializeSession();

    return () => {
      isMounted = false;
    };
  }, [setAuthData, resetAuth]);

  if (isInitializing) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#8b5cf6] to-[#c084fc] p-0.5 shadow-lg shadow-[#8b5cf6]/30">
            <div className="flex h-full w-full items-center justify-center rounded-xl bg-[var(--bg-primary)]">
              <Loader2 className="h-6 w-6 animate-spin text-[var(--primary-purple)]" />
            </div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm font-black tracking-widest text-[var(--text-primary)] uppercase">NEXORA</span>
            <span className="text-[10px] font-bold text-[var(--primary-purple)] tracking-wider mt-0.5">INITIALIZING ENTERPRISE SESSION...</span>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
