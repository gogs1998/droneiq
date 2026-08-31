import type { Drone } from "@/data/types";
import { gbp } from "@/lib/compare";
import Link from "next/link";

export function PriceBoard({ drones }: { drones: Drone[] }) {
  return (
    <section className="mt-12">
      <h2 className="display text-2xl">Price board</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        UK pounds, dated snapshots. Each cell names the <em>box</em> that figure
        is for. EAN is the barcode on that carton when a UK listing cited one;
        otherwise we leave it blank rather than guess. Not live APIs.{" "}
        <Link href="/guides/buying-used" className="underline">
          Buying used checklist
        </Link>
        .
      </p>
      <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[18rem] text-sm sm:min-w-[40rem]">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-quiet">
              <th className="sticky left-0 z-10 bg-paper px-2 py-2 sm:px-3"> </th>
              {drones.map((d) => (
                <th key={d.slug} className="px-2 py-2 sm:px-3">
                  {d.shortName}
                  <div className="num font-normal normal-case tracking-normal text-quiet">
                    as of {d.prices.asOf}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <PriceRow
              label="DJI Store UK RRP"
              drones={drones}
              value={(d) => gbp(d.prices.djiRrpGbp)}
              href={(d) => d.prices.djiUrl}
              box={(d) => d.prices.djiBox}
              ean={(d) => d.prices.djiEan}
            />
            <PriceRow
              label="Amazon UK"
              drones={drones}
              value={(d) => (d.prices.amazonGbp != null ? gbp(d.prices.amazonGbp) : "See Amazon")}
              href={(d) => d.prices.amazonUrl}
              box={(d) => d.prices.amazonBox}
              ean={(d) => d.prices.amazonEan}
            />
            <PriceRow
              label="eBay UK band"
              drones={drones}
              value={(d) =>
                d.prices.ebayLowGbp != null
                  ? `${gbp(d.prices.ebayLowGbp)}–${gbp(d.prices.ebayHighGbp)}`
                  : "See eBay"
              }
              href={(d) => d.prices.ebayUrl}
              box={(d) => d.prices.ebayBox}
              ean={() => null}
            />
            <PriceRow
              label="CeX sell"
              drones={drones}
              value={(d) => gbp(d.prices.cexSellGbp)}
              href={(d) => d.prices.cexUrl}
              box={(d) => d.prices.cexBox}
              ean={(d) => d.prices.cexEan}
            />
            <PriceRow
              label="CeX cash / voucher"
              drones={drones}
              value={(d) =>
                d.prices.cexCashGbp != null
                  ? `${gbp(d.prices.cexCashGbp)} / ${gbp(d.prices.cexVoucherGbp)}`
                  : "See CeX"
              }
              href={(d) => d.prices.cexUrl}
              box={(d) => d.prices.cexBox}
              ean={(d) => d.prices.cexEan}
            />
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PriceRow({
  label,
  drones,
  value,
  href,
  box,
  ean,
}: {
  label: string;
  drones: Drone[];
  value: (d: Drone) => string;
  href: (d: Drone) => string;
  box: (d: Drone) => string;
  ean: (d: Drone) => string | null;
}) {
  return (
    <tr className="border-t border-rule align-top">
      <th className="sticky left-0 z-10 bg-paper px-2 py-3 text-left font-normal leading-snug text-muted sm:px-3">
        {label}
      </th>
      {drones.map((d) => {
        const code = ean(d);
        return (
          <td key={d.slug} className="px-2 py-3 sm:px-3">
            <a href={href(d)} className="num text-ink underline-offset-2 hover:underline">
              {value(d)}
            </a>
            <div className="mt-1 max-w-[12rem] text-xs leading-snug text-muted">{box(d)}</div>
            {code ? (
              <div className="num mt-1 text-[10px] tracking-wide text-quiet">EAN {code}</div>
            ) : null}
          </td>
        );
      })}
    </tr>
  );
}
