import { OrganizationList, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Brand } from "@/components/brand";

export default async function PilihPuskesmas() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");
  const { userId, orgId } = await auth();
  if (!userId) redirect("/sign-in");
  if (orgId) redirect("/app/pasien");

  return (
    <div className="min-h-dvh">
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Brand className="h-7" />
          <UserButton />
        </div>
      </header>
      <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 max-w-md text-center">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Pilih puskesmas</h1>
          <p className="mt-2 text-muted-foreground">Pilih puskesmas tempat bertugas hari ini.</p>
        </div>
        <OrganizationList hidePersonal afterSelectOrganizationUrl="/app/pasien" afterCreateOrganizationUrl="/app/pasien" />
      </main>
    </div>
  );
}
