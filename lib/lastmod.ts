import type { Gear } from "@/data/gear";
import type { Drone } from "@/data/types";

const FLOOR = "2026-08-31";

export function newestDate(...values: (string | Date | null | undefined)[]): Date {
  let max = 0;
  for (const v of values) {
    if (v == null || v === "") continue;
    const t = typeof v === "string" ? Date.parse(v) : v.getTime();
    if (!Number.isNaN(t) && t > max) max = t;
  }
  return new Date(max || Date.parse(FLOOR));
}

export function addDaysIso(isoDate: string, days: number): string {
  const d = new Date(`${isoDate.slice(0, 10)}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate.slice(0, 10);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function droneLastmod(d: Drone): Date {
  return newestDate(d.prices.asOf, d.reviews.asOf, ...d.sources.map((s) => s.accessed));
}

export function gearLastmod(g: Gear): Date {
  return newestDate(g.released, ...g.sources.map((s) => s.accessed));
}

export function pairLastmod(a: Drone, b: Drone): Date {
  return newestDate(droneLastmod(a), droneLastmod(b));
}
