"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ContohBadge } from "@/components/page-header";
import { PasienContext } from "@/components/pasien-context";
import { usePeran } from "@/components/peran-context";
import { JK_LABEL, PASIEN, formatNik, umur } from "@/lib/contoh";
import { boleh, type Aksi } from "@/lib/peran";
import { useDaftarPasien } from "@/lib/store";
import { cn } from "@/lib/utils";

const LANGKAH: { seg: string; label: string; aksi: Aksi }[] = [
  { seg: "vital", label: "Tanda vital", aksi: "vital" },
  { seg: "rekam", label: "Rekam", aksi: "rekam" },
  { seg: "tinjauan", label: "Tinjauan", aksi: "tinjau" },
];

export default function PasienLayout({ children }: { children: React.ReactNode }) {
  const { id } = useParams<{ id: string }>();
  const path = usePathname();
  const peran = usePeran();
  const { siap, semua } = useDaftarPasien();
  const pasien = semua.find((p) => p.id === id);

  if (!siap) {
    return (
      <p role="status" className="text-muted-foreground">
        Memuat data pasien…
      </p>
    );
  }

  if (!pasien) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <p className="font-medium">Pasien tidak ditemukan.</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Pasien yang ditambahkan di tab lain belum tersimpan di sini. Buka lagi dari daftar pasien.
        </p>
        <Link href="/app/pasien" className="mt-4 inline-flex min-h-11 items-center font-medium underline underline-offset-4">
          Ke daftar pasien
        </Link>
      </div>
    );
  }

  const langkah = LANGKAH.filter((l) => boleh(peran, l.aksi));

  return (
    <PasienContext.Provider value={pasien}>
      <div className="space-y-8">
        <div className="space-y-4">
          <Link
            href="/app/pasien"
            className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            Kembali ke daftar pasien
          </Link>
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{pasien.nama}</h1>
            {PASIEN.some((p) => p.id === pasien.id) && <ContohBadge />}
          </div>
          <p className="flex flex-wrap gap-x-4 gap-y-1 text-muted-foreground">
            <span className="font-mono tabular-nums">NIK {formatNik(pasien.nik)}</span>
            <span>{umur(pasien.lahir)} tahun</span>
            <span>{JK_LABEL[pasien.jk]}</span>
          </p>
        </div>

        {langkah.length > 0 && (
          <nav aria-label="Langkah kunjungan">
            <ol className="flex gap-1 rounded-xl border bg-card p-1">
              {langkah.map((l) => {
                const href = `/app/pasien/${pasien.id}/${l.seg}`;
                const aktif = path.startsWith(href);
                return (
                  <li key={l.seg} className="flex-1">
                    <Link
                      href={href}
                      aria-current={aktif ? "step" : undefined}
                      className={cn(
                        "flex min-h-11 items-center justify-center gap-2 rounded-lg px-2 text-sm",
                        aktif ? "bg-foreground font-medium text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                    >
                      <span className="font-mono text-xs tabular-nums">{LANGKAH.indexOf(l) + 1}</span>
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {children}
      </div>
    </PasienContext.Provider>
  );
}
