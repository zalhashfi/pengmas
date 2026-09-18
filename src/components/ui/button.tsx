import { cn } from "@/lib/utils";

/**
 * Tombol dasar.
 *
 * Catatan primitive: DESIGN.md dan ekosistem project ini memakai pola shadcn
 * style `base-nova`. Tombol ini sengaja ditulis sebagai elemen native dengan
 * peta varian biasa, tanpa ketergantungan pada Radix, karena tombol tidak
 * membutuhkan primitive headless (tidak ada fokus-trap, tidak ada portal).
 * Saat nanti butuh komponen yang benar-benar stateful (dialog, dropdown),
 * gunakan Base UI (`@base-ui/react`), BUKAN Radix. Lihat AGENTS.md.
 *
 * Tombol teks WAJIB muat satu baris di desktop (DESIGN.md §7), karena itu
 * `whitespace-nowrap` dipasang di kelas dasar. Jangan membatasi lebar CTA.
 */

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium " +
  "transition-colors duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98]";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
  ghost: "hover:bg-accent hover:text-accent-foreground",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

/** Kelas tombol, diekspor agar bisa dipakai pada elemen <a> atau <Link>. */
export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}

type ButtonProps = React.ComponentProps<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}
