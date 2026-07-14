"use client";

import { useState } from "react";
import Link from "next/link";

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
  const [query, setQuery] = useState("");

  const filteredClients = mockClients.filter((client) => {
    const q = query.toLowerCase();
    return (
      client.name.toLowerCase().includes(q) ||
      client.email.toLowerCase().includes(q) ||
      client.status.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Clients</h1>

      <input
        type="text"
        placeholder="Search by name, email or status..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 w-full max-w-sm rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      {filteredClients.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-lg font-medium">No clients found</p>
          <p className="mt-1 text-sm">Try a different name, email or status.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="rounded-lg border p-4 block hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{client.name}</h2>
                <StatusBadge status={client.status} />
              </div>
              <p className="mt-1 text-sm text-gray-500">{client.email}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}