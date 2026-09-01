import { GearSpecTable } from "@/components/GearSpecTable";
import { GearVerdictBlock } from "@/components/GearVerdictBlock";
import { JsonLd } from "@/components/JsonLd";
import { PriceBoard } from "@/components/PriceBoard";
import { Questions } from "@/components/Questions";
import { ReviewsShelf } from "@/components/ReviewsShelf";
import { SpecTable } from "@/components/SpecTable";
import { UpgradeCost } from "@/components/UpgradeCost";
import { VerdictBlock } from "@/components/VerdictBlock";
import { getDrone, relatedDrones } from "@/data/catalog";
import {
  canonicalGearOrder,
  comparable,
  comparablePairs,
  gearPairSlug,
  getGear,
  parseGearPair,
  relatedGear,
  type Gear,
} from "@/data/gear";
import { faqsFor, verdictFor } from "@/lib/compare";
import { gearFaqs, gearVerdict } from "@/lib/gear-compare";
import {
  allCanonicalPairs,
  canonicalOrder,
  descriptionForGearPair,
  descriptionForPair,
  jsonLdFaq,
  jsonLdItemList,
  jsonLdWebPage,
  pageMeta,
  pairSlug,
  parsePairParam,
  siteUrl,
  titleForGearPair,
  titleForPair,
} from "@/lib/seo";
import type { Drone } from "@/data/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

