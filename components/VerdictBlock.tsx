import type { Drone } from "@/data/types";
import { verdictFor } from "@/lib/compare";
import { CopyVerdict } from "./CopyVerdict";

export function VerdictBlock({ drones }: { drones: Drone[] }) {
  const v = verdictFor(drones);
  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-wider text-yellow-ink">
        Would you notice?
      </p>
      <p className="mt-2 text-[0.95rem] leading-relaxed">{v.paragraph}</p>
      <div className="mt-4">
        <CopyVerdict text={v.paragraph} />
      </div>
    </div>
  );
}
