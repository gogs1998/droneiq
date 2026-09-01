import type { Source } from "./types";

export type GearKind = "rc" | "motion" | "goggles" | "battery" | "nd";

export type Gear = {
  slug: string;
  kind: GearKind;
  name: string;
  shortName: string;
  released: string;
  discontinued: boolean;
  sortOrder: number;
  form: string;
  transmission: string;
  screen: string;
  flies: string[];
  note: string;
  protocolNote: string;
  djiUrl: string;
  djiRrpGbp: number | null;
  amazonUrl: string;
  sources: Source[];
};

const A = "2026-09-01";

function src(field: string, label: string, url: string): Source {
  return { field, label, url, accessed: A };
}

/**
 * Controllers, motion, goggles, batteries, ND.
 * `flies` is the compatibility list for the catalog airframes — the fact
 * that decides a used RC more often than the millimetres of the clamp.
 * Do not invent EANs. RRP is null unless we have a dated standalone SKU.
 */
export const gear: Gear[] = [
  {
    slug: "rc-n1",
    kind: "rc",
    name: "DJI RC-N1",
    shortName: "RC-N1",
    released: "2021-08-05",
    discontinued: false,
    sortOrder: 10,
    form: "Phone clamp",
    transmission: "O2 / O3",
    screen: "None — your phone",
    flies: ["mini-4k", "mini-3", "mini-3-pro"],
    note: "Mini 3 family phone clamp. Does not fly Mini 4 Pro, Mini 5 Pro, Flip or Air.",
    protocolNote: "O2/O3. A beautiful RC-N1 does not become an RC-N2.",
    djiUrl: "https://store.dji.com/uk",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+RC-N1",
    sources: [
      src("compat", "DJI Mini 3 Pro / Mini 4K controller notes", "https://www.dji.com/uk/mini-3-pro"),
    ],
  },
  {
    slug: "rc-n2",
    kind: "rc",
    name: "DJI RC-N2",
    shortName: "RC-N2",
    released: "2023-09-25",
    discontinued: false,
    sortOrder: 20,
    form: "Phone clamp",
    transmission: "O4",
    screen: "None — your phone",
    flies: ["mini-4-pro", "air-3"],
    note: "O4 phone clamp for Mini 4 Pro and Air 3. Not RC-N1, not RC-N3, not a Mini 5 Pro stick.",
    protocolNote: "O4. Firmware on the RC has to list the aircraft.",
    djiUrl: "https://store.dji.com/uk",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+RC-N2",
    sources: [
      src("compat", "DJI Mini 4 Pro / Air 3 controller notes", "https://www.dji.com/uk/mini-4-pro"),
    ],
  },
  {
    slug: "rc-n3",
    kind: "rc",
    name: "DJI RC-N3",
    shortName: "RC-N3",
    released: "2025-01-03",
    discontinued: false,
    sortOrder: 30,
    form: "Phone clamp",
    transmission: "O4",
    screen: "None — your phone",
    flies: ["neo", "neo-2", "flip", "mini-5-pro", "air-3s"],
    note: "Current O4 phone clamp. Neo can also fly from the phone with no RC. Does not replace RC-N2 on a Mini 4 Pro.",
    protocolNote: "O4. Protocol still has to match the airframe — N3 is not a universal O4 stick.",
    djiUrl: "https://store.dji.com/uk",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+RC-N3",
    sources: [
      src("compat", "DJI Mini 5 Pro / Flip / Air 3S / Neo controller notes", "https://www.dji.com/uk/mini-5-pro"),
    ],
  },
  {
    slug: "rc-2",
    kind: "rc",
    name: "DJI RC 2",
    shortName: "RC 2",
    released: "2023-09-25",
    discontinued: false,
    sortOrder: 40,
    form: "Built-in screen",
    transmission: "O4+",
    screen: "5.5-inch 1080p",
    flies: ["flip", "mini-4-pro", "mini-5-pro", "air-3", "air-3s", "mavic-4-pro"],
    note: "Screen controller across O4 Minis, Air 3/3S and Mavic 4 Pro. Firmware on the RC must support the aircraft. Not the Mavic 3 RC.",
    protocolNote: "O4+. A used RC 2 from a Mini 4 Pro kit still needs a firmware check before a Mini 5 Pro.",
    djiUrl: "https://store.dji.com/uk",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+RC+2+controller",
    sources: [
      src("compat", "DJI RC 2 product notes", "https://www.dji.com/uk/mini-4-pro"),
      src("screen", "DJI RC 2 5.5-inch display", "https://www.dji.com/uk/mini-4-pro"),
    ],
  },
  {
    slug: "rc-mavic-3",
    kind: "rc",
    name: "DJI RC / RC Pro (O3+)",
    shortName: "RC / RC Pro",
    released: "2021-11-09",
    discontinued: true,
    sortOrder: 50,
    form: "Built-in screen",
    transmission: "O3+",
    screen: "5.5-inch (RC) / 5.5-inch high-bright (RC Pro)",
    flies: ["air-3", "mavic-3-classic", "mavic-3-pro"],
    note: "Mavic 3-era screen controllers. Air 3 can use them. Not RC 2, not a Mini 5 Pro stick.",
    protocolNote: "O3+. Do not buy an RC Pro expecting it to fly a Mavic 4 Pro.",
    djiUrl: "https://store.dji.com/uk",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+RC+Pro+Mavic+3",
    sources: [
      src("compat", "DJI Mavic 3 / Air 3 controller notes", "https://www.dji.com/uk/mavic-3-pro"),
    ],
  },
  {
    slug: "motion-2",
    kind: "motion",
    name: "DJI Motion Controller 2",
    shortName: "Motion 2",
    released: "2022-08-25",
    discontinued: true,
    sortOrder: 60,
    form: "Motion (FPV)",
    transmission: "O3+",
    screen: "None — goggles",
    flies: ["avata"],
    note: "Avata 1 motion. Not Motion 3. Goggles are a separate SKU.",
    protocolNote: "Avata 1 stack. Will not fly Avata 2.",
    djiUrl: "https://www.dji.com/uk/avata",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Motion+Controller+2",
    sources: [
      src("compat", "DJI Avata motion notes", "https://www.dji.com/uk/avata"),
    ],
  },
  {
    slug: "motion-3",
    kind: "motion",
    name: "DJI Motion Controller 3",
    shortName: "Motion 3",
    released: "2024-04-11",
    discontinued: false,
    sortOrder: 70,
    form: "Motion (FPV)",
    transmission: "O4",
    screen: "None — goggles",
    flies: ["neo-2", "avata-2", "avata-360"],
    note: "O4 motion. Needs Goggles 3 or N3. Not a camera-drone RC. Not Motion 2.",
    protocolNote: "Goggles do not cancel Flyer ID or VLOS. Motion is a different sport from RC-N3.",
    djiUrl: "https://www.dji.com/uk/avata-2",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Motion+Controller+3",
    sources: [
      src("compat", "DJI Avata 2 / Neo 2 motion notes", "https://www.dji.com/uk/avata-2"),
    ],
  },
  {
    slug: "fpv-rc-3",
    kind: "rc",
    name: "DJI FPV Remote Controller 3",
    shortName: "FPV RC 3",
    released: "2024-04-11",
    discontinued: false,
    sortOrder: 80,
    form: "FPV sticks",
    transmission: "O4",
    screen: "None — goggles",
    flies: ["avata-2", "avata-360"],
    note: "Stick radio for Avata 2 / 360. Not Motion 3, not RC 2. Goggles still required.",
    protocolNote: "O4 FPV sticks. A camera-drone RC 2 does not replace this.",
    djiUrl: "https://www.dji.com/uk/avata-2",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+FPV+Remote+Controller+3",
    sources: [
      src("compat", "DJI Avata 2 FPV controller notes", "https://www.dji.com/uk/avata-2"),
    ],
  },
  {
    slug: "goggles-2",
    kind: "goggles",
    name: "DJI Goggles 2 / Integra",
    shortName: "Goggles 2",
    released: "2022-08-25",
    discontinued: true,
    sortOrder: 90,
    form: "Headset",
    transmission: "O3+",
    screen: "Micro-OLED (Goggles 2) / Integra no headband",
    flies: ["avata"],
    note: "Avata 1 goggle stack. Pro-View kits were Goggles 2; Fly Smart was FPV Goggles V2. Not Goggles 3.",
    protocolNote: "O3+. Will not fly Avata 2 or Neo 2.",
    djiUrl: "https://www.dji.com/uk/avata",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Goggles+2",
    sources: [
      src("compat", "DJI Avata goggle notes", "https://www.dji.com/uk/avata"),
    ],
  },
  {
    slug: "goggles-3",
    kind: "goggles",
    name: "DJI Goggles 3",
    shortName: "Goggles 3",
    released: "2024-04-11",
    discontinued: false,
    sortOrder: 100,
    form: "Headset",
    transmission: "O4+",
    screen: "Dual Micro-OLED",
    flies: ["neo-2", "avata-2", "avata-360"],
    note: "O4 Micro-OLED headset. Motion 3 or FPV RC 3 is a separate SKU. Not Goggles 2, not N3.",
    protocolNote: "O4+. Goggles do not cancel Flyer ID, Operator ID or VLOS.",
    djiUrl: "https://www.dji.com/uk/avata-2",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Goggles+3",
    sources: [
      src("compat", "DJI Goggles 3 / Avata 2 notes", "https://www.dji.com/uk/avata-2"),
      src("screen", "DJI Goggles 3 Micro-OLED", "https://www.dji.com/uk/avata-2"),
    ],
  },
  {
    slug: "goggles-n3",
    kind: "goggles",
    name: "DJI Goggles N3",
    shortName: "Goggles N3",
    released: "2024-10-15",
    discontinued: false,
    sortOrder: 110,
    form: "Headset",
    transmission: "O4",
    screen: "LCD",
    flies: ["neo-2", "avata-2"],
    note: "Cheaper O4 LCD goggles. Fine for Avata 2 and Neo 2. Avata 360 is filed with Goggles 3 — confirm the kit.",
    protocolNote: "O4 LCD, not Micro-OLED. Motion 3 is still a separate SKU.",
    djiUrl: "https://www.dji.com/uk/avata-2",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Goggles+N3",
    sources: [
      src("compat", "DJI Goggles N3 notes", "https://www.dji.com/uk/products/camera-drones"),
    ],
  },
  {
    slug: "batt-neo",
    kind: "battery",
    name: "Neo Intelligent Flight Battery",
    shortName: "Neo pack",
    released: "2024-09-05",
    discontinued: false,
    sortOrder: 200,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["neo"],
    note: "Neo only. Not the Neo 2 pack.",
    protocolNote: "Families do not cross. A Neo pack will not seat in Neo 2.",
    djiUrl: "https://www.dji.com/uk/neo",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Neo+battery",
    sources: [src("compat", "DJI Neo battery notes", "https://www.dji.com/uk/neo")],
  },
  {
    slug: "batt-neo-2",
    kind: "battery",
    name: "Neo 2 Intelligent Flight Battery",
    shortName: "Neo 2 pack",
    released: "2025-10-01",
    discontinued: false,
    sortOrder: 210,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["neo-2"],
    note: "Neo 2 only.",
    protocolNote: "Not the original Neo pack.",
    djiUrl: "https://www.dji.com/uk/neo-2",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Neo+2+battery",
    sources: [src("compat", "DJI Neo 2 battery notes", "https://www.dji.com/uk/neo-2")],
  },
  {
    slug: "batt-flip",
    kind: "battery",
    name: "Flip Intelligent Flight Battery",
    shortName: "Flip pack",
    released: "2025-01-15",
    discontinued: false,
    sortOrder: 220,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["flip"],
    note: "Flip only.",
    protocolNote: "Not a Mini 3 / Mini 4 Pro pack.",
    djiUrl: "https://www.dji.com/uk/flip",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Flip+battery",
    sources: [src("compat", "DJI Flip battery notes", "https://www.dji.com/uk/flip")],
  },
  {
    slug: "batt-mini-3",
    kind: "battery",
    name: "Mini 3 series Intelligent Flight Battery",
    shortName: "Mini 3 pack",
    released: "2022-05-10",
    discontinued: false,
    sortOrder: 230,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["mini-3", "mini-3-pro"],
    note: "Mini 3 and Mini 3 Pro share the same standard pack. Plus packs are not sold for EU/UK on later Minis.",
    protocolNote: "Not Mini 4K, Mini 4 Pro or Mini 5 Pro.",
    djiUrl: "https://www.dji.com/uk/mini-3-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mini+3+Pro+battery",
    sources: [src("compat", "DJI Mini 3 / Mini 3 Pro battery notes", "https://www.dji.com/uk/mini-3-pro")],
  },
  {
    slug: "batt-mini-4k",
    kind: "battery",
    name: "Mini 2 / Mini 4K Intelligent Flight Battery",
    shortName: "Mini 4K pack",
    released: "2023-11-01",
    discontinued: false,
    sortOrder: 240,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["mini-4k"],
    note: "Mini 4K / Mini 2 SE family.",
    protocolNote: "Not Mini 3, Mini 4 Pro or Mini 5 Pro.",
    djiUrl: "https://www.dji.com/uk/mini-4k",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mini+4K+battery",
    sources: [src("compat", "DJI Mini 4K battery notes", "https://www.dji.com/uk/mini-4k")],
  },
  {
    slug: "batt-mini-4-pro",
    kind: "battery",
    name: "Mini 4 Pro Intelligent Flight Battery",
    shortName: "Mini 4 Pro pack",
    released: "2023-09-25",
    discontinued: false,
    sortOrder: 250,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["mini-4-pro"],
    note: "Does not fit Mini 5 Pro.",
    protocolNote: "A Mini 4 Pro pack will not seat in Mini 5 Pro.",
    djiUrl: "https://www.dji.com/uk/mini-4-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mini+4+Pro+battery",
    sources: [src("compat", "DJI Mini 4 Pro battery notes", "https://www.dji.com/uk/mini-4-pro")],
  },
  {
    slug: "batt-mini-5-pro",
    kind: "battery",
    name: "Mini 5 Pro Intelligent Flight Battery",
    shortName: "Mini 5 Pro pack",
    released: "2025-09-17",
    discontinued: false,
    sortOrder: 260,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["mini-5-pro"],
    note: "Plus pack exists; fitting it can leave C0.",
    protocolNote: "Not Mini 4 Pro. Weigh the airframe with the pack you actually fly.",
    djiUrl: "https://www.dji.com/uk/mini-5-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mini+5+Pro+battery",
    sources: [src("compat", "DJI Mini 5 Pro battery notes", "https://www.dji.com/uk/mini-5-pro")],
  },
  {
    slug: "batt-air-3",
    kind: "battery",
    name: "Air 3 series Intelligent Flight Battery",
    shortName: "Air 3 pack",
    released: "2023-07-27",
    discontinued: false,
    sortOrder: 270,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["air-3", "air-3s"],
    note: "Air 3 and Air 3S share the charging hub; confirm pack label before mixing.",
    protocolNote: "Confirm the pack label. Not a Mini or Mavic pack.",
    djiUrl: "https://www.dji.com/uk/air-3s",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Air+3+battery",
    sources: [src("compat", "DJI Air 3 / Air 3S battery notes", "https://www.dji.com/uk/air-3s")],
  },
  {
    slug: "batt-mavic-3",
    kind: "battery",
    name: "Mavic 3 series Intelligent Flight Battery",
    shortName: "Mavic 3 pack",
    released: "2022-11-02",
    discontinued: false,
    sortOrder: 280,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["mavic-3-classic", "mavic-3-pro"],
    note: "Classic and Pro share the Mavic 3 pack. Not Mavic 4 Pro.",
    protocolNote: "Mavic 4 Pro packs will not seat.",
    djiUrl: "https://www.dji.com/uk/mavic-3-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mavic+3+battery",
    sources: [src("compat", "DJI Mavic 3 battery notes", "https://www.dji.com/uk/mavic-3-pro")],
  },
  {
    slug: "batt-mavic-4-pro",
    kind: "battery",
    name: "Mavic 4 Pro Intelligent Flight Battery",
    shortName: "Mavic 4 Pro pack",
    released: "2025-05-01",
    discontinued: false,
    sortOrder: 290,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["mavic-4-pro"],
    note: "New chemistry and shape. Mavic 3 packs will not seat.",
    protocolNote: "Not the Mavic 3 family pack.",
    djiUrl: "https://www.dji.com/uk/mavic-4-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mavic+4+Pro+battery",
    sources: [src("compat", "DJI Mavic 4 Pro battery notes", "https://www.dji.com/uk/mavic-4-pro")],
  },
  {
    slug: "batt-avata",
    kind: "battery",
    name: "Avata Intelligent Flight Battery",
    shortName: "Avata pack",
    released: "2022-08-11",
    discontinued: true,
    sortOrder: 300,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["avata"],
    note: "Avata 1 only.",
    protocolNote: "Not Avata 2 / Avata 360.",
    djiUrl: "https://www.dji.com/uk/avata",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Avata+battery",
    sources: [src("compat", "DJI Avata battery notes", "https://www.dji.com/uk/avata")],
  },
  {
    slug: "batt-avata-2",
    kind: "battery",
    name: "Avata 2 Intelligent Flight Battery",
    shortName: "Avata 2 pack",
    released: "2024-04-11",
    discontinued: false,
    sortOrder: 310,
    form: "Intelligent Flight Battery",
    transmission: "—",
    screen: "—",
    flies: ["avata-2", "avata-360"],
    note: "Avata 2 family. Confirm Avata 360 pack labelling before mixing.",
    protocolNote: "Not the original Avata pack.",
    djiUrl: "https://www.dji.com/uk/avata-2",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Avata+2+battery",
    sources: [src("compat", "DJI Avata 2 battery notes", "https://www.dji.com/uk/avata-2")],
  },
  {
    slug: "nd-mini-4-pro",
    kind: "nd",
    name: "Mini 4 Pro ND set",
    shortName: "Mini 4 Pro ND",
    released: "2023-09-25",
    discontinued: false,
    sortOrder: 400,
    form: "ND filter set",
    transmission: "—",
    screen: "—",
    flies: ["mini-4-pro"],
    note: "Thread/clip is Mini 4 Pro specific.",
    protocolNote: "Mini 4 Pro filters will not fit Mini 5 Pro’s 1-inch front.",
    djiUrl: "https://www.dji.com/uk/mini-4-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mini+4+Pro+ND",
    sources: [src("compat", "DJI Mini 4 Pro ND notes", "https://www.dji.com/uk/mini-4-pro")],
  },
  {
    slug: "nd-mini-5-pro",
    kind: "nd",
    name: "Mini 5 Pro ND set",
    shortName: "Mini 5 Pro ND",
    released: "2025-09-17",
    discontinued: false,
    sortOrder: 410,
    form: "ND filter set",
    transmission: "—",
    screen: "—",
    flies: ["mini-5-pro"],
    note: "Larger 1-inch front. Mini 4 Pro filters will not fit.",
    protocolNote: "Not Mini 4 Pro glass.",
    djiUrl: "https://www.dji.com/uk/mini-5-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mini+5+Pro+ND",
    sources: [src("compat", "DJI Mini 5 Pro ND notes", "https://www.dji.com/uk/mini-5-pro")],
  },
  {
    slug: "nd-air-3",
    kind: "nd",
    name: "Air 3 / Air 3S ND set",
    shortName: "Air 3 ND",
    released: "2023-07-27",
    discontinued: false,
    sortOrder: 420,
    form: "ND filter set",
    transmission: "—",
    screen: "—",
    flies: ["air-3", "air-3s"],
    note: "Wide and tele each need coverage. Check Air 3S wide-angle adapter clearance.",
    protocolNote: "Not Mini or Mavic 4 Pro glass.",
    djiUrl: "https://www.dji.com/uk/air-3s",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Air+3S+ND",
    sources: [src("compat", "DJI Air 3 / Air 3S ND notes", "https://www.dji.com/uk/air-3s")],
  },
  {
    slug: "nd-mavic-4",
    kind: "nd",
    name: "Mavic 4 Pro ND set",
    shortName: "Mavic 4 Pro ND",
    released: "2025-05-01",
    discontinued: false,
    sortOrder: 430,
    form: "ND filter set",
    transmission: "—",
    screen: "—",
    flies: ["mavic-4-pro"],
    note: "Triple-camera filter kit. Mavic 3 filters will not cover the new Hasselblad.",
    protocolNote: "Not Mavic 3 glass.",
    djiUrl: "https://www.dji.com/uk/mavic-4-pro",
    djiRrpGbp: null,
    amazonUrl: "https://www.amazon.co.uk/s?k=DJI+Mavic+4+Pro+ND",
    sources: [src("compat", "DJI Mavic 4 Pro ND notes", "https://www.dji.com/uk/mavic-4-pro")],
  },
];

