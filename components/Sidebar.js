"use client";
import { IconHome, IconArticle, IconBookmark, IconPlus, IconLogout, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar({ user, onSignOut }) {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  return (
    <>
      <aside className="hidden lg:flex flex-col w-64 sticky top-16 h-[calc(100vh-4rem)] border-r border-gray-800 bg-black">
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
          <div className="space-y-6">
            <div className="space-y-1">
              <SidebarItem href="/" icon={<IconHome size={22} />} label="Home" active />
              <SidebarItem href="/?sort=newest" icon={<IconArticle size={22} />} label="Posts" />
              <SidebarItem
                href={user ? `/profile/${user.username}?tab=saved` : "/login"}
                icon={<IconBookmark size={22} />}
                label="Saved"
              />
              <SidebarItem href="/create-post" icon={<IconPlus size={22} />} label="Create" />
            </div>
          </div>
        </div>

        {/* Bottom Profile Section */}
        {user && (
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-900 transition group">
              <Link href={`/profile/${user.username}`} className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {user.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-200 truncate">{user.username}</p>
                  <p className="text-xs text-gray-500 truncate">View Profile</p>
                </div>
              </Link>
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-gray-800 rounded-lg transition"
                title="Log Out"
              >
                <IconLogout size={20} />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Log Out?</h3>
            <p className="text-gray-400 mb-6">Are you sure you want to log out of your account?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSignOut();
                  setShowLogoutConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SidebarItem({ href, icon, label, active = false }) {
  return (
    <Link href={href}>
      <button
        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${active
          ? "bg-indigo-600/10 text-indigo-400"
          : "text-gray-400 hover:bg-gray-900 hover:text-gray-100"
          }`}
      >
        <span className={`transition-colors ${active ? "text-indigo-400" : "group-hover:text-indigo-400"}`}>
          {icon}
        </span>
        <span className="text-base font-semibold">{label}</span>
      </button>
    </Link>
  );
}
