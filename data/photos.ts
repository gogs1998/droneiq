export type DronePhoto = {
  src: string;
  alt: string;
  credit: string;
  sourceUrl: string | null;
  kind: "photo" | "illustration";
};

/**
 * Local catalog stills. Most photos are Wikimedia Commons (CC BY-SA or CC0),
 * cropped for the spec-sheet layout. Mini 2 and Air 2S use official DJI Store
 * UK product stills (no clean Commons cutout of those used-market airframes).
 * Avata 1 is an illustration — Commons has no usable product still.
 */
export const photos: Record<string, DronePhoto> = {
  neo: {
    src: "/drones/neo.jpg",
    alt: "DJI Neo on a shop display, propeller guards on",
    credit: "Photo: Kyu3a, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:DJI_Neo.jpg",
    kind: "photo",
  },
  "neo-2": {
    src: "/drones/neo-2.jpg",
    alt: "DJI Neo 2 on a shop display stand",
    credit: "Photo: Zefke, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DJI_Neo_2_in_de_winkel_(1).jpg",
    kind: "photo",
  },
  flip: {
    src: "/drones/flip.jpg",
    alt: "DJI Flip on a shop display, propeller guards on",
    credit: "Photo: Kyu3a, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:DJI_Flip_-_2.jpg",
    kind: "photo",
  },
  "mini-2": {
    src: "/drones/mini-2.jpg",
    alt: "DJI Mini 2, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/mini-2",
    kind: "photo",
  },
  "mini-4k": {
    src: "/drones/mini-4k.jpg",
    alt: "DJI Mini 4K hovering outdoors",
    credit: "Photo: ZLEA, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DJI_MT2PD_Mini_4K_(3-1-2026).jpg",
    kind: "photo",
  },
  "mini-3": {
    src: "/drones/mini-3.jpg",
    alt: "DJI Mini 3 in flight against an overcast sky",
    credit: "Photo: ZLEA, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DJI_MT3PD_Mini_3_(FA3NAWAECX)_(11-23-2025).jpg",
    kind: "photo",
  },
  "mini-3-pro": {
    src: "/drones/mini-3-pro.jpg",
    alt: "DJI Mini 3 Pro on a shop display",
    credit: "Photo: Kyu3, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:DJI_Mini_3_Pro.jpg",
    kind: "photo",
  },
  "mini-4-pro": {
    src: "/drones/mini-4-pro.jpg",
    alt: "DJI Mini 4 Pro, front view, studio still",
    credit: "Photo: Jacek Halicki, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2024_Dron_DJI_Mini_4_Pro_(04).jpg",
    kind: "photo",
  },
  "mini-5-pro": {
    src: "/drones/mini-5-pro.jpg",
    alt: "DJI Mini 5 Pro hovering over a field",
    credit: "Photo: ZLEA, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DJI_MT5MFND_Mini_5_Pro_(FA3TPCHHM7)_(3-1-2026).jpg",
    kind: "photo",
  },
  "air-2s": {
    src: "/drones/air-2s.jpg",
    alt: "DJI Air 2S, official product still",
    credit: "Product image: DJI Store UK",
    sourceUrl: "https://store.dji.com/uk/product/dji-air-2s",
    kind: "photo",
  },
  "air-3": {
    src: "/drones/air-3.jpg",
    alt: "DJI Air 3 in flight against a blue sky",
    credit: "Photo: Jacek Halicki, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2024_Dron_DJI_Air_3_(01).jpg",
    kind: "photo",
  },
  "air-3s": {
    src: "/drones/air-3s.jpg",
    alt: "DJI Air 3S, front view, studio still",
    credit: "Photo: Jacek Halicki, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:2024_Dron_DJI_Air_3S_(3).jpg",
    kind: "photo",
  },
  "mavic-3-classic": {
    src: "/drones/mavic-3-classic.jpg",
    alt: "DJI Mavic 3 Classic outdoors",
    credit: "Photo: ZLEA, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DJI_L2C_Mavic_3_Classic_(FA3HXPAT3X)_(11-16-2024).jpg",
    kind: "photo",
  },
  "mavic-3-pro": {
    src: "/drones/mavic-3-pro.jpg",
    alt: "DJI Mavic 3 Pro Cine on a shop display",
    credit: "Photo: Fumikas Sagisavas, Wikimedia Commons, CC0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:DJI_MAVIC_3_PRO.jpg",
    kind: "photo",
  },
  "mavic-4-pro": {
    src: "/drones/mavic-4-pro.jpg",
    alt: "DJI Mavic 4 Pro in flight over a valley",
    credit: "Photo: C.Stadler/Bwag, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DJI_-_Drohne_Mavic_4_Pro.JPG",
    kind: "photo",
  },
  avata: {
    src: "/drones/avata.jpg",
    alt: "Illustration of the original DJI Avata, ducted FPV cinewhoop",
    credit: "Illustration · DroneIQ (no Commons product still of Avata 1)",
    sourceUrl: null,
    kind: "illustration",
  },
  "avata-2": {
    src: "/drones/avata-2.jpg",
    alt: "DJI Avata 2 on a shop display",
    credit: "Photo: Kyu3a, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl: "https://commons.wikimedia.org/wiki/File:DJI_AVATA_2_-_2.jpg",
    kind: "photo",
  },
  "avata-360": {
    src: "/drones/avata-360.jpg",
    alt: "DJI Avata 360 on a shop display",
    credit: "Photo: NDG, Wikimedia Commons, CC BY-SA 4.0",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:DJI_Avata_360_in_Store_2026-05-15-1.jpg",
    kind: "photo",
  },
};

export function photoFor(slug: string): DronePhoto | undefined {
  return photos[slug];
}
