import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdBreadcrumb, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "Privacy";
const DESC =
  "What DroneIQ stores: a Cloudflare analytics beacon, and an optional I-fly choice in this browser. No accounts.";

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/privacy",
});

export default function PrivacyPage() {
  const url = `${siteUrl()}/privacy`;
  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({ name: TITLE, description: DESC, url }),
          jsonLdBreadcrumb([
            { name: "Home", path: "/" },
            { name: "Privacy", path: "/privacy" },
          ]),
        ]}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
      <h1 className="display mt-3 text-4xl">Privacy</h1>
      <p className="mt-4 text-muted">
        DroneIQ does not run accounts, a newsletter form, or a server-side
        “I fly” profile. The site is a catalog.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Analytics</h2>
        <p className="mt-2 text-muted">
          Pages include a Cloudflare Web Analytics beacon. It is a privacy-first
          count of visits, not a cross-site advertising profile. The token lives
          in the HTML because the IQ Labs hub is DNS-only and cannot inject a
          beacon at the edge.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">I fly</h2>
        <p className="mt-2 text-muted">
          The home bench can remember which airframe you fly. That value is
          stored in this browser’s localStorage and is never sent to us. Clearing
          site data, or unsetting I fly, deletes it.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Outbound links</h2>
        <p className="mt-2 text-muted">
          Spec sources, DJI Store, Amazon, eBay and CeX links leave this site.
          Their privacy policies apply once you follow them. We do not sell
          personal data — we do not hold a personal-data store to sell.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        <Link href="/about" className="underline">
          About
        </Link>
        {" · "}
        <Link href="/terms" className="underline">
          Terms
        </Link>
      </p>
    </article>
  );
}
