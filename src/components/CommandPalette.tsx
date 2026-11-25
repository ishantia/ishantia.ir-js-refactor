import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  ArrowUpRight,
  Compass,
  Copy,
  FileText,
  FolderGit2,
  Languages,
  Mail,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import type { Language, ProjectItem, Theme } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { GitHubIcon, TelegramIcon } from "./BrandIcons";

interface CommandItem {
  id: string;
  group: "navigate" | "actions" | "social" | "projects";
  title: string;
  subtitle?: string;
  keywords?: string;
  icon: React.ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  lang: Language;
  theme: Theme;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onCopyEmail: () => void;
  onOpenResume: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export function CommandPalette({
  open,
  onClose,
  lang,
  theme,
  onToggleTheme,
  onToggleLanguage,
  onCopyEmail,
  onOpenResume,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
      document.body.style.overflow = "hidden";
      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    return undefined;
  }, [open]);

  const jumpTo = (id: string) => {
    onClose();
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };

  const allItems = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-hero",
        group: "navigate",
        title: lang === "fa" ? "رفتن به خانه" : "Go to Hero",
        subtitle: lang === "fa" ? "نمای کلی و معرفی" : "Overview & introduction",
        icon: <Compass className="h-4 w-4" />,
        onSelect: () => jumpTo("hero"),
      },
      {
        id: "nav-about",
        group: "navigate",
        title: lang === "fa" ? "رفتن به درباره من و مهارت‌ها" : "Go to About & Tech Stack",
        subtitle: lang === "fa" ? "بنتو گرید و مهارت‌ها" : "Bento grid & proficiency",
        icon: <Compass className="h-4 w-4" />,
        onSelect: () => jumpTo("about"),
      },
      {
        id: "nav-projects",
        group: "navigate",
        title: lang === "fa" ? "رفتن به پروژه‌ها" : "Go to Projects Showcase",
        subtitle:
          lang === "fa"
            ? `${PORTFOLIO_DATA.projects.length} پروژه متن‌باز و آنلاین`
            : `${PORTFOLIO_DATA.projects.length} open-source & live builds`,
        icon: <FolderGit2 className="h-4 w-4" />,
        onSelect: () => jumpTo("projects"),
      },
      {
        id: "nav-journey",
        group: "navigate",
        title: lang === "fa" ? "رفتن به مسیر و سوابق" : "Go to Experience & Journey",
        subtitle: "SnowaTech • Fan Afarin",
        icon: <Compass className="h-4 w-4" />,
        onSelect: () => jumpTo("journey"),
      },
      {
        id: "nav-contact",
        group: "navigate",
        title: lang === "fa" ? "رفتن به تماس" : "Go to Contact",
        subtitle: "shantiaeslami@gmail.com",
        icon: <Mail className="h-4 w-4" />,
        onSelect: () => jumpTo("contact"),
      },
    ];

    const actionItems: CommandItem[] = [
      {
        id: "action-copy-email",
        group: "actions",
        title: lang === "fa" ? "کپی کردن ایمیل" : "Copy Email Address",
        subtitle: "shantiaeslami@gmail.com",
        icon: <Copy className="h-4 w-4" />,
        shortcut: "C",
        onSelect: () => {
          onCopyEmail();
          onClose();
        },
      },
      {
        id: "action-theme",
        group: "actions",
        title:
          theme === "dark"
            ? lang === "fa"
              ? "تغییر به تم روشن"
              : "Switch to Light Mode"
            : lang === "fa"
              ? "تغییر به تم تاریک"
              : "Switch to Dark Mode",
        subtitle:
          theme === "dark"
            ? lang === "fa"
              ? "حالت فعلی: تاریک"
              : "Currently Obsidian Dark"
            : lang === "fa"
              ? "حالت فعلی: روشن"
              : "Currently Light",
        icon:
          theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          ),
        onSelect: () => {
          onToggleTheme();
          onClose();
        },
      },
      {
        id: "action-lang",
        group: "actions",
        title:
          lang === "fa"
            ? "Switch Language to English (LTR)"
            : "تغییر زبان به فارسی (RTL)",
        subtitle: lang === "fa" ? "English" : "فارسی (Vazirmatn)",
        icon: <Languages className="h-4 w-4" />,
        onSelect: () => {
          onToggleLanguage();
          onClose();
        },
      },
      {
        id: "action-resume",
        group: "actions",
        title: lang === "fa" ? "مشاهده و چاپ رزومه (CV)" : "Open Printable Resume / CV",
        subtitle: lang === "fa" ? "دوزبانه فارسی و انگلیسی" : "Bilingual EN / FA format",
        icon: <FileText className="h-4 w-4" />,
        onSelect: () => {
          onClose();
          onOpenResume();
        },
      },
    ];

    const socialItems: CommandItem[] = [
      {
        id: "social-github",
        group: "social",
        title: lang === "fa" ? "باز کردن گیت‌هاب" : "Open GitHub Profile",
        subtitle: "github.com/ishantia",
        icon: <GitHubIcon className="h-4 w-4" />,
        onSelect: () => {
          window.open("https://github.com/ishantia", "_blank", "noopener,noreferrer");
          onClose();
        },
      },
      {
        id: "social-telegram",
        group: "social",
        title: lang === "fa" ? "باز کردن تلگرام" : "Open Telegram",
        subtitle: "@ishantia",
        icon: <TelegramIcon className="h-4 w-4" />,
        onSelect: () => {
          window.open("https://t.me/ishantia", "_blank", "noopener,noreferrer");
          onClose();
        },
      },
    ];

    const projectItems: CommandItem[] = PORTFOLIO_DATA.projects.map((p) => ({
      id: `project-${p.id}`,
      group: "projects",
      title: p.name,
      subtitle: p.tags.slice(0, 3).join(" · "),
      keywords: `${p.description.en} ${p.description.fa} ${p.tags.join(" ")}`,
      icon: <ArrowUpRight className="h-4 w-4" />,
      onSelect: () => {
        onClose();
        onSelectProject(p);
      },
    }));

    return [...navItems, ...actionItems, ...socialItems, ...projectItems];
  }, [
    lang,
    theme,
    onClose,
    onCopyEmail,
    onOpenResume,
    onSelectProject,
    onToggleLanguage,
    onToggleTheme,
  ]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      // Show navigation, actions, socials, and top 5 featured projects when empty
      return allItems.filter(
        (item) =>
          item.group !== "projects" ||
          PORTFOLIO_DATA.projects
            .filter((p) => p.featured)
            .slice(0, 5)
            .some((p) => `project-${p.id}` === item.id),
      );
    }
    return allItems.filter((item) => {
      const text = `${item.title} ${item.subtitle ?? ""} ${item.keywords ?? ""}`.toLowerCase();
      return text.includes(q);
    });
  }, [allItems, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev + 1) % filtered.length : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
        );
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].onSelect();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [filtered, onClose, open, selectedIndex]);

  const groupLabels: Record<CommandItem["group"], string> = {
    navigate: lang === "fa" ? "مسیرها" : "Navigation",
    actions: lang === "fa" ? "عملیات سریع" : "Quick Actions",
    social: lang === "fa" ? "شبکه‌های اجتماعی" : "Socials",
    projects: lang === "fa" ? "پروژه‌ها" : "Projects",
  };

  const grouped = useMemo(() => {
    const groups: Array<{ key: CommandItem["group"]; items: CommandItem[] }> = [];
    const order: CommandItem["group"][] = [
      "actions",
      "navigate",
      "social",
      "projects",
    ];
    for (const g of order) {
      const list = filtered.filter((item) => item.group === g);
      if (list.length > 0) groups.push({ key: g, items: list });
    }
    return groups;
  }, [filtered]);

  let flatCursor = -1;

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[12vh]"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "fa" ? "پالت دستورات" : "Command Palette"}
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <m.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-4 py-3.5">
              <Search className="h-4 w-4 shrink-0 text-[var(--text-muted)]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  lang === "fa"
                    ? "جستجوی بخش‌ها، دستورات یا پروژه‌ها..."
                    : "Type a command or search 33 projects..."
                }
                className="w-full bg-transparent text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-md border border-[var(--border-subtle)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-[58vh] overflow-y-auto p-2">
              {grouped.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <X className="mb-2 h-6 w-6 text-[var(--text-muted)]" />
                  <p className="text-sm text-[var(--text-secondary)]">
                    {lang === "fa"
                      ? "نتیجه‌ای یافت نشد."
                      : "No matching commands or projects."}
                  </p>
                </div>
              ) : (
                grouped.map((group) => (
                  <div key={group.key} className="mb-2 last:mb-0">
                    <div className="px-3 py-1.5 text-[11px] font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                      {groupLabels[group.key]}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      {group.items.map((item) => {
                        flatCursor += 1;
                        const itemIndex = flatCursor;
                        const active = itemIndex === selectedIndex;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            onMouseEnter={() => setSelectedIndex(itemIndex)}
                            onClick={item.onSelect}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors ${
                              active
                                ? "bg-[var(--bg-elevated)] text-[var(--text-primary)]"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]/60"
                            }`}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${
                                  active
                                    ? "border-[var(--accent)]/40 bg-[var(--accent-glow)] text-[var(--accent-soft)]"
                                    : "border-[var(--border-subtle)] bg-[var(--bg-base)] text-[var(--text-muted)]"
                                }`}
                              >
                                {item.icon}
                              </span>
                              <div className="min-w-0">
                                <div className="truncate font-medium">
                                  {item.title}
                                </div>
                                {item.subtitle && (
                                  <div className="truncate font-mono text-[11px] text-[var(--text-muted)]">
                                    {item.subtitle}
                                  </div>
                                )}
                              </div>
                            </div>
                            {item.shortcut && (
                              <kbd className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-base)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                                {item.shortcut}
                              </kbd>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-4 py-2 text-[11px] text-[var(--text-muted)]">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="font-mono">↑↓</kbd>{" "}
                  {lang === "fa" ? "جابجایی" : "Navigate"}
                </span>
                <span>
                  <kbd className="font-mono">↵</kbd>{" "}
                  {lang === "fa" ? "اجرا" : "Select"}
                </span>
              </div>
              <span className="font-mono">ishantia.ir</span>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
