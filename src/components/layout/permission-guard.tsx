'use client';

import React from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PermissionGuardProps {
  requiredPermission?: string;
  requiredRole?: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  requiredPermission,
  requiredRole,
  children,
  fallback,
}: PermissionGuardProps) {
  const { permissions, roles } = useAuthStore();

  const hasPermission = requiredPermission ? permissions.includes(requiredPermission) : true;
  const hasRole = requiredRole ? roles.includes(requiredRole) : true;

  if (!hasPermission || !hasRole) {
    if (fallback) return <>{fallback}</>;

    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] p-8 text-center bg-[var(--surface)] rounded-3xl border border-[var(--border-color)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-danger)]/15 text-[var(--color-danger)] mb-4">
          <ShieldAlert className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Access Entitlement Restricted</h2>
        <p className="text-xs text-[var(--text-muted)] max-w-md mt-2 leading-relaxed">
          Your account role does not have the required permissions ({requiredPermission || requiredRole}) to view this resource.
        </p>
        <Link href="/workspace" className="mt-6">
          <Button variant="outline" size="sm" className="border-[var(--border-color)] text-xs">
            <ArrowLeft className="h-4 w-4 mr-2" /> Return to Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return <>{children}</>;
}
