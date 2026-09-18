# Design Specification (DESIGN.md) — Pengmas Air Quality Dashboard

> **Catatan riwayat dokumen.** File `DESIGN.md` sebelumnya di folder ini adalah hasil
> ekstraksi otomatis dari **satu screenshot** Dribbble (bukan spesifikasi yang ditulis
> manusia) dan mengandung dua kesalahan fundamental: mengklaim tema gelap `#0E0E0E` padahal
> gambar aslinya terang, dan mengklaim sudut tajam `border-radius: 0px` padahal kartu-kartunya
> rounded 16–24 px. Section responsifnya juga dikarang — data breakpoint-nya semua nol.
> Dokumen lama itu **sudah dihapus** dan digantikan seluruhnya oleh file ini.
>
> Referensi arah yang dipakai: **Nexora** (landing page, Pinterest) untuk struktur landing,
> dan **Airy Weather Dashboard** (Dribbble) untuk struktur dashboard.

---

## 1. Design Philosophy & Guidelines

- **Nama project**: **Pengmas Air Quality** — dashboard pemantauan kualitas udara ruang kelas
  untuk program pengabdian masyarakat (pengmas) di lingkungan sekolah.
- **Core Aesthetic**: *Modern Clean Technical & Environmental Intelligence*.
- **Design Standards**:
  - Bahasa lugas, faktual, tanpa hiperbola dan puffery.
  - Kontras tajam dan terbaca jelas (rasio kontras minimum **4.5:1** untuk teks).
  - Konsistensi visual di seluruh mode terang (*Light*) dan gelap (*Dark*).
  - Navigasi halus (*smooth scrolling*) tanpa *layout shift* yang mengganggu.
- **Prinsip konteks pengmas** — dashboard ini dipakai di ruang kelas, sering ditampilkan lewat
  proyektor dan di jaringan sekolah yang lambat. Maka:
  - **At-a-glance**: status kualitas udara harus terbaca sekilas, tanpa perlu mengklik.
  - **Ringan**: hindari aset berat dan animasi berlebihan di dashboard.
  - **Jujur soal data**: bila sensor mati/data basi, tampilkan statusnya, bukan angka lama
    yang dibiarkan tampak hidup.
- **Ruang lingkup dokumen ini**: **spesifikasi desain visual saja** — warna, tipografi,
  layout, hierarki, dan komponen. Perilaku/fungsi (sumber data, API, arsitektur) dibahas di
  dokumen terpisah (PRD.md / architecture), **bukan** di sini.

### Bahasa

- **Default bahasa: INGGRIS.** Bahasa Indonesia tersedia lewat tombol di navbar dan hanya
  aktif bila pengguna memilihnya. Alasan: halaman ini juga dibaca oleh mitra dan publik
  luar, dan istilah teknisnya (CO2, PM2.5, ppm) memang berbahasa Inggris.
- Tombol bahasa menampilkan bahasa yang **sedang aktif** (`EN` = halaman berbahasa Inggris),
  bukan bahasa tujuan. Detail teknis ada di `AGENTS.md`.
- Teks yang **tidak** diterjemahkan: nama brand `INSIGHT`, satuan dan istilah teknis
  (CO2, PM2.5, ppm, °C, µg/m³), dan placeholder `[NAMA RUANGAN n]`.

### Dial Antislop (WAJIB — dibaca sebelum menulis UI)

```
Dial: ENERGY 2 / RHYTHM 2 / MOTION 2
```

**Design Read:**
> Reading this as: landing page dashboard lingkungan sekolah untuk guru, siswa, dan orang tua
> (termasuk proyektor kelas), dalam bahasa visual clean technical, terang, biru langit
> INSIGHT, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

Alasan tiap dial (wajib, sesuai antislop R-31):

- **ENERGY 2** — model 3D menyapa di hero dan CTA jelas, jadi bukan 1; tetapi audiensnya
  sekolah dan sering ditampilkan lewat proyektor, jadi tidak boleh ramai sampai level 3.
