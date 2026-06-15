import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing your use of the Latched Beginnings website, including our medical disclaimer, for our dental and lactation practice in Austin, TX.",
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Terms & Conditions", url: "/terms-and-conditions" },
        ]}
      />

      <PageHero
        align="left"
        eyebrow="Legal"
        title="Terms &amp; Conditions"
        intro="Last updated June 2026."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Terms & Conditions", href: "/terms-and-conditions" },
        ]}
      />

      <Section tone="white">
        <Container size="narrow">
          {/* TODO: legal review required */}
          <Reveal>
            <div className="rounded-[1.75rem] border border-blush-200 bg-blush-200/40 p-6 sm:p-7">
              <p className="text-sm leading-relaxed text-charcoal">
                <strong className="text-ink">Please note:</strong> This is a
                starting template provided to help Latched Beginnings get
                online. It is not legal advice. Please have a licensed attorney
                review and tailor these terms to your practice before publishing
                them.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <article className="prose prose-lg mt-10 max-w-none text-charcoal">
              <p className="lead text-base leading-relaxed text-stone sm:text-lg">
                Welcome to Latched Beginnings. These Terms &amp; Conditions (the
                &quot;Terms&quot;) explain the rules for using our website. By
                visiting and using this site, you agree to the Terms below. We
                have written them as plainly as we can so the experience feels
                as warm and clear as the care we provide.
              </p>

              <h2>1. Acceptance of these terms</h2>
              <p>
                By accessing or using the Latched Beginnings website, you confirm
                that you have read, understood, and agree to be bound by these
                Terms and by our Privacy Policy. If you do not agree with any
                part of these Terms, please do not use the site. We may update
                these Terms from time to time, and your continued use of the site
                after we post changes means you accept the updated Terms.
              </p>

              <h2>2. Use of the site</h2>
              <p>
                You may use this site for lawful, personal, and informational
                purposes only. We ask that you do not misuse the site or
                interfere with how it works for other families. By way of
                example, you agree not to:
              </p>
              <ul>
                <li>
                  Use the site in any way that violates an applicable local,
                  state, or federal law or regulation.
                </li>
                <li>
                  Attempt to gain unauthorized access to the site, its servers,
                  or any connected systems or networks.
                </li>
                <li>
                  Introduce viruses, malicious code, or any other material that
                  could harm the site or its visitors.
                </li>
                <li>
                  Copy, reproduce, or republish our content for commercial
                  purposes without our written permission.
                </li>
              </ul>
              <p>
                We reserve the right to limit or end access to the site, in whole
                or in part, at any time and without notice if we believe the site
                is being misused.
              </p>

              <h2>3. Medical disclaimer</h2>
              <p>
                The content on this website, including articles, guides,
                checklists, frequently asked questions, and other resources, is
                provided for general educational and informational purposes only.
                It reflects our heart-led, evidence-based approach to whole-baby
                care, and it is meant to help you feel more informed and
                supported as you make decisions for your family.
              </p>
              <p>
                The content on this site is <strong>not</strong> a substitute for
                professional medical, dental, or lactation advice, diagnosis, or
                treatment. Using this site does not create a doctor-patient or
                provider-patient relationship between you and Latched Beginnings
                or Dr. Kacie Culotta. Every baby and every family is different,
                and not every baby needs a release. Please trust your instincts
                and consult a qualified healthcare provider with any questions
                about your or your child&apos;s health.
              </p>
              <p>
                Never disregard or delay seeking professional medical advice
                because of something you have read on this website. If you
                believe your child is experiencing a medical emergency, call your
                physician or 911 right away.
              </p>

              <h2>4. Intellectual property</h2>
              <p>
                Unless noted otherwise, all content on this website, including
                text, photography, graphics, the Latched Beginnings name and
                logo, and the overall look and feel, is owned by or licensed to
                Latched Beginnings and is protected by copyright, trademark, and
                other intellectual property laws. You may view and share this
                content for personal, non-commercial use, as long as you keep all
                copyright and other proprietary notices intact. You may not
                otherwise reproduce, distribute, modify, or create derivative
                works from our content without our prior written consent.
              </p>

              <h2>5. Third-party links</h2>
              <p>
                Our website may include links to third-party websites, tools, or
                resources, such as our scheduling provider, social media
                profiles, or trusted partners. We share these links for your
                convenience and because we believe they may be helpful. We do not
                control these third-party sites and are not responsible for their
                content, privacy practices, or accuracy. Visiting a linked site
                is at your own discretion, and we encourage you to review the
                terms and privacy policies of any third-party site you visit.
              </p>

              <h2>6. Limitation of liability</h2>
              <p>
                We work hard to keep the information on this site accurate,
                current, and useful, but we provide the site and its content on
                an &quot;as is&quot; and &quot;as available&quot; basis without
                warranties of any kind, whether express or implied. To the
                fullest extent permitted by law, Latched Beginnings, Dr. Kacie
                Culotta, and our team will not be liable for any direct,
                indirect, incidental, consequential, or other damages arising
                from your use of, or inability to use, this website or any
                content on it. Some jurisdictions do not allow certain
                limitations, so some of these limitations may not apply to you.
              </p>

              <h2>7. Changes to these terms</h2>
              <p>
                We may revise these Terms from time to time to reflect changes in
                our practice, our website, or the law. When we do, we will update
                the &quot;Last updated&quot; date at the top of this page. We
                encourage you to review these Terms periodically so you stay
                informed. Your continued use of the site after any change means
                you accept the revised Terms.
              </p>

              <h2>8. Governing law</h2>
              <p>
                These Terms are governed by and construed in accordance with the
                laws of the State of Texas, without regard to its conflict of law
                principles. Any dispute relating to these Terms or your use of
                the site will be subject to the exclusive jurisdiction of the
                state and federal courts located in Travis County, Texas.
              </p>

              <h2>9. Contact us</h2>
              <p>
                We are always happy to hear from you. If you have any questions
                about these Terms, please reach out:
              </p>
              <ul>
                <li>
                  Email:{" "}
                  <a href={site.emailHref}>{site.email}</a>
                </li>
                <li>
                  Phone:{" "}
                  <a href={site.phoneHref}>{site.phone}</a>
                </li>
                <li>{site.address.full}</li>
              </ul>
            </article>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
