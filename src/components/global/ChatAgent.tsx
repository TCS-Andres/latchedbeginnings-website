"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowLeft, MessageCircle, RotateCcw, Send, X } from "lucide-react";
import {
  type Locale,
  greeting,
  persona,
  RESPONSE_DELAY_MS,
  strings,
} from "@/lib/agent/config";
import { parseEscalate, scrubDashes, splitBubbles } from "@/lib/agent/format";
import { cn } from "@/lib/cn";

type TextPart = { type: string; text?: string };

function messageText(parts: readonly TextPart[]): string {
  return parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

function Avatar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid place-items-center rounded-full bg-gradient-to-br from-coral to-coral-deep font-sans font-semibold text-white",
        className,
      )}
    >
      {persona.initials}
    </span>
  );
}

function TypingDots() {
  return (
    <div className="flex w-fit items-center gap-1.5 rounded-[14px] rounded-bl-sm border border-blush-200 bg-white px-4 py-3 shadow-[0_8px_24px_-18px_rgba(45,45,45,0.4)]">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="chat-dot h-2 w-2 rounded-full bg-coral"
        />
      ))}
    </div>
  );
}

export function ChatAgent() {
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const [input, setInput] = useState("");
  const [holding, setHolding] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Escalation form state.
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formTime, setFormTime] = useState("");
  const [formStatus, setFormStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const t = strings[locale];

  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { locale } }),
    [locale],
  );
  const { messages, sendMessage, status, error, setMessages } = useChat({
    transport,
  });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, holding, showForm, open]);

  useEffect(() => {
    return () => {
      if (holdTimer.current) clearTimeout(holdTimer.current);
    };
  }, []);

  // Latest assistant message, checked for a handoff tag.
  const lastAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  const escalation = parseEscalate(
    lastAssistant ? messageText(lastAssistant.parts) : "",
  );

  useEffect(() => {
    if (escalation.isEscalation && status === "ready") setShowForm(true);
  }, [escalation.isEscalation, status]);

  const showTyping = holding || status === "submitted";

  function send() {
    const text = input.trim();
    if (!text || status !== "ready") return;
    setShowForm(false);
    setInput("");
    setHolding(true);
    if (holdTimer.current) clearTimeout(holdTimer.current);
    holdTimer.current = setTimeout(() => setHolding(false), RESPONSE_DELAY_MS);
    sendMessage({ text });
  }

  function restart() {
    setMessages([]);
    setShowForm(false);
    setFormStatus("idle");
    setFormName("");
    setFormPhone("");
    setFormTime("");
    setInput("");
    setHolding(false);
    inputRef.current?.focus();
  }

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (!formName.trim() || !formPhone.trim() || formStatus === "sending") return;
    setFormStatus("sending");
    try {
      const res = await fetch("/api/escalate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: formName,
          phone: formPhone,
          bestTime: formTime,
          locale,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      setFormStatus(res.ok && data.ok ? "success" : "error");
    } catch {
      setFormStatus("error");
    }
  }

  const lastId = messages.length ? messages[messages.length - 1].id : null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={t.launcher}
          className="chat-launch fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-[0_16px_40px_-16px_rgba(210,116,90,0.9)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-coral-deep"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label={`${persona.name}, ${t.subtitle}`}
          className="chat-launch fixed bottom-4 right-4 z-[60] flex h-[560px] max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-[1.5rem] border border-blush-200 bg-cream shadow-[0_30px_70px_-30px_rgba(45,45,45,0.5)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-blush-200 bg-white px-4 py-3">
            <Avatar className="h-10 w-10 text-base" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg leading-tight text-ink">
                {persona.name}
              </p>
              <p className="truncate text-xs text-stone">{t.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setLocale((l) => (l === "en" ? "es" : "en"))}
              className="rounded-full border border-blush-200 px-3 py-1 text-xs font-medium text-coral-deep transition-colors hover:bg-blush"
            >
              {t.langLabel}
            </button>
            <button
              type="button"
              onClick={restart}
              aria-label={t.restart}
              className="grid h-8 w-8 place-items-center rounded-full text-stone transition-colors hover:bg-blush hover:text-coral-deep"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="grid h-8 w-8 place-items-center rounded-full text-stone transition-colors hover:bg-blush hover:text-coral-deep"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Privacy note */}
          <p className="bg-blush/60 px-4 py-2 text-center text-[11px] leading-snug text-stone">
            {t.privacy}
          </p>

          {/* Messages */}
          <div
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {/* Greeting */}
            <div className="chat-msg flex items-end gap-2">
              <Avatar className="h-7 w-7 shrink-0 text-xs" />
              <div className="max-w-[78%] rounded-[14px] rounded-bl-sm border border-blush-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-charcoal shadow-[0_8px_24px_-18px_rgba(45,45,45,0.4)]">
                {greeting[locale]}
              </div>
            </div>

            {messages.map((message) => {
              const isUser = message.role === "user";
              const raw = messageText(message.parts);
              if (!isUser) {
                // Hide the in-flight assistant bubble while the typing delay holds.
                if (message.id === lastId && showTyping) return null;
                const parsed = parseEscalate(raw);
                const bubbles = splitBubbles(scrubDashes(parsed.text));
                if (bubbles.length === 0) return null;
                return (
                  <div key={message.id} className="space-y-2">
                    {bubbles.map((b, i) => (
                      <div key={i} className="chat-msg flex items-end gap-2">
                        <Avatar className="h-7 w-7 shrink-0 text-xs" />
                        <div className="max-w-[78%] rounded-[14px] rounded-bl-sm border border-blush-200 bg-white px-4 py-2.5 text-sm leading-relaxed text-charcoal shadow-[0_8px_24px_-18px_rgba(45,45,45,0.4)]">
                          {b}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }
              return (
                <div
                  key={message.id}
                  className="chat-msg flex justify-end"
                >
                  <div className="max-w-[78%] rounded-[14px] rounded-br-sm bg-coral px-4 py-2.5 text-sm leading-relaxed text-white shadow-[0_10px_26px_-18px_rgba(210,116,90,0.9)]">
                    {raw}
                  </div>
                </div>
              );
            })}

            {showTyping && (
              <div className="chat-msg flex items-end gap-2">
                <Avatar className="h-7 w-7 shrink-0 text-xs" />
                <TypingDots />
              </div>
            )}

            {status === "error" && !showTyping && (
              <div className="flex items-end gap-2">
                <Avatar className="h-7 w-7 shrink-0 text-xs" />
                <div className="max-w-[78%] rounded-[14px] rounded-bl-sm border border-coral-soft/40 bg-blush px-4 py-2.5 text-sm leading-relaxed text-charcoal">
                  {t.errorFallback}
                </div>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {/* Footer: escalation form or input */}
          {showForm ? (
            <div className="border-t border-blush-200 bg-white px-4 py-4">
              {formStatus === "success" ? (
                <div className="space-y-3 text-center">
                  <p className="text-sm leading-relaxed text-charcoal">
                    {t.formSuccess}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setFormStatus("idle");
                    }}
                    className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-coral-deep hover:text-coral"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    {t.formCancel}
                  </button>
                </div>
              ) : (
                <form onSubmit={submitForm} className="space-y-2.5">
                  <p className="text-xs leading-snug text-stone">{t.formIntro}</p>
                  <input
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder={t.formName}
                    autoComplete="given-name"
                    required
                    className="w-full rounded-xl border border-blush-200 bg-cream px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-coral"
                  />
                  <input
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder={t.formPhone}
                    type="tel"
                    autoComplete="tel"
                    required
                    className="w-full rounded-xl border border-blush-200 bg-cream px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-coral"
                  />
                  <input
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder={`${t.formTime} (${t.formTimeHint})`}
                    className="w-full rounded-xl border border-blush-200 bg-cream px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-coral"
                  />
                  {formStatus === "error" && (
                    <p className="text-xs text-coral-deep">{t.formError}</p>
                  )}
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-xs font-medium text-stone hover:text-charcoal"
                    >
                      {t.formCancel}
                    </button>
                    <button
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="inline-flex items-center justify-center rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-deep disabled:opacity-60"
                    >
                      {formStatus === "sending" ? t.formSending : t.formSubmit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex items-end gap-2 border-t border-blush-200 bg-white px-3 py-3"
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder={t.inputPlaceholder}
                className="max-h-28 min-h-[2.75rem] flex-1 resize-none rounded-2xl border border-blush-200 bg-cream px-4 py-3 text-sm text-charcoal outline-none focus:border-coral"
              />
              <button
                type="submit"
                aria-label={t.send}
                disabled={!input.trim() || status !== "ready"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-white transition-colors hover:bg-coral-deep disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
