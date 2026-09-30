import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { idID } from "@clerk/localizations";
import { shadcn } from "@clerk/ui/themes";
import "@clerk/ui/themes/shadcn.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steto | Catatan pemeriksaan",
  description: "Dokter fokus ke pasien, Steto yang mencatat.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return (
    <html lang="id">
      <body>
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
