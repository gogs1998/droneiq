import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Buying a used DJI drone",
  description:
    "A short used-buy checklist for DJI Minis, Airs, Mavics and Avata: gimbal, batteries, props, ND, pairing.",
  path: "/guides/buying-used",
});

export default function BuyingUsed() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={jsonLdWebPage({
          name: "Buying a used DJI drone",
          description:
            "A short used-buy checklist for DJI Minis, Airs, Mavics and Avata.",
          url: `${siteUrl()}/guides/buying-used`,
        })}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">Guide</p>
      <h1 className="display mt-2 text-4xl">Buying used</h1>
      <p className="mt-4 text-muted">
        One list, linked from every CeX and eBay row. Not per-model fluff.
        Meet in person where you can; fly it before you pay when they will let
        you.
      </p>
      <ol className="mt-8 list-decimal space-y-6 pl-5">
        <li>
          <h2 className="text-lg font-medium">Gimbal play</h2>
          <p className="mt-1 text-muted">
            Power on, let it finish the tone. The camera should hang level and
            not grind. A bent ribbon or a knock in transit is the expensive
            fault. Avata does not have a Mini-style 3-axis gimbal — skip this
            check and look at the lens and guards instead.
          </p>
        </li>
        <li>
          <h2 className="text-lg font-medium">Battery cycles</h2>
          <p className="mt-1 text-muted">
            In DJI Fly, read cycle count on every pack. Swollen cells are a
            no. A Fly More with two tired packs is not a bargain. Plus batteries
            can change UK class on a Mini — ask which pack is in the airframe.
          </p>
        </li>
        <li>
          <h2 className="text-lg font-medium">Propellers and arms</h2>
          <p className="mt-1 text-muted">
            Hairline cracks at the hub, chewed tips, floppy arms. Props are
            cheap; a folded arm that will not lock is not.
          </p>
        </li>
        <li>
          <h2 className="text-lg font-medium">ND filters and front glass</h2>
          <p className="mt-1 text-muted">
            Missing ND is a few tens of pounds. A scratched front element is
            the picture. Mini 4 Pro filters do not fit Mini 5 Pro.
          </p>
        </li>
        <li>
          <h2 className="text-lg font-medium">Controller pairing</h2>
          <p className="mt-1 text-muted">
            Confirm the RC in the photo is the protocol this airframe speaks
            (O3 vs O4, RC-N2 vs RC 2). A beautiful RC 2 does not fly a Mini 3
            Pro. Ask them to bind it in front of you.
          </p>
        </li>
        <li>
          <h2 className="text-lg font-medium">Logs and account</h2>
          <p className="mt-1 text-muted">
            Stolen drones get brick-traced. Ask for original invoice or DJI
            account transfer. Care Refresh is usually tied to the first owner.
          </p>
        </li>
      </ol>
      <p className="mt-8 text-sm text-muted">
        Then look at the{" "}
        <Link href="/drones" className="underline">
          spec
        </Link>{" "}
        for the model you are actually holding — used photos lie about which
        Mini it is. Plus batteries can change UK class; the{" "}
        <Link href="/guides/uk" className="underline">
          UK Open explainer
        </Link>{" "}
        is the paperwork page.
      </p>
    </article>
  );
}
