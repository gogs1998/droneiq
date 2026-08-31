"use client";

import { getDrone } from "@/data/catalog";
import type { Drone } from "@/data/types";
import { upgradeCost } from "@/lib/compare";
import { useIFly } from "./IFly";

export function UpgradeCost({ targets }: { targets: Drone[] }) {
  const [mine] = useIFly();
  const home = mine ? getDrone(mine) : undefined;
  if (!home) {
    return (
      <p className="text-sm text-muted">
        Set <strong>I fly</strong> on the home bench to see net upgrade cost
        from your airframe (CeX cash vs used / RRP). It stays in this browser.
      </p>
    );
  }
  const others = targets.filter((d) => d.slug !== home.slug);
  if (!others.length) return null;
  return (
    <div className="border border-yellow bg-paper-2 px-4 py-4">
      <p className="text-xs uppercase tracking-wider text-yellow-ink">
        From your {home.shortName}
      </p>
      <ul className="mt-2 space-y-2 text-sm leading-relaxed">
        {others.map((d) => (
          <li key={d.slug}>{upgradeCost(home, d).lines}</li>
        ))}
      </ul>
    </div>
  );
}
