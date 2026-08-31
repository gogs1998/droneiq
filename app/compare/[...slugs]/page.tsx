import { JsonLd } from "@/components/JsonLd";
import { PriceBoard } from "@/components/PriceBoard";
import { Questions } from "@/components/Questions";
import { ReviewsShelf } from "@/components/ReviewsShelf";
import { SpecTable } from "@/components/SpecTable";
import { UpgradeCost } from "@/components/UpgradeCost";
import { VerdictBlock } from "@/components/VerdictBlock";
import { getDrone, relatedDrones } from "@/data/catalog";
import { faqsFor, verdictFor } from "@/lib/compare";
import {
  allCanonicalPairs,
  canonicalOrder,
  descriptionForPair,
  jsonLdFaq,
  jsonLdItemList,
  jsonLdWebPage,
  pairSlug,
  parsePairParam,
  siteUrl,
  titleForPair,
} from "@/lib/seo";
import type { Drone } from "@/data/types";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

export function generateStaticParams() {
  return allCanonicalPairs().flatMap(([a, b]) => [
    { slugs: [`${a.slug}-vs-${b.slug}`] },
    { slugs: [`${b.slug}-vs-${a.slug}`] },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}): Promise<Metadata> {
  const { slugs } = await params;
  const list = resolveDrones(slugs);
  if (!list || list.length < 2) return {};
  if (list.length === 2) {
    const [a, b] = canonicalOrder(list[0], list[1]);
    return {
      title: titleForPair(a, b),
      description: descriptionForPair(a, b),
      alternates: { canonical: `${siteUrl()}/compare/${pairSlug(a, b)}` },
      openGraph: { title: `${a.name} vs ${b.name}` },
    };
  }
  return {
    title: list.map((d) => d.shortName).join(" vs "),
    description: `Spec comparison: ${list.map((d) => d.name).join(", ")}.`,
  };
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slugs: string[] }>;
}) {
  const { slugs } = await params;
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
