import Link from "next/link";
import type { Metadata } from "next";
import ContactSection from "@/components/contact-section";
import PartnersSection from "@/components/partners-section";

const HERO_IMAGE = "https://ik.imagekit.io/eizd2ue5a/muranga-countyimage.jpg";

const attractions = [
  {
    name: "Sagana Gorges",
    tag: "Geological Wonder",
    title: "Kenya's miniature Grand Canyon.",
    description:
      "Tucked just south of the Sagana River, the Sagana Gorges are a breathtaking, hidden geological marvel sculpted by thousands of years of water erosion. Often described by hikers as Kenya's own miniature Grand Canyon, this rugged landscape features dramatic vertical cliffs, deep sand canyons, and towering, ribbed earth spires carved out of vibrant, yellow-brown volcanic soil.",
    images: [
      "https://ik.imagekit.io/eizd2ue5a/muranga-gorges.jpg",
      "https://ik.imagekit.io/eizd2ue5a/Sagana-2.jpg",
    ],
  },
  {
    name: "Garden of Eden ( Mukurwe wa Nyagathanga )",
    tag: "Nature Park",
    title: "A lush valley escape.",
    description:
      "Located in Gaturi, Murang'a County, Mukurwe wa Nyagathanga is revered as the mythical Garden of Eden and ancestral home of the Gikuyu community. It is believed to be where the first man (Gikuyu) and woman (Mumbi) settled by God, serving as the central point of dispersal for the Kikuyu people, featuring sacred fig trees and traditional hut replicas.",
    images: [
      "https://ik.imagekit.io/eizd2ue5a/garden_of_eden2.jpg",
      "https://ik.imagekit.io/eizd2ue5a/garden_of_eden_valley.jpg",
    ],
  },
  {
    name: "Ndakaini Dam",
    tag: "Water Views",
    title: "Calm water, wide skies.",
    description:
      "Ndakaini Dam is the primary water source for Nairobi city and its surroundings, supplying roughly 80% of the city's water supply. Located in Gatanga, Murang'a County, this 63-meter-high earthfill dam on the Thika River was commissioned in 1994, with a storage capacity of 70 million cubic meters and a maximum depth of 65 meters.",
    images: [
      "https://ik.imagekit.io/eizd2ue5a/The-Ndakaini-Dam.jpg",
      "https://ik.imagekit.io/eizd2ue5a/ndakaini-dam2.jpg",
    ],
  },
  {
    name: "Kanunga Falls",
    tag: "Waterfall",
    title: "A hidden waterfall gem.",
    description:
      "The journey to Kanunga Falls from Ndakaini Dam is more of a leisurely walk than it is a hike. It is a round-trip of about 8 km that takes on average 5 hours for anyone with average fitness. From Ndakaini Dam, you head out along the blacktop road for much of the distance excepting a few detours through farms and tree lined paths as you approach the falls.",
    images: [
      "https://ik.imagekit.io/eizd2ue5a/kanunga-waterfalls3.webp",
      "https://ik.imagekit.io/eizd2ue5a/kanunga-waterfalls4.webp",
    ],
  },
  {
    name: "Mau Mau Caves",
    tag: "Historic Site",
    title: "Freedom history hidden in the forest.",
    description:
      "Across Central Kenya, several Mau Mau caves served as secret hideouts, meeting points, and survival bases for freedom fighters during the struggle against British colonial rule. Visiting them is a quiet reminder of the courage and sacrifice behind Kenya's independence story.",
    images: ["https://ik.imagekit.io/eizd2ue5a/mau-mau-caves1.jpg"],
  },
  {
    name: "Gatura Green Tea Farm",
    tag: "Tea Experience",
    title: "Walk through Muranga's green tea country.",
    description:
      "Home to the first Purple Tea Farm in the world, Gatura Greens is an Award-Winning Farm Tour that offers an authentic Kenyan Tea Farm Tour Experience. The tour includes learning how to pick your own tea, processing it, and keeping it as a souvenir. It also includes a tea tasting ceremony, lunch, and a refreshing waterfall swim.",
    images: [
      "https://ik.imagekit.io/eizd2ue5a/gatura-green-tea-farm3.jpg",
      "https://ik.imagekit.io/eizd2ue5a/gatura-green-tea2.jpg",
    ],
  },
  {
    name: "Mathioya River",
    tag: "River Escape",
    title: "Fresh water, green banks, and quiet views.",
    description:
      "The Mathioya River is a scenic, fast-flowing river in Murang'a County, Kenya, originating in the Aberdare Range and acting as a vital tributary to the Tana River. Known for its clear waters and lush scenery, it is a popular spot for whitewater rafting (Grade IV rapids) and nature-focused tourism.",
    images: [
      "https://ik.imagekit.io/eizd2ue5a/Mathioya-River4.jpg",
      "https://ik.imagekit.io/eizd2ue5a/mathioya-river3.jpg",
    ],
  },
  {
    name: "Maragua Falls",
    tag: "Waterfall",
    title: "A cool waterfall escape.",
    description:
      "Maragua Falls is about 30 feet high and it cascades down over a jagged rock face engulfed by lush greenery and tall pines",
    images: [
      "https://ik.imagekit.io/eizd2ue5a/maragua-falls1.jpg",
      "https://ik.imagekit.io/eizd2ue5a/maragua-2.jpg",
    ],
  },
];

