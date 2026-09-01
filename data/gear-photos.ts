export type GearPhoto = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string;
};

/**
 * Official DJI Store UK product stills (SPU cover or in-the-box cutout).
 * Hosted locally so a CDN hash change does not blank the catalog.
 * Credit always names DJI and links the store page the still came from.
 * Mini 3 Pro and Mini 4 Pro battery SPU covers are the same PNG — Mini 4 Pro
 * uses the kit in-the-box cutout instead of reusing the Mini 3 pack still.
 * RC-N1 / RC-N2 have no standalone Store SKU; stills are in-the-box cutouts
 * from the Mini 3 and Mini 4 Pro kit pages.
 */
export const gearPhotos: Record<string, GearPhoto> = {
  "rc-n1": {
    src: "/gear/rc-n1.jpg",
    alt: "DJI RC-N1 remote controller, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-3",
  },
  "rc-n2": {
    src: "/gear/rc-n2.jpg",
    alt: "DJI RC-N2 remote controller, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-4-pro",
  },
  "rc-n3": {
    src: "/gear/rc-n3.jpg",
    alt: "DJI RC-N3 remote controller, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-rc-n3-remote-controller",
  },
  "rc-2": {
    src: "/gear/rc-2.jpg",
    alt: "DJI RC 2 screen controller, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-rc-2",
  },
  "rc-mavic-3": {
    src: "/gear/rc-mavic-3.jpg",
    alt: "DJI RC screen controller, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-rc",
  },
  "motion-2": {
    src: "/gear/motion-2.jpg",
    alt: "DJI RC Motion 2, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-rc-motion-2",
  },
  "motion-3": {
    src: "/gear/motion-3.jpg",
    alt: "DJI RC Motion 3, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-rc-motion-3",
  },
  "fpv-rc-3": {
    src: "/gear/fpv-rc-3.jpg",
    alt: "DJI FPV Remote Controller 3, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-fpv-remote-controller-3",
  },
  "goggles-2": {
    src: "/gear/goggles-2.jpg",
    alt: "DJI Goggles 2, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-goggles-2",
  },
  "goggles-3": {
    src: "/gear/goggles-3.jpg",
    alt: "DJI Goggles 3, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-goggles-3",
  },
  "goggles-n3": {
    src: "/gear/goggles-n3.jpg",
    alt: "DJI Goggles N3, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-goggles-n3",
  },
  "batt-neo": {
    src: "/gear/batt-neo.jpg",
    alt: "DJI Neo Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-neo-intelligent-flight-battery",
  },
  "batt-neo-2": {
    src: "/gear/batt-neo-2.jpg",
    alt: "DJI Neo 2 Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-neo-2-intelligent-flight-battery",
  },
  "batt-flip": {
    src: "/gear/batt-flip.jpg",
    alt: "DJI Flip Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-flip-intelligent-flight-battery",
  },
  "batt-mini-3": {
    src: "/gear/batt-mini-3.jpg",
    alt: "DJI Mini 3 series Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-3-pro-intelligent-flight-battery",
  },
  "batt-mini-4k": {
    src: "/gear/batt-mini-4k.jpg",
    alt: "DJI Mini 2 / Mini 4K Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-4k-fly-more-combo",
  },
  "batt-mini-4-pro": {
    src: "/gear/batt-mini-4-pro.jpg",
    alt: "DJI Mini 4 Pro Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-4-pro",
  },
  "batt-mini-5-pro": {
    src: "/gear/batt-mini-5-pro.jpg",
    alt: "DJI Mini 5 Pro Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-5-pro-intelligent-flight-battery",
  },
  "batt-air-3": {
    src: "/gear/batt-air-3.jpg",
    alt: "DJI Air 3 series Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-air-3-intelligent-flight-battery",
  },
  "batt-mavic-3": {
    src: "/gear/batt-mavic-3.jpg",
    alt: "DJI Mavic 3 series Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mavic-3-intelligent-flight-battery",
  },
  "batt-mavic-4-pro": {
    src: "/gear/batt-mavic-4-pro.jpg",
    alt: "DJI Mavic 4 Pro Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mavic-4-pro-intelligent-flight-battery",
  },
  "batt-avata": {
    src: "/gear/batt-avata.jpg",
    alt: "DJI Avata Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-avata-intelligent-flight-battery",
  },
  "batt-avata-2": {
    src: "/gear/batt-avata-2.jpg",
    alt: "DJI Avata 2 Intelligent Flight Battery, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-avata-2-intelligent-flight-battery",
  },
  "nd-mini-4-pro": {
    src: "/gear/nd-mini-4-pro.jpg",
    alt: "DJI Mini 4 Pro ND filter set, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-4-pro-nd-filters-set-16-256",
  },
  "nd-mini-5-pro": {
    src: "/gear/nd-mini-5-pro.jpg",
    alt: "DJI Mini 5 Pro ND filter set, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mini-5-pro-nd-filter-set-8-32-128",
  },
  "nd-air-3": {
    src: "/gear/nd-air-3.jpg",
    alt: "DJI Air 3S ND filter set, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-air-3s-nd-filters-set",
  },
  "nd-mavic-4": {
    src: "/gear/nd-mavic-4.jpg",
    alt: "DJI Mavic 4 Pro ND filter set, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-mavic-4-pro-nd-filters-set",
  },
};

export function photoForGear(slug: string): GearPhoto | undefined {
  return gearPhotos[slug];
}
