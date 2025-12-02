"use client";
import Link from "next/link";
import { IconSearch, IconUser, IconMenu2, IconBell, IconMessage, IconPlus } from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar({ user, onSignOut }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      router.push(`/?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700 h-16 px-4 flex items-center justify-between">
      {/* Logo & Mobile Menu */}
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-gray-400 hover:text-white">
          <IconMenu2 size={24} />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-white hidden sm:block">AUV Forum</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-2xl px-4 hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconSearch size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full leading-5 bg-gray-800 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-900 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out"
            placeholder="Search AUV Forum"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="hidden sm:flex items-center gap-1">
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full transition">
                <IconMessage size={20} />
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full transition">
                <IconBell size={20} />
              </button>
              <Link href="/create-post">
                <button className="p-2 text-gray-400 hover:bg-gray-800 rounded-full transition">
                  <IconPlus size={20} />
                </button>
              </Link>
            </div>

            <div className="relative group">
              <div className="flex items-center gap-2 p-1 pr-2 hover:bg-gray-800 rounded-lg border border-transparent hover:border-gray-700 transition cursor-pointer">
                <div className="w-8 h-8 bg-gray-700 rounded-md flex items-center justify-center text-white font-semibold">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-medium text-white">{user.username}</p>
                  <p className="text-[10px] text-gray-400">1 karma</p>
                </div>
              </div>

              {/* Stays open when hovering dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <div className="px-4 py-2 border-b border-gray-700">
                  <p className="text-sm text-white font-medium">My Stuff</p>
                  <p className="text-xs text-gray-400">Online Status: On</p>
                </div>

                <Link href={`/profile/${user.username}`} className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                  Profile
                </Link>

                <button
                  onClick={onSignOut}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  Log Out
                </button>
              </div>
            </div>

          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/login">
              <button className="px-5 py-2 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 transition border border-gray-700">
                Log In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-5 py-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
