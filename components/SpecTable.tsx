import { DronePhoto } from "@/components/DronePhoto";
import { glossary } from "@/data/glossary";
import type { Drone } from "@/data/types";
import { groups, specRows, type SpecRow } from "@/lib/compare";
import Link from "next/link";

export function SpecTable({ drones }: { drones: Drone[] }) {
  const rows = specRows(drones);
  const grouped = groups(rows);
  const solo = drones.length === 1;
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table
        className={`w-full border-separate border-spacing-0 text-sm ${solo ? "" : "min-w-[28rem] sm:min-w-[36rem]"}`}
      >
        <thead>
          <tr>
            <th className="sticky left-0 z-10 max-w-[10rem] bg-paper px-2 py-2 text-left text-xs font-medium uppercase tracking-wider text-quiet sm:max-w-none sm:px-3 sm:py-3">
              Spec
            </th>
            {drones.map((d) => (
              <th
                key={d.slug}
                className="sticky top-0 bg-paper px-2 py-2 text-left align-bottom sm:px-3 sm:py-3"
              >
                {solo ? null : <DronePhoto drone={d} variant="header" />}
                {solo ? (
                  <span className="display text-lg text-ink">{d.shortName}</span>
                ) : (
                  <Link
                    href={`/drones/${d.slug}`}
                    className="display text-lg text-ink hover:underline"
                  >
                    {d.shortName}
                  </Link>
                )}
                {solo ? null : (
                  <div className="num mt-1 text-xs text-muted">
                    {d.ukClass} · {d.weightG} g
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grouped.map((g) => (
            <GroupRows
              key={g.name}
              group={g.name}
              rows={g.rows}
              cols={drones.length}
              solo={solo}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupRows({
  group,
  rows,
  cols,
  solo,
}: {
  group: string;
  rows: SpecRow[];
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
            <details className="group">
              <summary className="cursor-pointer list-none text-ink marker:hidden">
                <span className="border-b border-dotted border-quiet">
                  {r.label}
                </span>
                <span className="mt-1 hidden text-xs text-quiet sm:block">
                  {glossary[r.key]?.oneLiner}
                </span>
              </summary>
              <p className="mt-2 max-w-xs text-xs leading-relaxed text-muted">
                {glossary[r.key]?.body}
              </p>
              {glossary[r.key] ? (
                <a
                  href={glossary[r.key].sourceUrl}
                  className="mt-1 inline-block text-xs text-yellow-ink underline"
                >
                  {glossary[r.key].sourceLabel}
                </a>
              ) : null}
            </details>
          </th>
          {r.values.map((v, i) => {
            const flag = r.notice[i];
            const win = r.winnerIndex === i;
            return (
              <td
                key={i}
                className={`px-2 py-2 sm:px-3 sm:py-3 ${
                  !solo && flag === "notice"
                    ? "bg-[color-mix(in_srgb,var(--color-yellow)_22%,transparent)]"
                    : ""
                }`}
              >
                <div className="num text-[0.95rem] text-ink">{v}</div>
                {solo ? null : win && flag !== "same" ? (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-yellow-ink">
                    Ahead
                  </div>
                ) : !solo && flag === "same" ? (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-quiet">
                    Same
                  </div>
                ) : null}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