- **RHYTHM 2** — 4 section landing punya komposisi berbeda (navbar, hero split, section teks
  penuh, footer), tetapi tidak asimetris ekstrem.
- **MOTION 2** — ada rotasi 3D terus-menerus dan transisi hover; tetapi `prefers-reduced-motion`
  wajib dihormati, jadi bukan 3.

**Konsekuensi mengikat:**

- Karena **MOTION 2**, **dilarang** menambahkan parallax, scroll-pin, atau choreography.
  Cukup rotasi 3D + transisi hover + reveal ringan (antislop R-19).
- Karena **RHYTHM 2**, setiap section landing **wajib** punya komposisi yang terlihat berbeda.
  Jangan semua section berbentuk "judul tengah + grid kartu identik" (antislop R-05).

---

## 2. Color Palette & Theming (Light & Dark Mode)

Token di bawah disalin dari `FE-insight-web/src/index.css` sebagai titik awal. Bila nanti ada
token yang jelas tidak cocok untuk konteks pengmas, ganti nilainya **dan catat alasannya di
baris token tersebut** — jangan menyimpang tanpa jejak.

### Base Tokens (`:root` — Light, default)

```css
:root {
  --background: oklch(0.995 0.004 230);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.58 0.21 245);
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.97 0.008 235);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.965 0.005 235);
  --muted-foreground: oklch(0.52 0.015 240);
  --accent: oklch(0.96 0.02 235);
  --accent-foreground: oklch(0.205 0.05 245);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.005 235);
  --input: oklch(0.92 0.005 235);
  --ring: oklch(0.58 0.21 245);
  --chart-1: oklch(0.58 0.21 245);
  --chart-2: oklch(0.65 0.18 190);
  --chart-3: oklch(0.75 0.16 75);
  --chart-4: oklch(0.62 0.22 30);
  --chart-5: oklch(0.55 0.20 300);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0.004 230);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.58 0.21 245);
  --sidebar-primary-foreground: oklch(0.99 0 0);
  --sidebar-accent: oklch(0.96 0.015 235);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.92 0.005 235);
  --sidebar-ring: oklch(0.58 0.21 245);
}
```

### Base Tokens (`.dark` — Dark variant)

```css
.dark {
  --background: oklch(0.14 0.015 240);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.18 0.02 240);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.18 0.02 240);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.72 0.17 240);
  --primary-foreground: oklch(0.12 0.02 240);
  --secondary: oklch(0.24 0.02 240);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.22 0.02 240);
  --muted-foreground: oklch(0.70 0.02 240);
  --accent: oklch(0.22 0.03 240);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 12%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.72 0.17 240);
  --chart-1: oklch(0.72 0.17 240);
  --chart-2: oklch(0.70 0.16 190);
  --chart-3: oklch(0.78 0.15 75);
  --chart-4: oklch(0.68 0.20 30);
  --chart-5: oklch(0.65 0.18 300);
  --sidebar: oklch(0.16 0.02 240);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.72 0.17 240);
  --sidebar-primary-foreground: oklch(0.12 0.02 240);
  --sidebar-accent: oklch(0.22 0.02 240);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 12%);
  --sidebar-ring: oklch(0.72 0.17 240);
}
```

