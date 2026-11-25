import React, { useState } from "react";
import {
  ArrowUp,
  Check,
  Command,
  Copy,
  Mail,
  Phone,
  Send,
} from "lucide-react";
import type { Language } from "../types/portfolio";
import { PORTFOLIO_DATA } from "../data/portfolio";
import { SpotlightCard } from "../components/SpotlightCard";
import { MagneticButton } from "../components/MagneticButton";
import { GitHubIcon, TelegramIcon } from "../components/BrandIcons";
import { useToast } from "../components/ToastProvider";

interface ContactFooterSectionProps {
  lang: Language;
  onCopyEmail: () => void;
  onOpenCommandPalette: () => void;
}

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FIELDS: FormFields = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export function ContactFooterSection({
  lang,
  onCopyEmail,
  onOpenCommandPalette,
}: ContactFooterSectionProps) {
  const { showToast } = useToast();
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [copied, setCopied] = useState(false);

  const { profile } = PORTFOLIO_DATA;
  const email = profile.socials.find((s) => s.id === "email")?.value ?? "";
  const phone = profile.socials.find((s) => s.id === "phone");

  const handleCopy = () => {
    onCopyEmail();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
      showToast(
        lang === "fa"
          ? "لطفاً تمام فیلدهای ضروری را تکمیل کنید."
          : "Please fill in all required fields.",
        "error",
      );
      return;
    }

    setStatus("sending");
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch(profile.formspreeAction, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setFields(INITIAL_FIELDS);
      showToast(
        lang === "fa"
          ? "پیام شما با موفقیت ارسال شد!"
          : "Message sent! I will get back to you soon.",
        "success",
      );
    } catch {
      setStatus("error");
      showToast(
        lang === "fa"
          ? "ارسال با خطا مواجه شد. لطفاً از ایمیل یا تلگرام استفاده کنید."
          : "Could not send form. Please use direct email or Telegram.",
        "error",
      );
    }
  };

  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(
    fields.subject || "Portfolio Inquiry",
  )}&body=${encodeURIComponent(fields.message)}`;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section
        id="contact"
        className="border-t border-[var(--border-subtle)] py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <div className="font-mono text-xs font-semibold tracking-widest text-[var(--accent-soft)] uppercase">
              {lang === "fa" ? "ارتباط" : "Contact"}
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
              {lang === "fa"
                ? "ایده، پروژه یا همکاری دارید؟"
                : "Have an idea, project, or collaboration?"}
            </h2>
            <p className="mt-3 text-sm text-[var(--text-secondary)] sm:text-base">
              {lang === "fa"
                ? "چه برای گفتگو درباره ابزارهای نرم‌افزاری و هوش مصنوعی و چه برای یک سلام ساده — همیشه در دسترس هستم."
                : "Whether you want to discuss a software tool, an AI pipeline, or simply say hello — my inbox is always open."}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-12">
            {/* Direct Channels */}
            <SpotlightCard className="p-6 lg:col-span-5">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {lang === "fa" ? "راه‌های ارتباط مستقیم" : "Direct Channels"}
              </h3>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {lang === "fa"
                  ? "کپی تک‌کلیکی ایمیل یا پیام در شبکه‌ها"
                  : "One-click email copy or direct social channels"}
              </p>

              {/* Email box */}
              <div className="mt-6 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-base)] p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium text-[var(--text-muted)]">
                      {lang === "fa" ? "ایمیل" : "Email"}
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="mt-0.5 block truncate font-mono text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--accent-soft)] sm:text-sm"
                    >
                      {email}
                    </a>
                  </div>

                  <MagneticButton
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
                  >
                    {copied ? (
                      <Check className="h-3.5 w-3.5 text-[var(--text-success)]" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    <span>
                      {copied
                        ? lang === "fa"
                          ? "کپی شد"
                          : "Copied"
                        : lang === "fa"
                          ? "کپی"
                          : "Copy"}
                    </span>
                  </MagneticButton>
                </div>
              </div>

              <div className="mt-4 space-y-2.5">
                <a
                  href="https://t.me/ishantia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-4 py-3 text-sm transition-colors hover:border-[var(--border-strong)]"
                >
                  <span className="inline-flex items-center gap-3">
                    <TelegramIcon className="h-4 w-4 text-[var(--accent-soft)]" />
                    <span className="font-medium text-[var(--text-primary)]">
                      Telegram
                    </span>
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    @ishantia
                  </span>
                </a>

                <a
                  href="https://github.com/ishantia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-4 py-3 text-sm transition-colors hover:border-[var(--border-strong)]"
                >
                  <span className="inline-flex items-center gap-3">
                    <GitHubIcon className="h-4 w-4 text-[var(--text-primary)]" />
                    <span className="font-medium text-[var(--text-primary)]">
                      GitHub
                    </span>
                  </span>
                  <span className="font-mono text-xs text-[var(--text-muted)]">
                    github.com/ishantia
                  </span>
                </a>

                {phone && (
                  <a
                    href={phone.href}
                    className="flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 px-4 py-3 text-sm transition-colors hover:border-[var(--border-strong)]"
                  >
                    <span className="inline-flex items-center gap-3">
                      <Phone className="h-4 w-4 text-[var(--text-success)]" />
                      <span className="font-medium text-[var(--text-primary)]">
                        {lang === "fa" ? "تماس" : "Phone"}
                      </span>
                    </span>
                    <span
                      dir="ltr"
                      className="font-mono text-xs text-[var(--text-muted)]"
                    >
                      {phone.value}
                    </span>
                  </a>
                )}
              </div>
            </SpotlightCard>

            {/* Contact Form */}
            <SpotlightCard className="p-6 lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {lang === "fa" ? "نام شما" : "Your Name"}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder={
                        lang === "fa" ? "مثلاً علی رضایی" : "Jane Doe"
                      }
                      className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                    >
                      {lang === "fa" ? "ایمیل شما" : "Your Email"}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {lang === "fa" ? "موضوع" : "Subject"}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    required
                    value={fields.subject}
                    onChange={handleChange}
                    placeholder={
                      lang === "fa"
                        ? "همکاری در پروژه یا سوال فنی"
                        : "Project collaboration or inquiry"
                    }
                    className="w-full rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-xs font-medium text-[var(--text-secondary)]"
                  >
                    {lang === "fa" ? "پیام شما" : "Message"}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    value={fields.message}
                    onChange={handleChange}
                    placeholder={
                      lang === "fa"
                        ? "پیام خود را بنویسید..."
                        : "Tell me about your project or idea..."
                    }
                    className="w-full resize-y rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-base)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent)] focus:outline-none"
                  />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>
                      {lang === "fa"
                        ? "ارسال با اپلیکیشن ایمیل"
                        : "Or open in email client"}
                    </span>
                  </a>

                  <MagneticButton
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" />
                    <span>
                      {status === "sending"
                        ? lang === "fa"
                          ? "در حال ارسال..."
                          : "Sending..."
                        : lang === "fa"
                          ? "ارسال پیام"
                          : "Send Message"}
                    </span>
                  </MagneticButton>
                </div>
              </form>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]/40 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--border-strong)] bg-[var(--bg-elevated)] font-mono text-[11px] font-bold text-[var(--text-primary)]">
              {profile.mark}
            </span>
            <span className="text-xs text-[var(--text-secondary)]">
              &copy; {new Date().getFullYear()} {profile.name[lang]} ·{" "}
              {profile.domain}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenCommandPalette}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 font-mono text-[11px] text-[var(--text-muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <Command className="h-3 w-3" />
            <span>
              {lang === "fa"
                ? "برای ناوبری ⌘K را بزنید"
                : "Press ⌘K to navigate"}
            </span>
          </button>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={lang === "fa" ? "بازگشت به بالا" : "Back to top"}
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text-primary)]"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            <span>{lang === "fa" ? "بالا" : "Top"}</span>
          </button>
        </div>
      </footer>
    </>
  );
}
