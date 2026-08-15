import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "The role separation between our customer tier and internal support staff saved us weeks of custom engineering. Nexora is genuinely an elite foundation.",
    author: "Danielle Thorne",
    title: "VP of Engineering at CloudScale",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Our incident response time dropped by 40% immediately after rolling out the staff triage queue. The purple aesthetic and UX polish is unmatched.",
    author: "Liam Montgomery",
    title: "Head of Operations at NovaStack",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    quote:
      "Having full dark and light mode built-in with proper contrast and zero flicker gave our clients an instant enterprise feel from day one.",
    author: "Sofia Alverez",
    title: "Lead Frontend Architect at Prism Labs",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="purple" size="md">
            Customer Stories
          </Badge>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Trusted by World-Class Product Teams
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            See how forward-thinking teams streamline customer growth and support operations with Nexora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200/90 dark:border-zinc-800 p-7 shadow-sm flex flex-col justify-between hover:border-purple-300 dark:hover:border-purple-700/60 transition-all duration-300"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="h-10 w-10 rounded-xl object-cover ring-2 ring-purple-500/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{t.author}</h4>
                  <p className="text-[11px] text-zinc-400">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
