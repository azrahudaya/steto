"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function AppNav({ admin, mobile = false }: { admin: boolean; mobile?: boolean }) {
  const path = usePathname();
  const items = [
    { href: "/app/pasien", label: "Pasien" },
    ...(admin ? [{ href: "/app/organisasi", label: "Organisasi" }] : []),
    { href: "/app/akun", label: "Akun" },
  ];

  return (
    <nav aria-label="Menu aplikasi" className={mobile ? "border-t px-4 sm:hidden" : "hidden sm:block"}>
      <ul className={cn("flex", mobile ? "gap-6" : "gap-1")}>
        {items.map((it) => {
          const aktif = path.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                aria-current={aktif ? "page" : undefined}
                className={cn(
                  "flex items-center text-sm",
                  mobile ? "h-11 border-b-2" : "h-9 rounded-md px-3",
                  aktif
                    ? mobile
                      ? "border-foreground font-medium"
                      : "bg-muted font-medium"
                    : mobile
                      ? "border-transparent text-muted-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
