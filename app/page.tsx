import { DronePhoto } from "@/components/DronePhoto";
import { HomeBench } from "@/components/HomeBench";
import { JsonLd } from "@/components/JsonLd";
import { drones, getDrone } from "@/data/catalog";
import { featuredPairs } from "@/data/featured-matchups";
import { gearPairSlug } from "@/data/gear";
import { featuredGearResolved } from "@/lib/gear-compare";
import { pairSlug, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMeta({
  title: "DroneIQ — drone specs you can decide with",
  description:
    "Facts-first DJI comparison: sourced specs, CE not FCC, UK class, prices, and whether you would notice the difference.",
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const featured = featuredPairs
    .map(([a, b]) => {
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
      <HomeBench drones={drones} />

      <section className="mt-14">
        <h2 className="display text-2xl">The matchups people search</h2>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {featured.map(({ da, db }) => (
            <li key={pairSlug(da, db)} className="flex items-start gap-3 py-3 sm:items-center">
              <Link
                href={`/compare/${pairSlug(da, db)}`}
                className="flex shrink-0 gap-1"
              >
                <DronePhoto drone={da} variant="thumb" />
                <DronePhoto drone={db} variant="thumb" />
              </Link>
              <div className="min-w-0">
                <Link
                  href={`/compare/${pairSlug(da, db)}`}
                  className="text-lg hover:underline"
                >
                  {da.shortName} vs {db.shortName}
                </Link>
                <p className="text-sm text-muted">
                  {da.cameras[0].sensor} · {da.weightG} g against {db.cameras[0].sensor} ·{" "}
                  {db.weightG} g
                </p>
              </div>
            </li>
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
