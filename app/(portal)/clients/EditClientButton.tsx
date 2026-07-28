"use client";

import { useState } from "react";
import Link from "next/link";

export default function EditClientButton({
  clientId,
  isAdmin,
}: {
  clientId: number;
  isAdmin: boolean;
}) {
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  if (isAdmin) {
    return (
      <Link
        href={`/clients/${clientId}/edit`}
        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        Edit
      </Link>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowDemoNotice(true)}
        className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
      >
        Edit
      </button>
      {showDemoNotice && (
        <p className="mt-2 text-sm text-amber-600">
          Demo mode: changes are not available. Log in as admin to edit clients.
        </p>
      )}
    </>
  );
}
