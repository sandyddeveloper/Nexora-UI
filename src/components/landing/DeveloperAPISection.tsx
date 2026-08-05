'use client';

import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

export function DeveloperAPISection() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'ts' | 'python' | 'go' | 'curl'>('ts');

  const codeSnippets = {
    ts: `import { NexoraClient } from '@nexora/sdk';

const nexora = new NexoraClient({
  apiKey: process.env.NEXORA_SOVEREIGN_KEY,
  endpoint: 'https://api.nexora.io/v2'
});

// Deploy AI Employee Agent #04 for Revenue Audit
const execution = await nexora.agents.run({
  agentId: 'analyst_04',
  prompt: 'Audit Q3 enterprise revenue variance across AWS endpoints',
  airGapped: true
});

console.log(\`Execution complete in \${execution.latencyMs}ms\`);`,

    python: `from nexora import NexoraClient

nexora = NexoraClient(
    api_key="nex_sovereign_live_8421",
    endpoint="https://api.nexora.io/v2"
)

# Trigger gRPC Neural Pipeline
execution = nexora.agents.run(
    agent_id="analyst_04",
    prompt="Audit Q3 enterprise revenue variance",
    sovereign=True
)

print(f"Status: {execution.status}, Latency: {execution.latency_ms}ms")`,

    go: `package main

import (
    "context"
    "fmt"
    "github.com/nexora/nexora-go"
)

func main() {
    client := nexora.NewClient("nex_sovereign_live_8421")
    resp, _ := client.RunAgent(context.Background(), &nexora.AgentRequest{
        AgentID: "analyst_04",
        Prompt:  "Audit Q3 enterprise revenue variance",
    })
    fmt.Printf("Execution Completed: %s\n", resp.Status)
}`,

    curl: `curl -X POST https://api.nexora.io/v2/agents/run \\
  -H "Authorization: Bearer nex_sovereign_live_8421" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_id": "analyst_04",
    "prompt": "Audit Q3 enterprise revenue variance",
    "air_gapped": true
  }'`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="developer-api" className="py-24 md:py-32 bg-[#ffffff] border-b border-[#e9d5ff] relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4f0ff] border border-[#e9d5ff] text-xs font-semibold text-[#7c3aed] shadow-sm mb-4">
            <Terminal className="w-3.5 h-3.5 text-[#7c3aed]" />
            <span>DEVELOPER PLATFORM & SDKS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0f172a] font-display">
            Built for Engineers. gRPC & OpenAPI Native.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#475569] font-medium leading-relaxed">
            Programmatically trigger AI agents, stream real-time telemetry, and query RAG vector indices with sub-millisecond SDKs.
          </p>
        </div>

        {/* Code Terminal Box */}
        <div className="mt-14 max-w-4xl mx-auto rounded-3xl bg-[#0f172a] border border-[#e9d5ff] shadow-[0_20px_50px_-10px_rgba(124,58,237,0.2)] overflow-hidden text-left">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#1e293b] border-b border-slate-700 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <span className="w-3 h-3 rounded-full bg-[#10b981]" />
              <div className="ml-4 flex gap-2">
                {(['ts', 'python', 'go', 'curl'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md uppercase font-bold transition-all ${
                      activeTab === tab
                        ? 'bg-[#7c3aed] text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1 text-slate-300 hover:text-white bg-slate-800 rounded border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#10b981]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* Code View */}
          <div className="p-6 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed bg-[#0f172a]">
            <pre><code>{codeSnippets[activeTab]}</code></pre>
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-[#1e293b] border-t border-slate-700 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>SDK VERSION: 2.4.0 (OPENAPI 3.1)</span>
            <span className="text-[#10b981]">✔ SUB-MILLISECOND LATENCY</span>
          </div>

        </div>

      </div>
    </section>
  );
}
