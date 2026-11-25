import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { LazyMotion, MotionConfig } from "framer-motion";
import type { ProjectItem } from "./types/portfolio";
import { PORTFOLIO_DATA } from "./data/portfolio";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";
import { useActiveSection } from "./hooks/useActiveSection";
import { ToastProvider, useToast } from "./components/ToastProvider";
import { Navbar, NAV_SECTIONS } from "./components/Navbar";
import { HeroSection } from "./sections/HeroSection";
import { AboutBentoSection } from "./sections/AboutBentoSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { JourneySection } from "./sections/JourneySection";
import { ContactFooterSection } from "./sections/ContactFooterSection";

const loadMotionFeatures = () =>
  new Promise<typeof import("./motionFeatures")["default"]>((resolve) => {
    const load = () =>
      import("./motionFeatures").then((mod) => resolve(mod.default));

    if (typeof window === "undefined") {
      load();
      return;
    }

    let triggered = false;
    const triggerOnce = () => {
      if (triggered) return;
      triggered = true;
      cleanup();
      load();
    };

    const events = ["pointerdown", "pointermove", "keydown", "scroll", "touchstart"] as const;
    const cleanup = () => {
      events.forEach((ev) => window.removeEventListener(ev, triggerOnce));
    };
    events.forEach((ev) =>
      window.addEventListener(ev, triggerOnce, { passive: true, once: true }),
    );

    // Fallback idle load after initial paint/TBT window
    window.setTimeout(triggerOnce, 1800);
  });

// Code-split non-critical interactive overlays so initial JS stays minimal
const CommandPalette = lazy(() =>
  import("./components/CommandPalette").then((m) => ({
    default: m.CommandPalette,
  })),
);
const ProjectModal = lazy(() =>
  import("./components/ProjectModal").then((m) => ({
    default: m.ProjectModal,
  })),
);
const ResumeModal = lazy(() =>
  import("./components/ResumeModal").then((m) => ({
    default: m.ResumeModal,
  })),
);

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

function PortfolioShell() {
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLanguage } = useLanguage();
  const activeSection = useActiveSection(SECTION_IDS);
  const { showToast } = useToast();

  const [paletteOpen, setPaletteOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );

  // Open Resume modal automatically if visitor lands on /resume
  useEffect(() => {
    if (window.location.pathname.replace(/\/+$/, "") === "/resume") {
      setResumeOpen(true);
    }
  }, []);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    const email =
      PORTFOLIO_DATA.profile.socials.find((s) => s.id === "email")?.value ??
      "shantiaeslami@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
      showToast(
        lang === "fa"
          ? `ایمیل کپی شد: ${email}`
          : `Copied to clipboard: ${email}`,
        "success",
      );
    } catch {
      showToast(email, "info");
    }
  }, [lang, showToast]);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
    showToast(
      theme === "dark"
        ? lang === "fa"
          ? "حالت روشن فعال شد"
          : "Switched to Light Mode"
        : lang === "fa"
          ? "حالت تاریک فعال شد"
          : "Switched to Obsidian Dark Mode",
      "info",
    );
  }, [lang, showToast, theme, toggleTheme]);

  return (
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 focus:z-50 focus:rounded-lg focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        {lang === "fa" ? "پرش به محتوای اصلی" : "Skip to main content"}
      </a>

      <Navbar
        activeSection={activeSection}
        lang={lang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onToggleLanguage={toggleLanguage}
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      <main id="main-content">
        <HeroSection
          lang={lang}
          onCopyEmail={handleCopyEmail}
          onOpenCommandPalette={() => setPaletteOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <AboutBentoSection
          lang={lang}
          onOpenResume={() => setResumeOpen(true)}
          onCopyEmail={handleCopyEmail}
        />
        <ProjectsSection
          lang={lang}
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <JourneySection lang={lang} />
        <ContactFooterSection
          lang={lang}
          onCopyEmail={handleCopyEmail}
          onOpenCommandPalette={() => setPaletteOpen(true)}
        />
      </main>

      <Suspense fallback={null}>
        {paletteOpen && (
          <CommandPalette
            open={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            lang={lang}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onToggleLanguage={toggleLanguage}
            onCopyEmail={handleCopyEmail}
            onOpenResume={() => setResumeOpen(true)}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            lang={lang}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {resumeOpen && (
          <ResumeModal
            open={resumeOpen}
            lang={lang}
            onToggleLanguage={toggleLanguage}
            onClose={() => setResumeOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
}

export default function App() {
  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <ToastProvider>
          <PortfolioShell />
        </ToastProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
