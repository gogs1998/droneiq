import { drones, getDrone } from "@/data/catalog";
import {
  comparable,
  FEATURED_GEAR_PAIRS,
  getGear,
  type Gear,
} from "@/data/gear";
import type { FaqItem } from "@/lib/compare";
import { formatReleased } from "@/lib/compare";

export type GearSpecKey =
  | "released"
  | "form"
  | "transmission"
  | "screen"
  | "flies"
  | "protocol";

export type GearSpecRow = {
  key: GearSpecKey;
  group: string;
  label: string;
  values: string[];
};

export function namesForSlugs(slugs: string[]): string {
  return slugs.map((s) => getDrone(s)?.shortName ?? s).join(", ");
}

export function sharedFlies(a: Gear, b: Gear): string[] {
  return a.flies.filter((s) => b.flies.includes(s));
}

export function onlyFlies(item: Gear, other: Gear): string[] {
  return item.flies.filter((s) => !other.flies.includes(s));
}

export function dronesFlown(item: Gear) {
  return item.flies
    .map((s) => getDrone(s))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
}

export function dronesNotFlown(item: Gear) {
  const set = new Set(item.flies);
  return drones.filter((d) => !set.has(d.slug));
}

export function gearSpecRows(items: Gear[]): GearSpecRow[] {
  return [
    {
      key: "released",
      group: "Kit",
      label: "Released",
      values: items.map((g) => formatReleased(g.released)),
    },
    {
      key: "form",
      group: "Kit",
      label: "Form",
      values: items.map((g) => g.form),
    },
    {
      key: "transmission",
      group: "Kit",
      label: "Transmission",
      values: items.map((g) => g.transmission),
    },
    {
      key: "screen",
      group: "Kit",
      label: "Screen",
      values: items.map((g) => g.screen),
    },
    {
      key: "flies",
      group: "Compatibility",
      label: "Flies in this catalog",
      values: items.map((g) => namesForSlugs(g.flies) || "—"),
    },
    {
      key: "protocol",
      group: "Compatibility",
      label: "Protocol note",
      values: items.map((g) => g.protocolNote),
    },
  ];
}

export function gearSpecGroups(rows: GearSpecRow[]): { name: string; rows: GearSpecRow[] }[] {
  const order: string[] = [];
  const map = new Map<string, GearSpecRow[]>();
  for (const r of rows) {
    if (!map.has(r.group)) {
      map.set(r.group, []);
      order.push(r.group);
    }
    map.get(r.group)!.push(r);
  }
  return order.map((name) => ({ name, rows: map.get(name)! }));
}

export function gearVerdict(a: Gear, b: Gear): { snippet: string; paragraph: string } {
  const share = sharedFlies(a, b);
  const aOnly = onlyFlies(a, b);
  const bOnly = onlyFlies(b, a);
  const lines: string[] = [];
  if (share.length) {
    lines.push(`${a.shortName} and ${b.shortName} share ${namesForSlugs(share)}.`);
    if (aOnly.length) lines.push(`${a.shortName} also flies ${namesForSlugs(aOnly)}.`);
    if (bOnly.length) lines.push(`${b.shortName} also flies ${namesForSlugs(bOnly)}.`);
  } else {
    lines.push(
      `${a.shortName} and ${b.shortName} share none of the catalog airframes.`,
    );
    lines.push(`${a.shortName} flies ${namesForSlugs(a.flies)}.`);
    lines.push(`${b.shortName} flies ${namesForSlugs(b.flies)}.`);
  }
  lines.push(
    a.protocolNote !== b.protocolNote
      ? `${a.shortName}: ${a.protocolNote} ${b.shortName}: ${b.protocolNote}`
      : a.protocolNote,
  );
  const snippet =
    share.length === 0
      ? `No shared airframes: ${a.shortName} vs ${b.shortName}.`
      : `${a.shortName} vs ${b.shortName}: both fly ${namesForSlugs(share)}.`;
  return { snippet, paragraph: lines.join(" ") };
}

