"use client";

import Link from "next/link";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { usePeran } from "@/components/peran-context";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JK_LABEL, formatNik, tanggal, umur, type JenisKelamin, type Pasien } from "@/lib/contoh";
import { boleh } from "@/lib/peran";
import { useDaftarPasien } from "@/lib/store";

type Form = { nama: string; nik: string; lahir: string; jk: JenisKelamin | "" };
type Galat = Partial<Record<keyof Form, string>>;
const KOSONG: Form = { nama: "", nik: "", lahir: "", jk: "" };

function validasi(f: Form, semua: Pasien[]): Galat {
  const g: Galat = {};
  const nik = f.nik.replace(/\s/g, "");
  if (f.nama.trim().length < 2) g.nama = "Isi nama lengkap pasien.";
  if (!/^\d{16}$/.test(nik)) g.nik = "NIK harus 16 digit angka.";
  else if (semua.some((p) => p.nik === nik)) g.nik = "NIK ini sudah terdaftar.";
  if (!f.lahir) g.lahir = "Isi tanggal lahir.";
  else if (f.lahir > new Date().toISOString().slice(0, 10) || f.lahir < "1900-01-01") g.lahir = "Tanggal lahir tidak masuk akal.";
  if (!f.jk) g.jk = "Pilih jenis kelamin.";
  return g;
}

