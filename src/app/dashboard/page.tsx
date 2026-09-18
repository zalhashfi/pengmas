"use client";

import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";
import { buttonClass } from "@/components/ui/button";

/**
 * Halaman placeholder dashboard.
 *
 * Dashboard sebenarnya ada di rilis berikutnya. Halaman ini sengaja dibuat
 * supaya tombol "Buka Dashboard" di navbar dan hero TIDAK menjadi tautan mati
 * (antislop R-24 dan R-26). Isinya jujur menyatakan statusnya, bukan dashboard
 * palsu atau pesan "segera hadir" yang menggantung.
 */
export default function DashboardPage() {
  const { t } = useLang();

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-24 sm:px-6">
      <div className="flex max-w-md flex-col items-center gap-5 text-center">
        <span
          aria-hidden="true"
          className="grid size-12 place-items-center rounded-xl border border-border bg-secondary"
        >
          <Construction className="size-5 text-muted-foreground" />
        </span>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t.dashboard.title}
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {t.dashboard.body}
        </p>

        <Link href="/" className={buttonClass("outline", "md", "mt-2")}>
          <ArrowLeft className="size-4" aria-hidden="true" />
          {t.dashboard.backHome}
        </Link>
      </div>
    </main>
  );
}
