"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import ContactSection from "@/components/contact-section";
import PartnersSection from "@/components/partners-section";
import RegistrationIndemnityText from "@/components/registration-indemnity-text";
import { SITE_TAGLINE } from "@/lib/site-tagline";
import { mapRegistrationFormToMurangaRow } from "@/lib/muranga-registration-map";
import { isValidKenyanMobileFormat } from "@/lib/sms/normalize-phone";
import { createBrowserSupabaseClient } from "@/lib/supabase/client";

type FormState = {
  fullName: string;
  school: string;
  email: string;
  phone: string;
  age: string;
  gender: string;
  category: string;
  tshirtSize: string;
  country: string;
  county: string;
  /** How the participant is registering: solo runner vs corporate group */
  registrationAs: "" | "individual" | "corporate";
  /** Inline data authorization / indemnity / waiver consent — required before submit */
  indemnityAccepted: boolean;
  /** Optional — marketing / event updates consent */
  newsUpdatesConsent: boolean;
  /** Required initials for 1km and 2km entries (parent/guardian/teacher) */
  guardianTeacherInitials: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const CATEGORY_OPTIONS = [
  { value: "10km", shortLabel: "10km - Elite Men and Women", cardTitle: "Elite Men and Women", cardMeta: "Elite Men and Women" },
  { value: "8km", shortLabel: "8km - Men Under 20", cardTitle: "Men", cardMeta: "Under 20" },
  { value: "6km", shortLabel: "6km - Women Under 20", cardTitle: "Women", cardMeta: "Under 20" },
  { value: "5km", shortLabel: "5km - Corporate Run", cardTitle: "Corporate Run", cardMeta: "Corporate Teams" },
  { value: "2km", shortLabel: "2km - 13-15 years - 50-60 years", cardTitle: "2km Categories", cardMeta: "13-15 years - 50-60 years" },
  { value: "2km-family", shortLabel: "2km Family Run", cardTitle: "Family Run", cardMeta: "Maximum 5 family members" },
  { value: "1km", shortLabel: "1km - Kids 9-12", cardTitle: "Kids", cardMeta: "Ages 9-12" },
  { value: "500m", shortLabel: "500m - Seniors 61+", cardTitle: "Seniors", cardMeta: "Ages 61+" },
] as const;

const TSHIRT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;
const GENDERS = ["Female", "Male"] as const;
const STEP_LABELS = [
  "Step 1 - Personal Details",
  "Step 2 - Race Info",
  "Step 3 - Location",
  "Step 4 - Consent form",
] as const;

const EMPTY_FORM: FormState = {
  fullName: "",
  school: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  category: "",
  tshirtSize: "",
  country: "Kenya",
  county: "",
  registrationAs: "",
  indemnityAccepted: false,
  newsUpdatesConsent: false,
  guardianTeacherInitials: "",
};

function getInitialCategory() {
  if (typeof window === "undefined") return "";
  const category = new URLSearchParams(window.location.search).get("category") ?? "";
  return CATEGORY_OPTIONS.some((option) => option.value === category) ? category : "";
}

function getInitialRegistrationAs(category: string): "" | "individual" | "corporate" {
  if (category === "5km") return "corporate";
  return "";
}

function getCategoryLabel(category: string) {
  return CATEGORY_OPTIONS.find((option) => option.value === category)?.shortLabel ?? "Choose Distance";
}

/** When empty, OK; when filled, must look like an email */
function optionalEmailFormatError(email: string): string | undefined {
  const t = email.trim();
  if (!t) return undefined;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)) {
    return "Please enter a valid email address.";
  }
  return undefined;
}

