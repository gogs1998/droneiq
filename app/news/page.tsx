import { JsonLd } from "@/components/JsonLd";
import { formatNewsDate } from "@/components/NewsBody";
import { DESK_LABEL, newsByDate, newsDeskNote } from "@/data/news";
import { jsonLdItemList, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "News";
const DESC =
  "Original DroneIQ reporting from CAA, UK legislation and DJI primary sources. Not a scraped roundup.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/news",
});

export default function NewsIndex() {
  const list = newsByDate();
  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: TITLE,
            description: DESC,
            url: `${siteUrl()}/news`,
          }),
          jsonLdItemList(
            list.map((a) => ({ slug: a.slug, name: a.title })),
            `${siteUrl()}/news`,
            "/news",
          ),
        ]}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">News</p>
      <h1 className="display mt-2 text-4xl">The desk</h1>
      <p className="mt-4 text-muted">{newsDeskNote.lede}</p>

      <ul className="mt-10 divide-y divide-rule border-y border-rule">
        {list.map((a) => (
          <li key={a.slug} className="py-5">
            <p className="text-xs uppercase tracking-wider text-quiet">
              {DESK_LABEL[a.desk]}
              {" · "}
              {formatNewsDate(a.published)}
            </p>
            <Link href={`/news/${a.slug}`} className="display mt-1 block text-2xl hover:underline">
              {a.title}
            </Link>
            <p className="mt-2 text-sm text-muted">{a.dek}</p>
          </li>
        ))}
      </ul>

      <section className="mt-14">
        <h2 className="text-lg font-medium">{newsDeskNote.title}</h2>
        {newsDeskNote.body.map((p) => (
          <p key={p} className="mt-3 text-sm text-muted">
            {p}
          </p>
        ))}
      </section>
    </div>
  );
}
