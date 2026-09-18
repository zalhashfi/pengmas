/**
 * Penggabung kelas. Hanya meneruskan nilai yang truthy, lalu menyatukannya.
 *
 * Dipakai supaya komponen bisa menerima `className` dari luar tanpa kehilangan
 * kelas dasarnya. Untuk resolusi konflik Tailwind yang lebih pintar, `clsx` dan
 * `tailwind-merge` bisa ditambahkan nanti; untuk kebutuhan rilis ini, cara
 * sederhana ini cukup dan tidak menambah dependensi.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
