import { drones } from "@/data/catalog";
import { gear, type Gear } from "@/data/gear";
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

/**
 * Date shared by most records in a set — a catalog re-read, not that page's
 * own change. Using it as every leaf lastmod is what collapsed 425 URLs to
 * three stamps. Ignore it on leaves; still use it on index pages.
 */
function majorityStamp(dates: string[]): string | null {
  if (dates.length < 2) return null;
  const counts = new Map<string, number>();
  for (const d of dates) {
    if (!d) continue;
    counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  let best: string | null = null;
  let n = 0;
  for (const [d, c] of counts) {
    if (c > n) {
      best = d;
      n = c;
    }
  }
  const threshold = Math.max(2, Math.ceil(dates.length * 0.7));
  return best && n >= threshold ? best : null;
}

const DRONE_BATCH = majorityStamp(
  drones.flatMap((d) => [d.prices.asOf, d.reviews.asOf, ...d.sources.map((s) => s.accessed)]),
);

const GEAR_BATCH = majorityStamp(gear.flatMap((g) => g.sources.map((s) => s.accessed)));

function withoutBatch(dates: string[], batch: string | null): string[] {
  if (!batch) return dates.filter(Boolean);
  return dates.filter((d) => d && d !== batch);
}

/** Newest date that belongs to this airframe, not the catalog-wide re-read. */
export function droneLastmod(d: Drone): Date {
  const own = withoutBatch(
    [d.prices.asOf, d.reviews.asOf, ...d.sources.map((s) => s.accessed)],
    DRONE_BATCH,
  );
  return newestDate(...own, d.released);
}

export function gearLastmod(g: Gear): Date {
  const own = withoutBatch(
    g.sources.map((s) => s.accessed),
    GEAR_BATCH,
  );
  return newestDate(...own, g.released);
}

export function pairLastmod(a: Drone, b: Drone): Date {
  return newestDate(droneLastmod(a), droneLastmod(b));
}

/** Indexes list the whole catalog — the batch re-read date is the right stamp. */
export function catalogIndexLastmod(): Date {
  return newestDate(
    DRONE_BATCH,
    GEAR_BATCH,
    ...drones.map((d) => droneLastmod(d)),
    ...gear.map((g) => gearLastmod(g)),
  );
}
