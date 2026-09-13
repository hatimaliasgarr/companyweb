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
  const base = new URL("https://zerobugg.in");
  const title = "Zerobugg — Your Digital Growth & Technology Partner";
  const description = "Strategy, design, technology and growth — one digital partner for ambitious businesses.";

  return {
    metadataBase: base,
    title: { default: title, template: "%s | Zerobugg" },
    description,
    icons: {
      icon: [{ url: "/brand/zerobugg-mark.png", type: "image/png", sizes: "256x256" }],
      shortcut: "/brand/zerobugg-mark.png",
      apple: [{ url: "/brand/zerobugg-mark.png", sizes: "180x180" }],
    },
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
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
                  "@id": "https://zerobugg.in/#organization",
                  name: "Zerobugg",
                  url: "https://zerobugg.in",
                  logo: "https://zerobugg.in/brand/zerobugg-mark.png",
                  slogan: "Your Digital Growth & Technology Partner",
                  description: "An integrated strategy, design, engineering, automation and growth partner.",
                  sameAs: ["https://www.instagram.com/zerobugg/"],
                  contactPoint: [
                    {
                      "@type": "ContactPoint",
                      contactType: "customer support",
                      email: "hatimaliasgar21@gmail.com",
                      availableLanguage: ["English"],
                    },
                  ],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://zerobugg.in/#website",
                  name: "Zerobugg",
                  url: "https://zerobugg.in",
                  publisher: { "@id": "https://zerobugg.in/#organization" },
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
