"use client";
import { useState } from "react";
import { IconMessageCircle, IconArrowUp, IconArrowDown } from "@tabler/icons-react";

export default function CommentSection({ comments, postId, onCommentAdded }) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const handleSubmit = async (e, parentId = null) => {
    e.preventDefault();
    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to comment");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content, parentId })
      });

      if (res.ok) {
        const comment = await res.json();
        onCommentAdded(comment);
        if (parentId) {
          setReplyingTo(null);
          setReplyContent("");
        } else {
          setNewComment("");
        }
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  // Recursive function to render comments
  const renderComments = (commentsList, depth = 0) => {
    if (!commentsList) return null;

    // Filter for top-level comments if depth is 0, otherwise expect pre-filtered/nested list
    // Since backend returns flat list, we might need to build tree here or backend.
    // Let's assume backend returns flat list and we build tree or backend returns nested.
    // My controller returns flat list with `replies` included? 
    // Wait, my controller `getComments` does `include: { replies: ... }`. 
    // This only goes one level deep by default in Prisma unless we use recursion or raw query.
    // For simplicity, let's assume single-level nesting for now or just render flat list with indentation if we had parentId.
    // Actually, the Reddit style is deeply nested.
    // Let's stick to the controller implementation: it returns all comments for the post.
    // We can build the tree here.

    // Helper to build tree from flat list
    const buildTree = (list) => {
      const map = {};
      const roots = [];
      list.forEach((c, i) => {
        map[c.id] = i;
        list[i].children = [];
      });
      list.forEach((c) => {
        if (c.parentId) {
          if (map[c.parentId] !== undefined) {
            list[map[c.parentId]].children.push(c);
          }
        } else {
          roots.push(c);
        }
      });
      return roots;
    };

    const rootComments = depth === 0 ? buildTree(JSON.parse(JSON.stringify(commentsList))) : commentsList;

    return rootComments.map((comment) => (
      <div key={comment.id} className={`mt-4 ${depth > 0 ? "ml-4 pl-4 border-l border-gray-700" : ""}`}>
        <div className="flex gap-2">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
            {comment.author?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <div className="text-xs text-gray-400 mb-1">
              <span className="font-bold text-gray-300">{comment.author?.username}</span>
              <span className="mx-1">•</span>
              <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="text-sm text-gray-200 mb-2">{comment.content}</div>

            <div className="flex items-center gap-4 text-xs text-gray-400 font-bold">
              <button className="flex items-center gap-1 hover:bg-gray-800 p-1 rounded">
                <IconArrowUp size={16} />
              </button>
              <button className="flex items-center gap-1 hover:bg-gray-800 p-1 rounded">
                <IconArrowDown size={16} />
              </button>
              <button
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className="flex items-center gap-1 hover:bg-gray-800 p-1 rounded"
              >
                <IconMessageCircle size={16} />
                Reply
              </button>
            </div>

            {replyingTo === comment.id && (
              <form onSubmit={(e) => handleSubmit(e, comment.id)} className="mt-2">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
                  placeholder="What are your thoughts?"
                  rows={2}
                />
                <div className="flex justify-end mt-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1 text-xs font-bold text-gray-400 hover:bg-gray-800 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 text-xs font-bold bg-gray-200 text-black rounded hover:bg-white"
                  >
                    Reply
                  </button>
                </div>
              </form>
            )}

            {comment.children && comment.children.length > 0 && (
              <div className="mt-2">
                {renderComments(comment.children, depth + 1)}
              </div>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4">
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-2">Comment as <span className="text-indigo-400">Current User</span></p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:outline-none focus:border-gray-500"
            placeholder="What are your thoughts?"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="px-4 py-1 text-sm font-bold bg-gray-200 text-black rounded-full hover:bg-white disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              Comment
            </button>
          </div>
        </form>
      </div>

      <div className="border-t border-gray-800 pt-4">
        {renderComments(comments)}
      </div>
    </div>
  );
}
