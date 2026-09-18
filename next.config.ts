import type { NextConfig } from "next";

// Static export untuk Cloudflare Pages (lihat README.md).
//
// `output: "export"` menonaktifkan middleware, rewrites, redirects, headers, ISR,
// Server Actions, dan cookies(). Jangan tambahkan fitur-fitur itu ke project ini:
// build akan gagal. Proxy data ke API eksternal ditangani oleh Pages Functions
// di `functions/api/[[path]].ts`, bukan oleh rewrites Next.js.
const nextConfig: NextConfig = {
  output: "export",
  // next/image tanpa loader kustom tidak bisa dipakai saat static export.
  // Kita juga memakai <img> biasa untuk aset lokal; setelan ini mencegah
  // error bila suatu saat <Image> dipakai.
  images: { unoptimized: true },
  // Setiap route menjadi `<route>/index.html`, lebih andal dilayani Cloudflare Pages.
  trailingSlash: true,
};

export default nextConfig;
