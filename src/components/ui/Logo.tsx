import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  withText?: boolean;
  subtitle?: string;
  className?: string;
}

export function Logo({
  size = "md",
  withText = true,
  subtitle,
  className,
}: LogoProps) {
  const imageSizes = {
    sm: { width: 28, height: 28, imgClass: "h-7 w-7" },
    md: { width: 36, height: 36, imgClass: "h-9 w-9" },
    lg: { width: 44, height: 44, imgClass: "h-11 w-11" },
    xl: { width: 56, height: 56, imgClass: "h-14 w-14" },
  };

  const textSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-xl",
    xl: "text-2xl",
  };

  const { width, height, imgClass } = imageSizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative shrink-0 overflow-hidden rounded-xl bg-white shadow-xs border border-zinc-200/80 dark:border-zinc-800 p-0.5", imgClass)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Nexora.png"
          alt="Nexora Technologies Logo"
          className="h-full w-full object-contain"
        />
      </div>

      {withText && (
        <div className="flex flex-col text-left">
          <span className={cn("font-extrabold tracking-tight text-purple-700 dark:text-purple-400 font-sans leading-none", textSizes[size])}>
            NEXORA
          </span>
          {subtitle && (
            <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500 mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
