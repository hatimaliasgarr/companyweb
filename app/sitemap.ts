import type { MetadataRoute } from "next";
import { insights, projects, services } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zeroberg.com";
  const staticPaths = ["", "/about", "/services", "/solutions", "/work", "/process", "/insights", "/careers", "/contact", "/privacy", "/terms"];
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}`, changeFrequency: path === "" ? "weekly" as const : "monthly" as const, priority: path === "" ? 1 : 0.7 })),
    ...services.map((service) => ({ url: `${base}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...projects.map((project) => ({ url: `${base}/work/${project.slug}`, changeFrequency: "monthly" as const, priority: 0.6 })),
    ...insights.map((article) => ({ url: `${base}/insights/${article.slug}`, changeFrequency: "monthly" as const, priority: 0.65 })),
  ];
}
