"use client";

import { ArrowRight, Gauge, Radio, SlidersHorizontal, Wind } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

/**
 * Section "Dari Sensor ke Keputusan".
 *
 * Ditambahkan pada revisi ini. Ini mengisi celah yang ada di referensi Nexora:
 * halaman perlu satu section yang menjelaskan MEKANISME, bukan manfaat.
 *
 * Komposisinya sengaja dibuat berbeda dari section kartu lain (konsekuensi
 * RHYTHM 2, anti-slop R-05): bukan grid kartu, melainkan satu jalur mendatar
 * dengan panah penghubung di desktop yang runtuh menjadi tumpukan vertikal di
 * mobile. Jadi tidak ada dua section yang memakai keluarga layout sama.
 *
 * Label langkah memakai VERBA + OBJEK ("Sensor membaca"), bukan "Tahap 1",
 * karena label tahap generik dilarang (design-taste-frontend bagian 9.F).
 */
export function Workflow() {
  const { t } = useLang();
  const icons = [Radio, SlidersHorizontal, Gauge, Wind];

  return (
    <section id="cara-kerja" className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {t.workflow.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t.workflow.lead}
        </p>

        <ol className="mt-12 grid gap-4 lg:grid-cols-4 lg:gap-3">
          {t.workflow.steps.map((step, index) => (
            <li key={step.title} className="relative flex">
              <Card className="flex w-full flex-col" elevation={1}>
                <div className="flex items-center justify-between gap-3">
                  <IconTile icon={icons[index % icons.length]} tone="neutral" />
                  <span className="tabular text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Card>

              {/* Panah penghubung hanya di desktop, tempat keempat langkah
                  memang terbaca sebagai satu jalur mendatar. */}
              {index < t.workflow.steps.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground/50 lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
