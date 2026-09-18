# Referensi Desain Dashboard Pengmas — Kualitas Udara Sekolah

Dokumen ini adalah hasil pengumpulan sumber referensi desain dari internet untuk dashboard
pemantauan kualitas udara (indoor air quality / IAQ) di sekolah, dalam konteks project
pengabdian masyarakat (Pengmas).

Status: **riset referensi — belum ada kode**. Direktori project masih kosong.

---

## 1. Konteks: mengapa dashboard kualitas udara sekolah itu berbeda

Dari literatur (SAMHE Project, UK — *Citizen Science: Theory and Practice*, 2023), ada beberapa
karakteristik yang membedakan dashboard sekolah dari dashboard monitoring industri:

| Aspek | Karakteristik dashboard sekolah | Implikasi desain |
|---|---|---|
| Audiens | Guru, siswa, orang tua, peneliti, kepala sekolah | Multi-persona, bahasa harus awam |
| Tujuan | Membuat polusi yang **tak terlihat** menjadi terlihat & menggerakkan aksi (buka jendela) | Angka tunggal besar + rekomendasi tindakan, bukan tabel mentah |
| Engagement | Riset menunjukkan minat turun drastis (~90%) setelah 12 minggu | Perlu gamifikasi, aktivitas, elemen interaktif non-data |
| Hardware | Umumnya sensor murah: CO2, suhu, RH; kadang PM2.5, VOC, CO | Fokus metrik: CO2 sebagai proksi ventilasi |
| Konteks | Perlu metadata (lokasi sensor, aktivitas kelas) agar data bisa diinterpretasi | Form input konteks + anotasi waktu |

**Kesimpulan penting:** polusi udara "sering tidak terlihat" (SAMHE), sehingga pekerjaan utama
dashboard adalah **visualisasi + penerjemahan ke tindakan**, bukan sekadar menyajikan grafik.

Sumber:
- SAMHE Web App (co-design dengan sekolah): https://theoryandpractice.citizenscienceassociation.org/articles/10.5334/cstp.620
- PDF versi penuh: https://eprints.whiterose.ac.uk/id/eprint/206863/1/656714678b5c8.pdf

---

## 2. Referensi proyek sejenis (paling relevan — pelajari ini dulu)

### 2.1 SAMHE Web App (UK) — **referensi utama**
Web app hasil co-design dengan guru & siswa UK, dipakai ratusan sekolah.
- Menampilkan data real-time monitor di kelas secara "mudah dipahami".
- Dua fungsi: (a) lihat data kelas, (b) tool edukasi + eksperimen + gamifikasi.
- Pelajaran desain dari proses co-design mereka:
  - Siswa & guru sama-sama dilibatkan; tanpa guru, siswa bisa salah paham soal kualitas udara.
  - Guru punya waktu sangat terbatas → opsi feedback async (Padlet), polling singkat.
  - Konten video disukai; mereka menanyakan durasi video yang tepat.
  - Navigasi & struktur diuji lewat dua opsi layout homepage yang ditunjukkan ke sekolah.
  - Gamifikasi (badge, kuis, aktivitas) dipakai untuk menahan engagement.
- **Kenapa penting:** ini satu-satunya referensi yang secara eksplisit membahas desain visualisasi
  data IAQ untuk audiens sekolah, termasuk hasil evaluasi preferensi penggunanya.

### 2.2 Boston Public Schools IAQ Dashboard (AS) — **referensi skala besar**
- 4.400 sensor indoor + 118 sensor rooftop; dashboard publik untuk siswa, orang tua & staf.
- Ada studi lanjutan (The Lancet, 2025) soal "decision tools" untuk sekolah menggunakan monitor
  CO2 berkelanjutan — berguna untuk tahu informasi apa yang benar-benar dipakai pengambil keputusan.
