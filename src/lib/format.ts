/**
 * Helper format dan waktu.
 */

/**
 * Parser waktu API. WAJIB dipakai untuk semua timestamp dari API.
 *
 * API mengirim `"2026-09-19 02:16:00"` — memakai spasi, tanpa `T`, dan tanpa
 * info zona waktu. `new Date(str)` langsung TIDAK aman karena format ini tidak
 * dijamin dikenali semua engine JavaScript (Safari khususnya). Kita normalkan
 * spasi menjadi `T` lebih dulu.
 *
 * Format ini diperlakukan sebagai waktu lokal. Bila nanti perlu akurasi zona
 * waktu, bandingkan dengan `server_time` dari respons API.
 */
export function parseApiTime(value: string | null | undefined): Date | null {
  if (!value) return null;
  const normalized = value.trim().replace(" ", "T");
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Ubah Date menjadi timestamp ISO, atau null bila gagal. */
export function toIso(date: Date | null): string {
  return date ? date.toISOString() : "";
}

/** Jam:menit dalam format 24 jam, mis. "02:16". */
export function formatClock(date: Date | null): string {
  if (!date) return "--:--";
  return new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

/**
 * Angka sensor dengan jumlah desimal tetap, agar digit tidak melompat-lompat
 * saat nilai diperbarui (DESIGN.md §4).
 */
export function formatNumber(
  value: number | null | undefined,
  decimals = 0,
): string {
  if (value == null || Number.isNaN(value)) return "--";
  return value.toFixed(decimals);
}

/** Jarak waktu dalam bahasa manusia, mis. "2 menit lalu". */
export function formatRelativeTime(date: Date | null, now: Date = new Date()): string {
  if (!date) return "-";
  const diffSeconds = Math.round((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds < 0) return "baru saja";
  if (diffSeconds < 60) return `${diffSeconds} detik lalu`;

  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;

  return `${Math.floor(hours / 24)} hari lalu`;
}

/**
 * Ambang "data basi". Data masuk setiap 2 menit, jadi 10 menit tanpa data baru
 * berarti sensor bermasalah. Design brief (DESIGN.md §6) mewajibkan status basi
 * ditampilkan eksplisit, bukan angka lama yang dibiarkan tampak hidup.
 */
export const STALE_AFTER_MINUTES = 10;

export function isStale(date: Date | null, now: Date = new Date()): boolean {
  if (!date) return true;
  return (now.getTime() - date.getTime()) / 60000 > STALE_AFTER_MINUTES;
}
