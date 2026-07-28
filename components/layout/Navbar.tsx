export default function Navbar({
  onMenuClick,
  email,
  onSignOut,
}: {
  onMenuClick: () => void;
  email?: string;
  onSignOut: () => void;
}) {
  return (
    <header className="h-16 border-b flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl leading-none"
          aria-label="Open menu"
        >
          ☰
        </button>

        <h1 className="text-xl font-semibold">
          Сlient Portal
        </h1>
      </div>

      <form action={onSignOut} className="flex items-center gap-3">
        {email && <span className="text-sm text-gray-500">{email}</span>}
        <button
          type="submit"
          className="rounded-lg border px-3 py-1.5 text-sm hover:bg-gray-50"
        >
          Log out
        </button>
      </form>
    </header>
  );
}