/** Validate fields for one wizard step (steps 1–4). Email is optional on step 1. */
function validateStep(step: number, formState: FormState): FormErrors {
  const errors: FormErrors = {};

  if (step === 1) {
    if (!formState.fullName.trim()) {
      errors.fullName = "Please enter your full name.";
    }
    if (!formState.phone.trim()) {
      errors.phone = "Please enter your phone number.";
    } else if (!isValidKenyanMobileFormat(formState.phone)) {
      errors.phone =
        "Enter a valid Kenyan number: 0712345678, 0112345678, 254712345678, 254112345678, +254712345678, or +254112345678 (8 digits after the prefix shown).";
    }
    const emailErr = optionalEmailFormatError(formState.email);
    if (emailErr) errors.email = emailErr;
    if (!formState.age.trim()) {
      errors.age = "Please enter your date of birth.";
    }
  }

  if (step === 2) {
    if (!formState.gender) {
      errors.gender = "Please select your gender.";
    }
    if (!formState.category) {
      errors.category = "Please select a race category.";
    }
    if (!formState.tshirtSize) {
      errors.tshirtSize = "Please select a T-shirt size.";
    }
  }

  if (step === 3) {
    if (!formState.country.trim()) {
      errors.country = "Please enter your country.";
    }
    if (!formState.county.trim()) {
      errors.county = "Please enter your county.";
    }
  }

  if (step === 4) {
    if (formState.registrationAs !== "individual" && formState.registrationAs !== "corporate") {
      errors.registrationAs =
        "Please choose whether you are registering as an individual or as corporate.";
    }
    if (!formState.indemnityAccepted) {
      errors.indemnityAccepted =
        "Please read and accept the data authorization, indemnity and waiver form to continue.";
    }
    if (formState.category === "1km" && !formState.guardianTeacherInitials.trim()) {
      errors.guardianTeacherInitials = "Please provide guardian or teacher initials.";
    }
  }

  return errors;
}

/** Full form check on final submit */
function computeValidationErrors(formState: FormState): FormErrors {
  return {
    ...validateStep(1, formState),
    ...validateStep(2, formState),
    ...validateStep(3, formState),
    ...validateStep(4, formState),
  };
}

