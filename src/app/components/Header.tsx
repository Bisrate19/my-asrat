"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-4 px-8 bg-white text-gray-900 shadow-md">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-bold">Tithe Tracker</span>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/login"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded"
        >
          Register
        </Link>
      </div>
    </header>
  );
}
