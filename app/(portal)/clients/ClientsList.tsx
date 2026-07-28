"use client";

import { useState } from "react";
import Link from "next/link";

type Client = {
  id: number;
  name: string;
  email: string;
  status: string;
  company: string | null;
};

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

export default function ClientsList({
  clients,
  isAdmin,
}: {
  clients: Client[];
  isAdmin: boolean;
}) {
  const [query, setQuery] = useState("");
  const [showDemoNotice, setShowDemoNotice] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [aiResults, setAiResults] = useState<number[] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  const filteredClients = clients.filter((client) => {
    const q = query.toLowerCase();
    return (
      client.name.toLowerCase().includes(q) ||
      client.email.toLowerCase().includes(q) ||
      client.status.toLowerCase().includes(q)
    );
  });

  const displayedClients =
    aiResults !== null
      ? clients.filter((client) => aiResults.includes(client.id))
      : filteredClients;

  async function handleAiSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    setAiLoading(true);
    setAiError("");

    try {
      const res = await fetch("/api/smart-filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: aiQuery }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setAiResults(data.matchingIds);
    } catch {
      setAiError("AI search failed. Try again.");
    } finally {
      setAiLoading(false);
    }
  }

  function clearAiSearch() {
    setAiQuery("");
    setAiResults(null);
    setAiError("");
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Clients</h1>

        {isAdmin ? (
          <Link
            href="/clients/new"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add client
          </Link>
        ) : (
          <button
            onClick={() => setShowDemoNotice(true)}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-gray-50"
          >
            Add client
          </button>
        )}
      </div>

      {showDemoNotice && (
        <p className="mt-2 text-sm text-amber-600">
          Demo mode: changes are not available. Log in as admin to add clients.
        </p>
      )}

      <input
        type="text"
        placeholder="Search by name, email or status..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mt-4 w-full max-w-sm rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />

      <form onSubmit={handleAiSearch} className="mt-3 flex max-w-lg gap-2">
        <input
          type="text"
          placeholder='Ask AI, e.g. "clients with pending status"'
          value={aiQuery}
          onChange={(e) => setAiQuery(e.target.value)}
          className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={aiLoading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {aiLoading ? "Thinking..." : "Ask AI"}
        </button>
        {aiResults !== null && (
          <button
            type="button"
            onClick={clearAiSearch}
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Clear
          </button>
        )}
      </form>

      {aiError && <p className="mt-2 text-sm text-red-600">{aiError}</p>}

      {displayedClients.length === 0 ? (
        <div className="mt-10 text-center text-gray-500">
          <p className="text-lg font-medium">No clients found</p>
          <p className="mt-1 text-sm">Try a different name, email or status.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedClients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="rounded-lg border p-4 block hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">{client.company || client.name}</h2>
                <StatusBadge status={client.status} />
              </div>
              {client.company && (
                <p className="mt-1 text-sm text-gray-500">{client.name}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">{client.email}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
