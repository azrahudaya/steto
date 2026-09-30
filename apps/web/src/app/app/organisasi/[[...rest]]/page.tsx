import { OrganizationProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function OrganisasiPage() {
  const { orgRole } = await auth();
  if (orgRole !== "org:admin") redirect("/app");
  return <><h1>Organisasi</h1><div className="app-panel"><OrganizationProfile /></div></>;
}