- Sumber: https://www.bostonpublicschools.org/students-families/respiratory-illness-protocols/air-quality/indoor-air-quality-sensor-dashboard
- Studi: https://www.thelancet.com/pdfs/journals/lanam/PIIS2667-193X(25)00158-9.pdf
- Case study USGBC: https://www.usgbc.org/sites/default/files/2025-12/CFGS_Boston-Public-Schools-IAQ-Monitoring_2025.pdf

### 2.3 AMBER / IES CO2 Dashboard (UK) — **referensi tampilan display kelas**
- Dashboard CO2 untuk monitoring ventilasi, target < 1000 ppm.
- Poin desain menarik: mereka sengaja memakai **layar besar & terang + avatar yang mengajak**
  ("engaging avatar") untuk memicu tindakan buka jendela — bukan hanya angka.
- Sumber: https://www.iesve.com/products/case-studies/18325/co2-dashboards-schools

### 2.4 Dashboard komersial (ambil pola UI, bukan konteksnya)
- **Airthings for Business** — https://www.airthings.com/business/dashboard
  Pola: kartu ringkas per ruangan, indikator warna, tren harian, perbandingan antar-ruang.
- **IQAir AirVisual Enterprise Dashboard** — https://www.iqair.com/commercial-air-quality-monitors/enterprise-dashboard
  Pola: peta real-time, status perangkat, detail polutan, alert.
- **PurpleAir Real-Time Map** — https://www.purpleair.com/real-time-map
  Pola: peta sensor komunitas + update real-time (relevan kalau ada banyak titik sensor di sekolah).
- **AirGradient** (hardware yang dipakai SAMHE) — https://www.airgradient.com/
- **air-Q** (contoh halaman edukasi ruang kelas) — https://en.air-q.com/luftqualitaet-im-klassenzimmer

---

## 3. Prinsip & pedoman desain dashboard

### 3.1 Stephen Few — *Information Dashboard Design*
Referensi klasik & paling sering dikutip. Inti yang relevan:
- Dashboard = tampilan visual informasi yang dibutuhkan **untuk dipantau sekilas (at-a-glance)**.
- Hindari "13 kesalahan umum dashboard" — antara lain: melebihi kapasitas layar tanpa scroll,
  memilih grafik yang salah, dekorasi berlebihan, warna tidak konsisten, teks berlebih,
  tidak ada hierarki visual, angka tidak berkonteks.
- Terapkan prinsip **perceptual zen**: minimalkan noise, maksimalkan data-ink ratio.
- Catatan: untuk dashboard ini, karena tujuan utamanya *mendorong aksi* (bukan analisis ahli),
  sebagian prinsip Few perlu dilonggarkan (misal warna status yang mencolok justru diinginkan).

Sumber:
- https://www.tableau.com/blog/stephen-few-data-visualization
- https://www.toptal.com/designers/data-visualization/dashboard-design-best-practices
- https://www.pencilandpaper.io/articles/ux-pattern-analysis-data-dashboards

### 3.2 Pola UX dashboard yang terbukti
- Hierarki: **status keseluruhan → metrik kunci → detail → tren historis**.
- Satu pertanyaan utama per kartu ("Bagaimana udara di kelas 5A sekarang?").
- Nilai harus selalu berpasangan dengan konteks: ambang batas, tren, atau perbandingan.
- Filter waktu (hari ini / minggu / bulan) untuk analisis; tampilan default harus "sekarang".
- Desain responsif — akan dilihat dari HP (orang tua) dan proyektor/layar kelas (guru).

---

## 4. Standar warna & ambang batas (WAJIB dipakai)

### 4.1 Skala AQI EPA (untuk PM2.5 / polutan luar)
Sumber resmi: https://www.airnow.gov/aqi/aqi-basics

| Warna | Level | Nilai Indeks |
|---|---|---|
| Hijau | Good | 0–50 |
| Kuning | Moderate | 51–100 |
| Oranye | Unhealthy for Sensitive Groups | 101–150 |
| Merah | Unhealthy | 151–200 |
| Ungu | Very Unhealthy | 201–300 |
| Maroon | Hazardous | 301+ |

Kode warna resmi EPA bisa diambil dari AirNow (perhatikan juga standar aksesibilitas & kontras
yang mereka sediakan dalam PDF "AQI Basics" print version).

