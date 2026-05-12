import { normalizePhoneForSms } from "@/lib/sms/normalize-phone";

/**
 * Maps registration UI state → `public.muranga_run2026` row shape (snake_case).
 */
export type MurangaRegistrationInsert = {
  id?: string;
  full_name: string;
  school: string | null;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  category: string;
  tshirt_size: string;
  country: string;
  county: string;
  registration_as: "individual" | "corporate";
  indemnity_accepted: boolean;
  news_updates_consent: boolean;
  guardian_teacher_initials: string | null;
};

export type RegistrationFormLike = {
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
  registrationAs: "" | "individual" | "corporate";
  indemnityAccepted: boolean;
  newsUpdatesConsent: boolean;
  guardianTeacherInitials: string;
};

export function mapRegistrationFormToMurangaRow(
  form: RegistrationFormLike,
): MurangaRegistrationInsert {
  const emailTrimmed = form.email.trim();
  const normalizedPhone = normalizePhoneForSms(form.phone) ?? "";
  const safeCategory =
    form.category && ["10km", "8km", "6km", "5km", "2km", "2km-family", "1km", "500m"].includes(form.category)
      ? form.category
      : "10km";
  const safeRegistrationAs: "individual" | "corporate" =
    form.registrationAs === "individual" || form.registrationAs === "corporate"
      ? form.registrationAs
      : safeCategory === "5km"
        ? "corporate"
        : "individual";
  const safeGender = form.gender === "Female" || form.gender === "Male" ? form.gender : "Female";
  const safeTshirtSize = ["XS", "S", "M", "L", "XL", "XXL"].includes(form.tshirtSize) ? form.tshirtSize : "M";
  const safeDateOfBirth = form.age || "2000-01-01";
  return {
    full_name: form.fullName.trim() || "Participant",
    school: form.school.trim() || null,
    email: emailTrimmed,
    phone: normalizedPhone,
    date_of_birth: safeDateOfBirth,
    gender: safeGender,
    category: safeCategory,
    tshirt_size: safeTshirtSize,
    country: form.country.trim(),
    county: form.county.trim(),
    registration_as: safeRegistrationAs,
    indemnity_accepted: form.indemnityAccepted,
    news_updates_consent: form.newsUpdatesConsent,
    guardian_teacher_initials: form.guardianTeacherInitials.trim() || null,
  };
}
