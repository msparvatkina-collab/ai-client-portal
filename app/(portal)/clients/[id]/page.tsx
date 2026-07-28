import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditClientButton from "../EditClientButton";

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Inactive: "bg-gray-100 text-gray-700",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
      {status}
    </span>
  );
}

export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: client }, { data: claims }] = await Promise.all([
    supabase.from("clients").select("*").eq("id", id).single(),
    supabase.auth.getClaims(),
  ]);

  if (!client) {
    notFound();
  }

  const isAdmin = claims?.claims?.app_metadata?.role === "admin";

  return (
    <div>
      <Link href="/clients" className="text-sm text-gray-500 hover:underline">
        ← Back to Clients
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <StatusBadge status={client.status} />
      </div>

      <div className="mt-2">
        <EditClientButton clientId={client.id} isAdmin={isAdmin} />
      </div>

      <div className="mt-6 rounded-lg border p-6 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Company</p>
          <p className="font-medium">{client.company}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{client.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="font-medium">{client.phone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Notes</p>
          <p className="font-medium">{client.notes}</p>
        </div>
      </div>
    </div>
  );
}
