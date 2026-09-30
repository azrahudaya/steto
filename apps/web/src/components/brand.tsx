import Image from "next/image";
import Link from "next/link";

export function Brand({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="steto-brand" aria-label="Steto, beranda">
      <Image src="/steto-wordmark.webp" alt="Steto" width={528} height={204} priority style={{ width: 116, height: "auto" }} />
    </Link>
  );
}
