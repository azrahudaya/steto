import Link from "next/link";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) redirect("/");
  const { userId, orgId } = await auth();
  if (!userId) redirect("/sign-in");
  if (!orgId) redirect("/app/pilih-puskesmas");
  return (
    <div className="app-shell">
      <header className="app-head"><div className="wrap app-head-inner">
        <Link href="/app" className="wordmark">steto<span className="wordmark-stop">.</span></Link>
        <div className="app-head-actions"><OrganizationSwitcher hidePersonal /><UserButton /></div>
      </div></header>
      <main className="wrap app-content">{children}</main>
    </div>
  );
}
