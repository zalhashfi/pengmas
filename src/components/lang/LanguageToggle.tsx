"use client";

import { Languages } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Button } from "@/components/ui/button";

/**
 * Tombol ganti bahasa Indonesia/Inggris.
 *
 * Label menunjukkan bahasa yang SEDANG AKTIF, bukan bahasa tujuan:
 *   "ID" = halaman sekarang berbahasa Indonesia
 *   "EN" = halaman sekarang berbahasa Inggris
 * Jadi label bisa dibaca sebagai penanda keadaan, bukan janji aksi. Ini juga
 * menghindari kebingungan klasik ketika pengguna menebak apakah label berarti
 * "bahasa sekarang" atau "bahasa setelah diklik".
 *
 * `aria-label` tetap menyebut aksi yang AKAN terjadi, karena pembaca layar
 * perlu tahu apa yang berubah saat tombol ditekan. Kode bahasa (ID/EN) adalah
 * singkatan standar, jadi tidak diterjemahkan.
 */
export function LanguageToggle() {
  const { lang, toggleLang, t } = useLang();
  const active = lang === "id" ? "ID" : "EN";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLang}
      aria-label={t.meta.switchTo}
      className="h-9 gap-1.5 px-1.5 sm:px-2"
    >
      <Languages className="size-4" aria-hidden="true" />
      <span className="tabular text-xs font-medium">{active}</span>
    </Button>
  );
}
