import { glossary } from "@/data/glossary";
import { keepFromTo } from "@/data/parts";
import { featuredFor } from "@/data/featured-matchups";
import type { Drone, SensingKind } from "@/data/types";

export type Notice = "notice" | "quiet" | "same";

export type SpecKey =
  | "released"
  | "app"
  | "weight"
  | "ukClass"
  | "ukOpen"
  | "ukPeople"
  | "ukHeight"
  | "folded"
  | "sensor"
  | "aperture"
  | "fov"
  | "iso"
  | "log"
  | "telephoto"
  | "video"
  | "gimbal"
  | "flightTime"
  | "hover"
  | "wind"
  | "speed"
  | "climb"
  | "ceiling"
  | "sensing"
  | "range"
  | "battery"
  | "storage"
  | "sdCard"
  | "gnss"
  | "opTemp";

/** Rows that feed the “would you notice” verdict — not every spec line. */
const VERDICT_KEYS: SpecKey[] = [
  "weight",
  "ukClass",
  "sensor",
  "telephoto",
  "video",
  "gimbal",
  "flightTime",
  "wind",
  "sensing",
  "range",
  "storage",
];

export type SpecRow = {
  key: SpecKey;
  group: string;
  label: string;
  values: string[];
  notice: Notice[];
  winnerIndex: number | null;
};

const SENSING_RANK: Record<SensingKind, number> = {
  none: 0,
  down: 1,
  "front-down": 2,
  "front-back-down": 3,
  omni: 4,
  "omni-nightscape": 5,
};

const SENSING_LABEL: Record<SensingKind, string> = {
  none: "None",
  down: "Downward",
  "front-down": "Forward + down",
  "front-back-down": "Front / back / down",
  omni: "Omnidirectional",
  "omni-nightscape": "Omni + nightscape",
};

