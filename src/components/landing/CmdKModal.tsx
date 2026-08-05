'use client';

import React, { useEffect, useState } from 'react';
import { Search, Cpu, Shield, FileText, Zap, Sparkles, ArrowRight, X } from 'lucide-react';

interface CmdKModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CmdKModal({ isOpen, onClose }: CmdKModalProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickLinks = [
    { icon: Cpu, title: 'Deploy Sovereign Instance', category: 'Infrastructure', link: '#pricing' },
    { icon: Shield, title: 'Security & SOC2 Type II Report', category: 'Compliance', link: '#security' },
    { icon: Sparkles, title: 'AI Employees & Agents Sandbox', category: 'AI Engine', link: '#ai-demo' },
    { icon: FileText, title: 'OpenAPI & gRPC Documentation', category: 'Developers', link: '#developer-api' },
    { icon: Zap, title: 'Infrastructure TCO & ROI Calculator', category: 'Pricing', link: '#enterprise-benefits' },
  ];

  const filteredLinks = query
    ? quickLinks.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase())
      )
    : quickLinks;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[rgba(15,23,42,0.4)] backdrop-blur-md transition-opacity animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-[#ffffff] border border-[#e9d5ff] rounded-xl shadow-[0_24px_64px_-12px_rgba(124,58,237,0.25)] overflow-hidden">
        
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#e9d5ff] bg-[#faf8ff]">
          <Search className="w-5 h-5 text-[#7c3aed] mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands, docs, security reports, or AI agents..."
            className="w-full bg-transparent text-[#0f172a] text-sm focus:outline-none placeholder-[#94a3b8] font-medium"
            autoFocus
          />
          <div className="flex items-center gap-1.5 ml-2">
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#7c3aed] bg-[#ffffff] border border-[#e9d5ff] rounded">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-1 text-[#64748b] hover:text-[#0f172a] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search Results */}
        <div className="p-2 max-h-80 overflow-y-auto custom-scrollbar">
          <div className="px-3 py-1.5 text-[11px] font-mono font-bold text-[#7c3aed] uppercase tracking-wider">
            Quick Commands & Documentation
          </div>

          {filteredLinks.length > 0 ? (
            filteredLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                onClick={onClose}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[#475569] hover:text-[#7c3aed] hover:bg-[#f4f0ff] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-md bg-[#faf8ff] border border-[#e9d5ff] group-hover:border-[#7c3aed] group-hover:text-[#7c3aed] transition-colors">
                    <item.icon className="w-4 h-4 text-[#7c3aed]" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#0f172a] group-hover:text-[#7c3aed]">{item.title}</div>
                    <div className="text-[11px] text-[#64748b]">{item.category}</div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#64748b] group-hover:text-[#7c3aed] group-hover:translate-x-0.5 transition-all" />
              </a>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-sm text-[#64748b]">
              No system commands found for "{query}"
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#faf8ff] border-t border-[#e9d5ff] text-[11px] font-mono text-[#64748b]">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 text-[9px] font-mono bg-[#ffffff] rounded border border-[#e9d5ff]">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 text-[9px] font-mono bg-[#ffffff] rounded border border-[#e9d5ff]">↵</kbd> Select
            </span>
          </div>
          <span className="text-[#7c3aed] font-bold">● Nexora Core Connected</span>
        </div>
      </div>
    </div>
  );
}
