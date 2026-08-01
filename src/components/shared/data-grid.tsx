'use client';

import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  SlidersHorizontal,
  Download,
  Trash2,
  CheckSquare,
  Square,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export interface Column<T> {
  key: string;
  header: string;
  accessor?: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataGridProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  title?: string;
  description?: string;
  isLoading?: boolean;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  bulkActions?: {
    label: string;
    icon?: React.ElementType;
    variant?: 'default' | 'destructive' | 'outline';
    onClick: (selectedRows: T[]) => void;
  }[];
  primaryAction?: {
    label: string;
    icon?: React.ElementType;
    onClick: () => void;
  };
  pageSize?: number;
}

export function DataGrid<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  title,
  description,
  isLoading = false,
  searchPlaceholder = 'Search records...',
  onRowClick,
  bulkActions = [],
  primaryAction,
  pageSize = 10,
}: DataGridProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set());

  // Filter Data
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data;
    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some(
        (val) => val !== null && val !== undefined && String(val).toLowerCase().includes(query)
      )
    );
  }, [data, searchQuery]);

  // Sort Data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];
      if (aVal === bVal) return 0;
      if (aVal === null || aVal === undefined) return 1;
      if (bVal === null || bVal === undefined) return -1;
      const comparison = aVal < bVal ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate Data
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Toggle Selection
  const toggleSelectAll = () => {
    if (selectedKeys.size === paginatedData.length && paginatedData.length > 0) {
      setSelectedKeys(new Set());
    } else {
      const keys = new Set(paginatedData.map(keyExtractor));
      setSelectedKeys(keys);
    }
  };

  const toggleSelectRow = (key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newKeys = new Set(selectedKeys);
    if (newKeys.has(key)) {
      newKeys.delete(key);
    } else {
      newKeys.add(key);
    }
    setSelectedKeys(newKeys);
  };

  const handleSort = (colKey: string) => {
    if (sortColumn === colKey) {
      if (sortDirection === 'asc') setSortDirection('desc');
      else setSortColumn(null);
    } else {
      setSortColumn(colKey);
      setSortDirection('asc');
    }
  };

  const selectedRows = useMemo(() => {
    return data.filter((row) => selectedKeys.has(keyExtractor(row)));
  }, [data, selectedKeys, keyExtractor]);

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Header Bar */}
      {(title || primaryAction || description) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
          <div>
            {title && (
              <h2 className="text-lg font-bold text-[var(--text-primary)] tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{description}</p>
            )}
          </div>
          {primaryAction && (
            <Button
              onClick={primaryAction.onClick}
              className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white shadow-md shadow-[#8b5cf6]/20 hover:opacity-90 transition-opacity"
            >
              {primaryAction.icon && <primaryAction.icon className="h-4 w-4 mr-2" />}
              {primaryAction.label}
            </Button>
          )}
        </div>
      )}

      {/* Toolbar & Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-placeholder)]" />
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
            className="pl-9 bg-[var(--bg-secondary)] border-[var(--border-color)] text-xs h-9"
          />
        </div>

        <div className="flex items-center gap-2">
          {selectedKeys.size > 0 && bulkActions.length > 0 && (
            <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-color)]">
              <Badge variant="purple" className="text-xs py-1">
                {selectedKeys.size} Selected
              </Badge>
              {bulkActions.map((action, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  variant={action.variant || 'outline'}
                  onClick={() => action.onClick(selectedRows)}
                  className="h-8 text-xs gap-1.5"
                >
                  {action.icon && <action.icon className="h-3.5 w-3.5" />}
                  {action.label}
                </Button>
              ))}
            </div>
          )}

          <Button variant="outline" size="sm" className="h-9 text-xs border-[var(--border-color)]">
            <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="h-9 text-xs border-[var(--border-color)]">
            <Download className="h-3.5 w-3.5 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="relative overflow-x-auto rounded-2xl border border-[var(--border-color)] bg-[var(--surface)] shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/60 text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[11px]">
              <th className="w-10 px-4 py-3.5 text-center">
                <button
                  onClick={toggleSelectAll}
                  className="text-[var(--text-muted)] hover:text-[var(--primary-purple)] transition-colors"
                >
                  {selectedKeys.size === paginatedData.length && paginatedData.length > 0 ? (
                    <CheckSquare className="h-4 w-4 text-[var(--primary-purple)]" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </button>
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3.5 select-none',
                    col.sortable && 'cursor-pointer hover:text-[var(--text-primary)] transition-colors',
                    col.align === 'center' && 'text-center',
                    col.align === 'right' && 'text-right'
                  )}
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div
                    className={cn(
                      'flex items-center gap-1.5',
                      col.align === 'center' && 'justify-center',
                      col.align === 'right' && 'justify-end'
                    )}
                  >
                    <span>{col.header}</span>
                    {col.sortable && (
                      <span className="text-[var(--text-muted)]">
                        {sortColumn === col.key ? (
                          sortDirection === 'asc' ? (
                            <ArrowUp className="h-3.5 w-3.5 text-[var(--primary-purple)]" />
                          ) : (
                            <ArrowDown className="h-3.5 w-3.5 text-[var(--primary-purple)]" />
                          )
                        ) : (
                          <ArrowUpDown className="h-3 w-3 opacity-40 hover:opacity-100" />
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]">
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-12 text-center text-[var(--text-muted)]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-[var(--primary-purple)]" />
                    <span>Loading enterprise records...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-16 text-center text-[var(--text-muted)]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--state-hover)] text-[var(--text-muted)]">
                      <Search className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">No matching records</p>
                    <p className="text-xs text-[var(--text-muted)] max-w-sm">
                      Try adjusting your search filter or clear active criteria.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const key = keyExtractor(row);
                const isSelected = selectedKeys.has(key);

                return (
                  <tr
                    key={key}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={cn(
                      'group transition-colors duration-150',
                      onRowClick && 'cursor-pointer',
                      isSelected
                        ? 'bg-[var(--primary-purple)]/10 text-[var(--text-primary)]'
                        : 'hover:bg-[var(--state-hover)] text-[var(--text-secondary)]'
                    )}
                  >
                    <td className="w-10 px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => toggleSelectRow(key, e)}
                        className="text-[var(--text-muted)] hover:text-[var(--primary-purple)] transition-colors"
                      >
                        {isSelected ? (
                          <CheckSquare className="h-4 w-4 text-[var(--primary-purple)]" />
                        ) : (
                          <Square className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                        )}
                      </button>
                    </td>
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          'px-4 py-3 font-medium whitespace-nowrap',
                          col.align === 'center' && 'text-center',
                          col.align === 'right' && 'text-right'
                        )}
                      >
                        {col.accessor ? col.accessor(row) : row[col.key]}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        {/* Footer Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/40 text-xs text-[var(--text-muted)]">
          <div>
            Showing <span className="font-semibold text-[var(--text-primary)]">{sortedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
            <span className="font-semibold text-[var(--text-primary)]">{Math.min(currentPage * pageSize, sortedData.length)}</span> of{' '}
            <span className="font-semibold text-[var(--text-primary)]">{sortedData.length}</span> entries
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--border-color)]"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--border-color)]"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <span className="px-3 text-xs font-semibold text-[var(--text-primary)]">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--border-color)]"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 border-[var(--border-color)]"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
