export type NewsDesk = "law" | "product";

export type NewsSource = {
  label: string;
  url: string;
  accessed: string;
};

export type NewsBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type NewsArticle = {
  slug: string;
  desk: NewsDesk;
  title: string;
  dek: string;
  published: string;
  /** Lower first when dates tie. */
  sortOrder: number;
  related: string[];
  sources: NewsSource[];
  body: NewsBlock[];
};

const A = "2026-09-01";

function src(label: string, url: string): NewsSource {
  return { label, url, accessed: A };
}

export const DESK_LABEL: Record<NewsDesk, string> = {
  law: "Law",
  product: "Product",
};

export const newsDeskNote = {
  kicker: "News",
  title: "Where the news comes from",
  lede: "DroneIQ reads the Civil Aviation Authority, UK legislation and DJI, then writes its own copy.",
  body: [
    "Primary sources are the desk. Specialist retailers and enthusiast sites are useful for knowing what people are arguing about. They are not a second catalog.",
    "Each article lists the URLs opened and the date they were opened. Spec figures that already live on a comparison sheet stay there.",
    "DroneIQ did not fly the aircraft named in these pieces.",
  ],
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "ifa-2026-berlin",
    desk: "product",
    title: "DJI to show 360 camera and home cleaner at IFA",
    dek: "The Aug. 27 media-centre note lists Lito drones on the Berlin floor. It does not announce a new Mini, Air or Mavic.",
    published: "2026-09-01",
    sortOrder: 1,
    related: ["mini-4k", "mini-4-pro", "neo-2", "flip", "avata-360", "mavic-4-pro", "air-3s", "mini-5-pro"],
    sources: [
      src(
        "DJI Media Centre — IFA 2026 Berlin (Aug. 27, 2026)",
        "https://www.dji.com/media-center/announcements/ifa-2026-dji-berlin-osmo-360-2-romo-2-power-system",
      ),
      src(
        "DJI via PR Newswire — Lito 1 and Lito X1 launch (April 23, 2026)",
        "https://www.prnewswire.com/news-releases/dji-launches-beginner-friendly-camera-drone-series-with-lito-x1-and-lito-1-302750047.html",
      ),
      src("DJI Store UK — Lito X1", "https://store.dji.com/uk/product/dji-lito-x1"),
      src("DJI product page — Lito X1", "https://www.dji.com/lito-x1"),
      src("DJI product page — Lito 1", "https://www.dji.com/lito-1"),
    ],
    body: [
      {
        type: "p",
        text: "DJI will show a 360-degree camera, a robot cleaner and power gear at IFA in Berlin from Sept. 4-8, 2026, the company said Aug. 27.",
      },
      {
        type: "p",
        text: "The European debuts are the Osmo 360 II, which DJI said can record panoramic video at up to 8K/60; ROMO 2 for home cleaning; and a wider Power lineup that includes balcony solar. Hours are 10 a.m. to 6 p.m. at Hall 20-129, Messe Berlin.",
      },
      {
        type: "p",
        text: "The announcement did not name a new Mini, Air or Mavic drone. Camera drones are listed as hands-on exhibits.",
      },
      {
        type: "h2",
        text: "What is on the drone list",
      },
      {
        type: "p",
        text: "DJI named Mavic 4 Pro, Air 3S, Mini 5 Pro, Neo 2, Lito 1, Lito X1, Flip, Avata 360 and Inspire 3. DroneIQ already has sheets for those names except Lito 1, Lito X1 and Inspire 3.",
      },
      {
        type: "h2",
        text: "Lito, launched in April",
      },
      {
        type: "p",
        text: "DJI launched the Lito series April 23. The company said Lito X1 uses a 1/1.3-inch, 48-megapixel sensor and forward LiDAR. Lito 1 uses a 1/2-inch, 48-megapixel sensor. Claimed flight time on the standard pack is 36 minutes. Launch prices were €419 for X1 and €339 for Lito 1.",
      },
      {
        type: "p",
        text: "The UK store listed Lito X1 from £369 on Sept. 1. DJI’s FAQ on that page says the base aircraft and the Fly More combos with RC-N3 or RC 2 are C0/UK0. The Fly More Combo Plus with RC 2 is C1/UK1 because the Plus battery takes the aircraft through 249 grams. C0 combos must not use the Plus pack or propeller guards if the operator wants to stay in that class, DJI said.",
      },
      {
        type: "p",
        text: "The same UK page says training or examination “is not required for flying this product in most countries and regions.” In the UK, a camera drone of 100 grams or more still needs a Flyer ID and an Operator ID. See [[/guides/uk|Flying in the UK]].",
      },
      {
        type: "p",
        text: "Workshops run Sept. 5-6, DJI said: a 30-minute drone session at 11 a.m. and a handheld session at 3 p.m. each day. DroneIQ will not add a Lito row until DJI publishes sourced specs for the catalog.",
      },
    ],
  },
  {
    slug: "caa-class-mark-watchdog",
    desk: "law",
    title: "CAA says it is checking class-mark complaints",
    dek: "A May notice reports suspected Open-category non-compliance. It names no manufacturer. Night flying still needs a green light.",
    published: "2026-09-01",
    sortOrder: 2,
    related: ["mini-5-pro", "air-3s", "mavic-4-pro", "mini-2", "air-2s"],
    sources: [
      src(
        "CAA — News and updates (class-mark non-compliance, May 2026)",
        "https://www.caa.co.uk/drones/drone-regulations/news-and-updates/",
      ),
      src(
        "CAA — UAS class marking",
        "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/uas-class-marking/",
      ),
      src(
        "CAA — Report a product safety issue with a class-marked drone",
        "https://www.caa.co.uk/about-us/make-a-report-or-complaint/report-something/report-a-product-safety-issue-with-a-class-marked-drone/",
      ),
      src(
        "CAA — Market surveillance",
        "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/market-surveillance/",
      ),
      src(
        "The Unmanned Aircraft (Market Surveillance Authority) Regulations 2025",
        "https://www.legislation.gov.uk/uksi/2025/1328/contents/made",
      ),
      src(
        "DJI ViewPoints — UK drone regulations from Jan. 1, 2026",
        "https://viewpoints.dji.com/blog/new-uk-drone-regulations",
      ),
    ],
    body: [
      {
        type: "p",
        text: "The Civil Aviation Authority said in May it had received reports of suspected class-mark non-compliance on Open-category drones.",
      },
      {
        type: "p",
        text: "The Market Surveillance Authority “has recently received a number of reports relating to suspected UAS non-compliance with UK Class marking in the Open Category,” the CAA said. The notice named no brand, model or batch.",
      },
      {
        type: "p",
        text: "The Unmanned Aircraft (Market Surveillance Authority) Regulations 2025 named the CAA as that authority. From Jan. 1, Open-category drones placed on the UK market are subject to domestic product standards, the CAA class-marking page said.",
      },
      {
        type: "p",
        text: "Investigators may ask a manufacturer for technical data, the May note said. They may take no action if the aircraft meets the mark, or “take any and all reasonable steps to work with the manufacturer to ensure that their product remains in compliance.” The page does not list a recall.",
      },
      {
        type: "h2",
        text: "What the reporting form is for",
      },
      {
        type: "p",
        text: "The CAA asks for reports of systemic product problems: a missing or wrong class label, or a fault that looks inherent to a model on the market. A neighbour flying too close is a different complaint.",
      },
      {
        type: "h2",
        text: "Night flying",
      },
      {
        type: "p",
        text: "Open-category night flight in the UK requires a green flashing light, the CAA said, citing UK Regulation (EU) 2019/947 UAS.OPEN.060(2)(g). Fitting or retrofitting a light to CAA guidance does not invalidate the class mark, the May note said. Some EU C-class drones still ship without that light. Operators flying at night in the Open category still need it.",
      },
      {
        type: "p",
        text: "From Jan. 1, 2026, through Dec. 31, 2027, the UK MSA honours EU class marks, the same note said. From Jan. 1, 2028, a UK-class aircraft needs the green light as part of UK class marking “when specified.” DJI’s ViewPoints table maps C0, C1 and C2 airframes in this catalog to UK0, UK1 and UK2 during that transition.",
      },
      {
        type: "h2",
        text: "Unmarked drones",
      },
      {
        type: "p",
        text: "Market surveillance covers products that claim a class. Mini 2, Mini SE, Air 2, Air 2S, Mavic 2 Pro and DJI FPV never had one. They use the CAA legacy weight table: under 250 grams is A1; from 250 grams to 2 kilograms is A3 unless the remote pilot holds an A2 Certificate of Competence. See [[/guides/uk|Flying in the UK]].",
      },
    ],
  },
  {
    slug: "remote-id-eight-months",
    desk: "law",
    title: "Remote ID required on Air and Mavic drones since Jan. 1",
    dek: "UK1, UK2 and UK3 aircraft must broadcast now. C0 Minis and unmarked camera drones wait until 2028.",
    published: "2026-09-01",
    sortOrder: 3,
    related: ["air-3s", "air-3", "mavic-4-pro", "mavic-3-pro", "avata-2", "mini-5-pro", "mini-4-pro", "mini-2"],
    sources: [
      src(
        "CAA — Remote ID (RID) programme",
        "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/remote-id-rid/",
      ),
      src(
        "CAA — Remote ID in the Open category",
        "https://www.caa.co.uk/drones/open-category/moving-on-to-more-advanced-flying/remote-id-rid",
      ),
      src(
        "CAA Drone Code — Operator ID points 30-35",
        "https://www.caa.co.uk/drones/open-category/drone-code/getting-an-operator-id-before-you-fly-points-30-to-35/",
      ),
      src(
        "CAA CAP 3172 — Remote ID in the UK",
        "https://www.caa.co.uk/publication/download/26040",
      ),
    ],
    body: [
      {
        type: "p",
        text: "Direct Remote ID has been required since Jan. 1, 2026, on UK1, UK2 and UK3 drones, the Civil Aviation Authority says.",
      },
      {
        type: "p",
        text: "Direct RID broadcasts identity and location from the aircraft over Wi-Fi or Bluetooth. It does not need an internet connection. The duty also covers UK5 and UK6, the CAA programme page said. In this catalog that means C1 Air and Avata 2, and C2 Mavic, treated as the matching UK class through Dec. 31, 2027.",
      },
      {
        type: "p",
        text: "Flying those aircraft with Remote ID switched off may lead to prosecution, the Drone Code said. This article does not invent DJI Fly menu steps. The aircraft manual names the toggle.",
      },
      {
        type: "h2",
        text: "Who waits until 2028",
      },
      {
        type: "p",
        text: "UK0 camera drones of 100 grams or more, including Mini, Neo and Flip, must broadcast from Jan. 1, 2028. Legacy unmarked camera drones in that weight band, privately built aircraft in that band, and UK4 model aircraft sit on the same date. The CAA recommends switching RID on earlier. That is not the 2026 legal duty.",
      },
      {
        type: "h2",
        text: "The number that goes in the aircraft",
      },
      {
        type: "p",
        text: "The CAA issues a Remote ID number with the Operator ID. Operators may use the same number on every aircraft they operate. Point 32 of the Drone Code tells UK1, UK2 and UK3 remote pilots to add that number and switch the function on before flight.",
      },
      {
        type: "p",
        text: "A Mini 5 Pro on a C0 pack is not in that 2026 sentence. A Mini 5 Pro Fly More Combo Plus that DJI marks C1 is.",
      },
      {
        type: "h2",
        text: "Not the U.S. rule",
      },
      {
        type: "p",
        text: "U.S. Remote ID is a different statute. The UK is using Direct RID as an interim. Hybrid RID, which adds a networked feed, is the CAA’s preferred long-term design, the programme page said. Nothing in the pages opened Sept. 1 said a Mini 4 Pro emits Hybrid RID today.",
      },
      {
        type: "p",
        text: "Height, people and class rows are on [[/guides/uk|Flying in the UK]] and on each drone page.",
      },
    ],
  },
  {
    slug: "two-heights-of-120m",
    desk: "law",
    title: "C0 drones must cap height at 120 metres from takeoff",
    dek: "The Drone Code measures 120 metres from the surface. Class C0 product rules measure from the takeoff point.",
    published: "2026-09-01",
    sortOrder: 4,
    related: ["mini-5-pro", "mini-4-pro", "mini-3-pro", "air-3s", "mavic-4-pro"],
    sources: [
      src(
        "CAA Drone Code — where you can fly (Open height)",
        "https://www.caa.co.uk/drones/open-category/drone-code/",
      ),
      src(
        "UK retained EU 2019/945 Annex Part 1 — class C0 height limit",
        "https://www.legislation.gov.uk/eur/2019/945/annex/part/1/adopted?view=plain",
      ),
      src(
        "CAA — UAS class marking",
        "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/uas-class-marking/",
      ),
      src(
        "DJI ViewPoints — UK class mapping",
        "https://viewpoints.dji.com/blog/new-uk-drone-regulations",
      ),
      src(
        "CAA class marks — Open category, including unmarked weight table",
        "https://www.caa.co.uk/drones/open-category/getting-started-with-drones-and-model-aircraft/class-marks/",
      ),
    ],
    body: [
      {
        type: "p",
        text: "Class C0 drones must limit maximum attainable height to 120 metres above the takeoff point, retained EU product rules say.",
      },
      {
        type: "p",
        text: "Annex Part 1 of UK retained Commission Delegated Regulation (EU) 2019/945 requires a class C0 unmanned aircraft to “have a maximum attainable height above the take-off point limited to 120 m.” UK Open-category class marking is based on that retained law, the CAA said.",
      },
      {
        type: "p",
        text: "The Drone Code is a different sentence. Open-category height is 120 metres above the surface. If the ground rises, that legal ceiling rises with it. DJI’s “max takeoff altitude” figure, often 4,000 metres or more, is a mountain limit. It is not the Open-category rule.",
      },
      {
        type: "p",
        text: "On a slope, the C0 product cap can stop the aircraft before the Drone Code would. DJI’s ViewPoints table maps Mini 5 Pro, Mini 4 Pro and Mini 3 to C0/UK0.",
      },
      {
        type: "h2",
        text: "What is not sourced here",
      },
      {
        type: "p",
        text: "DJI has not published a UK-only note on its media-centre domain that says the Fly app now enforces that C0 cap on British Minis. Operator and dealer posts describing a 120-metre takeoff-relative limit after a GPS fix are not a DJI press release. DroneIQ is not documenting third-party tools that claim to lift the cap.",
      },
      {
        type: "h2",
        text: "C1 and C2",
      },
      {
        type: "p",
        text: "Air 3S is C1. Mavic 4 Pro is C2. Both still have to stay 120 metres from the surface in the Open category. They are not C0 products. A Plus battery that takes a Mini 5 Pro into C1 is a class change. Weigh the pack. See [[/drones/mini-5-pro|Mini 5 Pro]].",
      },
    ],
  },
];

export function getNews(slug: string): NewsArticle | undefined {
  return newsArticles.find((a) => a.slug === slug);
}

export function newsByDate(): NewsArticle[] {
  return [...newsArticles].sort((a, b) =>
    a.published === b.published ? a.sortOrder - b.sortOrder : a.published < b.published ? 1 : -1,
  );
}

export { NEWS_CHECKS } from "./news-checks";
