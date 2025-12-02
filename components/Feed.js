"use client";
import { useState, useEffect } from "react";
import { IconPhoto, IconLink } from "@tabler/icons-react";
import PostSkeleton from "./PostSkeleton";
import PostCard from "./PostCard";
import Link from "next/link";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);

  const fetchPosts = async (currentCursor = null, isInitial = false) => {
    try {
      if (isInitial) setLoading(true);
      else setFetchingMore(true);

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
      let apiUrl = `${baseUrl}/api/posts?limit=10`;
      if (currentCursor) {
        apiUrl += `&cursor=${currentCursor}`;
      }

      console.log("Fetching posts from:", apiUrl);
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(apiUrl, { headers });

      if (res.ok) {
        const data = await res.json();
        // Handle both old array format (fallback) and new object format
        const newPosts = Array.isArray(data) ? data : data.posts;
        const nextCursor = Array.isArray(data) ? null : data.nextCursor;

        if (isInitial) {
          setPosts(newPosts);
        } else {
          setPosts(prev => [...prev, ...newPosts]);
        }

        setCursor(nextCursor);
        setHasMore(!!nextCursor);
      } else {
        console.error("Fetch failed with status:", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(null, true);
  }, []);

  const loadMore = () => {
    if (!fetchingMore && hasMore) {
      fetchPosts(cursor);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 px-2 sm:px-4">
      {/* Create Post Input */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-700 rounded-full flex-shrink-0 overflow-hidden">
          <div className="w-full h-full bg-indigo-600 flex items-center justify-center text-white font-bold">U</div>
        </div>

        <Link href="/create-post" className="flex-1">
          <input
            type="text"
            placeholder="Create Post"
            className="w-full bg-gray-900 border border-gray-700 hover:bg-gray-900/80 hover:border-gray-600 rounded-md px-4 py-2 text-sm text-gray-300 focus:outline-none transition cursor-pointer"
            readOnly
          />
        </Link>

        <Link href="/create-post">
          <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-md transition">
            <IconPhoto size={20} />
          </button>
        </Link>

        <Link href="/create-post">
          <button className="p-2 text-gray-400 hover:bg-gray-700 rounded-md transition">
            <IconLink size={20} />
          </button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 flex items-center gap-4 text-sm font-bold text-gray-400 overflow-x-auto">
        <button className="text-indigo-400 bg-gray-700/50 px-3 py-1 rounded-full whitespace-nowrap">Best</button>
        <button className="hover:bg-gray-700 px-3 py-1 rounded-full transition whitespace-nowrap">Hot</button>
        <button className="hover:bg-gray-700 px-3 py-1 rounded-full transition whitespace-nowrap">New</button>
        <button className="hover:bg-gray-700 px-3 py-1 rounded-full transition whitespace-nowrap">Top</button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {loading ? (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        ) : posts.length > 0 ? (
          <>
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
            {hasMore && (
              <div className="flex justify-center pt-4 pb-8">
                <button
                  onClick={loadMore}
                  disabled={fetchingMore}
                  className="px-6 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-full text-sm font-medium transition disabled:opacity-50"
                >
                  {fetchingMore ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-10 text-gray-500">
            <p>No posts yet. Be the first to create one!</p>
            <Link href="/create-post" className="text-indigo-400 hover:underline mt-2 inline-block">
              Create Post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
