"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { workshop } from "@/lib/content/workshop";

type Status = "idle" | "submitting" | "success" | "error";

/** reserve: hold a seat. waitlist: seats are gone. next: workshop has passed. */
export type WorkshopFormMode = "reserve" | "waitlist" | "next";

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-charcoal placeholder:text-stone/55 transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/25";

const selectClass = `${inputClass} cursor-pointer appearance-none pr-11`;

// Same Web3Forms inbox as the appointment form (see AppointmentForm.tsx).
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "3443455b-44cc-4273-a5ec-103b2b0993b8";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const UTM_STORAGE_KEY = "lb-workshop-utm";

type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/**
 * Read UTM tags from the landing URL so every reservation records where the
 * attendee came from, even without analytics. Kept for the tab session so the
 * tags survive an in-page scroll or reload.
 */
function useUtm(): Utm {
  const [utm, setUtm] = useState<Utm>({});
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Utm = {};
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) fromUrl[key] = value.slice(0, 100);
    }
    if (Object.keys(fromUrl).length) {
      try {
        sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(fromUrl));
      } catch {}
      setUtm(fromUrl);
      return;
    }
    try {
      const saved = sessionStorage.getItem(UTM_STORAGE_KEY);
      if (saved) setUtm(JSON.parse(saved));
    } catch {}
  }, []);
  return utm;
}

const copy: Record<
  WorkshopFormMode,
  { subject: string; button: string; title: string; body: string }
> = {
  reserve: {
    subject: "Workshop seat reservation",
    button: "Reserve My Seat",
    title: "Your Seat Request Is In",
    body: "Thank you! Our team will email you a secure payment link within one business day. Seats are confirmed in the order payment is received.",
  },
  waitlist: {
    subject: "Workshop waitlist",
    button: "Join the Waitlist",
    title: "You're on the Waitlist",
    body: "Thank you! If a seat opens up, or when we add a second session, you'll be the first to hear from us.",
  },
  next: {
    subject: "Next workshop interest",
    button: "Notify Me About the Next Workshop",
    title: "We'll Keep You Posted",
    body: "Thank you! You'll be the first to hear when the next Birth Professionals Workshop is on the calendar.",
  },
};

export function WorkshopForm({ mode }: { mode: WorkshopFormMode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const utm = useUtm();
  const text = copy[mode];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: if filled, silently succeed without sending anything.
    if ((fd.get("company") ?? "").toString().trim()) {
      form.reset();
      setStatus("success");
      return;
    }

    const name = (fd.get("name") ?? "").toString().trim();
    const email = (fd.get("email") ?? "").toString().trim();
    const phone = (fd.get("phone") ?? "").toString().trim();
    const role = (fd.get("role") ?? "").toString().trim();
    if (!name || !email || !phone || !role) {
      setStatus("error");
      setError("Please add your name, email, phone, and role.");
      return;
    }

    setStatus("submitting");
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `${text.subject} (${workshop.dateShort}): ${name}`,
          from_name: "Latched Beginnings Website",
          request_type: text.subject,
          workshop: `${workshop.title}, ${workshop.dateLabel}, ${workshop.timeLabel}`,
          name,
          email,
          phone,
          role,
          practice_or_organization:
            (fd.get("organization") ?? "").toString().trim() || "Not provided",
          questions_or_notes:
            (fd.get("message") ?? "").toString().trim() || "Not provided",
          utm_source: utm.utm_source || "direct / none",
          utm_medium: utm.utm_medium || "none",
          utm_campaign: utm.utm_campaign || "none",
          utm_content: utm.utm_content || "none",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.success) {
        throw new Error(
          "Something went wrong. Please try again or give us a call.",
        );
      }
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or give us a call.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[1.75rem] border border-blush-200 bg-white p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blush text-coral-deep">
          <Check className="h-7 w-7" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-2xl text-ink">{text.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-stone">{text.body}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[1.75rem] border border-blush-200 bg-white p-6 sm:p-8"
    >
      {/* Honeypot: hidden from people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="ws-name"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Your name <span className="text-coral">*</span>
            </label>
            <input
              id="ws-name"
              name="name"
              required
              autoComplete="name"
              placeholder="First and last name"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="ws-phone"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Phone <span className="text-coral">*</span>
            </label>
            <input
              id="ws-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="(512) 555-0123"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="ws-email"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Email <span className="text-coral">*</span>
          </label>
          <input
            id="ws-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="ws-role"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Your role <span className="text-coral">*</span>
            </label>
            <div className="relative">
              <select
                id="ws-role"
                name="role"
                required
                defaultValue=""
                className={selectClass}
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="Doula">Doula</option>
                <option value="IBCLC or lactation professional">
                  IBCLC or lactation professional
                </option>
                <option value="Midwife">Midwife</option>
                <option value="Postpartum or L&D nurse">
                  Postpartum or L&amp;D nurse
                </option>
                <option value="Other birth professional">
                  Other birth professional
                </option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="ws-organization"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Practice or organization{" "}
              <span className="font-normal text-stone">(optional)</span>
            </label>
            <input
              id="ws-organization"
              name="organization"
              autoComplete="organization"
              placeholder="e.g. Austin Doula Collective"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="ws-message"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Questions or notes{" "}
            <span className="font-normal text-stone">(optional)</span>
          </label>
          <textarea
            id="ws-message"
            name="message"
            rows={3}
            placeholder="Anything you'd like Dr. Culotta to cover?"
            className={`${inputClass} resize-y`}
          />
        </div>

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
              {text.button}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </Button>

        <p className="text-center text-xs leading-relaxed text-stone">
          Prefer to talk it through? Call us at{" "}
          <a
            href={site.phoneHref}
            className="font-semibold text-coral-deep hover:text-coral"
          >
            {site.phone}
          </a>
          .
        </p>
      </div>
    </form>
  );
}

/**
 * Checkout button for when a Stripe Payment Link is set. Passes the visitor's
 * UTM tags through so Stripe records the source on the payment as well.
 */
export function WorkshopCheckoutButton({ href }: { href: string }) {
  const utm = useUtm();
  const url = new URL(href);
  for (const [key, value] of Object.entries(utm)) {
    if (value) url.searchParams.set(key, value);
  }
  return (
    <Button href={url.toString()} size="lg" className="w-full">
      Register &amp; Pay ${workshop.price}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Button>
  );
}
