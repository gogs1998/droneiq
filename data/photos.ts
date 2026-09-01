export type DronePhoto = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string | null;
  kind: "photo" | "illustration";
};

/**
 * Official DJI Store UK product stills (SPU cover), letterboxed onto the
 * paper sheet. Hosted locally so a CDN hash change does not blank the catalog.
 * Credit always names DJI and links the store page the still came from.
 */
export const photos: Record<string, DronePhoto> = {
  neo: {
    src: "/drones/neo.jpg",
    alt: "DJI Neo, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-neo",
    kind: "photo",
  },
  "neo-2": {
    src: "/drones/neo-2.jpg",
    alt: "DJI Neo 2, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-neo-2",
    kind: "photo",
  },
  flip: {
    src: "/drones/flip.jpg",
    alt: "DJI Flip, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-flip",
    kind: "photo",
  },
  "mini-4k": {
    src: "/drones/mini-4k.jpg",
    alt: "DJI Mini 4K, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-4k",
    kind: "photo",
  },
  "mini-3": {
    src: "/drones/mini-3.jpg",
    alt: "DJI Mini 3, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-3",
    kind: "photo",
  },
  "mini-3-pro": {
    src: "/drones/mini-3-pro.jpg",
    alt: "DJI Mini 3 Pro, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-3-pro",
    kind: "photo",
  },
  "mini-4-pro": {
    src: "/drones/mini-4-pro.jpg",
    alt: "DJI Mini 4 Pro, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-4-pro",
    kind: "photo",
  },
  "mini-5-pro": {
    src: "/drones/mini-5-pro.jpg",
    alt: "DJI Mini 5 Pro, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-5-pro",
    kind: "photo",
  },
  "air-3": {
    src: "/drones/air-3.jpg",
    alt: "DJI Air 3, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-air-3",
    kind: "photo",
  },
  "air-3s": {
    src: "/drones/air-3s.jpg",
    alt: "DJI Air 3S, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-air-3s",
    kind: "photo",
  },
  "mavic-3-classic": {
    src: "/drones/mavic-3-classic.jpg",
    alt: "DJI Mavic 3 Classic, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mavic-3-classic",
    kind: "photo",
  },
  "mavic-3-pro": {
    src: "/drones/mavic-3-pro.jpg",
    alt: "DJI Mavic 3 Pro, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mavic-3-pro",
    kind: "photo",
  },
  "mavic-4-pro": {
    src: "/drones/mavic-4-pro.jpg",
    alt: "DJI Mavic 4 Pro, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mavic-4-pro",
    kind: "photo",
  },
  avata: {
    src: "/drones/avata.jpg",
    alt: "DJI Avata, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-avata",
    kind: "photo",
  },
  "avata-2": {
    src: "/drones/avata-2.jpg",
    alt: "DJI Avata 2, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-avata-2",
    kind: "photo",
  },
  "avata-360": {
    src: "/drones/avata-360.jpg",
    alt: "DJI Avata 360, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-avata-360",
    kind: "photo",
  },
};

export function photoFor(slug: string): DronePhoto | undefined {
  return photos[slug];
}
