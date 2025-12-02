"use client";
import Link from "next/link";
import { IconSearch, IconMenu2, IconBell, IconMessage, IconMail } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ user }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800 h-16 px-4 flex items-center justify-between">
      {/* Logo & Mobile Menu */}
      <div className="flex items-center gap-4 w-64">
        <button className="lg:hidden text-gray-400 hover:text-white">
          <IconMenu2 size={24} />
        </button>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold text-white hidden sm:block tracking-tight">AUV Forum</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-3xl px-4 hidden md:block">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <IconSearch size={20} className="text-gray-500 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 border border-gray-800 rounded-2xl leading-5 bg-gray-950 text-gray-200 placeholder-gray-500 focus:outline-none focus:bg-black focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all duration-200"
            placeholder="Type to search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center justify-end gap-2 w-64">
        {user ? (
          <div className="flex items-center gap-1">
            <button className="p-2.5 text-gray-400 hover:bg-gray-800 hover:text-indigo-400 rounded-xl transition-all duration-200 relative group">
              <IconMail size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900 group-hover:scale-110 transition-transform"></span>
            </button>
            <button className="p-2.5 text-gray-400 hover:bg-gray-800 hover:text-indigo-400 rounded-xl transition-all duration-200">
              <IconBell size={22} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login">
              <button className="px-5 py-2 rounded-xl text-gray-300 font-semibold hover:bg-gray-800 transition">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-500/20">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
