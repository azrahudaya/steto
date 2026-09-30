import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");
  const { userId, orgId } = await auth();
  if (!userId) redirect("/sign-in");
  if (!orgId) redirect("/app/pilih-puskesmas");
  
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="border-b border-white/10 bg-slate-950 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/app" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Steto" width={28} height={11} className="h-7 w-auto" />
            <span className="text-lg font-semibold text-white">Steto</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <OrganizationSwitcher 
              hidePersonal
              appearance={{
                elements: {
                  organizationSwitcherTrigger: "bg-slate-800 border-white/10 text-white hover:bg-slate-700 rounded-lg px-3 py-2",
                  organizationSwitcherTriggerIcon: "text-slate-400",
                  organizationPreviewMainIdentifier: "text-white font-medium",
                  organizationPreviewAvatarBox: "rounded-lg",
                }
              }}
            />
            <UserButton 
              appearance={{
                elements: {
                  userButtonTrigger: "focus:shadow-none",
                  userButtonBox: "text-white",
                }
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
