export default function Navbar({
  onMenuClick,
  email,
  onSignOut,
  isSidebarOpen,
}: {
  onMenuClick: () => void;
  email?: string;
  onSignOut: () => void;
  isSidebarOpen: boolean;
}) {
  return (
    <header className="flex h-16 min-w-0 items-center justify-between gap-4 border-b px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <button
          onClick={onMenuClick}
          className="shrink-0 text-2xl leading-none md:hidden"
          aria-label="Open menu"
        >
          ☰
        </button>

        <span className="shrink-0 whitespace-nowrap text-xl font-semibold">
          Client Portal
        </span>
      </div>

      <form action={onSignOut} className="flex min-w-0 items-center gap-3">
        {email && (
          <span
            className={`truncate text-sm text-gray-500 ${
              isSidebarOpen ? "hidden md:inline" : ""
            }`}
          >
            {email}
          </span>
        )}
        <button
          type="submit"
          className="shrink-0 whitespace-nowrap rounded-lg border px-3 py-1.5 text-sm hover:bg-white/10"
        >
          Log out
        </button>
      </form>
    </header>
  );
}
