"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AppLink as Link } from "./AppLink";
import { ArrowRight, Menu, X } from "./Icons";

const navItems = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Solutions", "/solutions"],
  ["Our Work", "/work"],
  ["Process", "/process"],
  ["Insights", "/insights"],
  ["Careers", "/careers"],
  ["Contact", "/contact"],
] as const;

const mobilePrimaryItems = navItems.filter(([label]) => !["About", "Careers", "Contact"].includes(label));
const desktopItems = navItems.filter(([label]) => !["Our Work", "Careers", "Contact"].includes(label));

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let wasScrolled = false;
    const updateScroll = () => {
      const nextScrolled = window.scrollY > 28;
      if (nextScrolled !== wasScrolled) {
        wasScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll);
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const trigger = menuButtonRef.current;
    const background = Array.from(document.querySelectorAll<HTMLElement>(".site-header, #main-content, .footer"));
    background.forEach((element) => { element.inert = true; });
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = "";
      background.forEach((element) => { element.inert = false; });
      window.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <>
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <Link className="wordmark" href="/" aria-label="Zerobugg home" translate="no">
          ZEROBUGG<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {desktopItems.map(([label, href]) => (
            <Link
              key={href}
              className={isActive(href) ? "is-active" : ""}
              aria-current={isActive(href) ? "page" : undefined}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="nav-cta" href="/contact">
          Tell us your challenge <ArrowRight size={15} />
        </Link>
        <button ref={menuButtonRef} className="menu-toggle" type="button" onClick={() => setOpen(true)} aria-label="Open navigation" aria-expanded={open} aria-controls="mobile-navigation">
          <Menu size={20} />
        </button>
      </header>

      <div ref={menuRef} id="mobile-navigation" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open} role="dialog" aria-modal="true" aria-label="Site navigation">
        <div className="mobile-menu-top">
          <span className="wordmark" translate="no">ZEROBUGG<span>.</span></span>
          <button ref={closeButtonRef} type="button" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={24} /></button>
        </div>
        <nav aria-label="Mobile navigation">
          {mobilePrimaryItems.map(([label, href], index) => (
            <Link key={href} href={href} onClick={() => setOpen(false)} aria-current={isActive(href) ? "page" : undefined}>
              <small>{String(index + 1).padStart(2, "0")}</small>{label}<ArrowRight />
            </Link>
          ))}
        </nav>
        <div className="mobile-menu-bottom">
          <Link className="mobile-menu-cta" href="/contact" onClick={() => setOpen(false)}>Tell us your challenge <ArrowRight size={17} /></Link>
          <div><Link href="/about" onClick={() => setOpen(false)}>About</Link><Link href="/careers" onClick={() => setOpen(false)}>Careers</Link></div>
          <p>Design × Engineering × Automation × Growth</p>
        </div>
      </div>
    </>
  );
}
