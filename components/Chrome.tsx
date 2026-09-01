import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-6xl items-baseline justify-between gap-3 px-4 py-3 md:gap-6 md:px-6 md:py-4">
        <Link href="/" className="display text-xl tracking-tight text-ink md:text-2xl">
          DroneIQ
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 text-xs text-muted sm:text-sm md:gap-x-4">
          <Link href="/drones" className="hover:text-ink">
            Drones
          </Link>
          <Link href="/gear" className="hover:text-ink">
            Gear
          </Link>
          <Link href="/news" className="hover:text-ink">
            News
          </Link>
          <Link href="/#bench" className="hover:text-ink">
            Bench
          </Link>
          <Link href="/for" className="hover:text-ink">
            For
          </Link>
          <Link href="/guides/uk" className="hover:text-ink">
            UK
          </Link>
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
            An IQ Labs product
          </a>
          {" · "}
          <Link href="/drones" className="hover:text-ink">
            Catalog
          </Link>
          {" · "}
          <Link href="/gear" className="hover:text-ink">
            Gear
          </Link>
          {" · "}
          <Link href="/news" className="hover:text-ink">
            News
          </Link>
          {" · "}
          <Link href="/for" className="hover:text-ink">
            Pick by job
          </Link>
          {" · "}
          <Link href="/guides/uk" className="hover:text-ink">
            Flying in the UK
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

/**
 * Cloudflare Web Analytics. iqlabs.app is DNS-only (grey cloud), so the
 * beacon has to live in the HTML — the edge cannot inject it.
 * Shared iqlabs.app site tag; override with NEXT_PUBLIC_CF_BEACON_TOKEN.
 */
export function CloudflareBeacon() {
  const token =
    process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ||
    "c504a8ead0414297aa303dd4f37b398e";
  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
