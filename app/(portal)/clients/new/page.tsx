import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createClientRecord } from "../actions";

export default async function NewClientPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAdmin = data?.claims?.app_metadata?.role === "admin";

  if (!isAdmin) {
    redirect("/clients");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Add client</h1>

      <form action={createClientRecord} className="mt-6 max-w-md space-y-4">
        <div>
          <label htmlFor="name" className="text-sm text-gray-500">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="text-sm text-gray-500">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue="Active"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label htmlFor="company" className="text-sm text-gray-500">
            Company
          </label>
          <input
            id="company"
            name="company"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="phone" className="text-sm text-gray-500">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="notes" className="text-sm text-gray-500">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save client
        </button>
      </form>
    </div>
  );
}
