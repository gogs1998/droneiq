"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { featuredPairs } from "@/data/featured-matchups";
import type { Drone } from "@/data/types";
import { comparePath } from "@/lib/seo";
import { SeriesChipRows, SpecChip, useIFly } from "./IFly";

export function HomeBench({ drones }: { drones: Drone[] }) {
  const [mine, setMine] = useIFly();
  const [picked, setPicked] = useState<string[]>([]);
  const router = useRouter();

  const home = mine ? drones.find((d) => d.slug === mine) : undefined;

  const options = useMemo(
    () => drones.filter((d) => d.slug !== mine),
    [drones, mine],
  );

  const suggested = useMemo(() => {
    if (!mine) return [];
    const seen = new Set<string>();
    const out: Drone[] = [];
    for (const [a, b] of featuredPairs) {
      const other = a === mine ? b : b === mine ? a : null;
      if (!other || seen.has(other)) continue;
      seen.add(other);
      const d = drones.find((x) => x.slug === other);
      if (d) out.push(d);
      if (out.length >= 4) break;
    }
    return out;
  }, [drones, mine]);

  function toggleMine(slug: string) {
    setMine(mine === slug ? null : slug);
    setPicked((cur) => cur.filter((s) => s !== slug));
  }

  function toggleAgainst(slug: string) {
    setPicked((cur) => {
      if (cur.includes(slug)) return cur.filter((s) => s !== slug);
      if (cur.length >= 3) return cur;
      return [...cur, slug];
    });
  }

  function go() {
    const slugs = [mine, ...picked].filter(Boolean) as string[];
    const unique = [...new Set(slugs)];
    if (unique.length < 2) return;
    router.push(comparePath(unique));
  }

  return (
    <div id="bench" className="scroll-mt-8 border border-ink bg-paper-2 px-4 py-6 md:px-6">
      <p className="text-xs uppercase tracking-wider text-quiet">Or assemble a sheet</p>
      <p className="mt-2 max-w-xl text-muted">
        I fly stays in this browser. One airframe, then up to three against it —
        or tick two without setting I fly.
      </p>

      <div className="mt-6" data-section="ifly">
        <p className="text-xs uppercase tracking-wider text-quiet">I fly</p>
        <div className="mt-2">
          <SeriesChipRows
            drones={drones}
            selected={mine ? [mine] : []}
            onToggle={toggleMine}
          />
        </div>
      </div>

      <div className="mt-6" data-section="against">
        <p className="text-xs uppercase tracking-wider text-quiet">Against (up to three)</p>
        {home && suggested.length > 0 ? (
          <div className="mt-3">
            <p className="text-sm text-muted">Sheets people open from {home.shortName}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {suggested.map((d) => (
                <SpecChip
                  key={d.slug}
                  on={picked.includes(d.slug)}
                  disabled={!picked.includes(d.slug) && picked.length >= 3}
                  onClick={() => toggleAgainst(d.slug)}
                >
                  {d.shortName}
                </SpecChip>
              ))}
            </div>
          </div>
        ) : null}
        {home ? (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm text-muted hover:text-ink">
              Any other airframe
            </summary>
            <div className="mt-3">
              <SeriesChipRows
                drones={options}
                selected={picked}
                onToggle={toggleAgainst}
                maxSelected={3}
              />
            </div>
          </details>
        ) : (
          <div className="mt-3">
            <SeriesChipRows
              drones={options}
              selected={picked}
              onToggle={toggleAgainst}
              maxSelected={3}
            />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={go}
        disabled={(mine ? 1 : 0) + picked.length < 2}
        className="mt-6 border border-ink bg-yellow px-5 py-2 text-sm font-medium text-ink disabled:cursor-not-allowed disabled:opacity-40"
      >
        Open comparison
      </button>
    </div>
  );
}
