import type { Metadata } from "next";
import "@fontsource/fira-sans/400.css";
import "@fontsource/fira-sans/500.css";
import "@fontsource/fira-sans/600.css";
import "@fontsource/fira-sans/700.css";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/500.css";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { LanguageProvider } from "@/components/lang/LanguageProvider";

export const metadata: Metadata = {
  title: "Pengmas Air Quality | INSIGHT",
  description:
    "Classroom air quality monitoring at SMP Telkom by INSIGHT, the community service program of PT Ekshalasi Langit Biru.",
};

/**
 * Skrip anti-flash. Dijalankan sebelum paint pertama supaya tema dan bahasa
 * yang tersimpan langsung diterapkan. Tanpa ini, halaman akan berkedip terang
 * lalu gelap (atau EN lalu ID).
 *
 * Dipasang sebagai string inline di <head>, bukan useEffect, karena useEffect
 * berjalan setelah paint. Isinya sengaja ditulis defensif: `localStorage` bisa
 * melempar error di mode private/incognito.
 */
const noFlashScript = `
(function () {
  try {
    var root = document.documentElement;

    // Tema: default terang (DESIGN.md §6 - mode terang untuk keterbacaan proyektor).
    var theme = localStorage.getItem('pengmas-theme');
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    // Bahasa: default INGGRIS. Hanya beralih ke Indonesia bila pengguna
    // sebelumnya memang memilih Indonesia.
    var lang = localStorage.getItem('pengmas-lang');
    root.lang = lang === 'id' ? 'id' : 'en';
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // `lang` dan `dark` dikoreksi oleh noFlashScript sebelum paint.
    // Nilai di bawah hanya fallback untuk pengguna baru atau saat JS mati.
    // Default bahasa: INGGRIS.
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
