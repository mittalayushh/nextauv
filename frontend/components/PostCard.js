import { IconArrowUp, IconArrowDown, IconMessageCircle, IconShare, IconBookmark } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";

export default function PostCard({ post }) {
  const [voteCount, setVoteCount] = useState(post.voteCount || 0);
  const [userVote, setUserVote] = useState(post.userVote || 0);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);

  useEffect(() => {
    setVoteCount(post.voteCount || 0);
    setUserVote(post.userVote || 0);
    setIsSaved(post.isSaved || false);
  }, [post]);

  const handleVote = async (e, value) => {
    e.preventDefault();
    e.stopPropagation();

    const previousVote = userVote;
    const previousCount = voteCount;

    let newVote = value;
    let newCount = voteCount;

    if (userVote === value) {
      newVote = 0;
      newCount -= value;
    } else {
      newCount = newCount - userVote + value;
    }

    setUserVote(newVote);
    setVoteCount(newCount);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to vote");
        setUserVote(previousVote);
        setVoteCount(previousCount);
        return;
      }

      const res = await fetch(`http://localhost:4001/api/posts/${post.id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      });

      if (!res.ok) throw new Error("Failed to vote");
    } catch (err) {
      console.error("Vote error:", err);
      setUserVote(previousVote);
      setVoteCount(previousCount);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const previousSaved = isSaved;
    setIsSaved(!isSaved);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to save");
        setIsSaved(previousSaved);
        return;
      }

      const res = await fetch(`http://localhost:4001/api/posts/${post.id}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to save");
    } catch (err) {
      console.error("Save error:", err);
      setIsSaved(previousSaved);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg hover:border-gray-600 transition cursor-pointer flex overflow-hidden">
      {/* Vote Column */}
      <div className="w-10 bg-gray-900/50 flex flex-col items-center p-2 gap-1 border-r border-gray-700/50">
        <button
          onClick={(e) => handleVote(e, 1)}
          className={clsx(
            "p-1 rounded hover:bg-gray-800 transition",
            userVote === 1 ? "text-orange-500" : "text-gray-400 hover:text-orange-500"
          )}
        >
          <IconArrowUp size={20} />
        </button>
        <span className={clsx(
          "text-xs font-bold",
          userVote === 1 ? "text-orange-500" : userVote === -1 ? "text-blue-500" : "text-gray-300"
        )}>
          {voteCount}
        </span>
        <button
          onClick={(e) => handleVote(e, -1)}
          className={clsx(
            "p-1 rounded hover:bg-gray-800 transition",
            userVote === -1 ? "text-blue-500" : "text-gray-400 hover:text-blue-500"
          )}
        >
          <IconArrowDown size={20} />
        </button>
      </div>

      {/* Content Column */}
      <div className="flex-1 p-2 sm:p-3">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-[10px]">
            r/
          </div>
          <span className="font-bold text-gray-300 hover:underline">r/General</span>
          <span>•</span>
          <Link href={`/profile/${post.author?.username}`} className="hover:underline">
            Posted by u/{post.author?.username || "deleted"}
          </Link>
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
          <button
            onClick={handleSave}
            className={clsx(
              "flex items-center gap-2 hover:bg-gray-700 px-2 py-1.5 rounded transition",
              isSaved ? "text-yellow-500" : "text-gray-400"
            )}
          >
            <IconBookmark size={18} fill={isSaved ? "currentColor" : "none"} />
            <span>{isSaved ? "Saved" : "Save"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
