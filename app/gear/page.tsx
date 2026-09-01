import { CompatMatrix } from "@/components/CompatMatrix";
import { JsonLd } from "@/components/JsonLd";
import { drones, getDrone } from "@/data/catalog";
import { featuredGearResolved } from "@/lib/gear-compare";
import {
  FILTER_LABEL,
  KIND_LABEL,
  gearForDrone,
  gearForFilter,
  gearPairSlug,
  parseGearFilter,
  type GearFilter,
} from "@/data/gear";
import { jsonLdItemList, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = pageMeta({
  title: "Controllers, headsets and parts",
  description:
    "Which DJI RC, motion controller or goggles fly which catalog drone. Compatibility first, then the screen and the protocol.",
  path: "/gear",
});

type Props = {
  searchParams: Promise<{ kind?: string; drone?: string }>;
};

const FILTERS: GearFilter[] = ["radio", "controllers", "headsets", "batteries", "nd"];

export default async function GearIndex({ searchParams }: Props) {
  const q = await searchParams;
  const filter = parseGearFilter(q.kind);
  const highlight = q.drone && getDrone(q.drone) ? q.drone : undefined;
  const list = gearForFilter(filter);
  const forDrone = highlight ? gearForDrone(highlight) : [];
  const droneName = highlight ? getDrone(highlight)?.shortName : undefined;

  const chip = (kind: GearFilter | undefined, label: string, on: boolean) => {
    const params = new URLSearchParams();
    if (kind && kind !== "radio") params.set("kind", kind);
    if (highlight) params.set("drone", highlight);
    const qs = params.toString();
    return (
      <Link
        href={qs ? `/gear?${qs}` : "/gear"}
        className={`border px-2 py-1 text-sm ${on ? "border-ink bg-ink text-paper" : "border-rule"}`}
      >
        {label}
      </Link>
    );
  };

  const featured = featuredGearResolved();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: "Controllers, headsets and parts",
            description:
              "Which DJI RC, motion controller or goggles fly which catalog drone.",
            url: `${siteUrl()}/gear`,
          }),
          jsonLdItemList(
            list.map((g) => ({ slug: g.slug, name: g.name })),
            `${siteUrl()}/gear`,
            "/gear",
          ),
        ]}
      />
      <h1 className="display text-4xl">Gear</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Compatibility is the fact. A used RC-N2 does not become an RC-N3 because
        both say O4. Goggles do not cancel Flyer ID or VLOS. Yellow cells fit
        that airframe in this catalog; confirm firmware on the unit you hold.
      </p>

      {droneName ? (
        <p className="mt-4 text-sm">
          Highlighting{" "}
          <Link href={`/drones/${highlight}`} className="underline">
            {droneName}
          </Link>
          .{" "}
          <Link href={filter === "radio" ? "/gear" : `/gear?kind=${filter}`} className="underline">
            Clear
          </Link>
          {forDrone.length ? (
            <span className="text-muted">
              {" "}
              · listed: {forDrone.map((g) => g.shortName).join(", ")}
            </span>
          ) : null}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => chip(f === "radio" ? undefined : f, FILTER_LABEL[f], filter === f))}
      </div>

      <section className="mt-8">
        <h2 className="display text-2xl">Compatibility</h2>
        <p className="mt-1 text-sm text-muted">
          {list.length} of the gear catalog against {drones.length} airframes.
          Scroll sideways on a phone.
        </p>
        <div className="mt-4">
          <CompatMatrix items={list} highlight={highlight} />
        </div>
      </section>

      <ul className="mt-10 divide-y divide-rule border-y border-rule">
        {list.map((g) => (
          <li key={g.slug} className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 py-3">
            <div>
              <Link href={`/gear/${g.slug}`} className="display text-xl hover:underline sm:text-2xl">
                {g.name}
              </Link>
              <p className="mt-1 text-sm text-muted">
                {g.form} · {g.transmission} · {g.flies.length} airframe
                {g.flies.length === 1 ? "" : "s"}
              </p>
            </div>
            <div className="text-sm text-quiet">{KIND_LABEL[g.kind]}</div>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="display text-2xl">Compare</h2>
        <ul className="mt-3 space-y-2">
          {featured.map(({ a, b }) => (
            <li key={gearPairSlug(a, b)}>
              <Link href={`/compare/${gearPairSlug(a, b)}`} className="hover:underline">
                {a.shortName} vs {b.shortName}
              </Link>
              <span className="text-sm text-muted"> · which drones they fly</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