### 4.2 WHO Global Air Quality Guidelines 2021 (untuk target polutan)
Sumber: https://www.who.int/publications/i/item/9789240034228
- PM2.5: tahunan **5 µg/m³**, 24 jam **15 µg/m³**
- PM10: tahunan **15 µg/m³**, 24 jam **45 µg/m³**
- (juga ada guideline untuk O3, NO2, SO2, CO)

Catatan: WHO 2021 jauh lebih ketat dari 2005, sehingga dashboard sebaiknya menampilkan
**garis ambang WHO di grafik**, bukan hanya warna status.

### 4.3 Ambang CO2 untuk ruang kelas (metrik utama)
CO2 bukan polutan berbahaya di level rendah, tapi **proksi laju ventilasi**.

| Ambang (ppm) | Interpretasi | Sumber |
|---|---|---|
| ~400–450 | Level udara luar (baseline) | umum |
| < 700 | Diinginkan jika paparan 6–8 jam dengan 20–25 orang | ScienceDirect (2023) |
| ~800 | Target ventilasi baik (≈ 7 L/s per orang) | LBNL |
| > 1000 | Ventilasi **tidak memadai**; dikaitkan dengan menurunnya kehadiran sekolah | LBNL / PubMed (2014) |
| 1200–1500 | Batas "dapat diterima" (banyak panduan) | Cardiff Univ. (2023) |
| > 1750 | Perlu ventilasi tambahan segera | Cardiff Univ. (2023) |

**Saran implementasi:** pakai 3–4 zona (hijau < 800, kuning 800–1000, oranye 1000–1500,
merah > 1500) dan tampilkan garis ambang eksplisit di grafik tren.

Sumber:
- https://eta-publications.lbl.gov/sites/default/files/pdf_5.pdf (LBNL, literature review ventilasi sekolah)
- https://www.sciencedirect.com/science/article/pii/S187603412300165X
- https://pubmed.ncbi.nlm.nih.gov/25117890 (CO2 > 1000 ppm & kehadiran)
- https://orca.cardiff.ac.uk/id/eprint/157267/4/sustainability-15-04803.pdf
- https://www.energy.gov/sites/default/files/2025-09/ventilation-assessment-and-action-guide_september-2025.pdf

### 4.4 Suhu & kelembapan (metrik pendukung)
- Anak-anak cenderung nyaman pada suhu sedikit lebih dingin dari orang dewasa.
- Referensi: ~22 °C nyaman; ketidaknyamanan meningkat di atas 27 °C (Eropa).
- Sumber: Sadrizadeh et al. (2022), via SAMHE.

---

## 5. Inspirasi visual (UI/gaya) — sumber yang bisa langsung dibuka

> Catatan: Dribbble memblokir akses otomatis (CAPTCHA), jadi link galeri tetap disertakan untuk
> kamu buka manual di browser. Figma Community & GitHub bisa diakses langsung.

### 5.1 Galeri visual (buka manual di browser)
- **Dribbble — air quality dashboard**: https://dribbble.com/search/air-quality-dashboard
- **Dribbble — indoor air**: https://dribbble.com/search/indoor-air
- **Dribbble — tag air quality index**: https://dribbble.com/tags/air-quality-index
- **Behance — monitoring dashboard**: https://www.behance.net/search/projects/monitoring%20dashboard
- **Behance — weather dashboard UI**: https://www.behance.net/search/projects/weather%20dashboard%20ui%20design

### 5.2 Figma Community — UI kit yang bisa langsung dipakai/di-remix
- **Environmental monitoring system** (IoT hutan mangrove Can Gio; statistik, laporan, peringatan):
  https://www.figma.com/community/file/1244549887270328586/environmental-monitoring-system
  → **paling relevan**: struktur "statistik → laporan → warning" persis kebutuhan dashboard pengmas.
- **Atmy — Air Quality App UI Kit**:
  https://www.figma.com/community/file/1579166571871961418/atmy-air-quality-app-ui-kit
