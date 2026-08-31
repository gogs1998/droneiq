import { reviewById, reviewsComparing, reviewsFor } from "@/data/reviews";
import type { Drone } from "@/data/types";

export function ReviewsShelf({
  drones,
  mode,
}: {
  drones: Drone[];
  mode: "drone" | "compare";
}) {
  const slugs = drones.map((d) => d.slug);
  const items =
    mode === "compare" && slugs.length >= 2
      ? reviewsComparing(slugs).length
        ? reviewsComparing(slugs)
        : reviewsFor(...slugs).slice(0, 6)
      : reviewsFor(...slugs);

  const consensus =
    mode === "drone" && drones.length === 1 ? drones[0].reviews.consensus : null;

  if (!items.length && !consensus) return null;

  return (
    <section className="mt-12">
      <h2 className="display text-2xl">
        {mode === "compare" ? "Reviews that put these together" : "Reviews"}
      </h2>
      {consensus ? (
        <div className="mt-4 max-w-2xl border border-rule bg-paper-2 px-4 py-4">
          <p className="text-xs uppercase tracking-wider text-quiet">
            From {drones[0].reviews.itemIds.length} reviews, as of{" "}
            {drones[0].reviews.asOf} — not a DroneIQ flight test
          </p>
          <p className="mt-2 text-[0.95rem] leading-relaxed">{consensus.text}</p>
          <ul className="mt-3 space-y-1 text-xs text-muted">
            {consensus.citations.map((c) => {
              const r = reviewById(c.reviewId);
              return (
                <li key={c.reviewId}>
                  {r ? (
                    <a href={r.url} className="underline">
                      {r.outlet}
                    </a>
                  ) : (
                    c.reviewId
                  )}
                  {": "}
                  {c.claim}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
      <ul className="mt-4 divide-y divide-rule border-y border-rule">
        {items.map((r) => (
          <li key={r.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
            <div>
              <a href={r.url} className="text-ink hover:underline">
                {r.title}
              </a>
              <p className="mt-1 text-xs text-muted">{r.tested}</p>
            </div>
            <div className="num text-xs text-quiet">
              {r.outlet}
              {r.type === "youtube" ? " · YouTube" : ""}
              {r.runtimeMin ? ` · ${r.runtimeMin} min` : ""} · {r.date}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
