'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Loader2, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  component: React.ReactNode;
}

interface WizardProps {
  steps: WizardStep[];
  onComplete: () => void;
  isSubmitting?: boolean;
}

export function Wizard({ steps, onComplete, isSubmitting = false }: WizardProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto rounded-3xl border border-[var(--border-color)] bg-[var(--surface)] p-6 md:p-8 shadow-md">
      {/* Progress Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6 overflow-x-auto custom-scrollbar">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isActive = idx === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-3 shrink-0">
                <div
                  className={cn(
                    'flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all duration-300',
                    isCompleted
                      ? 'bg-[var(--color-success)] text-white shadow-xs'
                      : isActive
                      ? 'bg-gradient-to-tr from-[#8b5cf6] to-[#a855f7] text-white shadow-md shadow-[#8b5cf6]/30 ring-4 ring-[#8b5cf6]/20'
                      : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)]'
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
                </div>
                <div className="flex flex-col">
                  <span
                    className={cn(
                      'text-xs font-bold tracking-tight',
                      isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                    )}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-[10px] text-[var(--text-muted)] hidden sm:block">
                      {step.description}
                    </span>
                  )}
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="h-0.5 w-12 sm:w-16 bg-[var(--border-color)] mx-2 shrink-0">
                  <div
                    className="h-full bg-[var(--primary-purple)] transition-all duration-300"
                    style={{ width: idx < currentStepIndex ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="min-h-[320px] py-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep.component}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls Footer */}
      <div className="flex items-center justify-between pt-6 border-t border-[var(--border-color)]">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={isFirstStep || isSubmitting}
          className="border-[var(--border-color)] text-xs h-10 px-5"
        >
          <ChevronLeft className="h-4 w-4 mr-1.5" />
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-gradient-to-r from-[var(--primary-purple)] to-[var(--secondary-purple)] text-white text-xs h-10 px-6 shadow-md shadow-[#8b5cf6]/20 hover:opacity-90 transition-opacity"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : isLastStep ? (
            <>
              Complete Setup
              <Sparkles className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Continue
              <ChevronRight className="h-4 w-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
