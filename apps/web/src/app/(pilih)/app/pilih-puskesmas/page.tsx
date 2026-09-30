import { auth } from "@clerk/nextjs/server";
import { OrganizationList } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Brand } from "@/components/brand";

export default async function PilihPuskesmasPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

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