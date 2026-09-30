import { OrganizationProfile } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function OrganisasiPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/app"
          className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Pengaturan Organisasi</h1>
          <p className="text-slate-400">Kelola anggota dan pengaturan puskesmas</p>
        </div>
      </div>

      {/* Organization Profile */}
      <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-6">
        <OrganizationProfile 
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-transparent shadow-none",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              navbarButton: "text-slate-300 hover:text-white hover:bg-white/10",
              navbarButtonActive: "text-white bg-white/10",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-slate-900/50 border-white/20 text-white focus:border-emerald-500",
              formButtonPrimary: "bg-emerald-500 hover:bg-emerald-400 text-white",
              membershipPage: "text-white",
              membershipRow: "border-white/10 hover:bg-white/5",
              membershipRowText: "text-white",
              membershipActionButton: "text-emerald-400 hover:text-emerald-300",
              invitePage: "text-white",
              inviteMemberSectionButton: "bg-emerald-500 hover:bg-emerald-400 text-white",
            }
          }}
        />
      </div>
    </div>
  );
}
