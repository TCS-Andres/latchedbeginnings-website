/**
 * Service catalog. Mirrors the structure of the live latchedbeginnings.com
 * service pages: image hero, "Scope Our Services" (4 cards), alternating
 * ping-pong content sections, FAQ, then the shared Stories of Change, Simple
 * Steps to Thrive, and checklist sections (rendered by the page template).
 *
 * Copy is the real site copy, lightly optimized for SEO and AI search: each
 * page leads with a clear, declarative answer and weaves in the Austin location
 * and Dr. Culotta's dual certification. Brand voice, no em dashes.
 */

export type ScopeCard = { title: string; body: string };

export type ServiceSection = {
  eyebrow: string;
  heading: string;
  body: string;
  /** Optional sub-points (used for the CO2 laser benefits) */
  bullets?: { title: string; body: string }[];
  image: string;
  imageSlot: string;
  imageShape?: "rounded" | "arch" | "soft";
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  navTitle: string;
  /** One-line card summary used on the homepage + services overview */
  excerpt: string;
  /** Photo slot label for the overview/homepage cards */
  photoSlot: string;
  hero: {
    eyebrow: string;
    /** Emotional H1 (matches the live site) */
    title: string;
    subhead: string;
    /** SEO-forward declarative intro */
    intro: string;
    image: string;
    imageSlot: string;
  };
  scope: {
    eyebrow: string;
    title: string;
    intro: string;
    cards: ScopeCard[];
  };
  sections: ServiceSection[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
};

const SERVICE_IMG = "/images/photos";

export const services: Service[] = [
  {
    slug: "co2-laser-tongue-tie-release",
    title: "CO2 Laser Tongue-Tie, Lip-Tie & Buccal-Tie Releases",
    shortTitle: "CO2 Laser Releases",
    navTitle: "CO2 Laser Tongue-Tie Release",
    excerpt:
      "Gentle, precise releases with the gold-standard LightScalpel CO2 laser for less discomfort and faster healing for your little one.",
    photoSlot: "Newborn during gentle laser care",
    hero: {
      eyebrow: "CO2 Laser Releases",
      title: "Precision Care for Tongue-Tied Infants",
      subhead: "Gentle, Effective Tongue-Tie Releases for Your Little One",
      intro:
        "A laser tongue-tie release in Austin should be gentle, precise, and rooted in real feeding expertise. At Latched Beginnings, Dr. Kacie Culotta releases tongue-tie, lip-tie, and buccal-tie restrictions with the gold-standard LightScalpel CO2 laser for a smoother path to improved feeding, better airway health, and a thriving baby. As the only Austin dentist who is also a certified lactation counselor, she cares for the structure and the function of feeding in one visit.",
      image: `${SERVICE_IMG}/service-co2-laser-tongue-tie-release.jpg`,
      imageSlot: "Newborn being gently cradled during care",
    },
    scope: {
      eyebrow: "Service Offer",
      title: "Scope Our Services",
      intro:
        "We know how important it is to give your baby the best start, and our care reflects that commitment.",
      cards: [
        {
          title: "Why Families Trust Us",
          body: "Families across Austin choose us because we lead with listening, take our time, and never recommend a release that is not in your baby's best interest.",
        },
        {
          title: "Expertise You Can Trust",
          body: "Dr. Kacie Culotta is both a laser-certified dentist and a lactation counselor with specialized training in oral ties, a combination unique in Austin.",
        },
        {
          title: "State-of-the-Art Technology",
          body: "Our LightScalpel CO2 laser delivers precise, gentle, and effective releases with minimal discomfort and bleeding.",
        },
        {
          title: "Functional Approach",
          body: "From feeding struggles to airway health, we provide a comprehensive evaluation and a care plan tailored to your baby's needs.",
        },
      ],
    },
    sections: [
      {
        eyebrow: "Why the LightScalpel CO2 Laser Stands Out",
        heading: "The Gold Standard in Tongue-Tie Treatment",
        body: "The LightScalpel CO2 laser offers unmatched precision and comfort for tongue-tie releases. Unlike traditional scissors or diode methods, this advanced tool lets us achieve optimal results with minimal trauma to your baby.",
        bullets: [
          {
            title: "Less Discomfort",
            body: "The laser minimizes bleeding, swelling, and post-operative pain, helping your baby recover quickly and comfortably.",
          },
          {
            title: "Faster Healing",
            body: "By reducing tissue trauma, the laser promotes a smoother recovery process.",
          },
          {
            title: "Precision Matters",
            body: "The LightScalpel allows for highly accurate releases, improving feeding, tongue mobility, and overall airway health.",
          },
          {
            title: "Safe and Sterile",
            body: "The laser's sterilization properties lower the risk of infection, ensuring a safe procedure for your baby.",
          },
        ],
        image: `${SERVICE_IMG}/laser.jpg`,
        imageSlot: "Close-up of a calm, alert baby",
        imageShape: "arch",
      },
      {
        eyebrow: "Gentle and Precise Tongue-Tie Releases",
        heading: "Advanced Care with the LightScalpel CO2 Laser",
        body: "Using the LightScalpel CO2 laser, we release your baby's tongue-tie with minimal discomfort and maximum precision. This advanced technology improves feeding and oral function while minimizing the impact on the surrounding tissue, so your little one is often calm and ready to feed soon after.",
        image: `${SERVICE_IMG}/value-2.jpg`,
        imageSlot: "Parent cradling a newborn",
      },
      {
        eyebrow: "Post-Procedure Guidance and Care",
        heading: "Supporting Your Baby's Healing Process",
        body: "After the procedure, you receive a customized post-op care plan with oral exercises, feeding tips, and scheduled follow-up support, so your baby heals well and adjusts to their new range of motion. You are never left to figure it out alone.",
        image: `${SERVICE_IMG}/service-post-op-care.jpg`,
        imageSlot: "Mother feeding a content baby",
      },
      {
        eyebrow: "Collaborative Feeding Support",
        heading: "Helping You and Your Baby Thrive Together",
        body: "Our combination of oral-tie expertise and lactation counseling means we address feeding comprehensively. From latch improvement to bottle transitions, we support your feeding journey every step of the way and collaborate with your lactation consultant, pediatrician, or bodyworker.",
        image: `${SERVICE_IMG}/value-1.jpg`,
        imageSlot: "Mother smiling with her baby",
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
      "Gentle CO2 laser tongue-tie, lip-tie, and buccal-tie releases for infants in Austin, TX with Dr. Kacie Culotta, DMD. The gold-standard LightScalpel laser for comfort and faster healing.",
    primaryKeyword: "laser tongue tie release Austin",
  },

  {
    slug: "consultations",
    title: "1-on-1 In-Office Consultations",
    shortTitle: "1-on-1 Consultations",
    navTitle: "1-on-1 Consultations",
    excerpt:
      "Comprehensive in-person evaluations of your baby's feeding, oral anatomy, and overall health, with a personalized care plan you can trust.",
    photoSlot: "Hands evaluating a baby during a consultation",
    hero: {
      eyebrow: "1-on-1 Consultations",
      title: "Personalized Care for You and Your Baby",
      subhead:
        "One-on-One Consultations for Functional Feeding and Wellness Solutions",
      intro:
        "An infant feeding consultation in Austin should never feel rushed. At Latched Beginnings, your visit is a thorough, unhurried evaluation with Dr. Kacie Culotta, the only Austin dentist who is also a certified lactation counselor. We combine hands-on expertise with genuine support for feeding challenges, oral ties, and infant wellness, and we build a personalized plan that helps your family thrive. Not every baby needs a release, and we will always tell you the truth.",
      image: `${SERVICE_IMG}/service-consultations.jpg`,
      imageSlot: "Hands gently supporting a baby during a consultation",
    },
    scope: {
      eyebrow: "Service Offer",
      title: "Scope Our Services",
      intro:
        "Every consultation is built around your baby, your concerns, and what you are hoping for.",
      cards: [
        {
          title: "Why Choose an In-Person Consultation?",
          body: "Our in-person consultations provide the clarity and support you need to overcome challenges and move forward with confidence.",
        },
        {
          title: "Hands-On Expertise",
          body: "Work directly with Dr. Culotta, a laser-certified dentist and lactation counselor, for a comprehensive, whole-baby evaluation.",
        },
        {
          title: "Customized Solutions",
          body: "Every consultation is tailored to your family's specific needs, from feeding issues to oral ties and airway health.",
        },
        {
          title: "Collaborative Support",
          body: "We partner with you to create a personalized care plan that ensures progress and peace of mind.",
        },
      ],
    },
    sections: [
      {
        eyebrow: "Comprehensive Infant Assessments",
        heading: "Understanding Your Baby's Unique Needs",
        body: "During your consultation, Dr. Culotta conducts a detailed evaluation of your baby's feeding habits, oral anatomy, tongue mobility, and overall health. We work to uncover the root cause of feeding challenges and create a targeted care plan that addresses your baby's specific needs.",
        image: `${SERVICE_IMG}/value-2.jpg`,
        imageSlot: "Parent cradling a newborn",
        imageShape: "arch",
      },
      {
        eyebrow: "Expert Guidance on Feeding Solutions",
        heading: "From Latching Struggles to Bottle Feeding Success",
        body: "Whether you are breastfeeding, bottle feeding, or both, we are here to help. Dr. Culotta's lactation counseling credentials allow us to offer practical, personalized strategies that support your baby's feeding journey and ease the worry that comes with it.",
        image: `${SERVICE_IMG}/service-post-op-care.jpg`,
        imageSlot: "Mother feeding a content baby",
      },
      {
        eyebrow: "Tailored Oral Tie Evaluations",
        heading: "Identifying and Addressing Oral Restrictions",
        body: "If you suspect your baby may have a tongue-tie, lip-tie, or buccal-tie, we provide a thorough, conservative evaluation and an honest discussion of potential next steps. Our approach aligns with American Academy of Pediatrics guidance, so you are informed and supported throughout the process.",
        image: `${SERVICE_IMG}/laser.jpg`,
        imageSlot: "Close-up of a calm, alert baby",
      },
      {
        eyebrow: "Post-Consultation Support and Follow-Up",
        heading: "Ongoing Care for Long-Term Success",
        body: "Our care does not end when you leave. We provide follow-up instructions, exercises, and continued support to ensure long-term progress, and our team stays reachable to answer your questions and guide you every step of the way.",
        image: `${SERVICE_IMG}/story.jpg`,
        imageSlot: "Family holding their baby together",
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
      "Book a 1-on-1 infant feeding and tongue-tie consultation in Austin, TX with Dr. Kacie Culotta, DMD. A thorough, compassionate evaluation and a personalized care plan for your baby.",
    primaryKeyword: "tongue tie consultation Austin",
  },

  {
    slug: "post-op-care",
    title: "Post-Operative Care",
    shortTitle: "Post-Op Care",
    navTitle: "Post-Op Care",
    excerpt:
      "Thoughtful support before and after the procedure. We guide you every step of the way toward healing and lasting results.",
    photoSlot: "Mother nursing a content baby",
    hero: {
      eyebrow: "Post-Op Care",
      title: "Healing with Confidence",
      subhead: "Comprehensive Post-Op Care for You and Your Baby",
      intro:
        "Frenectomy aftercare in Austin matters as much as the release itself. Your journey does not end after the procedure. At Latched Beginnings, we support you every step of the way with tailored post-operative care designed for optimal healing and long-term success. From feeding guidance to gentle oral exercises, Dr. Kacie Culotta gives you the tools, knowledge, and follow-up to help you and your baby thrive.",
      image: `${SERVICE_IMG}/service-post-op-care.jpg`,
      imageSlot: "Mother nursing a content baby at home",
    },
    scope: {
      eyebrow: "Service Offer",
      title: "Scope Our Services",
      intro:
        "Recovery is a journey, and we walk it with you from the first day home.",
      cards: [
        {
          title: "Expert Guidance Every Step of the Way",
          body: "Dr. Kacie Culotta provides personalized post-op care plans tailored to your baby's unique needs.",
        },
        {
          title: "Functional Healing Approach",
          body: "We combine oral exercises, lactation support, and airway health to support whole-body wellness.",
        },
        {
          title: "Faster Recovery, Better Outcomes",
          body: "Our specialized care supports comfortable healing, reduces discomfort, and helps results last.",
        },
        {
          title: "Ongoing Support for Long-Term Success",
          body: "You are not alone. Our team is here to help you navigate the post-op period with confidence.",
        },
      ],
    },
    sections: [
      {
        eyebrow: "A Personalized Care Plan",
        heading: "A Plan Tailored to Your Baby's Needs",
        body: "Every baby is unique. After the procedure, we provide a personalized plan tailored to your baby's specific needs, including feeding adjustments and healing exercises, to support the best possible outcomes.",
        image: `${SERVICE_IMG}/value-1.jpg`,
        imageSlot: "Mother smiling with her baby",
        imageShape: "arch",
      },
      {
        eyebrow: "Gentle Healing Exercises",
        heading: "Promoting Healing Through Gentle Movements",
        body: "Oral exercises play a key role in proper healing and tongue function. We teach you step-by-step how to perform these gentle exercises at home, promoting a smooth recovery and improved feeding for your baby.",
        image: `${SERVICE_IMG}/service-consultations.jpg`,
        imageSlot: "Hands gently supporting a baby",
      },
      {
        eyebrow: "Feeding and Latch Support",
        heading: "Strengthening the Bond Between You and Your Baby",
        body: "Navigating feeding changes after a release can feel overwhelming. With Dr. Culotta's dual expertise in dentistry and lactation counseling, you receive the guidance you need to help your baby achieve a strong, effective latch.",
        image: `${SERVICE_IMG}/referrals.jpg`,
        imageSlot: "Mother and baby cheek to cheek",
      },
      {
        eyebrow: "Follow-Up Care",
        heading: "Supporting Your Baby's Journey Every Step of the Way",
        body: "Healing is a journey, and we are with you throughout. Our follow-up appointments monitor your baby's progress, address any concerns, and adjust the care plan to ensure a smooth recovery and lasting benefits.",
        image: `${SERVICE_IMG}/story.jpg`,
        imageSlot: "Family holding their baby together",
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
