/**
 * Mabel: shared configuration for the Latched Beginnings chat agent.
 *
 * Imported by both the server (system prompt + API route) and the client widget,
 * so this file must stay free of server-only code. Tune the persona, the
 * conversation knobs, and all user-facing copy here.
 */
import { site } from "@/lib/site";

export type Locale = "en" | "es";

/** Current Anthropic Sonnet. Verify availability before launch. */
export const AGENT_MODEL = "claude-sonnet-4-6";

/** Safety ceiling on model output. Replies are short, so this is generous. */
export const MAX_OUTPUT_TOKENS = 1024;

/** Minimum "typing" delay (ms) so replies never feel uncannily instant. */
export const RESPONSE_DELAY_MS = 2600;

/** Reply length cap per bubble, kept tight for a calm, human cadence. */
export const REPLY_WORD_CAP = 16;

/** Confidence below which the agent hands off instead of guessing. */
export const ESCALATION_CONFIDENCE = "70 percent";

/** Where escalation handoffs are delivered (name, phone, best time only). */
export const ESCALATION_EMAIL = site.email;

/** How fast a human follows up after a handoff. */
export const RESPONSE_WINDOW: Record<Locale, string> = {
  en: "one business day",
  es: "un día hábil",
};

export const persona = {
  name: "Mabel",
  initials: "M",
} as const;

/** Static opening bubble, shown before the model is ever called. */
export const greeting: Record<Locale, string> = {
  en: `Hi, I'm ${persona.name}, the virtual assistant for Latched Beginnings. How can I help you and your little one today?`,
  es: `Hola, soy ${persona.name}, la asistente virtual de Latched Beginnings. ¿Cómo puedo ayudarte a ti y a tu bebé hoy?`,
};

export type ChatStrings = {
  launcher: string;
  subtitle: string;
  privacy: string;
  inputPlaceholder: string;
  send: string;
  close: string;
  restart: string;
  langLabel: string;
  errorFallback: string;
  formIntro: string;
  formName: string;
  formPhone: string;
  formTime: string;
  formTimeHint: string;
  formSubmit: string;
  formSending: string;
  formSuccess: string;
  formError: string;
  formCancel: string;
};

/** User-facing chrome. The model handles the conversation; this is the frame. */
export const strings: Record<Locale, ChatStrings> = {
  en: {
    launcher: "Chat with us",
    subtitle: "Latched Beginnings • virtual assistant",
    privacy:
      "I'm an automated assistant. Please don't share health details here.",
    inputPlaceholder: "Type your message",
    send: "Send",
    close: "Close chat",
    restart: "Start over",
    langLabel: "Español",
    errorFallback: `I'm having trouble right now. Please call us at ${site.phone}.`,
    formIntro:
      "Leave your details and a team member will reach out within one business day.",
    formName: "First name",
    formPhone: "Phone number",
    formTime: "Best time to reach you",
    formTimeHint: "Optional",
    formSubmit: "Request a call",
    formSending: "Sending",
    formSuccess:
      "Thank you. A team member will be in touch within one business day.",
    formError: `Something went wrong. Please call us at ${site.phone}.`,
    formCancel: "Back to chat",
  },
  es: {
    launcher: "Chatea con nosotros",
    subtitle: "Latched Beginnings • asistente virtual",
    privacy:
      "Soy una asistente automatizada. Por favor no compartas datos de salud aquí.",
    inputPlaceholder: "Escribe tu mensaje",
    send: "Enviar",
    close: "Cerrar chat",
    restart: "Empezar de nuevo",
    langLabel: "English",
    errorFallback: `Estoy teniendo problemas en este momento. Llámanos al ${site.phone}.`,
    formIntro:
      "Déjanos tus datos y un miembro del equipo se comunicará dentro de un día hábil.",
    formName: "Nombre",
    formPhone: "Número de teléfono",
    formTime: "Mejor hora para contactarte",
    formTimeHint: "Opcional",
    formSubmit: "Solicitar una llamada",
    formSending: "Enviando",
    formSuccess:
      "Gracias. Un miembro del equipo se comunicará dentro de un día hábil.",
    formError: `Algo salió mal. Llámanos al ${site.phone}.`,
    formCancel: "Volver al chat",
  },
};
