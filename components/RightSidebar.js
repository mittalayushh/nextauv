"use client";
import { IconHash } from "@tabler/icons-react";
import Link from "next/link";

export default function RightSidebar() {
  // Hardcoded topics based on TagSelector or common AUV themes
  const popularTopics = [
    { name: "auv", count: 125 },
    { name: "robotics", count: 89 },
    { name: "underwater", count: 45 },
    { name: "engineering", count: 32 },
  ];

  const otherTopics = [
    { name: "embedded", count: 21 },
    { name: "coding", count: 18 },
    { name: "hardware", count: 15 },
    { name: "research", count: 12 },
    { name: "simulation", count: 10 },
  ];

  return (
    <aside className="hidden xl:block w-80 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-6 scrollbar-hide border-l border-gray-800 bg-black">

      {/* Popular Topics */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Popular Topics</h3>
        <div className="space-y-1">
          {popularTopics.map((topic, index) => (
            <TopicItem key={topic.name} topic={topic} rank={index + 1} />
          ))}
        </div>
      </div>

      {/* Other Topics */}
      <div>
        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 px-2">Others</h3>
        <div className="flex flex-wrap gap-2 px-2">
          {otherTopics.map((topic) => (
            <Link key={topic.name} href={`/?tag=${topic.name}`}>
              <span className="inline-block px-3 py-1 bg-gray-900 hover:bg-gray-800 text-gray-300 text-xs font-medium rounded-lg border border-gray-800 transition cursor-pointer">
                #{topic.name}
              </span>
            </Link>
          ))}
          <button className="px-3 py-1 bg-indigo-600/10 hover:bg-indigo-600/20 text-indigo-400 text-xs font-medium rounded-lg border border-indigo-600/20 transition">
            More topics
          </button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="px-2 pt-4 border-t border-gray-800">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
          <a href="#" className="hover:text-gray-300 transition">User Agreement</a>
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Content Policy</a>
          <a href="#" className="hover:text-gray-300 transition">Moderator Code of Conduct</a>
        </div>
        <p className="mt-4 text-xs text-gray-600">
          © 2025 AUV Forum, Inc. All rights reserved.
        </p>
      </div>
    </aside>
  );
}

function TopicItem({ topic, rank }) {
  return (
    <Link href={`/?tag=${topic.name}`}>
      <div className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-900 transition group cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 group-hover:bg-indigo-600 group-hover:text-white transition">
            <IconHash size={16} />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-200 group-hover:text-indigo-400 transition capitalize">{topic.name}</p>
            <p className="text-xs text-gray-500">{topic.count} posts</p>
          </div>
        </div>
        {rank <= 3 && (
          <span className="text-xs font-bold text-gray-600 bg-gray-900 px-2 py-1 rounded-md">
            #{rank}
          </span>
        )}
      </div>
    </Link>
  );
}
