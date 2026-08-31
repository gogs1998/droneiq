export type Series = "neo" | "flip" | "mini" | "air" | "mavic" | "avata";

export type UkClass = "C0" | "C1" | "C2" | "unmarked";

export type SensingKind =
  | "none"
  | "down"
  | "front-down"
  | "front-back-down"
  | "omni"
  | "omni-nightscape";

export type Job = "travel" | "wind" | "dusk" | "beginner" | "fpv";

export type Camera = {
  role: "wide" | "medium-tele" | "tele" | "fpv" | "360";
  sensor: string;
  sensorRank: number;
  megapixels: number;
  equivMm: number;
  aperture: string;
  fovDeg: number;
  isoPhoto: string;
  isoVideo: string;
  maxVideo: string;
  maxVideoFps: number;
  maxPhotoMp: number;
  hdr: boolean;
  log: string | null;
  trueVertical: boolean;
  gimbalTiltDeg: number;
};

export type Combo = {
  id: string;
  name: string;
  gbp: number | null;
  url: string;
  blurb: string;
};

export type ReviewItem = {
  id: string;
  type: "article" | "youtube";
  outlet: string;
  title: string;
  url: string;
  date: string;
  runtimeMin?: number;
  tested: string;
  models: string[];
};

export type Consensus = {
  text: string;
  citations: { reviewId: string; claim: string }[];
};

export type Source = {
  field: string;
  label: string;
  url: string;
  accessed: string;
};

export type Drone = {
  slug: string;
  name: string;
  shortName: string;
  brand: "DJI";
  series: Series;
  released: string;
  discontinued: boolean;
  sortOrder: number;
  weightG: number;
  weightNote: string;
  ukClass: UkClass;
  ukClassNote: string;
  sub250: boolean;
  flyerIdRequired: boolean;
  operatorIdRequired: boolean;
  cameras: Camera[];
  flightTimeMin: number;
  flightTimePlusMin: number | null;
  windMs: number;
  windLevel: string;
  maxSpeedKphCe: number;
  maxSpeedKphFcc: number;
  maxTakeoffM: number;
  hoverTimeMin: number | null;
  maxAscentMs: number;
  maxDescentMs: number;
  foldedMm: string;
  sdCard: string;
  gnss: string;
  opTempC: string;
  app: string;
  sensing: SensingKind;
  sensingNote: string;
  transmission: string;
  rangeKmCe: number;
  rangeKmFcc: number;
  internalGb: number;
  batteryWh: number;
  batteryFamily: string;
  rcFamily: string;
  ndSize: string | null;
  goggles: string | null;
  jobs: Job[];
  combos: Combo[];
  prices: {
    asOf: string;
    djiRrpGbp: number | null;
    djiUrl: string;
    amazonGbp: number | null;
    amazonUrl: string;
    ebayLowGbp: number | null;
    ebayHighGbp: number | null;
    ebayUrl: string;
    cexSellGbp: number | null;
    cexCashGbp: number | null;
    cexVoucherGbp: number | null;
    cexUrl: string;
  };
  reviews: {
    asOf: string;
    consensus: Consensus | null;
    itemIds: string[];
  };
  sources: Source[];
};
