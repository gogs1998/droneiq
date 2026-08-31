import { IBM_Plex_Mono, IBM_Plex_Sans, Source_Serif_4 } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { CloudflareBeacon, SiteFooter, SiteHeader } from "@/components/Chrome";
import { OG_IMAGE, siteUrl } from "@/lib/seo";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const serif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "DroneIQ — drone specs you can decide with",
    template: "%s · DroneIQ",
  },
  description:
    "Facts-first DJI comparison: sourced specs, CE not FCC, UK class, prices, and whether you would notice the difference.",
  openGraph: {
    siteName: "DroneIQ",
    locale: "en_GB",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GB"
      className={`${plexSans.variable} ${plexMono.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CloudflareBeacon />
      </body>
    </html>
  );
}
