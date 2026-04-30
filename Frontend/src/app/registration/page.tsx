"use client";

import { FormEvent, useMemo, useState } from "react";
import ContactSection from "@/components/contact-section";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  category: string;
  tshirtSize: string;
  country: string;
  county: string;
  packageType: string;
  mpesaNumber: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const CATEGORY_OPTIONS = [
  { value: "10km", shortLabel: "10km - Elite Athletes, All", cardTitle: "Elite Athletes, All", cardMeta: "All ages" },
  { value: "8km", shortLabel: "8km - Men Under 20", cardTitle: "Men", cardMeta: "Under 20" },
  { value: "6km", shortLabel: "6km - Women Under 20", cardTitle: "Women", cardMeta: "Under 20" },
  { value: "2km", shortLabel: "2km - Youth 13-15", cardTitle: "Youth", cardMeta: "Ages 13-15" },
  { value: "1km", shortLabel: "1km - Masters 50-60", cardTitle: "Masters", cardMeta: "Ages 50-60" },
  { value: "500m", shortLabel: "500m - Seniors 61+", cardTitle: "Seniors", cardMeta: "Ages 61+" },
] as const;

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const GENDERS = ["Female", "Male", "Other"] as const;
const PACKAGES = [
  { value: "group", label: "Group Package", fee: "KES 1,500" },
  { value: "vip", label: "VIP Package", fee: "KES 3,000" },
  { value: "corporate", label: "Corporate Package", fee: "KES 4,000" },
] as const;

const STEP_LABELS = [
  "Step 1 - Personal Details",
  "Step 2 - Race Info",
  "Step 3 - Location",
  "Step 4 - Package & M-Pesa",
] as const;

const EMPTY_FORM: FormState = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  category: "",
  tshirtSize: "",
  country: "Kenya",
  county: "",
  packageType: "",
  mpesaNumber: "",
};

function getInitialCategory() {
  if (typeof window === "undefined") return "";
  const category = new URLSearchParams(window.location.search).get("category") ?? "";
  return CATEGORY_OPTIONS.some((option) => option.value === category) ? category : "";
}

function getCategoryLabel(category: string) {
  return CATEGORY_OPTIONS.find((option) => option.value === category)?.shortLabel ?? "Choose Distance";
}

