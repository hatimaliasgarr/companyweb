"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AppLink as Link } from "./AppLink";
import { ArrowRight, Check, MoveUpRight, Whatsapp } from "./Icons";

type SendState = "idle" | "sending" | "sent" | "error";
type CopyState = "idle" | "copied" | "failed";

const WHATSAPP_NUMBER = "919752306452";
const EMAIL_ADDRESS = "office@zerobugg.in";

const SENT_MESSAGE = "Thanks! Your inquiry has been sent. We'll get back to you shortly.";
const FAILED_MESSAGE = "Something went wrong while sending your inquiry. Please try again.";

function readContext() {
  return new URLSearchParams(window.location.search).get("context")?.slice(0, 120) ?? "";
}

function buildBrief(form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form));
  const context = readContext();
  return [
    `Name: ${String(data.name || "")}`,
    `Email: ${String(data.email || "")}`,
    `Company: ${String(data.company || "Not provided")}`,
    `Closest area: ${String(data.need || "Not sure yet")}`,
    ...(context ? [`Starting context: ${context}`] : []),
    "",
    "What needs to improve:",
    String(data.description || ""),
  ].join("\n");
}

function buildWhatsAppMessage(form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form));
  const context = readContext();
  return [
    "👋 *Hi Zerobugg, here is my project enquiry:*",
    "",
    `*Name:* ${String(data.name || "")}`,
    `*Email:* ${String(data.email || "")}`,
    `*Company:* ${String(data.company || "Not provided")}`,
    `*Closest Area:* ${String(data.need || "Not sure yet")}`,
    ...(context ? [`*Starting Context:* ${context}`] : []),
    "",
    "*What needs to change / improve:*",
    String(data.description || ""),
  ].join("\n");
}

export function ContactForm({ needs }: { needs: string[] }) {
  const [sendState, setSendState] = useState<SendState>("idle");
  const [errorMessage, setErrorMessage] = useState(FAILED_MESSAGE);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [briefText, setBriefText] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const needRef = useRef<HTMLSelectElement>(null);
  const contextRef = useRef<HTMLParagraphElement>(null);
  // Guards a second submit slipping through before React re-renders the button.
  const inFlight = useRef(false);

  useEffect(() => {
    const requestedNeed = new URLSearchParams(window.location.search).get("need");
    if (requestedNeed && needs.includes(requestedNeed) && needRef.current) {
      needRef.current.value = requestedNeed;
    }
    const context = readContext();
    if (context && contextRef.current) {
      contextRef.current.textContent = `Starting point: ${context}`;
      contextRef.current.hidden = false;
    }
  }, [needs]);

  function handleWhatsAppClick() {
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;
    const whatsAppText = buildWhatsAppMessage(formRef.current);
    setBriefText(buildBrief(formRef.current));
    setCopyState("idle");
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      description: String(data.get("description") || ""),
      company: String(data.get("company") || ""),
      need: String(data.get("need") || ""),
      context: readContext(),
      website: String(data.get("website") || ""),
    };

    inFlight.current = true;
    setSendState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;

      if (response.ok && result?.success) {
        setSendState("sent");
        form.reset();
        setBriefText("");
        setCopyState("idle");
      } else {
        // Validation and rate-limit copy is written for visitors, so show it as-is.
        const useServerCopy = response.status === 422 || response.status === 429;
        setErrorMessage(useServerCopy && result?.error ? result.error : FAILED_MESSAGE);
        setSendState("error");
      }
    } catch {
      setErrorMessage(FAILED_MESSAGE);
      setSendState("error");
    } finally {
      inFlight.current = false;
    }
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  const sending = sendState === "sending";

  return (
    <form ref={formRef} className="contact-form" onSubmit={submit}>
      <div className="contact-form-heading">
        <p>Project brief</p>
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#16a34a", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "5px" }}
          >
            Direct WhatsApp <MoveUpRight size={13} />
          </a>
          <a href={`mailto:${EMAIL_ADDRESS}`}>Prefer direct email?</a>
        </div>
      </div>
      <p ref={contextRef} className="contact-context" hidden />
      <label><span>Name *</span><input name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Your name" /></label>
      <label><span>Email *</span><input name="email" type="email" autoComplete="email" spellCheck={false} required maxLength={254} placeholder="you@company.com" /></label>
      <label><span>What are you trying to improve? *</span><textarea name="description" required minLength={20} maxLength={900} rows={7} placeholder="What is happening now, and what needs to change?" /></label>
      <label><span>Company <small>Optional</small></span><input name="company" autoComplete="organization" maxLength={120} placeholder="Company name" /></label>
      <label><span>Which area is closest? <small>Optional</small></span>
        <select ref={needRef} name="need" defaultValue="">
          <option value="">I&apos;m not sure yet</option>
          {needs.map((need) => <option key={need} value={need}>{need}</option>)}
        </select>
      </label>

      {/* Honeypot: off-screen, untabbable and hidden from assistive tech, so only bots fill it. */}
      <div className="contact-hp" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {sendState === "sent" && (
        <div className="draft-status" role="status" tabIndex={-1}>
          <Check size={18} />
          <div>
            <strong>{SENT_MESSAGE}</strong>
            <p>
              It is on its way to {EMAIL_ADDRESS}. Prefer to keep talking now? Message us on{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#16a34a", fontWeight: 600 }}
              >
                WhatsApp
              </a>.
            </p>
          </div>
        </div>
      )}

      {sendState === "error" && (
        <div className="draft-status draft-status-error" role="alert" tabIndex={-1}>
          <div>
            <strong>{errorMessage}</strong>
            <p>
              Your answers are still here, so you can send again. You can also email{" "}
              <a href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a> or use the WhatsApp button below.
            </p>
          </div>
          {briefText && (
            <button type="button" onClick={copyBrief}>
              {copyState === "copied" ? "Brief copied" : "Copy brief"}
            </button>
          )}
          {copyState === "failed" && <p className="copy-error">Automatic copy was blocked. Your answers remain in the form above.</p>}
        </div>
      )}

      <div className="form-footer">
        <p>Your inquiry goes straight to our team. See our <Link href="/privacy">privacy policy</Link>.</p>
        <div className="form-actions" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            className="button button-whatsapp"
            type="button"
            onClick={handleWhatsAppClick}
          >
            <Whatsapp size={16} /> Send via WhatsApp
          </button>
          <button className="button button-primary" type="submit" disabled={sending} aria-busy={sending}>
            {sending ? "Sending..." : <>Send inquiry <ArrowRight size={17} /></>}
          </button>
        </div>
      </div>
    </form>
  );
}
