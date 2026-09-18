"use client";

import { Droplets, Thermometer, Waves, Wind } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

/**
 * Section metrik: empat besaran yang diukur.
 *
 * Komposisi dibedakan dari section lain (RHYTHM 2, R-05):
 *   - Header: SPLIT dua kolom (kiri judul + lead, kanan legenda ambang)
 *     sehingga pembaca langsung melihat konteks warna sebelum kartu.
 *   - Kartu: grid 4 kolom, masing-masing dengan ikon kotak, judul, satuan
 *     besar sebagai jangkar, dan deskripsi. Hover lift + shadow naik.
 *
 * Bahasa visual mengikuti kartu referensi Nexora (rounded 12px, shadow halus,
 * ikon kotak berwarna), tetapi grid 4-kolom tidak identik persis karena tiap
 * kartu memuat satuan yang berbeda ukuran visual.
 */
export function Metrics() {
  const { t } = useLang();

  const metrics = [
    { icon: Wind, ...t.metrics.co2 },
    { icon: Thermometer, ...t.metrics.temperature },
    { icon: Droplets, ...t.metrics.humidity },
    { icon: Waves, ...t.metrics.pm25 },
  ];

  const levels = [
    { className: "bg-status-good", label: t.metrics.levelGood },
    { className: "bg-status-moderate", label: t.metrics.levelModerate },
    { className: "bg-status-unhealthy", label: t.metrics.levelUnhealthy },
  ];

  return (
    <section id="metrik" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        {/* Header: split dua kolom, bukan tumpukan tengah. */}
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              {t.metrics.title}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              {t.metrics.lead}
            </p>
          </div>
          {/* Legenda ambang sebagai komponen berdiri sendiri di header,
              bukan terkubur di bawah. */}
          <div className="rounded-card border border-border bg-secondary/50 px-4 py-3">
            <p className="mb-2 text-xs font-medium">{t.metrics.thresholdsTitle}</p>
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {levels.map((level) => (
                <li key={level.label} className="flex items-center gap-1.5 text-[11px]">
                  <span aria-hidden="true" className={`size-2 rounded-full ${level.className}`} />
                  {level.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Grid kartu metrik. */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.name} interactive className="flex flex-col">
              <IconTile icon={metric.icon} />
              <h3 className="mt-5 text-base font-semibold">{metric.name}</h3>
              <p className="tabular mt-1 text-2xl font-semibold text-muted-foreground/80">
                {metric.unit}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </Card>
          ))}
        </div>

        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          {t.metrics.thresholdsNote}
        </p>
      </div>
    </section>
  );
}
