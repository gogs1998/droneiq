import type { MetadataRoute } from "next";
import { drones, JOBS } from "@/data/catalog";
import { allCanonicalPairs, pairSlug, siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/drones`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/guides/buying-used`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
  for (const j of JOBS) {
    urls.push({
      url: `${base}/for/${j.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const d of drones) {
    urls.push({
      url: `${base}/drones/${d.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }
  for (const [a, b] of allCanonicalPairs()) {
    urls.push({
      url: `${base}/compare/${pairSlug(a, b)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  return urls;
}
