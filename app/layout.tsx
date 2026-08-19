import type { Metadata, Viewport } from "next";
import { Footer } from "./components/Site";
import { MotionObserver } from "./components/MotionObserver";
import { SiteHeader } from "./components/SiteHeader";
import { serializeJsonLd } from "./jsonLd";
import "./globals.css";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#08090c",
};

export function generateMetadata(): Metadata {
  const base = new URL("https://zerobugg.com");
  const title = "Zerobugg — Your Digital Growth & Technology Partner";
  const description = "Strategy, design, technology and growth — one digital partner for ambitious businesses.";

  return {
    metadataBase: base,
    title: { default: title, template: "%s | Zerobugg" },
    description,
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }], shortcut: "/favicon.svg" },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://zerobugg.com/#organization",
                  name: "Zerobugg",
                  url: "https://zerobugg.com",
                  logo: "https://zerobugg.com/favicon.svg",
                  slogan: "Your Digital Growth & Technology Partner",
                  description: "An integrated strategy, design, engineering, automation and growth partner.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://zerobugg.com/#website",
                  name: "Zerobugg",
                  url: "https://zerobugg.com",
                  publisher: { "@id": "https://zerobugg.com/#organization" },
                },
              ],
            }),
          }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <MotionObserver />
        <main id="main-content" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
