# Skill antislop

Folder ini berisi **perkakas pemeriksa** untuk skill antislop. Skill itu sendiri
ada di `.agents/skills/`, tempat `npx skills add` memasangnya.

## Status saat ini

| Komponen | Lokasi |
|---|---|
| Core (`antislop.md`) | root project |
| `antislop` (skill) | `.agents/skills/antislop/SKILL.md` |
| `antislop-ui` | `.agents/skills/antislop-ui/SKILL.md` |
| `antislop-copywriting` | `.agents/skills/antislop-copywriting/SKILL.md` |
| `antislop-human` | `.agents/skills/antislop-human/` (+ `contrast-check.py`) |
| `antislop-layoutmobile` | `.agents/skills/antislop-layoutmobile/SKILL.md` |
| `antislop-code` | `.agents/skills/antislop-code/SKILL.md` |

Terpasang dari `miqdadbadjuber/anti-slop`, tercatat di `skills-lock.json`.

## Memasang atau memperbarui

```bash
npx skills add miqdadbadjuber/anti-slop
```

Perintah itu memasang ke `.agents/skills/` **dan** membuat junction
`.claude/skills/` yang mengarah ke sana. **Junction itu harus dihapus**, karena
project ini memakai omp, bukan Claude Code:

```bash
powershell -NoProfile -Command "Get-ChildItem -Path '.claude\skills' -Force | Where-Object { $_.LinkType -eq 'Junction' } | ForEach-Object { $_.Delete() }; Remove-Item -Path '.claude' -Recurse -Force"
```

## Memeriksa kelengkapan

```bash
node skills/verify-antislop-skills.mjs
```

Skrip hanya membaca dan melaporkan. Ia memeriksa:

1. Keenam komponen ada, termasuk `contrast-check.py` untuk `antislop-human`.
2. Blok pointer di `AGENTS.md` cocok dengan yang benar-benar terpasang.
3. Tidak ada artefak `.claude/` yang tertinggal.

Exit code 0 berarti lengkap. Exit code 1 berarti ada yang perlu dibereskan.

## Untuk apa masing-masing

| Skill | Dipakai saat |
|---|---|
| `antislop` (core) | Selalu. Filter dasar, berisi R-01 sampai R-38 dan Delivery Gate |
| `antislop-ui` | Membangun atau mengubah tampilan: warna, layout, komponen, dekorasi, motion |
| `antislop-copywriting` | Menulis teks: judul, CTA, value proposition, nada, teks landing |
| `antislop-human` | Kontras, keyboard, fokus, state. Termasuk pemeriksa kontras otomatis |
| `antislop-layoutmobile` | Layout yang reflow antar ukuran layar: breakpoint, skala, grid, overflow, target sentuh |
| `antislop-code` | Komentar kode: membuang yang bergenerik, menyisakan yang berguna |

## Pemeriksa kontras otomatis

`antislop-human` membawa `contrast-check.py`, sehingga kontras bisa diukur tanpa
menulis skrip sendiri:

```bash
python .agents/skills/antislop-human/contrast-check.py --help
```

Jalankan `--help` lebih dulu untuk melihat argumen yang tersedia di versi ini.
