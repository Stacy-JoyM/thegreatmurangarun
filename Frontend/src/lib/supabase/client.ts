import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Single browser client avoids duplicate GoTrue instances on repeated submits / navigation. */
let browserSupabase: SupabaseClient | null = null;

function readSupabaseEnv(): { ok: true; url: string; key: string } | { ok: false; reason: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? "";

  if (!url) {
    return { ok: false, reason: "NEXT_PUBLIC_SUPABASE_URL is missing or empty in Frontend/.env.local" };
  }
  if (!key) {
    return {
      ok: false,
      reason:
        "NEXT_PUBLIC_SUPABASE_ANON_KEY is empty — open Supabase → Project Settings → API, copy the anon (public) key, paste it into Frontend/.env.local, then restart npm run dev.",
    };
  }
  if (url.includes("YOUR_PROJECT_REF") || key === "your_anon_key_here") {
    return {
      ok: false,
      reason:
        "Replace placeholder values in Frontend/.env.local with your real Project URL and anon key (Supabase → Settings → API), then restart npm run dev.",
    };
  }
  if (key.length < 20) {
    return {
      ok: false,
      reason:
        "NEXT_PUBLIC_SUPABASE_ANON_KEY looks too short — use the full anon (public) JWT from Supabase → Settings → API.",
    };
  }
  return { ok: true, url, key };
}

export function isSupabaseBrowserConfigured(): boolean {
  return readSupabaseEnv().ok;
}

export function createBrowserSupabaseClient(): SupabaseClient {
  const env = readSupabaseEnv();
  if (!env.ok) {
    throw new Error(env.reason);
  }
  if (!browserSupabase) {
    browserSupabase = createClient(env.url, env.key);
  }
  return browserSupabase;
}
