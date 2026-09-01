import { photoForGear } from "@/data/gear-photos";
import type { Gear } from "@/data/gear";
import Image from "next/image";

type Variant = "hero" | "thumb" | "header";

export function GearPhoto({
  item,
  variant = "hero",
  priority = false,
}: {
  item: Gear;
  variant?: Variant;
  priority?: boolean;
}) {
  const p = photoForGear(item.slug);
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
        ? "mb-2 aspect-[3/2] w-20 shrink-0 overflow-hidden border border-rule bg-paper-2 sm:w-28"
        : "aspect-[3/2] w-[4.75rem] shrink-0 overflow-hidden border border-rule bg-paper-2 sm:w-28";

  return (
    <figure className={frame}>
      <Image
        src={p.src}
        alt={p.alt}
        width={1200}
        height={800}
        sizes={sizes}
        priority={priority}
        className="aspect-[3/2] h-auto w-full object-cover"
        title={p.credit}
      />
      {variant === "hero" ? (
        <figcaption className="px-3 py-1.5 text-[11px] leading-snug text-quiet">
          <a href={p.sourceUrl} className="hover:underline">
            {p.credit}
          </a>
        </figcaption>
      ) : (
        <figcaption className="sr-only">{p.credit}</figcaption>
      )}
    </figure>
  );
}
