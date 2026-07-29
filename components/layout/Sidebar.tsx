import Link from "next/link";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <aside
      className={`
        min-h-screen shrink-0 overflow-hidden border-r bg-black
        transition-all duration-200
        ${isOpen ? "w-28 p-4" : "w-0 p-0"}
        md:w-36 md:p-4
      `}
    >
      <nav className="w-20 space-y-1 whitespace-nowrap md:w-28">
        <Link
          className="-mx-2 block rounded px-2 py-2 text-gray-100 hover:bg-white/10"
          href="/dashboard"
          onClick={onClose}
        >
          Dashboard
        </Link>
        <Link
          className="-mx-2 block rounded px-2 py-2 text-gray-100 hover:bg-white/10"
          href="/clients"
          onClick={onClose}
        >
          Clients
        </Link>
        <Link
          className="-mx-2 block rounded px-2 py-2 text-gray-100 hover:bg-white/10"
          href="/profile"
          onClick={onClose}
        >
          Profile
        </Link>
        <Link
          className="-mx-2 block rounded px-2 py-2 text-gray-100 hover:bg-white/10"
          href="/settings"
          onClick={onClose}
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
}
