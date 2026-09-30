import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { idID } from "@clerk/localizations";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://steto.tech"),
  title: { default: "Steto | Notes that start with the conversation", template: "%s · Steto" },
  description: "See how Steto turns a clinic conversation into a draft medical note. Read the example, then sign in to your account.",
  openGraph: {
    title: "Steto | Notes that start with the conversation",
    description: "See how Steto turns a clinic conversation into a draft medical note. Read the example, then sign in to your account.",
    url: "https://steto.tech",
    siteName: "Steto",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-dvh bg-base-100 font-sans text-base-content antialiased">
        {key ? <ClerkProvider localization={idID}>{children}</ClerkProvider> : children}
      </body>
    </html>
  );
}