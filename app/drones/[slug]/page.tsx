import { ComboDecoder } from "@/components/ComboDecoder";
import { Compatibility } from "@/components/Compatibility";
import { JsonLd } from "@/components/JsonLd";
import { PriceBoard } from "@/components/PriceBoard";
import { ReviewsShelf } from "@/components/ReviewsShelf";
import { UpgradeCost } from "@/components/UpgradeCost";
import { drones, getDrone, relatedDrones } from "@/data/catalog";
import { gbp, sensorSummary } from "@/lib/compare";
import { jsonLdWebPage, pairSlug, siteUrl } from "@/lib/seo";
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
  return {
    title: `${d.name} specs, UK class, price`,
    description: `${d.name}: ${d.weightG} g, ${d.ukClass}, ${sensorSummary(d)}, ${d.flightTimeMin} min lab time. Sourced figures, UK prices, reviews.`,
  };
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

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={jsonLdWebPage({
          name: d.name,
          description: `${d.weightG} g · ${d.ukClass} · ${sensorSummary(d)}`,
          url: `${siteUrl()}/drones/${d.slug}`,
        })}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">
        {d.brand} · {d.series}
        {d.discontinued ? " · discontinued as new" : ""}
      </p>
      <h1 className="display mt-2 text-4xl md:text-5xl">{d.name}</h1>
      <p className="num mt-3 text-lg text-muted">
        {d.weightG} g · {d.ukClass} · {sensorSummary(d)} · {gbp(d.prices.djiRrpGbp)} RRP
      </p>
      <p className="mt-4 max-w-2xl text-muted">{d.weightNote} {d.ukClassNote}</p>

      <div className="mt-8">
        <UpgradeCost targets={[d]} />
      </div>

      <section className="mt-10">
        <h2 className="display text-2xl">Record</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          <Fact k="Released" v={d.released} />
          <Fact k="Lab flight time" v={`${d.flightTimeMin} min`} />
          <Fact k="Wind" v={`${d.windLevel} · ${d.windMs} m/s`} />
          <Fact k="Max speed (CE)" v={`${d.maxSpeedKphCe} km/h (${d.maxSpeedKphFcc} FCC)`} />
          <Fact k="Sensing" v={d.sensing.replaceAll("-", " ")} />
          <Fact k="Transmission" v={`${d.transmission} · ${d.rangeKmCe} km CE`} />
          <Fact k="Internal storage" v={d.internalGb ? `${d.internalGb} GB` : "Card only"} />
          <Fact k="Operator / Flyer ID" v={`Operator ID${d.flyerIdRequired ? " + Flyer ID" : " only"}`} />
        </dl>
        {d.cameras.map((c) => (
          <p key={c.role} className="mt-3 text-sm text-muted">
            <span className="uppercase tracking-wider text-quiet">{c.role}</span>{" "}
            {c.sensor}, {c.megapixels} MP, {c.equivMm} mm {c.aperture}, {c.maxVideo}
            {c.trueVertical ? ", true vertical" : ""}
          </p>
        ))}
      </section>

      <PriceBoard drones={[d]} />
      <ComboDecoder drone={d} />
      <Compatibility drone={d} />
      <ReviewsShelf drones={[d]} mode="drone" />

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

function Fact({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-b border-rule pb-2">
      <dt className="text-xs uppercase tracking-wider text-quiet">{k}</dt>
      <dd className="num mt-1">{v}</dd>
    </div>
  );
}
