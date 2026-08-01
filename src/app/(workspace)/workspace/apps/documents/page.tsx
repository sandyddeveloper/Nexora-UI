'use client';

import React from 'react';
import { FileText, HardDrive, Share2, Lock } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function DocumentsPage() {
  return (
    <EnterpriseModuleView
      title="Enterprise Documents & Knowledge"
      subtitle="Secure block-based document repository, policy management, and collaborative specs."
      icon={FileText}
      stats={[
        { title: 'Total Enterprise Files', value: '4,820', change: '1.2 TB used', icon: HardDrive, trend: 'neutral' },
        { title: 'Shared Policy Manuals', value: '142 Docs', change: '100% compliant', icon: Share2, trend: 'up' },
        { title: 'Encrypted Security Vaults', value: '28 Vaults', change: 'Zero breaches', icon: Lock, trend: 'up' },
      ]}
    />
  );
}
