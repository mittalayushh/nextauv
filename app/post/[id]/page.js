"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CommentSection from "@/components/CommentSection";
import PostSkeleton from "@/components/PostSkeleton";

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  useEffect(() => {
    // Session Hydration
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");

    if (token && email && username) {
      setUser({ email, username, token });
    }

    const fetchPost = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
        const headers = { "Content-Type": "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const postRes = await fetch(`${baseUrl}/api/posts/${id}`, { headers });
        if (postRes.ok) {
          const postData = await postRes.json();
          setPost(postData);
        }
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    };

    if (id) {
      fetchPost();
      fetchComments(null, true);
    }
  }, [id]);

  const fetchComments = async (currentCursor = null, isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setFetchingMore(true);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      let apiUrl = `${baseUrl}/api/posts/${id}/comments?limit=10`;
      if (currentCursor) {
        apiUrl += `&cursor=${currentCursor}`;
      }

      const commentsRes = await fetch(apiUrl, { headers });
      if (commentsRes.ok) {
        const data = await commentsRes.json();
        const newComments = Array.isArray(data) ? data : data.comments;
        const nextCursor = Array.isArray(data) ? null : data.nextCursor;

        if (isInitial) {
          setComments(newComments);
          setLoading(false); // Only set loading false after initial comments fetch
        } else {
          setComments(prev => [...prev, ...newComments]);
        }

        setCursor(nextCursor);
        setHasMore(!!nextCursor);
      }
    } catch (error) {
      console.error("Failed to fetch comments:", error);
      if (isInitial) setLoading(false);
    } finally {
      setFetchingMore(false);
    }
  };

  const loadMoreComments = () => {
    if (!fetchingMore && hasMore) {
      fetchComments(cursor);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setUser(null);
    router.replace("/login");
  };

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar user={user} onSignOut={handleSignOut} />
        <div className="max-w-3xl mx-auto py-8 px-4">
          <PostSkeleton />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-gray-100 flex items-center justify-center">
        <p>Post not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar user={user} onSignOut={handleSignOut} />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <PostCard post={post} />
        <div className="mt-6">
          <CommentSection
            comments={comments}
            postId={id}
            onCommentAdded={handleCommentAdded}
          />
          {hasMore && (
            <div className="flex justify-center mt-4">
              <button
                onClick={loadMoreComments}
                disabled={fetchingMore}
                className="px-4 py-1 bg-gray-800 hover:bg-gray-700 text-gray-400 rounded-full text-xs font-medium transition disabled:opacity-50"
              >
                {fetchingMore ? "Loading..." : "Load More Comments"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
