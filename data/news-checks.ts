/** Pre-publication claim log. Not rendered. Ratings follow fact-check-workflow. */

export type CheckRating = "true" | "mostly-true" | "unverifiable";

export type NewsCheck = {
  slug: string;
  claim: string;
  rating: CheckRating;
  evidence: string;
  accessed: string;
};

const A = "2026-09-01";

export const NEWS_CHECKS: NewsCheck[] = [
  {
    slug: "ifa-2026-berlin",
    claim: "DJI will exhibit at IFA Berlin Sept. 4-8, 2026, Hall 20-129, 10 a.m. to 6 p.m.",
    rating: "true",
    evidence:
      "https://www.dji.com/media-center/announcements/ifa-2026-dji-berlin-osmo-360-2-romo-2-power-system",
    accessed: A,
  },
  {
    slug: "ifa-2026-berlin",
    claim: "European debuts are Osmo 360 II, ROMO 2 and Power; no new Mini/Air/Mavic named.",
    rating: "true",
    evidence:
      "https://www.dji.com/media-center/announcements/ifa-2026-dji-berlin-osmo-360-2-romo-2-power-system",
    accessed: A,
  },
  {
    slug: "ifa-2026-berlin",
    claim: "Lito launched April 23, 2026; X1 1/1.3-inch 48 MP; Lito 1 1/2-inch 48 MP; 36 minutes claimed.",
    rating: "true",
    evidence:
      "https://www.prnewswire.com/news-releases/dji-launches-beginner-friendly-camera-drone-series-with-lito-x1-and-lito-1-302750047.html",
    accessed: A,
  },
  {
    slug: "ifa-2026-berlin",
    claim: "UK store Lito X1 from £369; standard combos C0/UK0; Plus combo C1/UK1.",
    rating: "true",
    evidence: "https://store.dji.com/uk/product/dji-lito-x1",
    accessed: A,
  },
  {
    slug: "caa-class-mark-watchdog",
    claim: "CAA MSA received reports of suspected UK class-mark non-compliance; no model named.",
    rating: "true",
    evidence: "https://www.caa.co.uk/drones/drone-regulations/news-and-updates/",
    accessed: A,
  },
  {
    slug: "caa-class-mark-watchdog",
    claim: "SI 2025 No. 1328 names the CAA as market surveillance authority.",
    rating: "true",
    evidence: "https://www.legislation.gov.uk/uksi/2025/1328/contents/made",
    accessed: A,
  },
  {
    slug: "caa-class-mark-watchdog",
    claim: "Green flashing light required for Open-category night flight; retrofit does not void class mark.",
    rating: "true",
    evidence: "https://www.caa.co.uk/drones/drone-regulations/news-and-updates/",
    accessed: A,
  },
  {
    slug: "remote-id-eight-months",
    claim: "Direct RID required from Jan. 1, 2026, for UK1, UK2, UK3 (and UK5/UK6); UK0 camera drones from Jan. 1, 2028.",
    rating: "true",
    evidence: "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/remote-id-rid/",
    accessed: A,
  },
  {
    slug: "remote-id-eight-months",
    claim: "Hybrid RID is the CAA preferred long-term design; Direct RID is interim.",
    rating: "true",
    evidence: "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/remote-id-rid/",
    accessed: A,
  },
  {
    slug: "two-heights-of-120m",
    claim: "C0 UAS must have maximum attainable height above takeoff limited to 120 m.",
    rating: "true",
    evidence:
      "https://www.legislation.gov.uk/eur/2019/945/annex/part/1/adopted?view=plain",
    accessed: A,
  },
  {
    slug: "two-heights-of-120m",
    claim: "DJI Fly app currently enforces that cap on UK Minis after GPS lock.",
    rating: "unverifiable",
    evidence:
      "No DJI media-centre note found Sept. 1, 2026. Operator/dealer posts are not treated as a DJI statement.",
    accessed: A,
  },
  {
    slug: "avata-360-8k",
    claim: "DJI launched Avata 360 March 26, 2026, with 8K/60 360 video from 1-inch-equivalent sensors; 23 minutes claimed.",
    rating: "true",
    evidence:
      "https://www.prnewswire.com/news-releases/dji-avata-360-sets-new-standards-for-immersive-360-fpv-flying-302723105.html",
    accessed: A,
  },
  {
    slug: "avata-360-8k",
    claim: "UK launch prices: drone-only £409; RC 2 £639; both Fly More combos £829; shipping April 2026.",
    rating: "true",
    evidence:
      "https://www.prnewswire.com/news-releases/dji-avata-360-sets-new-standards-for-immersive-360-fpv-flying-302723105.html",
    accessed: A,
  },
  {
    slug: "neo-2-151g",
    claim: "Neo 2 launched Nov. 13, 2025, at 151 g with omnidirectional sensing; 12 MP 1/2-inch; 19 minutes claimed.",
    rating: "true",
    evidence:
      "https://www.prnewswire.com/news-releases/dji-launches-neo-2-follow-me-camera-drone-returns-safer-with-more-creative-ways-to-fly-302608557.html",
    accessed: A,
  },
  {
    slug: "neo-2-151g",
    claim: "UK store Neo 2 drone-only from £209 on Sept. 1, 2026.",
    rating: "true",
    evidence: "https://store.dji.com/uk/product/dji-neo-2",
    accessed: A,
  },
  {
    slug: "mini-5-pro-1-inch",
    claim: "Mini 5 Pro launched Sept. 17, 2025, with 50 MP 1-inch sensor; DJI called it first 1-inch Mini as of that date; 36 minutes claimed.",
    rating: "true",
    evidence:
      "https://www.prnewswire.com/news-releases/dji-brings-world-first-to-the-sky-with-mini-5-pro-302557410.html",
    accessed: A,
  },
  {
    slug: "mini-5-pro-1-inch",
    claim: "UK store Mini 5 Pro RC-N3 from £619; standard combos C0; Fly More Combo Plus C1.",
    rating: "true",
    evidence: "https://store.dji.com/uk/product/dji-mini-5-pro",
    accessed: A,
  },
  {
    slug: "mavic-4-pro-infinity-gimbal",
    claim: "Mavic 4 Pro launched May 13, 2025, with 100 MP Hasselblad, 70 mm, 168 mm, 360° Infinity Gimbal; 51 minutes claimed.",
    rating: "true",
    evidence:
      "https://www.prnewswire.com/news-releases/dji-mavic-4-pro-unlocks-shots-from-any-angle-for-aerial-narrators-302453870.html",
    accessed: A,
  },
  {
    slug: "mavic-4-pro-infinity-gimbal",
    claim: "ViewPoints maps Mavic 4 Pro to C2/UK2.",
    rating: "true",
    evidence: "https://viewpoints.dji.com/blog/new-uk-drone-regulations",
    accessed: A,
  },
  {
    slug: "flip-propeller-guards",
    claim: "Flip launched Jan. 14, 2025, under 249 g with foldable full-coverage guards; 1/1.3-inch 48 MP; 31 minutes claimed.",
    rating: "true",
    evidence:
      "https://www.prnewswire.com/news-releases/dji-launches-all-in-one-vlog-camera-drone-with-dji-flip-302350266.html",
    accessed: A,
  },
  {
    slug: "air-3s-dual-camera",
    claim: "Air 3S has 1-inch primary and 70 mm medium tele; 4K/60 HDR; nightscape omnidirectional sensing.",
    rating: "true",
    evidence: "https://www.dji.com/uk/air-3s",
    accessed: A,
  },
  {
    slug: "air-3s-dual-camera",
    claim: "DJI Europe dated the Air 3S launch Oct. 15, 2024.",
    rating: "true",
    evidence:
      "https://www.mynewsdesk.com/uk/dji/pressreleases/dji-enhances-dual-camera-drone-for-unmatched-aerial-travel-photography-3347425",
    accessed: A,
  },
  {
    slug: "flyer-id-100g",
    claim: "Flyer ID required at 100 g or more; Operator ID at 250 g or at 100 g with a camera; under 100 g neither is required.",
    rating: "true",
    evidence:
      "https://www.caa.co.uk/drones/open-category/drone-code/getting-what-you-need-to-fly-legally/",
    accessed: A,
  },
  {
    slug: "unmarked-a1-a3",
    claim: "Unmarked (legacy) under 250 g flies A1; under 2 kg may fly A2 with CofC; otherwise A3 to 25 kg.",
    rating: "true",
    evidence:
      "https://www.caa.co.uk/drones/open-category/getting-started-with-drones-and-model-aircraft/class-marks/",
    accessed: A,
  },
  {
    slug: "a2-near-people",
    claim: "A2 CofC required for Near People; valid five years; Flyer ID entry; 30 m / 5 m for UK2/C2; 50 m for unmarked under 2 kg.",
    rating: "true",
    evidence:
      "https://www.caa.co.uk/drones/open-category/moving-on-to-more-advanced-flying/introduction-to-more-advanced-flying/",
    accessed: A,
  },
  {
    slug: "eu-c-class-until-2028",
    claim: "C-class flies as matching UK class through Dec. 31, 2027; new UK-market models from Jan. 1, 2026, need UK0–UK6; from Jan. 1, 2028, C-class is legacy.",
    rating: "true",
    evidence:
      "https://www.caa.co.uk/drones/open-category/getting-started-with-drones-and-model-aircraft/class-marks/",
    accessed: A,
  },
];
