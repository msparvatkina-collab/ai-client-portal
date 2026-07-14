import Link from "next/link";
import { notFound } from "next/navigation";

const mockClients = [
  { id: 1, name: "Acme Corp", email: "contact@acme.com", status: "Active", phone: "+1 555-0101", company: "Acme Corporation", notes: "Long-term client, monthly retainer." },
  { id: 2, name: "Globex Inc", email: "info@globex.com", status: "Active", phone: "+1 555-0102", company: "Globex Inc.", notes: "Onboarded in 2025." },
  { id: 3, name: "Initech", email: "hello@initech.com", status: "Pending", phone: "+1 555-0103", company: "Initech LLC", notes: "Contract under review." },
  { id: 4, name: "Umbrella Co", email: "team@umbrella.com", status: "Inactive", phone: "+1 555-0104", company: "Umbrella Corporation", notes: "Paused since Q1." },
];

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
  const client = mockClients.find((c) => c.id === Number(id));

  if (!client) {
    notFound();
  }

  return (
    <div>
      <Link href="/clients" className="text-sm text-gray-500 hover:underline">
        ← Back to Clients
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">{client.name}</h1>
        <StatusBadge status={client.status} />
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