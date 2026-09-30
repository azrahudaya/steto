"use client";

import Link from "next/link";
import { useState } from "react";
import { usePasien } from "@/components/pasien-context";
import { usePeran } from "@/components/peran-context";
import { Terbatas } from "@/components/terbatas";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { VITAL_FIELD, type Vital } from "@/lib/contoh";
import { boleh } from "@/lib/peran";
import { simpanVital, useVital } from "@/lib/store";

type Nilai = Record<keyof Vital, string>;
const KOSONG = Object.fromEntries(VITAL_FIELD.map((f) => [f.key, ""])) as Nilai;

function keTeks(v: Vital): Nilai {
  return Object.fromEntries(VITAL_FIELD.map((f) => [f.key, String(v[f.key]).replace(".", ",")])) as Nilai;
}

const jam = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" });

function Field({
  f,
  nilai,
  galat,
  onChange,
}: {
  f: (typeof VITAL_FIELD)[number];
  nilai: string;
  galat?: string;
  onChange: (v: string) => void;
}) {
  const id = `vital-${f.key}`;
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{f.label}</Label>
      <div className="relative">
        <Input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          className="pr-20 tabular-nums"
          value={nilai}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(galat)}
          aria-describedby={galat ? `${id}-galat` : `${id}-satuan`}
        />
        <span id={`${id}-satuan`} className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
          {f.satuan}
        </span>
      </div>
      {galat && (
        <p id={`${id}-galat`} className="text-sm text-destructive">
          {galat}
        </p>
      )}
    </div>
  );
}

export default function VitalPage() {
  const pasien = usePasien();
  const peran = usePeran();
  const tersimpan = useVital(pasien.id);
  const [draf, setDraf] = useState<Nilai | null>(null);
  const [galat, setGalat] = useState<Partial<Record<keyof Vital, string>>>({});
  const [pesan, setPesan] = useState("");

  if (!boleh(peran, "vital")) {
    return <Terbatas judul="Tanda vital diisi perawat" isi="Peran Anda bisa melihat hasilnya di layar tinjauan." />;
  }

  const nilai = draf ?? (tersimpan ? keTeks(tersimpan) : KOSONG);

  function kirim(e: React.FormEvent) {
    e.preventDefault();
    const g: Partial<Record<keyof Vital, string>> = {};
    const hasil = {} as Vital;
    for (const f of VITAL_FIELD) {
      const raw = nilai[f.key].trim().replace(",", ".");
      const n = Number(raw);
      if (!raw) g[f.key] = `Isi ${f.label.toLowerCase()}.`;
      else if (!Number.isFinite(n) || (!f.desimal && !Number.isInteger(n))) g[f.key] = `${f.label} harus angka${f.desimal ? "" : " bulat"}.`;
      else if (n < f.min || n > f.max) g[f.key] = `${f.label} di luar ${f.min} sampai ${f.max} ${f.satuan}.`;
      else hasil[f.key] = n;
    }
    if (!g.sistol && !g.diastol && hasil.diastol >= hasil.sistol) g.diastol = "Diastol harus lebih kecil dari sistol.";
    setGalat(g);
    const pertama = VITAL_FIELD.find((f) => g[f.key]);
    if (pertama) {
      setPesan("");
      document.getElementById(`vital-${pertama.key}`)?.focus();
      return;
    }
    simpanVital(pasien.id, hasil);
    setDraf(null);
    setPesan(`Tersimpan pukul ${jam.format(new Date())}.`);
  }

  const ubah = (k: keyof Vital) => (v: string) => {
    setDraf({ ...nilai, [k]: v });
    setPesan("");
  };
  const [sistol, diastol, ...lain] = VITAL_FIELD;

  return (
    <form noValidate onSubmit={kirim} className="space-y-6">
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <h2 className="text-lg font-semibold">Tanda vital</h2>
        <p className="mt-1 text-sm text-muted-foreground">Diukur sebelum pasien masuk ruang periksa.</p>

        <fieldset className="mt-6">
          <legend className="mb-3 text-sm font-medium text-muted-foreground">Tekanan darah</legend>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[sistol, diastol].map((f) => (
              <Field key={f.key} f={f} nilai={nilai[f.key]} galat={galat[f.key]} onChange={ubah(f.key)} />
            ))}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {lain.map((f) => (
            <Field key={f.key} f={f} nilai={nilai[f.key]} galat={galat[f.key]} onChange={ubah(f.key)} />
          ))}
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Simpan tanda vital</Button>
        {tersimpan && boleh(peran, "rekam") && (
          <Link href={`/app/pasien/${pasien.id}/rekam`} className={buttonVariants({ variant: "outline" })}>
            Lanjut ke rekam
          </Link>
        )}
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {pesan || (tersimpan && !draf ? "Tanda vital sudah tersimpan." : "")}
        </p>
      </div>
    </form>
  );
}
