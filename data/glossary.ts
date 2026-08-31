export type GlossaryEntry = {
  id: string;
  label: string;
  oneLiner: string;
  body: string;
  sourceLabel: string;
  sourceUrl: string;
};

export const glossary: Record<string, GlossaryEntry> = {
  weight: {
    id: "weight",
    label: "Weight",
    oneLiner: "The number that decides UK paperwork more often than the camera does.",
    body: "Takeoff weight is what the CAA cares about, not the number on the box without a battery. In the UK, crossing 250 g is the line between a C0/UK0 Mini you can treat as a travel camera and a drone that needs a Flyer ID and tighter distances from uninvolved people. A 4 g swing on the Mini 5 Pro is therefore a legal fact, not trivia. Always weigh the aircraft you actually fly, with the battery you actually use.",
    sourceLabel: "CAA Drone and model aircraft code",
    sourceUrl: "https://www.caa.co.uk/drones/",
  },
  ukClass: {
    id: "ukClass",
    label: "UK / EU class",
    oneLiner: "The class mark printed on the drone, not a marketing tier.",
    body: "C0 is under 250 g. C1 is under 900 g. C2 is the next step up and changes where you may fly near people. DJI now prints class marks; some older airframes are unmarked and fall under transitional UK rules. Fitting a heavier ‘Plus’ battery can move a Mini out of C0. The mark on the aircraft you take off with is the one that counts.",
    sourceLabel: "CAA drones and aircraft classes",
    sourceUrl: "https://www.caa.co.uk/drones/",
  },
  sensor: {
    id: "sensor",
    label: "Sensor",
    oneLiner: "Area, not megapixels, is what you see at dusk.",
    body: "A 1-inch sensor gathers substantially more light than 1/1.3-inch; 4/3 is another step. Megapixels on a small chip mostly crop. In noon sun many of these cameras look closer than the table suggests. After sunset, or in high-contrast interiors, sensor size is the difference you would actually notice in a still or a grade.",
    sourceLabel: "DJI imaging specs (product pages)",
    sourceUrl: "https://www.dji.com/uk/products/camera-drones",
  },
  telephoto: {
    id: "telephoto",
    label: "Second / third camera",
    oneLiner: "A telephoto is a different picture, not a sharper crop of the same one.",
    body: "Digital zoom on a Mini is a crop. A 70 mm camera on Air or Mavic is a second optical path: compressed backgrounds, portraits, details you cannot walk to. If your flying is landscapes and holidays, you may never miss it. If you shoot people, architecture or wildlife from a respectful distance, it is the reason to leave the Mini class.",
    sourceLabel: "DJI Air 3S / Mavic 4 Pro specs",
    sourceUrl: "https://www.dji.com/uk/air-3s/specs",
  },
  video: {
    id: "video",
    label: "Max video",
    oneLiner: "Resolution and frame rate are only useful if you grade or slow down.",
    body: "4K/30 already fills a television. 4K/60 HDR and 4K/120 matter for motion and for highlight recovery in log. 6K on the Mavic 4 Pro Hasselblad is a crop-and-reframe tool as much as a sharpness tool. If you deliver straight from the camera to Instagram, you will not see most of this table.",
    sourceLabel: "DJI product specs",
    sourceUrl: "https://www.dji.com/uk/products/camera-drones",
  },
  gimbal: {
    id: "gimbal",
    label: "Gimbal",
    oneLiner: "True vertical and extra tilt are how you fill a phone screen without cropping.",
    body: "A gimbal that rotates to portrait uses the full sensor; a crop-to-vertical Mini wastes pixels. 225° tilt (Mini 5 Pro) and 360° infinity (Mavic 4 Pro) are for Dutch angles and overheads, not for ‘more stable’. If you only ever shoot landscape 16:9, this row is quiet.",
    sourceLabel: "DJI Mini 5 Pro / Mavic 4 Pro product pages",
    sourceUrl: "https://www.dji.com/uk/mini-5-pro",
  },
  flightTime: {
    id: "flightTime",
    label: "Flight time",
    oneLiner: "Lab minutes in still air, flying forward, camera in photo mode.",
    body: "DJI’s published times are wind-tunnel figures at a stated speed until forced landing. Real winter UK flights with 4K, wind and a return home are often 60–70% of that. A 2-minute gap on the spec sheet is not a difference you plan a job around. A 10-minute gap, or a Plus battery that also changes the class mark, is.",
    sourceLabel: "DJI spec footnotes (wind-tunnel method)",
    sourceUrl: "https://www.dji.com/uk/mini-4-pro/specs",
  },
  wind: {
    id: "wind",
    label: "Wind",
    oneLiner: "Mass and motor authority, not the camera, decide whether a coastal day is usable.",
    body: "Minis are honest in a park and tiring on a headland. Air and Mavic carry more mass into the same Level 5 number, which is why they feel calmer. The published m/s is a maximum resistance, not a comfortable filming envelope. If most of your flying is west-coast or hill, this row beats sensor size.",
    sourceLabel: "DJI max wind speed resistance specs",
    sourceUrl: "https://www.dji.com/uk/products/camera-drones",
  },
  sensing: {
    id: "sensing",
    label: "Obstacle sensing",
    oneLiner: "Omnidirectional means sides and above, not just ‘it has sensors’.",
    body: "Downward-only (Neo, Mini 3, Mini 4K) will not stop a tree in front of you. Front/back/down (Mini 3 Pro, Flip) is the old Pro pattern. Omnidirectional (Mini 4 Pro and up) adds sides. Nightscape / LiDAR is the dusk version of the same idea, and it still needs texture and a minimum lux. None of this replaces looking.",
    sourceLabel: "DJI vision system specs",
    sourceUrl: "https://www.dji.com/uk/mini-4-pro/specs",
  },
  range: {
    id: "range",
    label: "Transmission range",
    oneLiner: "The FCC kilometre figure is not what you get in the UK.",
    body: "UK radios are CE. DJI’s big number is usually FCC (US). CE is typically about half. You also fly visual line of sight. A 10 km CE Mini and a 15 km CE Mavic are the same practical radio for a legal UK flight. Quote CE on this site; treat FCC as a footnote.",
    sourceLabel: "DJI OcuSync / O4 transmission notes",
    sourceUrl: "https://www.dji.com/uk/mini-4-pro/specs",
  },
  storage: {
    id: "storage",
    label: "Internal storage",
    oneLiner: "Onboard gigabytes are a backup, not a cinema magazine.",
    body: "A Mini with 2 GB fills in minutes of 4K. 42 GB on Mini 5 Pro is enough to finish a walk if the card fails. Bitrate still wants a fast microSD for anything you care about. Internal storage does not change the picture; it changes whether the flight ends when the card does.",
    sourceLabel: "DJI product specs (internal storage)",
    sourceUrl: "https://www.dji.com/uk/mini-5-pro",
  },
};
