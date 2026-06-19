import { ESCALATION_EMAIL } from "@/lib/agent/config";

export const maxDuration = 15;

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  babyAge?: string;
  preferredTime?: string;
  message?: string;
  company?: string; // honeypot
};

/**
 * Appointment request form (the on-site replacement for an external scheduler).
 * Collects contact details and a short note, then delivers by email when Resend
 * is configured; otherwise logs the lead so nothing is lost before that is wired.
 * Reuses the same RESEND_API_KEY / ESCALATION_FROM / ESCALATION_EMAIL env vars
 * as the chat handoff.
 */
export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot tripped: pretend success so bots move on, but deliver nothing.
  if ((data.company ?? "").trim()) {
    return Response.json({ ok: true });
  }

  const name = (data.name ?? "").trim().slice(0, 80);
  const phone = (data.phone ?? "").trim().slice(0, 40);
  const email = (data.email ?? "").trim().slice(0, 120);
  const babyAge = (data.babyAge ?? "").trim().slice(0, 60);
  const preferredTime = (data.preferredTime ?? "").trim().slice(0, 160);
  const message = (data.message ?? "").trim().slice(0, 2000);

  if (!name || !phone || !email) {
    return Response.json(
      { ok: false, error: "Please add your name, phone, and email." },
      { status: 422 },
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 422 },
    );
  }

  const to = process.env.ESCALATION_EMAIL || ESCALATION_EMAIL;
  const summary = [
    "New appointment request from the Latched Beginnings website.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Baby's age: ${babyAge || "Not provided"}`,
    `Preferred days/times: ${preferredTime || "Not provided"}`,
    "",
    "Message:",
    message || "Not provided",
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.ESCALATION_FROM;

  if (resendKey && from) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `New appointment request: ${name}`,
          text: summary,
        }),
      });
      if (!res.ok) {
        console.error("[appointment] Resend failed", res.status, await res.text());
        return Response.json(
          { ok: false, error: "We couldn't send that just now. Please call us." },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("[appointment] Resend error", err);
      return Response.json(
        { ok: false, error: "We couldn't send that just now. Please call us." },
        { status: 502 },
      );
    }
  } else {
    // TODO before launch: set RESEND_API_KEY + ESCALATION_FROM, or post to a CRM
    // webhook here. Until then the lead is logged so the team can recover it.
    console.warn(`[appointment] No email transport configured. Lead:\n${summary}`);
  }

  return Response.json({ ok: true });
}
