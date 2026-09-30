export type JenisKelamin = "L" | "P";

export type Pasien = {
  id: string;
  nama: string;
  nik: string;
  ttl: string;
  usia: number;
  jenisKelamin: JenisKelamin;
  telp: string;
  alamat: string;
};

export const mockPasien: Pasien[] = [
  {
    id: "1",
    nama: "Budi Santoso",
    nik: "3171711203990001",
    ttl: "12 Maret 1999",
    usia: 27,
    jenisKelamin: "L",
    telp: "081234567890",
    alamat: "Jl. Merdeka No. 123",
  },
  {
    id: "2",
    nama: "Siti Aminah",
    nik: "3171711203990002",
    ttl: "25 Juni 1995",
    usia: 31,
    jenisKelamin: "P",
    telp: "081234567891",
    alamat: "Jl. Pahlawan No. 45",
  },
  {
    id: "3",
    nama: "Andi Wijaya",
    nik: "3171711203990003",
    ttl: "8 Agustus 2000",
    usia: 26,
    jenisKelamin: "L",
    telp: "081234567892",
    alamat: "Jl. Sudirman No. 67",
  },
  {
    id: "4",
    nama: "Dewi Lestari",
    nik: "3171711203990004",
    ttl: "15 Januari 1998",
    usia: 28,
    jenisKelamin: "P",
    telp: "081234567893",
    alamat: "Jl. Asia Afrika No. 89",
  },
  {
    id: "5",
    nama: "Eko Pratomo",
    nik: "3171711203990005",
    ttl: "30 November 2001",
    usia: 24,
    jenisKelamin: "L",
    telp: "081234567894",
    alamat: "Jl. Imam Bonjol No. 101",
  },
];

export const vitalDefault = {
  suhu: 36.5,
  sistol: 120,
  diastol: 80,
  nadi: 72,
  napas: 16,
  berat: 65,
  tinggi: 165,
};

export type Vital = {
  suhu: number;
  sistol: number;
  diastol: number;
  nadi: number;
  napas: number;
  berat: number;
  tinggi: number;
};

export type Kalimat = {
  id: string;
  teks: string;
  refs: string[];
  dariVital?: boolean;
};

export type Bagian = "S" | "O" | "A" | "P";

export const BAGIAN: { key: Bagian; judul: string }[] = [
  { key: "S", judul: "Subjektif" },
  { key: "O", judul: "Objektif" },
  { key: "A", judul: "Assessment" },
  { key: "P", judul: "Plan" },
];

export type Soap = Record<Bagian, Kalimat[]>;

export const TRANSKRIP_CONTOH = [
  { id: "t1", pembicara: "Dokter", teks: "Selamat pagi, Bu. Ada yang bisa saya bantu?" },
  { id: "t2", pembicara: "Pasien", teks: "Selamat pagi, Dok. Hari ini saya merasa pusing dan lelah sekali." },
  { id: "t3", pembicara: "Dokter", teks: "Sudah berapa hari ini terjadi?" },
  { id: "t4", pembicara: "Pasien", teks: "Kira-kira 3 hari terakhir, Dok. Terutama saat bangun tidur." },
  { id: "t5", pembicara: "Dokter", teks: "Apakah ada keluhan lain seperti mual, muntah, atau nyeri kepala?" },
  { id: "t6", pembicara: "Pasien", teks: "Tidak ada mual atau muntah, Dok. Tapi kepala memang terasa berat." },
  { id: "t7", pembicara: "Dokter", teks: "Bagus. Sudah berapa kali ukur tekanan darah di rumah?" },
  { id: "t8", pembicara: "Pasien", teks: "Sudah dua kali, Dok. Hasilnya 140/90 dan 135/85." },
  { id: "t9", pembicara: "Dokter", teks: "Baik, saya akan cek lagi sekarang." },
];

export const SOAP_CONTOH: Soap = {
  S: [
    { id: "s1", teks: "Pasien datang dengan keluhan pusing dan lelah yang dirasakan sejak 3 hari terakhir.", refs: ["t2"], dariVital: false },
    { id: "s2", teks: "Pasien tidak mengeluh mual atau muntah.", refs: ["t5", "t6"], dariVital: false },
    { id: "s3", teks: "Pasien sudah mengukur tekanan darah di rumah sebanyak 2 kali dengan hasil 140/90 dan 135/85.", refs: ["t8"], dariVital: false },
  ],
  O: [
    { id: "o1", teks: "Tanda vital: Suhu 36.5°C, Tekanan darah 120/80 mmHg, Nadi 72x/menit, Napas 16x/menit, Berat 65kg, Tinggi 165cm.", refs: [], dariVital: true },
    { id: "o2", teks: "Pasien tampak lemas namun kesadaran compos mentis.", refs: [], dariVital: false },
    { id: "o3", teks: "Tidak ditemukan tanda-tanda neurologis fokal.", refs: [], dariVital: false },
  ],
  A: [
    { id: "a1", teks: "Hipertensi grade I (ringan)", refs: [], dariVital: false },
    { id: "a2", teks: "Fatigue (kelelahan)", refs: [], dariVital: false },
  ],
  P: [
    { id: "p1", teks: "Lanjutkan pengobatan hipertensi yang sudah ada.", refs: [], dariVital: false },
    { id: "p2", teks: "Anjurkan pasien untuk istirahat cukup dan mengurangi aktivitas berat.", refs: [], dariVital: false },
    { id: "p3", teks: "Pertimbangkan penyesuaian dosis obat jika tekanan darah tidak membaik.", refs: [], dariVital: false },
    { id: "p4", teks: "Kontrol ulang dalam 2 minggu atau jika keluhan memburuk.", refs: [], dariVital: false },
  ],
};

export const ICD10 = [
  { kode: "I10", judul: "Hipertensi esensial (primer)" },
  { kode: "I11", judul: "Hipertensi yang disertai penyakit jantung" },
  { kode: "I12", judul: "Hipertensi yang disertai penyakit ginjal" },
  { kode: "I13", judul: "Hipertensi yang disertai penyakit jantung dan ginjal" },
  { kode: "R53", judul: "Kelelahan dan kelemahan umum" },
  { kode: "R51", judul: "Sakit kepala" },
  { kode: "R00", judul: "Kelainan detak jantung" },
  { kode: "R02", judul: "Gangguan sirkulasi perifer" },
  { kode: "R07", judul: "Nyeri dada" },
  { kode: "R06", judul: "Kelainan pernapasan" },
  { kode: "E11", judul: "Diabetes melitus tipe 2" },
  { kode: "E10", judul: "Diabetes melitus tipe 1" },
  { kode: "J06", judul: "Infeksi saluran pernapasan akut, lokalisasi tidak spesifik" },
  { kode: "J20", judul: "Bronkitis akut" },
  { kode: "J22", judul: "Infeksi saluran pernapasan akut, multiple" },
];

export const SARAN_ICD = [
  { kode: "I10", judul: "Hipertensi esensial (primer)", alasan: "Pasien menyebutkan hasil tekanan darah tinggi di rumah" },
  { kode: "R53", judul: "Kelelahan dan kelemahan umum", alasan: "Pasien mengeluh lelah dan pusing" },
  { kode: "R51", judul: "Sakit kepala", alasan: "Pasien mengeluh kepala terasa berat" },
];

export function judulIcd(kode: string): string {
  const item = ICD10.find((i) => i.kode === kode);
  return item ? item.judul : "Kode tidak ditemukan";
}
