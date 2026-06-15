import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type LogoProps = {
  variant?: "default" | "white";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "default",
  className,
  priority = false,
}: LogoProps) {
  const src =
    variant === "white"
      ? "/images/brand/logo-white.png"
      : "/images/brand/logo.png";
  return (
    <Link
      href="/"
      aria-label={`${site.name} home`}
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={src}
        alt={site.name}
        width={1563}
        height={781}
        priority={priority}
        className="h-11 w-auto sm:h-12"
        sizes="180px"
      />
    </Link>
  );
}
