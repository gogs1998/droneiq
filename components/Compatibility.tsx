import { keepFromTo, partsFor } from "@/data/parts";
import type { Drone } from "@/data/types";

export function Compatibility({ drone }: { drone: Drone }) {
  const mine = ["battery", "rc", "nd", "goggles"] as const;
  return (
    <section className="mt-12">
      <h2 className="display text-2xl">Parts that fit</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Battery family, controllers, ND, goggles. Confirm firmware before you
        mix RCs.
      </p>
      <dl className="mt-4 grid gap-4 sm:grid-cols-2">
        {mine.map((kind) => {
          const list = partsFor(drone.slug, kind);
          return (
            <div key={kind} className="border border-rule px-3 py-3">
              <dt className="text-xs uppercase tracking-wider text-quiet">{kind}</dt>
              <dd className="mt-1 text-sm">
                {list.length
                  ? list.map((p) => (
                      <p key={p.id}>
                        {p.name}
                        <span className="block text-xs text-muted">{p.note}</span>
                      </p>
                    ))
                  : "—"}
              </dd>
            </div>
          );
        })}
      </dl>
    </section>
  );
}

export function YouCanKeep({ from, to }: { from: Drone; to: Drone }) {
  const { keep, lose } = keepFromTo(from.slug, to.slug);
  return (
    <p className="text-sm leading-relaxed text-muted">
      From {from.shortName} to {to.shortName} you can keep{" "}
      {keep.length ? keep.map((p) => p.name).join(", ") : "none of the listed packs"}.
      You leave behind {lose.length ? lose.map((p) => p.name).join(", ") : "nothing we track"}.
    </p>
  );
}
