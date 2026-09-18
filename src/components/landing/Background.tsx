"use client";

import { BookOpen, Layers, Target } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { Card } from "@/components/ui/card";
import { IconTile } from "@/components/ui/icon-tile";

/**
 * Section Latar Belakang Pengmas.
 *
 * Grid kartu mengikuti pola features Nexora, tetapi ASIMETRIS (R-14):
 * kartu pertama span 2 kolom dan memuat paragraf lebih panjang, dua berikutnya
 * satu kolom. Hierarki terlihat, bukan tiga kartu seragam.
 */
export function Background() {
  const { t } = useLang();
  const icons = [BookOpen, Target, Layers];

  return (
    <section id="latar-belakang" className="border-b border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24">
        <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
          {t.background.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t.background.lead}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t.background.blocks.map((block, index) => (
            <Card
              key={block.title}
              interactive
              variant={index === 0 ? "tinted" : "solid"}
              className={index === 0 ? "lg:col-span-2" : undefined}
            >
              <IconTile icon={icons[index % icons.length]} />
              <h3 className="mt-5 text-lg font-semibold">{block.title}</h3>
              <p className="mt-2.5 max-w-[60ch] text-sm leading-relaxed text-muted-foreground">
                {block.body}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
