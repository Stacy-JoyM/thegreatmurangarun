import type { Metadata } from "next";
import { Manrope, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import HomeCountdown from "@/components/home-countdown";

const brandIconUrl = "https://ik.imagekit.io/eizd2ue5a/icon_image.JPG";

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
  title: "The Great Muranga Community Run",
  description:
    "A community-first running event in Muranga, Kenya. Register online — free and open to all.",
  icons: {
    icon: brandIconUrl,
    shortcut: brandIconUrl,
    apple: brandIconUrl,
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
