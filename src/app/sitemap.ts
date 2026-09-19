import type { MetadataRoute } from "next";
import { portfolio, projects } from "@/lib/portfolio";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!portfolio.url) return [];
  const base = portfolio.url.replace(/\/$/, "");
  return [
    { url: base, priority: 1 },
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      priority: 0.8,
    })),
  ];
}
