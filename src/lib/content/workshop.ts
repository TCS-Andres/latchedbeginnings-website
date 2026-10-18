/**
 * Birth Professionals Workshop: single source of truth for the /workshop page.
 *
 * To run a new session, update the date/time fields and set status back to
 * "open". To close registration once seats are gone, set status to "full" and
 * the page switches every CTA to the waitlist form.
 */

export type WorkshopStatus = "open" | "full";

export const workshop = {
  title: "Oral Tie Care Workshop for Birth Professionals",
  shortTitle: "Birth Pro Workshop",

  // ISO date (America/Chicago). After this date the page shows the
  // "join the list for the next session" state automatically.
  date: "2026-11-13",
  dateLabel: "Friday, November 13, 2026",
  dateShort: "Nov 13",
  startTime: "13:00",
  endTime: "16:00",
  timeLabel: "1:00 PM to 4:00 PM CT",

  price: 138,
  capacity: 8,

  status: "open" as WorkshopStatus,

  // Stripe Payment Link for checkout. Leave empty to collect reservations with
  // the on-page form instead (the team then emails a payment link).
  registrationUrl: "",

  // Campaign tag used for the UTM links shared on social, email, and flyers.
  utmCampaign: "birth-pro-workshop-nov-2026",
} as const;

/** Today's date in Austin as YYYY-MM-DD. */
function todayInAustin(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function isWorkshopPast(): boolean {
  return todayInAustin() > workshop.date;
}
