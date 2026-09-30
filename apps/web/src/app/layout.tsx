import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { idID } from "@clerk/localizations";
import { shadcn } from "@clerk/ui/themes";
import "@clerk/ui/themes/shadcn.css";
import "./globals.css";

// Geist: the typeface of the Once UI reference the owner picked; neutral, tight, reads well on clinic screens.
const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://steto.tech"),
  title: { default: "Steto", template: "%s · Steto" },
  description: "Asisten rekam medis puskesmas: percakapan pemeriksaan jadi draf SOAP dan saran kode ICD-10.",
  openGraph: {
    title: "Steto",
    description: "Dokter fokus ke pasien, Steto yang mencatat.",
    url: "https://steto.tech",
    siteName: "Steto",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <html lang="id" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh">
        {key ? (
          <ClerkProvider localization={idID} appearance={{ theme: shadcn }}>
            {children}
          </ClerkProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
