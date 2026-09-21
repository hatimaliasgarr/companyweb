import { MAX_BODY_BYTES, allowRequest, clientKey, parseInquiry } from "../../lib/contact-inquiry";
import { MailNotConfiguredError, sendInquiry } from "../../lib/send-inquiry";

function json(body: Record<string, unknown>, status: number) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

export async function POST(request: Request) {
  const declaredLength = Number.parseInt(request.headers.get("content-length") ?? "", 10);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return json({ success: false, error: "Invalid form submission" }, 413);
  }

  const key = clientKey(request.headers.get("x-forwarded-for"), request.headers.get("cf-connecting-ip"));
  if (!allowRequest(key)) {
    return json({ success: false, error: "Too many submissions. Please try again shortly." }, 429);
  }

  let raw: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_BYTES) {
      return json({ success: false, error: "Invalid form submission" }, 413);
    }
    raw = JSON.parse(body);
  } catch {
    return json({ success: false, error: "Invalid form submission" }, 400);
  }

  const parsed = parseInquiry(raw);
  if (parsed.status === "spam") return json({ success: true }, 200);
  if (parsed.status === "invalid") return json({ success: false, error: parsed.error }, 422);

  try {
    await sendInquiry(parsed.inquiry);
  } catch (error) {
    // Logged server-side only; the client never sees provider or environment detail.
    console.error("[contact] delivery failed:", error instanceof Error ? error.message : error);
    return json({ success: false, error: "Unable to send inquiry" }, error instanceof MailNotConfiguredError ? 503 : 502);
  }

  return json({ success: true }, 200);
}
