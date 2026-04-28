"use client";

import { FormEvent, RefObject, useEffect, useMemo, useRef, useState } from "react";
import ContactSection from "@/components/contact-section";

type FormState = {
  fullName: string;
  phone: string;
  category: string;
  emergencyContact: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const empty: FormState = {
  fullName: "",
  phone: "",
  category: "",
  emergencyContact: "",
};

const CATEGORY_OPTIONS = [
  { value: "10km", label: "10km — Open (All ages welcome)", shortLabel: "10km - Open", cardTitle: "Open", cardMeta: "All ages" },
  { value: "8km", label: "8km — Men Under 20", shortLabel: "8km - Men Under 20", cardTitle: "Men", cardMeta: "Under 20" },
  { value: "2km", label: "2km — Youth (Ages 13 – 15)", shortLabel: "2km - Youth 13-15", cardTitle: "Youth", cardMeta: "Ages 13-15" },
  { value: "1km", label: "1km — Masters (Ages 50 – 60)", shortLabel: "1km - Masters 50-60", cardTitle: "Masters", cardMeta: "Ages 50-60" },
  { value: "500m", label: "500m — Seniors (Ages 61+)", shortLabel: "500m - Seniors 61+", cardTitle: "Seniors", cardMeta: "Ages 61+" },
] as const;

const EMPTY_FIELD_MESSAGES: Record<keyof FormState, string> = {
  fullName: "Please enter your full name as it appears on your ID.",
  phone: "Please enter your phone number.",
  category: "Please choose a category.",
  emergencyContact: "Please enter your emergency contact.",
};

function getCategoryLabel(category: string) {
  return CATEGORY_OPTIONS.find((option) => option.value === category)?.shortLabel ?? "Choose Distance";
}

function getInitialCategory() {
  if (typeof window === "undefined") {
    return "";
  }

  const category = new URLSearchParams(window.location.search).get("category") ?? "";
  return CATEGORY_OPTIONS.some((option) => option.value === category) ? category : "";
}

export default function RegistrationPage() {
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory);
  const [form, setForm] = useState<FormState>(() => ({ ...empty, category: getInitialCategory() }));
  const [submitted, setSubmitted] = useState(false);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);
  const emergencyContactRef = useRef<HTMLInputElement>(null);
  const activeCategoryLabel = useMemo(() => getCategoryLabel(selectedCategory || form.category), [form.category, selectedCategory]);

  useEffect(() => {
    const firstInvalidField = [
      { field: "fullName" as const, ref: fullNameRef },
      { field: "phone" as const, ref: phoneRef },
      { field: "category" as const, ref: categoryRef },
      { field: "emergencyContact" as const, ref: emergencyContactRef },
    ].find(({ field }) => errors[field]);

    if (!firstInvalidField) {
      return;
    }

    requestAnimationFrame(() => {
      const target = firstInvalidField.ref.current;

      if (!target) {
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.focus({ preventScroll: true });
    });
  }, [errors]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setForm((prev) => ({ ...prev, category }));
    setErrors((prev) => ({ ...prev, category: undefined }));
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasTriedSubmit(true);
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = EMPTY_FIELD_MESSAGES.fullName;
    }
    if (!form.phone.trim()) {
      nextErrors.phone = EMPTY_FIELD_MESSAGES.phone;
    }
    if (!form.category.trim()) {
      nextErrors.category = EMPTY_FIELD_MESSAGES.category;
    }
    if (!form.emergencyContact.trim()) {
      nextErrors.emergencyContact = EMPTY_FIELD_MESSAGES.emergencyContact;
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
    setHasTriedSubmit(false);
    setForm({ ...empty, category: selectedCategory });
  };

  return (
    <div className="bg-white">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(260px, 32vw, 380px)" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1571008887538-b36bb32f4571?auto=format&fit=crop&w=2400&q=80')",
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
              Registration open · Free
            </p>
            <h1
              className="font-extrabold uppercase text-white leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(40px, 7vw, 80px)" }}
            >
              Register
              <br />
              <span className="text-[color:var(--yellow)]">Today.</span>
            </h1>
            <div className="race-day-pill mt-6 w-fit">
              <span className="text-white/70">Race Day:</span>
              <span>31st May 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM + SIDEBAR ────────────────────────────────── */}
      <section className="bg-[color:var(--cream)]">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-8 sm:py-20">
          <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-20">

            {/* Form */}
            <div className="bg-white rounded-sm p-5 shadow-sm sm:p-8">
              {submitted ? (
                <SuccessBlock
                  categoryLabel={activeCategoryLabel}
                  onReset={() => setSubmitted(false)}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="sm:max-w-xl">
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                        Registration Form
                      </p>
                      <h2 className="mt-3 text-2xl font-extrabold uppercase tracking-tight text-[color:var(--ink)]">
                        Enter Your Details.
                      </h2>
                      <p className="mt-2 text-[13px] leading-6 text-[color:var(--ink-soft)]">
                        Takes less than a minute. You&apos;ll get a confirmation once submitted.
                      </p>
                    </div>

                    <div
                      ref={categoryRef}
                      tabIndex={-1}
                      className={`w-full rounded-sm border bg-[color:var(--cream)] p-4 outline-none sm:max-w-[290px] ${
                      errors.category ? "border-[color:var(--red)]" : "border-[color:var(--hairline)]"
                    }`}
                    >
                      <p className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
                        errors.category ? "text-[color:var(--red)]" : "text-[color:var(--ink-muted)]"
                      }`}>
                        Choose Distance
                      </p>
                      <div className="mt-3 grid grid-cols-2 gap-3 sm:hidden">
                        {CATEGORY_OPTIONS.map((option) => {
                          const isSelected = form.category === option.value;

                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleCategoryChange(option.value)}
                              className={`flex min-h-[88px] flex-col items-start justify-between rounded-sm border px-3 py-3 text-left transition ${
                                isSelected
                                  ? "border-[color:var(--green)] bg-[color:var(--green)] text-white shadow-sm"
                                  : errors.category
                                    ? "border-[color:var(--red)] bg-white text-[color:var(--ink)]"
                                    : "border-[color:var(--hairline)] bg-white text-[color:var(--ink)]"
                              } ${option.value === "500m" ? "col-span-2" : ""}`}
                              aria-pressed={isSelected}
                            >
                              <span className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
                                isSelected ? "text-white/75" : "text-[color:var(--ink-muted)]"
                              }`}>
                                {option.value}
                              </span>
                              <span className="text-[14px] font-extrabold uppercase leading-tight">
                                {option.cardTitle}
                              </span>
                              <span className={`text-[11px] font-bold uppercase tracking-[0.08em] ${
                                isSelected ? "text-white/80" : "text-[color:var(--ink-soft)]"
                              }`}>
                                {option.cardMeta}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      <select
                        required
                        value={form.category}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        aria-invalid={Boolean(errors.category)}
                        className={`mt-3 hidden min-h-12 w-full rounded-sm border px-3 pr-8 text-[12px] font-bold tracking-tight text-[color:var(--ink)] outline-none transition sm:block sm:text-[14px] ${
                          errors.category
                            ? "border-[color:var(--red)] bg-white focus:border-[color:var(--red)]"
                            : "border-[color:var(--hairline)] bg-white focus:border-[color:var(--green)]"
                        }`}
                      >
                        <option value="">Choose distance</option>
                        {CATEGORY_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.shortLabel}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="mt-2 text-[12px] font-semibold text-[color:var(--red)]">
                          {errors.category}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-2 rounded-sm border border-[color:var(--hairline)] bg-[color:var(--cream)] px-4 py-3">
                    <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
                      Applying for
                    </span>
                    <span className="rounded-full bg-[color:var(--green)] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white">
                      {activeCategoryLabel}
                    </span>
                  </div>

                  <div className="mt-5 rounded-sm border border-[color:var(--hairline)] bg-[color:var(--cream)] p-4 md:hidden">
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">
                      Quick summary
                    </p>
                    <div className="mt-3 space-y-2 text-[13px] text-[color:var(--ink)]">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[color:var(--ink-soft)]">Entry</span>
                        <span className="font-bold">Free</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[color:var(--ink-soft)]">Date</span>
                        <span className="font-bold">31st May 2026</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[color:var(--ink-soft)]">Location</span>
                        <span className="font-bold">Muranga Town</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-6">
                    <Field
                      label="Full Name as on ID"
                      placeholder="e.g. Jane Wanjiru"
                      value={form.fullName}
                      onChange={(v) => handleFieldChange("fullName", v)}
                      inputRef={fullNameRef}
                      error={errors.fullName}
                      required
                    />
                    <Field
                      label="Phone Number"
                      placeholder="07XX XXX XXX"
                      value={form.phone}
                      onChange={(v) => handleFieldChange("phone", v)}
                      inputRef={phoneRef}
                      error={errors.phone}
                      required
                    />
                    <Field
                      label="Emergency Contact"
                      placeholder="Name and phone number"
                      value={form.emergencyContact}
                      onChange={(v) => handleFieldChange("emergencyContact", v)}
                      inputRef={emergencyContactRef}
                      error={errors.emergencyContact}
                      required
                    />
                  </div>

                  <div className="mt-8">
                    {hasTriedSubmit && Object.keys(errors).length > 0 && (
                      <p className="mb-4 rounded-sm border border-[color:var(--red)] bg-[color:var(--red)]/8 px-4 py-3 text-[13px] font-semibold text-[color:var(--red)]">
                        Please fill in all form details before you submit.
                      </p>
                    )}
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-[color:var(--green)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-dark)] sm:w-auto"
                    >
                      Complete Registration →
                    </button>
                    <p className="mt-3 text-[11px] text-[color:var(--ink-muted)]">
                      By registering, you agree to race-day rules and safety requirements.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Sidebar — hidden on mobile, shown on desktop */}
            <aside className="hidden md:block md:sticky md:top-24 md:self-start">
              {/* Race summary card */}
              <div className="signup-card rounded-sm">
                <div className="p-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                    Race summary
                  </p>
                  <h3 className="mt-3 text-lg font-extrabold uppercase tracking-tight text-[color:var(--ink)]">
                    The Great Muranga Run
                  </h3>
                  <dl className="mt-5 space-y-3">
                    {[
                      ["Location", "Muranga Town"],
                      ["Distances", "500m · 1km · 2km · 8km · 10km"],
                      ["Date", "31st May 2026"],
                      ["Entry", "Free"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between border-b border-[color:var(--hairline)] pb-3"
                      >
                        <dt className="text-[12px] text-[color:var(--ink-muted)]">{label}</dt>
                        <dd className="text-[13px] font-bold text-[color:var(--ink)]">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              {/* Categories */}
              <div className="mt-6 space-y-3">
                {[
                  { d: "10km",  t: "Open",          l: "All ages" },
                  { d: "8km",   t: "Men Under 20",  l: "Under 20" },
                  { d: "2km",   t: "Youth",         l: "Ages 13 – 15" },
                  { d: "1km",   t: "Masters",       l: "Ages 50 – 60" },
                  { d: "500m",  t: "Seniors",       l: "Ages 61+" },
                ].map((c) => (
                  <div
                    key={c.d}
                    className={`flex items-center justify-between rounded-sm border px-4 py-3 transition ${
                      (selectedCategory || form.category) === c.d
                        ? "border-[color:var(--green)] bg-[color:var(--green-soft)]"
                        : "border-[color:var(--hairline)] bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-extrabold text-[color:var(--green)]">{c.d}</span>
                      <span className="text-[13px] font-semibold text-[color:var(--ink)]">{c.t}</span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wide text-[color:var(--ink-muted)]">{c.l}</span>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[12px] leading-6 text-[color:var(--ink-soft)]">
                Your details are only used for race-day coordination and
                safety. You&apos;ll get a confirmation once submitted.
              </p>
              <p className="mt-4 text-[12px] text-[color:var(--ink-soft)]">
                Questions?{" "}
                <a
                  href="mailto:info@greatmurangacommunityrun.co.ke"
                  className="font-bold text-[color:var(--green)] hover:underline"
                >
                  info@greatmurangacommunityrun.co.ke
                </a>
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── CONTACT ───────────────────────────────────────── */}
      <ContactSection />
    </div>
  );
}

/* ── Form helpers ───────────────────────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  inputRef,
  error,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={`mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] ${
        error ? "text-[color:var(--red)]" : "text-[color:var(--ink-soft)]"
      }`}>
        {label}
      </span>
      <input
        ref={inputRef}
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-none border-0 border-b-2 bg-transparent px-0 py-2.5 text-[15px] text-[color:var(--ink)] placeholder-[color:var(--ink-muted)] outline-none transition ${
          error
            ? "border-[color:var(--red)] focus:border-[color:var(--red)]"
            : "border-[color:var(--hairline)] focus:border-[color:var(--green)]"
        }`}
      />
      {error && (
        <p className="mt-2 text-[12px] font-semibold text-[color:var(--red)]">
          {error}
        </p>
      )}
    </label>
  );
}

function SuccessBlock({ categoryLabel, onReset }: { categoryLabel: string; onReset: () => void }) {
  return (
    <div>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--green)] text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M5 12l4 4L19 7" />
        </svg>
      </div>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--green)]">
        Registration confirmed
      </p>
      <h3 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-[color:var(--ink)]">
        You&apos;re in.
        <br />
        See you at the start line.
      </h3>
      <p className="mt-4 max-w-md text-[13px] leading-6 text-[color:var(--ink-soft)]">
        A confirmation will follow shortly. Keep an eye out for race-day
        updates.
      </p>
      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--green)]">
        Category: {categoryLabel}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex items-center gap-2 rounded-sm bg-[color:var(--green)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--green-dark)]"
      >
        Register another runner
      </button>
    </div>
  );
}
