import { normalizePhoneForSms } from "@/lib/sms/normalize-phone";

export type SmsSendResult =
  | { ok: true }
  | { ok: false; error: string; code: "invalid_phone" | "not_configured" | "provider_error" };

export async function sendRegistrationSms({
  phone,
  message,
}: {
  phone: string;
  message: string;
}): Promise<SmsSendResult> {
  const to = normalizePhoneForSms(phone);
  if (!to) {
    return { ok: false, error: "Phone number format is invalid for SMS.", code: "invalid_phone" };
  }

  const provider = (process.env.SMS_PROVIDER ?? "africastalking").trim().toLowerCase();
  if (provider !== "africastalking") {
    return { ok: false, error: "Unsupported SMS provider.", code: "not_configured" };
  }

  const apiKey = (process.env.SMS_API_KEY ?? "").trim();
  const username = (process.env.SMS_USERNAME ?? "").trim();
  const from = (process.env.SMS_SENDER_ID ?? "").trim();
  if (!apiKey || !username) {
    return { ok: false, error: "SMS provider credentials are missing.", code: "not_configured" };
  }

  const body = new URLSearchParams();
  body.set("username", username);
  body.set("to", to);
  body.set("message", message);
  if (from) {
    body.set("from", from);
  }

  try {
    const response = await fetch("https://api.africastalking.com/version1/messaging", {
      method: "POST",
      headers: {
        apiKey,
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
      cache: "no-store",
    });

    if (!response.ok) {
      const details = await response.text();
      return {
        ok: false,
        error: `SMS provider rejected request (${response.status}): ${details.slice(0, 200)}`,
        code: "provider_error",
      };
    }

    return { ok: true };
  } catch (err) {
    const messageText = err instanceof Error ? err.message : "Unknown SMS provider error.";
    return { ok: false, error: messageText, code: "provider_error" };
  }
}
