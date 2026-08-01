'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  Zap,
  CheckCircle2,
  Cpu,
  Brain,
  MessageSquare,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AgentWorkflow {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Idle' | 'Running';
  triggerCount: number;
}

const MOCK_AGENTS: AgentWorkflow[] = [
  { id: 'AGT-1', name: 'HRMS Leave Auto-Triage Agent', description: 'Automatically verifies employee leave balance against calendar coverage before approving.', status: 'Active', triggerCount: 142 },
  { id: 'AGT-2', name: 'Project Resource Capacity Optimizer', description: 'Detects over-allocated engineering staff and suggests task re-assignment.', status: 'Running', triggerCount: 89 },
  { id: 'AGT-3', name: 'Financial Anomaly Detector', description: 'Parses monthly payroll variances and alerts on unapproved bonus payouts.', status: 'Active', triggerCount: 56 },
];

export default function CopilotPage() {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: 'Hello! I am Nexora AI Copilot. I have full context of your workspace across HRMS, Projects, CRM, and Analytics. How can I assist your team today?',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (!inputText.trim()) return;
    const userMsg = inputText;
    setInputText('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzed query "${userMsg}". Cross-referencing 1,248 Employee directory records & active project sprint tasks... Recommendation: No capacity bottlenecks detected.`,
        },
      ]);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[2400px]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[var(--border-color)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-[var(--primary-purple)]/20 text-[var(--primary-purple)]">
              <Sparkles className="h-4 w-4" />
            </span>
            <h1 className="text-xl md:text-2xl font-black text-[var(--text-primary)] tracking-tight">
              Nexora AI Copilot & Autonomous Agents
            </h1>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            AI-native intelligence layer capable of cross-module querying, automated triage, and workflow execution.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="purple" className="py-1 px-3">
            <Cpu className="h-3.5 w-3.5 mr-1.5" />
            GPT-4o Enterprise Model
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface Left */}
        <div className="lg:col-span-2 flex flex-col h-[650px] rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-[var(--primary-purple)]" />
              <span className="text-xs font-bold text-[var(--text-primary)]">Interactive Copilot Canvas</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setMessages([messages[0]])} className="h-7 text-xs">
              <RefreshCw className="h-3 w-3 mr-1" /> Clear Session
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-[#8b5cf6] to-[#a855f7] text-white">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl max-w-xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[var(--primary-purple)] text-white font-medium'
                      : 'bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--text-primary)]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/30 flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot e.g. 'Summarize engineering payroll liability vs ARR'..."
              className="bg-[var(--surface)] border-[var(--border-color)] text-xs h-10"
            />
            <Button onClick={handleSend} className="bg-[var(--primary-purple)] text-white h-10 px-4">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Autonomous Agents Right */}
        <div className="flex flex-col gap-4 rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-[var(--primary-purple)]" />
            <h3 className="text-sm font-bold text-[var(--text-primary)]">Autonomous Workflow Agents</h3>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Background AI bots executing continuous platform optimizations.</p>

          <div className="flex flex-col gap-3 pt-2">
            {MOCK_AGENTS.map((agent) => (
              <div key={agent.id} className="p-3.5 rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[var(--text-primary)]">{agent.name}</h4>
                  <Badge variant={agent.status === 'Running' ? 'purple' : 'success'}>{agent.status}</Badge>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">{agent.description}</p>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)] pt-1 border-t border-[var(--border-color)]">
                  <span>Triggers: {agent.triggerCount} runs</span>
                  <span className="font-bold text-[var(--primary-purple)] flex items-center gap-1 cursor-pointer">
                    Configure <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
