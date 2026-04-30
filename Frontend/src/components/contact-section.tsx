import Link from "next/link";
import Image from "next/image";

const brandIconUrl = "https://ik.imagekit.io/eizd2ue5a/icon_image.JPG";

export default function ContactSection() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(135deg, #2a2c30 0%, #32353a 55%, #2b2d31 100%)",
      }}
    >
      <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-20">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16">

          {/* Brand column */}
          <div className="rounded-xl border border-white/10 bg-black/10 p-5 sm:bg-black/5 sm:p-5">
            <div className="flex items-center gap-3">
              <Image
                src={brandIconUrl}
                alt="The Great Muranga Community Run logo"
                width={80}
                height={80}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.14em]">The Great Muranga</p>
                <p className="text-sm font-bold uppercase tracking-[0.14em]">Community Run</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-[13px] leading-6 text-white/75">
              A community-first running event in Muranga, Kenya. Open to all ages
              and paces. Registration is free and online.
            </p>
            <button
              type="button"
              className="mt-6 inline-flex items-center gap-2 rounded-sm bg-[color:var(--green)] px-4 py-2 ring-1 ring-white/20 transition hover:brightness-110"
            >
              <span className="h-2 w-2 rounded-full bg-[color:var(--green)]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-white">
                Registration Open · 2026
              </span>
            </button>
          </div>

          {/* Quick links */}
          <div className="rounded-xl border border-white/10 bg-black/10 p-5 sm:bg-black/5 sm:p-5">
            <p className="text-[20px] font-black uppercase tracking-[0.2em] text-white">
              Quick Links
            </p>
            <ul className="mt-5 space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About the Run" },
                { href: "/registration", label: "Register Now" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-flex min-h-11 items-center text-sm font-medium text-white/85 transition hover:translate-x-0.5 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="rounded-xl border border-white/10 bg-black/10 p-5 sm:bg-black/5 sm:p-5">
            <p className="text-[20px] font-black uppercase tracking-[0.2em] text-white">
              Contact
            </p>
            <ul className="mt-5 space-y-4 text-sm text-white/80">
              <li className="flex min-h-11 items-start gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 h-4 w-4 shrink-0 text-white/50">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Muranga Town, Muranga County, Kenya</span>
              </li>
              <li className="flex min-h-11 items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-white/50">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:thegreatmurangacommunityrun@msa.co.ke" className="inline-flex min-h-11 items-center break-all transition hover:text-white">
                  thegreatmurangacommunityrun@msa.co.ke
                </a>
              </li>
              <li className="flex min-h-11 items-center gap-2.5">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0 text-white/50">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.36-.36a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
                <span>0745331439</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-start gap-2 border-t border-white/20 pt-6 sm:mt-14 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-white/50">
            © 2026 The Great Muranga Community Run. All rights reserved.
          </p>
          <p className="text-[12px] text-white/50">
            Muranga, Kenya
          </p>
        </div>
      </div>
    </section>
  );
}
