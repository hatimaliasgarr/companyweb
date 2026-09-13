import type { MetadataRoute } from "next";

// AI answer engines are explicitly allowed so Zerobugg can be cited in
// AI Overviews, ChatGPT, Perplexity and Claude responses (GEO readiness).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Google-Extended", "Applebot-Extended", "Amazonbot"], allow: "/" },
    ],
    sitemap: "https://zerobugg.in/sitemap.xml",
  };
}
