import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { filterClientIds } from "@/lib/ai/smartFilter";

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, name, email, status, company, notes");

  const matchingIds = await filterClientIds(clients ?? [], query);

  return NextResponse.json({ matchingIds });
}