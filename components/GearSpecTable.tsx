import { FactLabel } from "@/components/FactExplainer";
import { glossary } from "@/data/glossary";
import type { Gear } from "@/data/gear";
import { gearSpecGroups, gearSpecRows, type GearSpecRow } from "@/lib/gear-compare";
import Link from "next/link";

export function GearSpecTable({ items }: { items: Gear[] }) {
  const rows = gearSpecRows(items);
  const grouped = gearSpecGroups(rows);
  const solo = items.length === 1;
  return (
    <div>
      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table
          className={`w-full border-separate border-spacing-0 text-sm ${solo ? "" : "min-w-[28rem] sm:min-w-[36rem]"}`}
        >
          <thead>
            <tr>
              <th className="sticky left-0 z-10 max-w-[10rem] bg-paper px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-quiet sm:max-w-none sm:px-3 sm:py-3">
                Spec
              </th>
              {items.map((g) => (
                <th
                  key={g.slug}
                  className="min-w-[8.5rem] bg-paper px-2 py-2 text-left align-bottom sm:min-w-[10rem] sm:px-3 sm:py-3"
                >
                  {solo ? (
                    <span className="display text-lg text-ink">{g.shortName}</span>
                  ) : (
                    <Link
                      href={`/gear/${g.slug}`}
                      className="display text-lg text-ink hover:underline"
                    >
                      {g.shortName}
                    </Link>
                  )}
                  {solo ? null : (
                    <div className="num mt-1 text-xs text-muted">
                      {g.form} · {g.transmission}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grouped.map((g) => (
              <GearGroupRows
                key={g.name}
                group={g.name}
                rows={g.rows}
                cols={items.length}
                solo={solo}
              />
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-quiet">
        The <span className="italic">i</span> beside a spec is the explainer —
        hover or tap.
      </p>
    </div>
  );
}

function GearGroupRows({
  group,
  rows,
  cols,
  solo,
}: {
  group: string;
  rows: GearSpecRow[];
  cols: number;
  solo: boolean;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={cols + 1}
          className="bg-paper-2 px-2 py-2 text-xs font-medium uppercase tracking-wider text-muted sm:px-3"
        >
          {group}
        </td>
      </tr>
      {rows.map((r) => (
        <tr key={r.key} className="border-b border-rule align-top">
          <th className="sticky left-0 z-10 max-w-[10rem] bg-paper px-2 py-2 text-left font-normal leading-snug break-words sm:max-w-none sm:px-3 sm:py-3">
            <FactLabel label={r.label} entry={glossary[r.key]} />
          </th>
          {r.values.map((v, i) => {
            const differ = !solo && r.values.some((x) => x !== r.values[0]);
            return (
              <td
                key={i}
                className={`min-w-[8.5rem] px-2 py-2 align-top sm:min-w-[10rem] sm:px-3 sm:py-3 ${
                  differ && r.key === "flies" ? "bg-[color-mix(in_srgb,var(--color-yellow)_22%,transparent)]" : ""
                }`}
              >
                <div className="num text-[0.95rem] break-words text-ink">{v}</div>
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
