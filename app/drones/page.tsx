import { DronePhoto } from "@/components/DronePhoto";
import { JsonLd } from "@/components/JsonLd";
import { drones } from "@/data/catalog";
import { gbp } from "@/lib/compare";
import { jsonLdItemList, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "All drones",
  description:
    "DJI consumer drones with sourced weight, sensor, UK class and RRP. Filter by sub-250 g, telephoto, sensing and price.",
  path: "/drones",
});

type Props = {
  searchParams: Promise<{ maxg?: string; tele?: string; omni?: string; maxgbp?: string }>;
};

export default async function DronesIndex({ searchParams }: Props) {
  const q = await searchParams;
  let list = drones;
  if (q.maxg === "250") list = list.filter((d) => d.sub250);
  if (q.tele === "1") list = list.filter((d) => d.cameras.length > 1 && d.series !== "avata");
  if (q.omni === "1")
    list = list.filter((d) => d.sensing === "omni" || d.sensing === "omni-nightscape");
  if (q.maxgbp) {
    const cap = Number(q.maxgbp);
    if (!Number.isNaN(cap))
      list = list.filter((d) => d.prices.djiRrpGbp != null && d.prices.djiRrpGbp <= cap);
  }

  const chip = (href: string, label: string, on: boolean) => (
    <Link
      href={href}
      className={`border px-2 py-1 text-sm ${on ? "border-ink bg-ink text-paper" : "border-rule"}`}
    >
      {label}
    </Link>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: "All drones",
            description:
              "DJI consumer drones with sourced weight, sensor, UK class and RRP.",
            url: `${siteUrl()}/drones`,
          }),
          jsonLdItemList(list, `${siteUrl()}/drones`),
        ]}
      />
      <h1 className="display text-4xl">Drones</h1>
      <p className="mt-2 max-w-xl text-muted">
        {list.length} of {drones.length} in the catalog. Filters are shareable
        URLs, not a quiz.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        {chip("/drones", "All", !q.maxg && !q.tele && !q.omni && !q.maxgbp)}
        {chip("/drones?maxg=250", "Sub-250 g", q.maxg === "250")}
        {chip("/drones?tele=1", "Telephoto", q.tele === "1")}
        {chip("/drones?omni=1", "Omnidirectional sensing", q.omni === "1")}
        {chip("/drones?maxgbp=500", "Under £500 RRP", q.maxgbp === "500")}
        {chip("/drones?maxgbp=1000", "Under £1,000", q.maxgbp === "1000")}
        {chip("/drones?maxgbp=2000", "Under £2,000", q.maxgbp === "2000")}
      </div>
      <ul className="mt-8 divide-y divide-rule border-y border-rule">
        {list.map((d) => (
          <li key={d.slug} className="flex items-start gap-3 py-3 sm:items-center sm:gap-4 sm:py-4">
            <Link href={`/drones/${d.slug}`} className="shrink-0">
              <DronePhoto drone={d} variant="thumb" />
            </Link>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <Link href={`/drones/${d.slug}`} className="display text-xl hover:underline sm:text-2xl">
                  {d.name}
                </Link>
                <div className="num text-base sm:text-lg">{gbp(d.prices.djiRrpGbp)}</div>
              </div>
              <p className="num mt-1 text-sm text-muted">
                {d.weightG} g · {d.ukClass} · {d.cameras[0].sensor} · {d.cameras[0].maxVideo}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
