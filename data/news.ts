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
  title: "Where the news comes from",
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
  {
    slug: "avata-360-8k",
    desk: "product",
    title: "DJI launches Avata 360 with 8K spherical video",
    dek: "The March 26 note prices a drone-only kit at £409. Shipping was April 2026. It is not a second Avata 2.",
    published: "2026-09-01",
    sortOrder: 5,
    related: ["avata-360", "avata-2", "fpv", "neo-2"],
    sources: [
      src(
        "DJI via PR Newswire — Avata 360 launch (March 26, 2026)",
        "https://www.prnewswire.com/news-releases/dji-avata-360-sets-new-standards-for-immersive-360-fpv-flying-302723105.html",
      ),
      src("DJI product page — Avata 360", "https://www.dji.com/avata-360"),
      src("DJI Avata 360 (UK)", "https://www.dji.com/uk/avata-360"),
    ],
    body: [
      {
        type: "p",
        text: "DJI launched Avata 360 on March 26, 2026, with 8K/60 spherical video from 1-inch-equivalent sensors, the company said.",
      },
      {
        type: "p",
        text: "The 360-degree lens can also shoot 120-megapixel stills. A single-lens mode records 4K/60 in the older Avata framing. Claimed flight time is 23 minutes. Transmission is O4+, with a 20-kilometre figure in the launch note. That figure is not the CE range on the comparison sheet.",
      },
      {
        type: "p",
        text: "The aircraft can be flown with RC 2, RC-N2 or RC-N3, DJI said, or with goggles and motion controllers. Nightscape omnidirectional obstacle sensing and propeller guards are listed as standard. The March 26 note did not publish a takeoff mass or a class mark.",
      },
      {
        type: "h2",
        text: "UK prices in the launch note",
      },
      {
        type: "p",
        text: "DJI priced Avata 360 drone-only at £409, with RC 2 at £639. Fly More Combo with RC 2 and Motion Fly More Combo were both £829. Shipping was to begin in April 2026 and would vary by region, the company said.",
      },
      {
        type: "p",
        text: "The DroneIQ sheet lists Avata 360 as C1, about 455 grams with guards. That mass is not in the press release. Goggles do not cancel Flyer ID, Operator ID or visual line of sight. See [[/drones/avata-360|Avata 360]] and [[/compare/avata-2-vs-avata-360|Avata 2 vs Avata 360]].",
      },
    ],
  },
  {
    slug: "neo-2-151g",
    desk: "product",
    title: "Neo 2 weighs 151 grams with omnidirectional sensing",
    dek: "DJI called it its lightest drone with omni sensing. The UK store listed drone-only from £209 on Sept. 1.",
    published: "2026-09-01",
    sortOrder: 6,
    related: ["neo-2", "neo", "flip", "mini-4k"],
    sources: [
      src(
        "DJI via PR Newswire — Neo 2 launch (Nov. 13, 2025)",
        "https://www.prnewswire.com/news-releases/dji-launches-neo-2-follow-me-camera-drone-returns-safer-with-more-creative-ways-to-fly-302608557.html",
      ),
      src("DJI Neo 2 specs", "https://www.dji.com/global/neo-2/specs"),
      src("DJI Store UK — Neo 2", "https://store.dji.com/uk/product/dji-neo-2"),
    ],
    body: [
      {
        type: "p",
        text: "DJI launched Neo 2 on Nov. 13, 2025, at 151 grams, calling it its lightest drone with omnidirectional obstacle sensing.",
      },
      {
        type: "p",
        text: "The camera is a 12-megapixel, 1/2-inch CMOS with an f/2.2 aperture and a two-axis gimbal, DJI said. The launch note lists 4K recording at up to 100 fps for slow motion, and 2.7K vertical video. Claimed flight time is 19 minutes. Internal storage is 49 gigabytes. Wind resistance is Level 5.",
      },
      {
        type: "p",
        text: "Palm takeoff, return-to-palm, gesture control and an onboard mode display are in the same note. Pairing with RC-N3 is listed for a 10-kilometre transmission figure. That is not the CE range on the sheet.",
      },
      {
        type: "h2",
        text: "Still C0, still a camera",
      },
      {
        type: "p",
        text: "The UK store listed Neo 2 drone-only from £209 on Sept. 1. Fly More Combo was £349. Motion Fly More Combo was £509. The DroneIQ sheet marks it C0. A camera drone of 100 grams or more still needs a Flyer ID and an Operator ID. See [[/drones/neo-2|Neo 2]] and [[/guides/uk|Flying in the UK]].",
      },
    ],
  },
  {
    slug: "mini-5-pro-1-inch",
    desk: "product",
    title: "Mini 5 Pro puts a 1-inch sensor in the Mini class",
    dek: "DJI said Sept. 17, 2025, it is the first 1-inch Mini. The UK store’s C0 or C1 label depends on the battery.",
    published: "2026-09-01",
    sortOrder: 7,
    related: ["mini-5-pro", "mini-4-pro", "air-3s"],
    sources: [
      src(
        "DJI via PR Newswire — Mini 5 Pro launch (Sept. 17, 2025)",
        "https://www.prnewswire.com/news-releases/dji-brings-world-first-to-the-sky-with-mini-5-pro-302557410.html",
      ),
      src("DJI Mini 5 Pro product", "https://www.dji.com/uk/mini-5-pro"),
      src("DJI Mini 5 Pro specs (UK)", "https://www.dji.com/uk/mini-5-pro/specs"),
      src("DJI Store UK — Mini 5 Pro", "https://store.dji.com/uk/product/dji-mini-5-pro"),
    ],
    body: [
      {
        type: "p",
        text: "DJI introduced Mini 5 Pro on Sept. 17, 2025, with a 50-megapixel 1-inch sensor in a near-250-gram camera drone.",
      },
      {
        type: "p",
        text: "The company called it the first 1-inch sensor in a mini near-250-gram drone as of that date. The launch note lists 4K/60 HDR, 4K/120 slow motion, a 225-degree gimbal roll, true vertical shooting and nightscape omnidirectional sensing with forward LiDAR. Claimed flight time on the standard Intelligent Flight Battery is 36 minutes.",
      },
      {
        type: "p",
        text: "A 48 mm medium-tele mode is digital zoom, DJI said, not a second camera. Air 3S is the dual-camera travel drone in this catalog.",
      },
      {
        type: "h2",
        text: "The battery that changes the class",
      },
      {
        type: "p",
        text: "The UK store listed Mini 5 Pro with RC-N3 from £619 on Sept. 1. Fly More Combo with RC-N3 was £799. Fly More Combo Plus with RC 2 was £979. DJI’s FAQ on that page marks the standard combos C0 and the Plus combo C1, because the Plus pack takes the aircraft through the C0 mass limit.",
      },
      {
        type: "p",
        text: "DJI publishes 249.9 grams plus or minus 4 grams. Weigh the aircraft you fly. A C1 Mini 5 Pro is in the 2026 Remote ID sentence. A C0 pack is not. See [[/drones/mini-5-pro|Mini 5 Pro]] and [[/news/remote-id-eight-months|Remote ID]].",
      },
    ],
  },
  {
    slug: "mavic-4-pro-infinity-gimbal",
    desk: "product",
    title: "Mavic 4 Pro adds a 360-degree Infinity Gimbal",
    dek: "DJI said May 13, 2025, the flagship carries 100-megapixel Hasselblad, 70 mm and 168 mm cameras. It is C2.",
    published: "2026-09-01",
    sortOrder: 8,
    related: ["mavic-4-pro", "mavic-3-pro", "air-3s"],
    sources: [
      src(
        "DJI via PR Newswire — Mavic 4 Pro launch (May 13, 2025)",
        "https://www.prnewswire.com/news-releases/dji-mavic-4-pro-unlocks-shots-from-any-angle-for-aerial-narrators-302453870.html",
      ),
      src("DJI Mavic 4 Pro specs", "https://www.dji.com/uk/mavic-4-pro/specs"),
      src("DJI Store UK — Mavic 4 Pro", "https://store.dji.com/uk/product/dji-mavic-4-pro"),
      src(
        "DJI ViewPoints — UK class mapping",
        "https://viewpoints.dji.com/blog/new-uk-drone-regulations",
      ),
    ],
    body: [
      {
        type: "p",
        text: "DJI introduced Mavic 4 Pro on May 13, 2025, with a 100-megapixel Hasselblad camera on a gimbal that rotates 360 degrees.",
      },
      {
        type: "p",
        text: "The triple set is 28 mm, 70 mm and 168 mm equivalent, DJI said. The wide camera is a 4/3 CMOS Hasselblad sensor. The 70 mm camera is 48 megapixels on 1/1.3-inch. The 168 mm camera is 50 megapixels on 1/1.5-inch. The Hasselblad camera records 6K/60 HDR. Claimed flight time is 51 minutes. The battery in the launch note is 95 watt-hours.",
      },
      {
        type: "p",
        text: "Launch prices were in euros: €2,099 with RC 2, €2,699 Fly More Combo and €3,539 for the 512 GB Creator Combo with RC Pro 2. The UK store listed Mavic 4 Pro with RC 2 from £1,879 on Sept. 1. Fly More Combo was £2,224.",
      },
      {
        type: "h2",
        text: "Not a Mini, not A1 by default",
      },
      {
        type: "p",
        text: "DJI’s ViewPoints table maps Mavic 4 Pro to C2/UK2. Open-category Near People needs an A2 Certificate of Competence. Without it, C2 flies Far from People. The aircraft is over 900 grams. See [[/drones/mavic-4-pro|Mavic 4 Pro]] and [[/news/a2-near-people|A2 CofC]].",
      },
    ],
  },
  {
    slug: "flip-propeller-guards",
    desk: "product",
    title: "Flip ships with foldable full-coverage propeller guards",
    dek: "DJI said Jan. 14, 2025, the vlog drone stays under 249 grams with the guards on. It is C0, not a Mini 4 Pro.",
    published: "2026-09-01",
    sortOrder: 9,
    related: ["flip", "neo-2", "mini-4-pro", "mini-4k"],
    sources: [
      src(
        "DJI via PR Newswire — Flip launch (Jan. 14, 2025)",
        "https://www.prnewswire.com/news-releases/dji-launches-all-in-one-vlog-camera-drone-with-dji-flip-302350266.html",
      ),
      src("DJI Flip specs (UK)", "https://www.dji.com/uk/flip/specs"),
      src("DJI Store UK — Flip", "https://store.dji.com/uk/product/dji-flip"),
    ],
    body: [
      {
        type: "p",
        text: "DJI announced Flip on Jan. 14, 2025, as a vlog drone under 249 grams with foldable full-coverage propeller guards.",
      },
      {
        type: "p",
        text: "The company said it was its first drone with that guard design. The camera is a 1/1.3-inch CMOS for 48-megapixel stills and 4K/60 HDR video, with 4K/100 slow motion and 10-bit D-Log M. Claimed flight time is 31 minutes. Transmission with RC-N3 or RC 2 is O4.",
      },
      {
        type: "p",
        text: "“We are introducing DJI Flip to combine the simplicity of the DJI Neo with the stunning photo capabilities of the DJI Mini,” Ferdinand Wolf, DJI product experience director, said.",
      },
      {
        type: "p",
        text: "Launch prices were in dollars: $439, $639 with RC 2 and $779 Fly More Combo with RC 2. The UK store listed Flip with the phone controller from £295 on Sept. 1. RC 2 was £439. Fly More Combo with RC 2 was £525.",
      },
      {
        type: "h2",
        text: "Guards on, still a camera drone",
      },
      {
        type: "p",
        text: "The sheet marks Flip C0. Forward 3D infrared plus downward vision is not Mini 4 Pro omnidirectional sensing. A camera drone of 100 grams or more still needs both IDs. The launch line that training “is not required in most countries and regions” is not the UK rule. See [[/drones/flip|Flip]] and [[/guides/uk|Flying in the UK]].",
      },
    ],
  },
  {
    slug: "air-3s-dual-camera",
    desk: "product",
    title: "Air 3S pairs a 1-inch wide with a 70 mm tele",
    dek: "DJI’s dual-camera travel drone is C1. It is not a Mini, and the 70 mm is a second camera, not digital zoom.",
    published: "2026-09-01",
    sortOrder: 10,
    related: ["air-3s", "air-3", "mini-5-pro", "mavic-4-pro"],
    sources: [
      src("DJI Air 3S product", "https://www.dji.com/uk/air-3s"),
      src("DJI Air 3S specs", "https://www.dji.com/uk/air-3s/specs"),
      src("DJI Store UK — Air 3S", "https://store.dji.com/uk/product/dji-air-3s"),
      src(
        "DJI Europe — Air 3S launch note (Oct. 15, 2024)",
        "https://www.mynewsdesk.com/uk/dji/pressreleases/dji-enhances-dual-camera-drone-for-unmatched-aerial-travel-photography-3347425",
      ),
      src(
        "DJI ViewPoints — UK class mapping",
        "https://viewpoints.dji.com/blog/new-uk-drone-regulations",
      ),
    ],
    body: [
      {
        type: "p",
        text: "DJI sells Air 3S as a dual-camera travel drone with a 1-inch CMOS primary camera and a 70 mm medium telephoto, the product page said.",
      },
      {
        type: "p",
        text: "Each camera is listed at up to 14 stops of dynamic range, with 4K/60 HDR. DJI Europe dated the launch Oct. 15, 2024. Nightscape omnidirectional obstacle sensing and next-generation Smart Return to Home are on that page. The comparison sheet lists about 724 grams takeoff and 45 minutes claimed flight time.",
      },
      {
        type: "p",
        text: "The UK store listed Air 3S with RC-N3 from £959 on Sept. 1. Fly More Combo with RC-N3 was £1,239. Fly More Combo with RC 2 was £1,439.",
      },
      {
        type: "h2",
        text: "C1, not C0",
      },
      {
        type: "p",
        text: "DJI’s ViewPoints table maps Air 3S to C1/UK1. Through Dec. 31, 2027, that still flies Over People in the Open category. Direct Remote ID has been required on that class since Jan. 1, 2026. Mini 5 Pro on a C0 pack is a different sentence. See [[/drones/air-3s|Air 3S]] and [[/compare/mini-5-pro-vs-air-3s|Mini 5 Pro vs Air 3S]].",
      },
    ],
  },
  {
    slug: "flyer-id-100g",
    desk: "law",
    title: "Flyer ID now starts at 100 grams",
    dek: "A camera drone from 100 grams also needs an Operator ID. Aircraft under 100 grams still skip both.",
    published: "2026-09-01",
    sortOrder: 11,
    related: ["neo-2", "flip", "mini-4k", "mini-2", "mini-5-pro"],
    sources: [
      src(
        "CAA — Getting what you need to fly legally",
        "https://www.caa.co.uk/drones/open-category/drone-code/getting-what-you-need-to-fly-legally/",
      ),
      src(
        "CAA — Registering to fly drones and model aircraft",
        "https://www.caa.co.uk/drones/open-category/getting-started-with-drones-and-model-aircraft/registering-to-fly-drones-and-model-aircraft/",
      ),
      src(
        "CAA — Remote pilot qualifications overview",
        "https://www.caa.co.uk/drones/specific-category/remote-pilot-qualifications/remote-pilot-qualifications-overview/",
      ),
    ],
    body: [
      {
        type: "p",
        text: "Anyone flying a drone of 100 grams or more must hold a Flyer ID, the Civil Aviation Authority says.",
      },
      {
        type: "p",
        text: "The Flyer ID is the CAA’s official theory test. A Flyer ID allows Open-category Over People and Far from People flying. Near People still needs the A2 Certificate of Competence.",
      },
      {
        type: "p",
        text: "An Operator ID is required if the aircraft weighs 250 grams or more, or if it weighs 100 grams or more and has a camera. The operator must be 18 or over. The ID is labelled on the aircraft. A parent or guardian registers if the owner is under 18. The young person can still fly with a Flyer ID.",
      },
      {
        type: "h2",
        text: "What that does to this catalog",
      },
      {
        type: "p",
        text: "Every camera drone on the DroneIQ bench is 100 grams or more. Neo 2 at 151 grams, Flip under 249 grams and Mini 4K all need both IDs. So does Mini 2. There is no sub-100-gram camera row here that skips registration.",
      },
      {
        type: "p",
        text: "Aircraft under 100 grams do not need either ID. The CAA still recommends taking the Flyer ID test. The Drone Code still applies. See [[/guides/uk|Flying in the UK]].",
      },
    ],
  },
  {
    slug: "unmarked-a1-a3",
    desk: "law",
    title: "Unmarked Minis under 250 grams still fly A1",
    dek: "The CAA weight table, not a missing sticker, puts Mini 2 with people. Air 2S at 595 grams is A3 unless the pilot holds A2 CofC.",
    published: "2026-09-01",
    sortOrder: 12,
    related: ["mini-2", "mini-se", "air-2s", "mavic-air-2", "mavic-2-pro", "fpv"],
    sources: [
      src(
        "CAA class marks — Open category, including unmarked weight table",
        "https://www.caa.co.uk/drones/open-category/getting-started-with-drones-and-model-aircraft/class-marks/",
      ),
      src(
        "CAA — Getting what you need to fly legally",
        "https://www.caa.co.uk/drones/open-category/drone-code/getting-what-you-need-to-fly-legally/",
      ),
    ],
    body: [
      {
        type: "p",
        text: "An unmarked drone under 250 grams may fly Over People. One from 250 grams to 2 kilograms needs an A2 Certificate of Competence or stays in Far from People.",
      },
      {
        type: "p",
        text: "The CAA calls aircraft with neither a UK class mark nor a European C mark legacy aircraft. Those machines use the weight table, not the class-mark table.",
      },
      {
        type: "p",
        text: "Less than 250 grams is Over People (A1). Less than 2 kilograms may use Near People (A2) if the remote pilot holds A2 CofC. Otherwise Far from People (A3) applies up to 25 kilograms.",
      },
      {
        type: "h2",
        text: "Mini 2 is not A3",
      },
      {
        type: "p",
        text: "Mini 2 is 242 grams and unmarked. Mini SE is in the same band. Both fly A1 on that table. The missing sticker does not push them into A3.",
      },
      {
        type: "p",
        text: "Air 2S is 595 grams and unmarked. Air 2 and Mavic 2 Pro are heavier still. Without A2 CofC they fly A3: 50 metres from uninvolved people and 150 metres from residential, recreational, commercial or industrial areas. DJI FPV is the same weight sentence.",
      },
      {
        type: "p",
        text: "If a later batch carries a C1 sticker, use the class-mark table instead. Weigh the airframe. See [[/drones/mini-2|Mini 2]], [[/drones/air-2s|Air 2S]] and [[/guides/uk|Flying in the UK]].",
      },
    ],
  },
  {
    slug: "a2-near-people",
    desk: "law",
    title: "A2 CofC is required to fly Near People",
    dek: "A C2 Mavic 4 Pro can close to 30 metres. An unmarked aircraft under 2 kilograms stays at 50 metres.",
    published: "2026-09-01",
    sortOrder: 13,
    related: ["mavic-4-pro", "mavic-3-pro", "air-2s", "mavic-2-pro"],
    sources: [
      src(
        "CAA — A2 Certificate of Competency",
        "https://www.caa.co.uk/drones/specific-category/remote-pilot-qualifications/a2-certificate-of-competency-a2-cofc/",
      ),
      src(
        "CAA — Introduction to more advanced flying",
        "https://www.caa.co.uk/drones/open-category/moving-on-to-more-advanced-flying/introduction-to-more-advanced-flying/",
      ),
      src(
        "CAA — Getting what you need to fly legally",
        "https://www.caa.co.uk/drones/open-category/drone-code/getting-what-you-need-to-fly-legally/",
      ),
    ],
    body: [
      {
        type: "p",
        text: "The A2 Certificate of Competence is required to fly in the Near People sub-category, the Civil Aviation Authority says.",
      },
      {
        type: "p",
        text: "From Jan. 1, 2026, the Open A2 category is named Near People (A2). A Flyer ID is the entry condition. The certificate is valid for five years. There is no minimum age on the A2 page. The test is at least 30 multiple-choice questions, after self-directed practical training, awarded by a CAA-recognised assessment entity.",
      },
      {
        type: "p",
        text: "A UK2 or C2 aircraft, including Mavic 4 Pro, must stay 30 metres from uninvolved people, or 5 metres in low-speed mode. The remote pilot must not fly over uninvolved people. An unmarked aircraft under 2 kilograms in A2 stays 50 metres out.",
      },
      {
        type: "h2",
        text: "What Flyer ID already allows",
      },
      {
        type: "p",
        text: "Flyer ID covers Over People and Far from People. C0 Minis and, through Dec. 31, 2027, C1 Air 3S can already fly Over People without A2. Mavic 4 Pro cannot. Without A2 CofC it flies Far from People: 50 metres from uninvolved people and 150 metres from built-up areas.",
      },
      {
        type: "p",
        text: "This article does not list training providers or fees. The CAA publishes recognised assessment entities. See [[/guides/uk|Flying in the UK]] and [[/drones/mavic-4-pro|Mavic 4 Pro]].",
      },
    ],
  },
  {
    slug: "eu-c-class-until-2028",
    desk: "law",
    title: "EU C-class marks count as UK class until 2028",
    dek: "New models on the UK market from Jan. 1, 2026, need a UK0 to UK6 mark. A C0 Mini still maps to UK0 through Dec. 31, 2027.",
    published: "2026-09-01",
    sortOrder: 14,
    related: ["mini-5-pro", "mini-4-pro", "air-3s", "mavic-4-pro", "flip", "neo-2"],
    sources: [
      src(
        "CAA class marks — Open category",
        "https://www.caa.co.uk/drones/open-category/getting-started-with-drones-and-model-aircraft/class-marks/",
      ),
      src(
        "CAA — Getting what you need to fly legally",
        "https://www.caa.co.uk/drones/open-category/drone-code/getting-what-you-need-to-fly-legally/",
      ),
      src(
        "CAA — UAS class marking",
        "https://www.caa.co.uk/drones/drone-regulations/policy-programmes/uas-class-marking/",
      ),
      src(
        "DJI ViewPoints — UK class mapping",
        "https://viewpoints.dji.com/blog/new-uk-drone-regulations",
      ),
    ],
    body: [
      {
        type: "p",
        text: "EU C-class drones may be flown as the matching UK class through Dec. 31, 2027, the Civil Aviation Authority says.",
      },
      {
        type: "p",
        text: "A C0 drone is treated as UK0, C1 as UK1 and C2 as UK2 for that window. New models placed on the UK market from Jan. 1, 2026, must carry a UK class mark from UK0 to UK6. Aircraft bought before that date are unlikely to have a UK mark. They still fly on the C mark or, if unmarked, on the weight table.",
      },
      {
        type: "p",
        text: "From Jan. 1, 2028, a C-class aircraft is treated as a legacy machine. The remote pilot then uses the weight table, the CAA class-marks page said.",
      },
      {
        type: "h2",
        text: "How DJI maps this catalog",
      },
      {
        type: "p",
        text: "DJI’s ViewPoints table maps Neo 2, Flip, Mini 5 Pro, Mini 4 Pro and Mini 3 to C0/UK0; Air 3S, Air 3, Avata 2 and original Mavic 3 to C1/UK1; Mavic 4 Pro and Mavic 3 Pro to C2/UK2. That table is a manufacturer note. The CAA pages govern the operation.",
      },
      {
        type: "p",
        text: "UK0 maximum mass is less than 250 grams including payload. UK1 is less than 900 grams. UK2 is less than 4 kilograms. A Plus battery that breaks a Mini’s C0 mass is a class change. See [[/guides/uk|Flying in the UK]].",
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
