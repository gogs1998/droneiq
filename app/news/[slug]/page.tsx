import { JsonLd } from "@/components/JsonLd";
import { NewsBody, formatNewsDate } from "@/components/NewsBody";
import { getDrone } from "@/data/catalog";
import { DESK_LABEL, getNews, newsArticles } from "@/data/news";
import { jsonLdNewsArticle, pageMeta, siteUrl } from "@/lib/seo";
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
    title: article.title,
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

  const url = `${siteUrl()}/news/${article.slug}`;

  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={jsonLdNewsArticle({
          headline: article.title,
          description: article.dek,
          url,
          datePublished: article.published,
        })}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">
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

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="text-lg font-medium">On the bench</h2>
          <p className="mt-2 text-sm text-muted">
            {related.map((d, i) => (
              <span key={d.slug}>
                {i > 0 ? " · " : ""}
                <Link href={`/drones/${d.slug}`} className="underline">
                  {d.shortName}
                </Link>
              </span>
            ))}
          </p>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-lg font-medium">Sources</h2>
        <p className="mt-2 text-sm text-muted">
          Opened {formatNewsDate(article.sources[0]?.accessed ?? article.published)}. We write from
          these URLs; we do not paste them.
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
