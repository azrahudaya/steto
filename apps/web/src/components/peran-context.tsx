"use client";

import { createContext, useContext } from "react";
import type { Peran } from "@/lib/peran";

const PeranContext = createContext<Peran | null>(null);

export function PeranProvider({ peran, children }: { peran: Peran | null; children: React.ReactNode }) {
  return <PeranContext.Provider value={peran}>{children}</PeranContext.Provider>;
}

export function usePeran() {
  return useContext(PeranContext);
}
