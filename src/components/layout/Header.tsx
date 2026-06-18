"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { mainNav, site } from "@/lib/site";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close the mobile menu explicitly (e.g. on link tap), so it never gets
  // stuck open when a link points to the current page (no route change fires).
  const closeMenu = () => {
    setMobileOpen(false);
    setOpenGroup(null);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-[0_8px_30px_-18px_rgba(45,45,45,0.35)] backdrop-blur"
          : "bg-white",
      )}
    >
      <Container size="wide">
        <div className="flex h-24 items-center justify-between gap-6">
          <Logo priority imgClassName="h-14 sm:h-16" />

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-1 xl:flex"
          >
            {mainNav.map((item) =>
              item.children ? (
                <div key={item.label} className="group relative">
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 whitespace-nowrap rounded-full px-4 py-2 text-base font-medium text-charcoal transition-colors hover:text-coral-deep"
                  >
                    {item.label}
                    <ChevronDown
                      className="h-4 w-4 transition-transform group-hover:rotate-180"
                      aria-hidden="true"
                    />
                  </Link>
                  <div className="invisible absolute left-0 top-full min-w-60 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <ul className="overflow-hidden rounded-2xl border border-blush-200 bg-white p-2 shadow-[0_18px_40px_-24px_rgba(45,45,45,0.45)]">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block rounded-xl px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-blush hover:text-coral-deep"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-full px-4 py-2 text-base font-medium text-charcoal transition-colors hover:text-coral-deep"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="hidden items-center gap-4 xl:flex">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 whitespace-nowrap text-base font-medium text-charcoal transition-colors hover:text-coral-deep"
            >
              <Phone className="h-4 w-4 text-coral" aria-hidden="true" />
              {site.phone}
            </a>
            <Button href={site.bookingUrl} size="lg">
              {site.bookingLabel}
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-charcoal xl:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="fixed inset-0 top-24 z-40 overflow-y-auto overscroll-contain bg-white xl:hidden">
          <Container className="py-6">
            <nav aria-label="Mobile" className="flex flex-col gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <div key={item.label} className="border-b border-blush-200">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between py-4 text-left text-lg font-medium text-charcoal"
                      onClick={() =>
                        setOpenGroup((g) =>
                          g === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={openGroup === item.label}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 transition-transform",
                          openGroup === item.label && "rotate-180",
                        )}
                      />
                    </button>
                    {openGroup === item.label ? (
                      <ul className="pb-3 pl-3">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeMenu}
                              className="block py-2.5 text-base text-stone"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={closeMenu}
                    className="border-b border-blush-200 py-4 text-lg font-medium text-charcoal"
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Button href={site.bookingUrl} size="lg" className="w-full">
                {site.bookingLabel}
              </Button>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 text-base font-medium text-charcoal"
              >
                <Phone className="h-4 w-4 text-coral" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
