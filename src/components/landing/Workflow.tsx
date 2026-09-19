"use client";

import { ArrowRight, Gauge, Radio, SlidersHorizontal, Wind } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

/**
 * Section "Dari Sensor ke Keputusan".
 *
 * Komposisi: jalur mendatar 4 langkah dengan panah penghubung (desktop),
 * runtuh ke tumpukan vertikal (mobile). Berbeda dari grid kartu lain (RHYTHM 2).
 *
 * Label langkah = verba + objek, bukan "Tahap 1" (design-taste-frontend 9.F).
 */
export function Workflow() {
  const { t } = useLang();
  const icons = [Radio, SlidersHorizontal, Gauge, Wind];

  return (
    <section id="cara-kerja" className="border-b border-border bg-secondary/30">
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
              <Card interactive className="flex w-full flex-col" variant="tinted">
                <div className="flex items-center justify-between gap-3">
                  <IconTile icon={icons[index % icons.length]} tone="neutral" />
                  <span className="tabular text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </Card>

              {index < t.workflow.steps.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-3 top-1/2 hidden size-4 -translate-y-1/2 text-muted-foreground/40 lg:block"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
