"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ── Types ───────────────────────────────────────────────── */
type Category = "10km" | "8km" | "2km" | "1km" | "500m";

type Participant = {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  category: Category;
  emergencyContact: string;
  registeredAt: string;
  attended: boolean;
};

/* ── Mock data (replace with Supabase fetch later) ───────── */
const SEED: Participant[] = [
  { id: 1,  fullName: "Peter Kamau",     phone: "0712 345 678", email: "peter@example.com",  category: "10km", emergencyContact: "Mary +254 700 333 444", registeredAt: "2026-04-10", attended: false },
  { id: 2,  fullName: "James Njoroge",   phone: "0723 456 789", email: "",                   category: "10km", emergencyContact: "Ann +254 700 111 222",  registeredAt: "2026-04-10", attended: false },
  { id: 3,  fullName: "David Kiprotich", phone: "0734 567 890", email: "",                   category: "8km",  emergencyContact: "Paul +254 700 555 666", registeredAt: "2026-04-11", attended: false },
  { id: 4,  fullName: "Kevin Mwangi",    phone: "0745 678 901", email: "kevin@example.com",  category: "8km",  emergencyContact: "Eve +254 711 100 200",  registeredAt: "2026-04-11", attended: false },
  { id: 5,  fullName: "Grace Njeri",     phone: "0756 789 012", email: "grace@example.com",  category: "2km",  emergencyContact: "Tom +254 700 999 000",  registeredAt: "2026-04-12", attended: false },
  { id: 6,  fullName: "Faith Akinyi",    phone: "0767 890 123", email: "",                   category: "2km",  emergencyContact: "Mark +254 711 300 400", registeredAt: "2026-04-12", attended: false },
  { id: 7,  fullName: "Jane Wanjiru",    phone: "0778 901 234", email: "jane@example.com",   category: "1km",  emergencyContact: "John +254 700 111 222", registeredAt: "2026-04-13", attended: false },
  { id: 8,  fullName: "Eunice Muthoni",  phone: "0789 012 345", email: "",                   category: "1km",  emergencyContact: "Ken +254 711 700 800",  registeredAt: "2026-04-13", attended: false },
  { id: 9,  fullName: "Charles Gitahi",  phone: "0790 123 456", email: "",                   category: "500m", emergencyContact: "Liz +254 711 900 000",  registeredAt: "2026-04-14", attended: false },
  { id: 10, fullName: "Lucy Waithera",   phone: "0700 234 567", email: "lucy@example.com",   category: "500m", emergencyContact: "Sue +254 711 500 600",  registeredAt: "2026-04-14", attended: false },
];

const CATEGORY_COLOR: Record<Category, string> = {
  "10km": "bg-[color:var(--green)] text-white",
  "8km":  "bg-[color:var(--ink)] text-white",
  "2km":  "bg-[color:var(--green-soft)] text-[color:var(--green)]",
  "1km":  "bg-[color:var(--green-soft)] text-[color:var(--green)]",
  "500m": "bg-[color:var(--yellow)] text-[color:var(--green)]",
};

