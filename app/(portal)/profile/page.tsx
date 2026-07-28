import { createClient } from "@/lib/supabase/server";

function Avatar({ label }: { label: string }) {
  const initials = label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-2xl font-semibold text-blue-700">
      {initials}
    </div>
  );
}

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;

  const isAdmin = user?.app_metadata?.role === "admin";
  const label = isAdmin ? "Admin" : "Demo User";
  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-6 flex max-w-md items-center gap-4 rounded-lg border p-6">
        <Avatar label={label} />
        <div>
          <h2 className="text-xl font-semibold">{label}</h2>
          <p className="text-sm text-gray-500">
            {isAdmin ? "Full access" : "Read-only access"}
          </p>
        </div>
      </div>

      <div className="mt-6 max-w-md rounded-lg border p-6 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user?.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Role</p>
          <p className="font-medium">{isAdmin ? "Admin" : "Demo (read-only)"}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Member since</p>
          <p className="font-medium">{joined}</p>
        </div>
      </div>
    </div>
  );
}
