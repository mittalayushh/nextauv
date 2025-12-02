import { IconCake, IconSettings, IconPlus } from "@tabler/icons-react";
import Link from "next/link";

export default function ProfileSidebar({ user, isOwnProfile }) {
  if (!user) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
      {/* Banner (Placeholder) */}
      <div className="h-24 bg-indigo-600"></div>

      <div className="px-4 pb-4">
        {/* Avatar & Edit */}
        <div className="relative -mt-8 mb-3 flex justify-between items-end">
          <div className="w-20 h-20 bg-gray-700 rounded-full border-4 border-gray-800 overflow-hidden">
            {/* Placeholder Avatar */}
            <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white text-2xl font-bold">
              {user.username[0].toUpperCase()}
            </div>
          </div>
          {isOwnProfile && (
            <Link href="/settings">
              <button className="p-1 text-gray-400 hover:bg-gray-700 rounded-full transition">
                <IconSettings size={20} />
              </button>
            </Link>
          )}
        </div>

        {/* User Info */}
        <h2 className="text-xl font-bold text-gray-100">{user.username}</h2>
        <p className="text-sm text-gray-400 mb-4">u/{user.username}</p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-sm font-bold text-gray-100">{user.karma}</div>
            <div className="text-xs text-gray-500">Karma</div>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-100">
              {new Date(user.createdAt).toLocaleDateString()}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <IconCake size={12} /> Cake day
            </div>
          </div>
        </div>

        {/* Actions */}
        {isOwnProfile && (
          <Link href="/create-post">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full transition flex items-center justify-center gap-2">
              <IconPlus size={18} />
              New Post
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
