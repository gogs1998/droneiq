import type { Drone } from "@/data/types";
import { gbp } from "@/lib/compare";

export function ComboDecoder({ drone }: { drone: Drone }) {
  if (!drone.combos.length) return null;
  return (
    <section className="mt-12">
      <h2 className="display text-2xl">Which box</h2>
      <p className="mt-1 text-sm text-muted">
        DJI sells the same airframe in several cartons. EAN is the barcode on
        that UK box when a retailer cited one. Prices as of {drone.prices.asOf}.
      </p>
      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {drone.combos.map((c) => (
          <li
            key={c.id}
            className="flex flex-col gap-2 py-3 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-3"
          >
            <div className="min-w-0">
              <a href={c.url} className="font-medium hover:underline">
                {c.name}
              </a>
              <p className="mt-1 max-w-xl text-sm text-muted">{c.blurb}</p>
              {c.ean || c.mpn ? (
                <p className="num mt-1 text-xs text-quiet">
                  {c.ean ? `EAN ${c.ean}` : null}
                  {c.ean && c.mpn ? " · " : null}
                  {c.mpn ? `MPN ${c.mpn}` : null}
                </p>
              ) : null}
            </div>
            <div className="num text-lg">{gbp(c.gbp)}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
