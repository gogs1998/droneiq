import { drones, getDrone } from "@/data/catalog";
import { canonicalGearOrder, type Gear } from "@/data/gear";
import { photoFor } from "@/data/photos";
import { addDaysIso } from "@/lib/lastmod";
import { sensorSummary } from "@/lib/compare";
import type { Drone } from "@/data/types";
import type { Metadata } from "next";

/** Canonical host from docs/GOLIVE.md. Override with NEXT_PUBLIC_SITE_URL if needed. */
export const CANONICAL_HOST = "https://droneiq.pro";

export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "DroneIQ — DJI specs you can decide with",
} as const;

export function canonicalOrder(a: Drone, b: Drone): [Drone, Drone] {
  return a.sortOrder <= b.sortOrder ? [a, b] : [b, a];
}

export function pairSlug(a: Drone, b: Drone): string {
  const [x, y] = canonicalOrder(a, b);
  return `${x.slug}-vs-${y.slug}`;
}

export function parsePairParam(param: string): [Drone, Drone] | null {
  const parts = param.split("-vs-");
  if (parts.length !== 2) return null;
  const a = getDrone(parts[0]);
  const b = getDrone(parts[1]);
  if (!a || !b || a.slug === b.slug) return null;
  return [a, b];
}

export function allCanonicalPairs(): [Drone, Drone][] {
  const out: [Drone, Drone][] = [];
  for (let i = 0; i < drones.length; i++) {
    for (let j = i + 1; j < drones.length; j++) {
      out.push(canonicalOrder(drones[i], drones[j]));
    }
  }
  return out;
}

export function comparePath(slugs: string[]): string {
  const unique = [...new Set(slugs)];
  if (unique.length === 2) {
    const a = getDrone(unique[0]);
    const b = getDrone(unique[1]);
    if (a && b) return `/compare/${pairSlug(a, b)}`;
  }
  return `/compare/${unique.join("/")}`;
}

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || CANONICAL_HOST;
}

function absUrl(path: string): string {
  const base = siteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

const TITLE_SUFFIX = " · DroneIQ";
const TITLE_BUDGET = 60;

/** Rendered `<title>` length, including the layout `%s · DroneIQ` template. */
export function renderedTitleLength(pageTitle: string, absoluteTitle = false): number {
  return absoluteTitle ? pageTitle.length : pageTitle.length + TITLE_SUFFIX.length;
}

function clipForTitle(pageTitle: string): string {
  const budget = TITLE_BUDGET - TITLE_SUFFIX.length;
  if (pageTitle.length <= budget) return pageTitle;
  const sliced = pageTitle.slice(0, budget);
  const clipped = sliced.replace(/\s+\S*$/, "").replace(/[.,;:–—\-\s]+$/, "");
  return clipped.length >= 24 ? clipped : sliced.trim();
}

/** Self-referencing canonical, unique title/description, PNG og:image. Never the homepage. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  /** Home page: skip the "%s · DroneIQ" template. */
  absoluteTitle?: boolean;
}): Metadata {
  const url = absUrl(opts.path);
  let title: Metadata["title"] = opts.title;
  if (opts.absoluteTitle) {
    title = { absolute: opts.title };
  } else if (renderedTitleLength(opts.title) > TITLE_BUDGET) {
    title = { absolute: `${clipForTitle(opts.title)}${TITLE_SUFFIX}` };
  }
  return {
    title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url,
      siteName: "DroneIQ",
      locale: "en_GB",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [OG_IMAGE.url],
    },
  };
}

export function titleForPair(a: Drone, b: Drone): string {
  const [x, y] = canonicalOrder(a, b);
  return `${x.shortName} vs ${y.shortName}`;
}

export function descriptionForPair(a: Drone, b: Drone): string {
  const [x, y] = canonicalOrder(a, b);
  return `${x.shortName} vs ${y.shortName}: ${x.cameras[0]?.sensor} against ${y.cameras[0]?.sensor}, ${x.weightG} g vs ${y.weightG} g, ${x.ukClass} vs ${y.ukClass}. CE range, sourced specs, UK prices.`;
}

export function titleForGearPair(a: Gear, b: Gear): string {
  const [x, y] = canonicalGearOrder(a, b);
  return `${x.shortName} vs ${y.shortName}`;
}

export function descriptionForGearPair(a: Gear, b: Gear): string {
  const [x, y] = canonicalGearOrder(a, b);
  return `${x.shortName} vs ${y.shortName}: ${x.form} against ${y.form}, ${x.transmission} vs ${y.transmission}. Compatibility with the DroneIQ catalog, not a review.`;
}

export function jsonLdFaq(questions: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function jsonLdNewsArticle(opts: {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
    url: opts.url,
    inLanguage: "en-GB",
    author: {
      "@type": "Organization",
      name: "IQ Labs",
      url: "https://iqlabs.app",
    },
    publisher: {
      "@type": "Organization",
      name: "DroneIQ",
      url: siteUrl(),
    },
    isPartOf: {
      "@type": "WebSite",
      name: "DroneIQ",
      url: siteUrl(),
    },
  };
}

export function jsonLdWebPage(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      "@type": "WebSite",
      name: "DroneIQ",
      url: siteUrl(),
    },
  };
}

export function jsonLdItemList(
  items: { slug: string; name: string }[],
  url: string,
  pathPrefix = "/drones",
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url,
    numberOfItems: items.length,
    itemListElement: items.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.name,
      url: `${siteUrl()}${pathPrefix}/${d.slug}`,
    })),
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function jsonLdBreadcrumb(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absUrl(it.path),
    })),
  };
}

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DroneIQ",
    url: siteUrl(),
    parentOrganization: {
      "@type": "Organization",
      name: "IQ Labs",
      url: "https://iqlabs.app",
    },
    sameAs: ["https://iqlabs.app"],
  };
}

export function jsonLdProduct(d: Drone) {
  const photo = photoFor(d.slug);
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: d.name,
    brand: { "@type": "Brand", name: "DJI" },
    description: `${d.name}: ${d.weightG} g, ${d.ukClass}, ${sensorSummary(d)}, ${d.flightTimeMin} min lab time. Sourced figures, UK prices.`,
    url: `${siteUrl()}/drones/${d.slug}`,
  };
  if (photo) product.image = `${siteUrl()}${photo.src}`;
  if (d.prices.djiRrpGbp != null) {
    product.offers = {
      "@type": "Offer",
      url: d.prices.djiUrl,
      priceCurrency: "GBP",
      price: String(d.prices.djiRrpGbp),
      priceValidUntil: addDaysIso(d.prices.asOf, 30),
      ...(d.discontinued
        ? { availability: "https://schema.org/Discontinued" }
        : {}),
    };
  }
  return product;
}
