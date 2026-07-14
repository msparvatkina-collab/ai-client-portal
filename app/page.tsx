const mockClients = [
  { id: 1, name: "Acme Corp", email: "contact@acme.com", status: "Active" },
  { id: 2, name: "Globex Inc", email: "info@globex.com", status: "Active" },
  { id: 3, name: "Initech", email: "hello@initech.com", status: "Pending" },
  { id: 4, name: "Umbrella Co", email: "team@umbrella.com", status: "Inactive" },
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

export default function ClientsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Clients</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockClients.map((client) => (
          <div key={client.id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{client.name}</h2>
              <StatusBadge status={client.status} />
            </div>
            <p className="mt-1 text-sm text-gray-500">{client.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}