import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "white" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-coral text-white shadow-[0_12px_30px_-16px_rgba(196,110,120,0.9)] hover:bg-coral-deep hover:-translate-y-0.5",
  outline:
    "border border-coral text-coral-deep bg-transparent hover:bg-coral hover:text-white",
  white:
    "bg-white text-coral-deep shadow-[0_12px_30px_-18px_rgba(45,45,45,0.5)] hover:bg-blush",
  ghost: "text-coral-deep hover:text-coral",
};

const sizes: Record<Size, string> = {
  md: "px-7 py-3 text-[0.95rem]",
  lg: "px-9 py-4 text-base sm:text-[1.05rem]",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "primary", size = "md", className } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, external } = props;
    const isExternal = external ?? /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { children: _c, variant: _v, size: _s, className: _cn, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
