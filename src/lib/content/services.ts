/**
 * Service catalog. Powers the homepage "What We Do" cards, the /services
 * overview, and each dedicated service page. Copy follows the brand voice:
 * warm, evidence-based, never fear-based. No em dashes.
 */

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  navTitle: string;
  /** One-line card summary */
  excerpt: string;
  /** Hero eyebrow on the dedicated page */
  eyebrow: string;
  /** Hero intro paragraph on the dedicated page */
  intro: string;
  photoSlot: string;
  /** Bullet highlights for the page */
  highlights: { title: string; body: string }[];
  /** Frequently asked questions for the page + FAQ schema */
  faqs: { question: string; answer: string }[];
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
};

export const services: Service[] = [
  {
    slug: "co2-laser-tongue-tie-release",
    title: "CO2 Laser Tongue-Tie, Lip-Tie & Buccal-Tie Releases",
    shortTitle: "CO2 Laser Releases",
    navTitle: "CO2 Laser Tongue-Tie Release",
    excerpt:
      "We use the gold-standard LightScalpel CO2 laser for gentle, precise releases with less discomfort and faster healing for your little one.",
    eyebrow: "The Gold Standard",
    intro:
      "At Latched Beginnings, we use the LightScalpel CO2 laser for tongue-tie, lip-tie, and buccal-tie releases. This advanced technology is designed for your baby's comfort and healing. Unlike traditional methods, the CO2 laser offers minimal discomfort, less bleeding, and a precise release that preserves healthy tissue.",
    photoSlot: "Baby during a gentle laser release, close and reassuring",
    highlights: [
      {
        title: "Gentle and effective care",
        body: "The CO2 laser is designed for your child's comfort and healing, with precise tissue release that protects the surrounding area.",
      },
      {
        title: "Quick recovery",
        body: "Procedures are gentle and recovery is smoother, so your little one can get back to thriving sooner.",
      },
      {
        title: "Safe and clean",
        body: "The laser promotes a sterile environment, reducing the risk of infection and supporting a safer experience for your baby.",
      },
    ],
    faqs: [
      {
        question: "Is a frenectomy painful for a newborn?",
        answer:
          "Most babies tolerate a CO2 laser release very well. The procedure is quick, and the laser is designed to minimize discomfort and bleeding. Many infants are calm and ready to feed shortly afterward. We use comfort measures throughout and walk you through exactly what to expect.",
      },
      {
        question: "What age is best for a tongue-tie release?",
        answer:
          "There is no single right age. Releases can be done in the early weeks of life or later, depending on your baby's needs. The most important step is a thorough evaluation. We will help you understand whether and when a release makes sense for your child.",
      },
      {
        question: "Why use the CO2 laser instead of scissors?",
        answer:
          "The LightScalpel CO2 laser allows a precise release that preserves healthy tissue, with less bleeding and a sterile field. It is widely considered the gold standard for infant releases and supports smoother, more comfortable healing.",
      },
      {
        question: "How long does recovery take?",
        answer:
          "Healing is typically quick, with the most active phase in the first one to two weeks. We provide a customized aftercare plan with gentle exercises and feeding support so your baby heals well and the results last.",
      },
    ],
    metaTitle: "Laser Tongue-Tie Release for Infants in Austin, TX",
    metaDescription:
      "Gentle CO2 laser tongue-tie, lip-tie, and buccal-tie releases for infants in Austin, TX with Dr. Kacie Culotta, DDS. The gold-standard LightScalpel laser for comfort and faster healing.",
    primaryKeyword: "laser tongue tie release Austin",
  },
  {
    slug: "consultations",
    title: "1-on-1 In-Office Consultations",
    shortTitle: "1-on-1 Consultations",
    navTitle: "1-on-1 Consultations",
    excerpt:
      "Comprehensive in-person evaluations of your baby's feeding, oral anatomy, and overall health, with a personalized care plan you can trust.",
    eyebrow: "Where Care Begins",
    intro:
      "Every journey at Latched Beginnings starts with a thorough, unhurried consultation. Dr. Culotta evaluates your baby's feeding habits, oral anatomy, and tongue mobility, then talks through what she sees and builds a personalized care plan with you. Her dual training as a dentist and lactation counselor means she can address both the structure and the function of feeding in a single visit.",
    photoSlot: "Dr. Culotta evaluating a baby with a parent nearby",
    highlights: [
      {
        title: "We listen first",
        body: "We take the time to understand your story, your concerns, and what you are hoping for, before anything else.",
      },
      {
        title: "Whole-baby evaluation",
        body: "We assess feeding, oral anatomy, tongue mobility, and comfort to understand the full picture, not just one symptom.",
      },
      {
        title: "A plan made for your baby",
        body: "You leave with clear answers and a personalized plan. Not every baby needs a release, and we will always tell you the truth.",
      },
    ],
    faqs: [
      {
        question: "Do I really need a tongue-tie release?",
        answer:
          "Not every baby does, and we will always tell you the truth. The American Academy of Pediatrics cautions against overdiagnosis, and our approach is conservative and evidence-based. The consultation exists to evaluate carefully and recommend the right path, which sometimes means no procedure at all.",
      },
      {
        question: "What happens during a consultation?",
        answer:
          "We start by listening to your story and concerns. Dr. Culotta then evaluates your baby's feeding, oral anatomy, and tongue mobility, explains what she sees, and builds a personalized plan with you. You will leave with clear answers and next steps.",
      },
      {
        question: "Can you help with breastfeeding and bottle feeding?",
        answer:
          "Yes. As both a dentist and a lactation counselor, Dr. Culotta addresses the structure and the function of feeding in one visit, whether you breastfeed, bottle feed, or both.",
      },
      {
        question: "Should I see anyone else before my visit?",
        answer:
          "Sometimes bodywork or lactation support is helpful first. If that is the case, we will guide you to trusted providers. We collaborate closely with the broader care team around your baby.",
      },
    ],
    metaTitle: "Infant Tongue-Tie Consultations in Austin, TX",
    metaDescription:
      "Book a 1-on-1 infant feeding and tongue-tie consultation in Austin, TX with Dr. Kacie Culotta, DDS. A thorough, compassionate evaluation and a personalized care plan for your baby.",
    primaryKeyword: "tongue tie consultation Austin",
  },
  {
    slug: "post-op-care",
    title: "Post-Operative Care",
    shortTitle: "Post-Op Care",
    navTitle: "Post-Op Care",
    excerpt:
      "Thoughtful support before and after the procedure. We are here to guide you every step of the way toward healing and lasting results.",
    eyebrow: "Healing Together",
    intro:
      "A release is only part of the story. Latched Beginnings provides robust post-operative support so your baby heals well and feeds with ease. You will receive a customized care plan, step-by-step guidance on oral exercises, feeding and lactation support during recovery, and scheduled follow-ups, plus ongoing access to our team for any questions.",
    photoSlot: "Calm mother nursing a baby at home after recovery",
    highlights: [
      {
        title: "Customized care plans",
        body: "Every plan is tailored to your baby's unique needs, with clear oral exercises to promote proper healing.",
      },
      {
        title: "Feeding and lactation support",
        body: "We support feeding adjustments and latch through recovery so progress sticks.",
      },
      {
        title: "Follow-up and ongoing access",
        body: "Scheduled follow-ups monitor progress, and our team stays reachable for questions and reassurance.",
      },
    ],
    faqs: [
      {
        question: "What does aftercare involve?",
        answer:
          "You will receive a customized plan with gentle oral exercises, feeding guidance, and a schedule for follow-ups. The exercises help the area heal openly and support your baby's new range of motion.",
      },
      {
        question: "Are the aftercare exercises difficult?",
        answer:
          "They are simple once you see them, and we will show you exactly how to do them. We are here for questions along the way, so you never feel like you are doing this alone.",
      },
      {
        question: "How long does healing take?",
        answer:
          "The most active healing phase is usually the first couple of weeks. We monitor progress at follow-ups and adjust the plan as needed so your baby feeds and heals comfortably.",
      },
      {
        question: "What if my baby is fussy after the procedure?",
        answer:
          "Some fussiness can be normal as your baby adjusts. We will guide you on comfort measures and feeding, and our team stays reachable so you have support and reassurance when you need it.",
      },
    ],
    metaTitle: "Frenectomy Aftercare & Post-Op Support in Austin, TX",
    metaDescription:
      "Comprehensive frenectomy aftercare and post-op support in Austin, TX. Customized care plans, oral exercises, feeding support, and follow-ups from Latched Beginnings.",
    primaryKeyword: "post-frenectomy aftercare",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
