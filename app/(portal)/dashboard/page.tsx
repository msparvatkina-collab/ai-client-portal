import Link from "next/link";
import Card from "@/components/ui/Card";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { count: clientCount } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true });

  const stats = [
    { title: "Clients", value: String(clientCount ?? 0), href: "/clients" },
    { title: "Active Projects", value: "8" },
    { title: "Tasks", value: "15" },
    { title: "Revenue", value: "$12,400" },
  ];

  const activity = [
    { text: "New client added — Acme Corp", time: "2h ago" },
    { text: "Project 'Website Redesign' marked complete", time: "5h ago" },
    { text: "Invoice sent to Blue Sky LLC", time: "1d ago" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Client portal overview</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) =>
          stat.href ? (
            <Link
              key={stat.title}
              href={stat.href}
              className="block hover:shadow-md transition-shadow rounded-lg"
            >
              <Card title={stat.title} value={stat.value} />
            </Link>
          ) : (
            <Card key={stat.title} title={stat.title} value={stat.value} />
          )
        )}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <ul className="mt-3 space-y-2">
          {activity.map((item, index) => (
            <li
              key={index}
              className="border rounded p-3 flex justify-between text-sm"
            >
              <span>{item.text}</span>
              <span className="text-gray-500">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}