// Sample data for the demo screens. Every screen that renders it shows the "Contoh" badge.

export type JenisKelamin = "L" | "P";

export type Pasien = {
  id: string;
  nama: string;
  nik: string;
  lahir: string;
  jk: JenisKelamin;
  kunjunganTerakhir: string | null;
};

export const PASIEN: Pasien[] = [
  { id: "p01", nama: "Sri Wahyuni", nik: "3174015203850001", lahir: "1985-03-12", jk: "P", kunjunganTerakhir: "2026-09-30" },
  { id: "p02", nama: "Bambang Setiadi", nik: "3174011107780002", lahir: "1978-07-11", jk: "L", kunjunganTerakhir: "2026-09-24" },
  { id: "p03", nama: "Nur Aisyah", nik: "3174016408960003", lahir: "1996-08-24", jk: "P", kunjunganTerakhir: "2026-09-18" },
  { id: "p04", nama: "Agus Pranoto", nik: "3174010201690004", lahir: "1969-01-02", jk: "L", kunjunganTerakhir: null },
  { id: "p05", nama: "Rina Marlina", nik: "3174015910010005", lahir: "2001-10-19", jk: "P", kunjunganTerakhir: "2026-08-30" },
];

export function cariPasien(id: string) {
  return PASIEN.find((p) => p.id === id) ?? null;
}

export function umur(lahir: string, acuan = new Date()) {
  const [y, m, d] = lahir.split("-").map(Number);
  let u = acuan.getFullYear() - y;
  const bulan = acuan.getMonth() + 1;
  if (bulan < m || (bulan === m && acuan.getDate() < d)) u--;
  return u;
}

const fmtTanggal = new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function tanggal(iso: string) {
  return fmtTanggal.format(new Date(`${iso}T00:00:00Z`));
}