/** Radio gear that people actually compare: sticks, motion, goggles. */
export const RADIO_KINDS: GearKind[] = ["rc", "motion", "goggles"];

/** Controllers (incl. motion) compare with each other; headsets with headsets. */
export type GearCompareGroup = "controllers" | "headsets";

export function compareGroup(kind: GearKind): GearCompareGroup | null {
  if (kind === "rc" || kind === "motion") return "controllers";
  if (kind === "goggles") return "headsets";
  return null;
}

export function comparable(a: Gear, b: Gear): boolean {
  const g = compareGroup(a.kind);
  return g != null && g === compareGroup(b.kind);
}

export type GearFilter = "radio" | "controllers" | "headsets" | "batteries" | "nd";

export function parseGearFilter(raw?: string): GearFilter {
  if (raw === "controllers" || raw === "headsets" || raw === "batteries" || raw === "nd") {
    return raw;
  }
  return "radio";
}

export function kindsForFilter(filter: GearFilter): GearKind[] {
  if (filter === "radio") return RADIO_KINDS;
  if (filter === "controllers") return ["rc", "motion"];
  if (filter === "headsets") return ["goggles"];
  if (filter === "batteries") return ["battery"];
  return ["nd"];
}

export function gearForFilter(filter: GearFilter): Gear[] {
  const kinds = new Set(kindsForFilter(filter));
  return gear.filter((g) => kinds.has(g.kind)).sort((a, b) => a.sortOrder - b.sortOrder);
}

