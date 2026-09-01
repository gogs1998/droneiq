import { HomeBench } from "@/components/HomeBench";
import { JsonLd } from "@/components/JsonLd";
import { MatchupRow } from "@/components/MatchupRow";
import { drones, getDrone } from "@/data/catalog";
import { featuredPairs, homeSheetKeys, homeSheets, pairKey } from "@/data/featured-matchups";
import { gearPairSlug } from "@/data/gear";
import { featuredGearResolved } from "@/lib/gear-compare";
import { jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({
  title: "DroneIQ — drone specs you can decide with",
  description:
    "Facts-first DJI comparison: sourced specs, CE not FCC, UK class, prices, and whether you would notice the difference.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const sheets = homeSheets
    .map((s) => {
      const da = getDrone(s.a);
      const db = getDrone(s.b);
      if (!da || !db) return null;
      return { da, db, lede: s.lede };
    })
    .filter((x): x is { da: NonNullable<typeof x>["da"]; db: NonNullable<typeof x>["db"]; lede: string } =>
      Boolean(x),
    );

  const more = featuredPairs
    .map(([a, b]) => {
      if (homeSheetKeys.has(pairKey(a, b))) return null;
      const da = getDrone(a);
      const db = getDrone(b);
      if (!da || !db) return null;
      return { da, db };
    })
    .filter((x): x is { da: NonNullable<typeof x>["da"]; db: NonNullable<typeof x>["db"] } =>
      Boolean(x),
    );

  const featuredGear = featuredGearResolved();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={jsonLdWebPage({
          name: "DroneIQ",
          description:
            "Compare DJI drones with sourced specs, UK class, CE range and a verdict on whether you would notice.",
          url: siteUrl(),
        })}
      />

      <p className="text-xs uppercase tracking-wider text-quiet">The sheets</p>
      <h1 className="display mt-2 max-w-xl text-3xl leading-none md:text-5xl">
        Compare drones by the numbers you would actually notice.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Specs with sources, CE range not FCC, UK class, and a plain-language
        verdict. Not another video essay.
      </p>

      <section className="mt-10">
        <h2 className="text-xs uppercase tracking-wider text-quiet">Open a sheet</h2>
        <ul className="mt-3 divide-y divide-rule border-y border-rule">
          {sheets.map(({ da, db, lede }, i) => (
            <MatchupRow
              key={`${da.slug}-${db.slug}`}
              da={da}
              db={db}
              lede={lede}
              prominent
              priority={i < 2}
            />
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/drones" className="underline">
            Full catalog
          </Link>
          {" · "}
          <Link href="/for" className="underline">
            Pick by job
          </Link>
          {" · "}
          <Link href="/#bench" className="underline">
            Assemble your own
          </Link>
        </p>
      </section>

      <div className="mt-12">
        <HomeBench drones={drones} />
      </div>

      <section className="mt-14">
        <h2 className="display text-2xl">More matchups people search</h2>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {more.map(({ da, db }) => (
            <MatchupRow key={`${da.slug}-${db.slug}`} da={da} db={db} />
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/drones" className="underline">
            Full catalog
          </Link>
          {" · "}
          <Link href="/gear" className="underline">
            Controllers and headsets
          </Link>
        </p>
      </section>

      <section className="mt-14">
        <h2 className="display text-2xl">Controllers and headsets</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Same bench, for the stick and the glass. Compatibility is the fact.
        </p>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {featuredGear.map(({ a, b }) => (
            <li key={gearPairSlug(a, b)} className="py-3">
              <Link
                href={`/compare/${gearPairSlug(a, b)}`}
                className="text-lg hover:underline"
              >
                {a.shortName} vs {b.shortName}
              </Link>
              <p className="text-sm text-muted">
                {a.form} · {a.transmission} against {b.form} · {b.transmission}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/gear" className="underline">
            Compatibility matrix
          </Link>
        </p>
      </section>
    </div>
  );
}
