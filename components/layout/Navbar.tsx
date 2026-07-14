export default function Navbar({
  onMenuClick,
}: {
  onMenuClick: () => void;
}) {
  return (
    <header className="h-16 border-b flex items-center px-6 gap-4">
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
    </header>
  );
}