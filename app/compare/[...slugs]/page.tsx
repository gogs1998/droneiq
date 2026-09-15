import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GearSpecTable } from "@/components/GearSpecTable";
import { GearVerdictBlock } from "@/components/GearVerdictBlock";
import { JsonLd } from "@/components/JsonLd";
import { PriceBoard } from "@/components/PriceBoard";
import { Questions } from "@/components/Questions";
import { ReviewsShelf } from "@/components/ReviewsShelf";
import { SpecTable } from "@/components/SpecTable";
import { UpgradeCost } from "@/components/UpgradeCost";
import { VerdictBlock } from "@/components/VerdictBlock";
import { getDrone } from "@/data/catalog";
import {
  canonicalGearOrder,
  comparable,
  comparablePairs,
  gearPairSlug,
  getGear,
  parseGearPair,
  type Gear,
} from "@/data/gear";
import { faqsFor, verdictFor } from "@/lib/compare";
import { gearFaqs, gearVerdict } from "@/lib/gear-compare";
import { adjacentPairs, gearAdjacent, pairHref } from "@/lib/graph";
import {
  allCanonicalPairs,
  canonicalOrder,
  descriptionForGearPair,
  descriptionForPair,
  jsonLdBreadcrumb,
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
import { upgradePath } from "@/lib/upgrade";
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
    ordered.length === 2 ? adjacentPairs(ordered[0], ordered[1]) : [];
  const crumbs =
    ordered.length === 2
      ? [
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
          {
            name: `${ordered[0].shortName} vs ${ordered[1].shortName}`,
            path: `/compare/${pairSlug(ordered[0], ordered[1])}`,
          },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Compare", path: "/compare" },
        ];

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
          jsonLdBreadcrumb(crumbs),
        ]}
      />
      <Breadcrumbs
        items={crumbs.map((c, i) => ({
          name: c.name,
          href: i < crumbs.length - 1 ? c.path : undefined,
        }))}
      />
      <p className="mt-3 text-xs uppercase tracking-wider text-quiet">Comparison</p>
      <h1 className="display mt-2 text-3xl leading-none md:text-5xl">
        {ordered.length === 2
          ? `${ordered[0].name} vs ${ordered[1].name}`
          : ordered.map((d) => d.shortName).join(" vs ")}
      </h1>
      <p className="mt-3 max-w-2xl text-sm text-muted">
        {ordered.length === 2 ? (
          <>
            <Link href={`/drones/${ordered[0].slug}`} className="underline">
              {ordered[0].shortName} spec
            </Link>
            {" · "}
            <Link href={`/drones/${ordered[1].slug}`} className="underline">
              {ordered[1].shortName} spec
            </Link>
            {" · "}
            <Link href={upgradePath(ordered[0].slug)} className="underline">
              Upgrade from {ordered[0].shortName}
            </Link>
            {" · "}
            <Link href={upgradePath(ordered[1].slug)} className="underline">
              Upgrade from {ordered[1].shortName}
            </Link>
            {" · "}
            <Link href="/compare" className="underline">
              All compares
            </Link>
          </>
        ) : (
          <Link href="/compare" className="underline">
            All compares
          </Link>
        )}
      </p>
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
          <h2 className="display text-2xl">Adjacent comparisons</h2>
          <p className="mt-2 text-sm text-muted">
            Same-line alternatives for each side. The rest of the grid is on the
            drone pages and the{" "}
            <Link href="/compare" className="underline">
              compare hub
            </Link>
            .
          </p>
          <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
            {related.map((p) => (
              <li key={`${p.a.slug}-vs-${p.b.slug}`} className="break-inside-avoid py-0.5 text-sm">
                <Link href={pairHref(p.a, p.b)} className="hover:underline">
                  {p.a.shortName} vs {p.b.shortName}
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
  const related = gearAdjacent(a, b);

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
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Compare", path: "/compare" },
            { name: `${a.shortName} vs ${b.shortName}`, path: `/compare/${gearPairSlug(a, b)}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
          { name: `${a.shortName} vs ${b.shortName}` },
        ]}
      />
      <p className="mt-3 text-xs uppercase tracking-wider text-quiet">
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
        {" · "}
        <Link href={`/gear/${a.slug}`} className="underline">
          {a.shortName}
        </Link>
        {" · "}
        <Link href={`/gear/${b.slug}`} className="underline">
          {b.shortName}
        </Link>
        {" · "}
        <Link href="/compare#gear" className="underline">
          Gear compares
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
          <h2 className="display text-2xl">Adjacent comparisons</h2>
          <ul className="mt-3 columns-1 gap-x-8 sm:columns-2">
            {related.map(([x, y]) => (
              <li key={gearPairSlug(x, y)} className="break-inside-avoid py-0.5 text-sm">
                <Link href={`/compare/${gearPairSlug(x, y)}`} className="hover:underline">
                  {x.shortName} vs {y.shortName}
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
