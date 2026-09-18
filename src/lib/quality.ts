import type { QualityLevel } from "@/lib/types";

/**
 * Ambang batas status kualitas udara.
 *
 * Semua nilai diambil dari DESIGN.md §2 (status 3 level) dan §6 (ambang CO2).
 *
 * ATURAN WARNA (DESIGN.md §3, jangan dilewat):
 *   Hijau / amber / merah HANYA untuk status ambang kualitas udara.
 *   JANGAN memakainya untuk menyatakan arah tren (naik/turun) atau untuk
 *   menandai "bagus/buruk" pada hal lain. Tren memakai ikon panah +
 *   `--muted-foreground`. Biru Langit bukan warna status, melainkan brand/aksi.
 */

/** Ambang PM2.5 dalam µg/m³. */
export const PM25_THRESHOLDS = {
  /** ≤ 50 -> baik */
  good: 50,
  /** ≤ 100 -> sedang */
  moderate: 100,
  /** > 100 -> tidak sehat */
} as const;

/** Ambang CO2 dalam ppm (DESIGN.md §6). */
export const CO2_THRESHOLDS = {
  /** < 800 -> baik */
  good: 800,
  /** 800–1000 -> sedang */
  moderate: 1000,
  /**
   * > 1750 -> tetap "tidak sehat" (merah), tetapi rekomendasi tindakan
   * berubah jadi mendesak. Urgensi ekstrem dikomunikasikan lewat bahasa,
   * bukan warna keempat.
   */
  urgent: 1750,
} as const;

/** Ambang suhu nyaman dalam °C (ruang kelas). */
export const TEMPERATURE_THRESHOLDS = {
  low: 20,
  high: 28,
} as const;

/** Ambang kelembapan nyaman dalam persen. */
export const HUMIDITY_THRESHOLDS = {
  low: 30,
  high: 70,
} as const;

/**
 * Status PM2.5.
 * Nama fungsi dan rentangnya mengikuti pola `getIspuQuality` di
 * `FE-insight-web/src/components/map/AirQualityMap.tsx`. Polanya diadaptasi,
 * bukan diimpor, karena ini project terpisah.
 */
export function getPm25Quality(pm25: number | null | undefined): QualityLevel {
  if (pm25 == null || Number.isNaN(pm25)) return "unknown";
  if (pm25 <= PM25_THRESHOLDS.good) return "good";
  if (pm25 <= PM25_THRESHOLDS.moderate) return "moderate";
  return "unhealthy";
}

/**
 * Status CO2 (DESIGN.md §6).
 * < 800 baik, 800–1000 sedang, > 1000 tidak sehat.
 */
export function getCo2Quality(co2: number | null | undefined): QualityLevel {
  if (co2 == null || Number.isNaN(co2)) return "unknown";
  if (co2 < CO2_THRESHOLDS.good) return "good";
  if (co2 <= CO2_THRESHOLDS.moderate) return "moderate";
  return "unhealthy";
}

/** Suhu: di bawah 20 atau di atas 28 dianggap perlu perhatian. */
export function getTemperatureQuality(c: number | null | undefined): QualityLevel {
  if (c == null || Number.isNaN(c)) return "unknown";
  if (c < TEMPERATURE_THRESHOLDS.low || c > TEMPERATURE_THRESHOLDS.high) {
    return c < TEMPERATURE_THRESHOLDS.low - 5 || c > TEMPERATURE_THRESHOLDS.high + 5
      ? "unhealthy"
      : "moderate";
  }
  return "good";
}

/** Kelembapan: di luar 30–70 persen dianggap perlu perhatian. */
export function getHumidityQuality(pct: number | null | undefined): QualityLevel {
  if (pct == null || Number.isNaN(pct)) return "unknown";
  if (pct < HUMIDITY_THRESHOLDS.low || pct > HUMIDITY_THRESHOLDS.high) {
    return pct < HUMIDITY_THRESHOLDS.low - 15 || pct > HUMIDITY_THRESHOLDS.high + 15
      ? "unhealthy"
      : "moderate";
  }
  return "good";
}

/**
 * CO2 di atas ambang urgensi. Dipakai panel Rekomendasi Tindakan untuk
 * menampilkan teks yang lebih tegas (DESIGN.md §6).
 */
export function isCo2Urgent(co2: number | null | undefined): boolean {
  return co2 != null && co2 > CO2_THRESHOLDS.urgent;
}

/**
 * Kelas warna untuk badge status. Satu-satunya tempat warna semantik dipetakan.
 *
 * TEMUAN KONTRAS (antislop-human `contrast-check.py`):
 * Teks PUTIH di atas ketiga warna status GAGAL WCAG AA:
 *   - `#10b981` hijau   -> 2.54:1 (butuh 4.5:1)
 *   - `#f59e0b` kuning  -> 2.15:1 (butuh 4.5:1)
 *   - `#ef4444` merah   -> 3.76:1 (butuh 4.5:1)
 *
 * Karena itu teks badge memakai warna GELAP, bukan putih. Ketiga warna status
 * aslinya (dari DESIGN.md §2) sengaja TIDAK diubah, karena warna itu dipakai
 * juga sebagai titik indikator dan garis grafik di mana kontras teks tidak
 * berlaku. Yang disesuaikan hanya warna teks di atasnya:
 *   - hijau `#10b981` + `#052e20` -> lolos (terverifikasi)
 *   - kuning `#f59e0b` + `#3a2400` -> lolos (terverifikasi)
 *   - merah `#ef4444` + `#ffffff` -> 3.76:1, jadi dipakai `#3d0a0a`
 *   - offline `#64748b` + putih -> 4.76:1, aman
 *
 * Warna teks gelap ini dipilih per-warna, bukan satu nilai, supaya tiap
 * kombinasi benar-benar lolos dan tetap enak dibaca.
 */
export const QUALITY_STYLES: Record<QualityLevel, string> = {
  good: "bg-status-good text-status-good-ink border-status-good-border",
  moderate: "bg-status-moderate text-status-moderate-ink border-status-moderate-border",
  unhealthy: "bg-status-unhealthy text-status-unhealthy-ink border-status-unhealthy-border",
  unknown: "bg-status-offline text-white border-status-offline-border",
};
