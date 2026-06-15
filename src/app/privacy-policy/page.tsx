import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Latched Beginnings, a dental and lactation practice in Austin, TX, collects, uses, and protects your information when you visit our website or contact us.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy-policy" },
        ]}
      />

      <PageHero
        align="left"
        eyebrow="Legal"
        title="Privacy Policy"
        intro="Last updated June 2026."
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: "/privacy-policy" },
        ]}
      />

      <Section tone="white">
        <Container size="narrow">
          {/* TODO: legal review required */}
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-charcoal prose-li:text-charcoal">
            <p className="text-sm italic text-stone">
              This policy is a starting template and should be reviewed by a
              qualified attorney before launch.
            </p>

            <p>
              Latched Beginnings (&quot;we,&quot; &quot;us,&quot; or
              &quot;our&quot;) respects your privacy and is committed to
              protecting the information you share with us. This Privacy Policy
              explains how we collect, use, and safeguard information when you
              visit our website, reach out to us, or schedule care at our
              practice in Austin, TX. By using our website, you agree to the
              practices described below.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We collect only the information we need to respond to you and to
              keep our website running smoothly:
            </p>
            <ul>
              <li>
                <strong>Information you provide.</strong> When you submit a
                contact form, request an appointment, sign up for a resource, or
                email or call us, you may share your name, email address, phone
                number, your baby&apos;s general feeding concerns, and any
                message you choose to include.
              </li>
              <li>
                <strong>Information collected automatically.</strong> Like most
                websites, we gather standard technical and usage data such as
                your browser type, device, pages viewed, and how you found us.
                This helps us understand what families find helpful and improve
                the site.
              </li>
            </ul>
            <p>
              We do not ask you to share sensitive medical details through our
              website forms. Please keep any messages general and save the
              clinical specifics for your appointment.
            </p>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Respond to your questions and requests for care.</li>
              <li>Schedule, confirm, and follow up on appointments.</li>
              <li>
                Send resources, educational content, or updates you have asked
                to receive.
              </li>
              <li>Maintain, secure, and improve our website and services.</li>
              <li>Meet our legal, regulatory, and professional obligations.</li>
            </ul>

            <h2>Cookies and Analytics</h2>
            <p>
              Our website may use cookies and similar technologies to remember
              your preferences and to measure how the site is used. We may also
              use website analytics tools that collect aggregated, non-personal
              information about visits, such as page views and general location.
              You can adjust your browser settings to refuse or delete cookies,
              though some parts of the site may not function as intended if you
              do.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We rely on trusted third-party providers to help us operate, such
              as appointment scheduling tools, website hosting, email delivery,
              and analytics services. These providers may process limited
              information on our behalf and are expected to protect it. We do not
              sell your personal information, and we do not share it for
              unrelated marketing purposes.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable administrative, technical, and physical
              measures to protect the information you share with us against loss,
              misuse, and unauthorized access. No website or method of
              electronic transmission is perfectly secure, however, so we cannot
              guarantee absolute security. We encourage you to use care when
              sharing information online.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our website is intended for parents, caregivers, and healthcare
              providers, not for children. We do not knowingly collect personal
              information directly from children through this website. While we
              care for infants and young patients in our practice, that clinical
              information is provided by a parent or guardian and is handled
              according to applicable healthcare privacy laws. If you believe a
              child has provided us information through the website, please
              contact us so we can remove it.
            </p>

            <h2>Your Choices</h2>
            <p>You are always in control of your information. You may:</p>
            <ul>
              <li>
                Ask us what personal information we hold about you and request a
                copy.
              </li>
              <li>Ask us to correct or update inaccurate information.</li>
              <li>Ask us to delete information we are not required to keep.</li>
              <li>
                Unsubscribe from any optional emails at any time using the link
                in the message or by contacting us directly.
              </li>
            </ul>
            <p>
              To make any of these requests, reach out using the contact details
              below and we will respond as promptly as we reasonably can.
            </p>

            <h2>A Note on HIPAA and Protected Health Information</h2>
            <p>
              This Privacy Policy covers information collected through our
              website. The protected health information created or maintained as
              part of your clinical care is governed separately by our{" "}
              <Link href="/hipaa-notice">HIPAA Notice of Privacy Practices</Link>
              , which describes your rights and our responsibilities under
              federal health privacy law. If anything in this website policy
              appears to conflict with our HIPAA Notice, the HIPAA Notice
              controls with respect to your health information.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time as our
              practice, technology, or legal obligations change. When we do, we
              will revise the &quot;Last updated&quot; date at the top of this
              page. We encourage you to review this page periodically so you stay
              informed about how we protect your information.
            </p>

            <h2>How to Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how we handle
              your information, we are glad to help. You can reach us at:
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
              <li>Mailing address: {site.address.full}</li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