export default function RegistrationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormState>(() => ({ ...EMPTY_FORM, category: getInitialCategory() }));
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const activeCategoryLabel = useMemo(() => getCategoryLabel(form.category), [form.category]);
  const selectedPackage = useMemo(
    () => PACKAGES.find((item) => item.value === form.packageType),
    [form.packageType],
  );
  const showStep4SubmitWarning =
    currentStep === 4 &&
    hasTriedSubmit &&
    (!form.packageType || !form.mpesaNumber.trim());

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setHasTriedSubmit(false);
  };

  const validateAllFields = () => {
    const nextErrors: FormErrors = {};

    if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email address.";
    if (!form.phone.trim()) nextErrors.phone = "Please enter your phone number.";
    if (!form.age.trim()) nextErrors.age = "Please enter your date of birth.";
    if (!form.gender) nextErrors.gender = "Please select a gender.";
    if (!form.category) nextErrors.category = "Please choose a race category.";
    if (!form.tshirtSize) nextErrors.tshirtSize = "Please choose a T-shirt size.";
    if (!form.country.trim()) nextErrors.country = "Please enter your country.";
    if (!form.county.trim()) nextErrors.county = "Please enter your county.";
    if (!form.packageType) nextErrors.packageType = "Please choose a package.";
    if (!form.mpesaNumber.trim()) nextErrors.mpesaNumber = "Please enter your M-Pesa number.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const goNextStep = () => {
    setErrors({});
    setHasTriedSubmit(false);
    setCurrentStep((s) => Math.min(4, s + 1));
  };

  const goPrevStep = () => {
    setErrors({});
    setHasTriedSubmit(false);
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasTriedSubmit(true);
    if (!validateAllFields()) return;
    setHasTriedSubmit(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white">
      {/* ── REGISTER HERE BANNER ───────────────────────────── */}
      <section className="relative">
        <div
          className="relative w-full overflow-hidden"
          style={{ height: "clamp(180px, 32vw, 260px)" }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://ik.imagekit.io/eizd2ue5a/tawc_elgon.jpg?updatedAt=1774550567079')",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg,rgba(10,10,10,0.62) 0%,rgba(10,10,10,0.34) 60%,rgba(10,10,10,0.18) 100%)",
            }}
          />
          <div className="hero-stripes absolute inset-0 pointer-events-none" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl items-end px-4 pb-8 sm:px-8">
            <h1 className="text-3xl font-extrabold uppercase tracking-tight text-white sm:text-4xl">
              Register Here
            </h1>
          </div>
        </div>
      </section>

      {/* ── FORM ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#f6f4ed_0%,#ffffff_42%,#f6f4ed_100%)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(166,32,53,0.45) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-10 sm:px-8 sm:py-14">
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.45fr] lg:gap-10">
            <aside className="rounded-2xl border border-[color:var(--hairline)] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.35)] sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                Registration Desk
              </p>
              <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight tracking-tight text-[color:var(--ink)]">
                Muranga Community Run
              </h2>
              <p className="mt-4 text-[14px] leading-7 text-[color:var(--ink-soft)]">
                Complete the form in four guided steps and submit your registration package details.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  ["Event date", "31st May 2026"],
                  ["Location", "Muranga Town"],
                  ["Current step", STEP_LABELS[currentStep - 1]],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[color:var(--hairline)] bg-[color:var(--cream)] px-3.5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">{label}</p>
                    <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[color:var(--ink)]">{value}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div className="rounded-2xl border border-[color:var(--hairline)] bg-white p-6 shadow-[0_20px_50px_-34px_rgba(0,0,0,0.38)] sm:p-8 md:p-10">
              {submitted ? (
                <SuccessBlock
                  categoryLabel={activeCategoryLabel}
                  packageLabel={selectedPackage?.label ?? "Not selected"}
                  onReset={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                    setErrors({});
                    setHasTriedSubmit(false);
                    setForm({ ...EMPTY_FORM, category: getInitialCategory() });
                  }}
                />
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                      Registration Form
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-[color:var(--ink)]">
                      Register Here
                    </h2>
                    <div className="mt-4 flex items-center gap-2">
                      {[1, 2, 3, 4].map((step, idx) => (
                        <div key={step} className="flex min-w-0 flex-1 items-center">
                          <span
                            className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold ${
                              step <= currentStep
                                ? "bg-[color:var(--green)] text-white"
                                : "border border-[color:var(--hairline)] bg-white text-[color:var(--ink-muted)]"
                            }`}
                          >
                            {step}
                          </span>
                          {idx < 3 && (
                            <span
                              className={`mx-1 h-[2px] flex-1 rounded-full sm:mx-2 ${
                                step < currentStep ? "bg-[color:var(--green)]" : "bg-[color:var(--hairline)]"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl border border-[color:var(--hairline)] bg-[color:var(--cream)] p-4 md:hidden">
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

                  <div className="mt-8 space-y-6 rounded-xl border border-[color:var(--hairline)] bg-white p-4 sm:p-6">
                    {currentStep === 1 && (
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field
                          label="Full Name"
                          placeholder="e.g. Jane Wanjiru"
                          value={form.fullName}
                          onChange={(v) => handleFieldChange("fullName", v)}
                          error={errors.fullName}
                          required
                        />
                        <Field
                          label="Email"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(v) => handleFieldChange("email", v)}
                          error={errors.email}
                          type="email"
                          required
                        />
                        <Field
                          label="Phone Number"
                          placeholder="07XX XXX XXX"
                          value={form.phone}
                          onChange={(v) => handleFieldChange("phone", v)}
                          error={errors.phone}
                          required
                        />
                        <Field
                          label="Date of Birth"
                          value={form.age}
                          onChange={(v) => handleFieldChange("age", v)}
                          error={errors.age}
                          type="date"
                          required
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="grid gap-6 md:grid-cols-3">
                        <SelectField
                          label="Gender"
                          value={form.gender}
                          onChange={(v) => handleFieldChange("gender", v)}
                          options={GENDERS.map((g) => ({ value: g, label: g }))}
                          error={errors.gender}
                        />
                        <SelectField
                          label="Race Category"
                          value={form.category}
                          onChange={(v) => handleFieldChange("category", v)}
                          options={CATEGORY_OPTIONS.map((c) => ({ value: c.value, label: c.shortLabel }))}
                          error={errors.category}
                        />
                        <SelectField
                          label="T-shirt Size"
                          value={form.tshirtSize}
                          onChange={(v) => handleFieldChange("tshirtSize", v)}
                          options={TSHIRT_SIZES.map((size) => ({ value: size, label: size }))}
                          error={errors.tshirtSize}
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="grid gap-6 md:grid-cols-2">
                        <Field
                          label="Country"
                          placeholder="e.g. Kenya"
                          value={form.country}
                          onChange={(v) => handleFieldChange("country", v)}
                          error={errors.country}
                          required
                        />
                        <Field
                          label="County"
                          placeholder="e.g. Muranga"
                          value={form.county}
                          onChange={(v) => handleFieldChange("county", v)}
                          error={errors.county}
                          required
                        />
                      </div>
                    )}

                    {currentStep === 4 && (
                      <>
                        <div>
                          <p className={`mb-2 block text-[12px] font-bold uppercase tracking-[0.12em] ${errors.packageType ? "text-[color:var(--red)]" : "text-[color:var(--ink-soft)]"}`}>
                            Choose Package
                          </p>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {PACKAGES.map((pkg) => {
                              const selected = form.packageType === pkg.value;
                              return (
                                <button
                                  key={pkg.value}
                                  type="button"
                                  onClick={() => handleFieldChange("packageType", pkg.value)}
                                  className={`rounded-lg border px-3 py-3 text-left transition ${
                                    selected
                                      ? "border-[color:var(--green)] bg-[color:var(--green-soft)]"
                                      : errors.packageType
                                        ? "border-[color:var(--red)] bg-white"
                                      : "border-[color:var(--hairline)] bg-white"
                                  }`}
                                >
                                  <p className="text-[12px] font-extrabold uppercase tracking-[0.08em] text-[color:var(--ink)]">
                                    {pkg.label}
                                  </p>
                                  <p className="mt-1 text-[12px] font-semibold text-[color:var(--ink-soft)]">
                                    {pkg.fee}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {selectedPackage && (
                          <div className="rounded-lg border border-[color:var(--green)]/25 bg-[color:var(--green-soft)] p-3">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--ink-soft)]">
                              Selected Package
                            </p>
                            <p className="mt-1 text-sm font-extrabold uppercase text-[color:var(--ink)]">
                              {selectedPackage.label} · {selectedPackage.fee}
                            </p>
                          </div>
                        )}

                        <Field
                          label="M-Pesa Number"
                          placeholder="07XX XXX XXX"
                          value={form.mpesaNumber}
                          onChange={(v) => handleFieldChange("mpesaNumber", v)}
                          error={errors.mpesaNumber}
                          showErrorText={false}
                          required
                        />
                      </>
                    )}
                  </div>

                  <div className="mt-8">
                    {showStep4SubmitWarning && (
                      <p className="mb-4 rounded-sm border border-[color:var(--red)] bg-[color:var(--red)]/8 px-4 py-3 text-[13px] font-semibold text-[color:var(--red)]">
                        Please finish updating required details before submit.
                      </p>
                    )}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={goPrevStep}
                          className="inline-flex w-full items-center justify-center rounded-lg border border-[color:var(--hairline)] bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--ink)] transition hover:border-[color:var(--ink-muted)] sm:w-auto"
                        >
                          Back
                        </button>
                      )}

                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={goNextStep}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--green)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_26px_-16px_rgba(0,102,0,0.85)] transition hover:-translate-y-0.5 hover:bg-[color:var(--green-dark)] sm:w-auto"
                        >
                          Continue →
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[color:var(--green)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_26px_-16px_rgba(0,102,0,0.85)] transition hover:-translate-y-0.5 hover:bg-[color:var(--green-dark)] sm:w-auto"
                        >
                          Complete Registration →
                        </button>
                      )}
                    </div>
                    <p className="mt-3 text-[11px] font-medium text-[color:var(--ink-muted)]">
                      By registering, you agree to race-day rules and safety requirements.
                    </p>
                  </div>
                </form>
              )}
            </div>
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
  error,
  showErrorText = true,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  showErrorText?: boolean;
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
        type={type}
        required={required}
        aria-invalid={Boolean(error)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-3 text-[15px] text-[color:var(--ink)] placeholder-[color:var(--ink-muted)] outline-none transition ${
          error
            ? "border-[color:var(--red)] focus:border-[color:var(--red)]"
            : "border-[color:var(--hairline)] focus:border-[color:var(--green)]"
        }`}
      />
      {error && showErrorText && (
        <p className="mt-2 text-[12px] font-semibold text-[color:var(--red)]">
          {error}
        </p>
      )}
    </label>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  error?: string;
}) {
  return (
    <label className="block">
      <span className={`mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] ${
        error ? "text-[color:var(--red)]" : "text-[color:var(--ink-soft)]"
      }`}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border bg-white px-3 py-3 text-[15px] text-[color:var(--ink)] outline-none transition ${
          error
            ? "border-[color:var(--red)] focus:border-[color:var(--red)]"
            : "border-[color:var(--hairline)] focus:border-[color:var(--green)]"
        }`}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-2 text-[12px] font-semibold text-[color:var(--red)]">
          {error}
        </p>
      )}
    </label>
  );
}

function SuccessBlock({
  categoryLabel,
  packageLabel,
  onReset,
}: {
  categoryLabel: string;
  packageLabel: string;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--green)] text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M5 12l4 4L19 7" />
        </svg>
      </div>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink)]">
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
      <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink)]">
        Category: {categoryLabel}
      </p>
      <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink)]">
        Package: {packageLabel}
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
