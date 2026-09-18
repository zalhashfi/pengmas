"use client";

import Link from "next/link";
import { ArrowRight, FlaskConical, MonitorCheck, School } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";
import { buttonClass } from "@/components/ui/button";

/**
 * Section dampak.
 *
 * Komposisi dibedakan lagi (RHYTHM 2): bukan grid kartu sejajar, melainkan
 * daftar bertumpuk dengan ikon di kiri dan teks di kanan. Section ini juga
 * diakhiri CTA ke dashboard, sehingga berperan ganda sebagai section penutup
 * sebelum footer (mengikuti pola "Hero + Features + CTA" dari ui-ux-pro-max).
 */
export function Impact() {
  const { t } = useLang();
  const icons = [MonitorCheck, FlaskConical, School];

  return (
    <section id="dampak" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {t.impact.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t.impact.lead}
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {t.impact.points.map((point, index) => (
            <Card
              key={point.title}
              interactive
              className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6"
            >
              <div className="flex flex-1 items-start gap-5">
                <IconTile icon={icons[index % icons.length]} />
                <div>
                  <h3 className="text-base font-semibold">{point.title}</h3>
                  <p className="mt-2 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">
                    {point.body}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA penutup. */}
        <div className="mt-12 flex flex-col items-start gap-4 rounded-card border border-border bg-card p-8 shadow-e2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">{t.hero.ctaPrimary}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t.hero.lead}</p>
          </div>
          <Link href="/dashboard/" className={buttonClass("primary", "lg", "shrink-0")}>
            {t.hero.ctaPrimary}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
