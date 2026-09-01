export type PartKind = "battery" | "rc" | "nd" | "goggles";

export type Part = {
  id: string;
  kind: PartKind;
  name: string;
  drones: string[];
  note: string;
};

export const parts: Part[] = [
  {
    id: "batt-neo",
    kind: "battery",
    name: "Neo Intelligent Flight Battery",
    drones: ["neo"],
    note: "Neo only. Not the Neo 2 pack.",
  },
  {
    id: "batt-neo-2",
    kind: "battery",
    name: "Neo 2 Intelligent Flight Battery",
    drones: ["neo-2"],
    note: "Neo 2 only.",
  },
  {
    id: "batt-flip",
    kind: "battery",
    name: "Flip Intelligent Flight Battery",
    drones: ["flip"],
    note: "Flip only.",
  },
  {
    id: "batt-mini-3",
    kind: "battery",
    name: "Mini 3 series Intelligent Flight Battery",
    drones: ["mini-3", "mini-3-pro"],
    note: "Mini 3 and Mini 3 Pro share the same standard pack. Plus packs are not sold for EU/UK on later Minis.",
  },
  {
    id: "batt-mini-4k",
    kind: "battery",
    name: "Mini 2 / Mini 4K Intelligent Flight Battery",
    drones: ["mini-4k"],
    note: "Mini 4K / Mini 2 SE family.",
  },
  {
    id: "batt-mini-4-pro",
    kind: "battery",
    name: "Mini 4 Pro Intelligent Flight Battery",
    drones: ["mini-4-pro"],
    note: "Does not fit Mini 5 Pro.",
  },
  {
    id: "batt-mini-5-pro",
    kind: "battery",
    name: "Mini 5 Pro Intelligent Flight Battery",
    drones: ["mini-5-pro"],
    note: "Plus pack exists; fitting it can leave C0.",
  },
  {
    id: "batt-air-3",
    kind: "battery",
    name: "Air 3 series Intelligent Flight Battery",
    drones: ["air-3", "air-3s"],
    note: "Air 3 and Air 3S share the charging hub; confirm pack label before mixing.",
  },
  {
    id: "batt-mavic-3",
    kind: "battery",
    name: "Mavic 3 series Intelligent Flight Battery",
    drones: ["mavic-3-classic", "mavic-3-pro"],
    note: "Classic and Pro share the Mavic 3 pack. Not Mavic 4 Pro.",
  },
  {
    id: "batt-mavic-4-pro",
    kind: "battery",
    name: "Mavic 4 Pro Intelligent Flight Battery",
    drones: ["mavic-4-pro"],
    note: "New chemistry and shape. Mavic 3 packs will not seat.",
  },
  {
    id: "batt-avata",
    kind: "battery",
    name: "Avata Intelligent Flight Battery",
    drones: ["avata"],
    note: "Avata 1 only.",
  },
  {
    id: "batt-avata-2",
    kind: "battery",
    name: "Avata 2 Intelligent Flight Battery",
    drones: ["avata-2", "avata-360"],
    note: "Avata 2 family. Confirm Avata 360 pack labelling before mixing.",
  },
  {
    id: "rc-n1",
    kind: "rc",
    name: "DJI RC-N1 (phone holder)",
    drones: ["mini-3", "mini-3-pro", "mini-4k"],
    note: "Mini 3 family O2/O3 phone clamp. Does not fly a Mini 5 Pro or Flip.",
  },
  {
    id: "rc-n2",
    kind: "rc",
    name: "DJI RC-N2 (phone holder)",
    drones: ["mini-4-pro", "air-3"],
    note: "O4 phone clamp for Mini 4 Pro / Air 3. Not RC-N1, not RC-N3.",
  },
  {
    id: "rc-n3",
    kind: "rc",
    name: "DJI RC-N3 (phone holder)",
    drones: ["mini-5-pro", "flip", "air-3s", "neo-2"],
    note: "Current O4 phone clamp. Protocol still has to match the airframe.",
  },
  {
    id: "rc-2",
    kind: "rc",
    name: "DJI RC 2 (built-in screen)",
    drones: [
      "mini-4-pro",
      "mini-5-pro",
      "flip",
      "air-3",
      "air-3s",
      "mavic-4-pro",
    ],
    note: "Screen controller used across O4 Minis, Air 3S and Mavic 4 Pro. Firmware on the RC must support the aircraft.",
  },
  {
    id: "rc-mavic-3",
    kind: "rc",
    name: "DJI RC / RC Pro (O3+)",
    drones: ["mavic-3-classic", "mavic-3-pro", "air-3"],
    note: "Mavic 3 era screen controllers. Not the RC 2.",
  },
  {
    id: "goggles-avata",
    kind: "goggles",
    name: "DJI Goggles 2 / Integra",
    drones: ["avata"],
    note: "Avata 1 goggle stack.",
  },
  {
    id: "goggles-avata-2",
    kind: "goggles",
    name: "DJI Goggles 3 / N3",
    drones: ["avata-2", "avata-360", "neo-2"],
    note: "O4 goggles. Motion controller is a separate SKU.",
  },
  {
    id: "nd-mini-4-pro",
    kind: "nd",
    name: "Mini 4 Pro ND set",
    drones: ["mini-4-pro"],
    note: "Thread/clip is Mini 4 Pro specific.",
  },
  {
    id: "nd-mini-5-pro",
    kind: "nd",
    name: "Mini 5 Pro ND set",
    drones: ["mini-5-pro"],
    note: "Larger 1-inch front. Mini 4 Pro filters will not fit.",
  },
  {
    id: "nd-air-3",
    kind: "nd",
    name: "Air 3 / Air 3S ND set",
    drones: ["air-3", "air-3s"],
    note: "Wide and tele each need coverage. Check Air 3S wide-angle adapter clearance.",
  },
  {
    id: "nd-mavic-4",
    kind: "nd",
    name: "Mavic 4 Pro ND set",
    drones: ["mavic-4-pro"],
    note: "Triple-camera filter kit. Mavic 3 filters will not cover the new Hasselblad.",
  },
];

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
