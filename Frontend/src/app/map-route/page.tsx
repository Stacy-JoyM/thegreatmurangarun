import Image from "next/image";
import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";

const routeHeadline = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const ROUTE_MAP_IMAGE =
  "https://ik.imagekit.io/eizd2ue5a/Route%20For%20Community%20Run_page-0001.jpg";

export const metadata: Metadata = {
  title: "Race day route map",
  description:
    "View the official community run route map for race day in Muranga — distances, turns, and key landmarks at a glance.",
  alternates: {
    canonical: "/map-route",
  },
  openGraph: {
    title: "Race day route map | The Great Muranga Community Run",
    description:
      "View the official community run route map for race day in Muranga — distances, turns, and key landmarks at a glance.",
    url: "/map-route",
    images: [{ url: ROUTE_MAP_IMAGE, width: 1200, height: 1600, alt: "Community run route map" }],
  },
};

export default function MapRoutePage() {
  return (
    <div className="overflow-x-hidden bg-[linear-gradient(180deg,#f6f4ed_0%,#ffffff_38%,#f6f4ed_100%)]">
      <section className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14 md:py-16">
        <p className="eyebrow text-center">Race day</p>
        <h1
          className={`${routeHeadline.className} mx-auto max-w-4xl text-center text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.95] tracking-[0.02em] text-[color:var(--green)] drop-shadow-[0_2px_0_rgba(0,0,0,0.08)]`}
        >
          Check out the routes for the race day
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] font-semibold leading-relaxed text-[color:var(--ink-soft)] sm:text-[16px]">
          Full course overview — plan your warm-up, cheer zones, and finish-line energy before you toe the line.
        </p>

        <figure className="relative mx-auto mt-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-[color:var(--hairline)] bg-[color:var(--cream)] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)]">
          <div className="relative aspect-[4/5] w-full sm:aspect-[3/4] md:aspect-[16/11]">
            <Image
              src={ROUTE_MAP_IMAGE}
              alt="Official map of the community run route through Muranga town, including distance and key roads."
              fill
              className="object-contain object-center p-2 sm:p-4"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
              priority
            />
          </div>
          <figcaption className="border-t border-[color:var(--hairline)] bg-white px-4 py-3 text-center text-[12px] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink-muted)]">
            Route map — The Great Muranga Community Run
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
