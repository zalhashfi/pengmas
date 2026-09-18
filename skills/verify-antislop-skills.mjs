#!/usr/bin/env node
/**
 * Pemeriksa kelengkapan skill antislop.
 *
 * Hanya MEMBACA filesystem dan melaporkan status. Tidak mengunduh apa pun,
 * tidak mengubah apa pun.
 *
 * Lokasi skill: `.agents/skills/<nama>/`, tempat `npx skills add` memasangnya.
 * Instalasi itu juga membuat junction `.claude/skills/` yang mengarah ke sini.
 * Junction itu artefak Claude Code dan HARUS dihapus, karena project ini memakai
 * omp, bukan Claude Code (lihat AGENTS.md).
 *
 * Pakai:
 *   node skills/verify-antislop-skills.mjs
 */

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(here, "..");
const skillsRoot = join(projectRoot, ".agents", "skills");

/** Skill antislop yang diharapkan, beserta file wajib di dalamnya. */
const EXPECTED = [
  { name: "antislop", files: ["SKILL.md"], note: "core" },
  { name: "antislop-ui", files: ["SKILL.md"] },
  { name: "antislop-copywriting", files: ["SKILL.md"] },
  { name: "antislop-human", files: ["SKILL.md", "contrast-check.py"] },
  { name: "antislop-layoutmobile", files: ["SKILL.md"] },
  { name: "antislop-code", files: ["SKILL.md"] },
];

/** Nama skill yang tercantum di blok pointer `AGENTS.md`. */
function readPointer() {
  const agentsPath = join(projectRoot, "AGENTS.md");
  if (!existsSync(agentsPath)) return { found: false, names: [] };

  const text = readFileSync(agentsPath, "utf8");
  const start = text.indexOf("<!-- antislop:start -->");
  const end = text.indexOf("<!-- antislop:end -->");
  if (start === -1 || end === -1) return { found: false, names: [] };

  const block = text.slice(start, end);
  // Pointer boleh berupa `antislop.md`, `skills/antislop-ui/SKILL.md`,
  // atau `.agents/skills/antislop-ui/SKILL.md`. Ambil nama folder-nya saja.
  const names = [...block.matchAll(/(?:\.agents\/)?skills\/([a-z0-9-]+)\//g)].map((m) => m[1]);
  const hasCore = /antislop\.md/.test(block);
  return { found: true, names: [...new Set(names)], hasCore };
}

function checkEntry({ name, files, note }) {
  const dir = join(skillsRoot, name);
  if (!existsSync(dir) || !statSync(dir).isDirectory()) {
    return { name, note, status: "MISSING", missing: files };
  }
  const missing = files.filter((f) => !existsSync(join(dir, f)));
  return { name, note, status: missing.length ? "INCOMPLETE" : "OK", missing };
}

/** Deteksi junction `.claude/skills` yang harus dihapus. */
function checkClaudeJunction() {
  const claudeDir = join(projectRoot, ".claude");
  if (!existsSync(claudeDir)) return { present: false, count: 0 };

  const skillsDir = join(claudeDir, "skills");
  let count = 0;
  try {
    if (existsSync(skillsDir)) count = readdirSync(skillsDir).length;
  } catch {
    // Abaikan: yang penting direktori .claude ada.
  }
  return { present: true, count };
}

function main() {
  console.log("Status skill antislop");
  console.log(`Project: ${projectRoot}`);
  console.log(`Lokasi skill: .agents/skills/\n`);

  const results = EXPECTED.map(checkEntry);
  for (const r of results) {
    const mark =
      r.status === "OK" ? "OK          " : r.status === "INCOMPLETE" ? "BELUM LENGKAP" : "BELUM ADA   ";
    const suffix = r.note ? ` (${r.note})` : "";
    const detail = r.missing.length > 0 ? `  kurang: ${r.missing.join(", ")}` : "";
    console.log(`  [${mark}] ${r.name}${suffix}${detail}`);
  }

  console.log("");

  const pointer = readPointer();
  if (pointer.found) {
    console.log(`Pointer AGENTS.md: ADA (core ${pointer.hasCore ? "disebut" : "TIDAK disebut"}, ${pointer.names.length} skill turunan disebut)`);
    const installed = results.filter((r) => r.status === "OK").map((r) => r.name);
    const missing = pointer.names.filter((n) => !installed.includes(n));
    if (missing.length > 0) {
      console.log("  PERINGATAN: pointer menyebut skill yang belum terpasang:");
      for (const n of missing) console.log(`    - ${n}`);
    } else if (pointer.names.length > 0) {
      console.log("  Cocok: semua skill yang disebut pointer sudah terpasang.");
    }
    if (!pointer.hasCore) {
      console.log("  PERINGATAN: pointer tidak menyebut `antislop.md` (core).");
    }
  } else {
    console.log("Pointer AGENTS.md: TIDAK ADA");
    console.log("  Tambahkan blok <!-- antislop:start --> ... <!-- antislop:end --> di akhir AGENTS.md.");
  }

  // Junction Claude harus tidak ada, karena project ini memakai omp.
  const claude = checkClaudeJunction();
  console.log("");
  if (claude.present) {
    console.log(`Artefak Claude Code: ADA (.claude/skills, ${claude.count} junction) - HARUS DIHAPUS`);
    console.log("  Project ini memakai omp, bukan Claude Code.");
    console.log("  Hapus dengan PowerShell:");
    console.log("    powershell -NoProfile -Command \"Get-ChildItem -Path '.claude\\skills' -Force | Where-Object { $_.LinkType -eq 'Junction' } | ForEach-Object { $_.Delete() }; Remove-Item -Path '.claude' -Recurse -Force\"");
  } else {
    console.log("Artefak Claude Code: tidak ada (benar)");
  }

  const complete = results.every((r) => r.status === "OK");
  console.log("");
  if (complete && !claude.present) {
    console.log("HASIL: skill antislop lengkap. Siap dipakai penuh.");
    console.log("Delivery Gate dijalankan dengan core + 5 skill turunan aktif.");
    process.exit(0);
  }

  if (!complete) {
    const need = results.filter((r) => r.status !== "OK");
    console.log(`HASIL: ${need.length} dari ${results.length} komponen belum lengkap.`);
    console.log("Pasang dengan: npx skills add miqdadbadjuber/anti-slop");
    console.log("Selama belum lengkap, Delivery Gate dijalankan memakai core saja,");
    console.log("dan keterbatasan itu WAJIB disebutkan di laporan.");
  } else {
    console.log("HASIL: skill lengkap, tetapi masih ada artefak Claude Code yang harus dihapus.");
  }
  process.exit(1);
}

main();
