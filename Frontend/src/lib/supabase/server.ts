import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let serverSupabase: SupabaseClient | null = null;

function readServerSupabaseEnv(): { ok: true; url: string; serviceRoleKey: string } | { ok: false; reason: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? "";
  if (!url) {
    return { ok: false, reason: "NEXT_PUBLIC_SUPABASE_URL is missing." };
  }
  if (!serviceRoleKey) {
    return { ok: false, reason: "SUPABASE_SERVICE_ROLE_KEY is missing." };
  }
  return { ok: true, url, serviceRoleKey };
}

export function createServerSupabaseClient(): SupabaseClient {
  const env = readServerSupabaseEnv();
  if (!env.ok) {
    throw new Error(env.reason);
  }
  if (!serverSupabase) {
    serverSupabase = createClient(env.url, env.serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return serverSupabase;
}
