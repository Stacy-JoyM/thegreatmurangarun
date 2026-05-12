import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import HomeCountdown from "@/components/home-countdown";
import { BRAND_ICON_URL } from "@/lib/brand-icon";
import { SITE_TAGLINE } from "@/lib/site-tagline";

/** Canonical public URL (OG/meta). Override with NEXT_PUBLIC_SITE_URL at build time on Fly. */
const SITE_URL =
  ((process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "") ||
    "https://greatmurangacommunityrun.co.ke") + "/";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Great Muranga Community Run",
    template: "%s | The Great Muranga Community Run",
  },
  description: `${SITE_TAGLINE}. A community-first running event in Muranga, Kenya. Register online — free and open to all.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "The Great Muranga Community Run",
    title: "The Great Muranga Community Run",
    description: `${SITE_TAGLINE}. A community-first running event in Muranga, Kenya. Register online — free and open to all.`,
    images: [
      {
        url: "/muranga_logo.png",
        width: 1200,
        height: 630,
        alt: "The Great Muranga Community Run logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Great Muranga Community Run",
    description: `${SITE_TAGLINE}. A community-first running event in Muranga, Kenya. Register online — free and open to all.`,
    images: ["/muranga_logo.png"],
  },
  icons: {
    icon: BRAND_ICON_URL,
    shortcut: BRAND_ICON_URL,
    apple: BRAND_ICON_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <Navbar />
        <HomeCountdown />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