const FEATURED_FAQS: Record<string, FaqItem[]> = {
  "rc-n2-vs-rc-n3": [
    {
      q: "Will an RC-N2 fly a Mini 5 Pro?",
      a: "No. RC-N2 is filed here for Mini 4 Pro and Air 3. Mini 5 Pro is RC-N3 (phone clamp) or RC 2 (screen). Same O4 family name does not mean the stick is on the aircraft’s list. Check firmware on the RC you actually hold.",
    },
    {
      q: "Is RC-N3 a drop-in for RC-N2?",
      a: "No. They share no catalog airframes. RC-N3 flies Neo, Neo 2, Flip, Mini 5 Pro and Air 3S. RC-N2 flies Mini 4 Pro and Air 3. A used RC-N2 does not become an RC-N3.",
    },
  ],
  "rc-n3-vs-rc-2": [
    {
      q: "Do I need the screen controller for Mini 5 Pro?",
      a: "No. Mini 5 Pro flies from RC-N3 (your phone) or RC 2 (built-in screen). Overlap also includes Flip and Air 3S. RC 2 additionally covers Mini 4 Pro, Air 3 and Mavic 4 Pro — with a firmware check. RC-N3 additionally covers Neo and Neo 2.",
    },
  ],
  "goggles-3-vs-goggles-n3": [
    {
      q: "Will Goggles N3 fly Avata 360?",
      a: "Not on this catalog. Goggles 3 and N3 both fly Neo 2 and Avata 2. Avata 360 is filed with Goggles 3; confirm the kit DJI actually ships before you buy N3 for 360. Micro-OLED vs LCD is the picture difference.",
    },
    {
      q: "Do goggles cancel Flyer ID or VLOS?",
      a: "No. Goggles are a display. UK Flyer ID, Operator ID and visual line of sight still apply to the airframe. A headset does not move you into a different category.",
    },
  ],
  "motion-3-vs-fpv-rc-3": [
    {
      q: "Can I fly Avata 2 with either Motion 3 or FPV RC 3?",
      a: "Yes, both are on the Avata 2 / Avata 360 list. They are different sports: motion is the palm stick; FPV RC 3 is two-stick. Both still need Goggles 3 or N3. Neither is a camera-drone RC 2.",
    },
  ],
};

function pairFaqKey(a: Gear, b: Gear): string {
  const [x, y] = a.sortOrder <= b.sortOrder ? [a, b] : [b, a];
  return `${x.slug}-vs-${y.slug}`;
}

export function gearFaqs(items: Gear[]): FaqItem[] {
  if (items.length === 1) {
    const g = items[0];
    const flown = namesForSlugs(g.flies);
    const out: FaqItem[] = [
      {
        q: `Will ${g.shortName} fly my drone?`,
        a: flown
          ? `In this catalog it is listed for ${flown}. ${g.protocolNote} Confirm firmware on the unit you actually hold — a used RC 2 from another kit still has to list the aircraft.`
          : g.note,
      },
    ];
    if (g.kind === "goggles" || g.kind === "motion") {
      out.push({
        q: "Do goggles or motion cancel Flyer ID or VLOS?",
        a: "No. The UK rules attach to the airframe, not the glass on your face. Flyer ID from 100 g with a camera, Operator ID the same, visual line of sight unless you hold something else. Goggles are a display.",
      });
    }
    if (g.kind === "rc" || g.kind === "motion") {
      out.push({
        q: "Can I mix this with another RC from a different kit?",
        a: `${g.protocolNote} Protocol and firmware both have to match. ${g.note}`,
      });
    }
    return out;
  }
  if (items.length !== 2 || !comparable(items[0], items[1])) return [];
  const [a, b] =
    items[0].sortOrder <= items[1].sortOrder ? items : [items[1], items[0]];
  const share = sharedFlies(a, b);
  const itemsOut: FaqItem[] = FEATURED_FAQS[pairFaqKey(a, b)]?.slice() ?? [];
  itemsOut.push({
    q: `Which drones do both ${a.shortName} and ${b.shortName} fly?`,
    a: share.length
      ? `Both: ${namesForSlugs(share)}. ${a.shortName} only: ${namesForSlugs(onlyFlies(a, b)) || "none"}. ${b.shortName} only: ${namesForSlugs(onlyFlies(b, a)) || "none"}.`
      : `None in this catalog. ${a.shortName} flies ${namesForSlugs(a.flies)}. ${b.shortName} flies ${namesForSlugs(b.flies)}. A matching OcuSync generation is not enough.`,
  });
  if (a.kind === "goggles" || b.kind === "goggles") {
    itemsOut.push({
      q: "Do goggles cancel Flyer ID or VLOS?",
      a: "No. Headset, motion or sticks do not change UK Open-category IDs or visual line of sight. The airframe still needs Flyer ID from 100 g with a camera.",
    });
  }
  return itemsOut;
}

export function featuredGearResolved(): { a: Gear; b: Gear }[] {
  return FEATURED_GEAR_PAIRS.flatMap(([as, bs]) => {
    const a = getGear(as);
    const b = getGear(bs);
    if (!a || !b || !comparable(a, b)) return [];
    return [{ a, b }];
  });
}
