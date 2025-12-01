"use client";

export default function RightSidebar() {
  return (
    <aside className="hidden xl:block w-80 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto p-4 space-y-4 scrollbar-hide">
      {/* Popular Communities */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-3 bg-gray-900/50 border-b border-gray-700">
          <h3 className="text-sm font-bold text-gray-200 uppercase">Popular Communities</h3>
        </div>
        <div className="divide-y divide-gray-700">
          <CommunityItem name="r/auv-tech" members="125k" rank={1} />
          <CommunityItem name="r/robotics" members="89k" rank={2} />
          <CommunityItem name="r/ocean-exploration" members="45k" rank={3} />
          <CommunityItem name="r/embedded-systems" members="32k" rank={4} />
          <CommunityItem name="r/marine-bio" members="21k" rank={5} />
        </div>
        <div className="p-3">
          <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-full transition">
            See All
          </button>
        </div>
      </div>

      {/* Premium / Info */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
            P
          </div>
          <h3 className="text-sm font-bold text-gray-200">AUV Premium</h3>
        </div>
        <p className="text-xs text-gray-400 mb-4">
          Support the community and get exclusive features, ad-free browsing, and custom customization.
        </p>
        <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-full transition">
          Try Now
        </button>
      </div>

      {/* Footer Links */}
      <div className="px-2">
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500">
          <a href="#" className="hover:underline">User Agreement</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Content Policy</a>
          <a href="#" className="hover:underline">Moderator Code of Conduct</a>
        </div>
        <p className="mt-4 text-xs text-gray-600">
          © 2025 AUV Forum, Inc. All rights reserved.
        </p>
      </div>
    </aside>
  );
}

function CommunityItem({ name, members, rank }) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-700/50 transition cursor-pointer">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-400 w-4">{rank}</span>
        <div className="w-8 h-8 bg-gray-600 rounded-full flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-gray-200">{name}</p>
          <p className="text-xs text-gray-500">{members} members</p>
        </div>
      </div>
      <button className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold rounded-full transition">
        Join
      </button>
    </div>
  );
}
