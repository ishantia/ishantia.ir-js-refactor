import { useRef } from "react";
import {
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Language } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { SpotlightCard } from "../components/SpotlightCard";

interface JourneySectionProps {
  lang: Language;
}

export function JourneySection({ lang }: JourneySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 70%"],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="journey"
      className="border-t border-[var(--border-subtle)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-soft)] uppercase">
            {lang === "fa" ? "تجربه و تحصیلات" : "Experience & Journey"}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {lang === "fa"
              ? "مسیر حرفه‌ای و تحصیلی"
              : "Practical experience & academic foundation."}
          </h2>
        </div>

        <div ref={containerRef} className="relative mt-12 ps-8 sm:ps-10">
          {/* Static background track */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 start-3 w-px bg-[var(--border-subtle)] sm:start-4"
          />

          {/* Scroll-linked animated progress line */}
          <m.div
            aria-hidden="true"
            style={
              shouldReduceMotion
                ? undefined
                : { scaleY: lineScaleY, transformOrigin: "top" }
            }
            className="absolute top-2 bottom-2 start-3 w-px bg-gradient-to-b from-[var(--accent)] via-[var(--accent-soft)] to-emerald-400 sm:start-4"
          />

          <div className="space-y-6">
            {PORTFOLIO_DATA.journey.map((item) => {
              const Icon = item.type === "work" ? Briefcase : GraduationCap;
              return (
                <div key={item.id} className="relative">
                  {/* Timeline node */}
                  <span className="absolute -start-8 top-6 flex h-6 w-6 items-center justify-center rounded-full border border-[var(--accent)]/50 bg-[var(--bg-surface)] text-[var(--accent-soft)] shadow-sm sm:-start-9">
                    <Icon className="h-3 w-3" />
                  </span>

                  <SpotlightCard className="p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--accent-soft)]">
                          {item.badge[lang]}
                        </div>
                        <h3 className="mt-2.5 text-lg font-bold text-[var(--text-primary)]">
                          {item.title[lang]}{" "}
                          <span className="font-medium text-[var(--text-secondary)]">
                            — {item.org[lang]}
                          </span>
                        </h3>
                      </div>

                      <span className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
                        {item.period[lang]}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.summary[lang]}
                    </p>

                    <ul className="mt-4 space-y-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                      {item.highlights.map((hl, idx) => (
                        <li key={idx} className="flex gap-2.5">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-soft)]" />
                          <span>{hl[lang]}</span>
                        </li>
                      ))}
                    </ul>

                    <div dir="ltr" className="mt-5 flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </SpotlightCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
