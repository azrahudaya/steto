import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";
import { Brand } from "@/components/brand";
import { PeranProvider } from "@/components/peran-context";
import { Terbatas } from "@/components/terbatas";
import { bacaPeran } from "@/lib/peran";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");
  const { userId, orgId, orgRole } = await auth();
  if (!userId) redirect("/sign-in");
  if (!orgId) redirect("/app/pilih-puskesmas");
  const admin = orgRole === "org:admin";
  const user = await currentUser();
  const peran = bacaPeran(user?.publicMetadata?.peran) ?? (admin ? "admin" : null);

  return (
    <div className="min-h-dvh">
      {/* The only translucent surface: content scrolls under the sticky header and stays legible. */}
      <header className="sticky top-0 z-40 border-b bg-background/95 supports-backdrop-filter:bg-background/80 supports-backdrop-filter:backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-6 sm:px-6">
          <Brand href="/app/pasien" className="h-7" />
          <AppNav admin={admin} />
          <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
            <OrganizationSwitcher
              hidePersonal
              afterSelectOrganizationUrl="/app/pasien"
              afterLeaveOrganizationUrl="/app/pilih-puskesmas"
              appearance={{ elements: { rootBox: "min-w-0 max-w-48 sm:max-w-none" } }}
            />
            <UserButton />
          </div>
        </div>
        <AppNav admin={admin} mobile />
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        {peran ? (
          <PeranProvider peran={peran}>{children}</PeranProvider>
        ) : (
          <Terbatas
            judul="Menunggu peran dari admin"
            isi="Akun ini sudah masuk ke puskesmas, tapi belum punya peran. Minta admin menetapkan peran dokter, bidan, perawat, atau rekam medis."
          />
        )}
      </main>
    </div>
  );
}
