import { anthropic } from "@ai-sdk/anthropic";
import { convertToModelMessages, streamText, type ModelMessage, type UIMessage } from "ai";
import { getSystemPrompt } from "@/lib/agent/systemPrompt";
import { AGENT_MODEL, MAX_OUTPUT_TOKENS, type Locale } from "@/lib/agent/config";

// Allow the streaming response time to complete.
export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "The chat assistant is not configured yet." },
      { status: 503 },
    );
  }

  let body: { messages?: UIMessage[]; locale?: Locale };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = body.messages ?? [];
  const locale: Locale = body.locale === "es" ? "es" : "en";

  // The system prompt is large and stable, so cache it to cut cost and latency
  // on follow-up turns within the cache window.
  const systemMessage: ModelMessage = {
    role: "system",
    content: getSystemPrompt(locale),
    providerOptions: { anthropic: { cacheControl: { type: "ephemeral" } } },
  };

  const result = streamText({
    model: anthropic(AGENT_MODEL),
    temperature: 0.5,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    messages: [systemMessage, ...(await convertToModelMessages(messages))],
    onError: ({ error }) => {
      // Server-side observability. The widget shows its own localized fallback.
      console.error("[chat] stream error", error);
    },
  });

  return result.toUIMessageStreamResponse();
}
