import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AppNav } from "@/components/app-nav";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="min-h-dvh bg-base-200">
      <header className="bg-base-100 border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <AppNav admin={false} />
          <div className="flex items-center gap-4">
            <OrganizationSwitcher
              appearance={{
                elements: { organizationPreview: "bg-primary text-primary-content" },
              }}
            />
            <UserButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto py-6">{children}</main>
    </div>
  );
}
