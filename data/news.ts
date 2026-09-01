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
  kicker: "The desk",
  title: "Where the news comes from",
  lede: "We read primary sources and write our own copy. We do not scrape a wire, paste a retailer blog, or invent a flight test.",
  body: [
    "The CAA, UK legislation and DJI’s own media centre and store pages are the desk. Heliguy, Coptrz, UAV Coach and the enthusiast press are useful for knowing what people are arguing about; they are not a second catalog.",
    "Every article names the URLs we opened and the date we opened them. Figures that already live on a spec sheet still live there — this tab is for what changed, or what the sheet does not say in English.",
    "We did not fly the aircraft named below for these pieces. If a sentence needs a hover, it belongs on a compare page.",
  ],
};

export const newsArticles: NewsArticle[] = [
  {
    slug: "ifa-2026-berlin",
    desk: "product",
    title: "DJI’s IFA booth is a 360 camera, a cleaner, and last April’s beginner drones",
    dek: "The 27 August media-centre note for Berlin next week does not announce a new Mini, Air or Mavic. It does put Lito on a European show floor — and Lito is not on this bench yet.",
    published: "2026-09-01",
    sortOrder: 1,
    related: ["mini-4k", "mini-4-pro", "neo-2", "flip", "avata-360", "mavic-4-pro", "air-3s", "mini-5-pro"],
    sources: [
      src(
        "DJI Media Centre — IFA 2026 Berlin (27 Aug 2026)",
        "https://www.dji.com/media-center/announcements/ifa-2026-dji-berlin-osmo-360-2-romo-2-power-system",
      ),
      src(
        "DJI via PR Newswire — Lito 1 and Lito X1 launch (23 Apr 2026)",
        "https://www.prnewswire.com/news-releases/dji-launches-beginner-friendly-camera-drone-series-with-lito-x1-and-lito-1-302750047.html",
      ),
      src("DJI Store UK — Lito X1", "https://store.dji.com/uk/product/dji-lito-x1"),
      src("DJI product page — Lito X1", "https://www.dji.com/lito-x1"),
      src("DJI product page — Lito 1", "https://www.dji.com/lito-1"),
    ],
    body: [
      {
        type: "p",
        text: "DJI’s 27 August media-centre note for IFA 2026 is not a drone launch. From 4 to 8 September the company will sit in Hall 20-129 at Messe Berlin, 10:00 to 18:00, and put three products on a European floor for the first time: the Osmo 360 II (up to 8K/60 panoramic video, in DJI’s wording), ROMO 2 for home cleaning, and a wider Power lineup including balcony solar. Camera drones are listed as things you can handle, not as things being unveiled.",
      },
      {
        type: "p",
        text: "The drone row DJI printed is Mavic 4 Pro, Air 3S, Mini 5 Pro, Neo 2, Lito 1, Lito X1, Flip, Avata 360 and Inspire 3. Two of those names are missing from this catalog: Lito 1 and Lito X1. Inspire 3 was never on this bench. The rest already have sheets.",
      },
      {
        type: "h2",
        text: "What Lito actually is",
      },
      {
        type: "p",
        text: "Lito is not a rumour from the show. DJI launched the series on 23 April 2026: two folding camera drones aimed at a first aircraft, with omnidirectional sensing. The launch copy puts a 1/1.3-inch 48 MP sensor and forward LiDAR on Lito X1, and a 1/2-inch 48 MP sensor on Lito 1. Claimed standard-pack endurance is 36 minutes. Euro RRPs on that release were €419 for X1 and €339 for Lito 1.",
      },
      {
        type: "p",
        text: "The UK store, today, lists Lito X1 from £369. DJI’s own FAQ on that page is the fact that matters for this site: the base aircraft, the two-battery combo and the Fly More combos with RC-N3 or RC 2 are C0 / UK0. The Fly More Combo Plus with RC 2 is the C1 / UK1 kit, because the Plus battery is the pack that takes the airframe through 249 g. Same split we already print on Mini 5 Pro. The store also says those C0 combos must not fly the Plus pack or propeller guards if you want to stay in that class.",
      },
      {
        type: "p",
        text: "One line on the same UK page is a global footnote, not a CAA sentence: “Training or examination is not required for flying this product in most countries and regions.” In the UK a camera drone at 100 g or more still needs a Flyer ID and an Operator ID. Lito is under 249 g on DJI’s weight line. That is not an exemption. Read [[/guides/uk|Flying in the UK]].",
      },
      {
        type: "h2",
        text: "What the booth is not",
      },
      {
        type: "p",
        text: "The media-centre note does not name a Mini 6, an Air 4, or a Mavic 5. Workshops on 5 and 6 September split a drone session at 11:00 and a handheld session at 15:00, 30 minutes each. If a new airframe appears on that floor, it is not in the 27 August text we opened. Until DJI prints specs we can source, Lito stays off the bench — we will not invent a row from a show list.",
      },
    ],
  },
  {
    slug: "caa-class-mark-watchdog",
    desk: "law",
    title: "The CAA is now investigating class marks, not just writing them",
    dek: "A May 2026 Market Surveillance notice is the first public sign that UK class marks have a policeman. Night flying is the other paragraph, and it is easier than the forums made it.",
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
        "DJI ViewPoints — New UK drone regulations from 01.01.2026",
        "https://viewpoints.dji.com/blog/new-uk-drone-regulations",
      ),
    ],
    body: [
      {
        type: "p",
        text: "Until this year a class mark on a DJI was a sticker you trusted because DJI printed it. From 1 January 2026 it is also a UK product standard, and the Civil Aviation Authority is the Market Surveillance Authority that is supposed to check the sticker against the aircraft. Statutory instrument 2025 No. 1328 named the CAA for that job. The May 2026 news note is the first time the CAA has said, in public, that people have already reported suspected non-compliance.",
      },
      {
        type: "p",
        text: "The wording is careful. The MSA “has recently received a number of reports relating to suspected UAS non-compliance with UK Class marking in the Open Category.” It does not name a brand, a model, or a batch. The next sentence is the process: ask the manufacturer for technical data, then either take no action because the aircraft meets the mark, or “take any and all reasonable steps to work with the manufacturer to ensure that their product remains in compliance.” There is no recall list on that page. Anyone telling you a Mini or a Mavic has been pulled from UK shelves on the back of this note is ahead of the CAA.",
      },
      {
        type: "h2",
        text: "What you can actually report",
      },
      {
        type: "p",
        text: "The reporting page is for systemic product problems — a missing or wrong class label, a technical failure that looks like a batch fault — not for “my neighbour flies too close.” The CAA says it is primarily interested in risks inherent to a model placed on the market. If you think the printed class is wrong, that is the form. If you think a pilot is breaking the Drone Code, that is a different complaint.",
      },
      {
        type: "h2",
        text: "Night: a green light, not a new class",
      },
      {
        type: "p",
        text: "The same May note answers a question Mini and Air owners have been sending to the MSA by accident. Open-category night flight in the UK needs a green flashing light, under UK Regulation (EU) 2019/947 UAS.OPEN.060(2)(g). If the aircraft did not ship with one, the CAA says you may fit or retrofit a light to its guidance without invalidating the class mark. Some EU C-class drones still arrive without that light. The law does not care about the EU packing list. If you fly at night in the Open category here, the light is on.",
      },
      {
        type: "p",
        text: "The transition dates are restated in the same paragraph: from 1 January 2026 to 31 December 2027 the UK MSA honours EU class marks. From 1 January 2028 a UK-class aircraft needs the green light as part of UK class marking “when specified.” That is why this catalog still prints C0, C1 and C2. DJI’s own ViewPoints table maps those marks to UK0, UK1 and UK2 for the airframes we list. The sticker you already have is the one you fly, until the CAA or DJI tells you otherwise in writing.",
      },
      {
        type: "h2",
        text: "Unmarked is still a different sentence",
      },
      {
        type: "p",
        text: "Market surveillance is about products that claim a class. Mini 2, Mini SE, Air 2, Air 2S, Mavic 2 Pro and DJI FPV never had one. They use the CAA legacy weight table, which is already on [[/guides/uk|the UK explainer]] and on those drone pages: under 250 g is A1; from 250 g to 2 kg is A3 unless you hold an A2 CofC. A May investigation into class-marked stock does not rewrite that table.",
      },
    ],
  },
  {
    slug: "remote-id-eight-months",
    desk: "law",
    title: "Remote ID has been on for Air and Mavic since January. Minis wait until 2028.",
    dek: "Eight months into the UK rule, the split is still the class mark, not the camera. C0 and unmarked camera drones broadcast later. The CAA’s long-term preference is Hybrid RID, which is not what your Mini is doing today.",
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
        "CAA Drone Code — Operator ID points 30–35",
        "https://www.caa.co.uk/drones/open-category/drone-code/getting-an-operator-id-before-you-fly-points-30-to-35/",
      ),
      src(
        "CAA CAP 3172 — Remote ID in the UK (educational article)",
        "https://www.caa.co.uk/publication/download/26040",
      ),
    ],
    body: [
      {
        type: "p",
        text: "Direct Remote ID is a broadcast from the aircraft — identity and position, picked up nearby over Wi-Fi or Bluetooth, no internet required. The CAA’s programme page is blunt about the timetable. From 1 January 2026 it has been a legal requirement for UK1, UK2, UK3, UK5 and UK6. That is every C1 Air and Avata 2, and every C2 Mavic, treated as the matching UK class until 31 December 2027. If you fly those airframes with RID switched off, the Drone Code says you may face prosecution. This page will not invent the DJI Fly menu; the manual that came with the aircraft is the one that names the toggle.",
      },
      {
        type: "p",
        text: "The other half of the catalog is later. UK0 camera drones at 100 g or more — Mini, Neo, Flip — and legacy unmarked camera drones at 100 g or more, plus privately built aircraft in that band, must broadcast from 1 January 2028. Model aircraft in UK4 sit on that later date too. The CAA recommends switching RID on anyway. Recommendation is not the same as the 2026 duty.",
      },
      {
        type: "h2",
        text: "What you put in the box",
      },
      {
        type: "p",
        text: "Registration and RID are linked. The CAA issues a Remote ID number with the Operator ID. You can use the same number on every aircraft you operate. Point 32 of the current Drone Code is the Open-category sentence for UK1, UK2 and UK3: add that number, switch the function on, then fly. A Mini 5 Pro on a C0 pack is not in that sentence yet. A Mini 5 Pro Fly More Combo Plus that DJI marks C1 is.",
      },
      {
        type: "h2",
        text: "This is not the American rule",
      },
      {
        type: "p",
        text: "US Remote ID is a different statute, a different start date, and a different argument about modules. Do not import a YouTube explanation. The UK system is Direct RID as an interim; the CAA still says Hybrid RID — broadcast plus a networked feed — is the preferred long-term design. Nothing in the 1 September desk read says Hybrid is what a Mini 4 Pro emits today.",
      },
      {
        type: "p",
        text: "If you need the height, people and class rows rather than this timetable, they are on [[/guides/uk|Flying in the UK]] and on each drone page. This piece is only the broadcast duty, eight months in.",
      },
    ],
  },
  {
    slug: "two-heights-of-120m",
    desk: "law",
    title: "The 120 m rule is two sentences, and Mini owners are flying the stricter one",
    dek: "The Drone Code measures 120 m from the surface. C0 product standards measure 120 m from takeoff. Those are not the same hill.",
    published: "2026-09-01",
    sortOrder: 4,
    related: ["mini-5-pro", "mini-4-pro", "mini-3-pro", "air-3s", "mavic-4-pro"],
    sources: [
      src(
        "CAA Drone Code — where you can fly (Open height)",
        "https://www.caa.co.uk/drones/open-category/drone-code/",
      ),
      src(
        "CAA — UAS class marking (product standards, including performance)",
        "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/uas-class-marking/",
      ),
      src(
        "DJI ViewPoints — UK class mapping for current DJI airframes",
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
        text: "Open-category height in the UK is 120 metres above the surface. That is the Drone Code sentence, and it is the one this site prints on every compare sheet. It is a pilot rule. If the ground rises under you, the legal ceiling rises with it. DJI’s “max takeoff altitude” figure — a mountain number, often 4,000 m or more — is not that rule.",
      },
      {
        type: "p",
        text: "Class marking is a product rule. From 1 January 2026, Open-category aircraft placed on the UK market have to meet domestic standards that the CAA describes as covering performance and reliability, geo-awareness, Remote ID and lights. C0 / UK0, the mark on Mini 4 Pro, Mini 5 Pro (standard pack), Mini 3 and the other sub-250 class-marked Minis, is the class that manufacturers historically met by limiting attainable height to 120 m above the take-off point. That is a shallower sentence than the Drone Code. On a slope, the product cap can stop you before the law would.",
      },
      {
        type: "h2",
        text: "What we can source, and what we cannot",
      },
      {
        type: "p",
        text: "DJI’s ViewPoints UK table still maps Mini 5 Pro, Mini 4 Pro and Mini 3 to C0 / UK0. It does not publish a UK-only firmware changelog that says “we capped your Mini at 120 m AGL from the launch point.” UK operators and dealers have described the Fly app presenting that cap on C0 Minis once the aircraft has a GPS fix. We are not going to launder those posts into a DJI press release. We are also not going to document third-party tools that claim to lift the cap. If the law is 120 m from the surface, removing a manufacturer limit so you can climb a hill is still your height, your VLOS, and your prosecution.",
      },
      {
        type: "h2",
        text: "Who is not in this argument",
      },
      {
        type: "p",
        text: "Air 3S is C1. Mavic 4 Pro is C2. They still have to obey 120 m from the surface in the Open category. They are not C0 products, so they are not the Mini-shaped version of this fight. A Plus battery that pushes a Mini 5 Pro into C1 is a class change, not a firmware cheat — weigh the pack, read the mark, then look at [[/drones/mini-5-pro|Mini 5 Pro]] and the Mini 4 Pro sheet before you buy a hill.",
      },
      {
        type: "p",
        text: "The practical UK method, if you need height over rising ground on a C0 Mini, is still takeoff point and flight plan, not a forum thread. The legal method on a steep job is often a C1 or C2 airframe, an authorisation, or staying under both ceilings. We will update this piece if DJI or the CAA puts a UK Mini height note on their own domain.",
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
