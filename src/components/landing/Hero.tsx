"use client";

import Link from "next/link";
import { Activity, ArrowRight, Check, Gauge, Thermometer, Wind, Wifi } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { buttonClass } from "@/components/ui/button";
import { Hero3D } from "@/components/three/Hero3D";

/**
 * Hero landing: split dua kolom.
 *
 *   - Kolom kiri: identitas lembaga, H1 (satu kata di-accent), lead, dua tombol.
 *   - Kolom kanan: panel berisi model 3D dan ringkasan contoh, dengan satu
 *     lapisan bayangan di belakangnya agar terasa terapung.
 *
 * Latar hero memakai mesh gradient tiga-titik warna brand (`.mesh-bg`),
 * bukan gradien AI-ungu.
 *
 * Batas yang dipatuhi:
 *   - Maksimum 4 elemen teks di dalam hero.
 *   - Tanpa emoji. Ikon memakai lucide-react.
 *   - Angka di panel ditandai jelas sebagai contoh (R-17, R-38), dan setiap
 *     pembacaan hanya muncul SEKALI di halaman.
 *   - Tanpa em dash.
 *   - Blur dipakai navbar saja, karena R-10 membatasi maksimum 1-2 elemen.
 *     Panel hero memakai elevasi bertingkat, bukan kaca.
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
            {/* Identitas lembaga, bukan badge hias.
                Sebelumnya ini sebuah pill dengan border tipis DAN dot hijau di
                atas H1. Itu melanggar tiga aturan sekaligus: badge eyebrow di
                atas headline (R-09), dot status yang tidak menandai state
                apa pun (R-31), dan kombinasi penuh pill + border + dot.
                Dot hijau juga menyerobot warna status kualitas udara yang
                DESIGN.md §3 khususkan untuk udara, bukan ornamen.
                Sekarang hanya nama lembaga sebagai baris teks biasa. */}
            <p className="text-xs font-semibold tracking-wide text-primary">
              {t.hero.badge}
            </p>
            <p className="mt-1.5 text-[11px] text-muted-foreground">{t.hero.badgeFull}</p>

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

          {/* Kolom kanan: panel berlapis.
              Satu panel utama dengan satu lapisan bayangan di belakangnya,
              memberi kesan terapung tanpa menambah elemen yang tidak membawa
              informasi baru.

              Catatan revisi: dua snippet mengambang (sparkline statis dan
              badge CO2) DIHAPUS. Alasan yang ditulis:
                - Sparkline: 7 bar tanpa sumbu, tanpa label, tanpa satuan,
                  jadi tidak menjawab pertanyaan apa pun.
                - Badge CO2 742 ppm: angka yang SAMA sudah tampil di daftar
                  contoh panel utama, jadi ia mengulang data yang sama. */}
          <div className="relative">
            {/* Lapisan bayangan di belakang, memberi kesan panel terapung. */}
            <div
              aria-hidden="true"
              className="absolute inset-x-8 -bottom-4 top-10 rounded-card border border-border bg-card/50 shadow-e1"
            />

            {/* Panel utama. Permukaan solid: kuota blur R-10 (maks 1-2 elemen)
                sudah dipakai navbar. */}
            <div className="relative z-10 rounded-card border border-border bg-card shadow-e4">
              {/* Kepala panel */}
              <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{t.hero.panelTitle}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.hero.panelSubtitle}</p>
                </div>
                {/* Label "Contoh", bukan penanda "LIVE". Halaman ini tidak
                    mengambil data sensor, jadi status live akan menyesatkan. */}
                <span className="shrink-0 rounded-full border border-border bg-background/50 px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted-foreground">
                  {t.hero.panelSample}
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
                <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                  {t.hero.panelNote} {t.hero.panelNoteWhere}
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
