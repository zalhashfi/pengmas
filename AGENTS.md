# AGENTS.md — Pengmas Air Quality

Panduan kerja untuk agen dan kontributor di repo ini. Baca ini dulu sebelum mengubah kode.

**Dokumen arah desain:** `DESIGN.md` (spesifikasi visual, token warna, ambang batas, dial
antislop). **Konteks riset:** `REFERENSI_DESAIN.md`. **Deploy:** `README.md`.

---

## Perintah

```bash
npm run dev      # server pengembangan (http://localhost:3000)
npm run build    # static export ke out/
npm run lint     # ESLint
```

Menguji hasil build: `npm run build && npx serve out`.
Menguji proxy data: `npm run build && npx wrangler pages dev out` (endpoint di
`http://localhost:8788/api/vital/<device>?last30`).

---

## Stack & batasan yang mengikat

**Next.js 16 + App Router + TypeScript + Tailwind v4**, dengan **static export**
(`output: 'export'`) ke **Cloudflare Pages**.

### DILARANG menambahkan fitur ini (gagal saat build)

`output: 'export'` menonaktifkan:

- `middleware.ts`
- `rewrites`, `redirects`, `headers`
- Incremental Static Regeneration (ISR)
- Server Actions, `cookies()`, Draft Mode, Intercepting Routes
- Route Handlers yang bergantung pada `Request`
- Dynamic Routes tanpa `generateStaticParams()`
- `next/image` dengan loader default (project ini memakai `unoptimized: true`)

Konsekuensi yang sudah diambil: **tidak ada** routing locale `/[locale]/`. Dwibahasa
ditangani lewat kamus dan state klien. Kalau butuh proxy, pakai Pages Function, bukan rewrites.

### Versi dependensi

- **React dipin ke `19.2.8`, BUKAN `19.3.x`.** `@react-three/fiber@9.7.0` mensyaratkan peer
  `react >=19 <19.3`, sedangkan `react@latest` (`19.3.0`) di luar rentang itu. Jangan
  menaikkan React tanpa memeriksa `npm view @react-three/fiber peerDependencies` lebih dulu.
- **JANGAN memakai `--force` atau `--legacy-peer-deps`.** Kalau ada konflik peer, turunkan
  versi paket yang bertabrakan dan catat alasannya.
- Untuk dependensi lain, ambil versi stabil terbaru dari npm. Jangan menyalin versi dari
  repo `FE-insight-web`.

---

## Konvensi commit

- Author commit: `zalhashfi <211019493+zalhashfi@users.noreply.github.com>`.
- **DILARANG** menambahkan trailer `Co-authored-by` atau atribusi bot dalam bentuk apa pun.
- Branch fitur: `issue-<number>`.

---

## Aturan UI & aksesibilitas

- **Warna semantik hijau/amber/merah HANYA untuk status ambang kualitas udara.** Jangan
  memakainya untuk arah tren (naik/turun). Tren memakai ikon panah dari `lucide-react` plus
  warna `--muted-foreground`. Biru Langit adalah warna brand/aksi, bukan warna status.
  Detail lengkap di `DESIGN.md` §3.
- **Angka metrik sensor wajib `font-mono`** (kelas `.tabular`) agar digit sejajar antar
  pembaruan nilai.
- **Tanpa emoji** sebagai ikon. Pakai `lucide-react`. SVG inline hanya untuk glyph brand
  yang tidak tersedia di lucide (mis. Instagram, LinkedIn).
- Setiap elemen interaktif: ada focus ring yang terlihat (`:focus-visible` sudah diatur di
  `globals.css`), dan transisi 150 sampai 300ms.
- Kontras teks minimum **4.5:1**, diuji terpisah untuk mode terang dan gelap.
- **Dilarang em dash (—)** di seluruh teks UI. Termasuk di kamus `strings.ts`.

---

## Dwibahasa (ID + EN)

- **Default: INGGRIS (`en`).** Bahasa Indonesia hanya dipakai bila pengguna
  memilihnya sendiri. Default ini berlaku di tiga tempat dan ketiganya WAJIB
  sejalan: `DEFAULT_LANG` di `src/config/strings.ts`, fallback `readLang()` di
  `LanguageProvider`, dan skrip anti-flash di `src/app/layout.tsx` (termasuk
  atribut `lang="en"` pada `<html>`).
- Semua teks UI **wajib** lewat `src/config/strings.ts`. **Tidak boleh ada teks hardcoded**
  di komponen.
- Kunci di `id` dan `en` **wajib identik**. Dijaga oleh tipe di akhir `strings.ts`
  (helper `Widen` + `_dictionaryShapeCheck`); kunci yang hilang akan menggagalkan build.
- Bahasa disimpan di `localStorage` (kunci `pengmas-lang`) dan tercermin pada atribut `lang`
  di `<html>`, yang menjadi sumber kebenaran saat runtime.