export default function RegistrationPage() {
  const initialCategory = getInitialCategory();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState<FormState>(() => ({
    ...EMPTY_FORM,
    category: initialCategory,
    registrationAs: getInitialRegistrationAs(initialCategory),
  }));
  const [errors, setErrors] = useState<FormErrors>({});
  /** Set only after a submit attempt that fails validation — drives the summary message */
  const [submitFailed, setSubmitFailed] = useState(false);
  /** Individual/Corporate hint UI only after submit failed on that field (not inferred from `errors` alone) */
  const [showRegistrationValidation, setShowRegistrationValidation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitNotice, setSubmitNotice] = useState<string | null>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const previousStepRef = useRef(currentStep);
  const activeCategoryLabel = useMemo(() => getCategoryLabel(form.category), [form.category]);
  const registrationAsLabel = useMemo(() => {
    if (form.registrationAs === "individual") return "Individual";
    if (form.registrationAs === "corporate") return "Corporate";
    return "Not selected";
  }, [form.registrationAs]);

  const registrationError =
    showRegistrationValidation && errors.registrationAs ? errors.registrationAs : undefined;
  const requiresGuardianSignature = form.category === "1km" || form.category === "2km";
  const guardianInitialsRequired = form.category === "1km";
  const isFamilyRunCategory = form.category === "2km-family";
  const showPaymentDetails =
    form.registrationAs === "corporate" || (isFamilyRunCategory && form.registrationAs === "individual");
  const hasFieldErrors = useMemo(
    () => Object.values(errors).some((msg) => Boolean(msg)),
    [errors],
  );
  useEffect(() => {
    if (!submitted) return;
    const el = formCardRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
  }, [submitted]);

  useEffect(() => {
    // Keep form card anchored after changing steps (especially step 4 -> back)
    if (submitted || previousStepRef.current === currentStep) return;
    const el = formCardRef.current;
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth", block: "start" });
    requestAnimationFrame(() => {
      el.focus({ preventScroll: true });
    });
    previousStepRef.current = currentStep;
  }, [currentStep, submitted]);

  const handleFieldChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitFailed(false);
    setSubmitError(null);
    setSubmitNotice(null);
    if (field === "registrationAs" || field === "indemnityAccepted") {
      setShowRegistrationValidation(false);
    }
    if (field === "category") {
      setErrors((prev) => ({ ...prev, guardianTeacherInitials: undefined }));
      if (value === "5km") {
        setForm((prev) => ({ ...prev, registrationAs: "corporate" }));
      }
      if (value !== "1km" && value !== "2km") {
        setForm((prev) => ({ ...prev, guardianTeacherInitials: "" }));
      }
    }
  };

  const goNextStep = () => {
    const stepErrors = validateStep(currentStep, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setSubmitFailed(false);
    setSubmitError(null);
    setSubmitNotice(null);
    setShowRegistrationValidation(false);
    setCurrentStep((s) => Math.min(4, s + 1));
  };

  const goPrevStep = () => {
    setErrors({});
    setSubmitFailed(false);
    setSubmitError(null);
    setSubmitNotice(null);
    setShowRegistrationValidation(false);
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  const handleSubmit = async () => {
    const nextErrors = computeValidationErrors(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitFailed(true);
      setShowRegistrationValidation(Boolean(nextErrors.registrationAs || nextErrors.indemnityAccepted));
      for (let s = 1; s <= 4; s += 1) {
        if (Object.keys(validateStep(s, form)).length > 0) {
          setCurrentStep(s);
          break;
        }
      }
      return;
    }
    setErrors({});
    setSubmitFailed(false);
    setShowRegistrationValidation(false);
    setSubmitting(true);
    setSubmitError(null);
    setSubmitNotice(null);

    try {
      const row = {
        ...mapRegistrationFormToMurangaRow(form),
        id: crypto.randomUUID(),
      };
      const supabase = createBrowserSupabaseClient();
      let { error } = await supabase.from("muranga_run2026").insert(row);
      if (error && /Could not find the 'school' column/i.test(error.message)) {
        // Temporary compatibility path while DB schema migration is pending.
        const { school: _school, ...legacyRow } = row;
        const retry = await supabase.from("muranga_run2026").insert(legacyRow);
        error = retry.error;
      }
      if (error) {
        setSubmitError(error.message);
        return;
      }
      try {
        const smsResponse = await fetch("/api/registration/confirm-sms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            registrationId: row.id,
            phone: row.phone,
            categoryLabel: getCategoryLabel(row.category),
          }),
        });
        if (!smsResponse.ok) {
          setSubmitNotice("Registration saved, but SMS confirmation could not be sent right now.");
        }
      } catch {
        setSubmitNotice("Registration saved, but SMS confirmation could not be sent right now.");
      }
      setSubmitted(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Could not save registration. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="overflow-x-hidden bg-white">
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
          <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-10">
            <aside className="min-w-0 rounded-2xl border border-[color:var(--hairline)] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(0,0,0,0.35)] sm:p-7">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                Registration Desk
              </p>
              <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight tracking-tight text-[color:var(--ink)]">
                Muranga Community Run
              </h2>
              <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--green)]">
                {SITE_TAGLINE}
              </p>
              <p className="mt-4 text-[14px] leading-7 text-[color:var(--ink-soft)]">
                Complete the form in four guided steps and submit your registration.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  ["Event date", "31st May 2026"],
                  ["Location", "Muranga Town"],
                  ["Current step", submitted ? "Registration confirmed" : STEP_LABELS[currentStep - 1]],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-[color:var(--hairline)] bg-[color:var(--cream)] px-3.5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--ink-muted)]">{label}</p>
                    <p className="mt-1 break-words text-[12px] font-bold uppercase tracking-[0.08em] text-[color:var(--ink)]">{value}</p>
                  </div>
                ))}
              </div>
            </aside>

            <div
              ref={formCardRef}
              tabIndex={-1}
              id="registration-confirmation"
              aria-live="polite"
              className="min-w-0 scroll-mt-28 rounded-2xl border border-[color:var(--hairline)] bg-white p-5 shadow-[0_20px_50px_-34px_rgba(0,0,0,0.38)] outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)] focus-visible:ring-offset-2 sm:p-8 md:p-10"
            >
              {submitted ? (
                <SuccessBlock
                  categoryLabel={activeCategoryLabel}
                  registrationAsLabel={registrationAsLabel}
                  onReset={() => {
                    setSubmitted(false);
                    setCurrentStep(1);
                    setErrors({});
                    setSubmitFailed(false);
                    setSubmitError(null);
                    setSubmitNotice(null);
                    setShowRegistrationValidation(false);
                    const nextCategory = getInitialCategory();
                    setForm({
                      ...EMPTY_FORM,
                      category: nextCategory,
                      registrationAs: getInitialRegistrationAs(nextCategory),
                    });
                  }}
                />
              ) : (
                <form onSubmit={(e) => e.preventDefault()} noValidate>
                  <div className="mb-5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                      Registration Form
                    </p>
                    <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-tight text-[color:var(--ink)]">
                      Register Here
                    </h2>
                    <div className="mt-4 flex items-center gap-1.5 sm:gap-2">
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

                  <div className="mt-8 min-w-0 space-y-6 rounded-xl border border-[color:var(--hairline)] bg-white p-4 sm:p-6">
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
                          label="Email (optional)"
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={(v) => handleFieldChange("email", v)}
                          error={errors.email}
                          type="email"
                        />
                        <Field
                          label="School (optional)"
                          placeholder="e.g. Muranga High School"
                          value={form.school}
                          onChange={(v) => handleFieldChange("school", v)}
                          error={errors.school}
                        />
                        <Field
                          label="Phone Number"
                          placeholder="e.g. 0712345678 or +254712345678"
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
                          required
                        />
                        <SelectField
                          label="Race Category"
                          value={form.category}
                          onChange={(v) => handleFieldChange("category", v)}
                          options={CATEGORY_OPTIONS.map((c) => ({ value: c.value, label: c.shortLabel }))}
                          error={errors.category}
                          required
                        />
                        <SelectField
                          label="T-shirt Size"
                          value={form.tshirtSize}
                          onChange={(v) => handleFieldChange("tshirtSize", v)}
                          options={TSHIRT_SIZES.map((size) => ({ value: size, label: size }))}
                          error={errors.tshirtSize}
                          required
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-4">
                        <p className="text-[13px] font-medium leading-relaxed text-[color:var(--ink-soft)]">
                          Kindly enter the country and county you are from.
                        </p>
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
                          placeholder="e.g. Muranga, Nairobi, Kisumu"
                          value={form.county}
                          onChange={(v) => handleFieldChange("county", v)}
                          error={errors.county}
                          required
                        />
                        </div>
                      </div>
                    )}

                    {currentStep === 4 && (
                      <div className="min-w-0 space-y-0">
                      <fieldset className="min-w-0 border-0 p-0">
                        <legend className="mb-4 block w-full">
                          <span
                            className={`block text-[12px] font-bold uppercase tracking-[0.12em] ${
                              registrationError ? "text-[color:var(--ink)]" : "text-[color:var(--ink-soft)]"
                            }`}
                          >
                            Registration type
                          </span>
                          <span className="mt-2 block max-w-full break-words text-[15px] font-extrabold leading-snug tracking-tight text-[color:var(--ink)] sm:text-[16px]">
                            Are you registering as an Individual or Corporate?
                          </span>
                        </legend>
                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                          <label
                            className={`flex min-h-[3rem] flex-1 cursor-pointer touch-manipulation items-center gap-3 rounded-lg border px-4 py-4 transition sm:min-h-0 sm:py-3.5 ${
                              form.registrationAs === "individual"
                                ? "border-[color:var(--green)] bg-[color:var(--green-soft)] ring-1 ring-[color:var(--green)]/25"
                                : registrationError
                                  ? "border-[color:var(--ink-muted)] bg-[color:var(--cream)]"
                                  : "border-[color:var(--hairline)] bg-white hover:border-[color:var(--ink-muted)]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              aria-invalid={Boolean(registrationError)}
                              aria-required
                              checked={form.registrationAs === "individual"}
                              onChange={() => handleFieldChange("registrationAs", "individual")}
                              className="h-5 w-5 shrink-0 rounded border-[color:var(--hairline)] text-[color:var(--green)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)] focus:ring-offset-2"
                            />
                            <span className="text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)]">
                              Individual
                            </span>
                          </label>
                          <label
                            className={`flex min-h-[3rem] flex-1 cursor-pointer touch-manipulation items-center gap-3 rounded-lg border px-4 py-4 transition sm:min-h-0 sm:py-3.5 ${
                              form.registrationAs === "corporate"
                                ? "border-[color:var(--green)] bg-[color:var(--green-soft)] ring-1 ring-[color:var(--green)]/25"
                                : registrationError
                                  ? "border-[color:var(--ink-muted)] bg-[color:var(--cream)]"
                                  : "border-[color:var(--hairline)] bg-white hover:border-[color:var(--ink-muted)]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              aria-invalid={Boolean(registrationError)}
                              aria-required
                              checked={form.registrationAs === "corporate"}
                              onChange={() => handleFieldChange("registrationAs", "corporate")}
                              className="h-5 w-5 shrink-0 rounded border-[color:var(--hairline)] text-[color:var(--green)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)] focus:ring-offset-2"
                            />
                            <span className="text-sm font-extrabold uppercase tracking-wide text-[color:var(--ink)]">
                              Corporate
                            </span>
                          </label>
                        </div>
                        {registrationError && (
                          <p className="mt-3 text-[12px] font-semibold text-[color:var(--ink-soft)]">
                            {registrationError}
                          </p>
                        )}
                      </fieldset>

                      {showPaymentDetails && (
                        <div className="mt-6 space-y-4" role="region" aria-label="Registration fee and payment details">
                          <div className="rounded-xl border-2 border-[color:var(--green)] bg-white px-4 py-5 text-center shadow-[0_10px_28px_-18px_rgba(0,102,0,0.45)] sm:px-6">
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--green)]">
                              Amount due
                            </p>
                            <p className="mt-2 text-[clamp(1.5rem,4vw,2rem)] font-extrabold uppercase leading-tight tracking-tight text-[color:var(--ink)]">
                              KES{" "}
                              <span className="tabular-nums text-[color:var(--green-dark)]">1,000</span>
                            </p>
                            <p className="mt-2 text-[13px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink-soft)]">
                              {isFamilyRunCategory ? "For up to 5 family members" : "Per person (minimum 6 people)"}
                            </p>
                          </div>
                          <div className="rounded-xl border border-[color:var(--green)]/35 bg-[color:var(--green-soft)] px-4 py-4 sm:px-5 sm:py-5">
                            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[color:var(--ink-muted)]">
                              Payment details
                            </p>
                            <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--ink)]">
                              <span className="font-semibold">MPESA Paybill:</span>{" "}
                              <span className="font-extrabold tabular-nums">522522</span>
                            </p>
                            <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--ink)]">
                              <span className="font-semibold">Account number:</span>{" "}
                              <span className="font-extrabold tabular-nums">1300102322</span>
                            </p>
                          </div>
                        </div>
                      )}

                      <fieldset className="mt-8 min-w-0 border-0 p-0 sm:mt-10">
                        <legend className="mb-3 block w-full max-w-full px-0">
                          <span
                            className={`block max-w-full break-words text-[15px] font-bold leading-snug tracking-tight sm:text-[17px] sm:leading-normal ${
                              errors.indemnityAccepted ? "text-[color:var(--ink)]" : "text-[color:var(--ink-soft)]"
                            }`}
                          >
                            Data authorization, indemnity and waiver form consent
                          </span>
                        </legend>
                        <div className="max-h-[min(42svh,340px)] overflow-y-auto overscroll-y-contain rounded-lg border border-[color:var(--hairline)] bg-[color:var(--cream)] p-3 shadow-inner [-webkit-overflow-scrolling:touch] sm:max-h-[min(46svh,400px)] sm:p-5 md:max-h-[min(480px,52svh)]">
                          <RegistrationIndemnityText />
                        </div>
                        <label
                          className={`mt-4 flex min-h-[3rem] cursor-pointer touch-manipulation items-start gap-3 rounded-lg border px-4 py-4 transition sm:min-h-0 sm:py-3.5 ${
                            form.indemnityAccepted
                              ? "border-[color:var(--green)] bg-[color:var(--green-soft)] ring-1 ring-[color:var(--green)]/25"
                              : errors.indemnityAccepted
                                ? "border-[color:var(--ink-muted)] bg-[color:var(--cream)]"
                                : "border-[color:var(--hairline)] bg-white hover:border-[color:var(--ink-muted)]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={form.indemnityAccepted}
                            onChange={(e) => handleFieldChange("indemnityAccepted", e.target.checked)}
                            aria-invalid={Boolean(errors.indemnityAccepted)}
                            aria-required
                            className="mt-0.5 h-5 w-5 shrink-0 rounded border-[color:var(--hairline)] text-[color:var(--green)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)] focus:ring-offset-2"
                          />
                          <span className="min-w-0 flex-1 break-words text-[13px] font-semibold leading-snug text-[color:var(--ink)] sm:text-sm">
                            I have read and accepted the data authorization, indemnity and waiver form consent set out
                            above.
                          </span>
                        </label>
                        {errors.indemnityAccepted && (
                          <p className="mt-3 text-[12px] font-semibold text-[color:var(--ink-soft)]">
                            {errors.indemnityAccepted}
                          </p>
                        )}

                        <div className="mt-8 border-t border-[color:var(--hairline)] pt-6">
                          <label
                            className={`flex min-h-[3rem] cursor-pointer touch-manipulation items-start gap-3 rounded-lg border px-4 py-4 transition sm:min-h-0 sm:py-3.5 ${
                              form.newsUpdatesConsent
                                ? "border-[color:var(--green)] bg-[color:var(--green-soft)] ring-1 ring-[color:var(--green)]/25"
                                : "border-[color:var(--hairline)] bg-white hover:border-[color:var(--ink-muted)]"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={form.newsUpdatesConsent}
                              onChange={(e) => handleFieldChange("newsUpdatesConsent", e.target.checked)}
                              className="mt-0.5 h-5 w-5 shrink-0 rounded border-[color:var(--hairline)] text-[color:var(--green)] focus:outline-none focus:ring-2 focus:ring-[color:var(--green)] focus:ring-offset-2"
                            />
                            <span className="min-w-0 flex-1 break-words text-[13px] font-semibold leading-snug text-[color:var(--ink)] sm:text-sm">
                              I consent to receiving news and updates regarding future events organised by The Great
                              Muranga Community Run.
                            </span>
                          </label>
                          <p className="mt-2 text-[11px] leading-relaxed text-[color:var(--ink-muted)]">
                            You may withdraw this consent at any time in line with applicable data-protection requirements.
                          </p>
                        </div>

                        {requiresGuardianSignature && (
                          <div className="mt-8 border-t border-[color:var(--hairline)] pt-6">
                            <p className="text-[12px] font-semibold leading-relaxed text-[color:var(--ink)]">
                              {guardianInitialsRequired
                                ? "For participants under 18 years old, kindly seek parental consent. Parental signature is required (please add the initials of your name)."
                                : "For those below the age 18 years, parent/guardian/teacher signature is required."}
                            </p>
                            <label className="mt-3 block">
                              <span
                                className={`mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] ${
                                  errors.guardianTeacherInitials
                                    ? "text-[color:var(--ink)]"
                                    : "text-[color:var(--ink-soft)]"
                                }`}
                              >
                                Guardian/Teacher Signature Use Only
                              </span>
                              <input
                                type="text"
                                value={form.guardianTeacherInitials}
                                onChange={(e) => handleFieldChange("guardianTeacherInitials", e.target.value)}
                                aria-invalid={Boolean(errors.guardianTeacherInitials)}
                                aria-required={guardianInitialsRequired}
                                placeholder="e.g. JM"
                                className={`w-full rounded-lg border bg-white px-3 py-3 text-[15px] text-[color:var(--ink)] placeholder-[color:var(--ink-muted)] outline-none transition ${
                                  errors.guardianTeacherInitials
                                    ? "border-[color:var(--ink-muted)] focus:border-[color:var(--green)]"
                                    : "border-[color:var(--hairline)] focus:border-[color:var(--green)]"
                                }`}
                              />
                              {errors.guardianTeacherInitials && (
                                <p className="mt-2 text-[12px] font-semibold text-[color:var(--ink-soft)]">
                                  {errors.guardianTeacherInitials}
                                </p>
                              )}
                            </label>
                          </div>
                        )}
                      </fieldset>
                      </div>
                    )}
                  </div>

                  <div className="mt-8">
                    {submitError && (
                      <p
                        role="alert"
                        className="mb-4 break-words rounded-sm border border-[color:var(--hairline)] bg-[color:var(--cream)] px-4 py-3 text-[13px] font-semibold text-[color:var(--ink)]"
                      >
                        {submitError}
                      </p>
                    )}
                    {submitNotice && (
                      <p
                        role="status"
                        className="mb-4 break-words rounded-sm border border-[color:var(--hairline)] bg-[color:var(--cream)] px-4 py-3 text-[13px] font-semibold text-[color:var(--ink)]"
                      >
                        {submitNotice}
                      </p>
                    )}
                    {submitFailed && hasFieldErrors && (
                      <p
                        role="alert"
                        className="mb-4 break-words rounded-sm border border-[color:var(--hairline)] bg-[color:var(--cream)] px-4 py-3 text-[13px] font-semibold text-[color:var(--ink)]"
                      >
                        Please go back and fill all required details.
                      </p>
                    )}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={goPrevStep}
                          disabled={submitting}
                          className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center rounded-lg border border-[color:var(--hairline)] bg-white px-6 py-3 text-sm font-bold uppercase tracking-wide text-[color:var(--ink)] transition hover:border-[color:var(--ink-muted)] disabled:pointer-events-none disabled:opacity-50 sm:w-auto"
                        >
                          Back
                        </button>
                      )}

                      {currentStep < 4 ? (
                        <button
                          type="button"
                          onClick={goNextStep}
                          disabled={submitting}
                          className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-lg bg-[color:var(--green)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_26px_-16px_rgba(0,102,0,0.85)] transition hover:-translate-y-0.5 hover:bg-[color:var(--green-dark)] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                        >
                          Continue →
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            void handleSubmit();
                          }}
                          disabled={submitting}
                          className="inline-flex min-h-12 w-full touch-manipulation items-center justify-center gap-2 rounded-lg bg-[color:var(--green)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_26px_-16px_rgba(0,102,0,0.85)] transition hover:-translate-y-0.5 hover:bg-[color:var(--green-dark)] disabled:pointer-events-none disabled:opacity-60 sm:w-auto"
                        >
                          {submitting ? "Saving…" : "Complete Registration →"}
                        </button>
                      )}
                    </div>
                    <div className="mt-3 space-y-2 text-[11px] font-medium leading-relaxed text-[color:var(--ink-muted)]">
                      <p>By registering, you agree to race-day rules and safety requirements.</p>
                      <p>
                        It is important to note that any data collected from you is protected under
                        Kenya&apos;s Data Protection Act, 2019.
                      </p>
                    </div>
                  </div>
                </form>
              )}
            </div>
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
        error ? "text-[color:var(--ink)]" : "text-[color:var(--ink-soft)]"
      }`}>
        {label}
      </span>
      <input
        type={type}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-3 text-[15px] text-[color:var(--ink)] placeholder-[color:var(--ink-muted)] outline-none transition ${
          error
            ? "border-[color:var(--ink-muted)] focus:border-[color:var(--green)]"
            : "border-[color:var(--hairline)] focus:border-[color:var(--green)]"
        }`}
      />
      {error && showErrorText && (
        <p className="mt-2 text-[12px] font-semibold text-[color:var(--ink-soft)]">
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
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className={`mb-1.5 block text-[12px] font-bold uppercase tracking-[0.12em] ${
        error ? "text-[color:var(--ink)]" : "text-[color:var(--ink-soft)]"
      }`}>
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-required={required}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-lg border bg-white px-3 py-3 text-[15px] text-[color:var(--ink)] outline-none transition ${
          error
            ? "border-[color:var(--ink-muted)] focus:border-[color:var(--green)]"
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
        <p className="mt-2 text-[12px] font-semibold text-[color:var(--ink-soft)]">
          {error}
        </p>
      )}
    </label>
  );
}

