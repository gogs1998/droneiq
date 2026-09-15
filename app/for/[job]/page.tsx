import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DronePhoto } from "@/components/DronePhoto";
import { JsonLd } from "@/components/JsonLd";
import { JOBS, dronesForJob, getDrone } from "@/data/catalog";
import { gbp, sensorSummary } from "@/lib/compare";
import { pairHref } from "@/lib/graph";
import {
  jsonLdBreadcrumb,
  jsonLdItemList,
  jsonLdWebPage,
  pageMeta,
  siteUrl,
} from "@/lib/seo";
import type { Job } from "@/data/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return JOBS.map((j) => ({ job: j.slug }));
}

const JOB_PAIRS: Record<Job, [string, string][]> = {
  travel: [
    ["mini-4-pro", "mini-5-pro"],
    ["mini-2", "mini-4k"],
    ["mini-4-pro", "air-3"],
  ],
  wind: [
    ["mini-4-pro", "air-3"],
    ["air-3", "air-3s"],
    ["air-3s", "mavic-4-pro"],
  ],
  dusk: [
    ["mini-4-pro", "mini-5-pro"],
    ["air-3", "air-3s"],
    ["mini-5-pro", "air-3s"],
  ],
  beginner: [
    ["neo-2", "flip"],
    ["mini-se", "mini-2"],
    ["mini-2", "mini-4k"],
  ],
  fpv: [
    ["fpv", "avata-2"],
    ["avata", "avata-2"],
    ["avata-2", "mini-5-pro"],
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ job: string }>;
}): Promise<Metadata> {
  const { job } = await params;
  const meta = JOBS.find((j) => j.slug === job);
  if (!meta) return {};
  return pageMeta({
    title: `Drones for ${meta.title.toLowerCase()}`,
    description: meta.lede,
    path: `/for/${meta.slug}`,
  });
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ job: string }>;
}) {
  const { job } = await params;
  const meta = JOBS.find((j) => j.slug === job);
  if (!meta) notFound();
  const list = dronesForJob(job as Job);
  const pairs = (JOB_PAIRS[job as Job] ?? [])
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
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: `Drones for ${meta.title}`,
            description: meta.lede,
            url: `${siteUrl()}/for/${meta.slug}`,
          }),
          jsonLdItemList(list, `${siteUrl()}/for/${meta.slug}`),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "For", path: "/for" },
            { name: meta.title, path: `/for/${meta.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "For", href: "/for" },
          { name: meta.title },
        ]}
      />
      <p className="mt-3 text-xs uppercase tracking-wider text-quiet">Pick by job</p>
      <h1 className="display mt-2 text-4xl">{meta.title}</h1>
      <p className="mt-4 text-lg leading-relaxed">{meta.answer}</p>
      <p className="mt-3 text-sm text-muted">{meta.lede}</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-y border-rule text-left text-sm">
          <thead>
            <tr className="border-b border-rule text-xs uppercase tracking-wider text-quiet">
              <th className="py-2 pr-3 font-medium">Model</th>
              <th className="py-2 pr-3 font-medium">Mass</th>
              <th className="py-2 pr-3 font-medium">Class</th>
              <th className="py-2 pr-3 font-medium">Sensor</th>
              <th className="py-2 pr-3 font-medium">CE km</th>
              <th className="py-2 font-medium">UK RRP</th>
            </tr>
          </thead>
          <tbody>
            {list.map((d) => (
              <tr key={d.slug} className="border-b border-rule align-top">
                <td className="py-2 pr-3">
                  <Link href={`/drones/${d.slug}`} className="hover:underline">
                    {d.shortName}
                  </Link>
                </td>
                <td className="num py-2 pr-3">{d.weightG} g</td>
                <td className="py-2 pr-3">{d.ukClass}</td>
                <td className="py-2 pr-3">{d.cameras[0]?.sensor}</td>
                <td className="num py-2 pr-3">{d.rangeKmCe}</td>
                <td className="num py-2">
                  {gbp(d.prices.djiRrpGbp)}
                  <span className="block text-xs text-quiet">as of {d.prices.asOf}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="mt-8 divide-y divide-rule border-y border-rule">
        {list.map((d, i) => (
          <li key={d.slug} className="flex items-center gap-3 py-4 sm:gap-4">
            <Link href={`/drones/${d.slug}`} className="shrink-0">
              <DronePhoto drone={d} variant="thumb" />
            </Link>
            <div className="min-w-0">
              <p className="num text-xs text-quiet">{String(i + 1).padStart(2, "0")}</p>
              <Link href={`/drones/${d.slug}`} className="display text-xl hover:underline sm:text-2xl">
                {d.name}
              </Link>
              <p className="mt-1 text-sm text-muted">
                {sensorSummary(d)} · {d.weightG} g · {d.ukClass} · {gbp(d.prices.djiRrpGbp)}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {pairs.length ? (
        <section className="mt-10">
          <h2 className="text-lg font-medium">Sheets for this job</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {pairs.map(({ da, db }) => (
              <li key={`${da.slug}-${db.slug}`}>
                <Link href={pairHref(da, db)} className="underline">
                  {da.shortName} vs {db.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <p className="mt-8 text-sm text-muted">
        Shortlist from job tags on the same catalog — not a personality quiz.
        Weight class and Open subcategory: the{" "}
        <Link href="/guides/uk" className="underline">
          UK Open explainer
        </Link>
        .{" "}
        <Link href="/drones" className="underline">
          Full index
        </Link>
        {" · "}
        <Link href="/compare" className="underline">
          Compare hub
        </Link>
        .
      </p>
    </div>
  );
}
