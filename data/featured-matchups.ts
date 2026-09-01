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
  ["mini-se", "mini-2"],
  ["mini-2", "mini-4k"],
  ["mini-2", "mini-3"],
  ["mini-2", "mini-4-pro"],
  ["mini-3-pro", "mini-4-pro"],
  ["mini-4k", "mini-4-pro"],
  ["mini-4-pro", "air-3"],
  ["mavic-air-2", "air-2s"],
  ["air-2s", "air-3"],
  ["air-2s", "air-3s"],
  ["air-3", "air-3s"],
  ["mavic-2-pro", "air-2s"],
  ["mavic-3", "mavic-3-classic"],
  ["mavic-3", "mavic-3-pro"],
  ["mavic-3-pro", "mavic-4-pro"],
  ["fpv", "avata-2"],
  ["avata", "avata-2"],
  ["neo-2", "flip"],
  ["mini-5-pro", "mavic-4-pro"],
  ["avata-2", "mini-5-pro"],
];

/** First-screen sheets — named matchups, not the whole catalog. */
export const homeSheets: { a: string; b: string; lede: string }[] = [
  {
    a: "mini-2",
    b: "mini-4k",
    lede: "Same 1/2.3-inch 4K/30. Mini 4K is C0; Mini 2 is unmarked A1. The picture is not the fact.",
  },
  {
    a: "mini-4-pro",
    b: "mini-5-pro",
    lede: "1/1.3 against 1-inch, and a battery that can push Mini 5 Pro out of C0. Weigh what you will fly.",
  },
  {
    a: "air-3",
    b: "air-3s",
    lede: "Same 70 mm tele. You would notice the 1-inch wide and nightscape, not another telephoto.",
  },
  {
    a: "air-2s",
    b: "air-3",
    lede: "One 1-inch camera against dual 1/1.3 and a 70 mm. Unmarked A3 against C1.",
  },
  {
    a: "fpv",
    b: "avata-2",
    lede: "Exposed-prop racer against a ducted cinewhoop. Packs, goggles and sticks do not swap.",
  },
  {
    a: "mavic-3-pro",
    b: "mavic-4-pro",
    lede: "Triple camera to triple camera. 4 Pro has to justify the bag, the class, and the invoice.",
  },
];

export function pairKey(a: string, b: string): string {
  return [a, b].sort().join("\0");
}

