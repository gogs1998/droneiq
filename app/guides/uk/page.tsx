import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { jsonLdFaq, jsonLdWebPage, pageMeta, siteUrl } from "@/lib/seo";

const TITLE = "UK Open category: Flyer ID, class marks, Remote ID";
const DESC =
  "March 2026 CAA rules for the DJI drones on this site: Flyer ID from 100 g, Operator ID, C0/C1/C2, A1/A2/A3, Remote ID, CE vs FCC. Not legal advice.";

const FAQS = [
  {
    q: "Do I need a Flyer ID for a Mini or Neo?",
    a: "Yes, if it weighs 100 g or more — that is every camera drone in this catalog. The March 2026 CAA Drone Code draws the Flyer ID line at 100 g, not 250 g. Operator ID is separate: 250 g, or 100 g with a camera. Again, every drone here has a camera.",
  },
  {
    q: "What does 250 g still decide?",
    a: "Class and Open subcategory, not whether you sit the test. C0 / under 250 g can fly in A1 (over uninvolved people, not crowds) with the airframe and battery you actually take off with. A Plus battery can push a Mini into C1. Always weigh yours.",
  },
  {
    q: "When is Remote ID required?",
    a: "From 1 January 2026 when flying UK1, UK2 or UK3. C-class drones fly as the matching UK class until 31 December 2027, so C1 Air / Avata and C2 Mavic are in that set. UK0 / C0 camera Minis are later (Open category: 1 January 2028). This is not the US Remote ID rule.",
  },
  {
    q: "Why does the spec table print CE range, not the big DJI number?",
    a: "UK radios are CE. DJI’s marketing kilometre figure is usually FCC (US), often about twice CE. You also fly visual line of sight. A 10 km CE Mini and a 15 km CE Mavic are the same practical radio for a legal UK flight.",
  },
];

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: "/guides/uk",
});

export default function UkOpenGuide() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-8 md:px-6">
      <JsonLd
        data={[
          jsonLdWebPage({
            name: TITLE,
            description: DESC,
            url: `${siteUrl()}/guides/uk`,
          }),
          jsonLdFaq(FAQS),
        ]}
      />
      <p className="text-xs uppercase tracking-wider text-quiet">Guide</p>
      <h1 className="display mt-2 text-4xl">Flying in the UK</h1>
      <p className="mt-4 text-muted">
        The March 2026 CAA Drone Code, applied to the DJI airframes in this
        catalog. Not legal advice. The code applies to the aircraft and battery
        you actually take off with — weigh it.
      </p>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Flyer ID and Operator ID</h2>
        <p className="mt-2 text-muted">
          Two different things. Flyer ID is the free competence test for the
          person at the sticks. Operator ID is the annual registration you label
          on the airframe.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          <li>
            <strong className="font-medium text-ink">Flyer ID</strong> if it
            weighs <strong className="font-medium text-ink">100 g or more</strong>
            . That is every drone here, including Neo (135 g) and Mini 5 Pro
            (249.9 g ± 4 g).
          </li>
          <li>
            <strong className="font-medium text-ink">Operator ID</strong> if it
            weighs 250 g or more, <em>or</em> 100 g or more <em>and has a
            camera</em>. Every drone here has a camera, so Operator ID as well.
          </li>
          <li>
            Under 100 g: neither is required (Flyer ID is recommended). Nothing
            in this catalog is under 100 g.
          </li>
        </ul>
        <p className="mt-3 text-sm text-muted">
          Source:{" "}
          <a
            href="https://www.caa.co.uk/drones/open-category/drone-code/getting-what-you-need-to-fly-legally/"
            className="underline"
          >
            CAA — getting what you need to fly legally
          </a>
          . The 250 g line is still real; it is no longer the Flyer ID line.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">C0, C1, C2 and A1 / A2 / A3</h2>
        <p className="mt-2 text-muted">
          The class mark on the aircraft is what you fly, not the marketing
          name. Until 31 December 2027 you may fly a C-class drone as the
          matching UK class (C0 as UK0, C1 as UK1, C2 as UK2).
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-muted">
          <li>
            <strong className="font-medium text-ink">A1 Over People</strong> —
            under 250 g, UK0, UK1, C0; and C1 until 31 Dec 2027. You may fly
            closer than 50 m and over uninvolved people. Not crowds. Not
            assemblies.
          </li>
          <li>
            <strong className="font-medium text-ink">A2 Near People</strong> —
            UK2 / C2 with an A2 Certificate of Competence: 30 m, or 5 m in
            low-speed mode. No overflight. Without the CofC, a C2 is A3.
          </li>
          <li>
            <strong className="font-medium text-ink">A3 Far from People</strong> —
            50 m from uninvolved people and 150 m from residential,
            recreational, commercial or industrial areas.
          </li>
          <li>Open-category height is 120 m above the surface. That is not DJI’s “max takeoff altitude” (a mountain figure).</li>
        </ul>
        <p className="mt-3 text-sm text-muted">
          Mini 5 Pro: Fly More Combo is C0; Fly More Combo Plus is C1. Fitting a
          Plus battery to a C0 airframe takes it over the C0/UK0 MTOM. Weigh
          the pack you fly.
        </p>
        <p className="mt-3 text-sm text-muted">
          Unmarked airframes — Mini 2, Air 2S, anything without a class sticker
          — fly A3 Far from People. Under 250 g does not buy A1 if there is no
          class mark. That is why a 242 g Mini 2 is not the same legal drone as
          a C0 Mini 4K.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">Remote ID</h2>
        <p className="mt-2 text-muted">
          From 1 January 2026, UK1 / UK2 / UK3 (and C1 / C2 treated as those
          until 31 Dec 2027) must fly with Remote ID switched on. That is Air,
          Mavic, Avata 2 — not the US RID rule. UK0 / C0 camera drones (the
          Minis and Neo) are later for Open category: 1 January 2028. Put the
          Remote ID from your CAA operator account into the aircraft as DJI
          describes; this page will not invent menu steps.
        </p>
        <p className="mt-3 text-sm text-muted">
          Source:{" "}
          <a
            href="https://www.caa.co.uk/drones/open-category/drone-code/getting-an-operator-id-before-you-fly-points-30-to-35/"
            className="underline"
          >
            CAA Drone Code points 30–35
          </a>
          .
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">CE vs FCC</h2>
        <p className="mt-2 text-muted">
          Spec tables here print CE video range for a reason. UK transmitters
          are CE. DJI’s large kilometre number is usually FCC (United States),
          often about twice CE. You still fly visual line of sight. Sport speed
          is a flight mode, not a region, unless DJI printed an EU cap (Air 3 /
          Air 3S do: 19 m/s in the EU).
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-medium">FPV is still VLOS</h2>
        <p className="mt-2 text-muted">
          Goggles do not cancel Flyer ID, Operator ID, height, or visual line of
          sight. Avata is a different sport from a Mini; the paperwork is not a
          free pass.
        </p>
      </section>

      <p className="mt-10 text-sm text-muted">
        Then look at the{" "}
        <Link href="/drones" className="underline">
          spec for the model you actually hold
        </Link>
        . Used photos and Plus batteries lie about class.
      </p>
    </article>
  );
}
