
import { useState, useEffect } from "react";
import { IconMessageCircle, IconArrowUp, IconArrowDown, IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons-react";
import { toast } from "sonner";

export default function CommentSection({ comments, postId, onCommentAdded }) {
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setCurrentUser(username);
    }
  }, []);

  const handleSubmit = async (e, parentId = null) => {
    e.preventDefault();
    const content = parentId ? replyContent : newComment;
    if (!content.trim()) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login to comment");
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}posts/${postId}/comments`, {
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
        toast.success("Comment posted");
      } else {
        toast.error("Failed to post comment");
      }
    } catch (error) {
      console.error("Failed to post comment:", error);
      toast.error("Failed to post comment");
    }
  };

  const handleDelete = async (commentId) => {
    toast("Are you sure you want to delete this comment?", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/comments/${commentId}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (res.ok) {
              toast.success("Comment deleted");
              // Ideally reload or update state. For now, reload page or rely on parent refetch
              window.location.reload();
            } else {
              toast.error("Failed to delete comment");
            }
          } catch (err) {
            console.error("Delete error:", err);
            toast.error("Failed to delete comment");
          }
        },
      },
      cancel: {
        label: "Cancel",
      },
    });
  };

  const handleUpdate = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: editContent }),
      });

      if (res.ok) {
        setEditingComment(null);
        toast.success("Comment updated");
        window.location.reload(); // Simple refresh for now
      } else {
        toast.error("Failed to update comment");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update comment");
    }
  };

  // Recursive function to render comments
  const renderComments = (commentsList, depth = 0) => {
    if (!commentsList) return null;

    // Helper to build tree from flat list
    const buildTree = (list) => {
      const map = {};
      const roots = [];
      // Deep copy to avoid mutating props
      const nodes = list.map(c => ({ ...c, children: [] }));

      nodes.forEach((c, i) => {
        map[c.id] = i;
      });

      nodes.forEach((c) => {
        if (c.parentId) {
          if (map[c.parentId] !== undefined) {
            nodes[map[c.parentId]].children.push(c);
          }
        } else {
          roots.push(c);
        }
      });
      return roots;
    };

    const rootComments = depth === 0 ? buildTree(commentsList) : commentsList;

    return rootComments.map((comment) => (
      <div key={comment.id} className={`mt-4 ${depth > 0 ? "ml-4 pl-4 border-l border-gray-700" : ""}`}>
        <div className="flex gap-2">
          <div className="flex-shrink-0 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold">
            {comment.author?.username?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs text-gray-400">
                <span className="font-bold text-gray-300">{comment.author?.username}</span>
                <span className="mx-1">•</span>
                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
              </div>

              {currentUser && comment.author?.username?.toLowerCase() === currentUser?.toLowerCase() && editingComment !== comment.id && (
                <div className="flex gap-2">
                  <button onClick={() => { setEditingComment(comment.id); setEditContent(comment.content); }} className="text-gray-500 hover:text-gray-300">
                    <IconEdit size={14} />
                  </button>
                  <button onClick={() => handleDelete(comment.id)} className="text-gray-500 hover:text-red-500">
                    <IconTrash size={14} />
                  </button>
                </div>
              )}
            </div>

            {editingComment === comment.id ? (
              <div className="mb-2">
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded p-2 text-sm text-gray-200 focus:outline-none"
                  rows={2}
                />
                <div className="flex gap-2 mt-1">
                  <button onClick={() => handleUpdate(comment.id)} className="text-xs bg-indigo-600 px-2 py-1 rounded text-white">Save</button>
                  <button onClick={() => setEditingComment(null)} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-200 mb-2">{comment.content}</div>
            )}

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
        <p className="text-sm text-gray-400 mb-2">Comment as <span className="text-indigo-400">{currentUser || "Guest"}</span></p>
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