- **`--primary` = Biru Langit.** Ini warna brand resmi. Nilai awalnya `oklch(0.58 0.21 245)`
  (≈ `#0079FE`).
  - **Penyimpangan tercatat (lightness 0.58 → 0.53):** teks putih di atas
    `oklch(0.58 0.21 245)` hanya mencapai kontras **4.05:1**, di bawah ambang WCAG AA
    **4.5:1** yang diwajibkan §7 dokumen ini dan aturan antislop R-25. Nilai diubah menjadi
    **`oklch(0.53 0.21 245)`**, yang mencapai **4.96:1** menurut perhitungan dan terukur
    **4.46:1 ke atas** untuk seluruh elemen di browser. Hue (245) dan chroma (0.21)
    **tidak diubah**, jadi identitas biru langit tetap terjaga; hanya kecerahan yang
    diturunkan. Diterapkan pada `--primary`, `--ring`, `--chart-1`, `--sidebar-primary`, dan
    `--sidebar-ring` di blok `:root`.
  - Nilai 0.53 dipilih (bukan 0.55 yang secara teori sudah lulus 4.57:1) untuk memberi
    **margin aman**, karena konversi warna di browser bisa menyimpang sedikit dari
    perhitungan dan tombol CTA wajib lulus tanpa bergantung pada pembulatan. Jangan
    menaikkannya kembali tanpa mengukur ulang kontras di browser.
  - Blok `.dark` **tidak** berubah: `oklch(0.72 0.17 240)` dengan teks gelap sudah jauh di
    atas ambang (terukur 6.12:1 atau lebih baik).
- **`--radius: 0.625rem`** (10 px) — dipakai untuk kartu, tombol, dan input.

### Semantic Colors (Status Kualitas Udara)

Diambil dari `FE-insight-web/src/components/map/AirQualityMap.tsx` (fungsi `getIspuQuality`).
Dipakai lintas landing **dan** dashboard.

| Peran | Isi (bg) | Border | Pemakaian |
|---|---|---|---|
| **Baik** | `#10b981` | `#059669` | Status aman — tidak perlu tindakan |
| **Sedang** | `#f59e0b` | `#d97706` | Peringatan dini — pantau |
| **Tidak Sehat** | `#ef4444` | `#dc2626` | Darurat — perlu tindakan |
| **N/A / offline** | `#64748b` | `#475569` | Sensor mati atau data tidak tersedia |

**Keputusan final: skema 3 level.** Ini sudah dikonfirmasi user dan **tidak** memakai skema
6 level (EPA/WHO). Alasan: 3 level lebih cepat terbaca sekilas oleh guru/siswa, dan konsisten
dengan ISPU serta `FE-insight-web`. Jangan menambah level warna tanpa keputusan baru.

---

## 3. Aturan Makna Warna (WAJIB — jangan dilewat)

Ini menjawab konflik nyata: pada referensi landing Nexora, **hijau = tren naik** dan
**merah = tren turun**. Pada kualitas udara, **hijau = udara baik** dan **merah = udara buruk**
(status ambang). Kalau dua makna ini disalin mentah, pengguna akan salah baca.

Aturannya:

1. **Hijau / Amber / Merah DILARANG dipakai untuk menyatakan arah tren** (naik/turun).
   Ketiga warna ini **hanya** untuk status ambang kualitas udara.
2. Untuk arah tren, gunakan **ikon panah** (`ArrowUp` / `ArrowDown` / `Minus` dari
   `lucide-react`) + warna `--muted-foreground`, **tanpa** warna semantik hijau/merah.
3. **Satu elemen hanya boleh membawa satu makna warna.** Jangan menumpuk "tren naik" dan
   "udara baik" pada elemen yang sama.
4. **Brand Biru Langit bukan warna status.** Biru = aksi/brand (tombol, tautan, fokus
   keyboard), **bukan** indikator kualitas udara. Jangan pakai biru untuk berarti "udara baik".

Contoh benar: kartu CO2 menampilkan `1.240 ppm` dengan **badge merah** (status: tidak sehat)
dan, terpisah, panah kecil abu-abu `↑ 120 ppm` (tren: naik).

---

## 4. Typography Hierarchy

