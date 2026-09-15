import Link from "next/link";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-quiet">
      <ol className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-baseline gap-x-2">
              {i > 0 ? <span aria-hidden="true">/</span> : null}
              {item.href && !last ? (
                <Link href={item.href} className="hover:text-ink">
                  {item.name}
                </Link>
              ) : (
                <span className="text-muted">{item.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
