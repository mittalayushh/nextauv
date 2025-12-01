"use client";
import { IconHome, IconTrendingUp, IconCompass, IconUsers, IconStar, IconInfoCircle } from "@tabler/icons-react";

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 border-r border-gray-800 scrollbar-hide">
      <div className="space-y-6">
        {/* Feeds */}
        <div>
          <div className="space-y-1">
            <SidebarItem icon={<IconHome size={20} />} label="Home" active />
            <SidebarItem icon={<IconTrendingUp size={20} />} label="Popular" />
            <SidebarItem icon={<IconCompass size={20} />} label="All" />
          </div>
        </div>

        <hr className="border-gray-800" />

        {/* Recent */}
        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Recent
          </h3>
          <div className="space-y-1">
            <SidebarItem icon={<IconUsers size={20} />} label="r/auv-tech" />
            <SidebarItem icon={<IconUsers size={20} />} label="r/underwater" />
            <SidebarItem icon={<IconUsers size={20} />} label="r/robotics" />
          </div>
        </div>

        <hr className="border-gray-800" />

        {/* Communities */}
        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Communities
          </h3>
          <div className="space-y-1">
            <SidebarItem icon={<IconUsers size={20} />} label="r/engineering" />
            <SidebarItem icon={<IconUsers size={20} />} label="r/coding" />
            <SidebarItem icon={<IconUsers size={20} />} label="r/hardware" />
            <SidebarItem icon={<IconPlusCircle size={20} />} label="Create Community" />
          </div>
        </div>

        <hr className="border-gray-800" />

        {/* Resources */}
        <div>
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Resources
          </h3>
          <div className="space-y-1">
            <SidebarItem icon={<IconInfoCircle size={20} />} label="About AUV" />
            <SidebarItem icon={<IconStar size={20} />} label="Premium" />
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ icon, label, active = false }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${active
          ? "bg-gray-800 text-gray-100"
          : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
        }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function IconPlusCircle({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  );
}
