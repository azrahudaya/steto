"use client";

import { useAuth, OrganizationList } from "@clerk/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Brand } from "@/components/brand";

export default function PilihPuskesmasPage() {
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
    <div className="flex min-h-dvh items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body items-center text-center">
          <Brand size="sm" />
          <h1 className="mt-4 text-2xl font-bold">Choose an organization</h1>
          <p className="text-base-content/70">Pick the clinic you work at, or create a new one.</p>
        </div>
        <div className="card-body pt-0">
          <OrganizationList
            afterSelectOrganizationUrl="/app/pasien"
            afterCreateOrganizationUrl="/app/pasien"
            appearance={{
              elements: {
                rootBox: "w-full",
                organizationPreview: "card card-border bg-base-100 hover:bg-base-200",
                previewButton: "flex w-full items-center gap-3 p-3",
                previewText: "font-medium",
                previewAvatar: "w-10 h-10",
                createOrganizationButton: "btn btn-outline w-full",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}