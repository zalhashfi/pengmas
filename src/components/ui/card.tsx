import { cn } from "@/lib/utils";

/**
 * Kartu dasar.
 *
 * Satu radius untuk seluruh halaman (Shape Consistency Lock, anti-slop R-11):
 * `rounded-card` = 12px, sesuai bahasa kartu pada referensi Nexora. Semua kartu
 * di landing memakai komponen ini supaya radius dan elevasinya tidak menyimpang.
 *
 * `elevation` memakai skala bertingkat (Dimensional Layering), bukan satu
 * bayangan untuk semua: kartu yang mengambang di atas latar (mis. panel hero)
 * memakai tingkat lebih tinggi daripada kartu yang duduk di dalam grid.
 */
export function Card({
  className,
  children,
  elevation = 1,
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  /** 1 = duduk di grid, 2 = sedikit menonjol, 3 = panel mengambang, 4 = paling atas. */
  elevation?: 1 | 2 | 3 | 4;
  /** Transisi hover naik satu tingkat elevasi. */
  interactive?: boolean;
}) {
  const shadow = {
    1: "shadow-e1",
    2: "shadow-e2",
    3: "shadow-e3",
    4: "shadow-e4",
  }[elevation];

  return (
    <div
      className={cn(
        "rounded-card border border-border bg-card p-6",
        shadow,
        interactive && "transition-shadow duration-200 hover:shadow-e3",
        className,
      )}
    >
      {children}
    </div>
  );
}
