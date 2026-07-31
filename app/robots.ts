import type { MetadataRoute } from "next";
import { SITE_BASE_URL } from "@/constants/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Block crawlers from minting unbounded ISR cache keys via
        // `?search=*`, `?tag=*`, `?page=*`, `?product=*`, `?utm_*`, etc.
        // The canonical `/` listing and every `/articles/[slug]` URL stay
        // crawlable, and individual articles are listed in the sitemap.
        disallow: "/?",
      },
    ],
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
    host: SITE_BASE_URL,
  };
}
