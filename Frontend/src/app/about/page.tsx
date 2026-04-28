import Link from "next/link";
import ContactSection from "@/components/contact-section";

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(280px, 82vw, 500px)" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/eizd2ue5a/marathon_4.jpg')",
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
              <span className="text-[color:var(--yellow)]">Muranga's Own Marathon</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── WHAT TO EXPECT ────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-24">
          <div className="mb-10 max-w-xl sm:mb-12">
            <p className="eyebrow">Day&apos;s Schedule</p>
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
              text="Five distances: 10km Open, 8km Men Under 20, 2km Youth (13–15), 1km Masters (50–60), and 500m Seniors (61+)."
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
      <section className="bg-[color:var(--green)] text-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
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
              className="inline-flex min-h-12 w-full items-center justify-center text-center sm:w-auto shrink-0 rounded-sm bg-[color:var(--yellow)] px-8 py-4 text-sm font-bold uppercase tracking-wide text-[color:var(--green)] transition hover:opacity-90"
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

function Detail({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-sm border border-[color:var(--hairline)] bg-[color:var(--cream)] p-5 sm:border-t-2 sm:border-[color:var(--green)] sm:bg-transparent">
      <h3 className="text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-6 text-[color:var(--ink-soft)]">{text}</p>
    </div>
  );
}
