"use client";

import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/components/lang/LanguageProvider";
import { LanguageToggle } from "@/components/lang/LanguageToggle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { buttonClass } from "@/components/ui/button";

/**
 * Navbar landing.
 *
 * Tinggi tetap h-16 dan sticky (DESIGN.md §5 Section 1). Tautan tengah hanya
 * muncul di md ke atas; di mobile digantikan tombol menu.
 *
 * Catatan anti-slop: navbar harus tetap satu baris di desktop. Karena itu
 * tautan tengah `hidden md:flex` dan tombol dashboard tidak diberi lebar
 * maksimum.
 */
export function Navbar() {
  const { t } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const anchors = [
    { href: "#latar-belakang", label: t.nav.background },
    { href: "#metrik", label: t.nav.metrics },
    { href: "#cara-kerja", label: t.nav.howItWorks },
    { href: "#dampak", label: t.nav.impact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-1 px-3 sm:gap-4 sm:px-6">
        {/* Kiri: identitas. `min-w-0` + `truncate` mencegah blok ini mendorong
            kontrol di kanan keluar layar pada viewport sempit (375px). */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span
            aria-hidden="true"
            className="grid size-8 shrink-0 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
          >
            IL
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-sm font-semibold tracking-tight">INSIGHT</span>
            <span className="mt-0.5 truncate text-[10px] text-muted-foreground">
              Air Quality Lab
            </span>
          </span>
        </Link>

        {/* Tengah: tautan anchor */}
        <nav aria-label="Navigasi utama" className="hidden items-center gap-1 md:flex">
          {anchors.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Kanan: kontrol + CTA. `shrink-0` menjamin kontrol tidak pernah
            terkompresi atau terdorong keluar layar. */}
        <div className="flex shrink-0 items-center gap-1">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/dashboard/"
            className={buttonClass("primary", "sm", "ml-1 hidden sm:inline-flex")}
          >
            {t.nav.dashboard}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={t.nav.menu}
            className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-md transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
          >
            {menuOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen ? (
        <nav
          aria-label="Navigasi seluler"
          className="border-t border-border bg-background px-4 py-3 md:hidden"
        >
          <ul className="flex flex-col">
            {anchors.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="mt-1 border-t border-border pt-1 sm:hidden">
              <Link
                href="/dashboard/"
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-primary"
              >
                {t.nav.dashboard}
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
