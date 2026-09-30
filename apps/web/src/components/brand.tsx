import Image from "next/image";
import Link from "next/link";

export function Brand({ href = "/", className = "h-8" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className="inline-flex min-h-11 shrink-0 items-center rounded-md" aria-label="Steto, ke beranda">
      <Image src="/logo.png" alt="" width={480} height={191} priority className={`${className} w-auto`} />
    </Link>
  );
}
