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
];
