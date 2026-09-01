import { drones } from "@/data/catalog";
import { KIND_LABEL, type Gear } from "@/data/gear";
import Link from "next/link";

export function CompatMatrix({
  items,
  highlight,
}: {
  items: Gear[];
  highlight?: string;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-max min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 w-[6.5rem] min-w-[6.5rem] bg-paper px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-quiet">
              Gear
            </th>
            {drones.map((d) => (
              <th
                key={d.slug}
                className={`w-[3.75rem] min-w-[3.75rem] px-0.5 py-2 text-left align-bottom text-[10px] font-medium leading-tight ${
                  highlight === d.slug ? "bg-[color-mix(in_srgb,var(--color-yellow)_28%,transparent)]" : "bg-paper"
                }`}
              >
                <Link href={`/drones/${d.slug}`} className="hover:underline">
                  {d.shortName}
                </Link>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((g) => (
            <tr key={g.slug} className="align-middle">
              <th className="sticky left-0 z-10 bg-paper px-2 py-1.5 text-left font-normal">
                <Link href={`/gear/${g.slug}`} className="hover:underline">
                  {g.shortName}
                </Link>
                <div className="text-[10px] uppercase tracking-wider text-quiet">
                  {KIND_LABEL[g.kind]}
                </div>
              </th>
              {drones.map((d) => {
                const fits = g.flies.includes(d.slug);
                const hi = highlight === d.slug;
                return (
                  <td
                    key={d.slug}
                    className={`px-1 py-1.5 text-center ${
                      fits
                        ? "bg-[color-mix(in_srgb,var(--color-yellow)_22%,transparent)]"
                        : hi
                          ? "bg-[color-mix(in_srgb,var(--color-yellow)_10%,transparent)]"
                          : ""
                    }`}
                  >
                    <span
                      className={`num text-xs ${fits ? "text-ink" : "text-quiet"}`}
                      title={
                        fits
                          ? `${g.shortName} listed for ${d.shortName}`
                          : `${g.shortName} not listed for ${d.shortName}`
                      }
                    >
                      {fits ? "Fits" : "—"}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
