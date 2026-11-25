import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  Check,
  Command,
  Copy,
  FileText,
  Terminal,
} from "lucide-react";
import type { Language } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { MagneticButton } from "../components/MagneticButton";
import { GitHubIcon, TelegramIcon } from "../components/BrandIcons";

interface HeroSectionProps {
  lang: Language;
  onCopyEmail: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export function HeroSection({
  lang,
  onCopyEmail,
  onOpenCommandPalette,
  onOpenResume,
}: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const { profile } = PORTFOLIO_DATA;

  const handleCopy = () => {
    onCopyEmail();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const scrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
    >
      {/* Radial-masked dot grid + subtle ambient glow */}
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_30%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-[var(--accent-glow)] blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy Column — immediate opacity: 1 for 0ms LCP */}
          <div className="lg:col-span-7">
            {/* Status badge */}
            <div className="inline-flex">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)]/80 px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span>{profile.statusBadge[lang]}</span>
              </div>
            </div>

            {/* Name & Value Prop */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
              <span>{profile.name[lang]}</span>
              <span className="mt-2 block bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-soft)] to-[var(--text-secondary)] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl lg:text-4xl">
                {profile.heroTitle[lang]}
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
              {profile.heroBio[lang]}
            </p>

            {/* Magnetic CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#projects"
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--text-primary)] px-5 py-3 text-sm font-semibold text-[var(--bg-base)] shadow-sm transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                <span>
                  {lang === "fa" ? "مشاهده پروژه‌ها" : "View Projects"}
                </span>
                <ArrowDownRight className="h-4 w-4" />
              </MagneticButton>

              <MagneticButton
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/60 hover:bg-[var(--bg-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-[var(--text-success)]" />
                ) : (
                  <Copy className="h-4 w-4 text-[var(--text-secondary)]" />
                )}
                <span>
                  {copied
                    ? lang === "fa"
                      ? "ایمیل کپی شد"
                      : "Copied Email"
                    : lang === "fa"
                      ? "کپی ایمیل"
                      : "Copy Email"}
                </span>
              </MagneticButton>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-transparent px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                <FileText className="h-4 w-4" />
                <span>{lang === "fa" ? "رزومه" : "Resume"}</span>
              </button>
            </div>

            {/* Socials & Command Hint */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[var(--text-secondary)]">
              <a
                href="https://github.com/ishantia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 font-medium transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                <span>github.com/ishantia</span>
              </a>
              <a
                href="https://t.me/ishantia"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 font-medium transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
              >
                <TelegramIcon className="h-3.5 w-3.5" />
                <span>@ishantia</span>
              </a>
              <button
                type="button"
                onClick={onOpenCommandPalette}
                className="hidden items-center gap-1.5 rounded-lg px-2 py-1 font-mono text-[11px] text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)] sm:inline-flex"
              >
                <Command className="h-3 w-3" />
                <span>
                  {lang === "fa"
                    ? "کلید K برای ناوبری سریع"
                    : "Press ⌘K to jump anywhere"}
                </span>
              </button>
            </div>

            {/* Metrics Strip */}
            <div className="mt-10 grid grid-cols-3 gap-3 border-t border-[var(--border-subtle)] pt-6">
              {profile.metrics.map((metric) => (
                <div key={metric.title.en}>
                  <div className="text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                    {metric.title[lang]}
                  </div>
                  <div className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {metric.subtitle[lang]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual / Identity Terminal Column */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]">
                    <img
                      src={profile.avatar.src320}
                      srcSet={`${profile.avatar.src160} 160w, ${profile.avatar.src320} 320w, ${profile.avatar.src480} 480w`}
                      sizes="56px"
                      alt={profile.avatar.alt[lang]}
                      width={56}
                      height={56}
                      fetchPriority="high"
                      decoding="sync"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-primary)]">
                      {profile.name[lang]}
                    </div>
                    <div className="font-mono text-xs text-[var(--accent-soft)]">
                      {profile.handle} · {profile.domain}
                    </div>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-[var(--text-success)]">
                  {lang === "fa" ? "فعال" : "online"}
                </span>
              </div>

              {/* Developer Terminal Card */}
              <div
                dir="ltr"
                className="mt-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] p-4 font-mono text-xs leading-relaxed"
              >
                <div className="mb-3 flex items-center justify-between border-b border-[var(--border-subtle)] pb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                    <Terminal className="h-3 w-3" />
                    ishantia@dev:~
                  </span>
                </div>

                <div className="space-y-2 text-[var(--text-secondary)]">
                  <div>
                    <span className="text-[var(--accent-soft)]">$</span>{" "}
                    <span className="text-[var(--text-primary)]">whoami</span>
                    <div className="ps-3 text-[var(--text-muted)]">
                      Shantia Eslami — Isfahan, Iran
                    </div>
                  </div>
                  <div>
                    <span className="text-[var(--accent-soft)]">$</span>{" "}
                    <span className="text-[var(--text-primary)]">
                      cat focus.json
                    </span>
                    <div className="ps-3 text-[var(--text-muted)]">
                      [&quot;Python&quot;, &quot;Java&quot;, &quot;AI Voice (Gemma-3)&quot;, &quot;Android Kernel&quot;]
                    </div>
                  </div>
                  <div>
                    <span className="text-[var(--accent-soft)]">$</span>{" "}
                    <span className="text-[var(--text-primary)]">
                      status --check
                    </span>
                    <div className="ps-3 text-[var(--text-success)]">
                      ✓ SnowaTech AI Intern (240h) · Open Source Builder
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stack Chips */}
              <div dir="ltr" className="mt-4 flex flex-wrap gap-1.5">
                {[
                  "Python",
                  "Java",
                  "C / C++",
                  "Android",
                  "Telegram API",
                  "FastAPI",
                  "React",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/80 px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
