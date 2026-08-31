import { ComboDecoder } from "@/components/ComboDecoder";
import { Compatibility } from "@/components/Compatibility";
import { JsonLd } from "@/components/JsonLd";
import { PriceBoard } from "@/components/PriceBoard";
import { Questions } from "@/components/Questions";
import { ReviewsShelf } from "@/components/ReviewsShelf";
import { SpecTable } from "@/components/SpecTable";
import { UpgradeCost } from "@/components/UpgradeCost";
import { drones, getDrone, relatedDrones } from "@/data/catalog";
import { faqsFor, formatReleased, gbp, sensorSummary } from "@/lib/compare";
import { jsonLdFaq, jsonLdWebPage, pageMeta, pairSlug, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return drones.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDrone(slug);
  if (!d) return {};
  return pageMeta({
    title: `${d.name} specs, UK class, price`,
    description: `${d.name}: ${d.weightG} g, ${d.ukClass}, ${sensorSummary(d)}, ${d.flightTimeMin} min lab time. Sourced figures, UK prices, reviews.`,
    path: `/drones/${d.slug}`,
  });
}

export default async function DronePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDrone(slug);
  if (!d) notFound();
  const related = relatedDrones(d);
  const faqs = faqsFor([d]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: d.name,
            description: `${d.weightG} g · ${d.ukClass} · ${sensorSummary(d)}`,
            url: `${siteUrl()}/drones/${d.slug}`,
          }),
          jsonLdFaq(faqs),
        ]}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">
        {d.brand} · {d.series}
        {d.discontinued ? " · discontinued as new" : ""}
      </p>
      <h1 className="display mt-2 text-3xl md:text-5xl">{d.name}</h1>
      <p className="num mt-3 text-lg text-muted">
        {formatReleased(d.released)} · {gbp(d.prices.djiRrpGbp)} RRP
      </p>
      <p className="mt-4 max-w-2xl text-sm text-muted">
        {d.weightNote} {d.ukClassNote}
      </p>

      <div className="mt-8">
        <UpgradeCost targets={[d]} />
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl">Record</h2>
        <div className="mt-4">
          <SpecTable drones={[d]} />
        </div>
      </section>

      <PriceBoard drones={[d]} />
      <ComboDecoder drone={d} />
      <Compatibility drone={d} />
      <ReviewsShelf drones={[d]} mode="drone" />
      <Questions items={faqs} />

      <section className="mt-12">
        <h2 className="display text-2xl">Compared with</h2>
        <ul className="mt-3 space-y-2">
          {related.map((o) => (
            <li key={o.slug}>
              <Link href={`/compare/${pairSlug(d, o)}`} className="hover:underline">
                {d.shortName} vs {o.shortName}
              </Link>
              <span className="text-sm text-muted">
                {" "}
                · {o.cameras[0].sensor}, {o.weightG} g
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-2xl">
        <h2 className="display text-2xl">Sources</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {d.sources.map((s) => (
            <li key={s.field + s.url}>
              <a href={s.url} className="underline">
                {s.label}
              </a>
              <span className="text-quiet">
                {" "}
                · {s.field} · accessed {s.accessed}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
