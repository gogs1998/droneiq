# droneiq.pro — the audit, and why 2 of 399 pages are indexed

IQ Labs, 15 September 2026. Response to Grok's audit and handoff in this repo at
`reports/seo/grok-2026-09-14/droneiq-audit.md` and
`droneiq-recommendations-handoff.md`. Its observations were re-measured before this
was written; they hold. Treat it as the primary source. This document adds the
indexing data it did not have, and reorders.

## Where the site is

Search Console, 28 days to 12 September:

    clicks 3    impressions 44    CTR 6.8%    position 5.0    queries 2

    droneiq        2 clicks / 30 impressions
    drone iq       1 / 6

**Best CTR in the estate, and it ranks for its own name and nothing else.** Two
queries. The page indexing report explains why:

    indexed                           2
    discovered - currently not indexed  397

Google knows 399 URLs and has fetched two of them. Every comparison, every drone
page, every guide - unfetched.

## Why: the AircraftIQ diagnosis at one-twelfth the scale

    23 drones  x  22  /  2  =  253 drone-vs-drone comparison pages

That is the full grid. Add 61 gear pairs and it is 314 comparisons on a 398-URL
site. Then the link graph, measured from the raw HTML:

    homepage            45 internal links, 27 to comparisons (the featured set)
    /drones index       34 links, 0 to comparisons
    a drone page        23 links, 4 to its comparisons - of the 22 it appears in
    a comparison page   20 links, 3 to other comparisons
    /compare hub        404

Roughly 160 of the 253 comparisons are reachable only from the sitemap. On a young
domain where Google allocates a few dozen fetches, sitemap-only URLs sit at the back
of the queue and stay there. This is exactly `docs/aircraftiq-link-graph.md`, and
AircraftIQ's position moved for the first time in a month the week after its graph
was built.

The pages themselves are good - Grok measured ~1.4k words on drone pages and
~1.5k on comparisons, SSR, unique titles, correct canonicals, reverse slugs 308'd.
Nothing about the content is the problem. The site is invisible because nothing
leads to it.

## Verified from the audit

    /compare hub                      404
    Product / Offer / Brand / Breadcrumb  none on drone pages (WebPage + FAQPage only)
    Organization on the homepage      none
    sitemap lastmod                   2 distinct values across 398 URLs - build-stamped
    /about                            404
    titles over 60                    9 of 12 sampled
    real 404s, www -> apex            both correct already

The hub's inventory claim - "sixteen aircraft, 120 comparisons" - was stale and was
ours; corrected today to 23 / 35 / 314.

## The order

### 1. Keep the grid — this is not MobileIQ

The first draft of this document proposed an inclusion rule like MobileIQ's.
That was wrong for this market, and Gordon caught it.

Phone buyers do not cross-shop an £879 Galaxy against a £1,999 foldable. Drone
buyers routinely do the equivalent: start on a Neo or a Mini 2 because it is cheap
and under 250 g, then ask what a Mavic 4 Pro would actually give them. "Neo vs
Mavic 4 Pro" is the normal upgrade question, not a nonsense pair. Grok's audit
called it a page that dilutes focus; in this market it is a page with a buyer.

With 23 drones the grid is 253 pages, which is small. MobileIQ's problem was 861
and AircraftIQ's was 10.8 million; 253 is fine. **Keep every pair.** The problem is
not that they exist, it is that 160 of them cannot be reached.

### 2. Build the graph so every page has a path

    /compare hub                every pair, grouped by line - Grok's Rec 1
    /drones index               links each drone's comparisons
    each drone page             all 22 of its comparisons, not four of them,
                                grouped: same line / lighter and cheaper /
                                heavier and dearer - which is the upgrade question
    each comparison             both drone pages, and the adjacent pairs

Target: no page more than two hops from the homepage.

### 2a. The upgrade family — the page this market is actually asking for

`/upgrade/from-neo/`, `/upgrade/from-mini-2/`: what you would gain moving to each
dearer drone, in the figures the site already holds - range on CE firmware,
weight class and what it changes legally, sensor, flight time, price. MobileIQ
built this family last week (`src/lib/upgrade.ts`, `/upgrade/from-{slug}/`) and it
is the surface its Search Console is starting to reward. On DroneIQ it is the
native shape of the buyer's question, and it links every cheap drone to every
dear one by design.

Items 2 and 2a together are the whole fix for 397 discovered-not-crawled.
Everything below is worth doing and none of it matters until they do.

### 3. Schema — Grok's Rec 2, unchanged

`Product` with `Brand` and `Offer` where a dated UK RRP exists (the site already
states them as dated snapshots - `priceValidUntil` makes that honest in markup),
`BreadcrumbList` on every template, `Organization` on the homepage with `sameAs`
to iqlabs.app. The content already supports all of it; the markup lags.

### 4. Sitemap lastmod per record

Two distinct dates across 398 URLs. The site keeps read-dates per figure; the
sitemap should carry the newest one per page. Same fix AircraftIQ shipped from its
batch archive.

### 5. Titles, and /about

Nine of twelve sampled titles over 60 characters; same template trim as every
other site. `/about` is a 404 on a site whose differentiator - CE not FCC, UK
class - is an argument that needs a person or at least a method behind it. Grok's
Rec 6.

### 6. Then the content Grok ranks P0 and I rank after the graph

`/guides/uk` as the CE / UK-class pillar (Rec 3) and the `/for/{job}` shortlists
deepened with sourced tables (Rec 5) are the right pages. They are worth more once
Google can reach them. Build the graph first, then make the pillar the thing it
points at.

## What to leave

Grok's Rec 7 (news as a pillar cluster) and the `llms.txt` - later. Fourteen news
articles on a site with two indexed pages is not where the constraint is.

## The scoreboard

    indexed pages     2 of 399, report dated 4 September
    next read         after the graph ships and the report refreshes; then two weeks

Position 5.0 on the brand query will not move and does not matter. The number
that matters is whether a query like "mini 4 pro vs mini 5 pro" ever produces an
impression, and it cannot until the page is fetched.
