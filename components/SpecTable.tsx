import { glossary } from "@/data/glossary";
import type { Drone } from "@/data/types";
import { groups, specRows, type SpecRow } from "@/lib/compare";
import Link from "next/link";

export function SpecTable({ drones }: { drones: Drone[] }) {
  const rows = specRows(drones);
  const grouped = groups(rows);
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-paper px-3 py-3 text-left text-xs font-medium uppercase tracking-wider text-quiet">
              Spec
            </th>
            {drones.map((d) => (
              <th
                key={d.slug}
                className="sticky top-0 bg-paper px-3 py-3 text-left align-bottom"
              >
                <Link href={`/drones/${d.slug}`} className="display text-lg text-ink hover:underline">
                  {d.shortName}
                </Link>
                <div className="num mt-1 text-xs text-muted">
                  {d.ukClass} · {d.weightG} g
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grouped.map((g) => (
            <GroupRows key={g.name} group={g.name} rows={g.rows} cols={drones.length} />
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
}: {
  group: string;
  rows: SpecRow[];
  cols: number;
}) {
  return (
    <>
      <tr>
        <td
          colSpan={cols + 1}
          className="bg-paper-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted"
        >
          {group}
        </td>
      </tr>
      {rows.map((r) => (
        <tr key={r.key} className="border-b border-rule align-top">
          <th className="sticky left-0 bg-paper px-3 py-3 text-left font-normal">
            <details className="group">
              <summary className="cursor-pointer list-none text-ink marker:hidden">
                <span className="border-b border-dotted border-quiet">
                  {r.label}
                </span>
                <span className="mt-1 block text-xs text-quiet">
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
                className={`px-3 py-3 ${
                  flag === "notice"
                    ? "bg-[color-mix(in_srgb,var(--color-yellow)_22%,transparent)]"
                    : ""
                }`}
              >
                <div className="num text-[0.95rem] text-ink">{v}</div>
                {win && flag !== "same" ? (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-yellow-ink">
                    Ahead
                  </div>
                ) : flag === "same" ? (
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
