"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/timeline", label: "Timeline" },
  { href: "/registration", label: "Registration" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--hairline)] bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      {/* Single row on mobile, two rows on desktop */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3.5 py-3.5 sm:px-8">

        {/* Logo */}
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setOpen(false)}>
          <Image
            src="/muranga_icon.png"
            alt="The Great Muranga Community Run logo"
            width={56}
            height={56}
            className="h-10 w-10 shrink-0 rounded-full object-contain sm:h-13 sm:w-13"
            priority
          />
          {/* Short version on small screens, full title on laptop+ */}
          <div className="hidden min-[400px]:block min-w-0 leading-tight">
            <p className="truncate text-[12px] font-bold uppercase tracking-[0.1em] text-[color:var(--green)] md:hidden">
              The Great Muranga
            </p>
            <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--green)]/70 md:hidden">
              Community Run · 2026
            </p>
            <p className="hidden md:block text-[15px] font-extrabold uppercase tracking-[0.1em] text-[color:var(--green)]">
              The Great Muranga Community Run
            </p>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-[13px] font-bold uppercase tracking-[0.16em] transition hover:text-[color:var(--green)] ${
                pathname === link.href
                  ? "text-[color:var(--green)]"
                  : "text-[color:var(--ink-soft)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/registration"
            className="rounded-sm bg-[color:var(--green)] px-5 py-2.5 text-[14px] font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-dark)]"
          >
            Sign Up
          </Link>
        </nav>

        {/* Mobile: Sign Up + Hamburger */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link
            href="/registration"
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 items-center rounded-sm bg-[color:var(--green)] px-3.5 py-2 text-[12px] font-bold uppercase tracking-[0.06em] text-white"
          >
            Sign Up
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-[color:var(--hairline)] bg-white text-[color:var(--ink)] shadow-sm"
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-5 w-5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="h-5 w-5">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="border-t border-[color:var(--hairline)] bg-white shadow-lg md:hidden">
          <nav className="mx-auto flex w-full max-w-6xl flex-col px-4 sm:px-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex min-h-[56px] items-center gap-3 border-b border-[color:var(--hairline)] text-[15px] font-bold uppercase tracking-[0.1em] transition ${
                  pathname === link.href
                    ? "text-[color:var(--green)]"
                    : "text-[color:var(--ink-soft)]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full shrink-0 transition ${
                    pathname === link.href
                      ? "bg-[color:var(--green)]"
                      : "bg-transparent"
                  }`}
                />
                {link.label}
              </Link>
            ))}
            <div className="py-4">
              <Link
                href="/registration"
                onClick={() => setOpen(false)}
                className="flex min-h-12 w-full items-center justify-center rounded-sm bg-[color:var(--green)] py-4 text-[15px] font-bold uppercase tracking-[0.08em] text-white"
              >
                Register Free →
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
