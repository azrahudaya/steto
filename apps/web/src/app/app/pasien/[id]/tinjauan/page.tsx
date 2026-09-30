"use client";

import { useUser } from "@clerk/nextjs";
import { useMemo, useState } from "react";
import { ContohBadge } from "@/components/page-header";
import { usePasien } from "@/components/pasien-context";
import { usePeran } from "@/components/peran-context";
import { Terbatas } from "@/components/terbatas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  BAGIAN,
  ICD10,
  SARAN_ICD,
  SOAP_CONTOH,
  TRANSKRIP_CONTOH,
  judulIcd,
  type Bagian,
  type Kalimat,
  type Soap,
  type Vital,
} from "@/lib/contoh";
import { susunBundle, validasiBundle } from "@/lib/fhir";
import { PERAN_LABEL, boleh } from "@/lib/peran";
import { simpanDisetujui, useDisetujui, useVital, type Disetujui } from "@/lib/store";
import { cn } from "@/lib/utils";

const angka = (n: number) => String(n).replace(".", ",");
const jam = new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Jakarta" });

function soapAwal(v: Vital | null): Soap {
  const teks = v
    ? `Suhu ${angka(v.suhu)} °C, tekanan darah ${v.sistol}/${v.diastol} mmHg, nadi ${v.nadi} x/menit, napas ${v.napas} x/menit, berat ${angka(v.berat)} kg, tinggi ${v.tinggi} cm.`
    : "Tanda vital belum diisi.";
  return { ...SOAP_CONTOH, O: SOAP_CONTOH.O.map((k) => (k.dariVital ? { ...k, teks } : k)) };
}

function Transkrip({ sorot }: { sorot: string[] }) {
  return (
    <section aria-labelledby="judul-transkrip" className="rounded-xl border bg-card lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3 border-b px-5 py-4">
        <h2 id="judul-transkrip" className="font-semibold">
          Transkrip
        </h2>
        <ContohBadge />
      </div>
      <ol className="space-y-1 p-3">
        {TRANSKRIP_CONTOH.map((s) => (
          <li
            key={s.id}
            className={cn("rounded-lg px-3 py-2 leading-relaxed transition-colors", sorot.includes(s.id) && "bg-brand/40")}
          >
            <span className="block text-xs font-medium text-muted-foreground">{s.pembicara}</span>
            {s.teks}
          </li>
        ))}
      </ol>
    </section>
  );
}

function KalimatSoap({
  k,
  dipilih,
  onPilih,
}: {
  k: Kalimat;
  dipilih: boolean;
  onPilih: () => void;
}) {
  const tanpaRujukan = k.refs.length === 0 && !k.dariVital;
  const vitalKosong = k.dariVital && k.teks === "Tanda vital belum diisi.";
  const sumber = TRANSKRIP_CONTOH.filter((s) => k.refs.includes(s.id));
  return (
    <li>
      <button
        type="button"
        aria-pressed={dipilih}
        onClick={onPilih}
        className={cn(
          "w-full rounded-lg px-3 py-2 text-left leading-relaxed transition-colors",
          tanpaRujukan || vitalKosong ? "bg-warn text-warn-foreground" : "hover:bg-muted",
          dipilih && "ring-2 ring-foreground",
          dipilih && !tanpaRujukan && !vitalKosong && "bg-brand/40 hover:bg-brand/40",
        )}
      >
        {k.teks}
        {tanpaRujukan && <span className="mt-0.5 block text-xs font-medium">Tanpa rujukan di transkrip. Periksa sebelum menyetujui.</span>}
        {k.dariVital && !vitalKosong && <span className="mt-0.5 block text-xs text-muted-foreground">Dari tanda vital</span>}
        {vitalKosong && <span className="mt-0.5 block text-xs font-medium">Isi di langkah tanda vital.</span>}
      </button>
      {dipilih && sumber.length > 0 && (
        <blockquote className="mx-3 mt-2 border-l-2 border-foreground pl-3 text-sm text-muted-foreground lg:hidden">
          {sumber.map((s) => (
            <p key={s.id}>
              {s.pembicara}: {s.teks}
            </p>
          ))}
        </blockquote>
      )}
    </li>
  );
}

