"use client";

import Link from "next/link";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide">
          🤖 MOMify AI
        </h1>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium">
          <Link
            href="/dashboard"
            className="hover:text-gray-200 transition"
          >
            Dashboard
          </Link>

          <button
            onClick={logout}
            className="bg-white text-indigo-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}
