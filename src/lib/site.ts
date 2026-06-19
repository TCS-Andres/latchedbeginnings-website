/**
 * Latched Beginnings: single source of truth for site-wide data.
 * Edit contact details, booking URL, and social links here.
 * Items marked TODO need confirmation from the client before launch.
 */

export const site = {
  name: "Latched Beginnings",
  legalName: "Latched Beginnings",
  tagline: "Healthy Beginnings That Last a Lifetime",
  description:
    "Latched Beginnings is a specialized dental and lactation practice in Austin, TX. Dr. Kacie Culotta, DMD offers gentle CO2 laser tongue-tie, lip-tie, and buccal-tie releases paired with lactation counseling and whole-baby feeding support.",
  url: "https://latchedbeginnings.com",
  locale: "en_US",

  // Practitioner
  founder: "Dr. Kacie Culotta, DMD",

  // Contact
  phone: "(512) 814-7480",
  phoneHref: "tel:+15128147480",
  email: "info@latchedbeginnings.com", // TODO: confirm contact email
  emailHref: "mailto:info@latchedbeginnings.com",

  address: {
    street: "1701 Simond Ave, Suite 107A",
    city: "Austin",
    region: "TX",
    postalCode: "78723", // TODO: confirm ZIP
    country: "US",
    full: "1701 Simond Ave, Suite 107A, Austin, TX 78723",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=1701+Simond+Ave+Suite+107A+Austin+TX",
    geo: { lat: 30.2986, lng: -97.7035 }, // TODO: confirm coordinates
  },

  hours: [
    { day: "Monday", open: "8:00 AM", close: "3:00 PM" },
    { day: "Tuesday", open: "8:00 AM", close: "3:00 PM" },
    { day: "Wednesday", open: "Closed", close: "" },
    { day: "Thursday", open: "8:00 AM", close: "3:00 PM" },
    { day: "Friday", open: "8:00 AM", close: "3:00 PM" },
    { day: "Saturday", open: "Closed", close: "" },
    { day: "Sunday", open: "Closed", close: "" },
  ],

  serviceArea: [
    "Austin",
    "Mueller",
    "East Austin",
    "North Austin",
    "Round Rock",
    "Cedar Park",
    "Pflugerville",
    "Leander",
    "Georgetown",
  ],

  // Primary conversion action: the on-site appointment request form (no external scheduler).
  bookingUrl: "/contact#appointment",
  bookingLabel: "Schedule Appointment",

  socials: {
    instagram: "https://www.instagram.com/latched_beginnings/",
    instagramHandle: "@latched_beginnings",
    facebook: "https://www.facebook.com/latchedbeginnings", // TODO: confirm
  },

  // Professional affiliations / credentials (rendered as text badges, no third-party logos).
  credentials: [
    { abbr: "DMD", label: "Doctor of Dental Medicine" },
    { abbr: "CLC", label: "Certified Lactation Counselor" },
    { abbr: "IATP", label: "Intl. Affiliation of Tongue-Tie Professionals" },
    { abbr: "ADA", label: "American Dental Association" },
    { abbr: "ALD", label: "Academy of Laser Dentistry" },
    { abbr: "LightScalpel", label: "Certified CO2 Laser Provider" },
    { abbr: "AADSM", label: "American Academy of Dental Sleep Medicine" },
    { abbr: "Breathe Institute", label: "Ambassador & Myofunctional Mastermind" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "CO2 Laser Tongue-Tie Release",
        href: "/services/co2-laser-tongue-tie-release",
      },
      { label: "1-on-1 Consultations", href: "/services/consultations" },
      { label: "Post-Op Care", href: "/services/post-op-care" },
    ],
  },
  { label: "About", href: "/about" },
  {
    label: "Resources",
    href: "/resources",
    children: [
      { label: "Downloadable Resources", href: "/resources" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    label: "For Providers",
    href: "/providers",
    children: [
      { label: "Provider Coaching", href: "/provider-coaching" },
      { label: "Patient Referrals", href: "/patient-referrals" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Provider Coaching", href: "/provider-coaching" },
    { label: "Patient Referrals", href: "/patient-referrals" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    {
      label: "CO2 Laser Tongue-Tie Release",
      href: "/services/co2-laser-tongue-tie-release",
    },
    { label: "1-on-1 Consultations", href: "/services/consultations" },
    { label: "Post-Op Care", href: "/services/post-op-care" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "HIPAA Notice", href: "/hipaa-notice" },
  ],
};
