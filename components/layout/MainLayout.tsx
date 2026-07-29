"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
  email,
  onSignOut,
}: {
  children: React.ReactNode;
  email?: string;
  onSignOut: () => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isSidebarOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsSidebarOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSidebarOpen]);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="relative min-w-0 flex-1">
        {isSidebarOpen && (
          <div
            className="absolute inset-0 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          email={email}
          onSignOut={onSignOut}
          isSidebarOpen={isSidebarOpen}
        />
        <main className="max-w-6xl p-6">{children}</main>
      </div>
    </div>
  );
}
