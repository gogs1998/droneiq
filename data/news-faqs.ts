import type { FaqItem } from "@/lib/compare";

/**
 * Visible FAQ for evergreen law pieces. Each answer is a restatement of
 * sentences already in that article. No FAQ here means no FAQ schema.
 */
export const newsFaqs: Record<string, FaqItem[]> = {
  "caa-class-mark-watchdog": [
    {
      q: "Did the CAA name a manufacturer?",
      a: "No. The May notice said the Market Surveillance Authority had received reports of suspected class-mark non-compliance on Open-category drones. It named no brand, model or batch.",
    },
    {
      q: "What is the class-mark form for?",
      a: "Systemic product problems: a missing or wrong class label, or a fault that looks inherent to a model on the market. A neighbour flying too close is a different complaint.",
    },
    {
      q: "Does a night light invalidate the class mark?",
      a: "No. Open-category night flight requires a green flashing light. Fitting or retrofitting that light to CAA guidance does not invalidate the class mark, the May note said.",
    },
  ],
  "remote-id-eight-months": [
    {
      q: "Which drones in this catalog must broadcast Remote ID now?",
      a: "Direct Remote ID has been required since 1 January 2026 on UK1, UK2 and UK3. In this catalog that is C1 Air and Avata 2, and C2 Mavic, treated as the matching UK class through 31 December 2027.",
    },
    {
      q: "When do C0 Minis, Neo and Flip need Remote ID?",
      a: "UK0 camera drones of 100 grams or more, including Mini, Neo and Flip, must broadcast from 1 January 2028. Legacy unmarked camera drones in that weight band sit on the same date. The CAA recommends switching it on earlier. That is not the 2026 legal duty.",
    },
    {
      q: "Is Mini 5 Pro in the 2026 Remote ID duty?",
      a: "A Mini 5 Pro on a C0 pack is not. A Mini 5 Pro Fly More Combo Plus that DJI marks C1 is.",
    },
  ],
  "two-heights-of-120m": [
    {
      q: "What height must a C0 drone cap?",
      a: "Class C0 must limit maximum attainable height to 120 metres above the takeoff point. That is retained EU 2019/945 Annex Part 1.",
    },
    {
      q: "What does the Drone Code measure instead?",
      a: "Open-category height is 120 metres above the surface. If the ground rises, that legal ceiling rises with it. DJI’s max takeoff altitude figure is a mountain limit, not the Open-category rule.",
    },
    {
      q: "Do Air 3S and Mavic 4 Pro use the takeoff cap?",
      a: "No. Air 3S is C1 and Mavic 4 Pro is C2. Both still have to stay 120 metres from the surface in the Open category. They are not C0 products.",
    },
  ],
  "flyer-id-100g": [
    {
      q: "Who needs a Flyer ID?",
      a: "Anyone flying a drone of 100 grams or more. The Flyer ID is the CAA theory test. It allows Open-category Over People and Far from People. Near People still needs the A2 Certificate of Competence.",
    },
    {
      q: "Who needs an Operator ID?",
      a: "An aircraft of 250 grams or more, or of 100 grams or more with a camera. The operator must be 18 or over. Every camera drone on this bench is 100 grams or more, so each needs both IDs.",
    },
    {
      q: "What about aircraft under 100 grams?",
      a: "They do not need either ID. The CAA still recommends the Flyer ID test. The Drone Code still applies. This catalog has no sub-100-gram camera row.",
    },
  ],
  "unmarked-a1-a3": [
    {
      q: "Where may an unmarked Mini under 250 grams fly?",
      a: "Over People (A1). Mini 2 is 242 grams and unmarked. Mini SE is in the same band. The missing sticker does not push them into A3.",
    },
    {
      q: "Where does an unmarked Air 2S fly without A2 CofC?",
      a: "Far from People (A3). Air 2S is 595 grams and unmarked. Without an A2 Certificate of Competence that is 50 metres from uninvolved people and 150 metres from residential, recreational, commercial or industrial areas.",
    },
    {
      q: "What if a later batch carries a class sticker?",
      a: "Use the class-mark table instead of the legacy weight table. Weigh the airframe.",
    },
  ],
  "a2-near-people": [
    {
      q: "When is the A2 Certificate of Competence required?",
      a: "To fly in Near People (A2). A Flyer ID is the entry condition. The certificate is valid for five years.",
    },
    {
      q: "How close may a C2 Mavic fly with A2?",
      a: "A UK2 or C2 aircraft, including Mavic 4 Pro, must stay 30 metres from uninvolved people, or 5 metres in low-speed mode, and must not fly over them. An unmarked aircraft under 2 kilograms in A2 stays 50 metres out.",
    },
    {
      q: "What does Flyer ID allow without A2?",
      a: "Over People and Far from People. C0 Minis and, through 31 December 2027, C1 Air 3S can fly Over People without A2. Mavic 4 Pro cannot. Without A2 it flies Far from People.",
    },
  ],
  "eu-c-class-until-2028": [
    {
      q: "How long do EU C marks count as UK class?",
      a: "Through 31 December 2027. A C0 drone is treated as UK0, C1 as UK1 and C2 as UK2 for that window.",
    },
    {
      q: "What must a new model on the UK market carry?",
      a: "From 1 January 2026, a UK class mark from UK0 to UK6. Aircraft bought before that date are unlikely to have a UK mark. They still fly on the C mark or, if unmarked, on the weight table.",
    },
    {
      q: "What changes on 1 January 2028?",
      a: "A C-class aircraft is treated as a legacy machine. The remote pilot then uses the weight table.",
    },
  ],
};