export const homeSheetKeys = new Set(homeSheets.map((s) => pairKey(s.a, s.b)));

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
    a: "mini-2",
    b: "mini-4k",
    questions: [
      {
        q: "Is Mini 4K just a Mini 2 with a new name?",
        a: "On the camera, almost: both are 1/2.3-inch 12 MP, 4K/30, O2, downward sensing. You would not notice the picture. You would notice the class mark. Mini 4K is C0. Mini 2 is unmarked. Both fly A1 Over People in the UK — Mini 2 on the CAA legacy weight table, Mini 4K as C0. RC-N1 and the Mini 2 / Mini 4K pack fly both. Buy Mini 4K for a new box and a printed C0. Buy Mini 2 if the used price is the point.",
      },
    ],
  },
  {
    a: "mini-2",
    b: "mini-3",
    questions: [
      {
        q: "Is Mini 3 worth it over a cheap Mini 2?",
        a: "Yes if the picture is why you fly: 1/1.3-inch, true vertical, 38 minutes, C0. Mini 2 is the used 4K Mini — 1/2.3, no vertical, downward only, unmarked. Both fly A1 (Mini 2 on the weight table). RC-N1 flies both. Batteries do not: Mini 2 shares the Mini 4K pack, not the Mini 3 pack.",
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
    a: "air-2s",
    b: "air-3",
    questions: [
      {
        q: "Should I buy a used Air 2S instead of Air 3?",
        a: "Air 2S is one 1-inch camera (5.4K/30, 4K/60, D-Log M) at 595 g, O3, front/back/up/down sensing — not omni, not a 70 mm tele. Air 3 is dual 1/1.3 including 70 mm, O4, omni, C1. You would notice the telephoto and the paperwork (unmarked A3 vs C1 A1 until 2027). You would notice the 1-inch wide in evening light more than Air 3’s 1/1.3. Batteries and ND glass are not the same family. RC-N1 flies Air 2S; Air 3 wants RC-N2 or RC 2.",
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
  {
    a: "mini-se",
    b: "mini-2",
    questions: [
      {
        q: "Is Mini SE just a cheaper Mini 2?",
        a: "No. Mini SE is 2.7K/30, JPEG only, Enhanced Wi-Fi (CE ~2 km). Mini 2 is 4K/30, RAW, O2 (CE 6 km). Same folded size, same 17.32 Wh pack, both unmarked sub-250 g A1. The stick is not the same: Mini SE is Wi-Fi, Mini 2 is RC-N1. Buy Mini 2 if you can find one; Mini SE is the 2.7K leftover.",
      },
    ],
  },
  {
    a: "mini-2",
    b: "mini-4-pro",
    questions: [
      {
        q: "Can a used Mini 2 replace Mini 4 Pro?",
        a: "Not on a spec table. Mini 4 Pro is 1/1.3-inch 4K/60 HDR, omni, O4, true vertical, C0. Mini 2 is 1/2.3 4K/30, downward only, O2, unmarked. Both fly A1 under 250 g. You would notice sensing, the chip, and the radio. RC-N1 does not fly Mini 4 Pro. Batteries do not swap.",
      },
    ],
  },
  {
    a: "mini-3-pro",
    b: "mini-4-pro",
    questions: [
      {
        q: "Is Mini 4 Pro worth it if I have Mini 3 Pro?",
        a: "You would notice omni sensing and O4. You would not notice another 1/1.3-inch 4K/60 true-vertical Mini. Mini 3 Pro is tri-directional; Mini 4 Pro is omni. Batteries do not swap. RC-N1 flies Mini 3 Pro; Mini 4 Pro wants RC-N2 or RC 2. If your Mini 3 Pro work is daylight A1 travel, sit tight unless omni is the job.",
      },
    ],
  },
  {
    a: "mini-4-pro",
    b: "air-3",
    questions: [
      {
        q: "Should I leave the Mini class for Air 3?",
        a: "DPReview’s split is still the one people quote: Mini 4 Pro if you want sub-250 g A1 and true vertical; Air 3 if you will actually use a 70 mm optical camera and fly coast or city wind. Air 3 is C1, 720 g, dual 1/1.3. Batteries, ND and RC do not swap (RC-N2 flies both Air 3 and Mini 4 Pro — firmware on the stick has to list the aircraft).",
      },
    ],
  },
  {
    a: "mavic-air-2",
    b: "air-2s",
    questions: [
      {
        q: "Should I skip Air 2 and buy Air 2S used?",
        a: "Heliguy’s launch split is the map: Air 2S added the 1-inch sensor, 5.4K and O3. Air 2 is 1/2-inch 48 MP, 4K/60, O2, 570 g. RC-N1 flies both. Packs do not swap even though one Air 2S pack version prints the same 40.42 Wh. Both unmarked A3. Buy Air 2S if the 1-inch is why you fly; buy Air 2 if the used price is the only number that matters.",
      },
    ],
  },
  {
    a: "air-2s",
    b: "air-3s",
    questions: [
      {
        q: "Should I jump from Air 2S to Air 3S?",
        a: "You would notice the 70 mm tele, omni nightscape, C1 / A1 paperwork until 2027, and O4. You would notice Air 2S’s 1-inch wide in evening light more than Air 3S’s 1-inch plus a second camera in noon sun. Batteries do not swap. RC-N1 flies Air 2S; Air 3S wants RC-N3 or RC 2. If your Air 2S work is one 1-inch camera, Air 3S is the dual-camera bag, not a sensor upgrade.",
      },
    ],
  },
  {
    a: "mavic-2-pro",
    b: "air-2s",
    questions: [
      {
        q: "Is a used Mavic 2 Pro better than Air 2S?",
        a: "Both are 1-inch 20 MP. Mavic 2 Pro is Hasselblad 28 mm f/2.8–f/11, 4K/30, omni, 907 g, GO 4, OcuSync 2. Air 2S is 22 mm f/2.8, 5.4K/30, 4K/60, O3, 595 g, DJI Fly, no side sensors. Heliguy’s 2021 split still holds: Air 2S put the 1-inch in a sub-600 g fold. Packs and RCs do not swap. Both unmarked A3.",
      },
    ],
  },
  {
    a: "mavic-3",
    b: "mavic-3-classic",
    questions: [
      {
        q: "Is Classic just Mavic 3 without the tele?",
        a: "Yes on the wide: same 4/3 Hasselblad 5.1K/50, same 77 Wh pack, same O3+, same C1, 895 g. Original Mavic 3 adds a 1/2-inch 162 mm tele. DPReview called Classic the affordable entry into that Hasselblad. Buy Classic if you will not use 162 mm. Buy original Mavic 3 if the used price for the tele is close. Standard original box was RC-N1; Classic kits mixed RC-N1 and DJI RC.",
      },
    ],
  },
  {
    a: "mavic-3",
    b: "mavic-3-pro",
    questions: [
      {
        q: "Does Mavic 3 Pro replace original Mavic 3?",
        a: "On the wide, no — same 4/3 Hasselblad. Pro adds a 70 mm medium-tele and a 166 mm tele (original is 162 mm only), and is heavier C2-class mass. Same 77 Wh pack. Heliguy’s Pro review is the triple-camera map. If 70 mm is why you would leave a Mini, Pro is the product. If you already own original Mavic 3 and shoot the Hasselblad, sit tight unless 70 mm is the job.",
      },
    ],
  },
  {
    a: "mavic-3-pro",
    b: "mavic-4-pro",
    questions: [
      {
        q: "Should I skip to Mavic 4 Pro from Mavic 3 Pro?",
        a: "You would notice 100 MP 4/3, 6K, 168 mm, 360° gimbal, O4+, 51 minutes, C2 on a new airframe. You would not notice ‘another triple Mavic’ if your Mavic 3 Pro already invoices 70 mm and 166 mm. Packs do not swap. RC Pro (O3+) does not fly Mavic 4 Pro. If the job is already Mavic 3 Pro, 4 Pro has to justify the bag and the invoice.",
      },
    ],
  },
  {
    a: "fpv",
    b: "avata-2",
    questions: [
      {
        q: "Should I buy a used DJI FPV instead of Avata 2?",
        a: "UAV Coach’s original Avata split still holds, and Avata 2 made it wider: DJI FPV is the exposed-prop 795 g O3 racer (S 27 m/s, M 39 m/s, 1/2.3, Goggles V2, A3). Avata 2 is the ducted 377 g C1 cinewhoop (1/1.3, O4, Goggles 3, Easy ACRO). Packs, goggles and sticks do not swap. Buy FPV if speed with no ducts is the sport. Buy Avata 2 if you want the current FPV kit.",
      },
    ],
  },
  {
    a: "avata",
    b: "avata-2",
    questions: [
      {
        q: "Is Avata 2 worth it over original Avata?",
        a: "You would notice Easy ACRO, O4, a 1/1.3 sensor, D-Log M, and Goggles 3. You would not notice another ducted cinewhoop if you already fly Avata 1. Motion 2 / Goggles 2 do not fly Avata 2. Heliguy’s combo piece is still what to read before buying used Avata 1 — Pro-View is Goggles 2; Fly Smart is V2. Versus Avata 360 you would notice that both of these are still a single forward lens.",
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
