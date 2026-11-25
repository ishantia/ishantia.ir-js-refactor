import { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { ExternalLink, Globe, Terminal, X } from "lucide-react";
import type { Language, ProjectItem } from "../types/portfolio";
import { GitHubIcon } from "./BrandIcons";

interface ProjectModalProps {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
}

export function ProjectModal({ project, lang, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <m.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] shadow-2xl"
          >
            {/* Generated architecture/terminal preview banner */}
            <div className="relative border-b border-[var(--border-subtle)] bg-[var(--bg-base)] p-6">
              <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-surface)] px-3 py-1 font-mono text-xs text-[var(--text-secondary)]">
                  {project.isLiveSite ? (
                    <>
                      <Globe className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{lang === "fa" ? "وب‌سایت فعال" : "Live Deployment"}</span>
                    </>
                  ) : (
                    <>
                      <GitHubIcon className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
                      <span>{lang === "fa" ? "مخزن متن‌باز" : "Open Source Repository"}</span>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={lang === "fa" ? "بستن" : "Close modal"}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-1.5 text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="relative z-10 mt-5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]/90 p-3.5 font-mono text-xs text-[var(--text-secondary)]" dir="ltr">
                <div className="mb-2 flex items-center gap-1.5 text-[var(--text-muted)]">
                  <Terminal className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
                  <span>ishantia/{project.name}</span>
                </div>
                <div className="truncate text-[var(--text-primary)]">
                  $ inspect --stack {project.tags.slice(0, 4).join(" ")}
                </div>
                <div className="mt-1 truncate text-[11px] text-[var(--text-muted)]">
                  → {project.link}
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6">
              <h3
                id="project-modal-title"
                className="text-xl font-bold tracking-tight text-[var(--text-primary)]"
              >
                {project.name}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.description[lang]}
              </p>

              <div className="mt-5">
                <div className="mb-2 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                  {lang === "fa" ? "فناوری‌ها و برچسب‌ها" : "Technologies & Tags"}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-xs text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[var(--border-subtle)] pt-5">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[var(--border-subtle)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
                >
                  {lang === "fa" ? "بستن" : "Close"}
                </button>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {project.isLiveSite ? (
                    <>
                      <span>{lang === "fa" ? "بازدید وب‌سایت" : "Visit Live Site"}</span>
                      <ExternalLink className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <GitHubIcon className="h-4 w-4" />
                      <span>{lang === "fa" ? "مشاهده در گیت‌هاب" : "View Source on GitHub"}</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </>
                  )}
                </a>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
