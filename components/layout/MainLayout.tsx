"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1">
        <Navbar onMenuClick={() => { console.log("клик сработал"); setIsSidebarOpen(true); }} />
        <main className="p-6 max-w-3xl">
          {children}
        </main>
      </div>
    </div>
  );
}