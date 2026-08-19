import type { MetadataRoute } from "next";
import { insights, services } from "./data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zerobugg.com";
  const staticPaths = ["", "/about", "/services", "/solutions", "/process", "/insights", "/contact"];
  return [
    ...staticPaths.map((path) => ({ url: `${base}${path}` })),
    ...services.map((service) => ({ url: `${base}/services/${service.slug}` })),
    ...insights.map((article) => ({ url: `${base}/insights/${article.slug}` })),
  ];
}
