import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

type DbRegistrationRow = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  category: string;
  created_at: string;
};

const CATEGORY_VALUES = new Set(["10km", "8km", "6km", "5km", "2km", "2km-family", "1km", "500m"]);

function mapRow(row: DbRegistrationRow) {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email ?? "",
    category: CATEGORY_VALUES.has(row.category) ? row.category : "10km",
    registeredAt: row.created_at.slice(0, 10),
    attended: false,
  };
}

async function readRowsFrom(tableName: "muranga_run2026" | "muranga") {
  const supabase = createServerSupabaseClient();
  return supabase
    .from(tableName)
    .select("id, full_name, phone, email, category, created_at")
    .order("created_at", { ascending: false });
}

export async function GET() {
  try {
    const primary = await readRowsFrom("muranga_run2026");
    if (!primary.error) {
      return NextResponse.json({
        rows: (primary.data as DbRegistrationRow[] | null)?.map(mapRow) ?? [],
        sourceTable: "muranga_run2026",
      });
    }

    if (!/relation .* does not exist/i.test(primary.error.message)) {
      return NextResponse.json({ error: primary.error.message }, { status: 500 });
    }

    const fallback = await readRowsFrom("muranga");
    if (fallback.error) {
      return NextResponse.json({ error: fallback.error.message }, { status: 500 });
    }

    return NextResponse.json({
      rows: (fallback.data as DbRegistrationRow[] | null)?.map(mapRow) ?? [],
      sourceTable: "muranga",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not read registrations.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