- **Dashboard Design System (SnowUI)** — dasar komponen dashboard generik:
  https://www.figma.com/community/file/1181054157767467767/dashboard-design-system
- **Web App — Sustainability Dashboard & Assessment Tool**:
  https://www.figma.com/community/file/1512551413010977543/web-app-sustainability-dashboard-and-assessment-tool-templates-for-figma-ui-figma-template
- **Katalog UI kit dashboard di Figma Community** (jelajahi lebih banyak):
  https://www.figma.com/community/ui-kits/dashboards

### 5.3 Referensi kode terbuka (bisa dibaca langsung, ada screenshot di README)
- **danielrosehill/HA-Air-Quality-Dashboard** — dashboard Home Assistant dengan **6 skala warna AQI
  yang sudah dipetakan ke kode warna** (Green→Maroon). Ada folder `screenshots/`.
  **Pelajaran penting dari README-nya**: gauge kartu bawaan HA hanya mendukung **3 level keparahan**,
  padahal AQI butuh **6 level** — jadi warna berbasis ambang lebih tepat daripada gauge sederhana.
  https://github.com/danielrosehill/HA-Air-Quality-Dashboard
- **gake572/AirGuard** — platform crowdsourced real-time: MQTT/HTTP ingest → TimescaleDB →
  peta interaktif (Leaflet) + grafik (Plotly) + alert ambang batas + forecast 24 jam (Prophet).
  Arsitektur paling lengkap untuk ditiru jika sensor > 1 titik.
  https://github.com/gake572/AirGuard
- **jlofw/air-quality-monitor** — PM2.5, PM10, CO2, humidity, suhu via MQTT → Node-RED → InfluxDB → Grafana.
  Referensi untuk stack data pipeline (bukan UI).
  https://github.com/jlofw/air-quality-monitor
- **parcheesime/airthings-dashboard** — dashboard **indoor** air quality pakai API Airthings.
  https://github.com/parcheesime/airthings-dashboard
- **sonica799/AQI-Dashboard** dan **Law-chaos/Air_Quality_Dashboard** (Streamlit + Plotly) —
  contoh cepat untuk prototype; kurang cocok untuk produksi.
  https://github.com/sonica799/AQI-Dashboard · https://github.com/Law-chaos/Air_Quality_Dashboard

### 5.3b Pinterest — Modern SaaS Landing + Dashboard (referensi dari user)

- **Shortlink:** https://pin.it/31kUD8ufK
- **Pin asli:** https://www.pinterest.com/pin/21251429488148340/
- **Gambar:** https://i.pinimg.com/736x/77/8e/81/778e810f9e16715055284754673f23c5.jpg (736×1104)
- **Board:** https://www.pinterest.com/chylove0132/uxui/
- **Judul pin:** *"Modern SaaS Landing Page | Premium Dashboard UI Design"*
- **Deskripsi pin (verbatim):** *"Clean and modern SaaS landing page design featuring a premium
  3D dashboard interface, electric blue accents, minimalist typography, and futuristic UI
  components. Showcasing responsive web design, feature-rich dashboard layouts, and high-end
  startup website inspiration with professional agency-style aesthetics."*
- Repins: 42 · Pin dibuat 23 Mei 2026

**Status verifikasi:** ✅ **terverifikasi** — deskripsi visual di bawah berasal dari observasi
user terhadap gambar aslinya (bukan lagi dugaan dari metadata).

**Isi sebenarnya:** satu landing page SaaS fiktif bernama **Nexora** (produk B2B SaaS generik),
dengan **mockup dashboard ditempel di dalam hero** sebagai aset visual. Jadi ini
**landing page yang menampilkan dashboard**, bukan dashboard yang berdiri sendiri.

Struktur: Header/nav → Hero (badge, headline, sub, 2 CTA, 3 trust badge, mockup 3D isometric)
→ Social proof (6 logo monokrom) → Features grid 3×2 → Skalabilitas (kartu Team Performance +
daftar keunggulan) → (lanjutan tidak terlihat). Mockup dashboard-nya berisi: sapaan user,
4 KPI card (Revenue, Projects, Users, Tasks), line chart bulanan, tabel Top Projects,
feed Recent Activity, dan sidebar 7 item.

