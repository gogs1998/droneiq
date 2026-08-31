# DroneIQ

Facts-first DJI drone comparison for [IQ Labs](https://iqlabs.app). Canonical site: [droneiq.pro](https://droneiq.pro). Sourced specs, CE (not FCC) range, UK class, dated UK prices, and a plain-language answer to whether you would notice the difference.

```
npm install
npm run dev
```

Static Next.js app. Catalog lives in `data/`. Comparison and FAQ copy is generated in `lib/compare.ts` from those figures — edit the drone, not the prose, unless you are adding a featured matchup in `data/featured-matchups.ts`.
