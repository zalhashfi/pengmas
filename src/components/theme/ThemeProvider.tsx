"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const THEME_STORAGE_KEY = "pengmas-theme";

/** Langganan perubahan class `.dark` pada <html>. */
function subscribeToTheme(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function readTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Menyimpan tema (terang/gelap) dan menuliskannya ke class `.dark` pada <html>.
 *
 * Sumber kebenaran adalah DOM, bukan state React. `noFlashScript` di <head>
 * sudah menentukan tema sebelum React hidup, jadi membaca DOM menjamin tidak
 * ada ketidakcocokan dan tidak ada kedipan.
 *
 * Memakai `useSyncExternalStore` (bukan `useState` + `useEffect`) supaya React
 * membaca nilai terkini saat hidrasi tanpa cascading render.
 *
 * Catatan: tema TIDAK mengikuti `prefers-color-scheme`. DESIGN.md §6 menetapkan
 * mode terang sebagai default demi keterbacaan proyektor kelas pada siang hari.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribeToTheme, readTheme, () => "light" as Theme);

  const toggleTheme = useCallback(() => {
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage bisa diblokir; tema tetap berganti untuk sesi ini.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme harus dipakai di dalam <ThemeProvider>.");
  }
  return ctx;
}
