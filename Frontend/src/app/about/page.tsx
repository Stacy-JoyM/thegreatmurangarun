import Link from "next/link";
import type { Metadata } from "next";
import ContactSection from "@/components/contact-section";
import PartnersSection from "@/components/partners-section";
import { SITE_TAGLINE } from "@/lib/site-tagline";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn the story behind The Great Muranga Community Run, its community mission, and what runners can expect on race day.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About | The Great Muranga Community Run",
    description:
      "Learn the story behind The Great Muranga Community Run, its community mission, and what runners can expect on race day.",
    url: "/about",
  },
  twitter: {
    title: "About | The Great Muranga Community Run",
    description:
      "Learn the story behind The Great Muranga Community Run, its community mission, and what runners can expect on race day.",
  },
  keywords: [
    "Muranga community run",
    "about Muranga run",
    "Muranga County running event",
    SITE_TAGLINE,
  ],
};

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(300px, 78vw, 520px)" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/eizd2ue5a/runnerbanner.png')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg,rgba(10,10,10,0.65) 0%,rgba(10,10,10,0.35) 60%,rgba(10,10,10,0.1) 100%)",
            }}
          />
          <div className="hero-stripes absolute inset-0 pointer-events-none" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5 sm:px-8">
            <h1
              className="font-extrabold uppercase text-white leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(28px, 7vw, 88px)" }}
            >
              <span className="text-white">Muranga&apos;s </span>
              <span className="text-[color:var(--green)]">Community Run</span>
            </h1>
            <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 sm:text-[12px] sm:tracking-[0.24em]">
              {SITE_TAGLINE}
            </p>
          </div>
        </div>
      </section>

      {/* ── STORY + ABOUT MURANGA ─────────────────────────── */}
      <section className="bg-[color:var(--cream)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-20">
          <div className="space-y-6">
            <article className="grid gap-5 rounded-2xl border border-[color:var(--hairline)] bg-white p-5 sm:p-6 md:grid-cols-[1.25fr_0.75fr]">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--green)]">
                  Lead Story
                </p>
                <h3 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-[color:var(--ink)] sm:text-3xl">
                  Story Behind Muranga Community Run
                </h3>
                <div className="mt-4 columns-1 gap-6 md:columns-2">
                  <p className="text-[14px] leading-7 text-[color:var(--ink-soft)] first-letter:float-left first-letter:mr-2 first-letter:text-4xl first-letter:font-extrabold first-letter:leading-[0.9] first-letter:text-[color:var(--ink)]">
                    The Muranga Community Run started with one simple idea: create a race where
                    every resident feels seen, included, and proud to represent Muranga.
                    From first-time participants to experienced runners, the route is designed
                    to welcome all paces and all ages.
                  </p>
                  <p className="mt-4 text-[14px] leading-7 text-[color:var(--ink-soft)] md:mt-0">
                    More than medals, this event is about belonging. It brings together families,
                    schools, local groups, and businesses around one shared morning of movement,
                    celebration, and county pride. It is Muranga telling its story on the road.
                  </p>
                </div>
              </div>
              <figure className="space-y-2">
                <div
                  className="h-56 rounded-xl bg-cover bg-center sm:h-64"
                  style={{
                    backgroundImage:
                      "url('https://ik.imagekit.io/eizd2ue5a/PixVerse_Image_Effect_prompt_Create%20an%20image%20o.jpg')",
                  }}
                />
                <figcaption className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                  Muranga Town Race Atmosphere
                </figcaption>
              </figure>
            </article>

            <article className="grid gap-5 rounded-2xl border border-[color:var(--hairline)] bg-white p-5 sm:p-6 md:grid-cols-[0.8fr_1.2fr]">
              <figure className="space-y-2 md:order-1">
                <div
                  className="h-56 rounded-xl bg-cover bg-center sm:h-64"
                  style={{
                    backgroundImage:
                      "url('https://ik.imagekit.io/eizd2ue5a/1899x879_page-0001.jpg')",
                  }}
                />
                <figcaption className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                  Muranga Landscape & Scenic Roads
                </figcaption>
              </figure>
              <div className="md:order-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--green)]">
                  About Muranga
                </p>
                <h3 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-[color:var(--ink)] sm:text-3xl">
                  A county with routes worth running.
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-[color:var(--ink-soft)]">
                  Muranga is known for rolling tea landscapes, energetic town centers, and roads
                  that naturally frame a memorable run day. The event route reflects this mix of
                  scenery and community life, offering runners both beauty and local character.
                </p>
                <blockquote className="mt-4 border-l-4 border-[color:var(--green)] pl-4 text-[13px] font-bold uppercase tracking-[0.1em] text-[color:var(--ink)]">
                  One route, one county, one community spirit.
                </blockquote>
              </div>
            </article>

            <Link
              href="/explore"
              className="group relative block overflow-hidden rounded-2xl border border-black/10 bg-[color:var(--ink)] text-white shadow-[0_20px_42px_-28px_rgba(0,0,0,0.6)] transition duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)] focus-visible:ring-offset-2"
            >
              <div
                className="absolute inset-0 scale-105 bg-cover bg-center transition duration-700 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://ik.imagekit.io/eizd2ue5a/muranga-countyimage.jpg')",
                }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.74)_0%,rgba(0,0,0,0.46)_58%,rgba(0,0,0,0.16)_100%)]" />
              <div className="hero-stripes pointer-events-none absolute inset-0" />
              <div className="relative z-10 flex min-h-[320px] flex-col justify-end p-6 sm:min-h-[380px] sm:p-8 md:p-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[color:var(--yellow)]">
                  Explore Muranga
                </p>
                <h3
                  className="mt-3 max-w-3xl font-extrabold uppercase leading-none tracking-tight"
                  style={{ fontSize: "clamp(30px, 6vw, 68px)" }}
                >
                  Explore beautiful landscapes in Muranga.
                </h3>
                <p className="mt-4 max-w-2xl text-[14px] font-semibold leading-7 text-white/85 sm:text-base">
                  Discover tea fields, scenic viewpoints, cultural landmarks, and
                  hidden attractions that make Muranga worth visiting beyond race day.
                </p>
                <span className="mt-6 inline-flex min-h-12 w-fit items-center justify-center rounded-sm border border-white bg-white px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)] transition group-hover:bg-[color:var(--yellow)]">
                  Visit Explore Page →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-24">
          <div className="mb-10 max-w-xl sm:mb-12">
            <p className="eyebrow">Event Experience</p>
            <h2
              className="mt-4 font-extrabold uppercase leading-none tracking-tight text-[color:var(--ink)]"
              style={{ fontSize: "clamp(28px, 4vw, 44px)" }}
            >
              What to Expect.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 sm:gap-6">
            <Detail
              title="Clear Marked Route"
              text="Roads are clearly marked and marshalled so you can focus on running, not directions."
            />
            <Detail
              title="Categories for Everyone"
              text="Seven distances: 10km Elite Men and Women, 8km Men Under 20, 6km Women Under 20, 5km Corporate Run, 2km (- 13-15 years - Family Run - 50-60 years), 1km Kids (9–12), and 500m Seniors (61+)."
            />
            <Detail
              title="Safety First"
              text="Water stations and health support are available throughout the route."
            />
            <Detail
              title="Community Time"
              text="Music, photographers, local stalls, and time to relax together after the race."
            />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[color:var(--green)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(166,32,53,0.98) 1.8px, transparent 1.8px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
          <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
                Ready to run?
              </p>
              <h2
                className="mt-3 font-extrabold uppercase leading-none tracking-tight"
                style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
              >
                Be part of it.
              </h2>
            </div>
            <Link
              href="/registration"
              className="inline-flex min-h-12 w-full items-center justify-center text-center sm:w-auto shrink-0 rounded-sm border border-black bg-[color:var(--green-dark)] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              Register Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ──────────────────────────────────────── */}
      <PartnersSection />

      {/* ── CONTACT ───────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-xl border border-[color:var(--hairline)] bg-[color:var(--cream)] p-5 shadow-[0_10px_24px_-20px_rgba(0,0,0,0.3)] sm:border-t-2 sm:border-[color:var(--green)] sm:bg-white">
      <h3 className="text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-6 text-[color:var(--ink-soft)]">{text}</p>
    </div>
  );
}