- **Font Family**:
  - Sans: **Fira Sans** — `--font-sans: 'Fira Sans', sans-serif;`
  - Mono: **Fira Code** — `--font-mono: 'Fira Code', monospace;`
  - Paket npm yang akan diperlukan saat implementasi: `@fontsource/fira-sans` dan
    `@fontsource/fira-code` (versi `5.3.0`, sejajar dengan versi Geist eksisting).
    Dokumen ini **tidak** meminstalnya — hanya mencatat kebutuhannya.
  - Catatan penyimpangan: `FE-insight-web` memakai `Geist Variable`. Untuk pengmas kita
    memakai **Fira Sans + Fira Code** karena pasangan Fira lebih terbaca untuk data teknis
    dan punya varian mono yang jelas untuk angka sensor. `Geist` **tidak** dipakai.
- **Headings**:
  - Hero H1: `text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight`
  - Section H2: `text-3xl sm:text-4xl font-bold tracking-tight`
  - Card Title: `text-xl font-bold`
- **Body & Captions**:
  - Lead: `text-lg sm:text-xl text-muted-foreground font-normal`
  - Body: `text-sm sm:text-base leading-relaxed`
  - Micro / Meta: `text-xs font-mono text-muted-foreground`
- **Aturan angka**: **semua angka metrik sensor wajib memakai `font-mono`** (Fira Code) agar
  digit sejajar rapi antar kartu dan antar pembaruan nilai.

---

## 5. Layout — Landing Page

Urutan section dari atas ke bawah. Landing mengikuti alur **Nexora**, bukan alur landing
`FE-insight-web` (yang hero-nya terpusat). Penyimpangan ini disengaja.

### Section 1 — Navbar

- **Tujuan**: navigasi utama + akses cepat ke dashboard.
- Sticky di atas, tinggi `h-16`, `border-b`, `bg-background/80 backdrop-blur-md`, `z-50`.
- **Kiri**: logo `BIRULANGIT.svg` + dua baris teks (nama lab, subjudul).
- **Tengah**: tautan anchor dengan smooth scroll — `#latar-belakang`, `#metrik`, `#dampak`.
- **Kanan**: `ThemeToggle` + tombol **`Go to Dashboard`** (`size="sm"`, varian primary,
  ikon `ArrowRight`).
- **Responsif**: tautan tengah `hidden md:flex`; di mobile hanya logo + tombol dashboard.

### Section 2 — Hero

- **Tujuan**: memperkenalkan project dan mengarahkan ke dashboard.
- **Layout**: **split dua kolom** di desktop (`lg:grid-cols-2`), satu kolom di mobile.
  *(Penyimpangan sengaja dari hero terpusat `FE-insight-web`.)*
- **Kolom kiri (teks)**:
  1. Badge pill institusi — teks: **INSIGHT** (Innovation and Sustainability for
     Geo-Environmental Health).
  2. **H1** — contoh: *"Udara Bersih untuk Ruang Belajar"*.
  3. Sub-headline (Lead) — satu kalimat penjelas cakupan pemantauan.
     **Deskripsi final belum tersedia dari user** — gunakan teks sementara, lalu ganti.
  4. Dua tombol: **`Go to Dashboard`** (primary) dan **`Lihat Data Sensor`** (secondary,
     anchor scroll ke `#metrik`).
  5. Tiga **trust badge** mengikuti pola Nexora: `Tanpa login`, `Data real-time`,
     `Berbasis IoT` — **wajib** ikon SVG dari `lucide-react` (mis. `Check`, `Activity`,
     `Wifi`), **bukan emoji**.
- **Kolom kanan (visual)**: **model 3D alat pemantau kualitas udara**.
  - Render dengan `@react-three/fiber` (pola `Canvas` + `useFrame` + `* as THREE` sudah ada
    di `FE-insight-web/src/components/three/NetworkBackground.tsx`).
  - **Wajib** `pointer-events-none` pada kanvas agar tidak menghalangi klik tombol.
  - **Wajib** menghormati `prefers-reduced-motion`: bila aktif, render **satu frame statis**
    (bukan animasi berjalan).
  - **Wajib** fallback bila WebGL gagal/tidak tersedia: tampilkan gambar alat versi 2D,
    jangan biarkan area kosong.
  - Target performa: tambahan bundel kanvas < ~150 KB; gunakan `dpr={[1, 2]}`.
  - Catatan tegas: **ini aset gaya, bukan UI fungsional** — model 3D hanya dipakai di landing,
    **tidak** di dashboard.