export const metadata: Metadata = {
  title: "Explore Muranga",
  description:
    "Discover Muranga County tourist attractions, scenic landscapes, cultural sites, and places to visit around The Great Muranga Community Run.",
  alternates: {
    canonical: "/explore",
  },
  openGraph: {
    title: "Explore Muranga | The Great Muranga Community Run",
    description:
      "Discover Muranga County tourist attractions, scenic landscapes, cultural sites, and places to visit around The Great Muranga Community Run.",
    url: "/explore",
    images: [
      {
        url: HERO_IMAGE,
        width: 1200,
        height: 800,
        alt: "Muranga County green hills and tea farms",
      },
    ],
  },
  twitter: {
    title: "Explore Muranga | The Great Muranga Community Run",
    description:
      "Discover Muranga County tourist attractions, scenic landscapes, cultural sites, and places to visit around The Great Muranga Community Run.",
    images: [HERO_IMAGE],
  },
};

export default function ExplorePage() {
  return (
    <div className="overflow-x-hidden bg-white">
      <section className="relative">
        <div
          className="relative min-h-[calc(100svh-96px)] overflow-hidden bg-[color:var(--ink)]"
          style={{ minHeight: "max(560px, calc(100svh - 96px))" }}
        >
          <div
            className="absolute inset-0 scale-105 bg-cover bg-center"
            style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.72)_0%,rgba(0,0,0,0.42)_48%,rgba(0,0,0,0.16)_100%)]" />
          <div className="hero-stripes pointer-events-none absolute inset-0" />

          <div className="relative z-10 mx-auto flex min-h-[inherit] w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
            <div className="max-w-4xl">
              <h1
                className="font-extrabold uppercase leading-[0.9] tracking-tight text-white"
                style={{ fontSize: "clamp(46px, 10vw, 112px)" }}
              >
                Explore
                <br />
                <span
                  className="text-[color:var(--yellow)] [-webkit-text-stroke:2px_white]"
                  style={{ paintOrder: "stroke fill" }}
                >
                  Muranga.
                </span>
              </h1>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#attractions"
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white bg-white px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)] transition hover:bg-[color:var(--yellow)]"
                >
                  See Attractions
                </a>
                <Link
                  href="/registration"
                  className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/70 bg-white/10 px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur transition hover:bg-white hover:text-[color:var(--ink)]"
                >
                  Register for the Run
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="attractions" className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-24">
          <div className="mb-10 max-w-2xl">
            <p className="eyebrow">Places to Explore</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {attractions.map((attraction, index) => (
              <AttractionCard key={attraction.name} attraction={attraction} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[color:var(--green)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(187,0,0,0.8) 1.6px, transparent 1.6px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-6 px-4 py-12 sm:px-8 sm:py-16 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
              Make it a weekend
            </p>
            <h2
              className="mt-3 font-extrabold uppercase leading-none tracking-tight"
              style={{ fontSize: "clamp(28px, 5vw, 54px)" }}
            >
              Run. Explore. Share Muranga.
            </h2>
          </div>
          <Link
            href="/about"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-black bg-[color:var(--green-dark)] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
          >
            About the Run
          </Link>
        </div>
      </section>

      <PartnersSection />
      <ContactSection />
    </div>
  );
}

function AttractionCard({
  attraction,
  index,
}: {
  attraction: (typeof attractions)[number];
  index: number;
}) {
  const accents = ["var(--green)", "var(--red)", "var(--yellow)", "var(--ink)"];
  const accent =
    attraction.name === "Ndakaini Dam"
      ? "var(--yellow)"
      : attraction.name === "Maragua Falls" ||
    attraction.name === "Gatura Green Tea Farm" ||
    attraction.name === "Garden of Eden ( Mukurwe wa Nyagathanga )"
      ? "var(--ink)"
      : accents[index % accents.length];
  const accentText = accent === "var(--yellow)" ? "var(--ink)" : "white";

  return (
    <article className="group relative min-h-[290px] overflow-hidden rounded-3xl border border-black/10 bg-[color:var(--cream)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8">
      <div
        className="absolute inset-x-0 top-0 h-2"
        style={{ backgroundColor: accent }}
      />
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-10 transition duration-300 group-hover:scale-125" style={{ backgroundColor: accent }} />
      <div className="relative z-10 flex h-full flex-col">
        {"images" in attraction && attraction.images ? (
          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {attraction.images.map((image, imageIndex) => (
              <div
                key={image}
                className={`min-h-44 rounded-2xl bg-cover bg-center shadow-[0_14px_30px_-22px_rgba(0,0,0,0.5)] ${
                  imageIndex === 0 ? "sm:translate-y-4" : ""
                }`}
                style={{ backgroundImage: `url('${image}')` }}
              />
            ))}
          </div>
        ) : null}
        <div className="mb-8 flex items-start justify-between gap-4">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em]"
            style={{ backgroundColor: accent, color: accentText }}
          >
            {attraction.tag}
          </span>
          <span className="text-4xl font-extrabold leading-none text-black/10">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-[color:var(--ink)] sm:text-3xl">
          {attraction.name}
        </h3>
        <p
          className="mt-3 text-sm font-extrabold uppercase tracking-wide"
          style={{ color: accent }}
        >
          {attraction.title}
        </p>
        <p className="mt-4 text-[14px] leading-7 text-[color:var(--ink-soft)]">
          {attraction.description}
        </p>
      </div>
    </article>
  );
}
