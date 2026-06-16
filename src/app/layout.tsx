import type { Metadata } from "next";
import { Gelasio, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CtaBanner } from "@/components/layout/CtaBanner";
import { Preloader } from "@/components/layout/Preloader";
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
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
    url: site.url,
    siteName: site.name,
    title: "Latched Beginnings | Tongue-Tie & Lactation Care in Austin, TX",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Latched Beginnings | Tongue-Tie & Lactation Care in Austin, TX",
    description: site.description,
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
      </body>
    </html>
  );
}
