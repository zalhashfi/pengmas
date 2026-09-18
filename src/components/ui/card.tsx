import { cn } from "@/lib/utils";

/**
 * Kartu dasar.
 *
 * Satu radius untuk seluruh halaman (Shape Consistency Lock, anti-slop R-11):
 * `rounded-card` = 12px.
 *
 * `variant`:
 *   - `solid`  = kartu putih standar dengan border + shadow halus.
 *   - `glass`  = panel kaca dengan backdrop-blur (maks 2 per halaman, R-10).
 *   - `tinted` = latar `secondary` (bukan `primary/3%` yang membuat teks
 *     muted tidak terbaca), dengan border biru tipis.
 *
 * `elevation` memakai skala bertingkat (Dimensional Layering). Hover naik
 * satu tingkat untuk umpan balik fisik.
 */
export function Card({
  className,
  children,
  elevation = 1,
  variant = "solid",
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  elevation?: 1 | 2 | 3 | 4;
  variant?: "solid" | "glass" | "tinted";
  interactive?: boolean;
}) {
  const shadow = {
    1: "shadow-e1",
    2: "shadow-e2",
    3: "shadow-e3",
    4: "shadow-e4",
  }[elevation];

  const variantClass = {
    solid: "border border-border bg-card",
    glass: "glass-panel border-glass-border",
    tinted: "border border-primary/15 bg-secondary",
  }[variant];

  return (
    <div
      className={cn(
        "rounded-card p-6",
        variantClass,
        shadow,
        interactive &&
          "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-e3 active:scale-[0.98]",
        className,
      )}
    >
      {children}
    </div>
  );
}
