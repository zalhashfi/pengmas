"use client";

import Link from "next/link";
import { Activity, ArrowRight, Check, Gauge, Thermometer, Wind, Wifi } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { buttonClass } from "@/components/ui/button";
import { Hero3D } from "@/components/three/Hero3D";

/**
 * Hero landing: split dua kolom, kolom kanan berisi MODEL 3D di dalam panel
 * berlapis (Dimensional Layering).
 *
 * Komposisinya mengikuti referensi Nexora: visual di kanan duduk di dalam
 * sebuah panel yang mengambang (elevation tinggi), bukan mengapung tanpa
 * penopang. Panel itu memberi konteks pada model 3D sekaligus menampilkan
 * pembacaan contoh, sehingga pengunjung langsung paham apa yang dipantau.
 *
 * Batas yang dipatuhi (anti-slop):
 *   - Maksimum 4 elemen teks di dalam hero: badge, H1, lead, dua tombol.
 *   - Trust badge diletakkan di BARIS BAWAH hero, bukan dijejalkan ke kolom teks.
 *   - Tanpa emoji. Ikon memakai lucide-react.
 *   - Angka di panel contoh ditandai jelas sebagai contoh, bukan pembacaan asli
 *     (R-17 dan R-38: jangan mengarang data yang tampak nyata).
 *   - Tanpa em dash di seluruh teks.
 */
export function Hero() {
  const { t } = useLang();

  const trustItems = [
    { icon: Check, label: t.hero.trustNoLogin },
    { icon: Activity, label: t.hero.trustRealtime },
    { icon: Wifi, label: t.hero.trustIot },
  ];

  // Baris contoh di dalam panel. Nilainya SENGAJA ditulis sebagai contoh dan
  // diberi label di bawah panel. Dashboard yang menampilkan angka sungguhan.
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

  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Latar dekoratif: pencahayaan biru brand opasitas sangat rendah.
          pointer-events-none supaya tidak mengganggu interaksi. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 70% 20%, var(--primary), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Kolom kiri: teks */}
          <div className="flex flex-col items-start">
            <p className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium tracking-wide text-secondary-foreground">
              {t.hero.badge}
              <span className="sr-only"> - {t.hero.badgeFull}</span>
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t.hero.title}
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

          {/* Kolom kanan: panel mengambang berisi model 3D + ringkasan contoh.
              Tinggi eksplisit mencegah layout shift saat kanvas selesai dimuat. */}
          <div className="relative">
            {/* Lapisan belakang: memberi kedalaman, bukan mengapung sendirian. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-6 -bottom-3 top-6 rounded-card border border-border bg-card/60 shadow-e1"
            />

            <div className="relative rounded-card border border-border bg-card shadow-e4">
              {/* Kepala panel */}
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.hero.panelTitle}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.hero.panelSubtitle}</p>
                </div>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-status-good" />
                  {t.hero.panelLive}
                </span>
              </div>

              {/* Model 3D */}
              <div className="h-[220px] w-full sm:h-[260px]">
                <Hero3D />
              </div>

              {/* Ringkasan contoh */}
              <div className="border-t border-border px-5 py-4">
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
                {/* Ditandai jelas sebagai contoh, bukan data sensor asli. */}
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  {t.hero.panelNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust badge di baris bawah hero, bukan di dalam kolom teks. */}
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
