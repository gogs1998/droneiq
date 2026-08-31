import { DronePhoto } from "@/components/DronePhoto";
import { JsonLd } from "@/components/JsonLd";
import { JOBS, dronesForJob } from "@/data/catalog";
import { gbp, sensorSummary } from "@/lib/compare";
import { jsonLdItemList, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Job } from "@/data/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return JOBS.map((j) => ({ job: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ job: string }>;
}): Promise<Metadata> {
  const { job } = await params;
  const meta = JOBS.find((j) => j.slug === job);
  if (!meta) return {};
  return pageMeta({
    title: `Best DJI drones for ${meta.title.toLowerCase()}`,
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
        ]}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">Pick by job</p>
      <h1 className="display mt-2 text-4xl">{meta.title}</h1>
      <p className="mt-4 text-lg leading-relaxed">{meta.lede}</p>
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
      <p className="mt-8 text-sm text-muted">
        Shortlist from job tags on the same catalog — not a personality quiz.{" "}
        <Link href="/drones" className="underline">
          Full index
        </Link>
        .
      </p>
    </div>
  );
}
