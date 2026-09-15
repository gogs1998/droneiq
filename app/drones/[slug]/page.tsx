import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ComboDecoder } from "@/components/ComboDecoder";
import { Compatibility } from "@/components/Compatibility";
import { DronePhoto } from "@/components/DronePhoto";
import { JsonLd } from "@/components/JsonLd";
import { PriceBoard } from "@/components/PriceBoard";
import { Questions } from "@/components/Questions";
import { ReviewsShelf } from "@/components/ReviewsShelf";
import { SpecTable } from "@/components/SpecTable";
import { UpgradeCost } from "@/components/UpgradeCost";
import { drones, getDrone } from "@/data/catalog";
import { faqsFor, formatReleased, gbp, sensorSummary } from "@/lib/compare";
import { bucketComparisons, pairHref } from "@/lib/graph";
import {
  jsonLdBreadcrumb,
  jsonLdFaq,
  jsonLdProduct,
  jsonLdWebPage,
  pageMeta,
  siteUrl,
} from "@/lib/seo";
import { upgradePath } from "@/lib/upgrade";
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
    title: `${d.shortName} specs`,
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
  const buckets = bucketComparisons(d);
  const faqs = faqsFor([d]);
  const url = `${siteUrl()}/drones/${d.slug}`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: d.name,
            description: `${d.weightG} g · ${d.ukClass} · ${sensorSummary(d)}`,
            url,
          }),
          jsonLdProduct(d),
          jsonLdFaq(faqs),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Drones", path: "/drones" },
            { name: d.shortName, path: `/drones/${d.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Drones", href: "/drones" },
          { name: d.shortName },
        ]}
      />
      <p className="mt-3 text-xs uppercase tracking-wider text-quiet">
        {d.brand} · {d.series}
        {d.discontinued ? " · discontinued as new" : ""}
      </p>
      <h1 className="display mt-2 text-3xl md:text-5xl">{d.name}</h1>
      <p className="num mt-3 text-lg text-muted">
        {formatReleased(d.released)} · {gbp(d.prices.djiRrpGbp)} RRP
      </p>
      <p className="mt-4 max-w-2xl text-sm text-muted">
        {d.weightNote} {d.ukClassNote}{" "}
        <Link href="/guides/uk" className="underline">
          UK IDs, class and Remote ID
        </Link>
      </p>

      <div className="mt-6 max-w-xl">
        <DronePhoto drone={d} variant="hero" priority />
      </div>

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

      <section id="compared" className="mt-12 scroll-mt-6">
        <h2 className="display text-2xl">Compared with</h2>
        <p className="mt-2 text-sm text-muted">
          All {drones.length - 1} sheets this airframe appears on.{" "}
          <Link href={upgradePath(d.slug)} className="underline">
            Upgrade from {d.shortName}
          </Link>
          {" · "}
          <Link href="/compare" className="underline">
            Compare hub
          </Link>
        </p>
        {buckets.map((b) => (
          <div key={b.id} className="mt-6">
            <h3 className="text-sm uppercase tracking-wider text-quiet">{b.title}</h3>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {b.drones.map((o) => (
                <li key={o.slug}>
                  <Link href={pairHref(d, o)} className="hover:underline">
                    vs {o.shortName}
                  </Link>
                  <span className="text-quiet">
                    {" "}
                    · {o.cameras[0]?.sensor}, {o.weightG} g
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
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
