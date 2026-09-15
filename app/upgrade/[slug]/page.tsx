import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { drones, getDrone } from "@/data/catalog";
import { flyCard, gbp } from "@/lib/compare";
import { pairHref } from "@/lib/graph";
import {
  jsonLdBreadcrumb,
  jsonLdWebPage,
  pageMeta,
  siteUrl,
} from "@/lib/seo";
import { droneFromUpgradeParam, upgradePath, upgradeRows } from "@/lib/upgrade";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return drones.map((d) => ({ slug: `from-${d.slug}` }));
}

function droneFromParams(param: string) {
  const slug = droneFromUpgradeParam(param);
  return slug ? getDrone(slug) : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = droneFromParams(slug);
  if (!d) return {};
  return pageMeta({
    title: `Upgrade from ${d.shortName}`,
    description: `What you would gain moving from ${d.name} to each dearer DJI in the catalog: CE range, UK class, sensor, flight time, dated UK RRP.`,
    path: upgradePath(d.slug),
  });
}

export default async function UpgradeFromPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const from = droneFromParams(slug);
  if (!from) notFound();
  const rows = upgradeRows(from);
  const url = `${siteUrl()}${upgradePath(from.slug)}`;
  const desc = `CE range, weight class, sensor, flight time and dated UK RRP against each dearer drone than ${from.shortName}. Not a review.`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: `Upgrade from ${from.shortName}`,
            description: desc,
            url,
          }),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Drones", path: "/drones" },
            { name: from.shortName, path: `/drones/${from.slug}` },
            { name: "Upgrade", path: upgradePath(from.slug) },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Drones", href: "/drones" },
          { name: from.shortName, href: `/drones/${from.slug}` },
          { name: "Upgrade" },
        ]}
      />
      <p className="mt-3 text-xs uppercase tracking-wider text-quiet">
        Upgrade path
      </p>
      <h1 className="display mt-2 text-3xl md:text-5xl">
        From {from.shortName}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">
        What the catalog already holds if you move to each dearer airframe:
        CE range, UK Open subcategory, sensor, lab flight time, dated UK RRP.
        Not legal advice.{" "}
        <Link href={`/drones/${from.slug}`} className="underline">
          {from.shortName} spec
        </Link>
        {" · "}
        <Link href="/compare" className="underline">
          All compares
        </Link>
      </p>

      {rows.length === 0 ? (
        <p className="mt-10 max-w-xl text-muted">
          Nothing in this catalog is dearer on UK RRP. Compare {from.shortName}{" "}
          with the rest of the line, or start from a cheaper airframe.
        </p>
      ) : (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[40rem] border-y border-rule text-left text-sm">
            <thead>
              <tr className="border-b border-rule text-xs uppercase tracking-wider text-quiet">
                <th className="py-2 pr-3 font-medium">Aircraft</th>
                <th className="py-2 pr-3 font-medium">CE km</th>
                <th className="py-2 pr-3 font-medium">Mass / class</th>
                <th className="py-2 pr-3 font-medium">Open</th>
                <th className="py-2 pr-3 font-medium">Sensor</th>
                <th className="py-2 pr-3 font-medium">Lab min</th>
                <th className="py-2 font-medium">UK RRP</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-rule bg-paper-2">
                <td className="py-2 pr-3">
                  <Link href={`/drones/${from.slug}`} className="hover:underline">
                    {from.shortName}
                  </Link>
                  <span className="text-quiet"> · now</span>
                </td>
                <td className="num py-2 pr-3">{from.rangeKmCe}</td>
                <td className="num py-2 pr-3">
                  {from.weightG} g · {from.ukClass}
                </td>
                <td className="py-2 pr-3">{flyCard(from).subcategory}</td>
                <td className="py-2 pr-3">{from.cameras[0]?.sensor}</td>
                <td className="num py-2 pr-3">{from.flightTimeMin}</td>
                <td className="num py-2">{gbp(from.prices.djiRrpGbp)}</td>
              </tr>
              {rows.map((r) => (
                <tr key={r.to.slug} className="border-b border-rule align-top">
                  <td className="py-2 pr-3">
                    <Link href={`/drones/${r.to.slug}`} className="hover:underline">
                      {r.to.shortName}
                    </Link>
                    <div className="mt-1 text-xs">
                      <Link href={pairHref(from, r.to)} className="underline">
                        vs {from.shortName}
                      </Link>
                    </div>
                  </td>
                  <td className="num py-2 pr-3">{delta(r.rangeKmCe.from, r.rangeKmCe.to)}</td>
                  <td className="py-2 pr-3">
                    <span className="num">
                      {r.weightG.to} g · {r.ukClass.to}
                    </span>
                    {r.weightG.to !== r.weightG.from ? (
                      <div className="text-xs text-muted">
                        {r.weightG.from} g now
                      </div>
                    ) : null}
                  </td>
                  <td className="py-2 pr-3">
                    {r.open.to}
                    {r.open.to !== r.open.from ? (
                      <div className="text-xs text-muted">{r.open.from} now</div>
                    ) : null}
                  </td>
                  <td className="py-2 pr-3">
                    {r.sensor.to}
                    {r.sensor.to !== r.sensor.from ? (
                      <div className="text-xs text-muted">{r.sensor.from} now</div>
                    ) : null}
                  </td>
                  <td className="num py-2 pr-3">{delta(r.flightTimeMin.from, r.flightTimeMin.to)}</td>
                  <td className="num py-2">{priceDelta(r.rrpGbp.from, r.rrpGbp.to)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-sm text-muted">
        Prices are dated UK DJI Store snapshots, not live ticks. CE kilometres
        are the radio figure this site prints; you still fly visual line of
        sight.{" "}
        <Link href="/guides/uk" className="underline">
          UK Open category
        </Link>
      </p>
    </div>
  );
}

function delta(from: number, to: number): string {
  if (from === to) return String(to);
  const sign = to > from ? "+" : "";
  return `${to} (${sign}${to - from})`;
}

function priceDelta(from: number | null, to: number | null): string {
  if (to == null) return "—";
  if (from == null || from === to) return gbp(to);
  const diff = to - from;
  const sign = diff > 0 ? "+" : "−";
  return `${gbp(to)} (${sign}£${Math.abs(diff)})`;
}
