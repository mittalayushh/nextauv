"use client";
import { IconArrowBigUp, IconArrowBigDown, IconMessageCircle, IconShare, IconBookmark } from "@tabler/icons-react";

export default function PostSkeleton() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition cursor-pointer animate-pulse">
      <div className="flex">
        {/* Vote Column */}
        <div className="w-10 bg-gray-900/30 p-2 flex flex-col items-center gap-1 rounded-l-lg border-r border-gray-800/50">
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
          <div className="w-4 h-4 bg-gray-700 rounded mt-1 mb-1"></div>
          <div className="w-6 h-6 bg-gray-700 rounded"></div>
        </div>

        {/* Content Column */}
        <div className="p-3 flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <div className="w-5 h-5 bg-gray-700 rounded-full" />
            <div className="w-20 h-3 bg-gray-700 rounded"></div>
            <div className="w-24 h-3 bg-gray-700 rounded"></div>
          </div>

          {/* Title & Body */}
          <div className="w-3/4 h-6 bg-gray-700 rounded mb-2"></div>
          <div className="w-full h-24 bg-gray-700/30 rounded-md mb-3" />

          {/* Footer Actions */}
          <div className="flex items-center gap-2">
            <div className="w-20 h-8 bg-gray-700 rounded"></div>
            <div className="w-16 h-8 bg-gray-700 rounded"></div>
            <div className="w-16 h-8 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label }) {
  return (
    <button className="flex items-center gap-2 px-2 py-2 hover:bg-gray-700 rounded-md transition">
      {icon}
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}
