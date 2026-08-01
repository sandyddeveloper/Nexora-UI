'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, MoreHorizontal, Clock, MessageSquare, Paperclip, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface KanbanItem {
  id: string;
  title: string;
  description?: string;
  status: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  dueDate?: string;
  commentsCount?: number;
  attachmentsCount?: number;
  tags?: string[];
}

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
}

interface KanbanBoardProps {
  columns: KanbanColumn[];
  items: KanbanItem[];
  onItemMove?: (itemId: string, newStatus: string) => void;
  onItemClick?: (item: KanbanItem) => void;
  onAddItem?: (columnId: string) => void;
}

export function KanbanBoard({
  columns,
  items,
  onItemMove,
  onItemClick,
  onAddItem,
}: KanbanBoardProps) {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const getPriorityBadge = (priority: KanbanItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive" className="text-[10px] uppercase font-bold py-0">Urgent</Badge>;
      case 'high':
        return <Badge variant="warning" className="text-[10px] uppercase font-bold py-0">High</Badge>;
      case 'medium':
        return <Badge variant="purple" className="text-[10px] uppercase font-bold py-0">Medium</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px] uppercase font-bold py-0">Low</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full overflow-x-auto pb-4 custom-scrollbar">
      {columns.map((column) => {
        const columnItems = items.filter((item) => item.status === column.id);

        return (
          <div
            key={column.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedItemId && onItemMove) {
                onItemMove(draggedItemId, column.id);
                setDraggedItemId(null);
              }
            }}
            className="flex flex-col gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] p-3.5 min-h-[500px] shadow-xs"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between px-1 pb-2 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary-purple)]" style={{ backgroundColor: column.color }} />
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  {column.title}
                </h3>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[10px] font-bold text-[var(--text-muted)] border border-[var(--border-color)]">
                  {columnItems.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {onAddItem && (
                  <button
                    onClick={() => onAddItem(column.id)}
                    className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-[var(--state-hover)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Column Cards */}
            <div className="flex-1 flex flex-col gap-3 min-h-[300px]">
              <AnimatePresence>
                {columnItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    draggable
                    onDragStart={() => setDraggedItemId(item.id)}
                    onDragEnd={() => setDraggedItemId(null)}
                    onClick={() => onItemClick && onItemClick(item)}
                    className={cn(
                      'group relative flex flex-col gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3.5 shadow-xs cursor-pointer hover:border-[var(--primary-purple)]/50 hover:bg-[var(--card-hover)] transition-all duration-200',
                      draggedItemId === item.id && 'opacity-40 border-dashed border-[var(--primary-purple)]'
                    )}
                  >
                    {/* Header Tags & Priority */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-wrap gap-1">
                        {item.tags?.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-md bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[9px] font-bold text-[var(--text-muted)] border border-[var(--border-color)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {getPriorityBadge(item.priority)}
                    </div>

                    {/* Task Title & Description */}
                    <div>
                      <h4 className="text-xs font-semibold text-[var(--text-primary)] line-clamp-2 leading-relaxed group-hover:text-[var(--primary-purple)] transition-colors">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-[11px] text-[var(--text-muted)] line-clamp-2 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Footer Info & Assignee */}
                    <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)] text-[10px] text-[var(--text-muted)]">
                      <div className="flex items-center gap-3">
                        {item.dueDate && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.dueDate}
                          </span>
                        )}
                        {item.commentsCount !== undefined && (
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            {item.commentsCount}
                          </span>
                        )}
                      </div>

                      {item.assignee && (
                        <Avatar className="h-6 w-6 ring-2 ring-[var(--surface)]">
                          <AvatarFallback className="bg-gradient-to-tr from-[#8b5cf6] to-[#a855f7] text-white text-[9px] font-bold">
                            {item.assignee.initials}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}
