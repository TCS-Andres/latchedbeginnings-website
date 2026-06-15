/**
 * Testimonials. These are the real, published patient reviews from the live
 * Latched Beginnings site (the "Stories of Change" section). Names appear as
 * published (first name + last initial).
 */

export type Testimonial = {
  quote: string;
  name: string;
  detail: string;
  rating: number;
};

export const reviewSummary = {
  rating: 5.0,
  count: 50, // TODO: confirm current Google review count
  source: "Google",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Dr. Culotta is awesome! She really spends time providing care during the consultation and follow up, gets to know about your little one in depth, and takes her time explaining everything and answering any questions. She made us feel very cared for and seen. The procedure went well and a bonus is getting the cutest photos ever of your little one in the goggles they need to wear for the procedure. 10/10 would recommend.",
    name: "Danielle M.",
    detail: "Google review",
    rating: 5,
  },
  {
    quote:
      "I can't express enough gratitude for Dr. Culotta! We came to see her after our lactation consultant recommended Latched Beginnings for a potential tongue and lip tie revision. I was super hesitant because who wants to put their baby through that. But Dr. Culotta was super communicative and transparent about what she recommends and had us start with some bodywork first. We then decided to go through with the revision and just a few days later our baby is eating so much better than she was pre-revision. Working with her has been a game changer!",
    name: "Rebecca M.",
    detail: "Google review",
    rating: 5,
  },
  {
    quote:
      "Dr. Culotta and her team were amazing! Her entire staff was super professional and caring. She makes sure the babies are fully comfortable and numb for the quick procedures, and she goes above and beyond to educate parents. We're very grateful she was able to help us with our baby's tongue tie release. It's been a couple months now, and our baby has been doing very well feeding and growing!",
    name: "Yiwei G.",
    detail: "Google review",
    rating: 5,
  },
];
