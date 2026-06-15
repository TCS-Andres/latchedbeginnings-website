import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { HeartMark } from "@/components/brand/HeartMark";

type PhotoProps = {
  /** Path under /public, e.g. "/images/photos/hero.jpg". If the file does not exist yet, a branded placeholder is shown instead. */
  src?: string;
  alt: string;
  /** Label shown on the placeholder so editors know what photo to drop in. */
  slot?: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/5]". */
  aspect?: string;
  shape?: "rounded" | "arch" | "soft";
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Render the image covering an absolutely-positioned parent instead of its own box. */
  fillParent?: boolean;
};

const shapes = {
  rounded: "rounded-[1.75rem]",
  soft: "rounded-2xl",
  arch: "rounded-[1.75rem] rounded-t-[8rem]",
};

/** Resolve whether a /public asset actually exists on disk (server-side, at build time). */
function publicFileExists(src?: string): boolean {
  if (!src || !src.startsWith("/")) return false;
  try {
    const clean = src.split("?")[0];
    return fs.existsSync(path.join(process.cwd(), "public", clean));
  } catch {
    return false;
  }
}

export function Photo({
  src,
  alt,
  slot,
  aspect = "aspect-[4/5]",
  shape = "rounded",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fillParent = false,
}: PhotoProps) {
  const hasImage = publicFileExists(src);
  const radius = shapes[shape];

  if (fillParent) {
    return hasImage ? (
      <Image
        src={src as string}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    ) : (
      <Placeholder slot={slot} className={cn("absolute inset-0", className)} />
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        radius,
        aspect,
        "bg-blush-200",
        className,
      )}
    >
      {hasImage ? (
        <Image
          src={src as string}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <Placeholder slot={slot} />
      )}
    </div>
  );
}

function Placeholder({
  slot,
  className,
}: {
  slot?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-blush-200 via-blush to-blush-300 p-6 text-center",
        className,
      )}
    >
      <HeartMark className="h-10 w-10 opacity-60" />
      <span className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-coral-deep/70">
        {slot ? `Photo: ${slot}` : "Photo"}
      </span>
    </div>
  );
}
