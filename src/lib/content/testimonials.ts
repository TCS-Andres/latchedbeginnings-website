/**
 * Testimonials.
 *
 * IMPORTANT: These are PLACEHOLDER quotes written in the brand voice to make the
 * design real. They must be REPLACED with genuine Google reviews / patient
 * testimonials (with consent) before launch. The old WordPress export only held
 * demo theme content, so there is no real source to migrate from yet.
 */

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  rating: number;
};

export const reviewSummary = {
  rating: 5.0,
  count: 54, // TODO: confirm real Google review count
  source: "Google",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Dr. Culotta was so great with our baby. She was patient and gentle through the entire process. We ended up doing a tongue and lip tie revision and saw improvement with breastfeeding within a few days.",
    name: "Placeholder review",
    detail: "Replace with a real Google review",
    rating: 5,
  },
  {
    quote:
      "After months of painful feeding and being told everything was fine, Dr. Kacie finally listened. The consultation was thorough and never rushed. I felt seen for the first time.",
    name: "Placeholder review",
    detail: "Replace with a real Google review",
    rating: 5,
  },
  {
    quote:
      "The whole team are moms, and you feel it the moment you walk in. They walked us through every step and the aftercare support was incredible. Our little one is finally thriving.",
    name: "Placeholder review",
    detail: "Replace with a real Google review",
    rating: 5,
  },
];
