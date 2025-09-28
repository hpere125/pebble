import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/acme-logo';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <aside
      className="
        flex h-full flex-col gap-3 px-3 py-4 md:px-2
        text-gray-900
      "
      aria-label="Sidebar"
    >
      {/* Brand / Logo */}
      <Link
        href="/"
        className="
          mb-2 flex h-20 items-center justify-start
          rounded-2xl bg-red-600 px-4 shadow-sm ring-1 ring-red-500/40
          transition hover:brightness-105 md:h-24
        "
        aria-label="Go to home"
      >
        <div className="text-white">
          <AcmeLogo />
          <p className="mt-0.5 text-[10px] uppercase tracking-wider text-white/80">
            Task Management
          </p>
        </div>
      </Link>

      {/* Nav links */}
      <div className="flex grow flex-row justify-between gap-2 md:flex-col md:gap-2">
        <nav className="flex w-full flex-col gap-2" aria-label="Primary">
          <NavLinks />
        </nav>

        {/* Spacer panel for balance on desktop */}
        <div className="hidden h-auto w-full grow rounded-2xl bg-gray-50 md:block" />
      </div>

      {/* Footer / Sign out */}
      <div className="mt-auto">
        {/* Auth0 v5 logout lives at /auth/logout */}
        <a
          href="/auth/logout"
          className="
            group flex h-12 w-full items-center justify-center gap-2
            rounded-2xl bg-gray-50 px-3 text-sm font-medium text-gray-700
            ring-1 ring-gray-200/70 transition
            hover:bg-red-50 hover:text-red-700 hover:ring-red-200
            focus:outline-none focus:ring-2 focus:ring-red-500
            md:justify-start
          "
          aria-label="Sign out"
        >
          <PowerIcon className="h-5 w-5 transition group-hover:scale-105" />
          <span className="hidden md:inline">Sign Out</span>
        </a>

        {/* Version / tiny meta */}
        <p className="mt-2 hidden text-[10px] uppercase tracking-wider text-gray-400 md:block">
          v0.1 • Open Source
        </p>
      </div>
    </aside>
  );
}