export function gbp(n: number | null | undefined): string {
  if (n == null) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatReleased(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function primaryCamera(d: Drone) {
  return d.cameras[0];
}

export function hasOpticalTele(d: Drone): boolean {
  return d.cameras.some((c) => c.role === "medium-tele" || c.role === "tele");
}

export function teleSummary(d: Drone): string {
  const extras = d.cameras.filter((c) => c.role !== "wide" && c.role !== "fpv");
  if (d.cameras[0]?.role === "fpv") return "FPV super-wide (no tele)";
  if (d.cameras[0]?.role === "360") return "360 capture";
  if (!extras.length) return "Single camera";
  return extras.map((c) => `${c.equivMm} mm ${c.sensor}`).join(" + ");
}

export function sensorSummary(d: Drone): string {
  const c = primaryCamera(d);
  return `${c.sensor} · ${c.megapixels} MP · ${c.equivMm} mm`;
}

/** UK Open-category distances from the March 2026 Drone Code. Not legal advice. */
export function flyCard(d: Drone): {
  subcategory: string;
  people: string;
  height: string;
} {
  const height = "120 m AGL";
  if (d.slug === "mini-5-pro") {
    return {
      subcategory: "A1 Over People (C0 pack)",
      people:
        "May overfly uninvolved people; not crowds. Plus battery is C1 — still A1 until 31 Dec 2027. Weigh it.",
      height,
    };
  }
  if (d.ukClass === "C0" || d.sub250) {
    return {
      subcategory: "A1 Over People",
      people: "May overfly uninvolved people; not crowds. Towns OK.",
      height,
    };
  }
  if (d.ukClass === "C1") {
    return {
      subcategory: "A1 Over People (C1 until 31 Dec 2027)",
      people: "May overfly uninvolved people; not crowds. Flyer ID required. Towns OK in A1.",
      height,
    };
  }
  if (d.ukClass === "C2") {
    return {
      subcategory: "A2 (A2 CofC) or A3",
      people:
        "A2: 30 m from uninvolved people (5 m low-speed). Without CofC, A3: 50 m and 150 m from built-up areas. No overflight.",
      height,
    };
  }
  return {
    subcategory: "A3 Far from People",
    people: "50 m from uninvolved people; 150 m from built-up areas. No overflight.",
    height,
  };
}

function allSame(n: number): Notice[] {
  return Array.from({ length: n }, () => "same" as Notice);
}

function gapNotice(nums: number[], noticeAt: number, quietAt: number): Notice[] {
  if (nums.length < 2) return allSame(nums.length);
  const gap = Math.max(...nums) - Math.min(...nums);
  const flag: Notice = gap >= noticeAt ? "notice" : gap >= quietAt ? "quiet" : "same";
  return nums.map(() => flag);
}

function differNotice(vals: string[], level: Notice = "quiet"): Notice[] {
  if (vals.length < 2) return allSame(vals.length);
  const flag: Notice = new Set(vals).size === 1 ? "same" : level;
  return vals.map(() => flag);
}

function maxNotice(flags: Notice[]): Notice {
  if (flags.includes("notice")) return "notice";
  if (flags.includes("quiet")) return "quiet";
  return "same";
}

function row(
  key: SpecKey,
  group: string,
  label: string,
  values: string[],
  notice: Notice[],
  winnerIndex: number | null,
): SpecRow {
  return { key, group, label, values, notice, winnerIndex };
}

export function specRows(list: Drone[]): SpecRow[] {
  const n = list.length;
  const weightNotice: Notice[] = list.map((d) => {
    const others = list.filter((x) => x.slug !== d.slug);
    const crosses = others.some((o) => d.sub250 !== o.sub250);
    const big = others.some((o) => Math.abs(o.weightG - d.weightG) >= 50);
    if (crosses || big) return "notice";
    if (others.some((o) => Math.abs(o.weightG - d.weightG) >= 8)) return "quiet";
    return "same";
  });

  const classNotice: Notice[] = list.map((d) =>
    list.some((o) => o.ukClass !== d.ukClass || o.flyerIdRequired !== d.flyerIdRequired)
      ? "notice"
      : "same",
  );

  const sensorRanks = list.map((d) => primaryCamera(d).sensorRank);
  const sensorNotice: Notice[] = list.map(() => {
    const gap = Math.max(...sensorRanks) - Math.min(...sensorRanks);
    if (gap >= 20) return "notice";
    if (gap > 0) return "quiet";
    return "same";
  });
  const sensorWinner = uniqueWinner(sensorRanks, "max");

  const teleFlags = list.map(hasOpticalTele);
  const teleNotice: Notice[] = list.map((d) =>
    teleFlags.some(Boolean) && teleFlags.some((t) => !t) ? "notice" : teleFlags.every((t) => t) && list.some((o) => teleSummary(o) !== teleSummary(d)) ? "quiet" : "same",
  );

  const fps = list.map((d) => primaryCamera(d).maxVideoFps);
  const videoNotice: Notice[] = list.map(() => {
    const gap = Math.max(...fps) - Math.min(...fps);
    if (gap >= 30) return "notice";
    if (list.some((d) => d.cameras[0].maxVideo !== list[0].cameras[0].maxVideo))
      return "quiet";
    return "same";
  });

  const tilt = list.map((d) => primaryCamera(d).gimbalTiltDeg);
  const gimbalNotice: Notice[] = list.map((d) => {
    const verticalDiff = list.some((o) => o.cameras[0].trueVertical !== d.cameras[0].trueVertical);
    const tiltGap = Math.max(...tilt) - Math.min(...tilt);
    if (verticalDiff || tiltGap >= 90) return "notice";
    if (tiltGap >= 20) return "quiet";
    return "same";
  });

  const times = list.map((d) => d.flightTimeMin);
  const timeNotice: Notice[] = list.map(() => {
    const gap = Math.max(...times) - Math.min(...times);
    if (gap >= 8) return "notice";
    if (gap >= 3) return "quiet";
    return "same";
  });

  const wind = list.map((d) => d.windMs);
  const windNotice: Notice[] = list.map(() => {
    const gap = Math.max(...wind) - Math.min(...wind);
    if (gap >= 2) return "notice";
    if (gap > 0) return "quiet";
    return "same";
  });

  const sense = list.map((d) => SENSING_RANK[d.sensing]);
  const senseNotice: Notice[] = list.map(() => {
    const gap = Math.max(...sense) - Math.min(...sense);
    if (gap >= 2) return "notice";
    if (gap === 1) return "quiet";
    return "same";
  });

  const rangeNotice: Notice[] = list.map(() => {
    const ces = list.map((d) => d.rangeKmCe);
    const gap = Math.max(...ces) - Math.min(...ces);
    if (Math.min(...ces) >= 8 && gap <= 5) return "same";
    if (gap >= 6) return "quiet";
    return "same";
  });

  const storage = list.map((d) => d.internalGb);
  const storageNotice: Notice[] = list.map(() => {
    const gap = Math.max(...storage) - Math.min(...storage);
    if (gap >= 20) return "quiet";
    return "same";
  });

  const lightest = uniqueWinner(
    list.map((d) => d.weightG),
    "min",
  );

  return [
    row(
      "released",
      "Identity",
      "Released",
      list.map((d) => formatReleased(d.released)),
      differNotice(list.map((d) => d.released.slice(0, 4))),
      null,
    ),
    row(
      "app",
      "Identity",
      "App",
      list.map((d) => d.app),
      differNotice(list.map((d) => d.app)),
      null,
    ),
    row(
      "weight",
      "Weight & UK law",
      "Takeoff weight",
      list.map((d) => `${trimNum(d.weightG)} g`),
      weightNotice,
      lightest,
    ),
    row(
      "ukClass",
      "Weight & UK law",
      "UK class / IDs",
      list.map(
        (d) =>
          `${d.ukClass}${d.sub250 ? " · sub-250 g" : ""} · Operator ID${d.flyerIdRequired ? " + Flyer ID" : ""}`,
      ),
      classNotice,
      uniqueWinner(
        list.map((d) => (d.sub250 ? 1 : 0) + (d.ukClass === "C0" ? 1 : 0)),
        "max",
      ),
    ),
    row(
      "ukOpen",
      "Weight & UK law",
      "Open subcategory",
      list.map((d) => flyCard(d).subcategory),
      classNotice,
      uniqueWinner(
        list.map((d) => (d.sub250 || d.ukClass === "C0" ? 2 : d.ukClass === "C1" ? 1 : 0)),
        "max",
      ),
    ),
    row(
      "ukPeople",
      "Weight & UK law",
      "From uninvolved people",
      list.map((d) => flyCard(d).people),
      classNotice,
      uniqueWinner(
        list.map((d) => (d.sub250 || d.ukClass === "C0" ? 2 : d.ukClass === "C1" ? 1 : 0)),
        "max",
      ),
    ),
    row(
      "ukHeight",
      "Weight & UK law",
      "Height (Open)",
      list.map((d) => flyCard(d).height),
      allSame(list.length),
      null,
    ),
    row(
      "folded",
      "Weight & UK law",
      "Folded size",
      list.map((d) => d.foldedMm),
      differNotice(list.map((d) => d.foldedMm)),
      null,
    ),
    row(
      "sensor",
      "Camera",
      "Main sensor",
      list.map(sensorSummary),
      sensorNotice,
      sensorWinner,
    ),
    row(
      "aperture",
      "Camera",
      "Aperture",
      list.map((d) => d.cameras[0].aperture),
      differNotice(list.map((d) => d.cameras[0].aperture)),
      null,
    ),
    row(
      "fov",
      "Camera",
      "Field of view",
      list.map((d) => `${d.cameras[0].fovDeg}°`),
      gapNotice(
        list.map((d) => d.cameras[0].fovDeg),
        20,
        8,
      ),
      uniqueWinner(
        list.map((d) => d.cameras[0].fovDeg),
        "max",
      ),
    ),
    row(
      "iso",
      "Camera",
      "ISO (photo / video)",
      list.map((d) => `${d.cameras[0].isoPhoto} / ${d.cameras[0].isoVideo}`),
      differNotice(list.map((d) => `${d.cameras[0].isoPhoto}|${d.cameras[0].isoVideo}`)),
      null,
    ),
    row(
      "log",
      "Camera",
      "Colour / log",
      list.map((d) => d.cameras[0].log ?? "Rec. 709 / normal"),
      differNotice(list.map((d) => d.cameras[0].log ?? "none")),
      null,
    ),
    row(
      "telephoto",
      "Camera",
      "Other cameras",
      list.map(teleSummary),
      teleNotice,
      uniqueWinner(
        list.map((d) => d.cameras.filter((c) => c.role !== "wide" && c.role !== "fpv").length),
        "max",
      ),
    ),
    row(
      "video",
      "Camera",
      "Max video",
      list.map((d) => d.cameras[0].maxVideo),
      videoNotice,
      uniqueWinner(fps, "max"),
    ),
    row(
      "gimbal",
      "Camera",
      "Gimbal / vertical",
      list.map(
        (d) =>
          `${d.cameras[0].gimbalTiltDeg}° tilt${d.cameras[0].trueVertical ? " · true vertical" : ""}`,
      ),
      gimbalNotice,
      uniqueWinner(tilt, "max"),
    ),
    row(
      "flightTime",
      "Flight",
      "Lab flight time",
      list.map((d) =>
        d.flightTimePlusMin
          ? `${d.flightTimeMin} min (${d.flightTimePlusMin} with Plus)`
          : `${d.flightTimeMin} min`,
      ),
      timeNotice,
      uniqueWinner(times, "max"),
    ),
    row(
      "hover",
      "Flight",
      "Hover time",
      list.map((d) => (d.hoverTimeMin != null ? `${d.hoverTimeMin} min` : "—")),
      gapNotice(
        list.map((d) => d.hoverTimeMin ?? 0),
        8,
        3,
      ),
      uniqueWinner(
        list.map((d) => d.hoverTimeMin ?? 0),
        "max",
      ),
    ),
    row(
      "wind",
      "Flight",
      "Wind resistance",
      list.map((d) => `${d.windLevel} · ${d.windMs} m/s`),
      windNotice,
      uniqueWinner(wind, "max"),
    ),
    row(
      "speed",
      "Flight",
      "Max speed (CE)",
      list.map((d) => `${d.maxSpeedKphCe} km/h CE · ${d.maxSpeedKphFcc} FCC`),
      gapNotice(
        list.map((d) => d.maxSpeedKphCe),
        20,
        8,
      ),
      uniqueWinner(
        list.map((d) => d.maxSpeedKphCe),
        "max",
      ),
    ),
    row(
      "climb",
      "Flight",
      "Climb / descent",
      list.map((d) => `${d.maxAscentMs} / ${d.maxDescentMs} m/s`),
      gapNotice(
        list.map((d) => d.maxAscentMs + d.maxDescentMs),
        4,
        2,
      ),
      uniqueWinner(
        list.map((d) => d.maxAscentMs),
        "max",
      ),
    ),
    row(
      "ceiling",
      "Flight",
      "Max takeoff altitude",
      list.map((d) => `${d.maxTakeoffM} m`),
      gapNotice(
        list.map((d) => d.maxTakeoffM),
        2000,
        500,
      ),
      uniqueWinner(
        list.map((d) => d.maxTakeoffM),
        "max",
      ),
    ),
    row(
      "sensing",
      "Sensing",
      "Obstacle sensing",
      list.map((d) => SENSING_LABEL[d.sensing]),
      senseNotice,
      uniqueWinner(sense, "max"),
    ),
    row(
      "range",
      "Transmission",
      "Video range (CE)",
      list.map((d) => `${d.rangeKmCe} km CE · ${d.transmission} (${d.rangeKmFcc} km FCC)`),
      rangeNotice,
      n === 2 && Math.abs(list[0].rangeKmCe - list[1].rangeKmCe) >= 6
        ? uniqueWinner(
            list.map((d) => d.rangeKmCe),
            "max",
          )
        : null,
    ),
    row(
      "battery",
      "Power & storage",
      "Battery",
      list.map((d) => `${trimNum(d.batteryWh)} Wh`),
      gapNotice(
        list.map((d) => d.batteryWh),
        30,
        10,
      ),
      uniqueWinner(
        list.map((d) => d.batteryWh),
        "max",
      ),
    ),
    row(
      "storage",
      "Power & storage",
      "Internal storage",
      list.map((d) => (d.internalGb ? `${d.internalGb} GB` : "Card only")),
      storageNotice,
      uniqueWinner(storage, "max"),
    ),
    row(
      "sdCard",
      "Power & storage",
      "microSD",
      list.map((d) => d.sdCard),
      differNotice(list.map((d) => d.sdCard)),
      null,
    ),
    row(
      "gnss",
      "Power & storage",
      "GNSS",
      list.map((d) => d.gnss),
      differNotice(list.map((d) => d.gnss)),
      null,
    ),
    row(
      "opTemp",
      "Power & storage",
      "Operating temperature",
      list.map((d) => d.opTempC),
      differNotice(list.map((d) => d.opTempC)),
      null,
    ),
  ];
}

function uniqueWinner(nums: number[], dir: "max" | "min"): number | null {
  if (nums.length < 2) return null;
  const best = dir === "max" ? Math.max(...nums) : Math.min(...nums);
  const idxs = nums.map((v, i) => (v === best ? i : -1)).filter((i) => i >= 0);
  if (idxs.length !== 1) return null;
  if (nums.every((v) => v === best)) return null;
  return idxs[0];
}

function trimNum(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export type Verdict = {
  notice: string[];
  quiet: string[];
  same: string[];
  paragraph: string;
  snippet: string;
};

export function verdictFor(list: Drone[]): Verdict {
  const rows = specRows(list);
  const names = list.map((d) => d.shortName);
  const notice: string[] = [];
  const quiet: string[] = [];
  const same: string[] = [];

  for (const r of rows) {
    if (!VERDICT_KEYS.includes(r.key)) continue;
    const flag = maxNotice(r.notice);
    const label = glossary[r.key]?.label ?? r.label;
    if (flag === "same") {
      same.push(label);
      continue;
    }
    const bits = r.values
      .map((v, i) => `${names[i]}: ${v}`)
      .join("; ");
    const line = `${label} — ${bits}`;
    if (flag === "notice") notice.push(line);
    else quiet.push(line);
  }

  const a = list[0];
  const b = list[1];
  const title =
    list.length === 2
      ? `${a.shortName} vs ${b.shortName}`
      : names.join(" vs ");

  const noticeProse = proseNotices(list, rows);
  const quietProse = quiet.length
    ? `You would not really notice ${quiet
        .map((q) => q.split(" — ")[0].toLowerCase())
        .slice(0, 3)
        .join(", ")}.`
    : "";

  const law = lawLine(list);

  const paragraph = [noticeProse, quietProse, law].filter(Boolean).join(" ");

  const snippet = snippetFor(list, rows, law);

  return { notice, quiet, same, paragraph: `${title}: ${paragraph}`, snippet };
}

function lawLine(list: Drone[]): string {
  const classes = new Set(list.map((d) => d.ukClass));
  const sub = new Set(list.map((d) => d.sub250));
  if (classes.size === 1 && sub.size === 1) {
    const d = list[0];
    return `UK: ${d.ukClass}${d.sub250 ? ", stays under 250 g" : ", Flyer ID required"} on every one of these. Operator ID applies because they all have cameras.`;
  }
  return `UK paperwork is part of the difference: ${list
    .map(
      (d) =>
        `${d.shortName} is ${d.ukClass}${d.sub250 ? " / sub-250 g" : ""} (${d.flyerIdRequired ? "Flyer ID + Operator ID" : "Operator ID, no Flyer ID"})`,
    )
    .join("; ")}.`;
}

function proseNotices(list: Drone[], rows: SpecRow[]): string {
  const hot = rows.filter((r) => maxNotice(r.notice) === "notice");
  if (!hot.length) {
    return "On the numbers that actually change a picture or a flight, these are close.";
  }
  const bits: string[] = [];
  for (const r of hot.slice(0, 4)) {
    if (r.key === "sensor") {
      bits.push(
        `you would notice the sensor (${list.map((d) => primaryCamera(d).sensor).join(" vs ")}) in evening light`,
      );
    } else if (r.key === "telephoto") {
      bits.push(
        hasOpticalTele(list.find((d) => hasOpticalTele(d))!)
          ? "you would notice a real telephoto (optical, not a crop)"
          : "the camera count is different",
      );
    } else if (r.key === "weight" || r.key === "ukClass" || r.key === "ukPeople" || r.key === "ukOpen") {
      bits.push("you would notice weight mostly as paperwork, bag mass and how close you may fly to people");
    } else if (r.key === "sensing") {
      bits.push(
        `you would notice obstacle sensing (${list.map((d) => SENSING_LABEL[d.sensing]).join(" vs ")})`,
      );
    } else if (r.key === "gimbal") {
      bits.push("you would notice gimbal travel if you shoot vertical or roll");
    } else if (r.key === "flightTime") {
      bits.push("you would notice endurance on a two-battery outing, not a single park lap");
    } else if (r.key === "wind") {
      bits.push("you would notice wind authority on a coastal or hill day");
    } else if (r.key === "video") {
      bits.push("you would notice max video only if you slow-mo or grade HDR");
    }
  }
  const unique = [...new Set(bits)];
  if (!unique.length) return "The table below is the difference.";
  const lead = unique[0].charAt(0).toUpperCase() + unique[0].slice(1);
  return `${lead}${unique.length > 1 ? `; ${unique.slice(1).join("; ")}` : ""}.`;
}

function snippetFor(list: Drone[], rows: SpecRow[], law: string): string {
  if (list.length === 2) {
    const [a, b] = list;
    const newer = a.sortOrder >= b.sortOrder ? a : b;
    const older = newer === a ? b : a;
    const sensorGap =
      Math.abs(primaryCamera(a).sensorRank - primaryCamera(b).sensorRank) >= 20;
    const who =
      hasOpticalTele(a) !== hasOpticalTele(b)
        ? hasOpticalTele(a)
          ? `${a.shortName} if you need optical telephoto; ${b.shortName} otherwise`
          : `${b.shortName} if you need optical telephoto; ${a.shortName} otherwise`
        : sensorGap
          ? `the ${primaryCamera(newer).sensor} on ${newer.shortName} is the picture upgrade from ${older.shortName}`
          : `${newer.shortName} is the newer of two close cameras`;
    return `${a.shortName} vs ${b.shortName}: ${who}. ${law}`.slice(0, 280);
  }
  return `${list.map((d) => d.shortName).join(" vs ")}. ${law}`.slice(0, 280);
}

export type FaqItem = { q: string; a: string };

export function faqsFor(list: Drone[]): FaqItem[] {
  if (list.length === 1) {
    const d = list[0];
    return [
      {
        q: `Do I need to register the ${d.shortName} in the UK?`,
        a: ukRegister(d),
      },
      {
        q: `How far from people can I fly the ${d.shortName} in the UK?`,
        a: flyFaq(d),
      },
    ];
  }
  if (list.length !== 2) return [];
  const [rawA, rawB] = list;
  const older = rawA.sortOrder <= rawB.sortOrder ? rawA : rawB;
  const newer = older === rawA ? rawB : rawA;
  const items: FaqItem[] = [];

  const sensorGap = Math.abs(
    primaryCamera(older).sensorRank - primaryCamera(newer).sensorRank,
  );
  const teleGap = hasOpticalTele(older) !== hasOpticalTele(newer);
  if (sensorGap >= 15 || teleGap) {
    items.push({
      q: "Will I notice the camera?",
      a: cameraNotice(older, newer),
    });
  }

  items.push({
    q: `Do I need to register the ${newer.shortName} in the UK?`,
    a: ukRegister(newer),
  });
  if (older.flyerIdRequired !== newer.flyerIdRequired || older.sub250 !== newer.sub250) {
    items.push({
      q: `Do I need to register the ${older.shortName} in the UK?`,
      a: ukRegister(older),
    });
  }

  items.push({
    q: `How far from people can I fly the ${newer.shortName} in the UK?`,
    a: flyFaq(newer),
  });
  if (older.ukClass !== newer.ukClass || older.sub250 !== newer.sub250) {
    items.push({
      q: `How far from people can I fly the ${older.shortName} in the UK?`,
      a: flyFaq(older),
    });
  }

  if (Math.abs(older.windMs - newer.windMs) >= 1.5 || Math.abs(older.weightG - newer.weightG) >= 80) {
    items.push({
      q: "Which is better in wind?",
      a: `${heavierFlyer(older, newer)} carries more mass into DJI’s published wind figure (${older.shortName} ${older.windMs} m/s, ${newer.shortName} ${newer.windMs} m/s). On a UK headland that is often the whole decision. Lab Level numbers that match can still feel different because weight is not in the level name.`,
    });
  }

  if (
    Math.abs(primaryCamera(older).sensorRank - primaryCamera(newer).sensorRank) >= 15 ||
    older.sensing !== newer.sensing
  ) {
    items.push({
      q: "Which is better at dusk?",
      a: dusk(older, newer),
    });
  }

  items.push({
    q: "Which is better for travel?",
    a: travel(older, newer),
  });

  const keep = keepFromTo(older.slug, newer.slug);
  items.push({
    q: `Can I keep my ${older.shortName} batteries, controller or ND filters?`,
    a: keep.keep.length
      ? `You can keep: ${keep.keep.map((p) => p.name).join("; ")}. You cannot take: ${
          keep.lose.length ? keep.lose.map((p) => p.name).join("; ") : "nothing obvious in our parts list"
        }. ${keep.keep[0]?.note ?? ""}`
      : `These do not share a battery family. Plan to buy packs, and check ND thread and RC protocol — Mini 4 Pro filters and batteries do not sit on a Mini 5 Pro.`,
  });

  const priceGap =
    newer.prices.djiRrpGbp != null && older.prices.djiRrpGbp != null
      ? newer.prices.djiRrpGbp - older.prices.djiRrpGbp
      : null;
  items.push({
    q: "How much more does it cost?",
    a: priceGap == null
      ? `DJI UK RRP (as of ${newer.prices.asOf}): ${older.shortName} ${gbp(older.prices.djiRrpGbp)}, ${newer.shortName} ${gbp(newer.prices.djiRrpGbp)}. Used and CeX sit on the price board below — some of these are discontinued as new.`
      : `DJI UK RRP (as of ${newer.prices.asOf}): ${older.shortName} ${gbp(older.prices.djiRrpGbp)}, ${newer.shortName} ${gbp(newer.prices.djiRrpGbp)} — ${gbp(Math.abs(priceGap))} ${priceGap >= 0 ? "more" : "less"} for the ${newer.shortName}. Street, eBay bands and CeX trade-in are on the board; they move.`,
  });

  items.push({
    q: "Who should buy which?",
    a: `${older.shortName}: ${buyerLine(older)} ${newer.shortName}: ${buyerLine(newer)}`,
  });

  for (const extra of featuredFor(older.slug, newer.slug)) {
    if (!items.some((i) => i.q === extra.q)) items.push(extra);
  }

  return items;
}

function cameraNotice(a: Drone, b: Drone): string {
  const tele =
    hasOpticalTele(a) !== hasOpticalTele(b)
      ? ` Optical telephoto is only on ${hasOpticalTele(a) ? a.shortName : b.shortName} — that is a different picture, not a sharper crop.`
      : "";
  return `${a.shortName} main: ${sensorSummary(a)}, ${a.cameras[0].maxVideo}. ${b.shortName} main: ${sensorSummary(b)}, ${b.cameras[0].maxVideo}. You would notice sensor class in low light; you would not notice the word 4K if both already do it.${tele}`;
}

function ukRegister(d: Drone): string {
  return `${d.shortName} is ${d.ukClass}, takeoff about ${trimNum(d.weightG)} g (${d.weightNote}) ${
    d.flyerIdRequired
      ? "so a Flyer ID is required in the UK as well as an Operator ID."
      : "so under 250 g you do not need a Flyer ID, but you still need an Operator ID because it has a camera (it is not a toy)."
  } This is not legal advice; read the CAA drone code for the airframe and battery you actually fly.`;
}

function flyFaq(d: Drone): string {
  const f = flyCard(d);
  return `${d.shortName} (${d.ukClass}): ${f.subcategory}. ${f.people} Open height is ${f.height}. Never over crowds. This is not legal advice — the CAA Drone Code (March 2026) applies to the airframe and battery you actually fly.`;
}

function heavierFlyer(a: Drone, b: Drone): string {
  return a.weightG >= b.weightG ? a.shortName : b.shortName;
}

function dusk(a: Drone, b: Drone): string {
  const better =
    primaryCamera(a).sensorRank === primaryCamera(b).sensorRank
      ? a.sensing === "omni-nightscape" && b.sensing !== "omni-nightscape"
        ? a.shortName
        : b.sensing === "omni-nightscape" && a.sensing !== "omni-nightscape"
          ? b.shortName
          : `${a.shortName} and ${b.shortName} are in the same sensor band`
      : primaryCamera(a).sensorRank > primaryCamera(b).sensorRank
        ? a.shortName
        : b.shortName;
  return `${better} on paper. ${a.shortName} is ${primaryCamera(a).sensor} with ${SENSING_LABEL[a.sensing]}; ${b.shortName} is ${primaryCamera(b).sensor} with ${SENSING_LABEL[b.sensing]}. Nightscape still needs texture and a minimum lux — it is not night vision.`;
}

function travel(a: Drone, b: Drone): string {
  const lighter = a.weightG <= b.weightG ? a : b;
  const other = lighter === a ? b : a;
  return `${lighter.shortName} if the constraint is a bag and UK class (${lighter.ukClass}, ${trimNum(lighter.weightG)} g). ${other.shortName} if you will accept ${other.ukClass} and ${trimNum(other.weightG)} g for ${hasOpticalTele(other) ? "the extra camera" : "the bigger airframe"}.`;
}

function buyerLine(d: Drone): string {
  if (d.series === "avata") return "Goggle flying, not a travel stills drone.";
  if (d.series === "neo") return "First flights, palm takeoff, small sensor.";
  if (d.slug === "flip") return "Guarded vlog Mini with a real 1/1.3-inch camera.";
  if (d.sub250 && (d.sensing === "omni" || d.sensing === "omni-nightscape"))
    return "Travel and parks; stay in the Mini class on purpose.";
  if (d.series === "air") return "Dual camera and wind; you accepted C1.";
  if (d.series === "mavic") return "The job pays, or the Hasselblad is the point.";
  return `${d.ukClass}, ${primaryCamera(d).sensor}.`;
}

export function groups(rows: SpecRow[]): { name: string; rows: SpecRow[] }[] {
  const order: string[] = [];
  const map = new Map<string, SpecRow[]>();
  for (const r of rows) {
    if (!map.has(r.group)) {
      map.set(r.group, []);
      order.push(r.group);
    }
    map.get(r.group)!.push(r);
  }
  return order.map((name) => ({ name, rows: map.get(name)! }));
}

export function upgradeCost(
  mine: Drone,
  target: Drone,
): { lines: string; asOf: string } {
  const cash = mine.prices.cexCashGbp;
  const used = target.prices.ebayLowGbp;
  const rrp = target.prices.djiRrpGbp;
  const bits: string[] = [];
  if (cash != null && used != null) {
    bits.push(
      `Sell yours to CeX for cash (${gbp(cash)}), buy ${target.shortName} used around ${gbp(used)} → about ${gbp(Math.max(0, used - cash))}.`,
    );
  } else if (cash != null && rrp != null) {
    bits.push(
      `Sell yours to CeX for cash (${gbp(cash)}), buy ${target.shortName} new at RRP ${gbp(rrp)} → about ${gbp(Math.max(0, rrp - cash))}.`,
    );
  } else if (rrp != null && mine.prices.ebayHighGbp != null) {
    bits.push(
      `If your ${mine.shortName} fetches the top of its eBay band (${gbp(mine.prices.ebayHighGbp)}) against ${target.shortName} RRP ${gbp(rrp)}, the gap is about ${gbp(Math.max(0, rrp - mine.prices.ebayHighGbp))}.`,
    );
  } else {
    bits.push(
      `We do not have a dated CeX cash figure for ${mine.shortName} yet. Use the price board — RRP, eBay band, CeX search — and do the subtraction yourself.`,
    );
  }
  bits.push(`Figures as of ${target.prices.asOf}; they move.`);
  return { lines: bits.join(" "), asOf: target.prices.asOf };
}
