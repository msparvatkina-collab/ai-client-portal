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
        min-h-screen border-r bg-black overflow-hidden
        transition-all duration-200
        ${isOpen ? "w-36 p-4" : "w-0 p-0"}
        md:w-36 md:p-4
      `}
    >
      <nav className="space-y-4 whitespace-nowrap">
        <Link className="block" href="/dashboard" onClick={onClose}>
          Dashboard
        </Link>
        <Link className="block" href="/clients" onClick={onClose}>
          Clients
        </Link>
        <Link className="block" href="/profile" onClick={onClose}>
          Profile
        </Link>
        <Link className="block" href="/settings" onClick={onClose}>
          Settings
        </Link>
      </nav>
    </aside>
  );
}