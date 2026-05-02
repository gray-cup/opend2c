import React from "react";
import Link from "next/link";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top bar */}
      <div className="border-b border-neutral-200 bg-white px-6 py-3 flex items-center justify-between">
        <span className="font-semibold text-neutral-900 text-sm">
          Open D2C
        </span>

        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="text-xs text-neutral-500 underline hover:text-neutral-800"
          >
            Sign out
          </a>
          {/* Person icon */}
          <div className="h-8 w-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
            <svg
              className="h-4 w-4 text-neutral-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 flex gap-8">
        {/* Sidebar nav */}
        <nav className="w-40 shrink-0">
          <ul className="space-y-1 text-sm">
            <li>
              <Link
                href="/account/profile"
                className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                href="/account/settings"
                className="block rounded-lg px-3 py-2 text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        {/* Page content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
