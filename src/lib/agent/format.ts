/** Text helpers for rendering Mabel's replies in the chat widget. */

export const ESCALATE_TAG = "[ESCALATE]";

/**
 * Defense in depth: the system prompt forbids em and en dashes, but models
 * occasionally slip. Scrub them before rendering so they never reach a parent.
 */
export function scrubDashes(text: string): string {
  return text.replace(/\s+[—–]\s+/g, ". ").replace(/[—–]/g, ", ");
}

/** A reply may use [NEXT] to split into at most two short bubbles. */
export function splitBubbles(text: string): string[] {
  return text
    .split(/\s*\[NEXT\]\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 2);
}

/** Detect and strip a leading [ESCALATE] handoff tag. */
export function parseEscalate(text: string): {
  isEscalation: boolean;
  text: string;
} {
  const trimmed = text.replace(/^\s+/, "");
  if (trimmed.startsWith(ESCALATE_TAG)) {
    return { isEscalation: true, text: trimmed.slice(ESCALATE_TAG.length).trim() };
  }
  return { isEscalation: false, text };
}
