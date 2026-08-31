import { photoFor } from "@/data/photos";
import type { Drone } from "@/data/types";
import Image from "next/image";

type Variant = "hero" | "thumb" | "header";

export function DronePhoto({
  drone,
  variant = "hero",
  priority = false,
}: {
  drone: Drone;
  variant?: Variant;
  priority?: boolean;
}) {
  const p = photoFor(drone.slug);
  if (!p) return null;

  const sizes =
    variant === "hero"
      ? "(max-width: 640px) 100vw, 640px"
      : variant === "header"
        ? "7rem"
        : "6rem";

  const frame =
    variant === "hero"
      ? "overflow-hidden border border-rule bg-paper-2"
      : variant === "header"
        ? "mb-2 w-24 overflow-hidden border border-rule bg-paper-2 sm:w-28"
        : "h-16 w-[5.5rem] shrink-0 overflow-hidden border border-rule bg-paper-2 sm:h-[4.5rem] sm:w-28";

  const imgClass =
    variant === "hero"
      ? "aspect-[3/2] h-auto w-full object-cover"
      : "h-full w-full object-cover";

  return (
    <figure className={frame}>
      <Image
        src={p.src}
        alt={p.alt}
        width={1200}
        height={800}
        sizes={sizes}
        priority={priority}
        className={imgClass}
        title={p.credit}
      />
      {variant === "hero" ? (
        <figcaption className="px-3 py-1.5 text-[11px] leading-snug text-quiet">
          {p.sourceUrl ? (
            <a href={p.sourceUrl} className="hover:underline">
              {p.credit}
            </a>
          ) : (
            p.credit
          )}
        </figcaption>
      ) : (
        <figcaption className="sr-only">{p.credit}</figcaption>
      )}
    </figure>
  );
}
