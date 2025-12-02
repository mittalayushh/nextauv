import { IconArrowUp, IconArrowDown, IconMessageCircle, IconShare, IconBookmark, IconEdit, IconTrash, IconX, IconCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { toast } from "sonner";

export default function PostCard({ post, onDelete }) {
  const [voteCount, setVoteCount] = useState(post.voteCount || 0);
  const [userVote, setUserVote] = useState(post.userVote || 0);
  const [isSaved, setIsSaved] = useState(post.isSaved || false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content || "");
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    setVoteCount(post.voteCount || 0);
    setUserVote(post.userVote || 0);
    setIsSaved(post.isSaved || false);

    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser(username);
    }
    console.log("PostCard Debug:", {
      postId: post.id,
      postAuthor: post.author?.username,
      currentUser: username,
      match: post.author?.username === username
    });
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
        toast.error("Please login to vote");
        setUserVote(previousVote);
        setVoteCount(previousCount);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/posts/${post.id}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ value }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to vote");
      }
    } catch (err) {
      console.error("Vote error:", err);
      toast.error(err.message || "Failed to vote");
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
        toast.error("Please login to save");
        setIsSaved(previousSaved);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/posts/${post.id}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to save");
      toast.success(isSaved ? "Post unsaved" : "Post saved");
    } catch (err) {
      console.error("Save error:", err);
      toast.error("Failed to save post");
      setIsSaved(previousSaved);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    toast("Are you sure you want to delete this post?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/posts/${post.id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              setIsDeleted(true);
              toast.success("Post deleted successfully");
              if (onDelete) onDelete(post.id);
            } else {
              toast.error("Failed to delete post");
            }
          } catch (err) {
            console.error("Delete error:", err);
            toast.error("Failed to delete post");
          }
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle, content: editContent, tags: post.tags }),
      });

      if (res.ok) {
        setIsEditing(false);
        // Ideally update parent state, but local update works for now
        post.title = editTitle;
        post.content = editContent;
        toast.success("Post updated successfully");
      } else {
        toast.error("Failed to update post");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update post");
    }
  };

  if (isDeleted) return null;

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
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
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

          {/* Edit/Delete Actions */}
          {currentUser && post.author?.username?.toLowerCase() === currentUser?.toLowerCase() && !isEditing && (
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsEditing(true); }}
                className="text-gray-400 hover:text-gray-200 p-1 rounded hover:bg-gray-700"
              >
                <IconEdit size={16} />
              </button>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-red-500 p-1 rounded hover:bg-gray-700"
              >
                <IconTrash size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Title & Body */}
        {isEditing ? (
          <div className="mb-3" onClick={(e) => e.stopPropagation()}>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100 mb-2 focus:outline-none focus:border-indigo-500"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-gray-100 h-32 focus:outline-none focus:border-indigo-500"
            />
            <div className="flex gap-2 mt-2">
              <button onClick={handleUpdate} className="flex items-center gap-1 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
                <IconCheck size={16} /> Save
              </button>
              <button onClick={() => setIsEditing(false)} className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 text-sm">
                <IconX size={16} /> Cancel
              </button>
            </div>
          </div>
        ) : (
          <Link href={`/post/${post.id}`}>
            <h3 className="text-lg font-medium text-gray-100 mb-2 leading-snug">{post.title}</h3>
            {post.content && (
              <div className="text-sm text-gray-300 mb-3 line-clamp-3 font-serif">
                {post.content}
              </div>
            )}
          </Link>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <Link key={index} href={`/?tag=${encodeURIComponent(tag)}`}>
                <span className="bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-0.5 rounded-full text-xs border border-gray-600 transition cursor-pointer">
                  {tag}
                </span>
              </Link>
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
