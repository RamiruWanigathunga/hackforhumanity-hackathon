"use client";

import React, { createContext, useContext, useSyncExternalStore } from "react";
import { Language, Translations, translations } from "@/lib/i18n";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: translations.en,
});

const listeners = new Set<() => void>();

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("helpdesk_lang") as Language | null;
    if (stored === "en" || stored === "si" || stored === "ta") return stored;
    const cookieMatch = document.cookie.match(/(?:^|; )helpdesk_lang=([^;]*)/);
    if (cookieMatch) {
      const cookieLang = decodeURIComponent(cookieMatch[1]) as Language;
      if (cookieLang === "en" || cookieLang === "si" || cookieLang === "ta") return cookieLang;
    }
  } catch {
    // Ignore storage/cookie access errors
  }
  return "en";
}

let cachedLanguage: Language = typeof window !== "undefined" ? getStoredLanguage() : "en";

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Language {
  return cachedLanguage;
}

function getServerSnapshot(): Language {
  return "en";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLanguage = (lang: Language) => {
    cachedLanguage = lang;
    try {
      localStorage.setItem("helpdesk_lang", lang);
      document.cookie = `helpdesk_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = lang;
    } catch {
      // Ignore storage errors
    }
    listeners.forEach((listener) => listener());
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
