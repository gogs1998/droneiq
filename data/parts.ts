import { gear, type GearKind } from "./gear";

export type PartKind = GearKind;

export type Part = {
  id: string;
  kind: PartKind;
  name: string;
  drones: string[];
  note: string;
};

/** Derived from `data/gear.ts` so drone pages and the matrix cannot disagree. */
export const parts: Part[] = gear.map((g) => ({
  id: g.slug,
  kind: g.kind,
  name: g.name,
  drones: g.flies,
  note: g.note,
}));

export function partsFor(slug: string, kind?: PartKind): Part[] {
  return parts.filter(
    (p) => p.drones.includes(slug) && (kind ? p.kind === kind : true),
  );
}

export function sharedParts(a: string, b: string): Part[] {
  return parts.filter((p) => p.drones.includes(a) && p.drones.includes(b));
}

export function keepFromTo(from: string, to: string): { keep: Part[]; lose: Part[] } {
  const mine = parts.filter((p) => p.drones.includes(from));
  return {
    keep: mine.filter((p) => p.drones.includes(to)),
    lose: mine.filter((p) => !p.drones.includes(to)),
  };
}