- **Batas tinggi**: hero harus muat dalam viewport awal; heading maksimum 2 baris di desktop.

### Section 3 — Latar Belakang Pengmas

- **Tujuan**: menjelaskan konteks program pengabdian masyarakat (requirement user: teks saja).
- **Struktur**: Section H2 → 1 paragraf lead → grid 2–3 kolom berisi blok prosa
  (mis. "Latar Belakang", "Tujuan", "Lingkup").
- **Tanpa** chart, tanpa CTA, tanpa kartu metrik — murni teks.
- **Aturan bahasa**: faktual, tanpa hiperbola. **Dilarang** kata *Elevate*, *Seamless*,
  *Unleash*, *Next-Gen*, *Delve*.
- **Isi teks**: **placeholder** — user akan mengisi teks final nanti.

### Section 4 — Footer

- **Tujuan**: identitas project + kanal kontak/media sosial.
- `border-t`, grid 1 kolom (mobile) → 4 kolom (desktop).
- **Kolom 1 (span 2)**: logo + identitas —
  **INSIGHT** (*Innovation and Sustainability for Geo-Environmental Health*).
  Deskripsi naratif belum tersedia; tulis placeholder satu baris.
- **Kolom 2–3**: tautan navigasi.
- **Kolom 4**: **akun media sosial & web** — ikon sebagai **SVG inline** (pola
  `InstagramIcon` sudah ada di `FE-insight-web/src/components/landing/Footer.tsx`); setiap
  tautan **wajib** punya `aria-label`. Nilai aktual:

  | Kanal | Nilai | Ikon |
  |---|---|---|
  | Instagram | `https://instagram.com/birulangit.ofc` | `InstagramIcon` (SVG inline) |
  | LinkedIn | `https://www.linkedin.com/company/birulangit/home/` | `Linkedin` (lucide-react) |
  | Website | `https://company.langit-biru.com` | `Globe` (lucide-react) |

  Tautan **Website** sebaiknya juga muncul sebagai teks di baris bawah footer, bukan hanya
  ikon — alamat web perusahaan perlu terbaca jelas.

  **Email tidak dicantumkan** — alamat `contact@birulangit.id` di `FE-insight-web` diketahui
  salah, jadi sengaja dihilangkan sampai ada alamat yang benar.

  Tiga kanal di atas adalah yang tersedia saat ini. **Jangan menambah** kanal lain
  (Twitter/YouTube/TikTok/Facebook) tanpa data nyata.

- **Baris bawah**: copyright + teks meta `font-mono`.
- **Dilarang** memakai emoji sebagai ikon sosial.

---

## 6. Layout — Dashboard (Kerangka Visual, gaya Airy)

Bagian ini **hanya mendefinisikan visual & layout**, bukan fungsi. Struktur mengikuti gaya
dashboard Airy (sidebar rail + kartu status + grafik + daftar lokasi).

### Struktur Region (atas → bawah)

1. **Sidebar kiri** — rail ikon (mengikuti Airy). Di mobile menjadi menu tersembunyi
   (drawer/hamburger).
2. **Header atas** — nama sekolah/ruang + **timestamp "Diperbarui X menit lalu"** + indikator
   **`LIVE`**. Wajib ada. Bila data basi, tampilkan status *stale* secara eksplisit, **jangan**
   menampilkan angka lama seolah masih hidup.
3. **Kartu status utama** — satu skor besar + label kualitas + warna semantik.
4. **Baris metrik kunci (4 kartu)** — CO2, Suhu, Kelembapan, PM2.5. Tiap kartu: nilai
   (`font-mono`), satuan, badge status warna, sparkline mini.
