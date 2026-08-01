'use client';

import React from 'react';
import { BookOpen, FileText, Search, Sparkles } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function KnowledgePage() {
  return (
    <EnterpriseModuleView
      title="Knowledge Base & Enterprise Wiki"
      badge="Future Module"
      subtitle="Notion-style collaborative wiki pages, engineering runbooks, and SOP documentation."
      icon={BookOpen}
      stats={[
        { title: 'Published Knowledge Articles', value: '1,420 Pages', change: '+34 this month', icon: BookOpen, trend: 'up' },
        { title: 'Monthly Internal Views', value: '48.2k Searches', change: '96% resolution rate', icon: Search, trend: 'up' },
        { title: 'AI Vector Index Status', value: 'Synced', change: '100% indexed', icon: Sparkles, trend: 'up' },
      ]}
    />
  );
}
