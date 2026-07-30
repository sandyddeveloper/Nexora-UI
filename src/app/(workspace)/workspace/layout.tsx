import React from 'react';
import { WorkspaceShell } from '@/components/layout/shell/workspace-shell';

export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <WorkspaceShell>{children}</WorkspaceShell>;
}
