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

export const JOBS: { slug: Job; title: string; lede: string; answer: string }[] = [
  {
    slug: "travel",
    title: "Travel",
    lede: "Fits a bag, stays legal in a city, still shoots a picture you would keep. Weight class first, then the camera.",
    answer:
      "Take Mini 4 Pro if you want sub-250 g A1 and a 1/1.3-inch gimbal that fits a bag. Mini 5 Pro is the same class on the standard pack with a 1-inch sensor — the Plus battery is C1; weigh it. Air 3S is the dual-camera bag if you will actually use 70 mm and accept C1.",
  },
  {
    slug: "wind",
    title: "Wind",
    lede: "Mass and motor authority. A Mini on a headland is a different aircraft from an Air on the same day.",
    answer:
      "Mass is the fact. Air 3S and the Mavics hold a UK headland better than a Mini. Mini 4 Pro is still a Mini in wind; the class mark does not add motor. DJI’s wind figure is a lab level — weight is what you feel.",
  },
  {
    slug: "dusk",
    title: "Dusk",
    lede: "Sensor area and nightscape sensing. Megapixels will not save a 1/2.3-inch chip after sunset.",
    answer:
      "Sensor area. Mini 5 Pro and Air 3S are 1-inch wides; Mavic 3 / 3 Pro / 4 Pro are 4/3 Hasselblad. Mini 4K’s 1/2.3-inch 4K/30 will not save dusk. Nightscape sensing on Air 3S is the other thing you would notice after sunset.",
  },
  {
    slug: "beginner",
    title: "Beginner",
    lede: "Guards, downward or omni sensing, and a price you can crash. Not the flagship.",
    answer:
      "Flip or Mini 4K if the picture and C0 paperwork matter. Neo if you want palm takeoff and a small sensor. Do not buy Mavic 4 Pro to learn. Flyer ID and Operator ID apply from 100 g with a camera — that is every drone here.",
  },
  {
    slug: "fpv",
    title: "FPV",
    lede: "Goggles, a super-wide, and a different sport. Do not compare these to a Mini on a spec table and stop there.",
    answer:
      "Avata 2 is the current ducted cinewhoop (C1, O4, Goggles 3). Original DJI FPV is the exposed-prop racer (unmarked A3, O3, Goggles V2). Packs, goggles and sticks do not swap. Neither is a Mini with a different camera.",
  },
];
