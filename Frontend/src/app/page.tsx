import Link from "next/link";
import type { CSSProperties } from "react";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <div className="overflow-x-hidden bg-white">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "max(100svh, clamp(380px, 92vw, 700px))" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/eizd2ue5a/1899x879_page-0001.jpg')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg,rgba(10,10,10,0.65) 0%,rgba(10,10,10,0.42) 55%,rgba(10,10,10,0.15) 100%)",
            }}
          />
          <div className="hero-stripes absolute inset-0 pointer-events-none" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5 sm:px-8">
            <div className="-translate-y-12 sm:-translate-y-16 max-w-3xl">
              <h1
                className="font-extrabold uppercase text-white leading-[0.92] tracking-tight"
                style={{ fontSize: "clamp(48px, 10vw, 104px)" }}
              >
                Tukimbie
                <br />
                <span className="muranga-red-dots">Muranga.</span>
              </h1>

              <div className="race-day-pill race-day-pill-green-yellow mt-6 w-fit">
                <span className="text-white/70">Race Day:</span>
                <span>31st May 2026</span>
              </div>

              <Link
                href="/registration"
                className="mt-6 inline-flex min-h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-sm border border-black bg-white px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)] transition hover:bg-[color:var(--yellow)]"
              >
                Register Free →
              </Link>
            </div>

            <div className="absolute bottom-6 left-5 sm:left-8 hidden md:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">The Great Muranga</p>
              <p className="font-extrabold uppercase text-white leading-none text-3xl">
                Community Run<span className="text-[color:var(--yellow)]">.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CHOOSE YOUR DISTANCE ───────────────────────────── */}
      <section id="distance-section" className="relative overflow-hidden bg-[color:var(--cream)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(120,18,30,0.7) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-16">
          <div className="mb-8">
            <p className="eyebrow">Choose your distance</p>
            <h2
              className="mt-3 font-extrabold uppercase leading-none tracking-tight text-[color:var(--ink)]"
              style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              Choose your distance.
            </h2>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-6">
            <CategoryCard distance="10km" title="Elite Athletes, All"
              blurb="Open to all ages."
              level="All ages" accent="var(--green)" />
            <CategoryCard distance="8km" title="Men Under 20"
              blurb="For young runners with pace and energy."
              level="Men · Under 20" accent="var(--ink)" />
            <CategoryCard distance="6km" title="Women Under 20"
              blurb="For young women ready to run with confidence."
              level="Women · Under 20" accent="var(--yellow)" accentText="var(--ink)" />
            <CategoryCard distance="2km" title="Youth"
              blurb="For runners aged 13 to 15."
              level="Ages 13 - 15" accent="var(--red)" />
            <CategoryCard distance="1km" title="Masters"
              blurb="For runners aged 50 to 60."
              level="Ages 50 - 60" accent="var(--yellow)" accentText="var(--ink)" />
            <CategoryCard distance="500m" title="Seniors"
              blurb="Open to everyone aged 61 and above."
              level="Ages 61 and above" accent="var(--ink)" />
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ───────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-24">
          <div className="grid gap-8 md:grid-cols-[0.9fr_0.95fr_1.15fr] md:items-center md:gap-12">
            <div>
              <p className="eyebrow">The invitation</p>
              <h2
                className="mt-4 font-extrabold uppercase leading-[0.95] tracking-tight text-[color:var(--ink)]"
                style={{ fontSize: "clamp(30px, 5vw, 52px)" }}
              >
                  <span className="text-[color:var(--ink)]">For everyone in Muranga.</span>
              </h2>
            </div>
            <div
              className="overflow-hidden rounded-[24px] border border-[color:var(--hairline)] bg-[color:var(--cream)] shadow-[0_12px_32px_-18px_rgba(0,0,0,0.28)]"
            >
              <div
                className="w-full bg-cover bg-center"
                style={{
                  minHeight: "clamp(240px, 44vw, 420px)",
                  backgroundImage:
                    "url('https://ik.imagekit.io/eizd2ue5a/1899x879_page-0001.jpg')",
                }}
              />
            </div>
            <div className="space-y-4 text-[15px] leading-7 text-[color:var(--ink-soft)]">
              <p>
                This run is for everyone. From the Form 1 student in Kandara to the
                elder in Maragua, if you are between 13 and 61 years,
                this race was made with you in mind. No sponsorship. No fancy
                kit. Just your legs, your heart, and the roads of Muranga County.
              </p>
              <p className="hidden sm:block">
                Whether you jog, walk, or sprint — lace up your shoes and show
                up. Muranga is calling. Do not miss it.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wide text-[color:var(--ink)] hover:underline"
              >
                About the run →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SCHEDULE ──────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[color:var(--cream)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,102,0,0.62) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-24">
          <div className="mb-8">
            <p className="eyebrow">Day&apos;s Schedule</p>
            <h2
              className="mt-3 inline-block bg-gradient-to-r from-[color:var(--red)] via-[color:var(--yellow)] to-[color:var(--green)] bg-clip-text font-extrabold uppercase leading-none tracking-tight text-transparent"
              style={{ fontSize: "clamp(26px, 4vw, 44px)" }}
            >
              Day Schedule.
            </h2>
          </div>
          <ul className="divide-y divide-[color:var(--hairline)]">
            <ScheduleRow time="06:00" title="Check-in & bib pickup" text="Arrive early, grab your bib." />
            <ScheduleRow time="06:45" title="Group warm-up" text="Led by local fitness partners." />
            <ScheduleRow time="07:00" title="Flag off" text="10km first, then 8km, 6km, 2km, 1km and 500m." highlight />
            <ScheduleRow time="09:30" title="Finish & refresh" text="Hydration, snacks, cool-down." />
            <ScheduleRow time="10:30" title="Community hour" text="Photos, awards, and hanging out." />
          </ul>
          <div className="mt-6">
            <Link href="/timeline" className="text-sm font-bold uppercase tracking-wide text-[color:var(--ink)] hover:underline">
              Full timeline →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────── */}
      <section className="bg-white text-[color:var(--ink)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-24">
          <div className="mb-10 sm:mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--green)]">What to Expect</p>
            <h2 className="mt-3 font-extrabold uppercase leading-none tracking-tight text-[color:var(--green)] text-[28px] sm:text-4xl">
              Race Day Energy
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4 sm:gap-10">
            <Feature icon={<IconRoute />} title="Scenic Route" text="A carefully designed loop through the Muranga landscape." />
            <Feature icon={<IconWater />} title="Full Support" text="Water stations, marshals, and medics are ready along the route." />
            <Feature icon={<IconMusic />} title="Local Flavor" text="Music, food vendors, and community market energy at the finish." />
            <Feature icon={<IconCamera />} title="Photo Moments" text="Professional photographers will capture your race day memories for free." />
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[color:var(--cream)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(120,18,30,0.7) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink)]">Join the first edition</p>
              <h2
                className="mt-2 font-extrabold uppercase leading-none tracking-tight text-[color:var(--ink)]"
                style={{ fontSize: "clamp(24px, 4vw, 44px)" }}
              >
                Your spot is waiting.
              </h2>
            </div>
            <Link
              href="/registration"
              className="inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-black bg-[color:var(--green)] px-8 py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-dark)] sm:w-auto"
            >
              Register Now →
            </Link>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

