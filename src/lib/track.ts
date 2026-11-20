import { isTrackingAllowed } from "@/lib/analytics-config";

/**
 * Conversion events for GA4 (imported into Google Ads as booking-focused goals).
 *
 * Only the event name and, at most, a fixed label are sent. Never form input,
 * never anything a parent typed, never a URL with details in it. Events are
 * dropped on routes excluded from analytics.
 */
export type ConversionEvent =
  | "booking_click" // a "Schedule Appointment" style button that leads to the appointment form
  | "phone_click" // a tap on the practice phone number
  | "appointment_request" // the appointment request form was sent successfully
  | "workshop_register_click"; // a click through to the workshop checkout

export function trackEvent(name: ConversionEvent, params?: Record<string, string>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  if (!isTrackingAllowed(window.location.pathname)) return;
  window.gtag("event", name, params ?? {});
}

/** Maps a clicked link to a conversion event, or null when it is not one. */
export function eventForHref(href: string): ConversionEvent | null {
  if (href.startsWith("tel:")) return "phone_click";
  if (href.includes("buy.stripe.com")) return "workshop_register_click";
  if (href.includes("/contact#appointment")) return "booking_click";
  return null;
}
