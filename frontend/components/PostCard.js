import { IconArrowUp, IconArrowDown, IconMessageCircle, IconShare, IconBookmark } from "@tabler/icons-react";
import Link from "next/link";

export default function PostCard({ post }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition cursor-pointer flex overflow-hidden">
      {/* Vote Column */}
      <div className="w-10 bg-gray-900/50 flex flex-col items-center p-2 gap-1 border-r border-gray-700/50">
        <button className="text-gray-400 hover:text-orange-500 hover:bg-gray-800 p-1 rounded">
          <IconArrowUp size={20} />
        </button>
        <span className="text-xs font-bold text-gray-300">0</span>
        <button className="text-gray-400 hover:text-blue-500 hover:bg-gray-800 p-1 rounded">
          <IconArrowDown size={20} />
        </button>
      </div>

      {/* Content Column */}
      <div className="flex-1 p-2 sm:p-3">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          {/* Subreddit Icon (Placeholder) */}
          <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-[10px]">
            r/
          </div>
          <span className="font-bold text-gray-300 hover:underline">r/General</span>
          <span>•</span>
          <span className="hover:underline">Posted by u/{post.author?.username || "deleted"}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title & Body */}
        <Link href={`/post/${post.id}`}>
          <h3 className="text-lg font-medium text-gray-100 mb-2 leading-snug">{post.title}</h3>
          {post.content && (
            <div className="text-sm text-gray-300 mb-3 line-clamp-3 font-serif">
              {post.content}
            </div>
          )}
        </Link>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <span key={index} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full text-xs border border-gray-600">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center gap-1 text-gray-400 text-xs font-bold">
          <button className="flex items-center gap-2 hover:bg-gray-700 px-2 py-1.5 rounded transition">
            <IconMessageCircle size={18} />
            <span>Comments</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 px-2 py-1.5 rounded transition">
            <IconShare size={18} />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-2 hover:bg-gray-700 px-2 py-1.5 rounded transition">
            <IconBookmark size={18} />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