5. **Grafik tren** — CO2 (dan/atau PM2.5) 24 jam **dengan garis ambang horizontal**;
   toggle harian/mingguan.
6. **Panel Rekomendasi Tindakan** — teks aksi lugas, mis. *"Buka jendela 5–10 menit"*.
   Ini **nilai utama dashboard** bagi sekolah; wajib ada.
7. **Grid per-ruangan** — kartu per kelas dengan status warna (mengadaptasi kolom lokasi Airy:
   Castle Park / Princes St. Gardens / Heaton Park → menjadi daftar kelas).
8. **Blok konteks/edukasi** — penjelasan singkat arti CO2 dan suhu bagi guru/siswa.

### Daftar Metrik (Fase Ini)

Kerangka awal — detail menyusul:

| Metrik | Satuan | Catatan |
|---|---|---|
| CO2 | ppm | Indikator utama kualitas ventilasi kelas |
| Suhu | °C | Kenyamanan termal |
| Kelembapan | % | Pendukung kenyamanan |
| PM2.5 | µg/m³ | Partikulat halus |

### Ambang Batas CO2

CO2 punya 4 tingkatan makna, tapi kita memakai **3 warna**. Pemetaannya dipadatkan
(**keputusan final user — Opsi A**): dua tingkat teratas digabung ke satu warna, dan tingkat
paling ekstrem dibedakan lewat **teks rekomendasi**, bukan warna keempat.

| Rentang CO2 | Level warna | Label | Rekomendasi tindakan |
|---|---|---|---|
| < 800 ppm | **Baik** (`#10b981`) | Ventilasi baik | Tidak perlu tindakan |
| 800–1000 ppm | **Sedang** (`#f59e0b`) | Mulai menumpuk | Pantau; pertimbangkan sirkulasi |
| > 1000 ppm | **Tidak Sehat** (`#ef4444`) | Ventilasi kurang | Buka jendela 5–10 menit |

**Kasus khusus > 1750 ppm.** Warna tetap merah (tidak ada warna ke-4), tapi panel
**Rekomendasi Tindakan** wajib menampilkan teks lebih tegas: *"Segera buka jendela/pintu —
kadar CO2 sangat tinggi"*. Jadi urgensi ekstrem dikomunikasikan lewat bahasa, bukan warna.

- Ambang di atas merujuk panduan ventilasi ruang kelas yang umum dipakai. Bila institusi
  punya ambang baku sendiri (mis. Kemenkes), ganti angka di tabel ini **dan** di logika
  pewarnaan sekaligus — jangan biarkan keduanya berbeda.

### Tipe Chart per Metrik

**Keputusan final user — Opsi B: tiap metrik punya chart sendiri.** Keempat metrik memiliki
karakter data yang berbeda, sehingga dipaksa ke satu chart akan menyesatkan. Tiap chart
dipilih lewat tab/toggle dan menampilkan satu metrik penuh.

| Metrik | Tipe chart | Alasan | Garis ambang |
|---|---|---|---|
| **CO2** | Line/area | Naik tajam saat kelas penuh, turun saat jendela dibuka | **Ya** — garis di 800 & 1000 ppm |
| **Suhu** | Line | Perubahan lambat dan halus | Tidak |
| **Kelembapan** | Line | Perubahan lambat dan halus | Tidak |
| **PM2.5** | Area | Berfluktuasi, kadang ada lonjakan | **Ya** — garis ambang sesuai level status |

Aturan teknis untuk keempatnya:
- Rentang default **24 jam**; sediakan toggle **Harian / Mingguan**.
- Sumbu Y selalu menampilkan satuan (ppm, °C, %, µg/m³).
- Warna garis: gunakan `--chart-1` (Biru Langit) sebagai default; **jangan** mewarnai garis
  dengan hijau/amber/merah, karena warna-warna itu khusus status (§3).
