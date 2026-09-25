import { getDrone } from "@/data/catalog";
import { homeSheets } from "@/data/featured-matchups";
import { pairSlug, siteUrl, titleForPair } from "@/lib/seo";

/** Answer-engine hints. Absolute URLs only. No claims that are not already on those pages. */
export function GET() {
  const base = siteUrl();
  const featured = homeSheets.slice(0, 5).flatMap((sheet) => {
    const a = getDrone(sheet.a);
    const b = getDrone(sheet.b);
    if (!a || !b) return [];
    return [`- [${titleForPair(a, b)}](${base}/compare/${pairSlug(a, b)})`];
  });

  const body = [
    "# DroneIQ",
    "",
    "> Sourced DJI specs. Tables print CE range, not FCC. UK class sits next to weight. Prices are dated UK snapshots. Not legal advice.",
    "",
    `- [UK drone rules](${base}/guides/uk)`,
    `- [Drones](${base}/drones)`,
    `- [Compare](${base}/compare)`,
    `- [About](${base}/about)`,
    "",
    "## Featured compares",
    "",
    ...featured,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
