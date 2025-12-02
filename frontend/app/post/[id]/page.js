"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import CommentSection from "@/components/CommentSection";
import PostSkeleton from "@/components/PostSkeleton";

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:4001" : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001");

        const token = localStorage.getItem("token");
        const headers = {
          "Content-Type": "application/json",
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }

        // Fetch Post
        const postRes = await fetch(`${baseUrl}/api/posts/${id}`, { headers });
        if (postRes.ok) {
          const postData = await postRes.json();
          setPost(postData);
        }

        // Fetch Comments
        const commentsRes = await fetch(`${baseUrl}/api/posts/${id}/comments`, { headers });
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

  const handleCommentAdded = (newComment) => {
    // Re-fetch comments or append locally
    // For simplicity, let's append locally. 
    // Note: If it's a reply, we need to find parent and append.
    // But since we flatten list and rebuild tree, we can just push to list.
    setComments((prev) => [...prev, newComment]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-100">
        <Navbar />
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
      <Navbar />
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
