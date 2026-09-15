# DroneIQ recommendations — handoff for DroneIQ Claude

**RE-AUDIT handoff:** 2026-09-14 (fresh pass; overwrites prior handoff)  
**From:** SEO & AEO Desk (IQ Labs)  
**For:** Gordon Shepherd → pass to DroneIQ Claude  
**Site:** https://droneiq.pro  
**Hub:** https://iqlabs.app · https://iqlabs.app/work/droneiq  
**Source audit:** `/workspace/droneiq-audit.md` (same session, re-audit 2026-09-14)

## How to use this

Implement or plan in **executive order** below. Do **not** invent search volume, difficulty, rankings, clicks, or CTR. On-page figures (catalog size, prices, dates) were observed at audit time — **re-read live pages** before hard-coding numbers into copy or hub blurbs.

**Product truth (do not soften):** DroneIQ prints **CE** transmission range (not FCC), states **UK class / Flyer ID / Operator ID / Remote ID** next to weight, sources every figure with an access date, and answers whether a buyer would **notice** the difference. It is **not** legal advice. Prices are dated UK snapshots, not live APIs.

**Observed inventory (re-audit):** sitemap **398** URLs · **23** drones · **35** gear · **314** compares · **14** news · **5** for/{job} · **2** guides. `/compare` still **404**. WebFetch still **500** on sitemap (curl **200**). Hub work page still claims **16 / 120**.

---

## Executive order of work

| Phase | Focus | Recs |
|-------|--------|------|
| **Discovery & machines** | Compare hub + schema + sitemap health | #1, #2, #4 |
| **Differentiator pillar** | CE/UK guide as citabler authority | #3 |
| **Trust & depth** | About; deepen `/for/*`; hub count sync | #5, #6, #8 |
| **Optional** | News FAQ cluster; llms.txt; OG / link curation | #7, #9, #10 |

---

## Rec 1 — P0: `/compare` hub (discovery for the main asset)

### Problem (observed 2026-09-14)
- **314** `/compare/{a}-vs-{b}` URLs in sitemap; **`/compare` returns 404** (`noindex` soft 404).
- Discovery today = homepage “Open a sheet” + “More matchups people search” + in-page links + sitemap. Non-featured pairs are easy to orphan.
- No navigational landing for “compare DJI drones” intent.
- Reverse slugs already **308** to canonical (keep that discipline).

### Goal
One indexable hub that helps humans and crawlers reach **high-intent near-peer** compares first, without treating every exotic pair as equal.

### Build
1. Ship **`/compare`** (200) with:
   - H1 e.g. `Compare DJI drones`
   - One extractable sentence: what DroneIQ compares (CE range, UK class, noticeability).
   - **Featured sheets** (curated — mirror or extend homepage set: Mini 2 vs Mini 4K, Mini 4 Pro vs Mini 5 Pro, Air 3 vs Air 3S, etc.).
   - **Browse by family:** Mini / Air / Mavic / FPV / Gear (controllers & goggles).
   - CTA to home `#bench` / “I fly” assembler.
2. Add `/compare` to nav + footer + sitemap (priority sensible vs homepage).
3. From each `/drones/{slug}`, keep “vs” links but ensure the hub is linked (“All compares”).
4. Do **not** auto-list all 314 as a flat equal wall unless paginated/filtered; curation is the product.

### Acceptance
- [ ] `https://droneiq.pro/compare` returns **200** with unique title/meta/H1.
- [ ] Hub links to featured near-peer compares + family browse.
- [ ] Listed in sitemap + primary nav/footer.
- [ ] Still no reverse-pair duplicate URLs (308 canonicalization remains).

### Out of scope
Deleting long-tail compare URLs; inventing new aircraft.

---

## Rec 2 — P0: Product / Offer / Breadcrumb schema (+ home Organization)

