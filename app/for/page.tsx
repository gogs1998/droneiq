import { JsonLd } from "@/components/JsonLd";
import { JOBS } from "@/data/catalog";
import { jsonLdWebPage, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pick a DJI drone by job",
  description:
    "Shortlists from the same catalog: travel, wind, dusk, beginner, FPV. Not a personality quiz.",
};

export default function ForIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-6">
      <JsonLd
        data={jsonLdWebPage({
          name: "Pick by job",
          description:
            "Travel, wind, dusk, beginner, FPV — shortlists from the DroneIQ catalog.",
          url: `${siteUrl()}/for`,
        })}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">Pick by job</p>
      <h1 className="display mt-2 text-4xl">What is the flying for?</h1>
      <p className="mt-4 max-w-xl text-muted">
        Same catalog as the spec table. Tags, not a quiz.
      </p>
      <ul className="mt-8 divide-y divide-rule border-y border-rule">
        {JOBS.map((j) => (
          <li key={j.slug} className="py-4">
            <Link href={`/for/${j.slug}`} className="display text-2xl hover:underline">
              {j.title}
            </Link>
            <p className="mt-1 text-sm text-muted">{j.lede}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
