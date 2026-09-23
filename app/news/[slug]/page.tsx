import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { NewsBody, formatNewsDate } from "@/components/NewsBody";
import { Questions } from "@/components/Questions";
import { getDrone } from "@/data/catalog";
import { DESK_LABEL, getNews, newsArticles } from "@/data/news";
import { newsFaqs } from "@/data/news-faqs";
import { pairHref } from "@/lib/graph";
import {
  jsonLdBreadcrumb,
  jsonLdFaq,
  jsonLdNewsArticle,
  pageMeta,
  siteUrl,
  titleForPair,
} from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) return pageMeta({ title: "News", description: "DroneIQ news.", path: "/news" });
  return pageMeta({
    title: article.seoTitle ?? article.title,
    description: article.dek,
    path: `/news/${article.slug}`,
  });
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) notFound();

  const related = article.related
    .map((s) => getDrone(s))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));
  const faqs = article.desk === "law" ? (newsFaqs[article.slug] ?? []) : [];
  const compare =
    related.length >= 2
      ? { href: pairHref(related[0], related[1]), title: titleForPair(related[0], related[1]) }
      : null;

  const url = `${siteUrl()}/news/${article.slug}`;

  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdNewsArticle({
            headline: article.title,
            description: article.dek,
            url,
            datePublished: article.published,
          }),
          ...(faqs.length ? [jsonLdFaq(faqs)] : []),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "News", path: "/news" },
            { name: article.title, path: `/news/${article.slug}` },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "News", href: "/news" },
          { name: DESK_LABEL[article.desk] },
        ]}
      />
      <p className="mt-3 text-xs uppercase tracking-wider text-quiet">
        <Link href="/news" className="hover:text-ink">
          News
        </Link>
        {" · "}
        {DESK_LABEL[article.desk]}
        {" · "}
        {formatNewsDate(article.published)}
      </p>
      <h1 className="display mt-2 text-4xl leading-tight">{article.title}</h1>
      <p className="mt-4 text-muted">{article.dek}</p>
      <NewsBody blocks={article.body} />

      {faqs.length > 0 ? <Questions items={faqs} /> : null}

      <section className="mt-10">
        <h2 className="text-lg font-medium">Related on DroneIQ</h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <Link href="/guides/uk" className="underline">
              Flying in the UK
            </Link>
          </li>
          {compare ? (
            <li>
              <Link href={compare.href} className="underline">
                {compare.title}
              </Link>
            </li>
          ) : null}
          {related[0] ? (
            <li>
              <Link href={`/drones/${related[0].slug}`} className="underline">
                {related[0].shortName}
              </Link>
            </li>
          ) : null}
        </ul>
        {related.length > 1 ? (
          <p className="mt-3 text-sm text-muted">
            Also on the bench:{" "}
            {related.slice(1).map((d, i) => (
              <span key={d.slug}>
                {i > 0 ? " · " : ""}
                <Link href={`/drones/${d.slug}`} className="underline">
                  {d.shortName}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Sources</h2>
        <p className="mt-2 text-sm text-muted">
          Opened {formatNewsDate(article.sources[0]?.accessed ?? article.published)}.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          {article.sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} className="underline">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link href="/news" className="underline">
          All news
        </Link>
        {" · "}
        We did not fly these aircraft for this piece.
      </p>
    </article>
  );
}
