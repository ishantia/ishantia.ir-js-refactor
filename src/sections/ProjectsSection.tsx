import { useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FolderGit2,
  Globe,
  Search,
  X,
} from "lucide-react";
import type { Language, ProjectCategory, ProjectItem } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { SpotlightCard } from "../components/SpotlightCard";
import { GitHubIcon } from "../components/BrandIcons";

interface ProjectsSectionProps {
  lang: Language;
  onSelectProject: (project: ProjectItem) => void;
}

const CATEGORIES: Array<{
  id: ProjectCategory;
  label: { en: string; fa: string };
}> = [
  { id: "all", label: { en: "All", fa: "همه" } },
  { id: "python", label: { en: "Python & Bots", fa: "پایتون و ربات‌ها" } },
  { id: "systems", label: { en: "Android & Systems", fa: "اندروید و سیستمی" } },
  { id: "web", label: { en: "Web & Tools", fa: "وب و ابزارها" } },
];

export function ProjectsSection({
  lang,
  onSelectProject,
}: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllInAllTab, setShowAllInAllTab] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { projects } = PORTFOLIO_DATA;

  const counts = useMemo(() => {
    return {
      all: projects.length,
      python: projects.filter((p) => p.category === "python").length,
      systems: projects.filter((p) => p.category === "systems").length,
      web: projects.filter((p) => p.category === "web").length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return projects.filter((project) => {
      if (activeCategory !== "all" && project.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      const haystack = `${project.name} ${project.description.en} ${project.description.fa} ${project.tags.join(" ")}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCategory, projects, searchQuery]);

  const isDefaultCollapsed =
    activeCategory === "all" && !searchQuery.trim() && !showAllInAllTab;

  const displayedProjects = useMemo(() => {
    if (!isDefaultCollapsed) return filteredProjects;
    return filteredProjects.slice(0, 9);
  }, [filteredProjects, isDefaultCollapsed]);

  return (
    <section
      id="projects"
      className="border-t border-[var(--border-subtle)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-soft)] uppercase">
              {lang === "fa" ? "نمونه کارها" : "Selected Work"}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {lang === "fa"
                ? "پروژه‌های متن‌باز و سرویس‌های آنلاین"
                : "Projects, bots & systems tools."}
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] sm:text-base">
              {lang === "fa"
                ? `مجموعه‌ای از ${projects.length} پروژه واقعی در حوزه‌های پایتون، تلگرام، کرنل اندروید، سخت‌افزار و وب.`
                : `A curated showcase of ${projects.length} real repositories and live deployments across Python, Telegram, Android kernels, and web.`}
            </p>
          </div>

          <a
            href="https://github.com/ishantia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-4 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/60 md:self-auto"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>
              {lang === "fa" ? "مشاهده گیت‌هاب" : "Explore GitHub"}
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          </a>
        </div>

        {/* Filter Bar + Search */}
        <div className="mt-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div
            role="tablist"
            aria-label={lang === "fa" ? "دسته‌بندی پروژه‌ها" : "Project categories"}
            className="flex flex-wrap gap-1.5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1.5"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-colors ${
                    active
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {active && (
                    <m.span
                      layoutId="project-filter-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                      className="absolute inset-0 -z-10 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)]"
                    />
                  )}
                  <span>{cat.label[lang]}</span>
                  <span className="rounded-md bg-[var(--bg-base)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                    {counts[cat.id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="pointer-events-none absolute top-1/2 start-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === "fa"
                  ? "جستجوی پروژه یا تکنولوژی..."
                  : "Search projects or tags..."
              }
              aria-label={
                lang === "fa" ? "جستجوی پروژه‌ها" : "Search projects"
              }
              className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] py-2.5 ps-10 pe-9 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-colors focus:border-[var(--accent)] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label={lang === "fa" ? "پاک کردن جستجو" : "Clear search"}
                className="absolute top-1/2 end-2.5 -translate-y-1/2 rounded-md p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <>
            <m.div
              layout={!shouldReduceMotion}
              className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {displayedProjects.map((project) => (
                  <m.div
                    key={project.id}
                    layout={!shouldReduceMotion}
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={
                      shouldReduceMotion
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.96 }
                    }
                    transition={{ duration: 0.2 }}
                  >
                    <SpotlightCard className="h-full p-5">
                      <div className="flex h-full flex-col justify-between gap-4">
                        <div>
                          {/* Visual preview strip */}
                          <div className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/75 ps-3 pe-1.5 py-1.5">
                            <div className="flex items-center gap-2 font-mono text-[11px] text-[var(--text-secondary)]">
                              {project.isLiveSite ? (
                                <>
                                  <Globe className="h-3.5 w-3.5 text-[var(--text-success)]" />
                                  <span>
                                    {lang === "fa" ? "سایت آنلاین" : "Live Site"}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <FolderGit2 className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
                                  <span>
                                    {lang === "fa" ? "متن‌باز" : "Repository"}
                                  </span>
                                </>
                              )}
                            </div>

                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${project.name}`}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] transition-colors hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>

                          <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            className="mt-4 block w-full cursor-pointer text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg"
                          >
                            <h3 className="text-base font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-soft)]">
                              {project.name}
                            </h3>
                            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                              {project.description[lang]}
                            </p>
                          </button>
                        </div>

                        <div className="border-t border-[var(--border-subtle)] pt-3.5">
                          <div dir="ltr" className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="rounded-md border border-[var(--border-subtle)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </m.div>
                ))}
              </AnimatePresence>
            </m.div>

            {/* Expand / Collapse all 33 projects */}
            {activeCategory === "all" && !searchQuery.trim() && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowAllInAllTab((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-surface)] px-5 py-2.5 text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]/60 hover:bg-[var(--bg-elevated)]"
                >
                  {showAllInAllTab ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      <span>
                        {lang === "fa"
                          ? "نمایش پروژه‌های برگزیده (۹)"
                          : "Show featured projects (9)"}
                      </span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      <span>
                        {lang === "fa"
                          ? `نمایش همه ${projects.length} پروژه`
                          : `Show all ${projects.length} projects`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--bg-surface)]/50 py-14 text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              {lang === "fa"
                ? "هیچ پروژه‌ای با این فیلتر یافت نشد."
                : "No projects match your current filter."}
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-semibold text-[var(--text-primary)]"
            >
              {lang === "fa" ? "بازنشانی فیلترها" : "Reset filters"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