### Problem
- Drone pages publish RRP, brand, specs, UK class — but JSON-LD is only **`WebPage` + `FAQPage`** (Mini 5 Pro verified: FAQ ×3, no Product).
- No **`Product`**, **`Offer`**, **`Brand`**, or **`BreadcrumbList`** on sampled drones.
- Home: `WebPage`/`WebSite` only — no top-level **Organization** with `sameAs` → iqlabs.app (news already authors as IQ Labs Organization).

### Goal
Machine-readable parity with the SSR content you already trust enough to show humans.

### Build
1. On `/drones/{slug}`:
   - `Product` (name, brand DJI, description from meta, image if available).
   - `Offer` only when a real dated UK price exists (DJI Store RRP etc.) — **priceValidUntil / priceCurrency=GBP**; omit Offer rather than invent.
   - Keep existing `FAQPage`.
   - `BreadcrumbList`: Home → Drones → {Model}.
2. On home (and optionally sitewide footer graph): `Organization` name DroneIQ, url, `sameAs`: `https://iqlabs.app` (and work page if stable).
3. Optional: `ItemList` of featured compares on `/compare` hub once Rec 1 ships.
4. Validate with a schema tester after deploy; fix parse errors only — do not add AggregateRating unless you have a real reviewed rating system (today: third-party review *digest*, not DroneIQ stars).

### Acceptance
- [ ] Sample drone (e.g. Mini 5 Pro) shows Product + FAQPage (+ Offer if RRP present).
- [ ] Breadcrumbs match visible hierarchy.
- [ ] Home Organization points at iqlabs.app.
- [ ] No fake aggregate ratings.

### Out of scope
Merchant center feeds; inventing review stars.

---

## Rec 3 — P0: Harden `/guides/uk` as CE / UK class pillar

### Problem
- Differentiator is scattered across meta, spec rows, FAQs, news, and the guide.
- Guide is already strong (~706 words; FAQPage ×4 covering Flyer ID, 250 g, Remote ID, why CE) but needs to be the **one URL** answer engines cite for UK Open + CE vs FCC.
- No visible last-reviewed date / TOC in SSR sampled this pass.

### Goal
`/guides/uk` answers, in extractable prose: Flyer/Operator ID thresholds, C/UK class mapping through 2027/2028, A1/A2/A3, Remote ID dates, why tables print CE, Plus-battery class traps.

### Build
1. Add **last reviewed** date (data-bound when rules/pages are re-checked).
2. Visible **TOC** + keep/expand FAQPage (already 4 Qs — add only if answers exist in product truth):
   - When do Minis need Remote ID vs Air/Mavic?
   - What happens if I fit a Plus battery to a C0 Mini 5 Pro?
   - Unmarked Mini 2 vs C0 Mini 4K — same A1?
3. Cross-link: every drone FAQ “Longer version” already points here — ensure news law pieces (`eu-c-class-until-2028`, `unmarked-a1-a3`, `remote-id-eight-months`, `flyer-id-100g`) link **up** to the guide and to 1–2 exemplar compares.
4. Optional short subsection or sibling page: **“Why CE range, not FCC”** — one screen, linked from transmission `i` explainers.
5. Do not invent menu steps for Remote ID setup (guide already refuses this — keep that discipline).

### Acceptance
- [ ] Guide has clear last-reviewed + TOC.
- [ ] FAQ remains accurate to CAA/DJI sources cited.
- [ ] Law news and drone FAQs converge on this URL.
- [ ] Still labelled not legal advice.

### Out of scope
Solicitor-grade advice; US FAA Remote ID deep-dives as primary.

---

## Rec 4 — P1: Sitemap reliability + honest `lastmod`

### Problem
- WebFetch returned **500** on `/sitemap.xml` (reconfirmed 2026-09-14); curl returned **200** with 398 URLs (`application/xml`). Curl with Googlebot/GPTBot UAs also 200 — failure is fetcher-path specific, still a real gap for some stacks.
- Almost all `lastmod` values frozen at **2026-09-01T20:25:11.242Z** (384) or **2026-09-01** (14 news).

### Goal
Every serious fetcher can retrieve the sitemap; dates reflect real updates.

