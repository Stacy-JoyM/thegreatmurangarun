"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SITE_TAGLINE } from "@/lib/site-tagline";

import { BRAND_ICON_URL } from "@/lib/brand-icon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/timeline", label: "Timeline" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (pathname === href) {
      window.location.reload();
      return;
    }
    window.location.assign(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--hairline)] bg-white">
      {/* Single row on mobile, two rows on desktop */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-3.5 py-3.5 sm:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 no-underline outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)] focus-visible:ring-offset-2"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("/");
          }}
        >
          <span className="relative block h-14 w-14 shrink-0 overflow-hidden rounded-full sm:h-20 sm:w-20">
            <Image
              src={BRAND_ICON_URL}
              alt="The Great Muranga Community Run logo"
              width={92}
              height={92}
              className="block h-full w-full object-contain"
              priority
            />
          </span>
          {/* Short version on small screens, full title on laptop+ */}
          <div className="hidden min-[400px]:block min-w-0 leading-tight">
            <p className="truncate text-[12px] font-bold uppercase tracking-[0.1em] text-[color:var(--ink)] md:hidden">
              The Great Muranga
            </p>
            <p className="truncate text-[11px] font-bold uppercase tracking-[0.08em] text-[color:var(--green)] md:hidden">
              {SITE_TAGLINE}
            </p>
            <div className="hidden md:block">
              <p className="text-[15px] font-extrabold uppercase tracking-[0.1em] text-[color:var(--ink)]">
                The Great Muranga Community Run
              </p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--green)]">
                {SITE_TAGLINE}
              </p>
            </div>
          </div>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`rounded-sm px-2.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.16em] transition hover:text-[color:var(--ink)] ${
                pathname === link.href
                  ? "bg-[color:var(--hairline)] text-[color:var(--ink)]"
                  : "text-[color:var(--ink-soft)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/registration"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/registration");
            }}
            className="moving-glow-border rounded-md bg-[linear-gradient(90deg,#ffffff,var(--red),#ffffff,var(--red),#ffffff)] p-[2px] shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <span className="inline-flex min-h-12 items-center rounded-[calc(0.375rem-2px)] bg-[color:var(--green)] px-7 py-3 text-[16px] font-bold uppercase tracking-[0.08em] text-white">
              Registration
            </span>
          </Link>
        </nav>

        {/* Mobile: Sign Up + Hamburger */}
        <div className="flex shrink-0 items-center gap-2 md:hidden">
          <Link
            href="/registration"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("/registration");
            }}
            className="moving-glow-border inline-flex rounded-md bg-[linear-gradient(90deg,#ffffff,var(--red),#ffffff,var(--red),#ffffff)] p-[2px] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            <span className="inline-flex min-h-12 items-center rounded-[calc(0.375rem-2px)] bg-[color:var(--green)] px-5 py-2.5 text-[14px] font-bold uppercase tracking-[0.08em] text-white">
              Registration
            </span>
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`flex min-h-[56px] items-center gap-3 border-b border-[color:var(--hairline)] px-2 text-[15px] font-bold uppercase tracking-[0.1em] transition ${
                  pathname === link.href
                    ? "bg-[color:var(--hairline)] text-[color:var(--ink)]"
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
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/registration");
                }}
                className="moving-glow-border block rounded-md bg-[linear-gradient(90deg,#ffffff,var(--red),#ffffff,var(--red),#ffffff)] p-[2px] transition hover:-translate-y-0.5 hover:brightness-110"
              >
                <span className="flex min-h-14 w-full items-center justify-center rounded-[calc(0.375rem-2px)] bg-[color:var(--green)] py-4 text-[16px] font-bold uppercase tracking-[0.08em] text-white">
                  Registration →
                </span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
