import { ESCALATION_EMAIL } from "@/lib/agent/config";

export const maxDuration = 15;

type Payload = {
  name?: string;
  phone?: string;
  bestTime?: string;
  locale?: string;
};

/**
 * Chat handoff. Collects first name, phone, and best time only (no health
 * details, per the HIPAA-aware design). Delivers by email when Resend is
 * configured; otherwise logs the lead so nothing is lost before that is wired.
 */
export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = (data.name ?? "").trim().slice(0, 80);
  const phone = (data.phone ?? "").trim().slice(0, 40);
  const bestTime = (data.bestTime ?? "").trim().slice(0, 120);

  if (!name || !phone) {
    return Response.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 },
    );
  }

  const to = process.env.ESCALATION_EMAIL || ESCALATION_EMAIL;
  const summary = [
    "New chat callback request from the Latched Beginnings website.",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Best time: ${bestTime || "Not provided"}`,
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
          subject: `New chat callback: ${name}`,
          text: summary,
        }),
      });
      if (!res.ok) {
        console.error("[escalate] Resend failed", res.status, await res.text());
        return Response.json({ ok: false, error: "Delivery failed." }, { status: 502 });
      }
    } catch (err) {
      console.error("[escalate] Resend error", err);
      return Response.json({ ok: false, error: "Delivery failed." }, { status: 502 });
    }
  } else {
    // TODO before launch: set RESEND_API_KEY + ESCALATION_FROM, or post to a CRM
    // webhook here. Until then the lead is logged so the team can recover it.
    console.warn(`[escalate] No email transport configured. Lead:\n${summary}`);
  }

  return Response.json({ ok: true });
}
