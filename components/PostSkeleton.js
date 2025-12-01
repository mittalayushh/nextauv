"use client";
import { IconArrowBigUp, IconArrowBigDown, IconMessageCircle, IconShare, IconBookmark } from "@tabler/icons-react";

export default function PostSkeleton() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition cursor-pointer">
      <div className="flex">
        {/* Vote Column */}
        <div className="w-10 bg-gray-900/30 p-2 flex flex-col items-center gap-1 rounded-l-lg border-r border-gray-800/50">
          <button className="text-gray-500 hover:text-orange-500 hover:bg-gray-700/50 p-1 rounded">
            <IconArrowBigUp size={24} />
          </button>
          <span className="text-xs font-bold text-gray-300">Vote</span>
          <button className="text-gray-500 hover:text-indigo-500 hover:bg-gray-700/50 p-1 rounded">
            <IconArrowBigDown size={24} />
          </button>
        </div>

        {/* Content Column */}
        <div className="p-3 flex-1">
          {/* Header */}
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
            <div className="w-5 h-5 bg-gray-600 rounded-full" />
            <span className="font-bold text-gray-300 hover:underline">r/community</span>
            <span>•</span>
            <span>Posted by u/user</span>
            <span>•</span>
            <span>5 hours ago</span>
          </div>

          {/* Title & Body */}
          <h3 className="text-lg font-medium text-gray-100 mb-2">
            This is a placeholder title for a post on the AUV Forum
          </h3>
          <div className="h-24 bg-gray-700/30 rounded-md mb-3 animate-pulse" />

          {/* Footer Actions */}
          <div className="flex items-center gap-1 text-gray-400">
            <ActionButton icon={<IconMessageCircle size={18} />} label="24 Comments" />
            <ActionButton icon={<IconShare size={18} />} label="Share" />
            <ActionButton icon={<IconBookmark size={18} />} label="Save" />
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
