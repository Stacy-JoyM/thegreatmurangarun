import { NextResponse } from "next/server";
import { sendRegistrationSms } from "@/lib/sms/send-sms";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type ConfirmSmsBody = {
  registrationId?: string;
  phone?: string;
  categoryLabel?: string;
};

async function updateSmsStatus(params: {
  registrationId: string;
  status: "sent" | "failed";
  errorMessage: string | null;
}) {
  const supabase = createServerSupabaseClient();
  const updatePayload = {
    sms_status: params.status,
    sms_error: params.errorMessage,
    sms_sent_at: params.status === "sent" ? new Date().toISOString() : null,
  };

  const primary = await supabase
    .from("muranga_run2026")
    .update(updatePayload)
    .eq("id", params.registrationId);
  if (!primary.error) return;
  if (!/relation .* does not exist/i.test(primary.error.message)) {
    throw new Error(primary.error.message);
  }

  const fallback = await supabase
    .from("muranga")
    .update(updatePayload)
    .eq("id", params.registrationId);
  if (fallback.error) {
    throw new Error(fallback.error.message);
  }
}

export async function POST(request: Request) {
  let payload: ConfirmSmsBody;
  try {
    payload = (await request.json()) as ConfirmSmsBody;
  } catch {
    return NextResponse.json({ error: "Invalid request JSON." }, { status: 400 });
  }

  const registrationId = (payload.registrationId ?? "").trim();
  const phone = (payload.phone ?? "").trim();
  const categoryLabel = (payload.categoryLabel ?? "").trim();

  if (!registrationId || !phone || !categoryLabel) {
    return NextResponse.json(
      { error: "registrationId, phone and categoryLabel are required." },
      { status: 400 },
    );
  }

  const message = `Hello, Thank you for registrating for the Great Muranga Commnuity Run hapening on 31st May for (${categoryLabel}). Further communication concerning the venue and time will be communicated soon.`;
  const result = await sendRegistrationSms({ phone, message });

  if (!result.ok) {
    try {
      await updateSmsStatus({
        registrationId,
        status: "failed",
        errorMessage: result.error.slice(0, 500),
      });
    } catch {
      // Non-blocking logging failure.
    }
    return NextResponse.json({ error: result.error, code: result.code }, { status: 502 });
  }

  try {
    await updateSmsStatus({
      registrationId,
      status: "sent",
      errorMessage: null,
    });
  } catch {
    // Non-blocking logging failure.
  }

  return NextResponse.json({ ok: true });
}
