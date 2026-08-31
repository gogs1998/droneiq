import type { ReviewItem } from "./types";

export const reviews: ReviewItem[] = [
  {
    id: "heliguy-mini5-air3s-mavic4",
    type: "article",
    outlet: "Heliguy",
    title: "Mini 5 Pro vs Mavic 4 Pro vs Air 3S",
    url: "https://www.heliguy.com/blogs/posts/mini-5-pro-vs-mavic-4-pro-vs-air-3s",
    date: "2025-10-01",
    tested: "Camera systems, gimbal rotation, weight class and who each airframe is for",
    models: ["mini-5-pro", "air-3s", "mavic-4-pro"],
  },
  {
    id: "gadgetscout-2026-lineup",
    type: "article",
    outlet: "Gadget Scout",
    title: "Best DJI drone 2026: Neo 2 vs Flip vs Mini 5 Pro vs Air 3S vs Mavic 4 Pro vs Avata 2",
    url: "https://www.gadgetscout.co.uk/articles/best-dji-drone-2026-comparison.html",
    date: "2026-01-15",
    tested: "UK running costs, legality vs weather, Mini 5 Pro vs Air 3S as a complementary pair",
    models: [
      "neo-2",
      "flip",
      "mini-5-pro",
      "air-3s",
      "mavic-4-pro",
      "avata-2",
    ],
  },
  {
    id: "dronexl-best-2026",
    type: "article",
    outlet: "DroneXL",
    title: "Best DJI drone (2026): Mini 5 Pro to Mavic 4 Pro",
    url: "https://dronexl.co/best/dji-drones/",
    date: "2026-03-01",
    tested: "Sub-250 argument, Mini 5 Pro 1-inch sensor, Air 3S telephoto vs Mini 5 Pro",
    models: [
      "neo",
      "neo-2",
      "flip",
      "mini-4k",
      "mini-4-pro",
      "mini-5-pro",
      "air-3s",
      "mavic-4-pro",
      "avata-2",
    ],
  },
  {
    id: "videomaker-mini4pro",
    type: "article",
    outlet: "Videomaker",
    title: "DJI Mini 4 Pro review: A mighty mini with minor missteps",
    url: "https://www.videomaker.com/reviews/cameras/dji-mini-4-pro-review-a-mighty-mini-with-minor-missteps/",
    date: "2023-10-12",
    tested: "4K/60 HDR, omnidirectional sensing, 249 g class, flight time",
    models: ["mini-4-pro"],
  },
  {
    id: "yt-search-mini5",
    type: "youtube",
    outlet: "YouTube",
    title: "DJI Mini 5 Pro reviews and Mini 4 Pro comparisons",
    url: "https://www.youtube.com/results?search_query=DJI+Mini+5+Pro+vs+Mini+4+Pro+review",
    date: "2025-09-17",
    tested: "Launch and long-term Mini 5 Pro flights versus Mini 4 Pro",
    models: ["mini-5-pro", "mini-4-pro"],
  },
  {
    id: "yt-search-air3s",
    type: "youtube",
    outlet: "YouTube",
    title: "DJI Air 3S vs Mini 5 Pro",
    url: "https://www.youtube.com/results?search_query=DJI+Air+3S+vs+Mini+5+Pro",
    date: "2025-10-01",
    tested: "Telephoto versus 1-inch Mini, wind, dual camera",
    models: ["air-3s", "mini-5-pro", "air-3"],
  },
  {
    id: "yt-search-mavic4",
    type: "youtube",
    outlet: "YouTube",
    title: "DJI Mavic 4 Pro reviews",
    url: "https://www.youtube.com/results?search_query=DJI+Mavic+4+Pro+review",
    date: "2025-05-01",
    tested: "Hasselblad 6K, infinity gimbal, triple camera, nightscape sensing",
    models: ["mavic-4-pro", "mavic-3-pro"],
  },
  {
    id: "yt-search-avata2",
    type: "youtube",
    outlet: "YouTube",
    title: "DJI Avata 2 review and vs Mini",
    url: "https://www.youtube.com/results?search_query=DJI+Avata+2+review",
    date: "2024-04-15",
    tested: "Goggle flying, 4K/60 super-wide, propeller guards, Easy ACRO",
    models: ["avata-2", "avata", "mini-5-pro"],
  },
  {
    id: "yt-search-neo2",
    type: "youtube",
    outlet: "YouTube",
    title: "DJI Neo 2 vs Flip",
    url: "https://www.youtube.com/results?search_query=DJI+Neo+2+vs+Flip+review",
    date: "2025-11-01",
    tested: "Palm takeoff, tracking, propeller guards versus foldable Flip camera",
    models: ["neo-2", "neo", "flip"],
  },
  {
    id: "yt-search-mini4k",
    type: "youtube",
    outlet: "YouTube",
    title: "DJI Mini 4K vs Mini 4 Pro",
    url: "https://www.youtube.com/results?search_query=DJI+Mini+4K+vs+Mini+4+Pro",
    date: "2024-05-01",
    tested: "Budget 4K Mini versus omnidirectional Mini 4 Pro",
    models: ["mini-4k", "mini-4-pro", "mini-3"],
  },
];

export function reviewsFor(...slugs: string[]): ReviewItem[] {
  const set = new Set(slugs);
  return reviews.filter((r) => r.models.some((m) => set.has(m)));
}

export function reviewsComparing(slugs: string[]): ReviewItem[] {
  if (slugs.length < 2) return [];
  return reviews.filter((r) => slugs.every((s) => r.models.includes(s)));
}

export function reviewById(id: string): ReviewItem | undefined {
  return reviews.find((r) => r.id === id);
}
