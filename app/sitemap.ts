import type { MetadataRoute } from "next";
import { drones, JOBS } from "@/data/catalog";
import { comparablePairs, gear, gearPairSlug } from "@/data/gear";
import { newsArticles } from "@/data/news";
import {
  catalogIndexLastmod,
  droneLastmod,
  gearLastmod,
  newestDate,
  pairLastmod,
} from "@/lib/lastmod";
import { allCanonicalPairs, pairSlug, siteUrl } from "@/lib/seo";
import { upgradePath } from "@/lib/upgrade";

const TRUST = new Date("2026-09-15");
const UK_GUIDE = new Date("2026-09-15");
const USED_GUIDE = new Date("2026-09-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const indexStamp = newestDate(catalogIndexLastmod(), TRUST, UK_GUIDE, USED_GUIDE);

  const urls: MetadataRoute.Sitemap = [
    { url: base, lastModified: indexStamp, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/drones`, lastModified: indexStamp, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/compare`, lastModified: indexStamp, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/gear`, lastModified: indexStamp, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/for`, lastModified: indexStamp, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/news`, lastModified: newestDate(...newsArticles.map((a) => a.published)), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/guides/uk`, lastModified: UK_GUIDE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/guides/buying-used`, lastModified: USED_GUIDE, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/about`, lastModified: TRUST, changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/privacy`, lastModified: TRUST, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/terms`, lastModified: TRUST, changeFrequency: "yearly", priority: 0.2 },
  ];
  for (const a of newsArticles) {
    urls.push({
      url: `${base}/news/${a.slug}`,
      lastModified: a.published,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const j of JOBS) {
    const inJob = drones.filter((d) => d.jobs.includes(j.slug));
    urls.push({
      url: `${base}/for/${j.slug}`,
      lastModified: newestDate(...inJob.map((d) => droneLastmod(d))),
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }
  for (const d of drones) {
    const stamp = droneLastmod(d);
    urls.push({
      url: `${base}/drones/${d.slug}`,
      lastModified: stamp,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    urls.push({
      url: `${base}${upgradePath(d.slug)}`,
      lastModified: stamp,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  for (const g of gear) {
    urls.push({
      url: `${base}/gear/${g.slug}`,
      lastModified: gearLastmod(g),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  for (const [a, b] of allCanonicalPairs()) {
    urls.push({
      url: `${base}/compare/${pairSlug(a, b)}`,
      lastModified: pairLastmod(a, b),
      changeFrequency: "weekly",
      priority: 0.7,
    });
  }
  for (const [a, b] of comparablePairs()) {
    urls.push({
      url: `${base}/compare/${gearPairSlug(a, b)}`,
      lastModified: newestDate(gearLastmod(a), gearLastmod(b)),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }
  return urls;
}
