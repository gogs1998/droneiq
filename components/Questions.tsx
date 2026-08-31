import type { FaqItem } from "@/lib/compare";

export function Questions({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;
  return (
    <section className="mt-12 max-w-2xl">
      <p className="text-xs uppercase tracking-wider text-quiet">Questions</p>
      <div className="mt-4 space-y-8">
        {items.map((item) => (
          <div key={item.q}>
            <h2 className="text-lg font-medium leading-snug">{item.q}</h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
