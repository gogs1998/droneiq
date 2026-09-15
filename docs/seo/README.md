# SEO handoffs

Read in this order:

1. `iqlabs-audit-response-2026-09-15.md` — the working order. Opens with the
   Search Console and Page Indexing figures (2 of 399 indexed), diagnoses the
   link graph, and orders the work. Where it differs from Grok's handoff it says
   so and why.
2. `grok-recommendations-handoff-2026-09-14.md` — the detailed recommendations,
   with acceptance criteria per item. Rec 8 (hub inventory count) is already done.
3. `grok-audit-2026-09-14.md` — the observations behind the recommendations.

Two notes on reading them together: Grok's "WebFetch 500 on /sitemap.xml" is its
own fetcher — curl, python-requests and a Googlebot UA all return 200. And where
Grok's Rec 10 says prefer near-peer pairs over "exotic" ones, the IQ Labs response
says keep and link every pair: Neo vs Mavic 4 Pro is the upgrade path, not noise.

Source of truth for these files is the IQ Labs repo (`gogs1998/iqlabs`, under
`docs/` and `reports/seo/`); this is a copy placed here so the lane has them
without cloning a second repo.
