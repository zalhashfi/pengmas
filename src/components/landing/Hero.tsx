"use client";

import Link from "next/link";
import { Activity, ArrowRight, Check, Gauge, Thermometer, Wind, Wifi } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { buttonClass } from "@/components/ui/button";
import { Hero3D } from "@/components/three/Hero3D";

/**
 * Hero landing: split dua kolom dengan panel kaca berlapis.
 *
 * Komposisinya mengikuti referensi Nexora dengan ketat:
 *   - Kolom kiri: badge, H1 (dengan satu kata di-accent), lead, dua tombol,
 *     dan trust badge di baris terpisah.
 *   - Kolom kanan: MODEL 3D duduk di dalam PANEL KACA utama (glass-panel),
 *     dengan SATU snippet kaca mengambang di belakangnya (glass-snippet)
 *     yang menampilkan mini-ringkasan, sehingga kolom kanan terasa berlapis
 *     dan hidup, bukan satu kotak polos.
 *
 * Latar hero memakai mesh gradient tiga-titik warna brand (`.mesh-bg`),
 * BUKAN gradien AI-ungu. Karena ini dekoratif, ia tidak melanggar R-29.
 *
 * Batas yang dipatuhi (anti-slop):
 *   - Maksimum 4 elemen teks di dalam hero.
 *   - Tanpa emoji. Ikon memakai lucide-react.
 *   - Angka di panel ditandai jelas sebagai contoh (R-17, R-38).
 *   - Tanpa em dash.
 *   - Glassmorphism dibatasi 2 elemen (panel + snippet), bukan di semua tempat
 *     (R-10: maks 1-2 elemen glass simultan).
 */
export function Hero() {
  const { t } = useLang();

  const trustItems = [
    { icon: Check, label: t.hero.trustNoLogin },
    { icon: Activity, label: t.hero.trustRealtime },
    { icon: Wifi, label: t.hero.trustIot },
  ];

  // Baris contoh di panel. Ditandai jelas sebagai contoh.
  const sampleRows = [
    { icon: Wind, label: t.metrics.co2.name, value: "742", unit: t.metrics.co2.unit, tone: "good" },
    { icon: Thermometer, label: t.metrics.temperature.name, value: "27.4", unit: t.metrics.temperature.unit, tone: "good" },
    { icon: Gauge, label: t.metrics.pm25.name, value: "18", unit: t.metrics.pm25.unit, tone: "good" },
  ];

  const toneClass: Record<string, string> = {
    good: "bg-status-good",
    moderate: "bg-status-moderate",
    unhealthy: "bg-status-unhealthy",
  };

  // Pecah judul agar satu kata di-accent warna brand, seperti Nexora
  // ("for Modern Teams"). Kata accent = kata terakhir.
  const titleWords = t.hero.title.split(" ");
  const accentWord = titleWords.pop();
  const titleLead = titleWords.join(" ");

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Latar: mesh gradient tiga-titik. pointer-events-none wajib. */}
      <div aria-hidden="true" className="mesh-bg pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-4 pb-14 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Kolom kiri: teks */}
          <div className="flex flex-col items-start">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-glass-border bg-glass/60 px-3 py-1 text-[11px] font-medium tracking-wide text-secondary-foreground backdrop-blur-sm">
              <span aria-hidden="true" className="size-1.5 rounded-full bg-status-good" />
              {t.hero.badge}
              <span className="sr-only"> - {t.hero.badgeFull}</span>
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {titleLead}{" "}
              <span className="text-primary">{accentWord}</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.hero.lead}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/dashboard/" className={buttonClass("primary", "lg")}>
                {t.hero.ctaPrimary}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href="#metrik" className={buttonClass("outline", "lg")}>
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Kolom kanan: panel kaca berlapis dengan model 3D + snippet mengambang. */}
          <div className="relative">
            {/* Snippet mengambang di belakang panel utama: memberi kedalaman. */}
            <div
              aria-hidden="true"
              className="glass-snippet absolute -right-2 -top-4 hidden h-28 w-40 rounded-card sm:block"
            >
              <div className="flex h-full flex-col gap-2 p-3">
                <div className="flex items-center justify-between">
                  <span className="tabular text-[10px] text-muted-foreground">
                    {t.hero.panelSubtitle}
                  </span>
                  <span className="flex items-center gap-1 text-[9px] font-medium text-status-good">
                    <span className="size-1.5 animate-pulse rounded-full bg-status-good" />
                    {t.hero.panelLive}
                  </span>
                </div>
                {/* Mini sparkline dekoratif: 7 bar statis, bukan data nyata. */}
                <div className="flex flex-1 items-end gap-1">
                  {[40, 65, 50, 80, 55, 70, 60].map((h, i) => (
                    <span
                      key={i}
                      className="flex-1 rounded-sm bg-primary/30"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Panel kaca utama. */}
            <div className="glass-panel relative rounded-card">
              {/* Kepala panel */}
              <div className="flex items-center justify-between gap-3 border-b border-glass-border px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.hero.panelTitle}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.hero.panelSubtitle}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-glass-border bg-background/50 px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                  <span aria-hidden="true" className="size-1.5 animate-pulse rounded-full bg-status-good" />
                  {t.hero.panelLive}
                </span>
              </div>

              {/* Model 3D */}
              <div className="h-[220px] w-full sm:h-[260px]">
                <Hero3D />
              </div>

              {/* Ringkasan contoh */}
              <div className="border-t border-glass-border px-5 py-4">
                <ul className="flex flex-col gap-2.5">
                  {sampleRows.map((row) => (
                    <li key={row.label} className="flex items-center gap-3">
                      <row.icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
                      <span className="flex-1 text-xs text-muted-foreground">{row.label}</span>
                      <span className="tabular text-sm font-semibold">{row.value}</span>
                      <span className="w-14 text-right text-[11px] text-muted-foreground">{row.unit}</span>
                      <span
                        aria-hidden="true"
                        className={`size-2 shrink-0 rounded-full ${toneClass[row.tone]}`}
                      />
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  {t.hero.panelNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badge di baris bawah hero, di luar kolom teks. */}
        <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
          {trustItems.map((item) => (
            <li key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <item.icon className="size-4 text-primary" aria-hidden="true" />
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
