"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { usePasien } from "@/components/pasien-context";
import { usePeran } from "@/components/peran-context";
import { Terbatas } from "@/components/terbatas";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { boleh } from "@/lib/peran";
import { simpanPersetujuan, usePersetujuan } from "@/lib/store";
import { cn } from "@/lib/utils";

type Status = "diam" | "meminta" | "merekam" | "selesai" | "galat";
type Sesi = { stream: MediaStream; ctx: AudioContext; rec: MediaRecorder | null; timer: number };

const BATANG = 40;

function hentikan(ref: React.RefObject<Sesi | null>) {
  const s = ref.current;
  if (!s) return;
  window.clearInterval(s.timer);
  if (s.rec && s.rec.state !== "inactive") s.rec.stop();
  s.stream.getTracks().forEach((t) => t.stop());
  void s.ctx.close();
  ref.current = null;
}

function mmss(d: number) {
  return `${String(Math.floor(d / 60)).padStart(2, "0")}:${String(d % 60).padStart(2, "0")}`;
}

export default function RekamPage() {
  const pasien = usePasien();
  const peran = usePeran();
  const router = useRouter();
  const lama = usePersetujuan(pasien.id);
  const [setuju, setSetuju] = useState(false);
  const [pemberi, setPemberi] = useState("");
  const [status, setStatus] = useState<Status>("diam");
  const [detik, setDetik] = useState(0);
  const [level, setLevel] = useState<number[]>(() => Array(BATANG).fill(0));
  const sesi = useRef<Sesi | null>(null);

  useEffect(() => {
    const ref = sesi;
    return () => hentikan(ref);
  }, []);

  if (!boleh(peran, "rekam")) {
    return <Terbatas judul="Perekaman dilakukan dokter atau bidan" isi="Peran Anda tidak memulai rekaman pemeriksaan." />;
  }

  const persetujuanLengkap = setuju && pemberi.trim().length >= 2;
  const merekam = status === "merekam" || status === "meminta";

  async function mulai() {
    setStatus("meminta");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const buf = new Uint8Array(analyser.fftSize);
      let rec: MediaRecorder | null = null;
      if (typeof MediaRecorder !== "undefined") {
        rec = new MediaRecorder(stream);
        // TODO: upload each 30 s chunk to /api/encounters/{id}/audio once the STT worker is wired.
        rec.start(30_000);
      }
      const t0 = Date.now();
      const timer = window.setInterval(() => {
        analyser.getByteTimeDomainData(buf);
        let jumlah = 0;
        for (const b of buf) jumlah += ((b - 128) / 128) ** 2;
        const rms = Math.sqrt(jumlah / buf.length);
        setLevel((l) => [...l.slice(1), Math.min(1, rms * 5)]);
        setDetik(Math.floor((Date.now() - t0) / 1000));
      }, 100);
      sesi.current = { stream, ctx, rec, timer };
      setDetik(0);
      setStatus("merekam");
    } catch {
      setStatus("galat");
    }
  }

  function selesai() {
    hentikan(sesi);
    simpanPersetujuan(pasien.id, pemberi.trim());
    setStatus("selesai");
  }

  function pakaiContoh() {
    simpanPersetujuan(pasien.id, pemberi.trim());
    router.push(`/app/pasien/${pasien.id}/tinjauan`);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <section className="rounded-xl border bg-card p-5 sm:p-6" aria-labelledby="judul-persetujuan">
        <h2 id="judul-persetujuan" className="text-lg font-semibold">
          Persetujuan pasien
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">Tanyakan sebelum merekam, lalu isi nama yang memberi persetujuan.</p>

        <label className="mt-5 flex cursor-pointer gap-3 rounded-lg border border-input p-4 has-checked:border-foreground has-checked:bg-muted has-disabled:cursor-not-allowed">
          <input
            type="checkbox"
            className="mt-0.5 size-5 shrink-0"
            checked={setuju}
            disabled={merekam}
            onChange={(e) => setSetuju(e.target.checked)}
          />
          <span className="text-sm leading-relaxed">
            Pasien atau pendamping setuju percakapan pemeriksaan ini direkam untuk menyusun catatan medis.
          </span>
        </label>

        <div className="mt-4 grid gap-2">
          <Label htmlFor="pemberi">Nama pemberi persetujuan</Label>
          <Input
            id="pemberi"
            autoComplete="off"
            value={pemberi}
            disabled={merekam}
            onChange={(e) => setPemberi(e.target.value)}
          />
        </div>

        {lama && status === "diam" && (
          <p className="mt-4 text-sm text-muted-foreground">Kunjungan ini pernah disetujui oleh {lama.pemberi}.</p>
        )}
      </section>

      <section className="flex flex-col rounded-xl border bg-card p-5 sm:p-6" aria-labelledby="judul-rekam">
        <h2 id="judul-rekam" className="text-lg font-semibold">
          Rekam pemeriksaan
        </h2>

        <div className="flex flex-1 flex-col items-center justify-center gap-6 py-10">
          {status === "merekam" ? (
            <>
              <p className="flex items-center gap-2 text-sm font-medium text-destructive">
                <span className="size-2.5 rounded-full bg-destructive" aria-hidden />
                Merekam
              </p>
              <p className="font-mono text-5xl font-medium tabular-nums tracking-tight" aria-live="off">
                {mmss(detik)}
              </p>
              <div className="flex h-16 w-full max-w-md items-center justify-center gap-[3px]" aria-hidden>
                {level.map((l, i) => (
                  <span
                    key={i}
                    className="w-1.5 rounded-full bg-foreground/80"
                    style={{ height: `${Math.max(6, Math.round(l * 100))}%` }}
                  />
                ))}
              </div>
              <Button size="lg" variant="outline" onClick={selesai}>
                Selesai merekam
              </Button>
            </>
          ) : status === "selesai" ? (
            <div className="max-w-md text-center">
              <p className="text-lg font-medium">Rekaman {mmss(detik)} selesai.</p>
              <p className="mt-2 text-muted-foreground">
                Transkripsi otomatis belum aktif di versi ini, jadi tinjauan memakai percakapan contoh.
              </p>
              <Link href={`/app/pasien/${pasien.id}/tinjauan`} className={cn(buttonVariants({ size: "lg" }), "mt-6")}>
                Lanjut ke tinjauan
              </Link>
            </div>
          ) : (
            <>
              <Button
                size="lg"
                className="h-14 px-8 text-base"
                disabled={!persetujuanLengkap || status === "meminta"}
                aria-describedby="petunjuk-rekam"
                onClick={mulai}
              >
                {status === "meminta" ? "Meminta akses mikrofon…" : "Mulai rekam"}
              </Button>
              <p id="petunjuk-rekam" className="max-w-sm text-center text-sm text-muted-foreground">
                {persetujuanLengkap
                  ? "Periksa pasien seperti biasa. Steto mendengarkan sampai Anda menekan selesai."
                  : "Centang persetujuan dan isi nama pemberi persetujuan dulu."}
              </p>
              {status === "galat" && (
                <p role="alert" className="max-w-sm rounded-lg bg-warn px-4 py-3 text-center text-sm text-warn-foreground">
                  Mikrofon tidak bisa dipakai. Izin mungkin ditolak atau perangkat tidak ada. Pakai percakapan contoh untuk
                  lanjut.
                </p>
              )}
            </>
          )}
        </div>

        {status !== "merekam" && status !== "selesai" && (
          <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">Tidak ada mikrofon?</p>
            <Button variant="outline" disabled={!persetujuanLengkap} onClick={pakaiContoh}>
              Pakai percakapan contoh
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
