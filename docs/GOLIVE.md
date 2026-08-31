# DroneIQ — going live on droneiq.iqlabs.app

Hand this to whoever is building it.

**The domain is `droneiq.iqlabs.app`.** Not a new registration — `droneiq.app`,
`.com`, `.co.uk` and `.uk` are all taken by other people, so a subdomain is the
route rather than a compromise. If DroneIQ later earns a domain of its own, it
can move then.

---

## What I need from you (one line)

**Where is it deployed?** That is the only blocker. Two options:

### If Vercel (recommended — matches the hub)

1. Deploy the project to Vercel
2. In the Vercel project → Settings → Domains → add `droneiq.iqlabs.app`
3. Tell me, and I add this on Cloudflare:

       CNAME  droneiq  ->  cname.vercel-dns.com   (DNS-only / grey cloud)

**It must be grey cloud.** Proxying Vercel through Cloudflare breaks certificate
issuance — that is why `iqlabs.app`, `aircraftiq.app` and three others are all
DNS-only. Do not turn the orange cloud on.

### If Cloudflare Pages

1. Deploy, note the `<project>.pages.dev` hostname
2. Add `droneiq.iqlabs.app` in the Pages project → Custom domains
3. Tell me the hostname, and I add:

       CNAME  droneiq  ->  <project>.pages.dev    (proxied / orange cloud)

Either way it is about two minutes once I know which.

---

## What you get for free by being on iqlabs.app

**Search Console is already covered.** `iqlabs.app` is verified as a *Domain
property*, which includes every subdomain. No verification step, no DNS TXT, no
waiting. Data starts collecting as soon as Google finds the site.

That is the whole argument for subdomains over new domains, and it has just paid
off for the first time.

---

## Ship these from day one — they are not retrofits

3DIQ launched with all of these and reached position 28 within two days.
AircraftIQ launched without them, spent months with 4,592 pages telling Google
they were duplicates of the homepage, and is still at position 73 recovering.
Same shape of site, opposite outcome, and the only difference is this list.

1. **Server-render everything.** Static generation preferred. A crawler must see
   real content with JavaScript disabled.
2. **Per-page self-referencing canonical.** Absolute URL. Never point it at the
   homepage — that is the exact bug that cost AircraftIQ months.
3. **Unique `<title>` and meta description per page.** Not one template repeated.
4. **`sitemap.xml` listing every page**, referenced from `robots.txt`.
5. **`og:image` per page** — absolute URL, 1200x630, PNG or JPG. **Not SVG**:
   Facebook, LinkedIn and most scrapers will not render it, so the link preview
   stays blank even though the tag is present. FightIQ shipped an SVG and that is
   still outstanding.
6. **Structured data that matches what the page is.** Do not reach for a type
   that implies commerce. AircraftIQ used `Vehicle`, which is a subtype of
   `Product`, and Google now demands a price or a rating it will never have.
7. **Footer link on every page:**

       <a href="https://iqlabs.app">An IQ Labs product</a>

   Fifteen of nineteen products still omit this, which is why the hub has almost
   no authority. Do not be the sixteenth.

8. **Analytics beacon.** Because `iqlabs.app` is DNS-only, Cloudflare cannot
   inject it at the edge — it has to be in the HTML. Tell me when you are ready
   and I will create the Web Analytics site and send the snippet.

---

## Two flags

**The repo is public.** Fine as it stands. But drone work tends to accumulate
flight logs, GPS traces, operator details and client sites — all of which are
personally identifying and location-revealing, and none of which should ever land
in a public repository. Decide the boundary before there is data, not after.

**If it touches UK drone regulation**, be careful about stating rules as fact.
CAA requirements change, and an out-of-date flight-restriction claim presented
confidently is worse than no claim. The house rule applies: name the source and
the date it was read, and say when the data is thin rather than filling the gap.

---

## Once it is live

Tell me and I will, in one pass:

- add the DNS record
- create the Web Analytics site and give you the beacon
- capture desktop and mobile screenshots
- add it to the register at `iqlabs.app` with an OG card
- run the SEO audit against it
- submit its sitemap to Search Console

That is roughly ten minutes of my time and none of yours.
