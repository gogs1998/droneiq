import type { Drone } from "@/data/types";
import { gbp } from "@/lib/compare";

export function ComboDecoder({ drone }: { drone: Drone }) {
  if (!drone.combos.length) return null;
  return (
    <section className="mt-12">
      <h2 className="display text-2xl">Which box</h2>
      <p className="mt-1 text-sm text-muted">
        DJI sells the same airframe in several cartons. Prices as of{" "}
        {drone.prices.asOf}.
      </p>
      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {drone.combos.map((c) => (
          <li key={c.id} className="flex flex-wrap items-baseline justify-between gap-3 py-3">
            <div>
              <a href={c.url} className="font-medium hover:underline">
                {c.name}
              </a>
              <p className="mt-1 max-w-xl text-sm text-muted">{c.blurb}</p>
            </div>
            <div className="num text-lg">{gbp(c.gbp)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
