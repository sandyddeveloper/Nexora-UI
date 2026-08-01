'use client';

import React from 'react';
import { Package, Laptop, ShieldCheck, RefreshCw } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function AssetsPage() {
  return (
    <EnterpriseModuleView
      title="Asset Management System"
      badge="Future Module"
      subtitle="Track hardware, software licenses, lifecycle depreciation, and employee asset provisioning."
      icon={Package}
      stats={[
        { title: 'Provisioned Laptops', value: '1,120 Units', change: '98% assigned', icon: Laptop, trend: 'neutral' },
        { title: 'Software License Seats', value: '3,450 Seats', change: 'Zero compliance gap', icon: ShieldCheck, trend: 'up' },
        { title: 'Assets Due Refresh', value: '42 Devices', change: 'Scheduled Q4', icon: RefreshCw, trend: 'neutral' },
      ]}
    />
  );
}
