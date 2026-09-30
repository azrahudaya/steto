import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Brand } from "@/components/brand";
import { Button, buttonVariants } from "@/components/ui/button";

// Clerk <Show> reads the session on the server, so this page renders per request.
export const dynamic = "force-dynamic";

const authReady = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

function Masuk({ label = "Masuk", size = "default" }: { label?: string; size?: "default" | "lg" }) {
  if (!authReady) {
    return (
      <Link href="/sign-in" className={buttonVariants({ size })}>
        {label}
      </Link>
    );
  }
  return (
    <>
      <Show when="signed-out">
        <SignInButton>
          <Button size={size}>{label}</Button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <Link href="/app/pasien" className={buttonVariants({ size })}>
          Buka aplikasi
        </Link>
      </Show>
    </>
  );
}

const LANGKAH = [
  { judul: "Rekam", isi: "Setelah pasien setuju, tekan rekam dan periksa seperti biasa." },
  {
    judul: "Tinjau",
    isi: "Transkrip di kiri, draf SOAP di kanan. Klik kalimat untuk melihat sumbernya. Kalimat tanpa sumber ditandai kuning.",
  },
  {
    judul: "Setujui",
    isi: "Pilih kode ICD-10 dari tiga saran atau cari manual. Setelah disetujui, Steto menyusun bundle FHIR R4 untuk SATUSEHAT.",
  },
];

const PERAN = [
  { peran: "Perawat", isi: "Mencatat pasien dan mengisi tanda vital." },
  { peran: "Dokter", isi: "Merekam pemeriksaan, meninjau draf, memilih ICD-10, lalu menyetujui." },
  { peran: "Bidan", isi: "Sama dengan dokter. Bagian asesmen berisi diagnosis kebidanan." },
  { peran: "Rekam medis", isi: "Memeriksa bundle yang siap dikirim ke SATUSEHAT." },
  { peran: "Admin", isi: "Mengundang anggota dan mengatur peran staf." },
];

// A static copy of the review screen, so the hero shows the real interaction instead of a mockup frame.
function ContohTinjauan() {
  return (
    <figure className="rounded-2xl border bg-card p-2 shadow-[0_1px_2px_rgba(28,27,26,0.04),0_16px_40px_-16px_rgba(28,27,26,0.22)]">
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="rounded-xl bg-muted/70 p-4">
          <p className="text-xs font-medium text-muted-foreground">Transkrip</p>
          <ol className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>
              <span className="block text-xs text-muted-foreground">Dokter</span>
              Ada demam?
            </li>
            <li className="-mx-2 rounded-lg bg-brand/40 px-2 py-1">
              <span className="block text-xs text-muted-foreground">Pasien</span>
              Kalau malam agak panas. Tenggorokan juga sakit waktu menelan.
            </li>
          </ol>
        </div>
        <div className="rounded-xl p-4 ring-1 ring-border">
          <p className="text-xs font-medium text-muted-foreground">SOAP, Subjektif</p>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            <li>Batuk berdahak putih sejak 3 hari.</li>
            <li className="-mx-2 rounded-lg bg-brand/40 px-2 py-1 ring-1 ring-foreground/30">
              Demam pada malam hari dan nyeri saat menelan.
            </li>
          </ul>
          <p className="mt-4 text-xs font-medium text-muted-foreground">Rencana</p>
          <p className="-mx-2 mt-2 rounded-lg bg-warn px-2 py-1 text-sm text-warn-foreground">
            Parasetamol 500 mg bila demam.
            <span className="block text-xs font-medium">Tanpa rujukan di transkrip</span>
          </p>
        </div>
      </div>
      <figcaption className="px-3 pb-1.5 pt-3 text-xs text-muted-foreground">
        Contoh layar tinjauan. Kalimat terpilih menyorot sumbernya di transkrip.
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Brand className="h-8" />
        <div className="flex items-center gap-3">
          <Masuk />
          {authReady && (
            <Show when="signed-in">
              <UserButton />
            </Show>
          )}
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-10 sm:px-6 md:pt-16 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:items-center lg:gap-16 lg:pb-28 lg:pt-20">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Asisten rekam medis untuk puskesmas</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Dokter fokus ke pasien, <span className="marker">Steto yang mencatat.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg text-muted-foreground">
              Rekam percakapan pemeriksaan. Steto menyusun draf SOAP dan saran kode ICD-10. Dokter memeriksa, mengedit,
              lalu menyetujui.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Masuk label="Masuk ke Steto" size="lg" />
              <Link href="#cara-kerja" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Lihat cara kerja
              </Link>
            </div>
          </div>
          <ContohTinjauan />
        </section>

        <section className="border-t">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16 lg:py-24">
            <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
              Catatan medis ditulis sambil melayani antrean
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Di poli umum, dokter mengetik SOAP di sela pemeriksaan. Waktu mengetik diambil dari waktu bicara dengan
                pasien, dan catatan yang ditulis terburu-buru mudah tidak lengkap.
              </p>
              <p>
                Steto memindahkan kerja menulis ke tahap tinjau. Keputusan tetap di dokter: setiap kalimat bisa dicek ke
                transkrip, diedit, lalu disetujui.
              </p>
            </div>
          </div>
        </section>

        {/* Three steps because the doctor's part of the flow really is record, review, approve. */}
        <section id="cara-kerja" className="scroll-mt-4 border-t bg-card">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Cara kerja</h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {LANGKAH.map((l, i) => (
                <li key={l.judul} className="border-t border-foreground pt-5">
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">0{i + 1}</span>
                  <h3 className="mt-2 text-lg font-semibold">{l.judul}</h3>
                  <p className="mt-2 text-muted-foreground">{l.isi}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Peran di puskesmas</h2>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
              Setiap puskesmas punya organisasi sendiri di Steto, dan tiap anggota punya peran.
            </p>
            <dl className="mt-10 grid gap-x-10 sm:grid-cols-2">
              {PERAN.map((p) => (
                <div key={p.peran} className="flex flex-col gap-1 border-b py-5 sm:flex-row sm:gap-6">
                  <dt className="font-medium sm:w-32 sm:shrink-0">{p.peran}</dt>
                  <dd className="text-muted-foreground">{p.isi}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <Brand className="h-6" />
          <p>
            Kode sumber di{" "}
            <a href="https://github.com/azrahudaya/steto" className="font-medium text-foreground underline underline-offset-4">
              GitHub
            </a>
            , lisensi MIT.
          </p>
        </div>
      </footer>
    </div>
  );
}
