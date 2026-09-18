# Pengmas Air Quality

Landing page dan (menyusul) dashboard pemantauan kualitas udara ruang kelas untuk program
pengabdian masyarakat di SMP Telkom, oleh **INSIGHT** (*Innovation and Sustainability for
Geo-Environmental Health*), PT Ekshalasi Langit Biru.

**Rilis 1 berisi landing page saja.** Dashboard masih berupa halaman placeholder di
`/dashboard` dan akan dikerjakan pada rilis berikutnya.

---

## Ringkasan teknis

| Aspek | Nilai |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind v4, token di `src/app/globals.css` (bersumber dari `DESIGN.md` §2) |
| Font | Fira Sans + Fira Code (`@fontsource`) |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei`, model di `public/3d-indoor.glb` |
| Output | **Static export** (`output: 'export'`) ke direktori `out/` |
| Hosting | **Cloudflare Pages** |
| Proxy data | **Cloudflare Pages Functions** di `functions/api/[[path]].ts` |
| Bahasa | Dwibahasa Inggris + Indonesia (kamus + state klien), **default Inggris** |

---

## Menjalankan secara lokal

```bash
npm install

npm run dev      # server pengembangan di http://localhost:3000
npm run build    # build static export ke out/
npm run lint     # ESLint
```

Untuk menguji hasil build seperti di produksi:

```bash
npm run build
npx serve out
```

> **Catatan:** `npm run dev` dan `npx serve out` **tidak** menjalankan Pages Function, jadi
> `/api/vital/*` belum hidup di kedua mode itu. Endpoint data hanya aktif lewat
> `npx wrangler pages dev out` atau setelah ter-deploy. Lihat bagian Proxy di bawah.

---

## Struktur penting

```
src/
  app/
    layout.tsx            # font, provider tema & bahasa, skrip anti-flash
    page.tsx              # landing page + blok BRIEF INFERENCE dari skill taste
    dashboard/page.tsx    # placeholder (dashboard menyusul)
    globals.css           # token desain dari DESIGN.md §2
  components/
    landing/              # Navbar, Hero, Background, Metrics, Impact, Footer
    three/                # Scene3D (kanvas) + Hero3D (pembungkus dynamic, ssr:false)
    theme/                # ThemeProvider + ThemeToggle
    lang/                 # LanguageProvider + LanguageToggle
    ui/                   # primitif UI (tombol)
  config/
    devices.ts            # daftar device + API_BASE
    strings.ts            # KAMUS dwibahasa, satu-satunya sumber teks UI
  lib/
    api.ts                # pemetaan JSON API -> tipe internal
    types.ts              # tipe internal
    quality.ts            # ambang batas status kualitas udara
    format.ts             # parser waktu API, format angka
    mock.ts               # data mock (BUKAN data asli)
functions/
  api/[[path]].ts         # proxy ke API eksternal (wajib, lihat di bawah)
public/
  3d-indoor.glb           # model 3D hero
skills/
  README.md               # file apa yang dibutuhkan tiap skill turunan antislop
  verify-antislop-skills.mjs   # pemeriksa kelengkapan
```

---

## Proxy data (kenapa wajib)

API sensor ada di `https://rndbirulangit.pythonanywhere.com`. API itu **tidak mengirim satu
pun header `Access-Control-Allow-Origin`** (sudah diuji: nol header CORS, termasuk pada
preflight `OPTIONS`). Akibatnya browser akan memblokir panggilan langsung dari halaman.

Karena itu semua permintaan data melewati Pages Function:

- Rute publik di aplikasi: `/api/vital/<device>?last30`
- Diteruskan ke upstream: `/api/get/vital_strategies/<device>?last30`

Function ini juga:

- **meneruskan query string** (tanpa itu API hanya mengembalikan 1 record, bukan 30);
- **membatasi cakupan** ke prefiks `vital` saja, supaya tidak menjadi open proxy;
- **menolak path traversal** dengan HTTP 400;
- **mencache 60 detik** di edge (data masuk tiap 2 menit, jadi aman).

Menguji proxy secara lokal:

```bash
npm run build
npx wrangler pages dev out
# lalu buka http://localhost:8788/api/vital/Pengmas-1?last30
```

Harapan: JSON dengan `"count": 30`.

---

## Deploy ke Cloudflare Pages

**PENTING: Direct Upload dari dashboard Cloudflare TIDAK mendukung Pages Functions.**
Karena project ini bergantung pada Function untuk data (lihat bagian Proxy di atas), deploy
**harus** lewat Git integration atau Wrangler. Kalau memakai Direct Upload, landing page akan
tampil tetapi data sensor tidak akan bisa diambil.

### Langkah (Git integration)

1. Push repo ini ke GitHub.
2. Buka Cloudflare dashboard, pilih **Workers & Pages**, klik **Create application**.
3. Pilih tab **Pages**, lalu **Import an existing Git repository**.
4. Pilih repo ini.
5. Isi setelan build:

   | Setelan | Nilai |
   |---|---|
   | Project name | `pengmas-air-quality` |
   | Framework preset | **Next.js (Static HTML Export)** |
   | Build command | `npx next build` |
   | Build output directory | `out` |

6. Environment variable (opsional): `API_ORIGIN`, bila ingin menimpa asal API tanpa mengubah
   kode. Default sudah tertanam di Function.
7. Simpan. Setiap push ke `main` akan build dan deploy otomatis.

### `_routes.json`

File ini **dibuat otomatis** oleh Cloudflare Pages karena direktori `functions/` terdeteksi.
Tujuannya mengecualikan aset statis dari pemanggilan Function, sehingga kuota Functions hanya
terpakai untuk panggilan `/api/*`. Jangan menulisnya manual kecuali memang perlu
mengecualikan route tertentu.

---

## Catatan versi dependensi

- **React dipin ke `19.2.8`, bukan `19.3.x`.** `@react-three/fiber@9.7.0` mensyaratkan peer
  dependency `react >=19 <19.3`, sedangkan `react@latest` (`19.3.0`) berada di luar rentang
  itu. Jangan menaikkan React tanpa memeriksa ulang peer dependency R3F.
- **Jangan memakai `--force` atau `--legacy-peer-deps`** untuk menyelesaikan konflik peer.
  Turunkan versi paket yang bertabrakan.

---

## Batasan static export

`output: 'export'` menonaktifkan fitur berikut. Menambahkannya akan **gagal saat build**:

- `middleware.ts`, `rewrites`, `redirects`, `headers`
- Incremental Static Regeneration (ISR)
- Server Actions, `cookies()`, Draft Mode, Intercepting Routes
- Route Handlers yang bergantung pada `Request` (hanya GET statis yang boleh)
- Dynamic Routes tanpa `generateStaticParams()`
- `next/image` dengan loader default (project ini memakai `unoptimized: true` dan `<img>`)

Itu sebabnya **tidak ada** routing locale `/[locale]/`; dwibahasa ditangani lewat kamus dan
state klien.

---

## Data mock vs data asli

`src/lib/mock.ts` berisi **data sintetis**, bukan pembacaan sensor asli. Rilis 1 memakainya
untuk membangun tampilan.

Untuk menyambungkan ke data asli: ganti pemanggilan `getMockVitals()` dengan
`fetchAllDevices()` dari `src/lib/api.ts`. Pages Function sudah siap sejak awal, jadi tidak
ada perubahan lain yang diperlukan.

Data yang **tidak** ditampilkan karena field di API selalu kosong (terverifikasi 0 dari 100
record): `NO2v`, `V_bat`, dan seluruh `*_valid`.

---

## Yang perlu dilengkapi manual

Beberapa nilai sengaja dibiarkan sebagai placeholder dan harus diisi setelah diverifikasi di
lapangan:

- **Nama ruangan** di `src/config/devices.ts` (masih `[NAMA RUANGAN n]`). API menyimpan
  koordinat yang sama untuk ketiga device, sehingga nama ruangan tidak dapat disimpulkan.
- **Teks Latar Belakang** dan deskripsi program di `src/config/strings.ts` (masih
  `[DIISI NANTI]`).

---

## Dokumen terkait

- `DESIGN.md` — spesifikasi visual: token warna, tipografi, struktur landing dan dashboard,
  ambang batas CO2, serta dial antislop yang mengikat keputusan motion.
- `REFERENSI_DESAIN.md` — konteks, riset proyek sejenis, dan standar ambang batas.
- `AGENTS.md` — konvensi kerja untuk agen dan kontributor.
