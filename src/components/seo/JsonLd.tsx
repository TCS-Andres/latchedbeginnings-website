import { site } from "@/lib/site";

/** Convert a display time like "8:00 AM" to schema.org 24h "08:00". */
function to24h(time: string): string {
  const m = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return time;
  let hour = Number(m[1]);
  const ap = m[3].toUpperCase();
  if (ap === "PM" && hour !== 12) hour += 12;
  if (ap === "AM" && hour === 12) hour = 0;
  return `${String(hour).padStart(2, "0")}:${m[2]}`;
}

/** Render a JSON-LD script tag. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, trusted content built from our own data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Primary practice schema. Dentist is a MedicalBusiness subtype. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "@id": `${site.url}/#practice`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/images/brand/logo.png`,
    logo: `${site.url}/images/brand/logo.png`,
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: site.founder,
      jobTitle: "Dentist & Lactation Counselor",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.address.geo.lat,
      longitude: site.address.geo.lng,
    },
    areaServed: site.serviceArea.map((name) => ({
      "@type": "City",
      name,
    })),
    medicalSpecialty: "Dentistry",
    sameAs: [site.socials.instagram, site.socials.facebook],
    openingHoursSpecification: site.hours
      .filter((h) => h.close)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: to24h(h.open),
        closes: to24h(h.close),
      })),
  };
  return <JsonLd data={data} />;
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.url}`,
    })),
  };
  return <JsonLd data={data} />;
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  datePublished,
  dateModified,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  dateModified?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@type": "Person", name: site.founder },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/images/brand/logo.png`,
      },
    },
    mainEntityOfPage: `${site.url}/blog/${slug}`,
  };
  return <JsonLd data={data} />;
}

export function FaqJsonLd({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  return <JsonLd data={data} />;
}
