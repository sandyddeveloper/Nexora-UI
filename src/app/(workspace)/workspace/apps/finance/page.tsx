'use client';

import React from 'react';
import { DollarSign, CreditCard, Receipt, TrendingUp } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function FinancePage() {
  return (
    <EnterpriseModuleView
      title="Finance & General Ledger"
      badge="Future Module"
      subtitle="Automated invoicing, accounts payable/receivable, expense auditing, and tax compliance."
      icon={DollarSign}
      stats={[
        { title: 'Monthly Revenue Recognized', value: '$1.48M', change: '+18.4% YoY', icon: DollarSign, trend: 'up' },
        { title: 'Outstanding Invoices', value: '$240,000', change: '12 accounts pending', icon: Receipt, trend: 'neutral' },
        { title: 'Net Operating Profit', value: '34.8%', change: 'Healthy EBITDA ratio', icon: TrendingUp, trend: 'up' },
      ]}
    />
  );
}
