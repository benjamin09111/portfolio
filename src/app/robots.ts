import type { MetadataRoute } from "next";
import { portfolio } from "@/lib/portfolio";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(portfolio.url
      ? { sitemap: `${portfolio.url.replace(/\/$/, "")}/sitemap.xml` }
      : {}),
  };
}
