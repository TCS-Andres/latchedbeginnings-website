import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { InstagramIcon, FacebookIcon } from "@/components/brand/SocialIcons";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = 2026;
  return (
    <footer className="bg-blush">
      <Container size="wide" className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-stone">
              A specialized dental and lactation practice in Austin, TX. We
              offer gentle tongue-tie, lip-tie, and buccal-tie releases and
              whole-baby feeding support, led by Dr. Kacie Culotta, DDS.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-coral-deep transition-colors hover:bg-coral hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-coral-deep transition-colors hover:bg-coral hover:text-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h2 className="font-display text-lg text-ink">Quick Links</h2>
            <ul className="mt-5 space-y-3">
              {footerNav.quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-stone transition-colors hover:text-coral-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="font-display text-lg text-ink">Services</h2>
            <ul className="mt-5 space-y-3">
              {footerNav.services.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-stone transition-colors hover:text-coral-deep"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-display text-lg text-ink">Get in Touch</h2>
            <ul className="mt-5 space-y-4 text-sm text-stone">
              <li>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 transition-colors hover:text-coral-deep"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  <span>{site.address.full}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-3 transition-colors hover:text-coral-deep"
                >
                  <Phone className="h-4 w-4 shrink-0 text-coral" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="flex items-center gap-3 transition-colors hover:text-coral-deep"
                >
                  <Mail className="h-4 w-4 shrink-0 text-coral" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-blush-300 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-stone">
            &copy; {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-stone transition-colors hover:text-coral-deep"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
