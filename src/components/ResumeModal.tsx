import { useEffect } from "react";
import { AnimatePresence, m } from "framer-motion";
import { Mail, MapPin, Phone, Printer, X } from "lucide-react";
import type { Language } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { GitHubIcon, TelegramIcon } from "./BrandIcons";

interface ResumeModalProps {
  open: boolean;
  lang: Language;
  onToggleLanguage: () => void;
  onClose: () => void;
}

export function ResumeModal({
  open,
  lang,
  onToggleLanguage,
  onClose,
}: ResumeModalProps) {
  const { profile, journey, skills, spokenLanguages } = PORTFOLIO_DATA;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const email = profile.socials.find((s) => s.id === "email");
  const phone = profile.socials.find((s) => s.id === "phone");
  const telegram = profile.socials.find((s) => s.id === "telegram");
  const github = profile.socials.find((s) => s.id === "github");

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={lang === "fa" ? "رزومه شنتیا اسلامی" : "Resume of Shantia Eslami"}
        >
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="no-print fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <m.div
            id="printable-resume"
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[var(--border-strong)] bg-[var(--bg-surface)] p-6 shadow-2xl sm:p-8"
          >
            {/* Toolbar */}
            <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
              <span className="font-mono text-xs text-[var(--text-muted)]">
                ishantia.ir/cv
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onToggleLanguage}
                  className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--border-strong)]"
                >
                  {lang === "fa" ? "English" : "فارسی"}
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3 py-1.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{lang === "fa" ? "چاپ / ذخیره PDF" : "Print / Save PDF"}</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close resume"
                  className="rounded-lg border border-[var(--border-subtle)] p-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="border-b border-[var(--border-subtle)] pb-6">
              <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {profile.name[lang]}
              </h2>
              <p className="mt-1 text-sm font-medium text-[var(--accent-soft)]">
                {profile.role[lang]}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--text-secondary)]">
                {email && (
                  <a href={email.href} className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)]">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{email.value}</span>
                  </a>
                )}
                {phone && (
                  <a href={phone.href} dir="ltr" className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)]">
                    <Phone className="h-3.5 w-3.5" />
                    <span>{phone.value}</span>
                  </a>
                )}
                {telegram && (
                  <a href={telegram.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)]">
                    <TelegramIcon className="h-3.5 w-3.5" />
                    <span>{telegram.value}</span>
                  </a>
                )}
                {github && (
                  <a href={github.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-[var(--text-primary)]">
                    <GitHubIcon className="h-3.5 w-3.5" />
                    <span>{github.value}</span>
                  </a>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{profile.location[lang]}</span>
                </span>
              </div>
            </div>

            {/* Personal Details */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-3">
                <div className="text-[11px] text-[var(--text-muted)]">
                  {lang === "fa" ? "تاریخ تولد" : "Born"}
                </div>
                <div className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                  {profile.born[lang]}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-3">
                <div className="text-[11px] text-[var(--text-muted)]">
                  {lang === "fa" ? "وضعیت تاهل" : "Marital Status"}
                </div>
                <div className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                  {profile.maritalStatus[lang]}
                </div>
              </div>
              <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 p-3">
                <div className="text-[11px] text-[var(--text-muted)]">
                  {lang === "fa" ? "وضعیت نظام وظیفه" : "Military Service"}
                </div>
                <div className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">
                  {profile.militaryStatus[lang]}
                </div>
              </div>
            </div>

            {/* Experience & Education */}
            <div className="mt-6 space-y-5">
              <h3 className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                {lang === "fa" ? "سوابق کاری و تحصیلی" : "Experience & Education"}
              </h3>
              {journey.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/40 p-4"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-semibold text-[var(--text-primary)]">
                      {item.title[lang]} —{" "}
                      <span className="text-[var(--accent-soft)]">
                        {item.org[lang]}
                      </span>
                    </h4>
                    <span className="font-mono text-xs text-[var(--text-muted)]">
                      {item.period[lang]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.summary[lang]}
                  </p>
                  <ul className="mt-2 space-y-1 text-xs text-[var(--text-secondary)]">
                    {item.highlights.map((hl, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--accent-soft)]">•</span>
                        <span>{hl[lang]}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Skills & Languages */}
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                  {lang === "fa" ? "مهارت‌های فنی" : "Technical Skills"}
                </h3>
                <div className="space-y-2.5">
                  {skills.map((skill) => (
                    <div key={skill.id}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium text-[var(--text-primary)]">
                          {skill.name[lang]}
                        </span>
                        <span className="font-mono text-[var(--text-muted)]">
                          {skill.value}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent)]"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
                  {lang === "fa" ? "زبان‌ها" : "Languages"}
                </h3>
                <div className="space-y-2.5">
                  {spokenLanguages.map((item) => (
                    <div key={item.name.en}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-medium text-[var(--text-primary)]">
                          {item.name[lang]} ({item.level[lang]})
                        </span>
                        <span className="font-mono text-[var(--text-muted)]">
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-[var(--bg-elevated)]">
                        <div
                          className="h-full rounded-full bg-[var(--accent-soft)]"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
