/**
 * Cloudflare Pages Function: proxy data sensor.
 *
 * KENAPA PROXY INI WAJIB
 * ----------------------
 * API asli (`rndbirulangit.pythonanywhere.com`) tidak mengirim satu pun header
 * `Access-Control-Allow-Origin` (sudah diuji: 0 header CORS, termasuk pada
 * preflight OPTIONS). Browser akan memblokir panggilan langsung dari halaman.
 * Function ini membuat request dari sisi edge Cloudflare, lalu mengembalikan
 * hasilnya sebagai same-origin, sehingga tidak ada masalah CORS di browser.
 *
 * RUTE
 * ----
 * File `functions/api/[[path]].ts` menangkap semua kedalaman path setelah
 * `/api/`. Contoh: permintaan `/api/vital/Pengmas-1?last30` menghasilkan
 * `context.params.path = ['vital', 'Pengmas-1']`.
 *
 * CATATAN DEPLOY
 * --------------
 * `functions/` dibaca langsung oleh Cloudflare Pages dari repo, tidak ikut
 * dibangun oleh `next build`. Karena itu Direct Upload dari dashboard TIDAK
 * mendukung Function ini; deploy harus lewat Git integration atau Wrangler.
 * Lihat README.md.
 */

/// <reference types="@cloudflare/workers-types" />

interface Env {
  /** Opsional, untuk menimpa asal API tanpa mengubah kode. */
  API_ORIGIN?: string;
}

const DEFAULT_ORIGIN = "https://rndbirulangit.pythonanywhere.com";

/**
 * Prefiks path di server upstream. Rute PUBLIK kita tetap `/api/vital/<device>`
 * (dipakai `API_BASE` di `src/config/devices.ts`), lalu Function memetakannya ke
 * path upstream yang sebenarnya.
 *
 * Jangan menyamakan keduanya: path upstream yang benar adalah
 * `/api/get/vital_strategies/<device>`. Sudah diuji, `/api/vital/<device>` di
 * upstream menghasilkan HTTP 404.
 */
const UPSTREAM_PREFIX = "/api/get/vital_strategies";

/** Segmen path pertama yang diizinkan. Mencegah Function jadi open proxy. */
const ALLOWED_PREFIX = "vital";

/** Cache di edge. Data masuk tiap 2 menit, jadi 60 detik aman dan tidak basi. */
const CACHE_SECONDS = 60;

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ status: "error", message }), {
    status,
    headers: {
      "Content-Type": "application/json",
      // Error jangan di-cache, supaya pemulihan langsung terasa.
      "Cache-Control": "no-store",
    },
  });
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const segments = (context.params.path as string[] | undefined) ?? [];

  // Batasi cakupan: hanya /api/vital/* yang diteruskan. Tanpa ini, Function
  // bisa dipakai orang lain untuk memanggil path apa pun di server upstream.
  if (segments.length === 0 || segments[0] !== ALLOWED_PREFIX) {
    return jsonError("Rute tidak diizinkan. Gunakan /api/vital/<device>.", 400);
  }

  // Wajib ada nama device setelah prefiks, supaya kita tidak meneruskan
  // permintaan ke path upstream yang tidak bermakna.
  if (segments.length < 2 || !segments[1]) {
    return jsonError("Nama device wajib diisi. Gunakan /api/vital/<device>.", 400);
  }

  // Tolak segmen yang mencurigakan (mis. percobaan path traversal).
  if (segments.some((segment) => segment.includes("..") || segment.includes("/"))) {
    return jsonError("Path tidak valid.", 400);
  }

  const origin = context.env.API_ORIGIN ?? DEFAULT_ORIGIN;
  // `segments` = ['vital', '<deviceId>']; yang dikirim ke upstream hanya
  // nama device-nya, karena prefiks path upstream berbeda dari rute publik kita.
  const deviceSegment = segments.slice(1);
  const upstream = new URL(`${origin}${UPSTREAM_PREFIX}/${deviceSegment.join("/")}`);

  // TERUSKAN QUERY STRING. Ini wajib: tanpa `?last30`, API hanya mengembalikan
  // satu record, bukan 30. Kesalahan di baris ini membuat dashboard tampak
  // hampir kosong.
  upstream.search = new URL(context.request.url).search;

  try {
    const response = await fetch(upstream.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return jsonError(`Server data membalas HTTP ${response.status}.`, 502);
    }

    const body = await response.text();

    return new Response(body, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": `public, max-age=${CACHE_SECONDS}, s-maxage=${CACHE_SECONDS}`,
      },
    });
  } catch {
    // Kegagalan jaringan/DNS ke upstream. Kembalikan 502 supaya UI bisa
    // menampilkan status error yang jelas, bukan halaman kosong.
    return jsonError("Tidak dapat menghubungi server data.", 502);
  }
};
