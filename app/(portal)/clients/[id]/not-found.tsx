import Link from "next/link";

export default function ClientNotFound() {
  return (
    <div className="mt-10 text-center">
      <p className="text-lg font-medium">Client not found</p>
      <p className="mt-1 text-sm text-gray-500">
        This client doesn&apos;t exist or may have been removed.
      </p>
      <Link
        href="/clients"
        className="mt-4 inline-block text-sm text-blue-600 hover:underline"
      >
        ← Back to Clients
      </Link>
    </div>
  );
}