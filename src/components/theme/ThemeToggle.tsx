"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useLang } from "@/components/lang/LanguageProvider";
import { Button } from "@/components/ui/button";

/**
 * Tombol ganti tema terang/gelap.
 *
 * Memakai satu tombol (bukan dropdown) karena hanya ada dua keadaan. Label
 * `aria-label` berubah mengikuti aksi yang AKAN terjadi, dan ikon memakai
 * `aria-hidden` supaya pembaca layar tidak membaca ikon.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLang();
  const isDark = theme === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={isDark ? t.theme.toLight : t.theme.toDark}
      className="size-9 px-0"
    >
      {isDark ? (
        <Sun className="size-4" aria-hidden="true" />
      ) : (
        <Moon className="size-4" aria-hidden="true" />
      )}
    </Button>
  );
}
