import Link from "next/link";
import Image from "next/image";
import { OrganizationList, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function PilihPuskesmas() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");
  const { userId, orgId } = await auth();
  if (!userId) redirect("/sign-in");
  if (orgId) redirect("/app");
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Steto" width={28} height={11} className="h-7 w-auto" />
            <span className="text-lg font-semibold text-white">Steto</span>
          </Link>
          <UserButton 
            appearance={{
              elements: {
                userButtonTrigger: "focus:shadow-none",
                userButtonBox: "text-white",
              }
            }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-emerald-400 text-sm font-medium mb-2">Akses Organisasi</p>
          <h1 className="text-2xl font-bold text-white mb-2">Pilih Puskesmas</h1>
          <p className="text-slate-400">
            Pilih organisasi aktif sebelum masuk ke ruang kerja.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
          <OrganizationList 
            hidePersonal 
            afterSelectOrganizationUrl="/app"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                organizationSwitcherTrigger: "bg-slate-900/50 border-white/20 text-white hover:bg-slate-800",
                organizationSwitcherTriggerIcon: "text-slate-400",
                organizationListItems: "gap-2",
                organizationListItem: "bg-slate-900/50 border-white/10 hover:bg-slate-800 text-white rounded-lg p-4",
                organizationListItemLogo: "rounded-lg",
                organizationListItemIcon: "text-emerald-400",
                organizationListItemActive: "border-emerald-500 bg-emerald-500/10",
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
