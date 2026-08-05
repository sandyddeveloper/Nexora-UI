'use client';

import React, { useState } from 'react';
import { Cpu, ChevronDown, Command, ShieldCheck, Sparkles, Menu, X, Zap } from 'lucide-react';
import { CmdKModal } from './CmdKModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cmdKOpen, setCmdKOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#ffffff]/90 backdrop-blur-md border-b border-[#e9d5ff] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-18 flex items-center justify-between">
          
          {/* Brand Mark */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="p-2 rounded-xl bg-[#7c3aed] text-white shadow-md group-hover:bg-[#6d28d9] transition-all">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-[#0f172a] font-display">
                Nexora <span className="text-[#7c3aed]">Engine</span>
              </span>
            </a>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-semibold text-[#475569] hover:text-[#7c3aed] transition-colors">
              Platform
            </a>
            <a href="#ai-demo" className="text-sm font-semibold text-[#475569] hover:text-[#7c3aed] transition-colors">
              AI Workforce
            </a>
            <a href="#security" className="text-sm font-semibold text-[#475569] hover:text-[#7c3aed] transition-colors">
              Security
            </a>
            <a href="#developer-api" className="text-sm font-semibold text-[#475569] hover:text-[#7c3aed] transition-colors">
              Developers
            </a>
            <a href="#pricing" className="text-sm font-semibold text-[#475569] hover:text-[#7c3aed] transition-colors">
              Pricing
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCmdKOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-[#f4f0ff] border border-[#e9d5ff] rounded-full text-xs font-semibold text-[#7c3aed] hover:border-[#7c3aed] transition-all"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-[#ffffff] rounded border border-[#e9d5ff]">⌘K</kbd>
            </button>

            <a
              href="/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-[#475569] hover:text-[#7c3aed] transition-colors"
            >
              Sign In
            </a>

            <a
              href="#pricing"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#7c3aed] hover:bg-[#6d28d9] rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Deploy Instance</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#475569] hover:text-[#7c3aed]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#ffffff] border-b border-[#e9d5ff] px-6 py-6 space-y-4 shadow-lg">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#0f172a]">Platform</a>
            <a href="#ai-demo" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#0f172a]">AI Workforce</a>
            <a href="#security" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#0f172a]">Security</a>
            <a href="#developer-api" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#0f172a]">Developers</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-semibold text-[#0f172a]">Pricing</a>
            <div className="pt-4 border-t border-[#e9d5ff] flex flex-col gap-2">
              <a href="/login" className="w-full text-center py-2.5 text-sm font-semibold text-[#475569]">Sign In</a>
              <a href="#pricing" className="w-full text-center py-2.5 text-sm text-white bg-[#7c3aed] rounded-full font-semibold">Deploy Sovereign Instance</a>
            </div>
          </div>
        )}
      </header>

      <CmdKModal isOpen={cmdKOpen} onClose={() => setCmdKOpen(false)} />
    </>
  );
}
