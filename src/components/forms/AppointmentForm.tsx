"use client";

import { useState } from "react";
import { CalendarCheck, Check, ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-charcoal placeholder:text-stone/55 transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/25";

// Web3Forms delivers the submission to the inbox tied to this access key.
// It must be submitted from the browser (client-side); the key is meant to be
// public. Override via NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY if desired.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
  "3443455b-44cc-4273-a5ec-103b2b0993b8";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

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
    const phone = (fd.get("phone") ?? "").toString().trim();
    const email = (fd.get("email") ?? "").toString().trim();
    if (!name || !phone || !email) {
      setStatus("error");
      setError("Please add your name, phone, and email.");
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
          subject: `New appointment request: ${name}`,
          from_name: "Latched Beginnings Website",
          name,
          email,
          phone,
          baby_age: (fd.get("babyAge") ?? "").toString().trim() || "Not provided",
          preferred_times:
            (fd.get("preferredTime") ?? "").toString().trim() || "Not provided",
          heard_about_us:
            (fd.get("heardAbout") ?? "").toString().trim() || "Not provided",
          message: (fd.get("message") ?? "").toString().trim() || "Not provided",
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
        <h3 className="mt-5 font-display text-2xl text-ink">
          Thank You, We&apos;ve Got It
        </h3>
        <p className="mt-3 text-base leading-relaxed text-stone">
          Your request is on its way to our team. We&apos;ll reach out within one
          business day to find a time that works for you and your little one.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-coral-deep transition-colors hover:text-coral"
        >
          Send another request
        </button>
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
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Your name <span className="text-coral">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              autoComplete="name"
              placeholder="First and last name"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Phone <span className="text-coral">*</span>
            </label>
            <input
              id="phone"
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
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            Email <span className="text-coral">*</span>
          </label>
          <input
            id="email"
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
              htmlFor="babyAge"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Baby&apos;s age <span className="font-normal text-stone">(optional)</span>
            </label>
            <input
              id="babyAge"
              name="babyAge"
              placeholder="e.g. 3 weeks"
              className={inputClass}
            />
          </div>
          <div>
            <label
              htmlFor="preferredTime"
              className="mb-1.5 block text-sm font-medium text-charcoal"
            >
              Preferred days/times{" "}
              <span className="font-normal text-stone">(optional)</span>
            </label>
            <input
              id="preferredTime"
              name="preferredTime"
              placeholder="e.g. weekday mornings"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="heardAbout"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            How did you hear about us?{" "}
            <span className="font-normal text-stone">(optional)</span>
          </label>
          <div className="relative">
            <select
              id="heardAbout"
              name="heardAbout"
              defaultValue=""
              className={`${inputClass} cursor-pointer appearance-none pr-11`}
            >
              <option value="">Select one</option>
              <option value="Referred by a friend or family">
                Referred by a friend or family
              </option>
              <option value="Referred by a doctor or provider">
                Referred by a doctor or provider
              </option>
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="Google search">Google search</option>
              <option value="Local magazine">Local magazine</option>
              <option value="Other">Other</option>
            </select>
            <ChevronDown
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone"
              aria-hidden="true"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="message"
            className="mb-1.5 block text-sm font-medium text-charcoal"
          >
            How can we help?{" "}
            <span className="font-normal text-stone">(optional)</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Tell us a little about what's bringing you in."
            className={`${inputClass} resize-y`}
          />
          <p className="mt-2 text-xs leading-relaxed text-stone">
            Please avoid sharing sensitive medical details here. We&apos;ll go over
            everything privately at your visit.
          </p>
        </div>

        {status === "error" ? (
          <p
            role="alert"
            className="rounded-2xl bg-coral/10 px-4 py-3 text-sm text-coral-deep"
          >
            {error}
          </p>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            type="submit"
            size="lg"
            disabled={status === "submitting"}
            className="disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                Request Appointment
              </>
            )}
          </Button>
          <p className="text-sm text-stone">
            Or call{" "}
            <a
              href={site.phoneHref}
              className="font-semibold text-coral-deep transition-colors hover:text-coral"
            >
              {site.phone}
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
