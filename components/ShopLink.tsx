import type { ReactNode } from "react";

/** Retailer links. Compare and drone pages inherit `rel="sponsored"` from here. */
export function ShopLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} rel="sponsored" className={className}>
      {children}
    </a>
  );
}
