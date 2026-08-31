import { drones as groupA } from "./drones-a";
import { dronesB } from "./drones-b";
import type { Drone, Job } from "./types";

export const drones: Drone[] = [...groupA, ...dronesB].sort(
  (a, b) => a.sortOrder - b.sortOrder,
);

const bySlug = new Map(drones.map((d) => [d.slug, d]));

export function getDrone(slug: string): Drone | undefined {
  return bySlug.get(slug);
}

export function requireDrone(slug: string): Drone {
  const d = bySlug.get(slug);
  if (!d) throw new Error(`Unknown drone: ${slug}`);
  return d;
}

export function dronesForJob(job: Job): Drone[] {
  return drones.filter((d) => d.jobs.includes(job));
}

export function relatedDrones(drone: Drone, n = 4): Drone[] {
  const same = drones.filter(
    (d) => d.slug !== drone.slug && d.series === drone.series,
  );
  const rest = drones.filter(
    (d) => d.slug !== drone.slug && d.series !== drone.series,
  );
  const scored = [...same, ...rest].sort((a, b) => {
    const da = Math.abs(a.sortOrder - drone.sortOrder);
    const db = Math.abs(b.sortOrder - drone.sortOrder);
    return da - db;
  });
  const seen = new Set<string>();
  const out: Drone[] = [];
  for (const d of scored) {
    if (seen.has(d.slug)) continue;
    seen.add(d.slug);
    out.push(d);
    if (out.length >= n) break;
  }
  return out;
}

export const JOBS: { slug: Job; title: string; lede: string }[] = [
  {
    slug: "travel",
    title: "Travel",
    lede: "Fits a bag, stays legal in a city, still shoots a picture you would keep. Weight class first, then the camera.",
  },
  {
    slug: "wind",
    title: "Wind",
    lede: "Mass and motor authority. A Mini on a headland is a different aircraft from an Air on the same day.",
  },
  {
    slug: "dusk",
    title: "Dusk",
    lede: "Sensor area and nightscape sensing. Megapixels will not save a 1/2.3-inch chip after sunset.",
  },
  {
    slug: "beginner",
    title: "Beginner",
    lede: "Guards, downward or omni sensing, and a price you can crash. Not the flagship.",
  },
  {
    slug: "fpv",
    title: "FPV",
    lede: "Goggles, a super-wide, and a different sport. Do not compare these to a Mini on a spec table and stop there.",
  },
];