/* ── Components ─────────────────────────────────────────── */

function CategoryCard({ distance, title, blurb, level, accent, accentText = "var(--white)", className = "" }: {
  distance: string; title: string; blurb: string;
  level: string; accent: string; accentText?: string; className?: string;
}) {
  const levelTextColor = accentText === "var(--ink)" ? "var(--ink)" : accent;
  const cardStyle = {
    "--card-accent": accent,
    "--card-accent-text": accentText,
  } as CSSProperties;

  return (
    <Link
      href={`/registration?category=${encodeURIComponent(distance)}`}
      aria-label={`Register for the ${distance} ${title} category`}
      className={`group relative flex h-full min-h-[270px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-black/10 bg-[color:var(--cream)] p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:border-black/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)] focus-visible:ring-offset-2 ${className}`}
      style={cardStyle}
    >
      <div className="absolute inset-0 bg-[var(--card-accent)] opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.12]" />
      <span
        className="absolute right-0 top-0 z-20 whitespace-nowrap border border-r-0 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] rounded-bl-xl"
        style={{
          background: `color-mix(in srgb, ${accent} 16%, white)`,
          borderColor: `color-mix(in srgb, ${accent} 28%, white)`,
          color: levelTextColor,
        }}
      >
        {level}
      </span>

      <div className="relative z-10 h-8" />

      <div className="relative z-10 mt-7">
        <p className="text-4xl font-extrabold uppercase leading-none tracking-tight text-[color:var(--ink)]">
          {distance}
        </p>
        <p className="mt-3 text-sm font-extrabold uppercase leading-tight text-[color:var(--ink)]">
          {title}
        </p>
        <p className="mt-3 text-sm leading-6 text-[color:var(--ink-soft)]">
          {blurb}
        </p>
      </div>

      <div className="relative z-10 mt-auto flex items-center justify-end border-t border-black/10 pt-5">
        <span className="text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)] transition duration-300 group-hover:translate-x-1">
          Register →
        </span>
      </div>
    </Link>
  );
}

function ScheduleRow({ time, title, text, highlight = false }: {
  time: string; title: string; text: string; highlight?: boolean;
}) {
  return (
    <li className="grid grid-cols-[72px_1fr] items-baseline gap-4 py-4 sm:grid-cols-[110px_1fr] sm:gap-8">
      <p className={`text-sm font-extrabold tracking-tight sm:text-base ${highlight ? "text-[color:var(--ink)]" : "text-[color:var(--ink)]"}`}>
        {time}
      </p>
      <div>
        <p className="flex flex-wrap items-center gap-2 text-[13px] font-bold text-[color:var(--ink)] sm:text-sm">
          {title}
          {highlight && (
            <span className="rounded-full bg-[color:var(--green-soft)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[color:var(--ink)]">
              Start
            </span>
          )}
        </p>
        <p className="mt-0.5 text-xs leading-5 text-[color:var(--ink-soft)] sm:text-[13px] sm:leading-6">{text}</p>
      </div>
    </li>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-sm border border-white/15 bg-black p-7 sm:p-8 sm:border-0">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20">{icon}</div>
      <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-white">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-6 text-white/80">{text}</p>
    </div>
  );
}

function IconRoute() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M8 19h6a4 4 0 0 0 0-8H10a4 4 0 0 1 0-8h6" /></svg>;
}
function IconWater() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12 3c3.6 4.2 6 7.4 6 10.4a6 6 0 1 1-12 0c0-3 2.4-6.2 6-10.4z" /></svg>;
}
function IconMusic() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M9 18V6l12-3v12" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="15" r="3" /></svg>;
}
function IconCamera() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M3 8a2 2 0 0 1 2-2h3l2-2h4l2 2h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="13" r="4" /></svg>;
}
