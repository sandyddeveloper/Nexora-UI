'use client';

import React from 'react';
import { Cpu, ShieldCheck, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#ffffff] pt-16 pb-12 border-t border-[#e9d5ff]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 5-Column Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#e9d5ff]">
          
          {/* Column 1: Brand Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-[#7c3aed] rounded-md shadow-sm text-white">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-semibold text-base tracking-tight text-[#0f172a] font-display">
                NEXORA <span className="text-[11px] font-mono text-[#7c3aed] font-bold">ENGINE</span>
              </span>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed font-medium">
              The AI Operating System for Modern Enterprises. Architected for zero-trust data sovereignty and sub-millisecond execution.
            </p>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] text-[11px] text-[#10b981] font-mono font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
              </span>
              <span>ALL SYSTEMS OPERATIONAL</span>
            </div>
          </div>

          {/* Column 2: Platform */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#7c3aed] font-bold uppercase tracking-wider">PLATFORM</div>
            <ul className="space-y-2 text-xs text-[#475569] font-medium">
              <li><a href="#ai-demo" className="hover:text-[#7c3aed] transition-colors">AI Employees</a></li>
              <li><a href="#features" className="hover:text-[#7c3aed] transition-colors">Project Management</a></li>
              <li><a href="#features" className="hover:text-[#7c3aed] transition-colors">Enterprise CRM</a></li>
              <li><a href="#features" className="hover:text-[#7c3aed] transition-colors">HRMS & Payroll</a></li>
              <li><a href="#analytics" className="hover:text-[#7c3aed] transition-colors">Telemetry Analytics</a></li>
            </ul>
          </div>

          {/* Column 3: Enterprise */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#7c3aed] font-bold uppercase tracking-wider">ENTERPRISE</div>
            <ul className="space-y-2 text-xs text-[#475569] font-medium">
              <li><a href="#security" className="hover:text-[#7c3aed] transition-colors">Air-Gapped VPC</a></li>
              <li><a href="#security" className="hover:text-[#7c3aed] transition-colors">SOC2 & Compliance</a></li>
              <li><a href="#security" className="hover:text-[#7c3aed] transition-colors">Cryptographic Audit Logs</a></li>
              <li><a href="#pricing" className="hover:text-[#7c3aed] transition-colors">Compute Tiers</a></li>
              <li><a href="#enterprise-benefits" className="hover:text-[#7c3aed] transition-colors">ROI Calculator</a></li>
            </ul>
          </div>

          {/* Column 4: Developers */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#7c3aed] font-bold uppercase tracking-wider">DEVELOPERS</div>
            <ul className="space-y-2 text-xs text-[#475569] font-medium">
              <li><a href="#developer-api" className="hover:text-[#7c3aed] transition-colors">Documentation</a></li>
              <li><a href="#developer-api" className="hover:text-[#7c3aed] transition-colors">OpenAPI & gRPC Specs</a></li>
              <li><a href="#developer-api" className="hover:text-[#7c3aed] transition-colors">TypeScript SDK</a></li>
              <li><a href="#developer-api" className="hover:text-[#7c3aed] transition-colors">Python SDK</a></li>
              <li><a href="#developer-api" className="hover:text-[#7c3aed] transition-colors">Go SDK</a></li>
            </ul>
          </div>

          {/* Column 5: Company */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#7c3aed] font-bold uppercase tracking-wider">COMPANY</div>
            <ul className="space-y-2 text-xs text-[#475569] font-medium">
              <li><a href="#" className="hover:text-[#7c3aed] transition-colors">About Nexora</a></li>
              <li><a href="#" className="hover:text-[#7c3aed] transition-colors">Careers (Hiring)</a></li>
              <li><a href="#security" className="hover:text-[#7c3aed] transition-colors">CISO Security Portal</a></li>
              <li><a href="#" className="hover:text-[#7c3aed] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#7c3aed] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
          <div>
            © 2026 Nexora Engine Inc. All rights reserved. Built for sovereign enterprise compute.
          </div>
          <div className="flex items-center gap-4 text-[#475569] font-semibold">
            <span className="flex items-center gap-1 text-[#10b981]"><ShieldCheck className="w-3.5 h-3.5" /> SOC2 Type II Certified</span>
            <span className="flex items-center gap-1 text-[#7c3aed]"><Globe className="w-3.5 h-3.5" /> Region: US-East-1</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
