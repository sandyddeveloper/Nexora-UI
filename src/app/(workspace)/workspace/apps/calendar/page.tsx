'use client';

import React from 'react';
import { Calendar as CalendarIcon, Clock, Users, Video } from 'lucide-react';
import { EnterpriseModuleView } from '@/components/shared/enterprise-module-view';

export default function CalendarPage() {
  return (
    <EnterpriseModuleView
      title="Global Calendar & Schedule Engine"
      subtitle="Unified organizational calendar connecting team availability, leave schedules, and project deadlines."
      icon={CalendarIcon}
      stats={[
        { title: 'Scheduled Events Today', value: '18 Meetings', change: '4 cross-functional', icon: CalendarIcon, trend: 'neutral' },
        { title: 'Team Overlap Index', value: '94%', change: 'Optimal focus time', icon: Clock, trend: 'up' },
        { title: 'Active Conference Rooms', value: '8 Rooms', change: '2 available now', icon: Video, trend: 'up' },
      ]}
    />
  );
}
