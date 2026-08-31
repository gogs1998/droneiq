import { drones, getDrone } from "@/data/catalog";
import type { Drone } from "@/data/types";

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
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://droneiq.app";
}

export function titleForPair(a: Drone, b: Drone): string {
  const [x, y] = canonicalOrder(a, b);
  return `${x.name} vs ${y.name} (2026): sensor, weight, UK rules, price`;
}

export function descriptionForPair(a: Drone, b: Drone): string {
  const [x, y] = canonicalOrder(a, b);
  return `${x.shortName} vs ${y.shortName}: ${x.cameras[0]?.sensor} against ${y.cameras[0]?.sensor}, ${x.weightG} g vs ${y.weightG} g, ${x.ukClass} vs ${y.ukClass}. CE range, sourced specs, UK prices.`;
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

export function jsonLdItemList(items: Drone[], url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    url,
    numberOfItems: items.length,
    itemListElement: items.map((d, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: d.name,
      url: `${siteUrl()}/drones/${d.slug}`,
    })),
  };
}
