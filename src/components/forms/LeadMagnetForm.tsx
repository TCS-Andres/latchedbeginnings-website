"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { useUtm } from "@/lib/useUtm";

type Status = "idle" | "submitting" | "success" | "error";

export type LeadMagnetSource = "newborn-feeding-guide" | "oral-tie-checklist";

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-charcoal placeholder:text-stone/55 transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/25";

// Same Web3Forms inbox as the appointment and workshop forms. Used only when
// the Brevo route is not configured yet, so a signup is never lost.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "3443455b-44cc-4273-a5ec-103b2b0993b8";

const BABY_STAGES = ["Expecting", "0 to 2 weeks", "2 to 6 weeks", "6 weeks or older"];

/**
 * Email capture for a free download. On success the visitor gets the file
 * right away plus a gentle path to booking.
 *
 * `trackLead` sends a single GA4 `generate_lead` event naming the resource, with
 * no form data. Leave it off on routes excluded from analytics (the symptoms
 * checklist), where nothing may reach a tracker.
 */
export function LeadMagnetForm({
  source,
  resourceName,
  downloadUrl,
  buttonLabel,
  askBabyStage = false,
  trackLead = false,
}: {
  source: LeadMagnetSource;
  resourceName: string;
  downloadUrl: string;
  buttonLabel: string;
  askBabyStage?: boolean;
  trackLead?: boolean;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const utm = useUtm(`lb-${source}-utm`);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if ((fd.get("company") ?? "").toString().trim()) {
      form.reset();
      setStatus("success");
      return;
    }

    const firstName = (fd.get("firstName") ?? "").toString().trim();
    const email = (fd.get("email") ?? "").toString().trim();
    const babyStage = (fd.get("babyStage") ?? "").toString().trim();
    if (!firstName || !email) {
      setStatus("error");
      setError("Please add your first name and email.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          source,
          firstName,
          email,
          babyStage,
          utmSource: utm.utm_source || "",
        }),
      });
      const json = await res.json().catch(() => ({}));

      if (res.status === 503 && json.error === "not_configured") {
        await sendToInbox({ firstName, email, babyStage });
      } else if (!res.ok || !json.ok) {
        throw new Error(json.error || "Something went wrong. Please try again.");
      }

      if (trackLead && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", { lead_type: source });
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

  async function sendToInbox(fields: { firstName: string; email: string; babyStage: string }) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `${resourceName} signup: ${fields.firstName}`,
        from_name: "Latched Beginnings Website",
        request_type: `${resourceName} signup`,
        first_name: fields.firstName,
        email: fields.email,
        baby_stage: fields.babyStage || "Not provided",
        utm_source: utm.utm_source || "direct / none",
        utm_medium: utm.utm_medium || "none",
        utm_campaign: utm.utm_campaign || "none",
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.success) {
      throw new Error("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.75rem] border border-blush-200 bg-white p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush text-coral-deep">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">Your {resourceName} Is Ready</h3>
        <p className="mt-3 text-base leading-relaxed text-stone">
          Thank you! Download it below. We&apos;ll also send a few gentle tips
          from Dr. Culotta to your inbox.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3">
          <Button href={downloadUrl} size="lg" external>
            <Download className="h-4 w-4" aria-hidden="true" />
            Download Now
          </Button>
          <p className="text-sm text-stone">
            Worried about feeding right now?{" "}
            <a
              href={site.bookingUrl}
              className="font-semibold text-coral-deep hover:text-coral"
            >
              Schedule a consultation
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.75rem] border border-blush-200 bg-white p-6 sm:p-8"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5">
        <div>
          <label
            htmlFor={`${source}-first-name`}
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            First name <span className="text-coral">*</span>
          </label>
          <input
            id={`${source}-first-name`}
            name="firstName"
            required
            autoComplete="given-name"
            placeholder="Your first name"
            className={inputClass}
          />
        </div>

        <div>
          <label
            htmlFor={`${source}-email`}
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Email <span className="text-coral">*</span>
          </label>
          <input
            id={`${source}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        {askBabyStage ? (
          <div>
            <label
              htmlFor={`${source}-stage`}
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Your baby&apos;s age{" "}
              <span className="font-normal text-stone">(optional)</span>
            </label>
            <div className="relative">
              <select
                id={`${source}-stage`}
                name="babyStage"
                defaultValue=""
                className={`${inputClass} cursor-pointer appearance-none pr-11`}
              >
                <option value="">Choose one</option>
                {BABY_STAGES.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
                aria-hidden="true"
              />
            </div>
          </div>
        ) : null}

        {status === "error" && error ? (
          <p role="alert" className="text-sm font-medium text-coral-deep">
            {error}
          </p>
        ) : null}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              {buttonLabel}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center text-xs leading-relaxed text-stone">
          Free. Unsubscribe anytime. We never share your email. See our{" "}
          <a href="/privacy-policy" className="underline hover:text-coral-deep">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