const bySlug = new Map(gear.map((g) => [g.slug, g]));

export function getGear(slug: string): Gear | undefined {
  return bySlug.get(slug);
}

export function gearOfKind(kind: GearKind): Gear[] {
  return gear.filter((g) => g.kind === kind).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function gearForDrone(droneSlug: string, kind?: GearKind): Gear[] {
  return gear.filter(
    (g) => g.flies.includes(droneSlug) && (kind ? g.kind === kind : true),
  );
}

export function relatedGear(item: Gear, n = 4): Gear[] {
  const group = compareGroup(item.kind);
  return gear
    .filter((g) => {
      if (g.slug === item.slug) return false;
      if (group) return compareGroup(g.kind) === group;
      return g.kind === item.kind;
    })
    .sort((a, b) => Math.abs(a.sortOrder - item.sortOrder) - Math.abs(b.sortOrder - item.sortOrder))
    .slice(0, n);
}

export function comparablePairs(): [Gear, Gear][] {
  const out: [Gear, Gear][] = [];
  const groups: GearCompareGroup[] = ["controllers", "headsets"];
  for (const group of groups) {
    const list = gear
      .filter((g) => compareGroup(g.kind) === group)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        out.push([list[i], list[j]]);
      }
    }
  }
  return out;
}

export const sameKindPairs = comparablePairs;

