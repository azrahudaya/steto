"use client";

import { createContext, useContext } from "react";
import type { Pasien } from "@/lib/contoh";

export const PasienContext = createContext<Pasien | null>(null);

export function usePasien() {
  const p = useContext(PasienContext);
  if (!p) throw new Error("usePasien dipakai di luar halaman pasien");
  return p;
}
