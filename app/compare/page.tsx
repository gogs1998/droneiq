import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { drones } from "@/data/catalog";
import { comparablePairs, gearPairSlug } from "@/data/gear";
import { hubDroneSections, hubGearSections, pairHref, type PairRef } from "@/lib/graph";
import {
  allCanonicalPairs,
  jsonLdBreadcrumb,
  jsonLdItemList,
  jsonLdWebPage,
  pageMeta,
  pairSlug,
  siteUrl,
} from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Compare DJI drones";
const DESC =
  "Every DroneIQ pair, grouped by line. CE range, UK class, and whether you would notice — not a flat wall of 314 URLs.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/compare",
});

export default function CompareHub() {
  const { featured, within, across } = hubDroneSections();
  const gearSections = hubGearSections();
  const dronePairs = allCanonicalPairs().length;
  const gearPairs = comparablePairs().length;
  const url = `${siteUrl()}/compare`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({ name: TITLE, description: DESC, url }),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
          ]),
          jsonLdItemList(
            featured.map((p) => ({
              slug: pairSlug(p.a, p.b),
              name: `${p.a.shortName} vs ${p.b.shortName}`,
            })),
            url,
            "/compare",
          ),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Compare" },
        ]}
      />
      <h1 className="display mt-3 text-4xl md:text-5xl">{TITLE}</h1>
      <p className="mt-4 max-w-2xl text-muted">
        {drones.length} aircraft, {dronePairs} drone pairs, {gearPairs} gear
        pairs. Specs with sources, CE range not FCC, UK class, and a
        plain-language verdict on whether you would notice.
      </p>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Featured sheets first. Then every pair, grouped by line — including
        Neo vs Mavic 4 Pro, which is the upgrade question, not noise.{" "}
        <Link href="/#bench" className="underline">
          Assemble your own
        </Link>
        {" · "}
        <Link href="/drones" className="underline">
          Catalog
        </Link>
      </p>

      <nav className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <a href="#featured" className="underline">
          Featured
        </a>
        {within.map(({ line }) => (
          <a key={line.id} href={`#${line.id}`} className="underline">
            {line.title}
          </a>
        ))}
        <a href="#across" className="underline">
          Across lines
        </a>
        <a href="#gear" className="underline">
          Gear
        </a>
      </nav>

      <section id="featured" className="mt-12 scroll-mt-6">
        <h2 className="display text-2xl">Featured sheets</h2>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {featured.map((p) => (
            <li key={pairSlug(p.a, p.b)} className="py-3">
              <Link href={pairHref(p.a, p.b)} className="text-lg hover:underline">
                {p.a.shortName} vs {p.b.shortName}
              </Link>
              {p.lede ? <p className="mt-1 text-sm text-muted">{p.lede}</p> : null}
            </li>
          ))}
        </ul>
      </section>

      {within.map(({ line, pairs }) => (
        <section key={line.id} id={line.id} className="mt-12 scroll-mt-6">
          <h2 className="display text-2xl">Within {line.title}</h2>
          <PairList pairs={pairs} />
        </section>
      ))}

      <section id="across" className="mt-12 scroll-mt-6">
        <h2 className="display text-2xl">Across lines</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Grouped under the cheaper airframe’s line. Neo vs Mavic 4 Pro lives
          here on purpose.
        </p>
        {across.map(({ line, pairs }) => (
          <div key={line.id} className="mt-8">
            <h3 className="text-sm uppercase tracking-wider text-quiet">
              From {line.title}
            </h3>
            <PairList pairs={pairs} />
          </div>
        ))}
      </section>

      <section id="gear" className="mt-12 scroll-mt-6">
        <h2 className="display text-2xl">Gear</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Controllers and headsets only — batteries and ND are not compared
          head to head.{" "}
          <Link href="/gear" className="underline">
            Compatibility matrix
          </Link>
        </p>
        {gearSections.map((s) => (
          <div key={s.group} className="mt-8">
            <h3 className="text-sm uppercase tracking-wider text-quiet">{s.title}</h3>
            <ul className="mt-3 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
              {s.pairs.map(([a, b]) => (
                <li key={gearPairSlug(a, b)} className="break-inside-avoid py-0.5 text-sm">
                  <Link href={`/compare/${gearPairSlug(a, b)}`} className="hover:underline">
                    {a.shortName} vs {b.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

function PairList({ pairs }: { pairs: PairRef[] }) {
  return (
    <ul className="mt-3 columns-1 gap-x-8 sm:columns-2 lg:columns-3">
      {pairs.map((p) => (
        <li key={`${p.a.slug}-vs-${p.b.slug}`} className="break-inside-avoid py-0.5 text-sm">
          <Link href={pairHref(p.a, p.b)} className="hover:underline">
            {p.a.shortName} vs {p.b.shortName}
          </Link>
        </li>
      ))}
    </ul>
  );
}
