import type { Metadata } from "next";
import { AppLink as Link } from "./components/AppLink";
import { ArrowRight } from "./components/Icons";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The requested Zerobugg page could not be found.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <span>404</span>
      <h1>Wrong turn.<br />{" "}<em>Better route.</em></h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link className="button button-light" href="/">Return home <ArrowRight size={16} /></Link>
    </section>
  );
}
