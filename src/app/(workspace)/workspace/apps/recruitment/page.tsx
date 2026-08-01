'use client';

import React from 'react';
import { UserPlus, Briefcase, FileCheck, Users } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function RecruitmentPage() {
  return (
    <EnterpriseModuleView
      title="Recruitment & Applicant Tracking (ATS)"
      badge="Future Module"
      subtitle="Job opening requisitions, candidate pipeline, interview scheduling, and offer letters."
      icon={UserPlus}
      stats={[
        { title: 'Open Requisitions', value: '18 Roles', change: '8 engineering', icon: Briefcase, trend: 'up' },
        { title: 'Active Candidates', value: '342 Applicants', change: '42 in interview phase', icon: Users, trend: 'up' },
        { title: 'Avg Time to Hire', value: '22 Days', change: '-4 days velocity', icon: FileCheck, trend: 'up' },
      ]}
    />
  );
}
