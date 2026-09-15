import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdBreadcrumb, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "About";
const DESC =
  "DroneIQ is the IQ Labs DJI comparison: sourced specs, CE range not FCC, UK class, dated prices. Not legal advice, not a flight-test review.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/about",
});

export default function AboutPage() {
  const url = `${siteUrl()}/about`;
  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({ name: TITLE, description: DESC, url }),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <h1 className="display mt-3 text-4xl">About DroneIQ</h1>
      <p className="mt-4 text-muted">
        DroneIQ is a facts-first DJI comparison published by IQ Labs. It prints
        the numbers a UK buyer actually decides with: sourced specs, CE video
        range (not the FCC marketing figure), UK Open-category class next to
        weight, and dated price snapshots. Then a plain-language verdict on
        whether you would notice the difference.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-medium">How a figure gets on the page</h2>
        <p className="mt-2 text-muted">
          Every spec names a source and the date that URL was opened. Primary
          sources first: DJI spec sheets and stores, the CAA Drone Code,
          legislation. Specialist retailers and enthusiast sites are useful for
          knowing what people argue about. They are not a second catalog.
        </p>
        <p className="mt-3 text-muted">
          We do not scrape live prices, invent EANs, or ship original
          flight-test reviews. Third-party reviews on a drone page are a digest
          with citations, not DroneIQ stars. Prices are UK snapshots as of the
          date printed, not an API tick.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">CE, not FCC — and not legal advice</h2>
        <p className="mt-2 text-muted">
          UK radios are CE. DJI’s large kilometre number is usually FCC, often
          about twice CE. Spec tables here print CE, and you still fly visual
          line of sight. UK class, Flyer ID, Operator ID and Remote ID sit next
          to mass because that is the paperwork, not a marketing name.
        </p>
        <p className="mt-3 text-muted">
          None of this is legal advice. The CAA Drone Code applies to the
          airframe and battery you actually take off with — weigh it. The{" "}
          <Link href="/guides/uk" className="underline">
            UK Open explainer
          </Link>{" "}
          is the longer version of that sentence.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">IQ Labs</h2>
        <p className="mt-2 text-muted">
          DroneIQ is one product in the IQ Labs set. The method is the same
          across the estate: sourced figures, access dates, no invented
          rankings.{" "}
          <a href="https://iqlabs.app" className="underline">
            iqlabs.app
          </a>{" "}
          is the hub.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
        {" · "}
        <Link href="/terms" className="underline">
          Terms
        </Link>
        {" · "}
        <Link href="/compare" className="underline">
          Compare
        </Link>
      </p>
    </article>
  );
}
