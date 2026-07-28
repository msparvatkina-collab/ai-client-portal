"use client";

import { useState } from "react";
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

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          email={email}
          onSignOut={onSignOut}
        />
        <main className="p-6 max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}