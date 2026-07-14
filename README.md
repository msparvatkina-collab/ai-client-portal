# Client Portal

A responsive client management portal built for service businesses. Includes a dashboard overview, searchable client list with detail pages, and a settings panel — designed as a clean, production-style frontend foundation.

**Live demo:** https://ai-client-portal-sooty.vercel.app/

## Features

- **Dashboard** — quick overview with key stats (clients, active projects, tasks, revenue) and a recent activity feed
- **Clients** — searchable list (by name, email, or status), individual client detail pages, and a custom "not found" state for invalid IDs
- **Profile** — user profile with avatar, contact info, and company details
- **Settings** — toggleable preferences (notifications, dark mode, newsletter)
- Fully responsive layout, including a collapsible sidebar on mobile
- Clean, reusable component structure

## Tech Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/msparvatkina-collab/ai-client-portal.git
cd ai-client-portal
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure app/
├── dashboard/       # Overview page with stats and recent activity
├── clients/         # Client list, search, and dynamic detail pages
├── profile/         # User profile page
└── settings/        # Preferences and toggles
components/
├── layout/          # Navbar, Sidebar, MainLayout
└── ui/               # Reusable UI components (e.g. Card)

## Notes

This project uses mock data throughout (no backend or database) — it's built as a frontend portfolio piece demonstrating component architecture, responsive design, and clean Next.js routing patterns.