import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AppHome() {
  const { orgId } = await auth();
  if (!orgId) redirect("/app/pilih-puskesmas");
  return <>
    <p className="overline">Ruang kerja puskesmas</p>
    <h1>Selamat datang di Steto</h1>
    <p className="app-intro">Ruang kerja untuk mencatat kunjungan pasien. Perekaman dan penyusunan draf klinis sedang disiapkan.</p>
    <section className="app-panel" aria-labelledby="status"><h2 id="status">Fondasi aplikasi sudah siap</h2><p>Organisasi aktif ditampilkan di atas. Fitur klinis belum tersedia, jadi belum ada tindakan pasien yang dapat dilakukan di sini.</p></section>
  </>;
}