/* ── Admin page ──────────────────────────────────────────── */
export default function AdminPage() {
  const [unlocked, setUnlocked]       = useState(false);
  const [pw, setPw]                   = useState("");
  const [pwError, setPwError]         = useState(false);
  const [showPw, setShowPw]           = useState(false);
  const [participants, setParticipants] = useState<Participant[]>(SEED);
  const [search, setSearch]           = useState("");
  const [filterCat, setFilterCat]     = useState<Category | "all">("all");
  const [filterAtt, setFilterAtt]     = useState<"all" | "attended" | "absent">("all");

  /* ── Auth ── */
  const handleLogin = () => {
    if (pw === "admin2026") {
      setUnlocked(true);
      setPwError(false);
    } else {
      setPwError(true);
    }
  };

  /* ── Attendance toggle ── */
  const toggleAttendance = (id: number) => {
    setParticipants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, attended: !p.attended } : p))
    );
  };

  /* ── Mark all visible as attended ── */
  const markAllVisible = (attended: boolean) => {
    const ids = new Set(filtered.map((p) => p.id));
    setParticipants((prev) =>
      prev.map((p) => (ids.has(p.id) ? { ...p, attended } : p))
    );
  };

  /* ── Filtered list ── */
  const filtered = participants.filter((p) => {
    const matchSearch =
      !search ||
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search);
    const matchCat = filterCat === "all" || p.category === filterCat;
    const matchAtt =
      filterAtt === "all" ||
      (filterAtt === "attended" && p.attended) ||
      (filterAtt === "absent" && !p.attended);
    return matchSearch && matchCat && matchAtt;
  });

  /* ── Stats ── */
  const total    = participants.length;
  const attended = participants.filter((p) => p.attended).length;
  const by10km    = participants.filter((p) => p.category === "10km").length;
  const by8km     = participants.filter((p) => p.category === "8km").length;
  const by2km     = participants.filter((p) => p.category === "2km").length;
  const by1km     = participants.filter((p) => p.category === "1km").length;
  const by500m   = participants.filter((p) => p.category === "500m").length;

  /* ── Login screen ── */
  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[color:var(--cream)] flex items-center justify-center px-4">
        <div className="w-full max-w-sm bg-white rounded-sm shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/muranga_icon.png" alt="Logo" width={40} height={40} className="h-10 w-10 rounded-full object-contain" />
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--green)]">Muranga Run</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[color:var(--ink-muted)]">Admin Access</p>
            </div>
          </div>

          <p className="text-lg font-extrabold uppercase tracking-tight text-[color:var(--ink)] mb-6">
            Sign in to continue
          </p>

          <div className="mb-4">
            <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
              Admin Password
            </span>
            <div className="flex items-center rounded-sm border border-[color:var(--hairline)] bg-white focus-within:border-[color:var(--green)] transition">
              <input
                type={showPw ? "text" : "password"}
                value={pw}
                onChange={(e) => { setPw(e.target.value); setPwError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                placeholder="Enter password"
                className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[color:var(--ink)] outline-none placeholder-[color:var(--ink-muted)]"
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
                className="flex items-center px-3 text-[color:var(--ink-muted)] hover:text-[color:var(--ink)] transition"
              >
                {showPw ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {pwError && (
              <p className="mt-1.5 text-xs font-semibold text-[color:var(--red)]">
                Incorrect password. Try again.
              </p>
            )}
          </div>

          <button
            onClick={handleLogin}
            className="w-full rounded-sm bg-[color:var(--green)] py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-[color:var(--green-dark)]"
          >
            Sign In →
          </button>

          <div className="mt-6 border-t border-[color:var(--hairline)] pt-4">
            <Link href="/" className="text-xs font-semibold text-[color:var(--ink-muted)] hover:text-[color:var(--green)]">
              ← Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen bg-[color:var(--cream)]">

      {/* Header */}
      <header className="bg-[color:var(--green)] px-4 py-4 sm:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/muranga_icon.png" alt="Logo" width={36} height={36} className="h-9 w-9 rounded-full object-contain bg-white/10 p-0.5" />
            <div>
              <p className="text-sm font-extrabold uppercase text-white">Muranga Run — Admin</p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-white/60">Race Day Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-[11px] font-bold uppercase tracking-wide text-white/70 hover:text-white">
              ← Site
            </Link>
            <button
              onClick={() => setUnlocked(false)}
              className="rounded-sm bg-white/15 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white hover:bg-white/25"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8">

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7 mb-8">
          <StatCard label="Total" value={total} />
          <StatCard label="Attended" value={attended} accent />
          <StatCard label="10km Open" value={by10km} />
          <StatCard label="8km Men Under 20 Years" value={by8km} />
          <StatCard label="2km Youth" value={by2km} />
          <StatCard label="1km Masters" value={by1km} />
          <StatCard label="500m Seniors" value={by500m} />
        </div>

        {/* Attendance progress bar */}
        <div className="mb-8 bg-white rounded-sm p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
              Attendance Progress
            </p>
            <p className="text-sm font-extrabold text-[color:var(--green)]">
              {attended} / {total}
              <span className="ml-1 font-semibold text-[color:var(--ink-muted)]">
                ({total > 0 ? Math.round((attended / total) * 100) : 0}%)
              </span>
            </p>
          </div>
          <div className="h-3 w-full rounded-full bg-[color:var(--green-soft)] overflow-hidden">
            <div
              className="h-3 rounded-full bg-[color:var(--green)] transition-all duration-500"
              style={{ width: `${total > 0 ? (attended / total) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Search name or phone…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 min-w-[180px] rounded-sm border border-[color:var(--hairline)] bg-white px-3 py-2 text-sm text-[color:var(--ink)] outline-none focus:border-[color:var(--green)]"
          />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value as Category | "all")}
            className="rounded-sm border border-[color:var(--hairline)] bg-white px-3 py-2 text-sm text-[color:var(--ink)] outline-none focus:border-[color:var(--green)]"
          >
            <option value="all">All categories</option>
            <option value="10km">10km Open</option>
            <option value="8km">8km Men Under 20</option>
            <option value="2km">2km Youth (13–15)</option>
            <option value="1km">1km Masters (50–60)</option>
            <option value="500m">500m Seniors (61+)</option>
          </select>
          <select
            value={filterAtt}
            onChange={(e) => setFilterAtt(e.target.value as "all" | "attended" | "absent")}
            className="rounded-sm border border-[color:var(--hairline)] bg-white px-3 py-2 text-sm text-[color:var(--ink)] outline-none focus:border-[color:var(--green)]"
          >
            <option value="all">All attendance</option>
            <option value="attended">Attended</option>
            <option value="absent">Not yet</option>
          </select>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => markAllVisible(true)}
              className="rounded-sm bg-[color:var(--green)] px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-white hover:bg-[color:var(--green-dark)]"
            >
              Mark all present
            </button>
            <button
              onClick={() => markAllVisible(false)}
              className="rounded-sm border border-[color:var(--hairline)] bg-white px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-[color:var(--ink-soft)] hover:border-[color:var(--ink)]"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Result count */}
        <p className="mb-3 text-[12px] text-[color:var(--ink-muted)]">
          Showing <strong className="text-[color:var(--ink)]">{filtered.length}</strong> of {total} participants
        </p>

        {/* ── Table ── */}
        <div className="overflow-x-auto rounded-sm bg-white shadow-sm">
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-[color:var(--hairline)] bg-[color:var(--cream)]">
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)] w-10">#</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">Name</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">Phone</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">Category</th>
                <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)] hidden md:table-cell">Registered</th>
                <th className="px-4 py-3 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)] w-28">Attended</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-[color:var(--ink-muted)]">
                    No participants match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b border-[color:var(--hairline)] transition-colors ${
                      p.attended ? "bg-[color:var(--green-soft)]" : "hover:bg-[color:var(--cream)]"
                    }`}
                  >
                    <td className="px-4 py-3.5 text-[12px] font-bold text-[color:var(--ink-muted)]">
                      {i + 1}
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-bold text-[color:var(--ink)]">{p.fullName}</p>
                      {p.email && (
                        <p className="text-[11px] text-[color:var(--ink-muted)] mt-0.5">{p.email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-[13px] text-[color:var(--ink-soft)] font-medium">
                      {p.phone}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${CATEGORY_COLOR[p.category]}`}>
                        {p.category.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[12px] text-[color:var(--ink-muted)] hidden md:table-cell">
                      {p.registeredAt}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <button
                        onClick={() => toggleAttendance(p.id)}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all ${
                          p.attended
                            ? "border-[color:var(--green)] bg-[color:var(--green)] text-white"
                            : "border-[color:var(--hairline)] bg-white text-transparent hover:border-[color:var(--green)]"
                        }`}
                        aria-label={p.attended ? "Mark absent" : "Mark present"}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                          <path d="M5 12l4 4L19 7" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-[11px] text-[color:var(--ink-muted)]">
          Tip: Tap the circle in the Attended column to mark a runner present. Green row = checked in.
        </p>
      </main>
    </div>
  );
}

/* ── Stat card ───────────────────────────────────────────── */
function StatCard({ label, value, accent = false }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`flex min-h-[108px] flex-col rounded-sm px-4 py-4 shadow-sm ${accent ? "bg-[color:var(--green)] text-white" : "bg-white"}`}>
      <p className={`min-h-[2.6em] text-[10px] font-bold uppercase tracking-[0.16em] leading-[1.3] ${accent ? "text-white/70" : "text-[color:var(--ink-muted)]"}`}>
        {label}
      </p>
      <p className={`mt-auto text-3xl font-extrabold tabular-nums leading-none ${accent ? "text-white" : "text-[color:var(--ink)]"}`}>
        {value}
      </p>
    </div>
  );
}
