"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Drone } from "@/data/types";
import { comparePath } from "@/lib/seo";
import { IFlySelect } from "./IFly";
import { useIFly } from "./IFly";

export function HomeBench({ drones }: { drones: Drone[] }) {
  const [mine] = useIFly();
  const [picked, setPicked] = useState<string[]>([]);
  const router = useRouter();

  const options = useMemo(
    () => drones.filter((d) => d.slug !== mine),
    [drones, mine],
  );

  function toggle(slug: string) {
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
      <p className="text-xs uppercase tracking-wider text-quiet">The bench</p>
      <h1 className="display mt-2 max-w-xl text-4xl leading-none md:text-5xl">
        Compare drones by the numbers you would actually notice.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Specs with sources, CE range not FCC, UK class, and a plain-language
        verdict. Not another video essay.
      </p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <IFlySelect drones={drones.map((d) => ({ slug: d.slug, name: d.name }))} />
        <div>
          <p className="text-xs uppercase tracking-wider text-quiet">
            Against (up to three)
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {options.map((d) => {
              const on = picked.includes(d.slug);
              return (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => toggle(d.slug)}
                  className={`border px-2 py-1 text-sm ${
                    on ? "border-ink bg-ink text-paper" : "border-rule text-ink"
                  }`}
                >
                  {d.shortName}
                </button>
              );
            })}
          </div>
        </div>
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
