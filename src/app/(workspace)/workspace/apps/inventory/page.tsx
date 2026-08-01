'use client';

import React from 'react';
import { Boxes, Warehouse, Truck, AlertTriangle } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function InventoryPage() {
  return (
    <EnterpriseModuleView
      title="Inventory & Supply Chain"
      badge="Future Module"
      subtitle="Warehouse stock management, supplier orders, purchase requisitions, and barcode tracking."
      icon={Boxes}
      stats={[
        { title: 'Global Warehouses', value: '6 Facilities', change: 'US, EU, APAC', icon: Warehouse, trend: 'neutral' },
        { title: 'In-Transit Shipments', value: '24 Batches', change: 'On schedule', icon: Truck, trend: 'up' },
        { title: 'Low Stock Alerts', value: '3 SKU Items', change: 'Auto re-ordered', icon: AlertTriangle, trend: 'down' },
      ]}
    />
  );
}
