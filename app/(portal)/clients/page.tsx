import { createClient } from "@/lib/supabase/server";
import ClientsList from "./ClientsList";

export default async function ClientsPage() {
  const supabase = await createClient();

  const [{ data: clients }, { data: claims }] = await Promise.all([
    supabase.from("clients").select("id, name, email, status, company").order("name"),
    supabase.auth.getClaims(),
  ]);

  const isAdmin = claims?.claims?.app_metadata?.role === "admin";

  return <ClientsList clients={clients ?? []} isAdmin={isAdmin} />;
}