- **Tombol bahasa menampilkan bahasa yang SEDANG AKTIF**, bukan bahasa tujuan:
  `EN` berarti halaman sekarang berbahasa Inggris, `ID` berarti Indonesia. Jangan
  membalik arti ini; `aria-label` yang menyebut aksi ("Switch language to
  Indonesian"), bukan label visualnya.
- Teks yang tidak diterjemahkan: `INSIGHT`, satuan dan istilah teknis (CO2, PM2.5, ppm, °C,
  µg/m³), dan placeholder `[NAMA RUANGAN n]`.

---

## Tema

- **Terang sebagai default**, gelap sebagai varian (alasan: keterbacaan proyektor kelas,
  `DESIGN.md` §6). Tema **tidak** mengikuti `prefers-color-scheme`.
- Disimpan di `localStorage` (kunci `pengmas-theme`), tercermin pada class `.dark` di `<html>`.
- **Anti-flash:** ada skrip inline di `<head>` (`src/app/layout.tsx`) yang menerapkan tema dan
  bahasa sebelum paint. Jangan menghapusnya, dan jangan menggantinya dengan `useEffect`.
- Status tema dan bahasa dibaca dengan `useSyncExternalStore` (lihat `ThemeProvider` dan
  `LanguageProvider`). **Jangan** menggantinya dengan pola `useState` + `useEffect`, karena
  memicu cascading render dan ditolak oleh lint.

---

## Aset 3D

- Model ada di **`public/3d-indoor.glb`**. Kalau file ini dipindah ke root project, model
  **tidak akan ikut ter-export** oleh `next build` (hanya isi `public/` yang disalin ke `out/`).
- Dimuat lewat URL string: `useGLTF('/3d-indoor.glb')`. **Jangan** meng-`import` file `.glb`
  sebagai modul, karena itu memerlukan konfigurasi loader webpack/Turbopack.
- Komponen 3D **wajib** di-`dynamic import` dengan **`ssr: false`**, dan **hanya boleh**
  dipanggil dari Client Component. `<Canvas>` memakai WebGL dan `window` yang tidak ada saat
  prerender server.
- `ssr: false` dari Server Component akan menggagalkan build. Ini titik paling rawan.
- **Model berputar terus-menerus** di semua ukuran layar (requirement user). Satu-satunya
  yang menghentikannya adalah `prefers-reduced-motion: reduce`.
- **Skala wajib disetel eksplisit.** Bounding box model hanya sekitar `0.126` satuan, jadi
  tanpa `scale` ia tampak seperti titik. Nilai saat ini `8` (lihat komentar di `Scene3D.tsx`).
  Jangan mengubah file `.glb`; sesuaikan `scale` saja dalam rentang wajar.
- Pencahayaan wajib ada: model tidak punya tekstur dan materialnya gelap, jadi tanpa
  `ambientLight` + `directionalLight` ia akan tampak hitam.
- Wrapper kanvas wajib **`pointer-events-none`** supaya tombol di hero tetap bisa diklik.
- Sediakan fallback bila WebGL gagal atau model gagal dimuat. Jangan biarkan area kosong.
- **Elemen 3D dilarang di dashboard**, hanya di hero landing (`DESIGN.md` §6).

---

## Primitive UI: Base UI, bukan Radix

Pakai **Base UI** (`@base-ui/react`) dengan gaya shadcn **`base-nova`** untuk komponen yang
benar-benar stateful (dialog, dropdown, popover). Untuk elemen sederhana (tombol, badge),
tulis native HTML + Tailwind seperti di `src/components/ui/button.tsx`.

**Skill `ui-styling` menyebut Radix UI. Abaikan bagian itu** dan sesuaikan ke Base UI.
Jangan menambahkan `@radix-ui/*`.

---

## Skill yang wajib dan dilarang

**Wajib dipakai:**

| Skill | Cakupan |
|---|---|
| `design-taste-frontend` | **Landing page saja.** Jalankan bagian §0 (BRIEF INFERENCE) dan §14 (FINAL PRE-FLIGHT CHECK). **Tidak** untuk dashboard. |
| `ui-ux-pro-max` | Rekomendasi chart, tipografi, UX, aksesibilitas. Pakai `scripts/search.py`. |
| `ui-styling` | Pola komponen & aksesibilitas (abaikan bagian Radix). |
| `design-system` | Arsitektur token 3 lapis. Nilai token tetap dari `DESIGN.md` §2. |
| `minimalist-ui` | Aturan negatif: tanpa emoji, tanpa shadow berlebih, tanpa klise copywriting. |

**Dilarang dipakai** (membawa preset gaya/palet yang bertabrakan dengan `DESIGN.md`):

- `gpt-taste` (memasang GSAP + animasi acak, bertentangan dengan MOTION 2)
- `high-end-visual-design`, `stitch-design-taste`, `redesign-existing-projects`
- `imagegen-frontend-mobile`, `imagegen-frontend-web`, `brandkit`, `banner-design`,
  `slides`, `industrial-brutalist-ui` (di luar cakupan)

---

## Skill turunan antislop

Skill antislop ada di `.agents/skills/`, dipasang dari `miqdadbadjuber/anti-slop` dan
tercatat di `skills-lock.json`. Enam komponen:

| Komponen | Untuk apa |
|---|---|
| `antislop` (core, `antislop.md`) | Selalu. R-01..R-38 + Delivery Gate |
| `antislop-ui` | Tampilan: warna, layout, komponen, dekorasi, motion |
| `antislop-copywriting` | Teks: judul, CTA, value proposition, nada |
| `antislop-human` | Kontras, keyboard, fokus, state. Termasuk `contrast-check.py` |
| `antislop-layoutmobile` | Reflow antar layar: breakpoint, grid, overflow, tap target |
| `antislop-code` | Komentar kode: buang yang bergenerik, sisakan yang berguna |

### Memasang atau memperbarui

```bash
npx skills add miqdadbadjuber/anti-slop
```

**Perintah itu juga membuat junction `.claude/skills/`, dan junction itu WAJIB dihapus**,
karena project ini memakai omp, bukan Claude Code:

```bash
powershell -NoProfile -Command "Get-ChildItem -Path '.claude\skills' -Force | Where-Object { $_.LinkType -eq 'Junction' } | ForEach-Object { $_.Delete() }; Remove-Item -Path '.claude' -Recurse -Force"
```

Pakai PowerShell, bukan `rm`, karena Windows memperlakukan junction sebagai direktori khusus
dan `rm` akan gagal dengan `Permission denied`.

### Memeriksa kelengkapan

```bash
node skills/verify-antislop-skills.mjs
```

Exit 0 berarti lengkap, dan skrip juga memastikan tidak ada sisa `.claude/`. Jalankan sebelum
memakai Delivery Gate.

Bila ada skill yang belum terpasang, **Delivery Gate tetap boleh dijalankan memakai
`antislop.md` core saja**, tetapi keterbatasan itu **wajib disebutkan** di laporan akhir.
Jangan mengklaim gate dijalankan lengkap bila sebagian skill masih kosong.

### Pemeriksa kontras (wajib dipakai)

`antislop-human` membawa pemeriksa kontras. **Selalu pakai ini untuk mengukur kontras**,
jangan mengandalkan perhitungan manual atau klaim:

```bash
python .agents/skills/antislop-human/contrast-check.py <hex-foreground> <hex-background>
```

Ini sudah menemukan satu bug nyata yang lolos dari pengujian browser: teks putih di atas
ketiga warna status gagal WCAG AA (2.15:1 sampai 3.76:1). Perbaikannya tercatat di
`DESIGN.md` §2.

Blok pointer `<!-- antislop:start -->` di akhir file ini adalah **sumber kebenaran** tentang
skill mana yang terpasang. Bila Anda hanya memasang sebagian, hapus baris yang tidak terpakai.

---

## Status `FE-insight-web`

Repo `FE-insight-web` di folder sebelah adalah proyek yang **ketinggalan dan menunggu
pembaruan**. Perlakukan sebagai **referensi tambahan, bukan patokan**:

- Jangan menyalin versi dependensinya (lebih lama dari npm).
- Jangan menyalin token warnanya sebagai kebenaran baru (token ada di `DESIGN.md` §2).
- Jangan menyalin struktur/routing/arsitekturnya.

Yang boleh diambil: contoh pola komponen dan konvensi commit.

---

## Dial antislop

```
Dial: ENERGY 2 / RHYTHM 2 / MOTION 2
```

Ditulis lengkap beserta alasannya di `DESIGN.md` §1 (Dial Antislop). Konsekuensi mengikat:

- **MOTION 2:** jangan menambahkan parallax, scroll-pin, atau choreography. Cukup rotasi 3D,
  transisi hover, dan reveal ringan.
- **RHYTHM 2:** setiap section landing wajib punya komposisi yang terlihat berbeda. Jangan
  mengubah semua section menjadi pola "judul tengah + grid kartu identik".

---

## Placeholder yang menunggu data nyata

Jangan mengarang nilai untuk ini; biarkan terlihat sebagai placeholder:

- Nama ruangan di `src/config/devices.ts` (`[NAMA RUANGAN n]`).
- Teks Latar Belakang dan deskripsi program di `src/config/strings.ts` (`[DIISI NANTI]`).
- `locationKind` per device masih tebakan awal dan perlu dikonfirmasi di lapangan.

---

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `antislop.md` (core) and then the skill for the task:
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `.agents/skills/antislop-human/SKILL.md` (plus `contrast-check.py` in the same folder)
- Mobile / responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `.agents/skills/antislop-code/SKILL.md`
Check completeness before the Delivery Gate: `node skills/verify-antislop-skills.mjs`
Before starting, ask the user when antislop applies: during the work, or after it is done.
<!-- antislop:end -->
