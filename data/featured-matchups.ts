export type FeaturedQuestion = { q: string; a: string };

export type FeaturedMatchup = {
  a: string;
  b: string;
  questions: FeaturedQuestion[];
};

export const featuredPairs: [string, string][] = [
  ["mini-4-pro", "mini-5-pro"],
  ["mini-5-pro", "air-3s"],
  ["air-3s", "mavic-4-pro"],
  ["mini-4k", "mini-4-pro"],
  ["air-3", "air-3s"],
  ["neo-2", "flip"],
  ["mini-5-pro", "mavic-4-pro"],
  ["avata-2", "mini-5-pro"],
];

export const featuredMatchups: FeaturedMatchup[] = [
  {
    a: "mini-4-pro",
    b: "mini-5-pro",
    questions: [
      {
        q: "Is the Mini 5 Pro still a 250 g drone?",
        a: "DJI publishes 249.9 g ± 4 g. The Fly More Combo is C0; Fly More Combo Plus is C1. Fitting the Plus battery on a C0 airframe exceeds the C0/UK0 MTOM. If staying in the sub-250 class is why you own a Mini 4 Pro, weigh the Mini 5 Pro you are actually offered, with the battery you will fly, before you buy.",
      },
      {
        q: "Will I notice the 1-inch sensor over the Mini 4 Pro’s 1/1.3-inch?",
        a: "In noon sun, often not on a phone screen. In evening light, interiors, and anything you grade, yes — that is the point of the Mini 5 Pro. 4K/120 and 225° gimbal tilt are the other two things you would actually use. Advertised O4 vs O4+ range is not; both are CE ~10 km and you fly VLOS.",
      },
    ],
  },
  {
    a: "mini-5-pro",
    b: "air-3s",
    questions: [
      {
        q: "Is this a camera upgrade or a legal upgrade?",
        a: "The main sensors are in the same 1-inch conversation. Air 3S adds a 70 mm optical camera, more mass in wind, and C1 class (A1 until 31 Dec 2027, then the C1 distances). Mini 5 Pro keeps the travel/C0 option if you stay on the standard battery. Both need a Flyer ID and Operator ID — the 100 g camera line, not 250 g. Gadget Scout’s line is the honest one: complementary, not rivals, unless you only have money for one.",
      },
    ],
  },
  {
    a: "air-3s",
    b: "mavic-4-pro",
    questions: [
      {
        q: "Does Mavic 4 Pro replace Air 3S for travel?",
        a: "No. Mavic 4 Pro is a 1063 g C2-class flagship with a 4/3 Hasselblad, 168 mm tele and a 51-minute battery. Air 3S is the bag drone with two cameras. If the job invoices 6K Hasselblad stills, buy the Mavic. If the job is a coastal walk and a 70 mm portrait, Air 3S already did it.",
      },
    ],
  },
  {
    a: "mini-4k",
    b: "mini-4-pro",
    questions: [
      {
        q: "Is ‘4K’ the same on both?",
        a: "No. Mini 4K is 4K/30 from a 1/2.3-inch sensor with downward sensing and O2. Mini 4 Pro is 4K/60 HDR from 1/1.3-inch, omnidirectional sensing and O4. You are buying a different aircraft that happens to share a weight class.",
      },
    ],
  },
  {
    a: "air-3",
    b: "air-3s",
    questions: [
      {
        q: "Is Air 3S worth it if I already have Air 3?",
        a: "You would notice the 1-inch wide (Air 3 is 1/1.3 on both cameras) and nightscape sensing. You would not notice another 70 mm — you already have one. Batteries and the charging hub are in the same family; confirm the pack label. If your Air 3 work is daylight telephoto, sit tight unless dusk is the job.",
      },
    ],
  },
  {
    a: "neo-2",
    b: "flip",
    questions: [
      {
        q: "Which is the actual first camera drone?",
        a: "Neo 2 is palm, gesture, tracking, a small sensor. Flip is a guarded 1/1.3-inch 4K/60 Mini that still weighs under 249 g. If the picture matters, Flip. If you want something that takes off from a hand and might live in a rucksack pocket, Neo 2.",
      },
    ],
  },
  {
    a: "mini-5-pro",
    b: "mavic-4-pro",
    questions: [
      {
        q: "Can a Mini replace a Mavic 4 Pro?",
        a: "Not on a spec table. Mavic 4 Pro has three cameras including 168 mm, a 4/3 Hasselblad, 6K, and a kilogram of airframe. Mini 5 Pro has one 1-inch camera and C0 paperwork. People still ask because the Mini is now good enough that the Mavic has to justify the bag, the class, and the invoice.",
      },
    ],
  },
  {
    a: "avata-2",
    b: "mini-5-pro",
    questions: [
      {
        q: "Is Avata 2 an alternative to Mini 5 Pro?",
        a: "Only if you want goggles and a 155° FPV picture. Mini 5 Pro is a stabilised camera on a gimbal you fly in third person. Avata 2 is a different sport: tighter, wider, shorter flights, C1, no omni. Both need Flyer ID and Operator ID. Buy both if you have two hobbies. Do not buy one expecting the other.",
      },
    ],
  },
];

export function featuredFor(a: string, b: string): FeaturedQuestion[] {
  const hit = featuredMatchups.find(
    (m) => (m.a === a && m.b === b) || (m.a === b && m.b === a),
  );
  return hit?.questions ?? [];
}

export function isFeaturedPair(a: string, b: string): boolean {
  return featuredFor(a, b).length > 0;
}
