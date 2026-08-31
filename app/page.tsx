import { HomeBench } from "@/components/HomeBench";
import { JsonLd } from "@/components/JsonLd";
import { drones } from "@/data/catalog";
import { featuredPairs } from "@/data/featured-matchups";
import { getDrone } from "@/data/catalog";
import { pairSlug, jsonLdWebPage, siteUrl } from "@/lib/seo";
import Link from "next/link";

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
            <li key={pairSlug(da, db)} className="py-3">
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
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm">
          <Link href="/drones" className="underline">
            Full catalog
          </Link>
        </p>
      </section>
    </div>
  );
}
