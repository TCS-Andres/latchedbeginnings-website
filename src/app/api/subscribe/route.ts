/**
 * Lead magnet signups (Newborn Feeding Guide, Oral Tie Symptoms Checklist).
 *
 * Adds the contact to a Brevo list in the Latched Brevo account. Only a first
 * name, email, an optional baby stage, and where the signup came from are
 * accepted. Nothing about a baby's symptoms or health is collected here.
 *
 * Env (server only, set on Vercel):
 *   BREVO_API_KEY                 Latched Brevo API key
 *   BREVO_LIST_NEWBORN_GUIDE      list id for Newborn Feeding Guide signups
 *   BREVO_LIST_ORAL_TIE_CHECKLIST list id for checklist signups
 *
 * When the key or list is missing this returns 503 with `not_configured`, and
 * the form falls back to the Web3Forms inbox in the browser so no lead is lost.
 */

const LISTS = {
  "newborn-feeding-guide": "BREVO_LIST_NEWBORN_GUIDE",
  "oral-tie-checklist": "BREVO_LIST_ORAL_TIE_CHECKLIST",
} as const;

type Source = keyof typeof LISTS;

const BABY_STAGES = ["Expecting", "0 to 2 weeks", "2 to 6 weeks", "6 weeks or older"];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max = 100): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden field. Pretend it worked.
  if (clean(body.company)) return Response.json({ ok: true });

  const source = clean(body.source) as Source;
  const email = clean(body.email, 254).toLowerCase();
  const firstName = clean(body.firstName, 60);
  const babyStage = BABY_STAGES.includes(clean(body.babyStage)) ? clean(body.babyStage) : "";
  const utmSource = clean(body.utmSource) || "direct";

  if (!(source in LISTS)) {
    return Response.json({ error: "Unknown signup." }, { status: 400 });
  }
  if (!firstName || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Please add your first name and a valid email." }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = Number(process.env[LISTS[source]]);
  if (!apiKey || !listId) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const send = (attributes: Record<string, string>) =>
    fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: { "api-key": apiKey, "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ email, attributes, listIds: [listId], updateEnabled: true }),
    });

  try {
    // Custom attributes only stick if they exist in the Brevo account. If Brevo
    // rejects them, retry with the built-in FIRSTNAME so the signup still lands.
    let res = await send({
      FIRSTNAME: firstName,
      ...(babyStage ? { BABY_STAGE: babyStage } : {}),
      LEAD_SOURCE: source,
      UTM_SOURCE: utmSource,
    });
    if (res.status === 400) res = await send({ FIRSTNAME: firstName });
    if (!res.ok) {
      console.error("Brevo signup failed", res.status, await res.text().catch(() => ""));
      return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Brevo signup error", err);
    return Response.json({ error: "Something went wrong. Please try again." }, { status: 502 });
  }
}
