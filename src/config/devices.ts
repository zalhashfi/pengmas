/**
 * Daftar perangkat sensor dan alamat API.
 *
 * Device di-hardcode karena API tidak menyediakan endpoint daftar device
 * (`/api`, `/api/list`, `/api/devices` semuanya 404). Tiga ID di bawah sudah
 * DIPASTIKAN mengembalikan data.
 *
 * `label` SENGAJA dibiarkan sebagai placeholder `[NAMA RUANGAN n]`. API hanya
 * menyimpan satu pasang koordinat yang sama untuk ketiga device
 * (`-6.2066787, 106.91971`), sehingga nama ruangan TIDAK BISA disimpulkan dari
 * data. Isi manual setelah dicek di lapangan. (antislop R-38: placeholder harus
 * terlihat sebagai placeholder, bukan dikarang jadi nama yang tampak final.)
 */

export type DeviceConfig = {
  /** Nilai yang dikirim ke API, mis. 'Pengmas-1'. */
  id: string;
  /** Nama tampilan. Placeholder sampai diisi manual. */
  label: string;
  /**
   * Tebakan awal, BELUM dikonfirmasi. Perlu diverifikasi di lapangan.
   * Dipakai dashboard untuk pengelompokan, bukan untuk perhitungan.
   */
  locationKind: "indoor" | "outdoor";
};

export const DEVICES: DeviceConfig[] = [
  { id: "Pengmas-1", label: "[NAMA RUANGAN 1]", locationKind: "indoor" },
  { id: "Pengmas-2", label: "[NAMA RUANGAN 2]", locationKind: "indoor" },
  { id: "Pengmas-3", label: "[NAMA RUANGAN 3]", locationKind: "outdoor" },
];

/**
 * Basis URL data. Same-origin, dilayani Cloudflare Pages Function
 * (`functions/api/[[path]].ts`), BUKAN dipanggil langsung ke PythonAnywhere.
 *
 * Alasan: API asli tidak mengirim satu pun header `Access-Control-Allow-Origin`,
 * jadi browser akan memblokir panggilan langsung. Proxy wajib.
 */
export const API_BASE = "/api/vital";

/** Jumlah titik data untuk grafik tren 1 jam (interval 2 menit). */
export const TREND_POINTS = 30;

/** Interval data dari server, dalam menit. */
export const SAMPLE_INTERVAL_MINUTES = 2;