function PilihIcd({ icd, onPilih }: { icd: string | null; onPilih: (kode: string) => void }) {
  const [q, setQ] = useState("");
  const kunci = q.trim().toLowerCase();
  const saran = new Set(SARAN_ICD.map((s) => s.kode));
  const hasil = kunci
    ? ICD10.filter((i) => !saran.has(i.kode) && (i.kode.toLowerCase().includes(kunci) || i.judul.toLowerCase().includes(kunci))).slice(0, 6)
    : [];

  const opsi = (kode: string, isi: React.ReactNode, first = false) => (
    <label
      key={kode}
      className="flex cursor-pointer gap-3 rounded-lg border border-input p-3.5 has-checked:border-foreground has-checked:bg-muted"
    >
      <input
        id={first ? "icd-pertama" : undefined}
        type="radio"
        name="icd"
        className="mt-1 size-4 shrink-0"
        checked={icd === kode}
        onChange={() => onPilih(kode)}
      />
      <span className="min-w-0">{isi}</span>
    </label>
  );

  return (
    <fieldset className="space-y-3">
      <legend className="mb-1 font-semibold">Kode ICD-10</legend>
      <p className="text-sm text-muted-foreground">Tiga saran dari percakapan. Pilih satu, atau cari manual.</p>
      <div className="space-y-2">
        {SARAN_ICD.map((s, i) =>
          opsi(
            s.kode,
            <>
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono font-medium">{s.kode}</span>
                <span className="font-medium">{judulIcd(s.kode)}</span>
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">{s.alasan}</span>
            </>,
            i === 0,
          ),
        )}
      </div>
      <div className="grid gap-2 pt-2">
        <Label htmlFor="cari-icd">Cari kode lain</Label>
        <Input id="cari-icd" type="search" placeholder="Kode atau nama penyakit" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {kunci && hasil.length === 0 && (
        <p className="text-sm text-muted-foreground">Tidak ada kode untuk &ldquo;{q.trim()}&rdquo; di daftar Steto.</p>
      )}
      {hasil.length > 0 && (
        <div className="space-y-2">
          {hasil.map((i) =>
            opsi(
              i.kode,
              <span className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-mono font-medium">{i.kode}</span>
                <span>{i.judul}</span>
              </span>,
            ),
          )}
        </div>
      )}
    </fieldset>
  );
}

