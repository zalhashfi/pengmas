"use client";

import { FlaskConical, MonitorCheck, School } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

/**
 * Section dampak.
 *
 * Komposisi sengaja dibedakan lagi (konsekuensi RHYTHM 2): bukan grid kartu
 * sejajar seperti section Metrics, melainkan daftar bertumpuk dengan teks di
 * kiri dan ikon di kanan, sehingga ritme halaman terus berubah saat digulir.
 */
export function Impact() {
  const { t } = useLang();
  const icons = [MonitorCheck, FlaskConical, School];

  return (
    <section id="dampak" className="border-b border-border bg-secondary/40">
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
      </div>
    </section>
  );
}
