'use client';

import React from 'react';
import { Award, Target, TrendingUp, Star } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function PerformancePage() {
  return (
    <EnterpriseModuleView
      title="Performance Reviews & OKRs"
      badge="Future Module"
      subtitle="Quarterly performance cycles, 360-degree feedback, goal alignment, and skill matrices."
      icon={Award}
      stats={[
        { title: 'OKR Goal Attainment', value: '86.4%', change: '+5.2% vs Q2', icon: Target, trend: 'up' },
        { title: 'Completed 360 Reviews', value: '94.2%', change: '1,175 reviews', icon: Star, trend: 'up' },
        { title: 'High Performers Identified', value: '184 Staff', change: 'Eligible for promotion', icon: TrendingUp, trend: 'up' },
      ]}
    />
  );
}
