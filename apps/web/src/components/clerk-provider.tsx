"use client";

import { ClerkProvider } from "@clerk/react";
import { idID } from "@clerk/localizations";
import React from "react";

// Fallback key ensures static export build doesn't crash when env is absent during build time
const FALLBACK_KEY = "pk_test_Y2xlcmsuZXhhbXBsZS5jb20k";

export function ClientClerkProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || FALLBACK_KEY;
  return (
    <ClerkProvider publishableKey={key} localization={idID}>
      {children}
    </ClerkProvider>
  );
}
