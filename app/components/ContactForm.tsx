"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AppLink as Link } from "./AppLink";
import { ArrowRight, Check, MoveUpRight, Whatsapp } from "./Icons";

type FormState = "idle" | "prepared";
type CopyState = "idle" | "copied" | "failed";

const WHATSAPP_NUMBER = "919752306452";
const EMAIL_ADDRESS = "hatimaliasgar21@gmail.com";

function buildBrief(form: HTMLFormElement) {
  const data = Object.fromEntries(new FormData(form));
  const context = new URLSearchParams(window.location.search).get("context")?.slice(0, 120);
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
  const context = new URLSearchParams(window.location.search).get("context")?.slice(0, 120);
  return [
    "👋 *Hi Hatim, here is my project enquiry:*",
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
  const [state, setState] = useState<FormState>("idle");
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [briefText, setBriefText] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const needRef = useRef<HTMLSelectElement>(null);
  const contextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const requestedNeed = new URLSearchParams(window.location.search).get("need");
    if (requestedNeed && needs.includes(requestedNeed) && needRef.current) {
      needRef.current.value = requestedNeed;
    }
    const context = new URLSearchParams(window.location.search).get("context")?.slice(0, 120);
    if (context && contextRef.current) {
      contextRef.current.textContent = `Starting point: ${context}`;
      contextRef.current.hidden = false;
    }
  }, [needs]);

  function handleWhatsAppClick() {
    if (!formRef.current) return;
    if (!formRef.current.reportValidity()) return;
    const whatsAppText = buildWhatsAppMessage(formRef.current);
    const standardBrief = buildBrief(formRef.current);
    setBriefText(standardBrief);
    setState("prepared");
    setCopyState("idle");
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppText)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextBrief = buildBrief(event.currentTarget);
    const company = String(new FormData(event.currentTarget).get("company") || "");
    const name = String(new FormData(event.currentTarget).get("name") || "");
    const subject = encodeURIComponent(`Project enquiry: ${company || name}`);
    setBriefText(nextBrief);
    setState("prepared");
    setCopyState("idle");
    window.location.href = `mailto:${EMAIL_ADDRESS}?subject=${subject}&body=${encodeURIComponent(nextBrief)}`;
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(briefText);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

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

      {state === "prepared" && (
        <div className="draft-status" role="status" tabIndex={-1}>
          <Check size={18} />
          <div>
            <strong>Your draft is prepared.</strong>
            <p>
              Connect directly via{" "}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(briefText)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#16a34a", fontWeight: 600 }}
              >
                WhatsApp
              </a>{" "}
              or email <a href={`mailto:${EMAIL_ADDRESS}`}>{EMAIL_ADDRESS}</a>. Nothing is sent until you review and confirm.
            </p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", gridColumn: "2 / -1", marginTop: "8px" }}>
            <button
              type="button"
              className="button-whatsapp-sm"
              onClick={handleWhatsAppClick}
            >
              Open in WhatsApp <MoveUpRight size={13} />
            </button>
            <button type="button" onClick={copyBrief}>
              {copyState === "copied" ? "Brief copied" : "Copy brief"}
            </button>
          </div>
          {copyState === "failed" && <p className="copy-error">Automatic copy was blocked. Your answers remain in the form above.</p>}
        </div>
      )}

      <div className="form-footer">
        <p>Nothing is sent until you review and send the email. See our <Link href="/privacy">privacy policy</Link>.</p>
        <div className="form-actions" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            className="button button-whatsapp"
            type="button"
            onClick={handleWhatsAppClick}
          >
            <Whatsapp size={16} /> Send via WhatsApp
          </button>
          <button className="button button-primary" type="submit">
            Open my email draft <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </form>
  );
}