### Build
1. Reproduce 500 with the WebFetch/non-browser path; fix Vercel/route so sitemap always 200 (`application/xml` / `text/xml`).
2. Set `lastmod` from real content change (news publish, price board refresh, spec source re-read) — not one build timestamp for all.
3. Keep robots `Sitemap:` pointer; `Host:` line optional/harmless.
4. When `/compare` hub and About ship, include them in the urlset.

### Acceptance
- [ ] `/sitemap.xml` 200 via curl **and** a non-browser fetch path that previously 500’d.
- [ ] News (and other changed pages) show newer lastmod than untouched archives after an update.
- [ ] URL count matches public indexable set (or documented exclusions).

---

## Rec 5 — P1: Deepen `/for/{job}` shortlists

### Problem
- Approx words this pass: `/for/fpv` ~222, `/for/wind` ~301, `/for/dusk` ~319, `/for/beginner` ~309, `/for/travel` ~422 — thin vs drone/compare ~1.4–1.5k.
- Risk: “best for X” pages without the sourced density that makes DroneIQ trustworthy.

### Goal
Each job page leads with one extractable pick sentence, then UK-class/weight constraints, then links into catalog/compare — same data, not lifestyle fluff.

### Build (per `/for/beginner`, `travel`, `wind`, `dusk`, `fpv`)
1. Opening answer sentence (who should buy what **and why** in CE/UK terms).
2. Short table or cards: model · weight · class · sensor · CE range · RRP snapshot date.
3. Links to 2–4 compares + `/guides/uk` where legality is the constraint (travel/city → sub-250 g / A1).
4. Keep ItemList schema accurate to visible list.

### Acceptance
- [ ] Each job page has an above-the-fold extractable answer.
- [ ] Sourced fields, not adjective stacks.
- [ ] Strong internal links to drones/compares/guide.

---

## Rec 6 — P1: About + basic trust pages

### Problem
- `/about`, `/privacy`, `/terms` → **404**.
- Site gives UK legal-adjacent guidance with only a footer disclaimer.

### Goal
A human-readable About (who / sourcing rules / not legal advice / IQ Labs) plus minimum privacy/terms if you collect nothing sensitive — still state it.

### Build
1. `/about` — Gordon / IQ Labs, method (primary sources + access dates), CE/UK stance, contact as on hub, link to iqlabs.app.
2. `/privacy`, `/terms` — lightweight, accurate to actual data practices (Cloudflare beacon noted in chrome; “I fly” is browser-local).
3. Footer links; Organization schema `sameAs` alignment.

### Acceptance
- [ ] About 200 with sourcing policy in plain prose.
- [ ] Privacy/Terms present and linked.
- [ ] Disclaimer tone unchanged (not legal advice).

---

## Rec 7 — P2: News as pillar cluster (not volume chase)

### Problem
- **14** solid primary-source stories; good quality, finite velocity.
- Articles use `NewsArticle` but little FAQ clustering back to `/guides/uk`.

### Build
1. On evergreen law pieces, add 2–3 FAQ visible + schema **only if** Q&A is on-page.
2. End of article: “Related on DroneIQ” → guide + 1 compare + 1 drone.
3. Prefer updating dated snapshots / law explainers over thin product rumour.

### Acceptance
- [ ] Law articles link up to `/guides/uk`.
- [ ] No FAQ schema without visible FAQ.

---

## Rec 8 — P2: Sync IQ Labs hub work page inventory

### Problem
- https://iqlabs.app/work/droneiq claims **“Sixteen DJI aircraft across 120 head-to-head comparison pages”**.
- Live sitemap (2026-09-14): **23** drones, **314** compares.

### Goal
Hub copy matches production so portfolio/AEO citations don’t understate (or misstate) the product.

### Build
1. Update aircraft + compare counts from the same source of truth as the sitemap.
2. Keep CE 1.7× claim only if method/citation still supported — don’t inflate.

### Acceptance
- [ ] Work page counts ≈ live catalog.
- [ ] CE/UK thesis paragraph remains accurate.

---

## Rec 9 — P3: Optional `llms.txt`

