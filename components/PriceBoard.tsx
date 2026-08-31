import type { Drone } from "@/data/types";
import { gbp } from "@/lib/compare";
import Link from "next/link";

export function PriceBoard({ drones }: { drones: Drone[] }) {
  return (
    <section className="mt-12">
      <h2 className="display text-2xl">Price board</h2>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        UK pounds, dated snapshots (as of the date under each name). Not live
        APIs. Amazon is a typical <em>new</em> box that day — drone-only on Neo,
        goggles kit on Avata — not always the DJI RRP SKU. CeX is one graded
        SKU when we have a product page; cash and voucher are trade-in.
        Otherwise the cell is a search link.{" "}
        <Link href="/guides/buying-used" className="underline">
          Buying used checklist
        </Link>
        .
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[40rem] text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wider text-quiet">
              <th className="px-3 py-2"> </th>
              {drones.map((d) => (
                <th key={d.slug} className="px-3 py-2">
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
            />
            <PriceRow
              label="Amazon UK"
              drones={drones}
              value={(d) => (d.prices.amazonGbp != null ? gbp(d.prices.amazonGbp) : "See Amazon")}
              href={(d) => d.prices.amazonUrl}
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
            />
            <PriceRow
              label="CeX sell"
              drones={drones}
              value={(d) => gbp(d.prices.cexSellGbp)}
              href={(d) => d.prices.cexUrl}
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
}: {
  label: string;
  drones: Drone[];
  value: (d: Drone) => string;
  href: (d: Drone) => string;
}) {
  return (
    <tr className="border-t border-rule">
      <th className="px-3 py-3 text-left font-normal text-muted">{label}</th>
      {drones.map((d) => (
        <td key={d.slug} className="px-3 py-3">
          <a href={href(d)} className="num text-ink underline-offset-2 hover:underline">
            {value(d)}
          </a>
        </td>
      ))}
    </tr>
  );
}
