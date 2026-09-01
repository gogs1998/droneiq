import { CopyVerdict } from "@/components/CopyVerdict";
import type { Gear } from "@/data/gear";
import { gearVerdict } from "@/lib/gear-compare";

export function GearVerdictBlock({ a, b }: { a: Gear; b: Gear }) {
  const v = gearVerdict(a, b);
  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-wider text-yellow-ink">
        Compatibility
      </p>
      <p className="mt-2 text-[0.95rem] leading-relaxed">{v.paragraph}</p>
      <div className="mt-4">
        <CopyVerdict text={v.paragraph} />
      </div>
    </div>
  );
}
