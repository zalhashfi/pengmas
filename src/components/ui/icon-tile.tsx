import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Kotak ikon bergaya referensi Nexora: kotak rounded dengan latar biru tipis,
 * ikon berwarna biru lebih gelap di atasnya.
 *
 * Ini menggantikan ikon telanjang. Alasannya tertulis (anti-slop R-31):
 * kotak berwarna memberi jangkar visual pada setiap kartu fitur, sehingga mata
 * dapat memindai daftar tanpa membaca teks, dan konsisten dengan pola kartu
 * pada referensi.
 *
 * Ukuran dikunci agar semua ikon di halaman punya berat visual sama.
 */
export function IconTile({
  icon: Icon,
  className,
  tone = "brand",
}: {
  icon: LucideIcon;
  className?: string;
  /** `brand` = biru (metrik & fitur), `neutral` = netral (langkah proses). */
  tone?: "brand" | "neutral";
}) {
  return (
    <span
      className={cn(
        "grid size-10 shrink-0 place-items-center rounded-lg",
        tone === "brand" ? "bg-icon-tile text-icon-tile-fg" : "bg-secondary text-foreground",
        className,
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}