function TambahPasien({ semua, onTambah }: { semua: Pasien[]; onTambah: (p: Pasien) => void }) {
  const [open, setOpen] = useState(false);
  const [f, setF] = useState<Form>(KOSONG);
  const [galat, setGalat] = useState<Galat>({});

  function ubah<K extends keyof Form>(k: K, v: Form[K]) {
    setF((x) => ({ ...x, [k]: v }));
  }

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    const g = validasi(f, semua);
    setGalat(g);
    if (Object.keys(g).length) {
      document.getElementById(`pasien-${Object.keys(g)[0]}`)?.focus();
      return;
    }
    onTambah({
      id: `n${Date.now().toString(36)}`,
      nama: f.nama.trim(),
      nik: f.nik.replace(/\s/g, ""),
      lahir: f.lahir,
      jk: f.jk as JenisKelamin,
      kunjunganTerakhir: null,
    });
    setOpen(false);
    setF(KOSONG);
    setGalat({});
  }

  const err = (k: keyof Form) =>
    galat[k] ? (
      <p id={`pasien-${k}-galat`} className="text-sm text-destructive">
        {galat[k]}
      </p>
    ) : null;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setGalat({});
      }}
    >
      <DialogTrigger render={<Button />}>Tambah pasien</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah pasien</DialogTitle>
          <DialogDescription>Data identitas sesuai KTP atau KK.</DialogDescription>
        </DialogHeader>
        <form id="form-pasien" noValidate onSubmit={kirim} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="pasien-nama">Nama lengkap</Label>
            <Input
              id="pasien-nama"
              autoComplete="off"
              value={f.nama}
              onChange={(e) => ubah("nama", e.target.value)}
              aria-invalid={Boolean(galat.nama)}
              aria-describedby={galat.nama ? "pasien-nama-galat" : undefined}
            />
            {err("nama")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pasien-nik">NIK</Label>
            <Input
              id="pasien-nik"
              inputMode="numeric"
              autoComplete="off"
              maxLength={19}
              value={f.nik}
              onChange={(e) => ubah("nik", e.target.value)}
              aria-invalid={Boolean(galat.nik)}
              aria-describedby={galat.nik ? "pasien-nik-galat" : undefined}
            />
            {err("nik")}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pasien-lahir">Tanggal lahir</Label>
            <Input
              id="pasien-lahir"
              type="date"
              value={f.lahir}
              onChange={(e) => ubah("lahir", e.target.value)}
              aria-invalid={Boolean(galat.lahir)}
              aria-describedby={galat.lahir ? "pasien-lahir-galat" : undefined}
            />
            {err("lahir")}
          </div>
          <fieldset className="grid gap-2" aria-describedby={galat.jk ? "pasien-jk-galat" : undefined}>
            <legend className="mb-2 text-sm font-medium">Jenis kelamin</legend>
            <div className="flex gap-2">
              {(["P", "L"] as const).map((jk, i) => (
                <label
                  key={jk}
                  className="flex min-h-11 flex-1 cursor-pointer items-center gap-2.5 rounded-lg border border-input px-3 has-checked:border-foreground has-checked:bg-muted"
                >
                  <input
                    id={i === 0 ? "pasien-jk" : undefined}
                    type="radio"
                    name="jk"
                    className="size-4"
                    checked={f.jk === jk}
                    onChange={() => ubah("jk", jk)}
                  />
                  {JK_LABEL[jk]}
                </label>
              ))}
            </div>
            {err("jk")}
          </fieldset>
        </form>
        <DialogFooter>
          <Button type="submit" form="form-pasien">
            Simpan pasien
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function PasienPage() {
  const peran = usePeran();
  const { siap, semua, tambah } = useDaftarPasien();
  const [q, setQ] = useState("");
  const [pesan, setPesan] = useState("");

  const kunci = q.trim().toLowerCase();
  const angka = kunci.replace(/\s/g, "");
  const hasil = kunci
    ? semua.filter((p) => p.nama.toLowerCase().includes(kunci) || (angka.length > 0 && p.nik.includes(angka)))
    : semua;

  return (
    <div className="space-y-6">
      <PageHeader title="Pasien" description="Pilih pasien untuk memulai kunjungan." contoh>
        {boleh(peran, "tambahPasien") && (
          <TambahPasien
            semua={semua}
            onTambah={(p) => {
              tambah(p);
              setQ("");
              setPesan(`${p.nama} ditambahkan ke daftar.`);
            }}
          />
        )}
      </PageHeader>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <Label htmlFor="cari-pasien" className="sr-only">
            Cari pasien
          </Label>
          <Input
            id="cari-pasien"
            type="search"
            placeholder="Cari nama atau NIK"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {pesan || (siap ? `${hasil.length} pasien` : "")}
        </p>
      </div>

      {!siap ? (
        <div role="status" className="rounded-xl border bg-card p-6 text-muted-foreground">
          Memuat daftar pasien…
        </div>
      ) : hasil.length === 0 ? (
        <div className="rounded-xl border bg-card p-6">
          <p className="font-medium">Tidak ada pasien dengan nama atau NIK &ldquo;{q.trim()}&rdquo;.</p>
          <p className="mt-1 text-sm text-muted-foreground">Periksa ejaan, atau tambahkan pasien baru.</p>
          <Button variant="outline" className="mt-4" onClick={() => setQ("")}>
            Hapus pencarian
          </Button>
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-xl border bg-card md:block">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/60 text-left text-muted-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Nama
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    NIK
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Umur
                  </th>
                  <th scope="col" className="px-4 py-3 font-medium">
                    Kunjungan terakhir
                  </th>
                </tr>
              </thead>
              <tbody>
                {hasil.map((p) => (
                  <tr key={p.id} className="relative border-b last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/app/pasien/${p.id}`}
                        className="font-medium after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:rounded-md focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-ring"
                      >
                        {p.nama}
                      </Link>
                      <span className="block text-muted-foreground">{JK_LABEL[p.jk]}</span>
                    </td>
                    <td className="px-4 py-3.5 font-mono tabular-nums">{formatNik(p.nik)}</td>
                    <td className="px-4 py-3.5 tabular-nums">{umur(p.lahir)} tahun</td>
                    <td className="px-4 py-3.5 text-muted-foreground">
                      {p.kunjunganTerakhir ? tanggal(p.kunjunganTerakhir) : "Belum pernah"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="divide-y overflow-hidden rounded-xl border bg-card md:hidden">
            {hasil.map((p) => (
              <li key={p.id}>
                <Link href={`/app/pasien/${p.id}`} className="block px-4 py-3.5 hover:bg-muted/50">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-medium">{p.nama}</span>
                    <span className="shrink-0 text-sm tabular-nums text-muted-foreground">{umur(p.lahir)} th</span>
                  </span>
                  <span className="mt-0.5 block font-mono text-sm tabular-nums text-muted-foreground">{formatNik(p.nik)}</span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    Kunjungan terakhir: {p.kunjunganTerakhir ? tanggal(p.kunjunganTerakhir) : "belum pernah"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
