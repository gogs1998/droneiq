import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdBreadcrumb, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Terms";
const DESC =
  "DroneIQ terms: sourced specs, dated UK prices, not legal advice, not affiliated with DJI.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/terms",
});

export default function TermsPage() {
  const url = `${siteUrl()}/terms`;
  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({ name: TITLE, description: DESC, url }),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Terms", path: "/terms" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
      <h1 className="display mt-3 text-4xl">Terms</h1>
      <p className="mt-4 text-muted">
        DroneIQ is an IQ Labs product at droneiq.pro. Use it as a sourced
        comparison, not as a substitute for the manufacturer’s manual or the
        CAA Drone Code.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Figures</h2>
        <p className="mt-2 text-muted">
          Specs cite a source and an access date. They can be wrong if the
          source moved. Prices are UK snapshots as of the date printed, not live
          offers and not a promise we will sell you anything. Combo decoder
          notes are about class marks and MTOM, not a shop SKU guarantee.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Not legal advice</h2>
        <p className="mt-2 text-muted">
          UK class, Flyer ID, Operator ID, Remote ID and Open-category distances
          on this site are a reading of published CAA material applied to the
          catalog airframes. They are not legal advice. The code applies to the
          aircraft and battery you actually fly.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Trade marks</h2>
        <p className="mt-2 text-muted">
          DJI and the product names on these sheets are trade marks of SZ DJI
          Technology Co., Ltd. DroneIQ is not affiliated with, endorsed by, or
          a partner of DJI. Product stills credited to DJI remain DJI’s.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link href="/about" className="underline">
          About
        </Link>
        {" · "}
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
      </p>
    </article>
  );
}
