import { auth } from "@clerk/nextjs/server";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-dvh bg-base-200">
      <header className="border-b border-base-300 bg-base-100">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <AppNav sample />
          <div className="flex items-center gap-2">
            <OrganizationSwitcher hidePersonal afterSelectOrganizationUrl="/app/pasien" afterCreateOrganizationUrl="/app/pasien" />
            <UserButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}