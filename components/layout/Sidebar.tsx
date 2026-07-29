import Link from "next/link";

export default function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-36 border-r bg-black p-4
          transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:min-h-screen md:translate-x-0
        `}
      >
        <nav className="space-y-1 whitespace-nowrap">
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
    </>
  );
}
