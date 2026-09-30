import Image from "next/image";
import Link from "next/link";

export function Brand({ href = "/", size = "md" }: { href?: string; size?: "sm" | "md" }) {
  const dims = size === "sm" ? 95 : 116;
  return (
    <Link href={href} className="steto-brand inline-flex items-center" aria-label="Steto, home">
      <Image src="/steto-wordmark.webp" alt="Steto" width={528} height={204} priority sizes="(max-width: 560px) 95px, 116px" style={{ width: dims, height: "auto" }} />
    </Link>
  );
}