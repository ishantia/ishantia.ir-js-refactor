import { useCallback, useEffect, useState } from "react";
import type { Language } from "../types/portfolio";

const STORAGE_KEY = "ishantia-lang";

function getInitialLanguage(): Language {
  return "en";
}

export function useLanguage() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const dir = lang === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "fa" || stored === "en") {
        setLang(stored);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors
    }
  }, [lang, dir]);

  const toggleLanguage = useCallback(() => {
    setLang((prev) => (prev === "en" ? "fa" : "en"));
  }, []);

  return { lang, dir, setLang, toggleLanguage };
}