### Problem
- `/llms.txt` → 404.

### Build
If you want answer-engine hints: short file pointing at `/guides/uk`, `/drones`, `/compare` (once live), sourcing/About, and 3–5 featured compares. No keyword stuffing.

### Acceptance
- [ ] 200 at `/llms.txt` with accurate absolute URLs only.

---

## Rec 10 — P2: Internal-link curation (near-peer > exotic)

### Problem
- Cross-category compares (e.g. Neo vs Mavic 4 Pro) are full SSR pages; fine in sitemap, weak as equal homepage citizens.

### Build
1. Homepage + `/compare` hub + drone “vs” modules prefer **same-family / upgrade-path** pairs.
2. Leave long-tail URLs live; don’t promote them equally.

### Acceptance
- [ ] Featured lists are mostly near-peer / real buyer dilemmas.
- [ ] No mass noindex unless you have a documented quality reason (prefer curation over blanket noindex).

---

## Do-nots

1. **Do not invent** SEO metrics (volume, KD, positions, CTR, traffic).
2. **Do not invent** specs, CE/FCC numbers, class marks, prices, or EANs — blank/omit beats guessing (existing house rule).
3. **Do not** present content as legal advice; keep CAA disclaimer.
4. **Do not** add `AggregateRating` / review stars unless DroneIQ itself runs a real rating system (third-party digest ≠ stars).
5. **Do not** soft-pedal CE vs FCC or UK class — that is the product.
6. **Do not** ship `/compare` as an unfiltered dump of all pairs without UX curation.
7. **Do not** “fix” sitemap discovery by stuffing query-param filter URLs into the sitemap unless those URLs are canonical, SSR, and uniquely valuable.
8. **Do not** copy hub’s stale 16/120 figures into on-site marketing.
9. **Do not** reverse-duplicate compare slugs (`a-vs-b` and `b-vs-a`); keep 308 consolidation.
10. **Do not** claim flight tests DroneIQ did not perform (news already states this — keep it).

---

## Reference URLs (re-audit sample)

| Role | URL |
|------|-----|
| Home | https://droneiq.pro/ |
| Robots | https://droneiq.pro/robots.txt |
| Sitemap | https://droneiq.pro/sitemap.xml |
| Drones index | https://droneiq.pro/drones |
| Gear | https://droneiq.pro/gear |
| News | https://droneiq.pro/news |
| Compare (missing) | https://droneiq.pro/compare |
| UK guide | https://droneiq.pro/guides/uk |
| Buying used | https://droneiq.pro/guides/buying-used |
| For hub | https://droneiq.pro/for |
| Sample drone | https://droneiq.pro/drones/mini-5-pro |
| Sample drone | https://droneiq.pro/drones/mini-4k |
| Sample compare | https://droneiq.pro/compare/mini-2-vs-mini-4k |
| Sample compare | https://droneiq.pro/compare/mini-4-pro-vs-mini-5-pro |
| Law news | https://droneiq.pro/news/eu-c-class-until-2028 |
| IQ Labs hub | https://iqlabs.app |
| Work blurb | https://iqlabs.app/work/droneiq |

---

## Suggested first merge (smallest useful slice)

1. `/compare` hub (Rec 1)  
2. Product + Breadcrumb JSON-LD on drone template (Rec 2)  
3. Guide last-reviewed + TOC + Remote ID / Plus-battery FAQ if accurate (Rec 3)  

Then sitemap UA fix (Rec 4) in the same release if cheap.

---

## Top 3 gaps (for parent brief)

1. **`/compare` hub missing (404)** while 314 pairwise compares are the main asset.  
2. **Schema lag:** no Product/Offer/Breadcrumb on drones; no home Organization.  
3. **CE/UK pillar under-hardened** as a single citabler URL (guide strong but needs last-reviewed/TOC + news/FAQ convergence) — compounded by thin `/for/*` and stale hub 16/120 counts.

**Top pick:** Ship `/compare` hub + Product/Breadcrumb schema + harden `/guides/uk` in one sprint (Recs 1–3).