export function generateStaticParams() {
  const drones = allCanonicalPairs().flatMap(([a, b]) => [
    { slugs: [`${a.slug}-vs-${b.slug}`] },
    { slugs: [`${b.slug}-vs-${a.slug}`] },
  ]);
  const gear = comparablePairs().flatMap(([a, b]) => [
    { slugs: [`${a.slug}-vs-${b.slug}`] },
    { slugs: [`${b.slug}-vs-${a.slug}`] },
  ]);
  return [...drones, ...gear];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}): Promise<Metadata> {
  const { slugs } = await params;
  const gearList = resolveGear(slugs);
  if (gearList) {
    const [a, b] = canonicalGearOrder(gearList[0], gearList[1]);
    return pageMeta({
      title: titleForGearPair(a, b),
      description: descriptionForGearPair(a, b),
      path: `/compare/${gearPairSlug(a, b)}`,
    });
  }
  const list = resolveDrones(slugs);
  if (!list || list.length < 2) return {};
  if (list.length === 2) {
    const [a, b] = canonicalOrder(list[0], list[1]);
    return pageMeta({
      title: titleForPair(a, b),
      description: descriptionForPair(a, b),
      path: `/compare/${pairSlug(a, b)}`,
    });
  }
  return pageMeta({
    title: list.map((d) => d.shortName).join(" vs "),
    description: `Spec comparison: ${list.map((d) => d.name).join(", ")}.`,
    path: `/compare/${list.map((d) => d.slug).join("/")}`,
  });
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
  const gearList = resolveGear(slugs);
  if (gearList) {
    return <GearCompare slugs={slugs} pair={gearList} />;
  }

  const list = resolveDrones(slugs);
  if (!list || list.length < 2 || list.length > 4) notFound();

  if (slugs.length === 2) {
    permanentRedirect(`/compare/${pairSlug(list[0], list[1])}`);
  }

  if (slugs.length === 1 && slugs[0].includes("-vs-")) {
    const parsed = parsePairParam(slugs[0]);
    if (parsed) {
      const [a, b] = parsed;
      const canonical = pairSlug(a, b);
      if (slugs[0] !== canonical) {
        permanentRedirect(`/compare/${canonical}`);
      }
    }
  }

  const ordered =
    list.length === 2 ? canonicalOrder(list[0], list[1]) : list;
  const faqs = faqsFor(ordered);
  const v = verdictFor(ordered);
  const url =
    ordered.length === 2
      ? `${siteUrl()}/compare/${pairSlug(ordered[0], ordered[1])}`
      : `${siteUrl()}/compare/${ordered.map((d) => d.slug).join("/")}`;

  const related =
    ordered.length === 2
      ? relatedDrones(ordered[1], 4).filter((d) => d.slug !== ordered[0].slug)
      : [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name:
              ordered.length === 2
                ? `${ordered[0].name} vs ${ordered[1].name}`
                : ordered.map((d) => d.shortName).join(" vs "),
            description: v.snippet,
            url,
          }),
          ...(faqs.length ? [jsonLdFaq(faqs)] : []),
          jsonLdItemList(ordered, url),
        ]}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">Comparison</p>
      <h1 className="display mt-2 text-3xl leading-none md:text-5xl">
        {ordered.length === 2
          ? `${ordered[0].name} vs ${ordered[1].name}`
          : ordered.map((d) => d.shortName).join(" vs ")}
      </h1>
      <div className="mt-6">
        <VerdictBlock drones={ordered} />
      </div>
      <div className="mt-6">
        <UpgradeCost targets={ordered} />
      </div>

      <section className="mt-10">
        <SpecTable drones={ordered} />
        <p className="mt-3 text-sm text-muted">
          <Link href="/guides/uk" className="underline">
            UK Open category, IDs and Remote ID
          </Link>
        </p>
      </section>

      <Questions items={faqs} />
      <PriceBoard drones={ordered} />
      <ReviewsShelf drones={ordered} mode="compare" />

      {related.length ? (
        <section className="mt-12">
          <h2 className="display text-2xl">Related comparisons</h2>
          <ul className="mt-3 space-y-2">
            {related.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/compare/${pairSlug(ordered[1], o)}`}
                  className="hover:underline"
                >
                  {ordered[1].shortName} vs {o.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function GearCompare({ slugs, pair }: { slugs: string[]; pair: [Gear, Gear] }) {
  if (slugs.length === 2) {
    permanentRedirect(`/compare/${gearPairSlug(pair[0], pair[1])}`);
  }
  if (slugs.length === 1 && slugs[0].includes("-vs-")) {
    const canonical = gearPairSlug(pair[0], pair[1]);
    if (slugs[0] !== canonical) {
      permanentRedirect(`/compare/${canonical}`);
    }
  }

  const [a, b] = canonicalGearOrder(pair[0], pair[1]);
  const faqs = gearFaqs([a, b]);
  const v = gearVerdict(a, b);
  const url = `${siteUrl()}/compare/${gearPairSlug(a, b)}`;
  const related = relatedGear(b, 4).filter((g) => g.slug !== a.slug && comparable(b, g));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: `${a.name} vs ${b.name}`,
            description: v.snippet,
            url,
          }),
          ...(faqs.length ? [jsonLdFaq(faqs)] : []),
          jsonLdItemList(
            [
              { slug: a.slug, name: a.name },
              { slug: b.slug, name: b.name },
            ],
            url,
            "/gear",
          ),
        ]}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">
        Gear comparison
      </p>
      <h1 className="display mt-2 text-3xl leading-none md:text-5xl">
        {a.name} vs {b.name}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        Compatibility first — which catalog drones each stick or headset
        actually flies.{" "}
        <Link href="/gear" className="underline">
          Full matrix
        </Link>
      </p>
      <div className="mt-6">
        <GearVerdictBlock a={a} b={b} />
      </div>

      <section className="mt-10">
        <GearSpecTable items={[a, b]} />
      </section>

      <Questions items={faqs} />

      {related.length ? (
        <section className="mt-12">
          <h2 className="display text-2xl">Related comparisons</h2>
          <ul className="mt-3 space-y-2">
            {related.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/compare/${gearPairSlug(b, o)}`}
                  className="hover:underline"
                >
                  {b.shortName} vs {o.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function resolveDrones(slugs: string[]): Drone[] | null {
  if (slugs.length === 1 && slugs[0].includes("-vs-")) {
    const parsed = parsePairParam(slugs[0]);
    return parsed;
  }
  const list: Drone[] = [];
  for (const s of slugs) {
    const d = getDrone(s);
    if (!d) return null;
    if (!list.some((x) => x.slug === d.slug)) list.push(d);
  }
  return list.length >= 2 ? list : null;
}

function resolveGear(slugs: string[]): [Gear, Gear] | null {
  if (slugs.length === 1 && slugs[0].includes("-vs-")) {
    return parseGearPair(slugs[0]);
  }
  if (slugs.length !== 2) return null;
  const a = getGear(slugs[0]);
  const b = getGear(slugs[1]);
  if (!a || !b || a.slug === b.slug || !comparable(a, b)) return null;
  return [a, b];
}
