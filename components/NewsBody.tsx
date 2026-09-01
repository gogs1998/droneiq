import type { ReactNode } from "react";
import Link from "next/link";
import type { NewsBlock } from "@/data/news";

const LINK = /\[\[([^\]|]+)\|([^\]]+)\]\]/g;

function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(LINK.source, "g");
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[1];
    const label = m[2];
    const internal = href.startsWith("/");
    parts.push(
      internal ? (
        <Link key={m.index} href={href} className="underline">
          {label}
        </Link>
      ) : (
        <a key={m.index} href={href} className="underline">
          {label}
        </a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

export function NewsBody({ blocks }: { blocks: NewsBlock[] }) {
  return (
    <div className="mt-8 space-y-6">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2 key={i} className="text-lg font-medium">
              {b.text}
            </h2>
          );
        }
        if (b.type === "ul") {
          return (
            <ul key={i} className="list-disc space-y-2 pl-5 text-muted">
              {b.items.map((item) => (
                <li key={item}>
                  <Rich text={item} />
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-muted">
            <Rich text={b.text} />
          </p>
        );
      })}
    </div>
  );
}

export function formatNewsDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "Jan.",
    "Feb.",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug.",
    "Sept.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
