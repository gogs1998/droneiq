import Link from "next/link";
import { JOBS } from "@/data/catalog";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="display text-2xl tracking-tight text-ink">
          DroneIQ
        </Link>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <Link href="/drones" className="hover:text-ink">
            Drones
          </Link>
          <Link href="/#bench" className="hover:text-ink">
            Bench
          </Link>
          {JOBS.map((j) => (
            <Link key={j.slug} href={`/for/${j.slug}`} className="hover:text-ink">
              {j.title}
            </Link>
          ))}
          <Link href="/guides/buying-used" className="hover:text-ink">
            Used
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted md:px-6">
        <p>
          Every figure names a source and the date it was read. Prices are UK
          snapshots, not live ticks. This is not legal advice; the CAA drone
          code applies to the airframe and battery you actually fly.
        </p>
        <p>
          <a href="https://iqlabs.app" className="text-ink hover:underline">
            A tool from IQ Labs
          </a>
          {" · "}
          <Link href="/drones" className="hover:text-ink">
            Catalog
          </Link>
          {" · "}
          <Link href="/guides/buying-used" className="hover:text-ink">
            Buying used
          </Link>
        </p>
      </div>
    </footer>
  );
}
