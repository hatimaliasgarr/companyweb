import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "zeroberg.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const title = "Zeroberg — Your Digital Growth & Technology Partner";
  const description = "Strategy, design, technology and growth — one digital partner for ambitious businesses.";

  return {
    metadataBase: base,
    title: { default: title, template: "%s | Zeroberg" },
    description,
    keywords: ["digital consulting company", "web development company", "software development company", "AI automation services", "digital transformation consulting"],
    alternates: { canonical: "/" },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    openGraph: { title, description, type: "website", url: "/", siteName: "Zeroberg", images: [{ url: new URL("/og.png", base).toString(), width: 1733, height: 907, alt: "Zeroberg — Strategy. Technology. Growth. One Digital Partner." }] },
    twitter: { card: "summary_large_image", title, description, images: [new URL("/og.png", base).toString()] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Zeroberg",
              url: "https://zeroberg.com",
              slogan: "Your Digital Growth & Technology Partner",
              description: "An integrated strategy, design, technology and growth partner for ambitious businesses.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
