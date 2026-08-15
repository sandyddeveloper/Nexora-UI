"use client";

import React from "react";

interface CompanyLogo {
  name: string;
  category: string;
  svg: React.ReactNode;
}

const LOGOS: CompanyLogo[] = [
  {
    name: "Stripe",
    category: "Fintech Infrastructure",
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 60 25" fill="none">
        <path d="M59.64 14.28c0-4.47-2.18-8-6.37-8-4.22 0-6.75 3.56-6.75 8 0 5.25 3.06 7.94 7.37 7.94 2.1 0 3.7-.47 4.9-1.12v-3.41c-1.2.6-2.58.94-4.14.94-1.68 0-3.15-.65-3.34-2.53h8.27c0-.28.06-1.34.06-1.82zm-8.33-1.63c.08-1.57.94-2.29 2.06-2.29 1.07 0 1.93.72 2.01 2.29h-4.07zM39.92 6.53c-1.74 0-2.86.81-3.44 1.38l-.22-1.1H31.8v18.78l4.79-1.02v-4.57c.58.5 1.63 1.25 3.33 1.25 3.44 0 6.64-2.77 6.64-7.41 0-4.99-3.23-7.31-6.64-7.31zm-1.1 10.59c-1.15 0-1.88-.42-2.33-.91v-5.2c.47-.53 1.23-.91 2.33-.91 1.76 0 3.03 1.58 3.03 3.52 0 1.99-1.27 3.5-3.03 3.5zM27.27 5.25l-4.76 1.02-.03 2.89h-2.58v3.83h2.58v6.79c0 3.73 1.95 5.47 5.42 5.47 1.58 0 2.76-.28 3.42-.64v-3.72c-.6.25-3.95 1.2-3.95-1.92v-5.98h3.95V9.16h-3.95l-.1-3.91zM11.69 9.38l-.3-3.1-4.47.95v13.98h4.79V9.38h-.02zm-2.38-4.8c1.64 0 2.71-1.18 2.71-2.58 0-1.43-1.07-2.58-2.71-2.58-1.61 0-2.71 1.15-2.71 2.58 0 1.4 1.1 2.58 2.71 2.58zM4.77 11.89c0-1.96 1.6-2.72 4.24-2.72 1.24 0 2.53.25 3.61.81V6.36c-1.18-.47-2.49-.67-3.61-.67C4.16 5.69 0 7.99 0 12.08c0 6.36 8.76 5.35 8.76 8.1 0 .76-.66 1.01-1.57 1.01-1.37 0-3.12-.56-4.5-1.32v3.75c1.48.64 2.99.91 4.5.91 5.07 0 6.55-2.5 6.55-4.88 0-6.85-8.97-5.59-8.97-7.76z" />
      </svg>
    ),
  },
  {
    name: "Datadog",
    category: "Cloud Observability",
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
      </svg>
    ),
  },
  {
    name: "Vercel",
    category: "Edge Cloud Platform",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 116 100">
        <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0z" />
      </svg>
    ),
  },
  {
    name: "Supabase",
    category: "Backend Engine",
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.638 11.88a.792.792 0 0 0 .616 1.266H12v8.958a.396.396 0 0 0 .716.233l8.646-11.717a.792.792 0 0 0-.616-1.266z" />
      </svg>
    ),
  },
  {
    name: "Snowflake",
    category: "Enterprise Data Cloud",
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M12 0l2.5 4.5L12 6.5 9.5 4.5 12 0zm0 17.5l2.5 2 0 4.5-2.5-2-2.5 2 0-4.5 2.5-2zM0 12l4.5-2.5L6.5 12 4.5 14.5 0 12zm17.5 0l2-2.5 4.5 2.5-4.5 2.5-2-2.5zM3.5 3.5l4 1.5-1.5 4-4-1.5 1.5-4zm13 13l4 1.5-1.5 4-4-1.5 1.5-4zM20.5 3.5l1.5 4-4 1.5-1.5-4 4-1.5zM3.5 20.5l4-1.5 1.5 4-4 1.5-1.5-4z"/>
      </svg>
    ),
  },
  {
    name: "Linear",
    category: "Workflow & Issue Tracking",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M3.05 13.95a9 9 0 0 1 7-10.9 9 9 0 0 1 10.9 7 9 9 0 0 1-7 10.9 9 9 0 0 1-10.9-7zm2.14.47a7 7 0 0 0 8.38 5.48L5.19 11.52a7.04 7.04 0 0 0 0 2.9zm13.62-4.84a7 7 0 0 0-8.38-5.48l8.38 8.38a7.04 7.04 0 0 0 0-2.9z"/>
      </svg>
    ),
  },
  {
    name: "HashiCorp",
    category: "Infrastructure as Code",
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M7.4 3.5L4 5.5v13l3.4 2V3.5zm9.2 0v17l3.4-2V5.5l-3.4-2zm-4.6 3.2L9.2 8.3v7.4l2.8 1.6 2.8-1.6V8.3L12 6.7z"/>
      </svg>
    ),
  },
  {
    name: "Cloudflare",
    category: "Global CDN & Edge DNS",
    svg: (
      <svg className="h-6 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M19.4 12.5c-.2-2.5-2.2-4.5-4.8-4.5-1.2 0-2.3.5-3.1 1.3C10.7 8 9.3 7 7.5 7 4.5 7 2 9.5 2 12.5c0 .3 0 .7.1 1H1c-.6 0-1 .4-1 1s.4 1 1 1h19c1.1 0 2-.9 2-2 0-.4-.1-.7-.3-1-.2.2-.4.4-.7.5z"/>
      </svg>
    ),
  },
];

export function CompanyLogosMarquee() {
  return (
    <section className="py-12 md:py-16 border-y border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-950/40 transition-colors overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          Trusted by high-growth engineering and operations teams at
        </p>
      </div>

      {/* Infinite Right-to-Left Ticker with Gradient Fade Mask */}
      <div className="relative w-full overflow-hidden marquee-mask">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 py-2">
          {/* First loop instance */}
          {LOGOS.map((company, index) => (
            <div
              key={`logo-1-${index}`}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700/60 shadow-xs transition-all duration-200 shrink-0 cursor-default select-none group"
            >
              <div className="text-zinc-600 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {company.svg}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm tracking-tight text-zinc-800 dark:text-zinc-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {company.name}
                </span>
                <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                  {company.category}
                </span>
              </div>
            </div>
          ))}

          {/* Second duplicate instance for seamless infinite scrolling */}
          {LOGOS.map((company, index) => (
            <div
              key={`logo-2-${index}`}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-300 dark:hover:border-purple-700/60 shadow-xs transition-all duration-200 shrink-0 cursor-default select-none group"
            >
              <div className="text-zinc-600 dark:text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {company.svg}
              </div>
              <div className="flex flex-col text-left">
                <span className="font-extrabold text-sm tracking-tight text-zinc-800 dark:text-zinc-200 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {company.name}
                </span>
                <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                  {company.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