function SiapSatusehat({ data, onBukaLagi }: { data: Disetujui; onBukaLagi?: () => void }) {
  const pasien = usePasien();
  const vital = useVital(pasien.id);
  const [salin, setSalin] = useState("");
  const bundle = useMemo(
    () => susunBundle({ pasien, vital: vital ?? {}, soap: data.soap, icd: data.icd, waktu: data.waktu, penulis: data.penulis }),
    [pasien, vital, data],
  );
  const cek = validasiBundle(bundle);
  const lolos = cek.filter((c) => c.ok).length;
  const valid = lolos === cek.length;
  const json = JSON.stringify(bundle, null, 2);

  async function salinJson() {
    try {
      await navigator.clipboard.writeText(json);
      setSalin("JSON tersalin.");
    } catch {
      setSalin("Browser menolak akses clipboard. Pakai tombol unduh.");
    }
  }

  function unduh() {
    const url = URL.createObjectURL(new Blob([json], { type: "application/fhir+json" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `steto-${pasien.id}-bundle.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
      <div className="space-y-6">
        <section
          className={cn("rounded-xl p-5", valid ? "bg-ok text-ok-foreground" : "bg-warn text-warn-foreground")}
          aria-live="polite"
        >
          <p className="text-lg font-semibold">{valid ? "Bundle valid" : "Bundle belum valid"}</p>
          <p className="mt-1 text-sm">
            {lolos} dari {cek.length} pemeriksaan lolos. FHIR R4, tipe transaction, {bundle.entry.length} resource.
          </p>
        </section>

        <section className="rounded-xl border bg-card p-5">
          <h3 className="font-semibold">Pemeriksaan</h3>
          <ul className="mt-3 space-y-2.5 text-sm">
            {cek.map((c) => (
              <li key={c.label} className="flex items-start justify-between gap-3">
                <span>{c.label}</span>
                <span className={cn("shrink-0 font-medium", c.ok ? "text-ok-foreground" : "text-destructive")}>
                  {c.ok ? "Lolos" : "Gagal"}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border bg-card p-5 text-sm">
          <p>
            Disetujui oleh <span className="font-medium">{data.penulis}</span>
          </p>
          <p className="mt-1 text-muted-foreground">{jam.format(new Date(data.waktu))} WIB</p>
          <p className="mt-3">
            <span className="font-mono font-medium">{data.icd}</span> {judulIcd(data.icd)}
          </p>
          {onBukaLagi && (
            <Button variant="outline" className="mt-4" onClick={onBukaLagi}>
              Buka lagi draf
            </Button>
          )}
        </section>
      </div>

      <section className="min-w-0 rounded-xl border bg-card" aria-labelledby="judul-json">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
          <h3 id="judul-json" className="font-semibold">
            Bundle FHIR
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm text-muted-foreground" aria-live="polite">
              {salin}
            </p>
            <Button variant="outline" size="sm" onClick={salinJson}>
              Salin JSON
            </Button>
            <Button variant="outline" size="sm" onClick={unduh}>
              Unduh JSON
            </Button>
          </div>
        </div>
        <pre
          tabIndex={0}
          aria-label="Isi bundle FHIR dalam format JSON"
          className="max-h-[36rem] overflow-auto p-5 font-mono text-xs leading-relaxed"
        >
          {json}
        </pre>
      </section>
    </div>
  );
}

export default function TinjauanPage() {
  const pasien = usePasien();
  const peran = usePeran();
  const { user } = useUser();
  const vital = useVital(pasien.id);
  const { siap, data: disetujui } = useDisetujui(pasien.id);
  const [tab, setTab] = useState<string | null>(null);
  const [pilih, setPilih] = useState<string | null>(null);
  const [draf, setDraf] = useState<Soap | null>(null);
  const [edit, setEdit] = useState<Bagian | null>(null);
  const [icd, setIcd] = useState<string | null>(null);
  const [galat, setGalat] = useState("");

  const dasar = useMemo(() => soapAwal(vital), [vital]);

  if (!boleh(peran, "tinjau")) {
    return <Terbatas judul="Tinjauan dibuka dokter, bidan, atau rekam medis" isi="Peran Anda mengisi pasien dan tanda vital." />;
  }
  if (!siap) {
    return (
      <p role="status" className="text-muted-foreground">
        Memuat draf…
      </p>
    );
  }

  const bisaSetujui = boleh(peran, "setujui");
  const kunci = Boolean(disetujui) || !bisaSetujui;
  const soap = disetujui?.soap ?? draf ?? dasar;
  const aktifTab = tab ?? (disetujui ? "satusehat" : "tinjauan");
  const semuaKalimat = BAGIAN.flatMap((b) => soap[b.key]);
  const sorot = semuaKalimat.find((k) => k.id === pilih)?.refs ?? [];
  const perluCek = semuaKalimat.filter((k) => k.refs.length === 0 && !k.dariVital).length;

  function ubahKalimat(b: Bagian, id: string, teks: string) {
    setDraf({ ...soap, [b]: soap[b].map((k) => (k.id === id ? { ...k, teks } : k)) });
  }

  function setujui() {
    if (!icd) {
      setGalat("Pilih satu kode ICD-10 dulu.");
      document.getElementById("icd-pertama")?.focus();
      return;
    }
    const kosong = semuaKalimat.find((k) => !k.teks.trim());
    if (kosong) {
      setGalat("Ada kalimat SOAP yang kosong. Isi atau periksa lagi.");
      return;
    }
    setGalat("");
    setEdit(null);
    simpanDisetujui(pasien.id, {
      icd,
      soap,
      waktu: new Date().toISOString(),
      penulis: user?.fullName || (peran ? PERAN_LABEL[peran] : "Dokter"),
    });
    setTab("satusehat");
  }

  return (
    <Tabs value={aktifTab} onValueChange={(v) => setTab(String(v))} className="gap-6">
      <TabsList className="h-11 w-full sm:w-fit">
        <TabsTrigger value="tinjauan" className="px-4">
          Tinjauan
        </TabsTrigger>
        <TabsTrigger value="satusehat" className="px-4">
          Siap SATUSEHAT
        </TabsTrigger>
      </TabsList>

      <TabsContent value="tinjauan" className="text-base">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          <Transkrip sorot={sorot} />

          <div className="space-y-6">
            <section aria-labelledby="judul-soap" className="rounded-xl border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
                <h2 id="judul-soap" className="font-semibold">
                  SOAP
                </h2>
                {disetujui ? (
                  <Badge className="h-6 bg-ok px-2 text-ok-foreground">Disetujui</Badge>
                ) : (
                  <Badge variant="outline" className="h-6 border-foreground px-2">
                    Draf AI
                  </Badge>
                )}
              </div>
              <p className="px-5 pt-4 text-sm text-muted-foreground">
                Klik kalimat untuk melihat sumbernya di transkrip.
                {perluCek > 0 && ` ${perluCek} kalimat tanpa rujukan ditandai kuning.`}
              </p>
              <div className="divide-y">
                {BAGIAN.map((b) => (
                  <div key={b.key} className="px-2 py-4">
                    <div className="flex items-center justify-between gap-3 px-3 pb-2">
                      <h3 className="text-sm font-medium text-muted-foreground">{b.judul}</h3>
                      {!kunci && (
                        <Button variant="ghost" size="sm" onClick={() => setEdit(edit === b.key ? null : b.key)}>
                          {edit === b.key ? "Selesai" : "Edit"}
                          <span className="sr-only"> bagian {b.judul}</span>
                        </Button>
                      )}
                    </div>
                    {edit === b.key ? (
                      <div className="space-y-2 px-3">
                        {soap[b.key].map((k, i) => (
                          <Textarea
                            key={k.id}
                            aria-label={`${b.judul}, kalimat ${i + 1}`}
                            value={k.teks}
                            onChange={(e) => ubahKalimat(b.key, k.id, e.target.value)}
                            className="bg-card text-base"
                          />
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-1">
                        {soap[b.key].map((k) => (
                          <KalimatSoap key={k.id} k={k} dipilih={pilih === k.id} onPilih={() => setPilih(pilih === k.id ? null : k.id)} />
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {kunci ? (
              <section className="rounded-xl border bg-card p-5">
                <p className="font-semibold">Kode ICD-10</p>
                {disetujui ? (
                  <p className="mt-2">
                    <span className="font-mono font-medium">{disetujui.icd}</span> {judulIcd(disetujui.icd)}
                  </p>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">Belum dipilih. Dokter atau bidan memilih kode saat menyetujui.</p>
                )}
              </section>
            ) : (
              <section className="rounded-xl border bg-card p-5">
                <PilihIcd
                  icd={icd}
                  onPilih={(k) => {
                    setIcd(k);
                    setGalat("");
                  }}
                />
                <div className="mt-6 flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center">
                  <Button size="lg" onClick={setujui}>
                    Setujui
                  </Button>
                  <p className="text-sm text-muted-foreground" role={galat ? "alert" : undefined}>
                    {galat ? <span className="font-medium text-destructive">{galat}</span> : "Setelah disetujui, draf dikunci dan bundle FHIR disusun."}
                  </p>
                </div>
              </section>
            )}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="satusehat" className="text-base">
        {disetujui ? (
          <SiapSatusehat
            data={disetujui}
            onBukaLagi={
              bisaSetujui
                ? () => {
                    setDraf(disetujui.soap);
                    setIcd(disetujui.icd);
                    simpanDisetujui(pasien.id, null);
                    setTab("tinjauan");
                  }
                : undefined
            }
          />
        ) : (
          <div className="rounded-xl border bg-card p-6">
            <p className="font-medium">Bundle belum disusun.</p>
            <p className="mt-1 text-sm text-muted-foreground">Bundle FHIR dibuat setelah dokter atau bidan menyetujui draf.</p>
            <Button variant="outline" className="mt-4" onClick={() => setTab("tinjauan")}>
              Ke tinjauan
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
