import { DronePhoto } from "@/components/DronePhoto";
import type { Drone } from "@/data/types";
import { pairSlug } from "@/lib/seo";
import Link from "next/link";

export function MatchupRow({
  da,
  db,
  lede,
  priority = false,
  prominent = false,
}: {
  da: Drone;
  db: Drone;
  lede?: string;
  priority?: boolean;
  prominent?: boolean;
}) {
  const href = `/compare/${pairSlug(da, db)}`;
  const spec = `${da.cameras[0].sensor} · ${da.weightG} g against ${db.cameras[0].sensor} · ${db.weightG} g`;

  return (
    <li className={`flex items-start gap-3 ${prominent ? "py-4" : "py-3"} sm:items-center`}>
      <Link href={href} className="flex shrink-0 gap-1">
        <DronePhoto drone={da} variant="thumb" priority={priority} />
        <DronePhoto drone={db} variant="thumb" priority={priority} />
      </Link>
      <div className="min-w-0">
        <Link
          href={href}
          className={
            prominent
              ? "display text-xl leading-tight hover:underline sm:text-2xl"
              : "text-lg hover:underline"
          }
        >
          {da.shortName} vs {db.shortName}
        </Link>
        <p className={`text-sm text-muted ${prominent ? "mt-1" : ""}`}>{lede ?? spec}</p>
      </div>
    </li>
  );
}
