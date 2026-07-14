"use client";

import { useState } from "react";

function Toggle({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={onChange}
        className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${
          enabled ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`h-5 w-5 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="mt-6 max-w-md rounded-lg border p-6 divide-y">
        <Toggle
          label="Email notifications"
          description="Receive updates about client activity"
          enabled={emailNotifications}
          onChange={() => setEmailNotifications(!emailNotifications)}
        />
        <Toggle
          label="Dark mode"
          description="Switch the interface to a dark theme"
          enabled={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
        <Toggle
          label="Newsletter"
          description="Get monthly product updates by email"
          enabled={newsletter}
          onChange={() => setNewsletter(!newsletter)}
        />
      </div>
    </div>
  );
}