export function canonicalGearOrder(a: Gear, b: Gear): [Gear, Gear] {
  return a.sortOrder <= b.sortOrder ? [a, b] : [b, a];
}

export function gearPairSlug(a: Gear, b: Gear): string {
  const [x, y] = canonicalGearOrder(a, b);
  return `${x.slug}-vs-${y.slug}`;
}

export function parseGearPair(param: string): [Gear, Gear] | null {
  const parts = param.split("-vs-");
  if (parts.length !== 2) return null;
  const a = getGear(parts[0]);
  const b = getGear(parts[1]);
  if (!a || !b || a.slug === b.slug || !comparable(a, b)) return null;
  return [a, b];
}

export const KIND_LABEL: Record<GearKind, string> = {
  rc: "Controllers",
  motion: "Motion",
  goggles: "Headsets",
  battery: "Batteries",
  nd: "ND filters",
};

export const FILTER_LABEL: Record<GearFilter, string> = {
  radio: "All radio",
  controllers: "Controllers",
  headsets: "Headsets",
  batteries: "Batteries",
  nd: "ND filters",
};

export const FEATURED_GEAR_PAIRS: [string, string][] = [
  ["rc-n2", "rc-n3"],
  ["rc-n3", "rc-2"],
  ["goggles-3", "goggles-n3"],
  ["motion-3", "fpv-rc-3"],
];