**Palet (angka pasti, dari analisis user):**

| Peran | Hex |
|---|---|
| Background | `#FFFFFF` + `#F8FAFC` |
| Primary | `#2563EB` (royal/kobalt) |
| Teks utama | `#0F172A` |
| Teks sekunder | `#64748B` |
| Metrik positif / negatif | Hijau / Merah |

Style: *Modern B2B SaaS, Bento Grid, Clean UI*, rounded corners, subtle shadows, aset 3D mengambang.

---

#### Penilaian untuk project pengmas

**Yang selaras (kabar baik):**

1. **Biru `#2563EB` sangat dekat dengan Biru Langit `#0079FE` FE-insight-web.** Ini
   memperkuat keputusan memakai brand biru yang sudah ada — dan **bertentangan** dengan
   `DESIGN.md` yang mendorong hijau `#66BB6A`. Dua referensi independen (Airy & Nexora)
   sekarang sama-sama mengarah ke biru.
2. **Tema terang** (`#FFFFFF`/`#F8FAFC`) + **rounded corners** + **subtle shadows** —
   konsisten dengan FE-insight-web (`--radius: 0.625rem`, light default + dark variant).
   Tidak ada konflik tema/radius seperti pada `DESIGN.md`.
3. **Trust badge & social proof** berguna untuk landing pengmas (logo sekolah/mitra/universitas).
4. **Skala tipografi** (`#0F172A` utama, `#64748B` sekunder) adalah konvensi slate yang bersih
   dan mudah dipetakan ke token Tailwind/shadcn yang sudah dipakai.
5. **Grid fitur 3×2** bisa dipetakan jadi grid metrik kualitas udara.

**Yang perlu diwaspadai:**

1. **Hero memuat mockup dashboard yang kompleks** — 4 KPI + line chart + tabel + activity feed
   dalam satu gambar 3D isometric. Untuk pengmas, mockup ini harus **berisi data kualitas udara
   yang nyata**, bukan KPI SaaS (Revenue/Users). Jangan salin kontennya, salin *strukturnya*.
2. **Elemen 3D isometric + globe + kristal** = beban render, dan di proyektor sekolah atau
   koneksi lambat ini merugikan. Tempat 3D ada di **landing page**, bukan di dashboard. Ini
   juga arah yang didorong `gpt-taste` / `high-end-visual-design` (GSAP/Awwwards) — cocok untuk
   landing, salah untuk dashboard operasional.
3. **KPI dengan indikator hijau/merah (+12.5%, −8%)** — pola ini **tidak boleh** dipakai apa
   adanya untuk status udara. Di sini hijau = "naik", merah = "turun". Untuk kualitas udara,
   hijau = "baik", merah = "buruk". **Konflik makna warna** yang sama seperti temuan di §6b.
   Bedakan dengan jelas: panah tren (naik/turun) vs. status ambang (baik/buruk).
4. **Ini referensi gaya, bukan domain.** Tidak ada CO2, PM2.5, ventilasi, atau ambang batas
   di mockup-nya. Untuk struktur data tetap rujuk §2, §4, dan §5.2.
