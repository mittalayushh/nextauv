"use client";
import { IconPhoto, IconLink } from "@tabler/icons-react";
import PostSkeleton from "./PostSkeleton";

export default function Feed() {
  return (
    <div className="max-w-3xl mx-auto py-4 px-2 sm:px-4">
      {/* Create Post Input */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-700 rounded-full flex-shrink-0" />
        <input
          type="text"
          placeholder="Create Post"
          className="flex-1 bg-gray-900 border border-gray-700 hover:bg-gray-900/80 hover:border-gray-600 rounded-md px-4 py-2 text-sm text-gray-300 focus:outline-none transition"
        />
        <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-md transition">
          <IconPhoto size={20} />
        </button>
        <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-md transition">
          <IconLink size={20} />
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 flex items-center gap-4 text-sm font-bold text-gray-400">
        <button className="text-indigo-400 bg-gray-700/50 px-3 py-1 rounded-full">Best</button>
        <button className="hover:bg-gray-700 px-3 py-1 rounded-full transition">Hot</button>
        <button className="hover:bg-gray-700 px-3 py-1 rounded-full transition">New</button>
        <button className="hover:bg-gray-700 px-3 py-1 rounded-full transition">Top</button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
}
