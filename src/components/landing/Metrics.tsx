"use client";

import { Droplets, Thermometer, Waves, Wind } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

/**
 * Section metrik: empat besaran yang diukur.
 *
 * Ini bagian statis yang menjelaskan APA yang diukur, bukan angka live.
 * Angka live ada di dashboard.
 *
 * Bahasa visual mengikuti kartu referensi Nexora: kotak ikon berwarna, judul,
 * deskripsi singkat, dan elevasi halus. Di mobile dua kolom, di desktop empat.
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
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {t.metrics.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t.metrics.lead}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.name} interactive className="flex flex-col">
              <IconTile icon={metric.icon} />
              <h3 className="mt-5 text-base font-semibold">{metric.name}</h3>
              {/* Satuan sebagai jangkar visual. Tidak ada angka karangan di sini;
                  nilai sesungguhnya hanya muncul di dashboard. */}
              <p className="tabular mt-1 text-xl font-semibold text-muted-foreground">
                {metric.unit}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {metric.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Legenda ambang. Satu-satunya tempat warna semantik dipakai di landing,
            dan di sini warnanya memang berarti status kualitas udara
            (DESIGN.md bagian 3). */}
        <div className="mt-8 flex flex-col gap-4 rounded-card border border-border bg-secondary/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">{t.metrics.thresholdsTitle}</p>
            <p className="mt-1 max-w-2xl text-xs leading-relaxed text-muted-foreground">
              {t.metrics.thresholdsNote}
            </p>
          </div>
          <ul className="flex shrink-0 flex-wrap items-center gap-x-5 gap-y-2">
            {levels.map((level) => (
              <li key={level.label} className="flex items-center gap-2 text-xs">
                <span
                  aria-hidden="true"
                  className={`size-2.5 rounded-full ${level.className}`}
                />
                {level.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
