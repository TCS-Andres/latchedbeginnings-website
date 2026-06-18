import type { Metadata } from "next";
import { Gelasio, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Preloader } from "@/components/layout/Preloader";
import { ChatAgent } from "@/components/global/ChatAgent";
import { site } from "@/lib/site";

const gelasio = Gelasio({
  variable: "--font-gelasio",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

/**
 * Resolve the absolute origin that share-preview images and canonical URLs
 * must point at. Until the custom domain is connected to the deployment, this
 * follows the live Vercel host so previews render; once latchedbeginnings.com
 * is attached as the production domain, VERCEL_PROJECT_PRODUCTION_URL becomes
 * that domain automatically. A NEXT_PUBLIC_SITE_URL env var overrides all.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_ENV === "production") {
    return process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : site.url;
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return site.url;
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Latched Beginnings | Tongue-Tie & Lactation Care in Austin, TX",
    template: "%s | Latched Beginnings",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "tongue tie release Austin",
    "laser tongue tie Austin",
    "CO2 laser frenectomy",
    "lip tie release Austin",
    "infant frenectomy Austin",
    "lactation counselor Austin",
    "tongue tie dentist Austin",
  ],
  authors: [{ name: site.founder }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    siteName: site.name,
    title: "Latched Beginnings | Tongue-Tie & Lactation Care in Austin, TX",
    description: site.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Latched Beginnings: gentle tongue-tie and lactation care in Austin, TX",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Latched Beginnings | Tongue-Tie & Lactation Care in Austin, TX",
    description: site.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${gelasio.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white">
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}.preloader{display:none !important}`}</style>
        </noscript>
        <Preloader />
        <Header />
        <main className="flex-1">{children}</main>
        <CtaBanner />
        <Footer />
        <ChatAgent />
        {/* UserWay accessibility widget (same account as the prior site). */}
        <Script
          src="https://cdn.userway.org/widget.js"
          data-account="qOYcsqCcB4"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
