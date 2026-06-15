import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "HIPAA Notice of Privacy Practices",
  description:
    "How Latched Beginnings may use and disclose your protected health information, and the rights you have under HIPAA, at our Austin, TX dental and lactation practice.",
  alternates: { canonical: "/hipaa-notice" },
};

export default function HipaaNoticePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "HIPAA Notice", url: "/hipaa-notice" },
        ]}
      />

      <PageHero
        align="left"
        eyebrow="Legal"
        title="HIPAA Notice of Privacy Practices"
        intro="Effective June 2026."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "HIPAA Notice", href: "/hipaa-notice" },
        ]}
      />

      {/* TODO: HIPAA compliance review required */}
      <Section tone="white">
        <Container size="narrow">
          <Reveal
            className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-charcoal prose-li:text-charcoal prose-strong:text-ink prose-a:text-coral-deep"
          >
            <p className="rounded-[1.75rem] border border-blush-200 bg-blush px-6 py-5 text-sm not-prose text-stone">
              <strong className="text-ink">Please note:</strong> This is a starting
              template and must be reviewed by a healthcare compliance attorney before
              use. It is provided to outline the structure of a Notice of Privacy
              Practices and does not constitute legal advice. Latched Beginnings will
              publish the final, attorney-approved version before this notice takes effect.
            </p>

            <p>
              <strong>THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE
              USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE
              REVIEW IT CAREFULLY.</strong>
            </p>

            <h2>Our Commitment to Your Privacy</h2>
            <p>
              At Latched Beginnings, caring for you and your baby includes caring for
              your privacy. We are committed to protecting the confidentiality of your
              health information, and we are required by the Health Insurance
              Portability and Accountability Act of 1996 (HIPAA) and related laws to
              maintain the privacy of your protected health information (PHI), to give
              you this notice of our legal duties and privacy practices, and to follow
              the terms of the notice currently in effect.
            </p>
            <p>
              &quot;Protected health information&quot; means information that identifies
              you, or that could reasonably be used to identify you, and that relates to
              your past, present, or future physical or mental health, the care you
              receive from us, or payment for that care.
            </p>

            <h2>How We May Use and Disclose Your Health Information</h2>
            <p>
              The following describes the ways we may use and disclose your protected
              health information. Not every use or disclosure will be listed, but the
              ways we are permitted to use and disclose information will fall within one
              of these categories.
            </p>

            <h3>For Treatment</h3>
            <p>
              We may use and disclose your health information to provide, coordinate,
              and manage your care and any related services. For example, Dr. Kacie
              Culotta and our clinical team may share information about a tongue-tie,
              lip-tie, or feeding evaluation with one another, and we may share relevant
              details with your pediatrician, lactation consultant, bodyworker, or other
              providers involved in your baby&apos;s care so that everyone supporting
              your family is working from the same picture.
            </p>

            <h3>For Payment</h3>
            <p>
              We may use and disclose your health information so that we can bill for and
              receive payment for the care we provide. For example, we may share
              information with your health plan to confirm coverage, to obtain prior
              authorization, or to submit a claim or superbill for a release procedure
              or consultation.
            </p>

            <h3>For Health Care Operations</h3>
            <p>
              We may use and disclose your health information to run our practice and to
              make sure you and our other families receive quality care. For example, we
              may use information to review and improve our clinical care, to train team
              members, to schedule appointments and post-op follow-ups, and to conduct
              business management and administrative activities.
            </p>

            <h2>Other Permitted and Required Uses and Disclosures</h2>
            <p>
              We may also use or disclose your health information, without your
              authorization, in the following circumstances when permitted or required
              by law:
            </p>
            <ul>
              <li>
                <strong>Appointment reminders and care information.</strong> To remind
                you of upcoming appointments, share post-operative care instructions, or
                tell you about treatment options and services that may benefit your
                family.
              </li>
              <li>
                <strong>Individuals involved in your care.</strong> To a family member,
                partner, or other person you involve in your or your baby&apos;s care,
                when relevant to that person&apos;s involvement and consistent with your
                wishes.
              </li>
              <li>
                <strong>As required by law.</strong> When federal, state, or local law
                requires the use or disclosure.
              </li>
              <li>
                <strong>Public health and safety.</strong> To public health authorities
                for activities such as preventing or controlling disease, or to prevent
                a serious threat to health or safety.
              </li>
              <li>
                <strong>Health oversight, legal, and regulatory.</strong> To health
                oversight agencies, and in response to a court order, subpoena, or other
                lawful process.
              </li>
              <li>
                <strong>Workers&apos; compensation, law enforcement, and similar.</strong>{" "}
                As authorized by and to the extent necessary to comply with applicable
                laws relating to workers&apos; compensation or similar programs, and for
                specified law enforcement purposes.
              </li>
              <li>
                <strong>Business associates.</strong> To outside vendors who perform
                services on our behalf, such as billing or scheduling support, only
                under written agreements that require them to protect your information.
              </li>
            </ul>
            <p>
              Most other uses and disclosures, including most uses and disclosures of
              psychotherapy notes, the use of your information for marketing, and the
              sale of your information, will be made only with your written
              authorization. You may revoke that authorization at any time, in writing,
              except to the extent we have already acted in reliance on it.
            </p>

            <h2>Your Rights Regarding Your Health Information</h2>
            <p>You have the following rights with respect to your protected health information:</p>
            <ul>
              <li>
                <strong>Right to access and copies.</strong> You have the right to
                inspect and request a copy of the health information we maintain about
                you and your baby, in a form and format you request when readily
                producible. We may charge a reasonable, cost-based fee.
              </li>
              <li>
                <strong>Right to request an amendment.</strong> If you believe
                information in your record is incorrect or incomplete, you may ask us to
                amend it. We may deny your request in certain cases and will explain our
                reasons in writing.
              </li>
              <li>
                <strong>Right to an accounting of disclosures.</strong> You have the
                right to request a list of certain disclosures we have made of your
                health information, other than those made for treatment, payment, health
                care operations, or with your authorization.
              </li>
              <li>
                <strong>Right to request restrictions.</strong> You have the right to
                ask us to limit how we use or disclose your information for treatment,
                payment, or health care operations. We are not required to agree to
                every request, but we will agree to restrict a disclosure to a health
                plan when you pay for the related service in full and out of pocket, as
                allowed by law.
              </li>
              <li>
                <strong>Right to confidential communications.</strong> You have the
                right to ask us to communicate with you about your health in a specific
                way or at a specific location, such as by a particular phone number or
                address. We will accommodate reasonable requests.
              </li>
              <li>
                <strong>Right to a paper copy of this notice.</strong> You have the
                right to a paper copy of this notice at any time, even if you have agreed
                to receive it electronically.
              </li>
              <li>
                <strong>Right to be notified of a breach.</strong> You have the right to
                be notified if there is a breach of your unsecured protected health
                information.
              </li>
              <li>
                <strong>Right to file a complaint.</strong> You have the right to file a
                complaint if you believe your privacy rights have been violated, as
                described below. You will not be penalized or retaliated against for
                filing a complaint.
              </li>
            </ul>
            <p>
              To exercise any of these rights, please contact us using the information
              below. Some requests must be made in writing, and we will let you know what
              is needed.
            </p>

            <h2>Our Duties</h2>
            <p>
              We are required by law to maintain the privacy of your protected health
              information, to provide you with this notice of our legal duties and
              privacy practices, and to abide by the terms of the notice currently in
              effect. We reserve the right to change the terms of this notice and to make
              the new provisions effective for all health information we maintain. If we
              make a material change, we will post the revised notice in our office and
              on our website, and we will make copies available upon request.
            </p>

            <h2>Contact Us and How to File a Complaint</h2>
            <p>
              If you have questions about this notice, would like to exercise any of your
              rights, or believe your privacy rights have been violated, please contact
              our Privacy Officer at Latched Beginnings:
            </p>
            <ul>
              <li>
                <strong>By mail:</strong> Latched Beginnings, Attn: Privacy Officer,{" "}
                {site.address.full}
              </li>
              <li>
                <strong>By phone:</strong>{" "}
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <strong>By email:</strong>{" "}
                <a href={site.emailHref}>{site.email}</a>
              </li>
            </ul>
            <p>
              You may also file a complaint with the U.S. Department of Health and Human
              Services, Office for Civil Rights, by sending a letter to 200 Independence
              Avenue, S.W., Washington, D.C. 20201, by calling 1-877-696-6775, or by
              visiting the Office for Civil Rights complaint portal. We will never
              retaliate against you for filing a complaint.
            </p>

            <p className="text-sm not-prose text-stone">
              Effective date: June 2026.{" "}
              {/* TODO: confirm final effective date with compliance counsel */}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
