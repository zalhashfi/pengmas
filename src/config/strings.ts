/**
 * Kamus dwibahasa (Indonesia + Inggris) — SATU-SATUNYA sumber teks UI.
 *
 * Aturan:
 *  1. Kunci WAJIB identik di `id` dan `en`. Karena objek ini `as const`,
 *     TypeScript akan menolak build bila ada kunci yang hilang di salah satu
 *     bahasa (dijaga oleh tipe `Strings` di bawah).
 *  2. DILARANG menulis teks hardcoded di komponen. Semua lewat kamus ini.
 *  3. DILARANG memakai em dash (—) di teks UI (antislop R-02). Gunakan tanda
 *     hubung biasa atau susun ulang kalimatnya.
 *
 * Teks yang sengaja TIDAK diterjemahkan: nama brand INSIGHT, satuan dan istilah
 * teknis (CO2, PM2.5, ppm, °C, µg/m³), dan placeholder [NAMA RUANGAN n].
 */

export const STRINGS = {
  id: {
    meta: {
      languageName: "Indonesia",
      switchTo: "Ganti bahasa ke Inggris",
    },
    nav: {
      home: "Beranda",
      background: "Latar Belakang",
      metrics: "Metrik",
      howItWorks: "Cara Kerja",
      impact: "Dampak",
      dashboard: "Buka Dashboard",
      menu: "Menu",
    },
    theme: {
      toDark: "Aktifkan mode gelap",
      toLight: "Aktifkan mode terang",
    },
    hero: {
      badge: "INSIGHT",
      badgeFull: "Innovation and Sustainability for Geo-Environmental Health",
      title: "Udara Bersih untuk Ruang Belajar",
      titleAccent: "Ruang Belajar",
      lead: "Pemantauan CO2, suhu, kelembapan, dan PM2.5 di ruang kelas SMP Telkom, diperbarui setiap dua menit.",
      ctaPrimary: "Buka Dashboard",
      ctaSecondary: "Lihat cara kerja sensor",
      panelTitle: "Ringkasan Ruang",
      panelSubtitle: "Contoh tampilan",
      panelSample: "Contoh",
      panelNote: "Angka di panel ini contoh tampilan, bukan pembacaan sensor.",
      panelNoteWhere: "Data asli tersedia setelah dashboard dirilis.",
      trustNoLogin: "Tanpa login",
      trustRealtime: "Sensor diperbarui tiap 2 menit",
      trustIot: "Berbasis IoT",
      modelLoading: "Memuat model 3D",
      modelUnavailable:
        "Model 3D tidak dapat ditampilkan di perangkat ini. Data sensor tetap tersedia di dashboard.",
      modelAlt: "Ilustrasi alat pemantau kualitas udara",
    },
    background: {
      title: "Latar Belakang Pengmas",
      lead: "[RINGKASAN PROGRAM - DIISI NANTI]",
      blocks: [
        {
          title: "Latar Belakang",
          body: "[DESKRIPSI LATAR BELAKANG - DIISI NANTI]",
        },
        {
          title: "Tujuan",
          body: "[DESKRIPSI TUJUAN - DIISI NANTI]",
        },
        {
          title: "Lingkup",
          body: "[DESKRIPSI LINGKUP - DIISI NANTI]",
        },
      ],
    },
    metrics: {
      title: "Yang Diukur",
      lead: "Empat besaran yang paling menentukan kenyamanan dan kesehatan ruang kelas.",
      co2: {
        name: "CO2",
        unit: "ppm",
        description: "Penanda utama kualitas ventilasi kelas.",
      },
      temperature: {
        name: "Suhu",
        unit: "°C",
        description: "Kenyamanan termal saat kegiatan belajar.",
      },
      humidity: {
        name: "Kelembapan",
        unit: "%",
        description: "Pendukung kenyamanan dan kesehatan pernapasan.",
      },
      pm25: {
        name: "PM2.5",
        unit: "µg/m³",
        description: "Partikulat halus yang dapat masuk ke saluran napas.",
      },
      thresholdsTitle: "Ambang yang dipakai",
      thresholdsNote:
        "Tiga tingkat warna dipakai untuk semua metrik: hijau aman, kuning perlu dipantau, merah perlu tindakan.",
      levelGood: "Baik",
      levelModerate: "Sedang",
      levelUnhealthy: "Tidak Sehat",
    },
    workflow: {
      title: "Dari Sensor ke Keputusan",
      lead: "Empat langkah yang terjadi setiap dua menit, tanpa perlu admin mengawasi.",
      steps: [
        {
          title: "Sensor membaca",
          body: "Perangkat di tiap ruangan mengambil CO2, suhu, kelembapan, dan PM2.5.",
        },
        {
          title: "Data dikirim",
          body: "Pembacaan naik ke server setiap dua menit lewat jaringan sekolah.",
        },
        {
          title: "Ambang dinilai",
          body: "Tiap nilai dibandingkan ambang, lalu diberi satu dari tiga tingkat status.",
        },
        {
          title: "Guru bertindak",
          body: "Rekomendasi tampil lugas, misalnya membuka jendela selama lima menit.",
        },
      ],
    },
    impact: {
      title: "Kenapa Ini Penting",
      lead: "Kadar CO2 yang menumpuk menurunkan konsentrasi dan membuat mengantuk. Angka yang terlihat memungkinkan tindakan cepat.",
      points: [
        {
          title: "Ventilasi terukur",
          body: "Guru dapat melihat kapan jendela perlu dibuka, bukan menebak.",
        },
        {
          title: "Riwayat yang jujur",
          body: "Sensor yang mati ditandai jelas, bukan ditampilkan seolah masih hidup.",
        },
        {
          title: "Dasar keputusan sekolah",
          body: "Data satu jam terakhir menjadi dasar perbaikan tata udara ruang kelas.",
        },
      ],
    },
    dashboard: {
      title: "Dashboard sedang disiapkan",
      body: "Halaman pemantauan sedang dikerjakan dan akan tersedia pada rilis berikutnya.",
      backHome: "Kembali ke beranda",
    },
    footer: {
      tagline: "[DESKRIPSI SINGKAT - DIISI NANTI]",
      navigate: "Navigasi",
      channels: "Kanal",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      website: "Situs web",
      copyright: "Program pengabdian masyarakat INSIGHT untuk SMP Telkom.",
    },
    chart: {
      rangeHourly: "1 jam",
      rangeDaily: "Harian",
      rangeWeekly: "Mingguan",
    },
  },
  en: {
    meta: {
      languageName: "English",
      switchTo: "Switch language to Indonesian",
    },
    nav: {
      home: "Home",
      background: "Background",
      metrics: "Metrics",
      howItWorks: "How It Works",
      impact: "Impact",
      dashboard: "Go to Dashboard",
      menu: "Menu",
    },
    theme: {
      toDark: "Enable dark mode",
      toLight: "Enable light mode",
    },
    hero: {
      badge: "INSIGHT",
      badgeFull: "Innovation and Sustainability for Geo-Environmental Health",
      title: "Cleaner Air for the Classroom",
      titleAccent: "Classroom",
      lead: "Monitoring CO2, temperature, humidity, and PM2.5 in SMP Telkom classrooms, refreshed every two minutes.",
      ctaPrimary: "Go to Dashboard",
      ctaSecondary: "See how the sensor works",
      panelTitle: "Room Summary",
      panelSubtitle: "Layout sample",
      panelSample: "Sample",
      panelNote: "The numbers in this panel are a layout sample, not a sensor reading.",
      panelNoteWhere: "Real data becomes available once the dashboard ships.",
      trustNoLogin: "No login required",
      trustRealtime: "Sensors refresh every 2 minutes",
      trustIot: "IoT based",
      modelLoading: "Loading 3D model",
      modelUnavailable:
        "The 3D model cannot be displayed on this device. Sensor data remains available on the dashboard.",
      modelAlt: "Illustration of an air quality monitoring device",
    },
    background: {
      title: "Community Program Background",
      lead: "[PROGRAM SUMMARY - TO BE FILLED IN]",
      blocks: [
        {
          title: "Background",
          body: "[BACKGROUND DESCRIPTION - TO BE FILLED IN]",
        },
        {
          title: "Objective",
          body: "[OBJECTIVE DESCRIPTION - TO BE FILLED IN]",
        },
        {
          title: "Scope",
          body: "[SCOPE DESCRIPTION - TO BE FILLED IN]",
        },
      ],
    },
    metrics: {
      title: "What We Measure",
      lead: "Four readings that most determine classroom comfort and health.",
      co2: {
        name: "CO2",
        unit: "ppm",
        description: "The primary indicator of classroom ventilation quality.",
      },
      temperature: {
        name: "Temperature",
        unit: "°C",
        description: "Thermal comfort during learning activities.",
      },
      humidity: {
        name: "Humidity",
        unit: "%",
        description: "Supports comfort and respiratory health.",
      },
      pm25: {
        name: "PM2.5",
        unit: "µg/m³",
        description: "Fine particulates that can reach the airways.",
      },
      thresholdsTitle: "Thresholds in use",
      thresholdsNote:
        "Three colour levels apply to every metric: green is safe, amber needs watching, red needs action.",
      levelGood: "Good",
      levelModerate: "Moderate",
      levelUnhealthy: "Unhealthy",
    },
    workflow: {
      title: "From Sensor to Decision",
      lead: "Four steps that repeat every two minutes, with no admin watching over them.",
      steps: [
        {
          title: "The sensor reads",
          body: "A device in each room captures CO2, temperature, humidity, and PM2.5.",
        },
        {
          title: "Data is sent",
          body: "Readings travel to the server every two minutes over the school network.",
        },
        {
          title: "Thresholds are applied",
          body: "Each value is compared against its threshold, then given one of three status levels.",
        },
        {
          title: "The teacher acts",
          body: "A plain recommendation appears, such as opening a window for five minutes.",
        },
      ],
    },
    impact: {
      title: "Why It Matters",
      lead: "Accumulated CO2 reduces concentration and causes drowsiness. Visible numbers make fast action possible.",
      points: [
        {
          title: "Measured ventilation",
          body: "Teachers can see when a window needs opening instead of guessing.",
        },
        {
          title: "Honest history",
          body: "A dead sensor is clearly marked, not shown as if it were still alive.",
        },
        {
          title: "A basis for school decisions",
          body: "The last hour of data informs how classroom airflow is improved.",
        },
      ],
    },
    dashboard: {
      title: "Dashboard is being prepared",
      body: "The monitoring page is in progress and will be available in the next release.",
      backHome: "Back to home",
    },
    footer: {
      tagline: "[SHORT DESCRIPTION - TO BE FILLED IN]",
      navigate: "Navigation",
      channels: "Channels",
      instagram: "Instagram",
      linkedin: "LinkedIn",
      website: "Website",
      copyright: "INSIGHT community service program for SMP Telkom.",
    },
    chart: {
      rangeHourly: "1 hour",
      rangeDaily: "Daily",
      rangeWeekly: "Weekly",
    },
  },
} as const;

export type Lang = keyof typeof STRINGS;

/**
 * Pengaman bentuk kamus: kedua bahasa WAJIB punya struktur kunci yang sama.
 *
 * `as const` di atas membuat tipe literal per-string (mis. "Beranda"), sehingga
 * membandingkan `id` langsung dengan `en` akan selalu gagal karena teksnya
 * memang berbeda. Helper `Widen` melebarkan tipe string (dan array) menjadi
 * `string`, tetapi MEMPERTAHANKAN struktur objeknya. Hasilnya: kunci yang hilang
 * atau berlebih di salah satu bahasa akan gagal saat `next build`, sementara
 * perbedaan isi teks tetap diizinkan.
 */
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly Widen<U>[]
    : { readonly [K in keyof T]: Widen<T[K]> };

type Dictionary = Widen<(typeof STRINGS)["en"]>;

/** Baris ini gagal dikompilasi bila `id` dan `en` tidak sebentuk. */
export const _dictionaryShapeCheck: Record<Lang, Dictionary> = STRINGS;

export const DEFAULT_LANG: Lang = "en";
export const LANG_STORAGE_KEY = "pengmas-lang";
