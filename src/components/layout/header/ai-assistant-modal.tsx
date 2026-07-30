'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, CheckCircle2, Terminal } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalTitle } from '@/components/ui/modal';
import { useUIStore } from '@/store/use-ui-store';
import { Button } from '@/components/ui/button';

export function AiAssistantModal() {
  const { isAiModalOpen, setAiModalOpen } = useUIStore();
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: 'Hello Alex! I am Nexora Autonomous Assistant. I can analyze telemetry, trigger automated rollbacks, or generate Terraform manifests. How can I assist your stack today?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Analyzing pipeline request: "${userMsg}". All health metrics for US-East cluster are nominal (99.99% uptime). No anomaly detected.`,
        },
      ]);
    }, 800);
  };

  return (
    <Modal open={isAiModalOpen} onOpenChange={setAiModalOpen}>
      <ModalContent className="max-w-2xl p-4 sm:p-6 bg-[var(--surface-elevated)]/95 backdrop-blur-2xl border-[var(--primary-purple)]/30 shadow-[0_0_50px_rgba(139,92,246,0.2)]">
        <ModalHeader className="border-b border-white/10 pb-4 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#7c5cff] to-[#4f8cff] text-white shadow-lg shadow-[#7c5cff]/30">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <ModalTitle className="text-base font-bold text-white">Nexora Autonomous Copilot</ModalTitle>
              <p className="text-xs text-slate-400">Powered by Neural DevOps Intelligence Engine v1.5</p>
            </div>
          </div>
        </ModalHeader>

        {/* Chat Messages */}
        <div className="my-4 flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 text-xs leading-relaxed ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className="h-7 w-7 rounded-lg bg-[#7c5cff]/20 border border-[#7c5cff]/40 flex items-center justify-center text-[#7c5cff] shrink-0">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`rounded-2xl p-3.5 max-w-[85%] border ${
                  msg.sender === 'user'
                    ? 'bg-[#4f8cff] text-white border-[#4f8cff]/50 rounded-tr-none'
                    : 'bg-white/[0.05] text-slate-200 border-white/10 backdrop-blur-md rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 pt-2 border-t border-white/10">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI to optimize pipeline, debug logs, or check cluster..."
            className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#7c5cff]"
          />
          <Button onClick={handleSend} variant="primary" size="sm" className="bg-[#7c5cff] hover:bg-[#6847ed]">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
}
