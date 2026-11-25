import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  Command,
  FileText,
  Languages,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import type { Language, Theme } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";

export interface NavSectionItem {
  id: string;
  label: { en: string; fa: string };
}

export const NAV_SECTIONS: NavSectionItem[] = [
  { id: "hero", label: { en: "Home", fa: "خانه" } },
  { id: "about", label: { en: "About", fa: "درباره من" } },
  { id: "projects", label: { en: "Projects", fa: "پروژه‌ها" } },
  { id: "journey", label: { en: "Journey", fa: "مسیر و تجربه" } },
  { id: "contact", label: { en: "Contact", fa: "تماس" } },
];

interface NavbarProps {
  activeSection: string;
  lang: Language;
  theme: Theme;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export function Navbar({
  activeSection,
  lang,
  theme,
  onToggleTheme,
  onToggleLanguage,
  onOpenCommandPalette,
  onOpenResume,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "start",
      });
    }
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav
          aria-label={lang === "fa" ? "منوی اصلی" : "Primary navigation"}
          className={`pointer-events-auto flex items-center justify-between gap-2 rounded-full border px-3 py-2 backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "border-[var(--border-strong)] bg-[var(--bg-glass)] shadow-lg shadow-black/15"
              : "border-[var(--border-subtle)] bg-[var(--bg-glass)]"
          }`}
        >
          {/* Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero");
            }}
            className="group flex items-center gap-2.5 rounded-full ps-1 pe-2 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)] font-mono text-xs font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:border-[var(--accent)] group-hover:text-[var(--accent-soft)]">
              {PORTFOLIO_DATA.profile.mark}
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-[var(--text-primary)] sm:inline">
              {PORTFOLIO_DATA.profile.name[lang]}
            </span>
          </a>

          {/* Desktop Navigation Pills */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                    className={`relative inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {isActive && (
                      <m.span
                        layoutId="active-nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                        className="absolute inset-0 -z-10 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elevated)]"
                      />
                    )}
                    <span>{item.label[lang]}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onOpenResume}
              className="hidden items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] sm:inline-flex"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>{lang === "fa" ? "رزومه" : "CV"}</span>
            </button>

            <button
              type="button"
              onClick={onOpenCommandPalette}
              aria-label={
                lang === "fa" ? "باز کردن پالت دستورات" : "Open command palette"
              }
              className="inline-flex h-8 min-w-8 items-center justify-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 px-2.5 font-mono text-[11px] font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              <Command className="h-3 w-3" aria-hidden="true" />
              <span className="hidden sm:inline" aria-hidden="true">
                K
              </span>
            </button>

            <button
              type="button"
              onClick={onToggleLanguage}
              aria-label={
                lang === "fa"
                  ? "EN — Switch to English"
                  : "FA — تغییر زبان به فارسی"
              }
              className="inline-flex h-8 items-center gap-1 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 px-2.5 text-xs font-semibold text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              <Languages className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{lang === "fa" ? "EN" : "FA"}</span>
            </button>

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={
                theme === "dark"
                  ? lang === "fa"
                    ? "تغییر به تم روشن"
                    : "Switch to light mode"
                  : lang === "fa"
                    ? "تغییر به تم تاریک"
                    : "Switch to dark mode"
              }
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={
                mobileOpen
                  ? lang === "fa"
                    ? "بستن منو"
                    : "Close menu"
                  : lang === "fa"
                    ? "باز کردن منو"
                    : "Open menu"
              }
              aria-expanded={mobileOpen}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/70 text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)] md:hidden"
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <m.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 360, damping: 28 }}
              className="pointer-events-auto mt-2.5 overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)]/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {NAV_SECTIONS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]/60 hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span>{item.label[lang]}</span>
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-soft)]" />
                      )}
                    </a>
                  );
                })}
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenResume();
                  }}
                  className="mt-1 flex items-center gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]/60 px-3.5 py-2.5 text-sm font-medium text-[var(--text-primary)]"
                >
                  <FileText className="h-4 w-4 text-[var(--accent-soft)]" />
                  <span>
                    {lang === "fa" ? "مشاهده و چاپ رزومه (CV)" : "View & Print CV"}
                  </span>
                </button>
              </div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