function SuccessBlock({
  categoryLabel,
  registrationAsLabel,
  onReset,
}: {
  categoryLabel: string;
  registrationAsLabel: string;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--green)] text-white">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
          <path d="M5 12l4 4L19 7" />
        </svg>
      </div>
      <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
        Registration confirmed
      </p>
      <h3 className="mt-3 text-2xl font-extrabold uppercase leading-snug tracking-tight text-[color:var(--ink)] sm:text-3xl">
        You&apos;re in. See you at the start line.
      </h3>
      <p className="mt-4 max-w-md text-[13px] leading-6 text-[color:var(--ink-soft)]">
        An SMS confirmation will follow shortly. Keep an eye out for race-day updates.
      </p>
      {registrationAsLabel === "Corporate" && (
        <p className="mt-4 max-w-md text-[13px] leading-6 text-[color:var(--ink-soft)]">
          Corporates may send their confirmation payment message to{" "}
          <a
            href="mailto:info@msa.co.ke"
            className="font-semibold text-[color:var(--green-dark)] underline-offset-2 hover:underline"
          >
            info@msa.co.ke
          </a>
          . Paybill 522522. Account number 1300102322.
        </p>
      )}
      <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink)]">
        Category: {categoryLabel}
      </p>
      <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-[color:var(--ink)]">
        Registering as: {registrationAsLabel}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[color:var(--green)] px-7 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-[0_12px_26px_-16px_rgba(0,102,0,0.85)] transition hover:bg-[color:var(--green-dark)]"
      >
        Register another runner
      </button>
    </div>
  );
}
