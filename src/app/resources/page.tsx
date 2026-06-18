import type { Metadata } from "next";
import Image from "next/image";
import {
  FileText,
  PlayCircle,
  BookOpen,
  Users,
  ArrowRight,
  Download,
} from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Resources for Parents",
  description:
    "Free tongue-tie and feeding resources from Latched Beginnings in Austin, TX: downloadable guides and checklists, free on-demand webinars, our parent blog, and provider referrals.",
  alternates: { canonical: "/resources" },
};

const resources = [
  {
    icon: FileText,
    title: "Oral Tie Symptoms Checklist",
    description:
      "A gentle, printable guide to the feeding and comfort signs we look for in babies. Use it to organize what you are noticing before your first visit. It is a starting point, never a diagnosis.",
    href: "/resources/oral-tie-symptoms-checklist",
    cta: "Get the checklist",
  },
  {
    icon: PlayCircle,
    title: "Webinars",
    description:
      "Free, on-demand webinars with Dr. Culotta on tongue-tie, oral ties, pacifiers, and infant feeding. Watch on your schedule, pause to take notes, and revisit whenever a new question comes up.",
    href: "/resources/webinars",
    cta: "Browse webinars",
  },
  {
    icon: BookOpen,
    title: "The Blog",
    description:
      "Evidence-based, heart-led articles on tongue-tie, lip-tie, feeding, and aftercare. Written to inform and reassure you, so you can trust your instincts and make the call that feels right for your family.",
    href: "/blog",
    cta: "Read the blog",
  },
  {
    icon: Users,
    title: "Patient Referrals",
    description:
      "For pediatricians, lactation consultants, and bodyworkers: a clear path to refer a family our way. We believe in collaboration over prescription and keep you in the loop through every step of care.",
    href: "/patient-referrals",
    cta: "Refer a patient",
  },
];

const downloads = [
  {
    title: "Latched Beginnings Trifold",
    file: "/downloads/latched-trifold.pdf",
    img: "/images/resources/trifold.jpg",
    desc: "A quick overview of who we are and how we help, in a printable trifold you can keep or share.",
  },
  {
    title: "Is It a Tongue-Tie?",
    file: "/downloads/is-it-a-tongue-tie.pdf",
    img: "/images/resources/is-it-a-tongue-tie.jpg",
    desc: "A parent-friendly checklist for navigating feeding challenges and spotting the signs of a tie.",
  },
  {
    title: "Common Oral Tie Symptoms Checklist",
    file: "/downloads/common-oral-tie-checklist.pdf",
    img: "/images/resources/oral-tie-checklist.jpg",
    desc: "The feeding and comfort signs we look for in babies, in a simple list you can print and bring in.",
  },
  {
    title: "Client Referral Form",
    file: "/downloads/client-referral-form.pdf",
    img: "/images/resources/referral-form.jpg",
    desc: "For providers referring a family our way. Print it, complete it, and send it along with your patient.",
  },
  {
    title: "Austin, TX Travel & Local Guide",
    file: "/downloads/austin-travel-guide.pdf",
    img: "/images/resources/austin-guide.jpg",
    desc: "Traveling in for care? Our local guide to getting around Austin, where to stay, and what to enjoy.",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ]}
      />
      <PageHero
        eyebrow="For Parents"
        title="Resources to Help You Feel Confident"
        intro="Clear, compassionate guidance you can return to anytime. Download our guides, watch the free webinars, read the blog, and find the support that meets you where you are."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Resources", href: "/resources" },
        ]}
        cta={{ label: site.bookingLabel, href: site.bookingUrl }}
      />

      <Section tone="blush">
        <Container size="wide">
          <SectionHeading
            eyebrow="Printable Guides"
            title="Documents You Can Download"
            intro="Helpful guides and forms to download, print, and share. Take what is useful for you and your family."
            align="center"
          />

          <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((doc, i) => (
              <Reveal as="article" key={doc.file} delay={i * 70}>
                <a
                  href={doc.file}
                  download
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-blush-200 bg-white transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(196,110,120,0.6)]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-blush">
                    <Image
                      src={doc.img}
                      alt={`${doc.title} preview`}
                      fill
                      className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-xl text-ink">
                      {doc.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-stone">
                      {doc.desc}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-coral-deep">
                      <Download className="h-4 w-4" aria-hidden="true" />
                      Download PDF
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white">
        <Container size="wide">
          <SectionHeading
            eyebrow="Explore"
            title="Tools and Education for Your Journey"
            intro="Every resource here is rooted in the same belief: informed, supported parents make the best decisions for their babies. Take what helps and leave the rest."
            align="center"
          />

          <div className="mt-14 grid gap-7 md:grid-cols-2">
            {resources.map((resource, i) => {
              const Icon = resource.icon;
              return (
                <Reveal as="article" key={resource.href} delay={i * 80}>
                  <div className="group flex h-full flex-col rounded-[1.75rem] border border-blush-200 bg-white p-8 transition-shadow duration-300 hover:shadow-[0_24px_50px_-30px_rgba(196,110,120,0.6)]">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blush text-coral-deep">
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                    <h3 className="mt-6 font-display text-2xl text-ink">
                      {resource.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-stone">
                      {resource.description}
                    </p>
                    <div className="mt-7">
                      <Button href={resource.href} variant="outline" size="md">
                        {resource.cta}
                        <ArrowRight
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          aria-hidden="true"
                        />
                      </Button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}