5. **Copywriting penuh klaim pemasaran** ("Everything You Need to Succeed", "Scale Without
   Limits"). Pour pengmas, nada ini sebaiknya diganti bahasa faktual — sejalan dengan prinsip
   *"Bahasa lugas, faktual, tanpa hiperbola"* di DESIGN.md milik FE-insight-web.

**Ringkasan pemakaian:** ambil dari Nexora → **struktur landing page** (nav, hero, trust badge,
grid fitur, section skalabilitas), **palet biru terang**, dan **cara menempelkan preview
dashboard di hero**. Jangan ambil → konten SaaS-nya, elemen 3D berat, dan makna hijau/merah
sebagai tren.

### 5.4 Pola visual yang berulang & cocok untuk kasus ini
- Kartu besar dengan satu angka raksasa + label status berwarna (mis. "CO2 845 ppm — Perlu Ventilasi").
- Gauge setengah lingkaran / arc untuk nilai saat ini vs ambang batas.
- Sparkline + area chart dengan **garis ambang horizontal**.
- Kartu per-ruangan dengan status warna di kiri (cocok jika sensor > 1 titik).
- Mode gelap umum di galeri; tapi untuk layar kelas/proyektor, mode terang lebih terbaca siang hari
  (FE-insight-web sudah mendukung keduanya).

**Peringatan desain (dari studi AirGuard & HA-AQ-Dashboard):**
- Jangan pakai gauge 3-level untuk AQI 6-level — tidak cukup granular.
- Jangan taruh > 6-7 kartu tanpa hierarki → melanggar prinsip "at-a-glance" Stephen Few.
- Selalu tampilkan **waktu update terakhir**; sensor sekolah sering putus koneksi.

---

## 6. Referensi stack implementasi (jika pakai React/Next.js)

- **shadcn/ui charts** (Recharts-based) — https://ui.shadcn.com/charts
  Cocok untuk area chart, bar, line bergaris ambang, komponen kartu & badge status.
- **Contoh halaman dashboard shadcn resmi** (bisa jadi kerangka layout):
  https://github.com/shadcn-ui/ui/blob/main/apps/v4/app/(app)/examples/dashboard/page.tsx
- **shadcn chart examples** — https://www.shadcn.io/chart-examples
- Alternatif tanpa framework: Chart.js / ECharts / Plotly (Plotly bagus untuk garis ambang & zoom).

Pertimbangan "langsung tampil saat URL dibuka" (tanpa login):
- Jika hanya dashboard publik keluarga/sekolah yang menampilkan semua kelas, itu aman & sederhana.
- Jika dashboard per-kelas, pola khas: URL `/sekolah/[slug]/[kelas]` atau kode akses singkat.
- Tampilkan status "diperbarui X menit lalu" agar pengguna tahu data masih hidup/tidak.

---

## 6b. ⭐ REUSE dari FE-insight-web (repo internal kamu sendiri)

**Temuan penting:** di `C:/BACKUP D PARTISION/file kerja/LAB INSIGHT/WEB/FE-insight-web` sudah ada
project lain dengan **stack identik** dan brand yang sudah mapan. Dashboard Pengmas sebaiknya
memakai token yang sama agar konsisten sebagai satu keluarga produk Lab Insight.

File sumber: `FE-insight-web/DESIGN.md` dan `FE-insight-web/src/index.css`.

### Stack FE-insight-web (usulan: samakan)
React 19 · Vite 8 · TypeScript · Tailwind CSS v4 · shadcn/ui · Recharts 3 ·
TanStack Query 5 · Leaflet 1.9 · lucide-react · Geist Variable · react-router 7 · Vitest

### Token warna (salin apa adanya dari `src/index.css`)
Brand Primary **Biru Langit `#0079FE`** = `oklch(0.58 0.21 245)` (light) / `oklch(0.72 0.17 240)` (dark).

Semantic colors yang **sudah dipakai** di repo (dan relevan langsung untuk CO2/PM2.5):
- `#10b981` Emerald → kualitas Baik
- `#f59e0b` Amber → Sedang / peringatan dini
- `#ef4444` Red → Tidak Sehat / notifikasi EWS
- `#64748b` Slate → N/A / sensor offline

Chart series palette (`--chart-1` … `--chart-5`) sudah terdefinisi untuk light & dark.
Pemetaan metrik yang sudah dipakai FE-insight-web: PM2.5 = Biru/Cyan, Suhu = Amber/Red,
Kelembapan = Cyan/Indigo, CO = Purple/Emerald. **Tambahkan CO2** dengan warna yang belum terpakai.

### Logika domain yang bisa diangkat langsung
- `src/components/map/AirQualityMap.tsx` → fungsi `getIspuQuality(pm25)` memetakan PM2.5 ke
  `{ bg, border, label, textClass }` dengan 3 level (Baik ≤50, Sedang ≤100, Tidak Sehat >100).
  **Catatan:** ini skala ISPU, sedangkan standar EPA/WHO butuh 6 level — perlu diperluas,
  atau dibiarkan sesuai konvensi Indonesia (ISPU) dan didokumentasikan pilihannya.
- `AirQualityMap.tsx` sudah menangani: marker DivIcon kustom berwarna, dark-mode tile
  (`filter: invert(100%) hue-rotate(180deg)…`), status online/offline/warning, koordinat default
  area Telkom University Bandung (`-6.974, 107.63`).
- `src/components/charts/MultiStationComparisonChart.tsx` → pola `ChartConfig` multi-stasiun
  (1 garis per lokasi) + agregasi time-series dari interval 2 menit. Sudah ada test-nya.
- `src/lib/telemetryWindow.ts` → util `buildTelemetryWindow()` untuk membangun jendela waktu
  & mendeteksi stasiun yang punya data. Berguna untuk handle sensor mati.
- `src/services/telkomApi.ts` → pola layer service + TanStack Query dengan
  `staleTime: 1000 * 60 * 2` (refresh tiap 2 menit). Pola polling yang wajar untuk sensor.

### Komponen UI yang sudah tersedia
`src/components/ui/` (card, button, chart) + `src/components/charts/`, `src/components/map/`,
`src/components/landing/`. Layout landing FE-insight-web juga sudah punya pola yang bisa ditiru:
`LiveTelemetryPreview` = kartu metrik ringkas + LineChart interaktif dengan tooltip & legend standar.

### Yang perlu ditambah khusus untuk konteks sekolah
1. Ambang batas CO2 (repo saat ini hanya menangani PM2.5/suhu/RH/CO).
2. Panel **rekomendasi tindakan** ("buka jendela") — belum ada di FE-insight-web.
3. Blok edukasi / gamifikasi untuk siswa (temuan SAMHE soal engagement).
4. Hierarki visual "status keseluruhan" di paling atas untuk tampilan kelas.

---


## 7. Usulan struktur informasi (hasil sintesis)

Urutan blok dari atas ke bawah:

1. **Header**: nama sekolah / ruang, waktu update terakhir, indikator "LIVE".
2. **Kartu status utama**: satu skor besar + label + warna (mis. status ventilasi kelas).
3. **Baris metrik kunci** (4 kartu): CO2, Suhu, Kelembapan, PM2.5 — masing-masing dengan
   nilai, satuan, status warna, dan mini-tren.
4. **Grafik tren**: CO2 (dan/atau PM2.5) 24 jam terakhir dengan garis ambang WHO/CO2,
   bisa di-toggle harian/mingguan.
5. **Rekomendasi tindakan**: teks singkat & jelas — "Buka jendela 5–10 menit" — inilah nilai
   utama dashboard untuk sekolah.
6. **Perbandingan ruangan** (jika sensor banyak): kartu/grid status semua kelas.
7. **Konteks & edukasi**: penjelasan singkat apa arti CO2, suhu; tautan ke materi edukasi
   dan aktivitas (untuk menahan engagement jangka panjang, sesuai temuan SAMHE).

---

## 8. Hal yang masih perlu diputuskan sebelum implementasi

1. **Hardware & sumber data** — sensor apa, protokol apa (MQTT/HTTP/API), frekuensi data.
2. **Jumlah titik sensor** — satu kelas demo atau banyak kelas? Ini menentukan layout peta/grid.
3. **Akses** — publik tanpa login? URL per sekolah? Kode akses?
4. **Stack** — Next.js/React? Atau HTML+JS statis? (Direktori masih kosong.)
5. **Bahasa** — dashboard berbahasa Indonesia penuh (mengingat konteks pengmas)?
6. **Metrik final** — CO2 saja, atau termasuk PM2.5, suhu, kelembapan, VOC?
