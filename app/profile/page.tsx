const user = {
  name: "Ana Petrova",
  email: "ana@aicareerproject.com",
  role: "Founder & Developer",
  company: "AI Career Project",
  joined: "January 2026",
};

function Avatar({ name }: { name: string }) {
  const initials = name
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

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="mt-6 flex max-w-md items-center gap-4 rounded-lg border p-6">
        <Avatar name={user.name} />
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>
      </div>

      <div className="mt-6 max-w-md rounded-lg border p-6 space-y-3">
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Company</p>
          <p className="font-medium">{user.company}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Member since</p>
          <p className="font-medium">{user.joined}</p>
        </div>
      </div>
    </div>
  );
}