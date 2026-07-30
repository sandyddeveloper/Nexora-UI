'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Zap, FileText, Users, RefreshCw } from 'lucide-react';
import { useAIPanelStore } from '@/store/use-ai-panel-store';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const AI_PRESETS = [
  { icon: Zap, label: 'Automate Lead Workflow', prompt: 'Create an automated Zap-style trigger whenever a new deal closes in CRM.' },
  { icon: FileText, label: 'Summarize Workspace Docs', prompt: 'Summarize all recent Q3 enterprise product specification documents.' },
  { icon: Users, label: 'Audit Team Permissions', prompt: 'Check all active roles and highlight users with unassigned security roles.' },
];

export function RightAIPanel() {
  const { isOpen, setOpen } = useAIPanelStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Greetings! I am the Nexora Business Copilot. I monitor your CRM, HRMS, Documents, and Workflow Automations. How can I augment your workspace today?',
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    if (!customPrompt) setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Executing autonomous workspace agent task: "${textToSend}". Synchronized 4 records across CRM and Workflow Automation engine.`,
        },
      ]);
      toast.success('AI Agent Executed Task', {
        description: 'Updated workspace data seamlessly.',
      });
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: 380, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 380, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 z-50 flex h-screen w-full sm:w-96 md:w-[400px] 2xl:w-[460px] max-w-full flex-col border-l border-[var(--border-color)] bg-[var(--surface-elevated)] backdrop-blur-2xl shadow-2xl p-4 text-[var(--text-primary)] transition-colors duration-200"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white shadow-md">
                <Sparkles className="h-4 w-4 animate-pulse" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[var(--text-primary)]">AI Copilot</span>
                  <Badge variant="purple" className="text-[9px] px-1.5 py-0">v2.5</Badge>
                </div>
                <span className="text-[10px] text-[var(--text-muted)]">Context: Acme Global Workspace</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Preset Prompts */}
          <div className="py-3 border-b border-[var(--divider-color)]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
              Autonomous Actions
            </span>
            <div className="flex flex-col gap-1.5">
              {AI_PRESETS.map((preset, idx) => {
                const Icon = preset.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSend(preset.prompt)}
                    className="flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--glass-bg)] p-2 text-left text-xs text-[var(--text-secondary)] hover:bg-[var(--state-hover)] hover:text-[var(--text-primary)] hover:border-[var(--primary-purple)]/40 transition-all group"
                  >
                    <div className="p-1.5 rounded-lg bg-[var(--glass-bg)] text-[var(--primary-purple)] group-hover:text-[var(--primary-purple)] transition-colors">
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto my-3 pr-1 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 text-xs ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'ai' && (
                  <div className="h-6 w-6 rounded-lg bg-[var(--primary-purple)]/20 border border-[var(--primary-purple)]/40 flex items-center justify-center text-[var(--primary-purple)] shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`rounded-2xl p-3 max-w-[85%] border leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[var(--primary-purple)] text-white border-[var(--primary-purple)]/50 rounded-tr-none'
                      : 'bg-[var(--glass-bg)] text-[var(--text-primary)] border-[var(--border-color)] backdrop-blur-md rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] p-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-[var(--primary-purple)]" />
                <span>AI Agent thinking...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="pt-3 border-t border-[var(--border-color)] flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask Copilot or command agent..."
              className="flex-1 rounded-xl bg-[var(--glass-bg)] border border-[var(--border-color)] px-3 py-2 text-xs text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--primary-purple)]"
            />
            <Button
              onClick={() => handleSend()}
              size="sm"
              variant="primary"
              className="px-3"
            >
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
