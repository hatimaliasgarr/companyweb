/**
 * Delivery for contact-form inquiries.
 *
 * Uses Resend's HTTP API rather than SMTP. The site is deployed as a
 * Cloudflare Worker, which cannot open TCP sockets, so Nodemailer and any
 * other SMTP client are unavailable there. A plain `fetch` works identically
 * on the Worker, on Vercel's Node runtime and on the Node/Docker server, so
 * all three entry points share this one implementation.
 */
import { INQUIRY_RECIPIENT, buildHtml, buildSubject, buildText, type Inquiry } from "./contact-inquiry";

const ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

/** No API key configured: the caller maps this to 503 rather than 502. */
export class MailNotConfiguredError extends Error {}

/**
 * The visitor never controls the From header — only `reply_to`. This address
 * must belong to a domain verified in Resend, otherwise the API rejects it.
 */
const DEFAULT_FROM = `ZeroBugg Website <website@zerobugg.in>`;

export async function sendInquiry(inquiry: Inquiry): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new MailNotConfiguredError("RESEND_API_KEY is not set");
  }
  const from = process.env.CONTACT_FROM?.trim() || DEFAULT_FROM;

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [INQUIRY_RECIPIENT],
      reply_to: inquiry.email,
      subject: buildSubject(inquiry),
      text: buildText(inquiry),
      html: buildHtml(inquiry),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });

  if (!response.ok) {
    // Resend's error body names the field at fault (unverified domain, bad
    // key) and never echoes the API key, so it is safe in a server-side log.
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend responded ${response.status}: ${detail.slice(0, 300)}`);
  }
}
