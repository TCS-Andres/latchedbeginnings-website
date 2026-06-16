import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

type LogoProps = {
  variant?: "default" | "white";
  className?: string;
  /** Override the image height classes (defaults to the footer/standard size). */
  imgClassName?: string;
  priority?: boolean;
};

export function Logo({
  variant = "default",
  className,
  imgClassName,
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
        className={cn("w-auto", imgClassName ?? "h-11 sm:h-12")}
        sizes="240px"
      />
    </Link>
  );
}
