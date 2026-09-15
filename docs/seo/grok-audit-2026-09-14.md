# DroneIQ SEO/AEO audit — DroneIQ (IQ Labs)

**RE-AUDIT (fresh pass):** 2026-09-14  
**Audited for:** Gordon Shepherd (IQ Labs)  
**Primary site:** https://droneiq.pro  
**Also checked:** https://iqlabs.app (hub), https://iqlabs.app/work/droneiq  
**Method:** WebFetch + curl. Sampled robots, sitemap, home, `/drones`, `/gear`, `/news`, `/compare/*`, `/guides/uk`, `/guides/buying-used`, `/for/*`, sample drone/gear/news pages. **No** search-volume, difficulty, position, clicks, or CTR invented.  
**Prior file:** overwritten in place (`/workspace/droneiq-audit.md`).

---

## A) Product summary

DroneIQ is a facts-first **DJI consumer comparison** product: sourced specs with access dates, **CE video range (not FCC)**, **UK Open-category class / Flyer ID / Operator ID / Remote ID**, UK price snapshots (DJI Store / Amazon / eBay / CeX), plain-language “would you notice?” verdicts, and a browser-local “I fly” bench for head-to-heads. Controllers, motion, goggles, batteries and ND live on a compatibility-first **Gear** matrix. A short **News** desk cites CAA/DJI primaries; two guides cover UK Open rules and buying used. Positioned as an **IQ Labs** product (`An IQ Labs product` → https://iqlabs.app). Explicit disclaimer: not legal advice; CAA Drone Code applies to the airframe and battery you fly.

**Catalog observed this pass (sitemap):** **23** drones, **35** gear SKUs, **314** compare URLs (~253 drone–drone + ~61 gear–gear), **14** news articles, **5** `/for/{job}` shortlists, **2** guides. Total sitemap `<loc>`: **398**.

---

## B) Site map of main templates / URL types

### Domain & crawl basics

| Item | Observed (2026-09-14 re-audit) |
|------|--------------------------------|
| Canonical host | `https://droneiq.pro` |
| `www` | **308 →** `https://droneiq.pro/` |
| Stack | Next.js on Vercel; prerendered HTML (`x-nextjs-prerender: 1`); substantial SSR body text |
| `robots.txt` | `User-Agent: *` / `Allow: /` / nonstandard `Host: https://droneiq.pro` / `Sitemap: https://droneiq.pro/sitemap.xml` |
| Sitemap | Single `urlset`, **398** `<loc>` URLs. Curl **200** (`content-type: application/xml`). WebFetch **500** on `/sitemap.xml` (reconfirmed this pass). |
| `lastmod` | **384** × `2026-09-01T20:25:11.242Z` + **14** news × `2026-09-01` — frozen build stamp, not per-page freshness |
| `llms.txt` / `/about` / `/privacy` / `/terms` / `/compare` (index) / `/guides` (index) | **404** (`noindex` soft 404 chrome) |
| HSTS | `strict-transport-security: max-age=63072000` |
| Compare reverse slugs | e.g. `/compare/mini-4k-vs-mini-2` → **308** → canonical `/compare/mini-2-vs-mini-4k` (good) |

### Primary nav / hubs (all 200 unless noted)

| URL | Role (from on-page copy) |
|-----|---------------------------|
| `/` | Compare bench + featured sheets + “More matchups people search” + controller/headset compares + desk teaser |
| `/drones` | Full catalog (**23 of 23**); filters described as shareable URLs |
| `/gear` | Controllers/headsets/parts + compatibility matrix |
| `/news` | Primary-source news index (**14** stories, dated Sept. 1, 2026 on index) |
| `/for` | Job shortlists hub (travel, wind, dusk, beginner, FPV) |
| `/guides/uk` | UK Open: Flyer/Operator ID, C/UK class, A1/A2/A3, Remote ID, CE vs FCC |
| `/guides/buying-used` | Used-buy checklist (gimbal, cycles, props, ND, pairing, logs) |
| `/compare` | **404** — no index; only pairwise URLs exist |

### Template / URL patterns (counts from sitemap)

| Pattern | Example(s) | Count | Notes |
|---------|------------|-------|-------|
| `/drones/{slug}` | `/drones/mini-5-pro`, `/drones/mini-4k`, `/drones/air-3s`, `/drones/mavic-4-pro` | **23** | Spec record, UK law block, price board, boxes, parts, review digest, FAQ |
| `/compare/{a}-vs-{b}` | `/compare/mini-2-vs-mini-4k`, `/compare/mini-4-pro-vs-mini-5-pro`, `/compare/air-3-vs-air-3s` | **314** | No reverse-pair duplicates in sitemap; reverse hits 308 to canonical. Mix of drone–drone (~253) and gear–gear (~61). No `/compare` hub. |
| `/gear/{slug}` | `/gear/rc-n3`, `/gear/batt-mini-5-pro`, `/gear/goggles-3` | **35** (+ `/gear` hub) | Compatibility-first; thinner than drone pages |
| `/news/{slug}` | `/news/eu-c-class-until-2028`, `/news/caa-class-mark-watchdog` | **14** (+ index) | `NewsArticle` JSON-LD; author Organization = IQ Labs |
| `/for/{job}` | `/for/beginner`, `/for/travel`, `/for/dusk`, `/for/wind`, `/for/fpv` | **5** (+ `/for`) | Short ItemList shortlists |
| Guides | `/guides/uk`, `/guides/buying-used` | **2** | Strong UK/legal; no `/guides` index |

**Hub portfolio:** https://iqlabs.app lists DroneIQ as tool **20**; work page https://iqlabs.app/work/droneiq explains CE-vs-FCC and UK class. **Stale inventory claim on hub (still true this pass):** “Sixteen DJI aircraft across 120 head-to-head comparison pages” vs live sitemap **23** drones / **314** compares — hub copy lags the product.

---

## C) What’s already strong for search / AI answers

1. **Clear differentiator, repeated in title/meta/body:** CE range not FCC; UK class / IDs / subcategory on the record next to weight — rare vs US-centric DJI roundups.
2. **SSR + unique title / meta description / H1 / canonical** on every sampled template; `og:locale=en_GB`; Twitter cards present; sitewide OG image `/og.png`.
3. **Answer-shaped FAQs + FAQPage JSON-LD** on drone pages (e.g. Mini 5 Pro ×3), compare pages (Mini 2 vs Mini 4K ×9; Mini 4 Pro vs Mini 5 Pro ×10), and `/guides/uk` (×4: Flyer ID, 250 g, Remote ID, why CE).
4. **Sourced figures with access dates** (“Every figure names a source and the date it was read”) — strong E-E-A-T / AEO citability.
5. **Compare scale already built:** 314 pairwise URLs with “Would you notice?” framing, Same/Ahead labels, UK paperwork called out when it differs (e.g. Mini 2 unmarked vs Mini 4K C0). Reverse slug consolidation via 308.
6. **UK Open guide** is extractable, structured (Flyer/Operator, class, Remote ID, CE vs FCC, FPV/VLOS), and linked from product FAQs — good pillar for regulatory queries.
7. **News desk discipline:** primary CAA/DJI sources; “DroneIQ did not fly the aircraft”; dates on index; `NewsArticle` with publisher DroneIQ + author IQ Labs → iqlabs.app.
8. **ItemList** on `/drones` (23), `/for/*`, `/news`, and compare pages; home `WebPage` + nested `WebSite`.
9. **Honest commerce posture:** dated UK snapshots (e.g. price boards as of 2026-08-31), blank cells rather than guessed EANs, used checklist, legal disclaimer — reduces thin-affiliate smell.
10. **Crawl openness:** robots allow-all; www consolidated; sitemap enumerates the public inventory (398 URLs — no obvious under-count vs claimed catalog). Sampled Googlebot/GPTBot curl HEAD on sitemap also **200**.

---

## D) Gaps / thin areas

1. **No `/compare` index (404)** — 314 compare URLs depend on homepage featured sheets / “More matchups”, in-page “vs” links, and sitemap. Weak human/crawler discovery for non-featured pairs; missed hub for “DJI compare” navigational intent.
2. **Schema depth short of the content:** drone pages are Product-like (price, brand, specs) but emit only `WebPage` + `FAQPage` — **no `Product` / `Offer` / `Brand` / `BreadcrumbList`**. Home has `WebPage`/`WebSite` only — **no `Organization`** with `sameAs` → iqlabs.app, no `SearchAction`. News has solid `NewsArticle` but no FAQ on articles sampled.
3. **Sitemap fetcher fragility:** WebFetch **500** on `/sitemap.xml` while curl works — some non-browser stacks may fail the only sitemap URL.
4. **Frozen `lastmod` (2026-09-01)** across nearly all URLs — undermines freshness signals when news/prices/rules change.
5. **Hub/work page inventory stale** (16 aircraft / 120 compares) vs live 23 / 314 — portfolio SEO and AEO citations can quote outdated scale.
6. **Thin / uneven templates (approx visible word counts this pass):** `/for/fpv` ~222; `/for/dusk` ~319; `/for/wind` ~301; `/for/beginner` ~309; battery gear `/gear/batt-mini-5-pro` ~276; vs drone Mini 5 Pro ~1.4k and compares ~1.5k. Job pages risk soft “best for X” SERP quality if not deepened with the same sourced tables.
7. **No About / Privacy / Terms** — E-E-A-T and trust pages missing despite legal-adjacent UK advice (disclaimer exists in footer chrome).
8. **No `llms.txt` (or equivalent)** — optional AEO aid; absent.
9. **Compare quality variance:** high-intent near-peers (Mini 4 Pro vs Mini 5 Pro, Mini 2 vs Mini 4K) are excellent; long-tail cross-category pairs (e.g. Neo vs Mavic 4 Pro still ~1.5k SSR) may dilute topical focus if not curated or deprioritized in internal linking.
10. **Single shared OG image** for all pages — fine baseline; per-model/compare cards would improve social/AEO previews (not blocking).
11. **Nonstandard `Host:` in robots.txt** — ignored by Google; harmless but not a substitute for correct canonicals (canonicals are already correct).
12. **`/guides` index 404** — only two guides; minor vs compare hub, but no guides landing.

### Overlap / portfolio

- On-site: “An IQ Labs product” links to https://iqlabs.app.
- Hub lists DroneIQ alongside other IQ Labs tools; work page states the CE/UK thesis clearly (including hub “1.7×” CE/FCC gap claim).
- No conflicting parallel DroneIQ domain observed in this pass.

---

## E) Ranked page ideas (intent labels only — no volumes)

| # | Page idea | Audience | Terms / intent labels (guess) | Why now | Priority |
|---|-----------|----------|-------------------------------|---------|----------|
| 1 | **`/compare` hub** — curated featured matchups + browse by family (Mini / Air / Mavic / FPV / Gear) + link to bench; do **not** dump all 314 as equal | Buyers comparing before purchase; crawlers | “DJI compare”, “Mini 4 Pro vs Mini 5 Pro”, “best DJI comparison” | Largest discovery hole for the site’s main asset | **P0** |
| 2 | **Product + Offer JSON-LD + BreadcrumbList** on `/drones/{slug}` (and Offer where dated UK RRP exists); Organization on home with `sameAs` → iqlabs.app | Crawlers, shopping/AI answer features | Model + “specs”, “UK price”, “C0/C1” | Content already supports it; schema lags | **P0** |
| 3 | **Harden `/guides/uk` as the CE/UK pillar** — TOC, last-reviewed date, FAQ expansion (UK0–UK6 transition, Plus battery class change), deeper internal links from every drone FAQ + law news | UK buyers, regulatory queries, AEO | “drone Flyer ID UK”, “C0 vs unmarked”, “Remote ID UK drone”, “CE vs FCC DJI range” | Differentiator already written; make it the citabler URL | **P0** |
| 4 | **Sitemap reliability + honest lastmod** — ensure `/sitemap.xml` 200 for non-browser UAs (WebFetch path); update lastmod on real content change | Crawlers | n/a (technical) | WebFetch 500 + frozen dates | **P1** |
| 5 | **Deepen `/for/{job}`** with extractable one-sentence picks + UK class constraints + links into compare/drone pages (same data, not fluff) | Beginners / travel / dusk searchers | “best beginner DJI UK”, “best travel drone under 250g” | Hubs exist but thin (~220–420 words) | **P1** |
| 6 | **About + editorial policy** (who builds it, sourcing rules, “we don’t invent ranges”, not legal advice) + basic Privacy/Terms | Trust / E-E-A-T | “who makes DroneIQ”, navigational | Legal-adjacent niche without About | **P1** |
| 7 | **News cadence + Article FAQ** where a story answers a lasting question (e.g. EU C-class until 2028) | Reg-watchers | “UK class marks 2028”, “Remote ID UK drones” | 14 solid pieces; pillar clustering helps | **P2** |
| 8 | **Sync iqlabs.app/work/droneiq counts** to live catalog (23 / 314 or whatever is true at ship) | Portfolio visitors, AI scraping hub | navigational | Hub currently understates scale | **P2** |
| 9 | **Optional `llms.txt`** pointing at `/guides/uk`, `/drones`, featured compares, sourcing policy | Answer engines | n/a | Low cost; complements FAQ schema | **P3** |
| 10 | **Curate internal links** so near-peer compares get more inlinks than exotic mismatches; homepage already models this | Buyers | peer “X vs Y” | Reduces soft long-tail competition with money pages | **P2** |

---

## F) Sampled URLs log (concrete)

**Homes & policy**

- https://droneiq.pro/ — title: *DroneIQ — drone specs you can decide with*; H1: *Compare drones by the numbers you would actually notice.*; ~1180 words; schema `WebPage` + `WebSite`
- https://www.droneiq.pro/ — **308** → https://droneiq.pro/
- https://droneiq.pro/robots.txt — allow all + sitemap pointer
- https://droneiq.pro/sitemap.xml — 398 URLs (curl 200; WebFetch 500)
- https://droneiq.pro/compare — **404**
- https://droneiq.pro/about, `/privacy`, `/terms`, `/llms.txt`, `/guides` — **404**

**Hubs**

- https://droneiq.pro/drones — *All drones · DroneIQ* (23 of 23); ItemList
- https://droneiq.pro/gear — compatibility matrix (~816 words)
- https://droneiq.pro/news — 14 stories dated Sept. 1, 2026 on index
- https://droneiq.pro/for — *What is the flying for?*
- https://droneiq.pro/guides/uk — *Flying in the UK* (~706 words; FAQPage ×4)
- https://droneiq.pro/guides/buying-used — *Buying used* (~404 words; WebPage only)

**Drones**

- https://droneiq.pro/drones/mini-5-pro — C0/C1 battery catch; FAQPage ×3; ~1374 words; **no Product schema**
- https://droneiq.pro/drones/mini-4k — budget C0 Mini
- https://droneiq.pro/drones/air-3s — C1 dual camera (catalog)
- https://droneiq.pro/drones/mavic-4-pro — C2 flagship (catalog)

**Compare**

- https://droneiq.pro/compare/mini-2-vs-mini-4k — unmarked vs C0 thesis; FAQPage ×9; ~1530 words
- https://droneiq.pro/compare/mini-4-pro-vs-mini-5-pro — FAQPage ×10; ~1541 words
- https://droneiq.pro/compare/neo-vs-mavic-4-pro — long-tail cross-category (still full SSR ~1504 words)
- Reverse: `/compare/mini-4k-vs-mini-2` → **308** → canonical

**Gear / for / news**

- https://droneiq.pro/gear/rc-n3 — ~489 words; FAQPage
- https://droneiq.pro/gear/batt-mini-5-pro — ~276 words; FAQPage
- https://droneiq.pro/for/beginner (~309), `/for/travel` (~422), `/for/dusk` (~319), `/for/wind` (~301), `/for/fpv` (~222)
- https://droneiq.pro/news/eu-c-class-until-2028 — `NewsArticle`; author IQ Labs; publisher DroneIQ
- https://droneiq.pro/news/caa-class-mark-watchdog

**IQ Labs hub**

- https://iqlabs.app — portfolio entry #20 DroneIQ
- https://iqlabs.app/work/droneiq — CE 1.7× claim + UK class thesis; **stale 16/120 inventory**

---

## G) CE / UK class sourcing angle

**What the product claims (on-site + hub):** Spec tables print **CE video range** because UK transmitters are CE; DJI’s large km figure is usually **FCC** (often ~2× on-page; hub states average **1.7×**). UK **class mark** (C0/C1/C2, and UK0–UK6 transition through Dec 2027 / new UK marks from Jan 2026), **Flyer ID / Operator ID**, **A1/A2/A3**, and **Remote ID** dates sit on the record beside weight — including traps like Mini 5 Pro **Plus battery → C1**, and **unmarked** sub-250 g still **A1** on the CAA weight table. Guide + news cover Remote ID: UK1/2/3 (and C1/C2 treated as those) from **1 Jan 2026**; UK0/C0 camera Minis/Neo later (**1 Jan 2028**).

**Why it matters for SEO/AEO (qualitative only):**

| Angle | On-site support | Gap |
|-------|-----------------|-----|
| CE vs FCC range | Home meta; `/guides/uk` section + FAQ “Why does the spec table print CE range…”; drone transmission rows (e.g. Mini 5 Pro “10 km CE · O4+ (20 km FCC)”) | Could use a **standalone short explainer** or tighter news cluster for citation without reading a full guide; keep hub 1.7× tied to a cited method |
| UK class / 250 g / Plus packs | First-class columns + FAQs on every sampled drone/compare; Mini 5 Pro title/meta call out C0 | Keep battery-SKU → class mapping visible wherever it changes the answer |
| Unmarked legacy vs C-class | Mini 2 vs Mini 4K compare is the showcase; news `/news/unmarked-a1-a3` | More “unmarked A1/A3” internal links from news into compares + guide |
| Remote ID timeline | Guide + news (`remote-id-eight-months`, `eu-c-class-until-2028`) | Ensure Air/Mavic FAQs surface 2026 vs Mini/Neo 2028 split where relevant |
| Sourcing hygiene | Access dates, blank vs guessed EAN, “not legal advice” | About/sourcing policy page would let AI/overview systems attribute the method |

**Do not invent** FCC/CE multipliers or legal outcomes beyond what CAA/DJI pages support; hub’s “1.7×” average should stay tied to a cited method if used in SERP/AEO copy.

---

## Top pick for a brief

**Lead with a “Compare discovery + UK pillar + schema” sprint:** (1) ship a real **`/compare` hub** that elevates near-peer sheets; (2) treat **`/guides/uk`** as the citabler CE/UK authority URL and deepen FAQ/TOC/last-reviewed; (3) add **Product/Offer/Breadcrumb + home Organization** schema so the specs you already publish are machine-readable. That sequence monetizes the differentiator you already wrote, without inventing a new content factory.

**Secondary:** fix sitemap UA 500 + lastmod honesty; deepen `/for/*`; add About; sync iqlabs work-page counts.

---

## Notes / caveats

- **Re-audit date:** 2026-09-14. Catalog counts and prices are **as observed** from sitemap and SSR pages; they may change on rebuild.
- No Search Console, analytics, or ranking data used.
- WebFetch 500 on sitemap is **not** proof the file is missing — curl retrieved it successfully (same pattern as prior pass).
- Approximate word counts are from HTML-stripped SSR bodies; they are relative thinness signals, not content-quality scores.
