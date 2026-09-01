import { GearSpecTable } from "@/components/GearSpecTable";
import { JsonLd } from "@/components/JsonLd";
import { Questions } from "@/components/Questions";
import { drones } from "@/data/catalog";
import {
  KIND_LABEL,
  comparable,
  gear,
  gearPairSlug,
  getGear,
  relatedGear,
} from "@/data/gear";
import { dronesFlown, dronesNotFlown, gearFaqs } from "@/lib/gear-compare";
import { formatReleased } from "@/lib/compare";
import { jsonLdFaq, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return gear.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGear(slug);
  if (!g) return {};
  return pageMeta({
    title: `${g.name} compatibility`,
    description: `${g.name}: ${g.form}, ${g.transmission}. Flies ${g.flies.length} catalog airframe${g.flies.length === 1 ? "" : "s"}. Sourced compatibility, not a review.`,
    path: `/gear/${g.slug}`,
  });
}

export default async function GearPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGear(slug);
  if (!g) notFound();
  const faqs = gearFaqs([g]);
  const flown = dronesFlown(g);
  const notFlown = dronesNotFlown(g);
  const related = relatedGear(g);
  const compares = related.filter((o) => comparable(g, o)).slice(0, 4);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: g.name,
            description: `${g.form} · ${g.transmission} · ${flown.map((d) => d.shortName).join(", ")}`,
            url: `${siteUrl()}/gear/${g.slug}`,
          }),
          jsonLdFaq(faqs),
        ]}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">
        {KIND_LABEL[g.kind]}
        {g.discontinued ? " · discontinued as new" : ""}
      </p>
      <h1 className="display mt-2 text-3xl md:text-5xl">{g.name}</h1>
      <p className="num mt-3 text-lg text-muted">{formatReleased(g.released)}</p>
      <p className="mt-4 max-w-2xl text-sm text-muted">
        {g.note}{" "}
        <Link href="/gear" className="underline">
          Full compatibility matrix
        </Link>
      </p>

      <section className="mt-10">
        <h2 className="display text-2xl">Record</h2>
        <div className="mt-4">
          <GearSpecTable items={[g]} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="display text-2xl">Flies</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">{g.protocolNote}</p>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {flown.map((d) => (
            <li key={d.slug} className="flex flex-wrap items-baseline justify-between gap-2 py-2">
              <Link href={`/drones/${d.slug}`} className="hover:underline">
                {d.name}
              </Link>
              <span className="num text-sm text-muted">
                {d.ukClass} · {d.weightG} g
              </span>
            </li>
          ))}
        </ul>
      </section>

      {notFlown.length && (g.kind === "rc" || g.kind === "motion" || g.kind === "goggles") ? (
        <section className="mt-12">
          <h2 className="display text-2xl">Will not fly</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Other catalog airframes. Firmware can still block a listed pair.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            {notFlown.map((d, i) => (
              <span key={d.slug}>
                {i ? ", " : ""}
                <Link href={`/drones/${d.slug}`} className="underline">
                  {d.shortName}
                </Link>
              </span>
            ))}
            .
          </p>
        </section>
      ) : notFlown.length ? (
        <p className="mt-6 max-w-2xl text-sm text-muted">
          Does not fit the other {notFlown.length} catalog airframes (
          {drones.length - flown.length} of {drones.length}).
        </p>
      ) : null}

      <Questions items={faqs} />

      <section className="mt-12">
        <h2 className="display text-2xl">Buy links</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted">
          Search only. We do not invent a standalone RRP or EAN for accessories.
        </p>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a href={g.djiUrl} className="underline">
              DJI
            </a>
          </li>
          <li>
            <a href={g.amazonUrl} className="underline">
              Amazon UK search
            </a>
          </li>
        </ul>
      </section>

      {compares.length ? (
        <section className="mt-12">
          <h2 className="display text-2xl">Compared with</h2>
          <ul className="mt-3 space-y-2">
            {compares.map((o) => (
              <li key={o.slug}>
                <Link href={`/compare/${gearPairSlug(g, o)}`} className="hover:underline">
                  {g.shortName} vs {o.shortName}
                </Link>
                <span className="text-sm text-muted">
                  {" "}
                  · {o.form}, {o.transmission}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12 max-w-2xl">
        <h2 className="display text-2xl">Sources</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {g.sources.map((s) => (
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
