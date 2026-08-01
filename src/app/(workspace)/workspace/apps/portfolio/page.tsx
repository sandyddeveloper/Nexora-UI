'use client';

import React from 'react';
import { Briefcase, FolderKanban, CheckCircle2, TrendingUp } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function PortfolioPage() {
  return (
    <EnterpriseModuleView
      title="Portfolio & Program Management"
      subtitle="Executive oversight of cross-project programs, strategic alignment, and delivery health."
      icon={Briefcase}
      stats={[
        { title: 'Active Portfolios', value: '12 Programs', change: '+2 new this quarter', icon: Briefcase, trend: 'up' },
        { title: 'Total Budget Allocated', value: '$4.8M', change: '84% consumed', icon: TrendingUp, trend: 'neutral' },
        { title: 'On-Time Milestone Rate', value: '92.4%', change: '+3.1% velocity', icon: CheckCircle2, trend: 'up' },
        { title: 'Cross-Project Risks', value: '3 Flagged', change: 'Requires review', icon: FolderKanban, trend: 'down' },
      ]}
    />
  );
}
