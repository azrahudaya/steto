export type Peran = "admin" | "dokter" | "bidan" | "perawat" | "rekam_medis";

export const PERAN_LABEL: Record<Peran, string> = {
  admin: "Admin",
  dokter: "Dokter",
  bidan: "Bidan",
  perawat: "Perawat",
  rekam_medis: "Rekam medis",
};

export function bacaPeran(v: unknown): Peran | null {
  if (typeof v !== "string") return null;
  const k = v.trim().toLowerCase().replace(/\s+/g, "_");
  return k in PERAN_LABEL ? (k as Peran) : null;
}

// Mirrors the access table in the build spec (section 4). The API enforces it; the UI only hides controls.
const AKSES = {
  tambahPasien: ["admin", "perawat", "dokter", "bidan"],
  vital: ["admin", "perawat", "dokter", "bidan"],
  rekam: ["admin", "dokter", "bidan"],
  tinjau: ["admin", "dokter", "bidan", "rekam_medis"],
  setujui: ["admin", "dokter", "bidan"],
} satisfies Record<string, Peran[]>;

export type Aksi = keyof typeof AKSES;

export function boleh(p: Peran | null, aksi: Aksi) {
  return p !== null && (AKSES[aksi] as Peran[]).includes(p);
}
