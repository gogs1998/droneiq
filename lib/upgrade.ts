import { drones } from "@/data/catalog";
import { flyCard } from "@/lib/compare";
import type { Drone, Series } from "@/data/types";

/** Class ladder when neither airframe has a dated UK RRP. Avata sits beside Mini, not above Mavic. */
const SERIES_RANK: Record<Series, number> = {
  neo: 0,
  flip: 1,
  mini: 2,
  avata: 2,
  air: 3,
  mavic: 4,
};

export function isDearer(candidate: Drone, from: Drone): boolean {
  const pc = candidate.prices.djiRrpGbp;
  const pf = from.prices.djiRrpGbp;
  if (pc != null && pf != null) return pc > pf;
  if (pf == null && pc != null) return true;
  if (pf != null && pc == null) return false;
  const rc = SERIES_RANK[candidate.series];
  const rf = SERIES_RANK[from.series];
  if (rc !== rf) return rc > rf;
  return candidate.sortOrder > from.sortOrder;
}

export function dearerPeers(from: Drone): Drone[] {
  return drones
    .filter((d) => d.slug !== from.slug && isDearer(d, from))
    .sort((a, b) => {
      const pa = a.prices.djiRrpGbp;
      const pb = b.prices.djiRrpGbp;
      if (pa != null && pb != null && pa !== pb) return pa - pb;
      if (pa != null && pb == null) return -1;
      if (pa == null && pb != null) return 1;
      return a.sortOrder - b.sortOrder;
    });
}

export type UpgradeRow = {
  to: Drone;
  rangeKmCe: { from: number; to: number };
  weightG: { from: number; to: number };
  ukClass: { from: string; to: string };
  open: { from: string; to: string };
  sensor: { from: string; to: string };
  flightTimeMin: { from: number; to: number };
  rrpGbp: { from: number | null; to: number | null };
};

export function upgradeRows(from: Drone): UpgradeRow[] {
  return dearerPeers(from).map((to) => ({
    to,
    rangeKmCe: { from: from.rangeKmCe, to: to.rangeKmCe },
    weightG: { from: from.weightG, to: to.weightG },
    ukClass: { from: from.ukClass, to: to.ukClass },
    open: { from: flyCard(from).subcategory, to: flyCard(to).subcategory },
    sensor: { from: from.cameras[0]?.sensor ?? "—", to: to.cameras[0]?.sensor ?? "—" },
    flightTimeMin: { from: from.flightTimeMin, to: to.flightTimeMin },
    rrpGbp: { from: from.prices.djiRrpGbp, to: to.prices.djiRrpGbp },
  }));
}

export function upgradePath(slug: string): string {
  return `/upgrade/from-${slug}`;
}

export function droneFromUpgradeParam(param: string): string | null {
  if (!param.startsWith("from-")) return null;
  const slug = param.slice("from-".length);
  return slug.length ? slug : null;
}
