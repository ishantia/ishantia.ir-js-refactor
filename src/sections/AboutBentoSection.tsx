import { useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import {
  Code2,
  Cpu,
  FileText,
  GraduationCap,
  MapPin,
  Network,
  Sparkles,
} from "lucide-react";
import type { Language } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { SpotlightCard } from "../components/SpotlightCard";
import { GitHubIcon, TelegramIcon } from "../components/BrandIcons";

interface AboutBentoSectionProps {
  lang: Language;
  onOpenResume: () => void;
  onCopyEmail: () => void;
}

export function AboutBentoSection({
  lang,
  onOpenResume,
  onCopyEmail,
}: AboutBentoSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [activeGroup, setActiveGroup] = useState<string>("all");
  const { profile, highlights, skills, techGroups, spokenLanguages } =
    PORTFOLIO_DATA;

  const iconMap = {
    sparkles: Sparkles,
    cpu: Cpu,
    code: Code2,
    network: Network,
  };

  const visibleChips =
    activeGroup === "all"
      ? techGroups.flatMap((g) => g.items)
      : techGroups.find((g) => g.id === activeGroup)?.items ?? [];

  return (
    <section
      id="about"
      className="border-t border-[var(--border-subtle)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="max-w-2xl">
          <div className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-soft)] uppercase">
            {profile.aboutHeading[lang]}
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
            {profile.aboutTitle[lang]}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)]">
            {profile.aboutCopy[lang]}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Card 1: Profile Card */}
          <SpotlightCard className="p-6 lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                    <img
                      src={profile.avatar.src160}
                      srcSet={`${profile.avatar.src160} 160w, ${profile.avatar.src320} 320w`}
                      sizes="64px"
                      alt={profile.avatar.alt[lang]}
                      width={64}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">
                      {lang === "fa"
                        ? "دانش‌آموز. توسعه‌دهنده. سازنده."
                        : "Student. Developer. Builder."}
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {profile.role[lang]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3 border-t border-[var(--border-subtle)] pt-5 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[var(--text-muted)]">
                      <MapPin className="h-4 w-4" />
                      <span>{lang === "fa" ? "موقعیت" : "Location"}</span>
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {profile.location[lang]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 text-[var(--text-muted)]">
                      <GraduationCap className="h-4 w-4" />
                      <span>{lang === "fa" ? "تحصیلات" : "Education"}</span>
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {lang === "fa"
                        ? "کامپیوتر (هنرستان فن آفرین)"
                        : "Computer Science"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--text-muted)]">
                      {lang === "fa" ? "زبان‌ها" : "Languages"}
                    </span>
                    <span className="font-medium text-[var(--text-primary)]">
                      {spokenLanguages
                        .map((l) => `${l.name[lang]} (${l.level[lang]})`)
                        .join(" · ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/60"
                >
                  <FileText className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
                  <span>
                    {lang === "fa" ? "مشاهده رزومه کامل" : "View Full CV"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="rounded-xl border border-[var(--border-subtle)] px-3.5 py-2 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  shantiaeslami@gmail.com
                </button>
              </div>
            </div>
          </SpotlightCard>

          {/* Card 2: Interactive Tech Stack & Proficiency */}
          <SpotlightCard className="p-6 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  {lang === "fa" ? "تکنولوژی‌ها و مهارت‌ها" : "Technical Arsenal"}
                </h3>
                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  {lang === "fa"
                    ? "ابزارها، زبان‌ها و سطح تسلط عملی"
                    : "Languages, frameworks, and systems toolchains"}
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] p-1">
                {[
                  { id: "all", label: { en: "All", fa: "همه" } },
                  ...techGroups.map((g) => ({ id: g.id, label: g.label })),
                ].map((tab) => {
                  const active = activeGroup === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveGroup(tab.id)}
                      className={`relative rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors ${
                        active
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      {active && (
                        <m.span
                          layoutId="tech-group-pill"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                          className="absolute inset-0 -z-10 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)]"
                        />
                      )}
                      <span>{tab.label[lang]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Tech Chips */}
            <div dir="ltr" className="mt-4 flex flex-wrap gap-1.5">
              {visibleChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-base)]/80 px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)]/50 hover:text-[var(--text-primary)]"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Proficiency Bars */}
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-3 border-t border-[var(--border-subtle)] pt-5 sm:grid-cols-2">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-[var(--text-primary)]">
                      {skill.name[lang]}
                    </span>
                    <span className="font-mono text-[11px] text-[var(--text-muted)]">
                      {skill.value}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                    <m.div
                      initial={{ width: shouldReduceMotion ? `${skill.value}%` : 0 }}
                      whileInView={{ width: `${skill.value}%` }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-soft)]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* Cards 3-6: 4 Core Focus Pillars */}
          {highlights.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <SpotlightCard key={item.id} className="p-5 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--accent-soft)]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono text-[11px] text-[var(--text-muted)]">
                    {item.tag[lang]}
                  </span>
                </div>
                <h3 className="mt-4 text-sm font-bold text-[var(--text-primary)]">
                  {item.title[lang]}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                  {item.body[lang]}
                </p>
              </SpotlightCard>
            );
          })}

          {/* Card 7: Quick Social Dock */}
          <SpotlightCard className="p-4 lg:col-span-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] text-[var(--text-primary)]">
                  <GitHubIcon className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    {lang === "fa"
                      ? "حضور فعال در متن‌باز و ارتباط مستقیم"
                      : "Open Source & Quick Social Dock"}
                  </div>
                  <div className="text-xs text-[var(--text-muted)]">
                    {lang === "fa"
                      ? "دسترسی سریع به گیت‌هاب، تلگرام و ایمیل"
                      : "Instant access to repositories, channels, and direct messaging"}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="https://github.com/ishantia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
                >
                  <GitHubIcon className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://t.me/ishantia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
                >
                  <TelegramIcon className="h-3.5 w-3.5" />
                  <span>Telegram</span>
                </a>
                <button
                  type="button"
                  onClick={onCopyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-glow)] px-3.5 py-2 text-xs font-semibold text-[var(--accent-soft)] transition-opacity hover:opacity-90"
                >
                  <span>
                    {lang === "fa" ? "کپی ایمیل" : "Copy Email"}
                  </span>
                </button>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}
