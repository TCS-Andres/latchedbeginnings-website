"use client";

import { useState } from "react";
import { CalendarCheck, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-charcoal placeholder:text-stone/55 transition-colors focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/25";

export function AppointmentForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError("");

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        throw new Error(
          json.error || "Something went wrong. Please try again or give us a call.",
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
