import Link from "next/link";
import { OrganizationList, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PilihPuskesmas() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");
  const { userId, orgId } = await auth();
  if (!userId) redirect("/sign-in");
  if (orgId) redirect("/app");
  return <div className="app-shell">
    <header className="app-head"><div className="wrap app-head-inner">
      <Link href="/" className="wordmark">steto<span className="wordmark-stop">.</span></Link>
      <UserButton />
    </div></header>
    <main className="wrap app-content"><p className="overline">Akses organisasi</p><h1>Pilih puskesmas</h1><p className="app-intro">Pilih organisasi aktif sebelum masuk ke ruang kerja.</p><div className="app-panel"><OrganizationList hidePersonal afterSelectOrganizationUrl="/app" /></div></main>
  </div>;
}
