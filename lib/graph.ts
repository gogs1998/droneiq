import { drones } from "@/data/catalog";
import {
  featuredPairs,
  homeSheetKeys,
  homeSheets,
  pairKey,
} from "@/data/featured-matchups";
import {
  comparablePairs,
  compareGroup,
  type Gear,
  type GearCompareGroup,
} from "@/data/gear";
import { canonicalOrder, pairSlug } from "@/lib/seo";
import type { Drone, Series } from "@/data/types";

export type LineId = "mini" | "air" | "mavic" | "fpv" | "neo-flip";

export type Line = { id: LineId; title: string; series: Series[] };

/** Hub grouping. Neo & Flip are not FPV; they still get their own line. */
export const LINES: Line[] = [
  { id: "mini", title: "Mini", series: ["mini"] },
  { id: "air", title: "Air", series: ["air"] },
  { id: "mavic", title: "Mavic", series: ["mavic"] },
  { id: "fpv", title: "FPV", series: ["avata"] },
  { id: "neo-flip", title: "Neo & Flip", series: ["neo", "flip"] },
];

export function lineFor(d: Drone): Line {
  return LINES.find((l) => l.series.includes(d.series)) ?? LINES[0];
}

export function cheaperThan(a: Drone, b: Drone): boolean {
  const pa = a.prices.djiRrpGbp;
  const pb = b.prices.djiRrpGbp;
  if (pa != null && pb != null) return pa < pb;
  if (pa == null && pb != null) return true;
  if (pa != null && pb == null) return false;
  return a.sortOrder < b.sortOrder;
}

export function dearerThan(a: Drone, b: Drone): boolean {
  return cheaperThan(b, a);
}

export function comparisonsFor(drone: Drone): Drone[] {
  return drones
    .filter((d) => d.slug !== drone.slug)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export type CompareBucket = {
  id: "same-line" | "lighter-cheaper" | "heavier-dearer" | "also";
  title: string;
  drones: Drone[];
};

/** Every other catalog drone, grouped the way a buyer asks the upgrade question. */
export function bucketComparisons(drone: Drone): CompareBucket[] {
  const others = comparisonsFor(drone);
  const used = new Set<string>();
  const take = (id: CompareBucket["id"], title: string, test: (d: Drone) => boolean): CompareBucket => {
    const list = others.filter((d) => !used.has(d.slug) && test(d));
    for (const d of list) used.add(d.slug);
    return { id, title, drones: list };
  };

  return [
    take("same-line", "Same line", (d) => d.series === drone.series),
    take(
      "lighter-cheaper",
      "Lighter and cheaper",
      (d) => d.weightG < drone.weightG && cheaperThan(d, drone),
    ),
    take(
      "heavier-dearer",
      "Heavier and dearer",
      (d) => d.weightG > drone.weightG && dearerThan(d, drone),
    ),
    take("also", "Also compared with", () => true),
  ].filter((b) => b.drones.length > 0);
}

export type PairRef = { a: Drone; b: Drone };

function toPair(x: Drone, y: Drone): PairRef {
  const [a, b] = canonicalOrder(x, y);
  return { a, b };
}

export function featuredPairList(): (PairRef & { lede?: string })[] {
  const seen = new Set<string>();
  const out: (PairRef & { lede?: string })[] = [];
  for (const s of homeSheets) {
    const da = drones.find((d) => d.slug === s.a);
    const db = drones.find((d) => d.slug === s.b);
    if (!da || !db) continue;
    const k = pairKey(da.slug, db.slug);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push({ ...toPair(da, db), lede: s.lede });
  }
  for (const [sa, sb] of featuredPairs) {
    if (homeSheetKeys.has(pairKey(sa, sb))) continue;
    const da = drones.find((d) => d.slug === sa);
    const db = drones.find((d) => d.slug === sb);
    if (!da || !db) continue;
    const k = pairKey(da.slug, db.slug);
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(toPair(da, db));
  }
  return out;
}

function featuredKeys(): Set<string> {
  return new Set(featuredPairList().map((p) => pairKey(p.a.slug, p.b.slug)));
}

export function hubDroneSections(): {
  featured: (PairRef & { lede?: string })[];
  within: { line: Line; pairs: PairRef[] }[];
  across: { line: Line; pairs: PairRef[] }[];
} {
  const featured = featuredPairList();
  const skip = featuredKeys();
  const withinMap = new Map<LineId, PairRef[]>();
  const acrossMap = new Map<LineId, PairRef[]>();
  for (const line of LINES) {
    withinMap.set(line.id, []);
    acrossMap.set(line.id, []);
  }

  for (let i = 0; i < drones.length; i++) {
    for (let j = i + 1; j < drones.length; j++) {
      const pair = toPair(drones[i], drones[j]);
      if (skip.has(pairKey(pair.a.slug, pair.b.slug))) continue;
      const la = lineFor(pair.a);
      const lb = lineFor(pair.b);
      if (la.id === lb.id) {
        withinMap.get(la.id)!.push(pair);
      } else {
        const cheaper = cheaperThan(pair.a, pair.b) ? pair.a : pair.b;
        acrossMap.get(lineFor(cheaper).id)!.push(pair);
      }
    }
  }

  return {
    featured,
    within: LINES.map((line) => ({ line, pairs: withinMap.get(line.id) ?? [] })).filter(
      (s) => s.pairs.length > 0,
    ),
    across: LINES.map((line) => ({ line, pairs: acrossMap.get(line.id) ?? [] })).filter(
      (s) => s.pairs.length > 0,
    ),
  };
}

export function hubGearSections(): { group: GearCompareGroup; title: string; pairs: [Gear, Gear][] }[] {
  const titles: Record<GearCompareGroup, string> = {
    controllers: "Controllers",
    headsets: "Headsets",
  };
  const groups: GearCompareGroup[] = ["controllers", "headsets"];
  return groups.map((group) => ({
    group,
    title: titles[group],
    pairs: comparablePairs().filter(([a]) => compareGroup(a.kind) === group),
  }));
}

/** Same-line alternatives for each side of a comparison — adjacent, not the whole grid. */
export function adjacentPairs(a: Drone, b: Drone): PairRef[] {
  const seen = new Set([pairKey(a.slug, b.slug)]);
  const out: PairRef[] = [];
  const add = (x: Drone, y: Drone) => {
    if (x.slug === y.slug) return;
    const k = pairKey(x.slug, y.slug);
    if (seen.has(k)) return;
    seen.add(k);
    out.push(toPair(x, y));
  };
  for (const o of drones) {
    if (o.slug === a.slug || o.slug === b.slug) continue;
    if (o.series === a.series) add(a, o);
    if (o.series === b.series) add(b, o);
  }
  return out;
}

export function pairHref(a: Drone, b: Drone): string {
  return `/compare/${pairSlug(a, b)}`;
}

export function gearAdjacent(a: Gear, b: Gear): [Gear, Gear][] {
  return comparablePairs().filter(([x, y]) => {
    const involves =
      x.slug === a.slug ||
      x.slug === b.slug ||
      y.slug === a.slug ||
      y.slug === b.slug;
    const isThis =
      (x.slug === a.slug && y.slug === b.slug) ||
      (x.slug === b.slug && y.slug === a.slug);
    return involves && !isThis;
  });
}
