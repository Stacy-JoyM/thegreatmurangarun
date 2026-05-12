/**
 * Kenyan mobile numbers we accept (spaces/dashes ignored; `12345678` is any 8 digits):
 * - `07` + 8 digits (e.g. 0712345678)
 * - `01` + 8 digits (e.g. 0112345678)
 * - `254` + `7` + 8 digits (e.g. 254712345678)
 * - `254` + `1` + 8 digits (e.g. 254112345678)
 * - `+254` + `7` + 8 digits (e.g. +254712345678)
 * - `+254` + `1` + 8 digits (e.g. +254112345678)
 */
export function isValidKenyanMobileFormat(rawPhone: string): boolean {
  const normalized = rawPhone.trim().replace(/[^\d+]/g, "");
  if (!normalized) return false;
  return (
    /^07\d{8}$/.test(normalized) ||
    /^01\d{8}$/.test(normalized) ||
    /^2547\d{8}$/.test(normalized) ||
    /^2541\d{8}$/.test(normalized) ||
    /^\+2547\d{8}$/.test(normalized) ||
    /^\+2541\d{8}$/.test(normalized)
  );
}

export function normalizePhoneForSms(rawPhone: string): string | null {
  const trimmed = rawPhone.trim();
  if (!trimmed) return null;

  const normalized = trimmed.replace(/[^\d+]/g, "");
  if (normalized.startsWith("+")) {
    const digits = normalized.slice(1);
    if (/^\d{8,15}$/.test(digits)) {
      return `+${digits}`;
    }
    return null;
  }

  if (/^0\d{9}$/.test(normalized)) {
    return `+254${normalized.slice(1)}`;
  }
  if (/^254\d{9}$/.test(normalized)) {
    return `+${normalized}`;
  }
  if (/^[17]\d{8}$/.test(normalized)) {
    return `+254${normalized}`;
  }
  if (/^\d{8,15}$/.test(normalized)) {
    return `+${normalized}`;
  }

  return null;
}
