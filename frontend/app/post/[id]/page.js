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

  useEffect(() => {
    // Session Hydration
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");

    if (token && email && username) {
      setUser({ email, username, token });
    }

    const fetchData = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/api";

        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch Post
        const postRes = await fetch(`${baseUrl}/posts/${id}`, { headers });
        if (postRes.ok) {
          const postData = await postRes.json();
          setPost(postData);
        }

        // Fetch Comments
        const commentsRes = await fetch(`${baseUrl}/posts/${id}/comments`, { headers });
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData);
        }
      } catch (error) {
        console.error("Failed to fetch post data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
        </div>
      </div>
    </div>
  );
}
