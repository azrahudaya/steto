"use client";

import { useAuth, OrganizationSwitcher, UserButton } from "@clerk/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppNav } from "@/components/app-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (key && isLoaded && !userId) {
      router.replace("/sign-in");
    }
  }, [key, isLoaded, userId, router]);

  if (key && !isLoaded) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (key && !userId) return null;

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