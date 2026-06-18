export type Webinar = {
  slug: string;
  title: string;
  youtubeId: string;
  date: string; // YYYY-MM-DD (published)
  duration: string;
  excerpt: string;
  intro: string;
  learnings: { title: string; body: string }[];
};

/** On-demand webinars with Dr. Kacie Culotta, newest first. */
export const webinars: Webinar[] = [
  {
    slug: "all-about-pacifiers",
    title: "Pacifiers Don't Have To Be A Headache",
    youtubeId: "AWXWPnzy0eY",
    date: "2025-12-09",
    duration: "19 min",
    excerpt:
      "When pacifiers genuinely help, when they get in the way, and how to choose and use one in a way that supports your baby's oral development.",
    intro:
      "In this free on-demand webinar, Dr. Kacie Culotta breaks down everything parents are rarely told about pacifiers, from the moments they truly help to the habits worth watching, all in plain, reassuring language.",
    learnings: [
      {
        title: "When pacifiers genuinely help",
        body: "The soothing and self-regulation benefits a pacifier can offer, and the situations where reaching for one is a thoughtful, supportive choice.",
      },
      {
        title: "When they start to cause challenges",
        body: "Gentle signs that a pacifier may be getting in the way of feeding, sleep, or comfort, so you can respond early and with confidence.",
      },
      {
        title: "How to choose the right pacifier",
        body: "What to look for in shape, size, and material, and how to match a pacifier to your baby's stage rather than the marketing on the package.",
      },
      {
        title: "How to wean gently, on your timeline",
        body: "Calm, low-stress ways to ease away from the pacifier when the time feels right, with no rigid deadlines and no pressure.",
      },
      {
        title: "The link to oral development",
        body: "How sucking habits relate to the way the mouth, palate, and jaw grow, and what the current evidence does and does not say.",
      },
    ],
  },
  {
    slug: "what-pediatricians-dont-tell-you-about-oral-ties",
    title: "What Pediatricians Don't Always Tell You About Oral Ties",
    youtubeId: "ctZ8j0BdB5Q",
    date: "2025-09-16",
    duration: "28 min",
    excerpt:
      "Told everything looks fine, but your instincts say otherwise? What tongue, lip, and buccal ties really are, why they are so often overlooked, and what every parent deserves to know.",
    intro:
      "When you are told everything looks fine but your gut says something is off, you are not imagining it. In this free webinar, Dr. Kacie Culotta walks through what tongue, lip, and buccal ties really are, why they are so often missed at routine checkups, and what every parent deserves to know.",
    learnings: [
      {
        title: "What oral ties actually are",
        body: "Tongue, lip, and buccal ties explained in plain language, and why these restrictions matter for feeding and comfort.",
      },
      {
        title: "The signs that get missed",
        body: "The subtle feeding cues that are often overlooked at routine checkups, even when a baby is gaining weight.",
      },
      {
        title: "Why ‘everything looks fine’ isn't the whole story",
        body: "How a quick visual glance can miss a functional restriction that is making feeding harder than it should be.",
      },
      {
        title: "How to trust and advocate for your instincts",
        body: "Practical ways to speak up and seek a functional evaluation when something does not feel right.",
      },
      {
        title: "What a thorough assessment looks like",
        body: "How a full feeding-and-function evaluation differs from a brief look, and what to expect from one.",
      },
    ],
  },
  {
    slug: "is-it-a-tongue-tie-webinar",
    title: "Is It a Tongue-Tie? What Every Parent Needs to Know",
    youtubeId: "qsZJle7DbEw",
    date: "2025-08-01",
    duration: "29 min",
    excerpt:
      "The feeding struggles that can signal a tongue-tie, what to look for at home, and how to find clarity and the right next step for your baby.",
    intro:
      "If feeding has felt harder than it should, you are not alone and you are not overreacting. In this free webinar, Dr. Kacie Culotta helps you understand the feeding struggles that can point to a tongue-tie, what to look for, and how to find clarity and the right next step.",
    learnings: [
      {
        title: "The feeding struggles that raise a flag",
        body: "Painful latch, clicking sounds, very long feeds, reflux, and slow weight gain, and what they can be telling you.",
      },
      {
        title: "What a tongue-tie really is",
        body: "A calm, clear explanation of oral restriction and how it can affect the way your baby feeds.",
      },
      {
        title: "Signs you can look for at home",
        body: "Simple things you can observe and note before you ever step into an office.",
      },
      {
        title: "When it is time to seek an evaluation",
        body: "How to know it is worth getting checked, without panic and without pressure.",
      },
      {
        title: "What comes next",
        body: "What a one-on-one consultation, and if it is needed, a gentle release, actually involve.",
      },
    ],
  },
];

export function getWebinar(slug: string): Webinar | undefined {
  return webinars.find((w) => w.slug === slug);
}
