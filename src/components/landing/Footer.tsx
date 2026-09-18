"use client";

import { Globe } from "lucide-react";
import { useLang } from "@/components/lang/LanguageProvider";

/**
 * Ikon brand sebagai SVG inline.
 *
 * lucide-react versi 1.x tidak lagi menyediakan ikon brand (Instagram, LinkedIn,
 * dan sejenisnya) karena alasan lisensi. Karena itu kedua glyph brand digambar
 * inline di sini.
 *
 * Ini SATU-SATUNYA pengecualian terhadap aturan "jangan menggambar ikon sendiri",
 * dan memang sesuai DESIGN.md §4 yang mencontohkan pola `InstagramIcon` inline.
 * Untuk ikon non-brand, tetap pakai lucide-react.
 */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 9v11" />
      <path d="M4 4.5v.01" />
      <path d="M10 20v-6a3 3 0 0 1 6 0v6" />
      <path d="M10 9v1.5" />
    </svg>
  );
}

/**
 * Footer landing (DESIGN.md §5 Section 4).
 *
 * Hanya tiga kanal yang dicantumkan, sesuai data yang benar-benar tersedia.
 * EMAIL SENGAJA TIDAK DICANTUMKAN karena alamat di FE-insight-web diketahui
 * salah. Jangan menambahkan kanal lain tanpa data nyata.
 */
export function Footer() {
  const { t } = useLang();

  const channels = [
    {
      label: t.footer.instagram,
      href: "https://instagram.com/birulangit.ofc",
      icon: InstagramIcon,
    },
    {
      label: t.footer.linkedin,
      href: "https://www.linkedin.com/company/birulangit/home/",
      icon: LinkedinIcon,
    },
    {
      label: t.footer.website,
      href: "https://company.langit-biru.com",
      icon: Globe,
    },
  ];

  const navLinks = [
    { href: "#latar-belakang", label: t.nav.background },
    { href: "#metrik", label: t.nav.metrics },
    { href: "#dampak", label: t.nav.impact },
    { href: "/dashboard/", label: t.nav.dashboard },
  ];

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Identitas */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="grid size-8 place-items-center rounded-md bg-primary text-sm font-bold text-primary-foreground"
              >
                IL
              </span>
              <span className="text-sm font-semibold tracking-tight">INSIGHT</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigasi */}
          <nav aria-label={t.footer.navigate}>
            <h2 className="text-xs font-semibold tracking-wide text-foreground">
              {t.footer.navigate}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kanal */}
          <div>
            <h2 className="text-xs font-semibold tracking-wide text-foreground">
              {t.footer.channels}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {channels.map((channel) => (
                <li key={channel.href}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={channel.label}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <channel.icon className="size-4" />
                    {channel.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">{t.footer.copyright}</p>
          {/* Alamat web ditampilkan sebagai teks, bukan hanya ikon, karena perlu
              terbaca jelas (DESIGN.md §5 Section 4). */}
          <a
            href="https://company.langit-biru.com"
            target="_blank"
            rel="noopener noreferrer"
            className="tabular text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            company.langit-biru.com
          </a>
        </div>
      </div>
    </footer>
  );
}
