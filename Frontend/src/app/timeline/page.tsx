import Link from "next/link";
import ContactSection from "@/components/contact-section";

const schedule = [
  {
    time: "06:45",
    title: "Check-in & Bib Pickup",
    text: "Arrive early, collect your bib number, and ease into the morning with fellow runners.",
    highlight: false,
  },
  {
    time: "06:45",
    title: "Group Warm-Up",
    text: "A guided warm-up session led by local fitness partners to get everyone ready.",
    highlight: false,
  },
  {
    time: "07:00",
    title: "Flag Off",
    text: "Staggered starts: 10km Open → 8km Men Under 20 Years → 2km Youth → 1km Masters → 500m Seniors.",
    highlight: true,
  },
  {
    time: "08:00",
    title: "10km & 8km Finishers",
    text: "The fastest Open and Men Under 20 Years runners begin crossing the finish line. Cheer them on!",
    highlight: false,
  },
  {
    time: "08:30",
    title: "2km Youth Finishers",
    text: "Ages 13–15 complete their route and head to the refreshment zone.",
    highlight: false,
  },
  {
    time: "09:00",
    title: "1km & 500m Finishers",
    text: "Masters (50–60) and Seniors (61+) cross the finish line — a huge cheer for everyone!",
    highlight: false,
  },
  {
    time: "09:30",
    title: "Finish & Refresh",
    text: "Hydration stations, snacks, and cool-down zones open to all finishers.",
    highlight: false,
  },
  {
    time: "10:30",
    title: "Community Hour",
    text: "Photos, recognition, local food stalls, music, and time to hang out with the community.",
    highlight: false,
  },
];

export default function TimelinePage() {
  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(280px, 78vw, 400px)" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?auto=format&fit=crop&w=2400&q=80')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg,rgba(10,10,10,0.68) 0%,rgba(10,10,10,0.38) 60%,rgba(10,10,10,0.12) 100%)",
            }}
          />
          <div className="hero-stripes absolute inset-0 pointer-events-none" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-5 sm:px-8">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60">
              Race day · 2026
            </p>
            <h1
              className="font-extrabold uppercase text-white leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(44px, 8vw, 88px)" }}
            >
              Day
              <br />
              <span className="text-[color:var(--yellow)]">Schedule.</span>
            </h1>
            <div className="race-day-pill mt-6 w-fit">
              <span className="text-white/70">Start Time:</span>
              <span>07:00 EAT</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────── */}
      <section className="bg-[color:var(--cream)]">
        <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-8 sm:py-20">
          <div className="mb-10 sm:mb-12">
            <p className="eyebrow">Schedule</p>
            <h2
              className="mt-4 font-extrabold uppercase leading-none tracking-tight text-[color:var(--ink)]"
              style={{ fontSize: "clamp(26px, 4vw, 40px)" }}
            >
              A clean, predictable day.
            </h2>
            <p className="mt-3 text-[14px] leading-7 text-[color:var(--ink-soft)]">
              Whether you&apos;re running or cheering — here&apos;s exactly
              how the morning unfolds.
            </p>
          </div>

          {/* Timeline items */}
          <ol className="relative">
            {/* Vertical line */}
            <div
              aria-hidden
              className="absolute left-[44px] top-3 bottom-3 w-px bg-[color:var(--hairline)] sm:left-[68px]"
            />

            {schedule.map((item, i) => (
              <li key={i} className="relative flex gap-4 pb-6 last:pb-0 sm:gap-8 sm:pb-8">
                {/* Time + dot */}
                <div className="relative flex w-[44px] shrink-0 flex-col items-center sm:w-[68px]">
                  <span
                    className={`relative z-10 mb-1 text-[12px] font-extrabold tabular-nums tracking-tight sm:text-base ${
                      item.highlight
                        ? "text-[color:var(--green)]"
                        : "text-[color:var(--ink)]"
                    }`}
                  >
                    {item.time}
                  </span>
                  <span
                    className={`relative z-10 h-3 w-3 rounded-full ring-2 ring-[color:var(--cream)] ${
                      item.highlight
                        ? "bg-[color:var(--green)] ring-4 ring-[color:var(--green-soft)]"
                        : "bg-[color:var(--hairline)]"
                    }`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`flex-1 rounded-sm px-4 py-4 sm:px-5 ${
                    item.highlight
                      ? "bg-[color:var(--green)] text-white"
                      : "bg-white border border-[color:var(--hairline)]"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-[14px] font-extrabold uppercase tracking-wide ${
                        item.highlight ? "text-white" : "text-[color:var(--ink)]"
                      }`}
                    >
                      {item.title}
                    </h3>
                    {item.highlight && (
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                        Start
                      </span>
                    )}
                  </div>
                  <p
                    className={`mt-1.5 text-[13px] leading-6 ${
                      item.highlight ? "text-white/80" : "text-[color:var(--ink-soft)]"
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-[color:var(--yellow)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--green)]">
                Ready to join?
              </p>
              <h2
                className="mt-3 font-extrabold uppercase leading-none tracking-tight text-[color:var(--green)]"
                style={{ fontSize: "clamp(24px, 4vw, 40px)" }}
              >
                See you at 07:00.
              </h2>
            </div>
            <Link
              href="/registration"
              className="inline-flex min-h-12 w-full items-center justify-center text-center sm:w-auto shrink-0 rounded-sm bg-[color:var(--green)] px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-dark)]"
            >
              Register Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}
