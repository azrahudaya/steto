"use client";

import { useMemo, useSyncExternalStore } from "react";
import { PASIEN, type Pasien, type Soap, type Vital } from "./contoh";

// Demo storage: new patients, vitals, consent, and approvals live in sessionStorage of this browser tab only.
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

// undefined = not hydrated yet (server render), null = nothing stored.
function useStored(key: string) {
  return useSyncExternalStore<string | null | undefined>(
    subscribe,
    () => sessionStorage.getItem(key),
    () => undefined,
  );
}

function tulis(key: string, value: unknown) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage blocked or full: the flow still works for the current screen.
  }
  listeners.forEach((l) => l());
}

function parse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

const KEY_PASIEN = "steto:pasien-baru";

export function useDaftarPasien() {
  const raw = useStored(KEY_PASIEN);
  const baru = useMemo(() => parse<Pasien[]>(raw, []), [raw]);
  const semua = useMemo(() => [...baru, ...PASIEN], [baru]);
  return {
    siap: raw !== undefined,
    semua,
    tambah: (p: Pasien) => tulis(KEY_PASIEN, [p, ...baru]),
  };
}

export function useVital(id: string) {
  const raw = useStored(`steto:vital:${id}`);
  return useMemo(() => parse<Vital | null>(raw, null), [raw]);
}

export function simpanVital(id: string, v: Vital) {
  tulis(`steto:vital:${id}`, v);
}

export type Persetujuan = { pemberi: string; waktu: string };

export function usePersetujuan(id: string) {
  const raw = useStored(`steto:persetujuan:${id}`);
  return useMemo(() => parse<Persetujuan | null>(raw, null), [raw]);
}

export function simpanPersetujuan(id: string, pemberi: string) {
  tulis(`steto:persetujuan:${id}`, { pemberi, waktu: new Date().toISOString() } satisfies Persetujuan);
}

export type Disetujui = { icd: string; soap: Soap; waktu: string; penulis: string };

export function useDisetujui(id: string) {
  const raw = useStored(`steto:disetujui:${id}`);
  return { siap: raw !== undefined, data: useMemo(() => parse<Disetujui | null>(raw, null), [raw]) };
}

export function simpanDisetujui(id: string, d: Disetujui | null) {
  tulis(`steto:disetujui:${id}`, d);
}