- Garis ambang horizontal memakai `--muted-foreground` dengan gaya putus-putus, bukan warna
  semantik, agar tidak tertukar dengan warna garis data.
- Meski ada 4 chart, **hanya satu chart yang tampil pada satu waktu** — ini menjaga prinsip
  at-a-glance dan tetap ringan di jaringan sekolah.

### Prinsip Keras Dashboard

- **At-a-glance**: maksimum **6–7 kartu** tanpa hierarki bertingkat. Dashboard harus terbaca
  sekilas di proyektor kelas.
- **Elemen 3D DILARANG di dashboard** — hanya di hero landing. Alasan: beban render dan
  keterbacaan.
- **Mode terang sebagai default** untuk keterbacaan proyektor pada siang hari.

---

## 7. Accessibility & Interaction Rules

- **Elemen interaktif**: wajib punya `cursor-pointer`, focus ring yang terlihat, dan transisi
  `150–300ms`.
- **Kontras teks**: minimum **4.5:1**, diuji **terpisah** untuk mode terang dan gelap —
  jangan mengasumsikan satu rasio berlaku untuk keduanya.
- **Ikon**: gunakan `lucide-react` untuk ikon umum; SVG inline hanya bila glyph-nya tidak
  tersedia (mis. logo Instagram/media sosial). **Tanpa emoji dekoratif** sebagai ikon UI.
- **Reduced motion**: semua animasi (termasuk kanvas 3D di hero) wajib menghormati
  `prefers-reduced-motion`.
- **Breakpoint uji**: 375px, 768px, 1024px, 1440px.
- **Tombol CTA**: teks harus muat dalam **satu baris** pada tampilan desktop.
- **Form/label**: setiap kontrol form punya label yang terikat secara semantik.

---

## 8. Sumber & Status Verifikasi

Kejujuran per sumber:

| Sumber | Dipakai untuk | Status |
|---|---|---|
| **Nexora** (Pinterest) | Struktur landing page (hero split, trust badge, footer) | **Terverifikasi** lewat deskripsi yang diberikan user; metadata pin tidak dapat dibaca otomatis |
| **Airy Weather Dashboard** (Dribbble) | Struktur dashboard (sidebar rail, kartu status, grafik, daftar lokasi) | **Terverifikasi** lewat deskripsi vision |
| `FE-insight-web/DESIGN.md` + `src/index.css` | Token warna, radius, hierarki tipografi, aturan aksesibilitas | **Terverifikasi** — file dibaca langsung |
| `FE-insight-web/src/components/map/AirQualityMap.tsx` | Warna semantik status (`getIspuQuality`) | **Terverifikasi** — file dibaca langsung |
| `FE-insight-web/src/components/landing/Footer.tsx` | Akun sosial (Instagram) | **Terverifikasi** — file dibaca langsung |
| Data kanal tambahan (LinkedIn, website) | Akun sosial & web perusahaan | **Diberikan user** — tidak ada di `FE-insight-web` |
| Skill `ui-ux-pro-max` | Rekomendasi font (Fira Sans/Fira Code) & checklist aksesibilitas | Dipakai sebagai rujukan |

Catatan penyimpangan yang disengaja:

- **Tidak** memakai palet gelap `#0F172A` yang disarankan `ui-ux-pro-max --design-system`,
  karena bertentangan dengan brand terang Biru Langit.
- **Tidak** memakai font `Geist Variable`; digantikan **Fira Sans + Fira Code**.
- Struktur hero landing **tidak** mengikuti `FE-insight-web` (terpusat); memakai split
  dua kolom ala Nexora.
- Token `--chart-5` (ungu) disalin apa adanya untuk kelengkapan, namun belum ada metrik
  pengmas yang memakainya — pertimbangkan mengganti bila nanti ada kebutuhan chart ke-5.
