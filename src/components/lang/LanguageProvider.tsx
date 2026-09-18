"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import { DEFAULT_LANG, LANG_STORAGE_KEY, STRINGS, type Lang } from "@/config/strings";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  /** Kamus bahasa yang sedang aktif. Semua komponen membaca teks dari sini. */
  t: (typeof STRINGS)[Lang];
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

/** Langganan perubahan atribut `lang` pada <html>. */
function subscribeToLang(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"],
  });
  return () => observer.disconnect();
}

function readLang(): Lang {
  return document.documentElement.lang === "id" ? "id" : "en";
}

/**
 * Menyimpan pilihan bahasa dan menyediakan kamus aktif lewat `t`.
 *
 * Sumber kebenaran adalah atribut `lang` pada <html>, yang sudah diatur oleh
 * `noFlashScript`. Membacanya lewat `useSyncExternalStore` membuat React selalu
 * sepakat dengan apa yang sudah tampil, tanpa cascading render.
 *
 * Tidak memakai routing locale (`/[locale]/`) karena static export melarang
 * middleware dan rewrites. Lihat AGENTS.md.
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribeToLang, readLang, () => DEFAULT_LANG);

  const setLang = useCallback((next: Lang) => {
    document.documentElement.lang = next;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // localStorage bisa diblokir; bahasa tetap berganti untuk sesi ini.
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang(readLang() === "id" ? "en" : "id");
  }, [setLang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: STRINGS[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang harus dipakai di dalam <LanguageProvider>.");
  }
  return ctx;
}
