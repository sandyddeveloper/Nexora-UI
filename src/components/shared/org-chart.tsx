'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, Mail, Phone, Building2, User, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export interface OrgNode {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  avatarInitials: string;
  directReports?: OrgNode[];
}

interface OrgChartProps {
  data: OrgNode;
  onNodeClick?: (node: OrgNode) => void;
}

function OrgTreeNode({ node, onNodeClick, depth = 0 }: { node: OrgNode; onNodeClick?: (node: OrgNode) => void; depth?: number }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReports = node.directReports && node.directReports.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Node Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => onNodeClick && onNodeClick(node)}
        className={cn(
          'group relative flex flex-col gap-2.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-sm min-w-[240px] max-w-[280px] cursor-pointer hover:border-[var(--primary-purple)]/60 hover:bg-[var(--card-hover)] transition-all duration-200',
          depth === 0 && 'border-[var(--primary-purple)]/40 shadow-md shadow-[#8b5cf6]/10'
        )}
      >
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 ring-2 ring-[var(--primary-purple)]/30">
            <AvatarFallback className="bg-gradient-to-tr from-[#8b5cf6] to-[#a855f7] text-white text-xs font-black">
              {node.avatarInitials}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col min-w-0">
            <h4 className="text-xs font-bold text-[var(--text-primary)] truncate group-hover:text-[var(--primary-purple)] transition-colors">
              {node.name}
            </h4>
            <span className="text-[11px] font-medium text-[var(--text-secondary)] truncate">
              {node.role}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)]">
          <Badge variant="purple" className="text-[9px] py-0 font-semibold">
            {node.department}
          </Badge>

          {hasReports && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
              className="flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-[var(--state-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span className="font-bold">{node.directReports?.length} Directs</span>
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
          )}
        </div>
      </motion.div>

      {/* Children Lines & Nodes */}
      {hasReports && isExpanded && (
        <div className="flex flex-col items-center w-full mt-3">
          {/* Vertical Connecting Line */}
          <div className="h-5 w-0.5 bg-[var(--primary-purple)]/40" />

          {/* Horizontal Line Container */}
          <div className="relative flex justify-center gap-8 pt-3 border-t border-[var(--primary-purple)]/40 w-full max-w-[95%]">
            {node.directReports?.map((reportChild) => (
              <OrgTreeNode key={reportChild.id} node={reportChild} onNodeClick={onNodeClick} depth={depth + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function OrgChart({ data, onNodeClick }: OrgChartProps) {
  return (
    <div className="flex justify-center overflow-x-auto p-6 min-w-full custom-scrollbar">
      <OrgTreeNode node={data} onNodeClick={onNodeClick} />
    </div>
  );
}