export function formatNik(nik: string) {
  return nik.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export const JK_LABEL: Record<JenisKelamin, string> = { L: "Laki-laki", P: "Perempuan" };

export type Vital = {
  sistol: number;
  diastol: number;
  nadi: number;
  suhu: number;
  napas: number;
  berat: number;
  tinggi: number;
};

export const VITAL_CONTOH: Vital = { sistol: 118, diastol: 76, nadi: 88, suhu: 37.8, napas: 20, berat: 58, tinggi: 156 };

export const VITAL_FIELD: { key: keyof Vital; label: string; satuan: string; min: number; max: number; desimal?: boolean }[] = [
  { key: "sistol", label: "Sistol", satuan: "mmHg", min: 60, max: 260 },
  { key: "diastol", label: "Diastol", satuan: "mmHg", min: 30, max: 160 },
  { key: "nadi", label: "Nadi", satuan: "x/menit", min: 30, max: 220 },
  { key: "suhu", label: "Suhu", satuan: "°C", min: 34, max: 43, desimal: true },
  { key: "napas", label: "Napas", satuan: "x/menit", min: 6, max: 60 },
  { key: "berat", label: "Berat badan", satuan: "kg", min: 1, max: 300, desimal: true },
  { key: "tinggi", label: "Tinggi badan", satuan: "cm", min: 30, max: 230 },
];

export type Segmen = { id: string; pembicara: "Dokter" | "Pasien"; teks: string };

export const TRANSKRIP_CONTOH: Segmen[] = [
  { id: "s1", pembicara: "Dokter", teks: "Selamat pagi, Bu. Keluhannya apa?" },
  { id: "s2", pembicara: "Pasien", teks: "Batuk sudah tiga hari, Dok. Dahaknya putih." },
  { id: "s3", pembicara: "Dokter", teks: "Ada demam?" },
  { id: "s4", pembicara: "Pasien", teks: "Kalau malam agak panas. Tenggorokan juga sakit waktu menelan." },
  { id: "s5", pembicara: "Dokter", teks: "Sesak napas atau nyeri dada?" },
  { id: "s6", pembicara: "Pasien", teks: "Tidak, Dok." },
  { id: "s7", pembicara: "Dokter", teks: "Sudah minum obat?" },
  { id: "s8", pembicara: "Pasien", teks: "Obat batuk sirup dari warung, tapi belum membaik." },
  {
    id: "s9",
    pembicara: "Dokter",
    teks: "Tenggorokannya merah, paru bersih. Minum air hangat yang cukup, kontrol tiga hari lagi kalau belum membaik.",
  },
];

export type Bagian = "S" | "O" | "A" | "P";

export const BAGIAN: { key: Bagian; judul: string }[] = [
  { key: "S", judul: "Subjektif" },
  { key: "O", judul: "Objektif" },
  { key: "A", judul: "Asesmen" },
  { key: "P", judul: "Rencana" },
];

export type Kalimat = { id: string; teks: string; refs: string[]; dariVital?: boolean };
export type Soap = Record<Bagian, Kalimat[]>;

export const SOAP_CONTOH: Soap = {
  S: [
    { id: "k1", teks: "Batuk berdahak putih sejak 3 hari.", refs: ["s2"] },
    { id: "k2", teks: "Demam pada malam hari dan nyeri saat menelan.", refs: ["s4"] },
    { id: "k3", teks: "Tidak ada sesak napas atau nyeri dada.", refs: ["s5", "s6"] },
    { id: "k4", teks: "Sudah minum obat batuk bebas, belum membaik.", refs: ["s8"] },
  ],
  O: [
    {
      id: "k5",
      teks: "Suhu 37,8 °C, tekanan darah 118/76 mmHg, nadi 88 x/menit, napas 20 x/menit.",
      refs: [],
      dariVital: true,
    },
    { id: "k6", teks: "Faring hiperemis, paru bersih.", refs: ["s9"] },
  ],
  A: [{ id: "k7", teks: "Infeksi saluran napas atas akut.", refs: ["s2", "s4", "s9"] }],
  P: [
    { id: "k8", teks: "Parasetamol 500 mg bila demam.", refs: [] },
    { id: "k9", teks: "Minum air hangat yang cukup.", refs: ["s9"] },
    { id: "k10", teks: "Kontrol 3 hari lagi bila belum membaik.", refs: ["s9"] },
  ],
};

export type Icd = { kode: string; judul: string };

// Titles translated from the WHO ICD-10 / ICD-10-CM code set.
export const ICD10: Icd[] = [
  { kode: "A09", judul: "Diare dan gastroenteritis, dugaan infeksi" },
  { kode: "E11.9", judul: "Diabetes melitus tipe 2 tanpa komplikasi" },
  { kode: "I10", judul: "Hipertensi esensial (primer)" },
  { kode: "J00", judul: "Nasofaringitis akut (selesma)" },
  { kode: "J02.9", judul: "Faringitis akut, tidak spesifik" },
  { kode: "J06.9", judul: "Infeksi saluran napas atas akut, tidak spesifik" },
  { kode: "J20.9", judul: "Bronkitis akut, tidak spesifik" },
  { kode: "K30", judul: "Dispepsia" },
  { kode: "L30.9", judul: "Dermatitis, tidak spesifik" },
  { kode: "M79.1", judul: "Mialgia" },
  { kode: "R05", judul: "Batuk" },
  { kode: "R50.9", judul: "Demam, tidak spesifik" },
  { kode: "Z34.9", judul: "Pengawasan kehamilan normal, tidak spesifik" },
];

export const SARAN_ICD: { kode: string; alasan: string; refs: string[] }[] = [
  {
    kode: "J06.9",
    alasan: "Batuk 3 hari, demam malam, nyeri menelan, faring hiperemis, paru bersih.",
    refs: ["s2", "s4", "s9"],
  },
  {
    kode: "J02.9",
    alasan: "Nyeri menelan dan faring hiperemis cocok dengan radang tenggorokan, tapi batuk berdahak lebih menonjol.",
    refs: ["s4", "s9"],
  },
  {
    kode: "J20.9",
    alasan: "Batuk berdahak mendukung bronkitis, tapi paru bersih sehingga kurang cocok.",
    refs: ["s2", "s9"],
  },
];

export function judulIcd(kode: string) {
  return ICD10.find((i) => i.kode === kode)?.judul ?? null;
}
