"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  label?: string;
}

export function Spinner({ size = "md", className, label }: SpinnerProps) {
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-2",
    lg: "h-9 w-9 border-3",
    xl: "h-12 w-12 border-4",
  };

  return (
    <div className="inline-flex flex-col items-center justify-center gap-2">
      <div
        className={cn(
          "animate-spin rounded-full border-zinc-200 dark:border-zinc-800 border-t-purple-600 dark:border-t-purple-500",
          sizeMap[size],
          className
        )}
      />
      {label && (
        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          {label}
        </span>
      )}
    </div>
  );
}

interface ComponentLoaderProps {
  label?: string;
  minHeight?: string;
  className?: string;
}

export function ComponentLoader({
  label = "Loading data...",
  minHeight = "min-h-[200px]",
  className,
}: ComponentLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs transition-colors",
        minHeight,
        className
      )}
    >
      <div className="relative flex items-center justify-center mb-3">
        <div className="h-11 w-11 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center">
          <Spinner size="md" />
        </div>
      </div>
      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
        {label}
      </p>
      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
        Connecting to Nexora Engine
      </p>
    </div>
  );
}

interface SkeletonProps {
  className?: string;
  count?: number;
}

export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse rounded-xl bg-zinc-200/90 dark:bg-zinc-800/90 transition-colors",
            className
          )}
        />
      ))}
    </>
  );
}

export function PageLoader({ message = "Initializing Nexora Experience..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-150">
      <div className="relative flex flex-col items-center justify-center space-y-6">
        {/* Pulsing Aura */}
        <div className="relative flex items-center justify-center">
          <div className="absolute h-24 w-24 rounded-3xl bg-purple-600/15 dark:bg-purple-500/25 animate-ping" />
          
          {/* Logo Card */}
          <div className="relative h-20 w-20 overflow-hidden rounded-3xl bg-white dark:bg-zinc-900 shadow-xl dark:shadow-2xl shadow-purple-600/10 dark:shadow-purple-950/60 border border-purple-200 dark:border-purple-800 p-2 flex items-center justify-center transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Nexora.png"
              alt="Nexora Loading"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Brand Text & Status */}
        <div className="text-center space-y-1.5">
          <span className="font-black text-2xl tracking-tight text-purple-700 dark:text-purple-400 font-sans">
            NEXORA
          </span>
          <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            {message}
          </p>
        </div>

        {/* Linear Loading Progress Bar */}
        <div className="h-1.5 w-48 rounded-full bg-purple-100 dark:bg-zinc-800 overflow-hidden border border-purple-200/60 dark:border-zinc-700/60 transition-colors">
          <div className="h-full rounded-full bg-purple-600 dark:bg-purple-500 animate-[marquee_1.4s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
