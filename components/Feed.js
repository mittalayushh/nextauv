"use client";
import { useState, useEffect } from "react";
import { IconPhoto, IconLink, IconSearch } from "@tabler/icons-react";
import PostCard from "./PostCard";
import Link from "next/link";
import PostSkeleton from "./PostSkeleton";
import Pagination from "./Pagination";

import { useRouter, useSearchParams } from "next/navigation";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
      let apiUrl = `${baseUrl}/api/posts?page=${page}&limit=5&search=${encodeURIComponent(search)}&sort=${sortBy}`;
      if (selectedCategory) apiUrl += `&category=${encodeURIComponent(selectedCategory)}`;
      if (selectedTag) apiUrl += `&tag=${encodeURIComponent(selectedTag)}`;

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
        const newPosts = Array.isArray(data) ? data : data.posts;
        const pagination = data.pagination || {};

        setPosts(newPosts);
        setTotalPages(pagination.pages || 1);
        setCurrentPage(pagination.page || page);
      } else {
        console.error("Fetch failed with status:", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchPosts(1);
  }, [search, sortBy, selectedCategory, selectedTag]);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categories = ["General", "Q&A", "Showcase", "Discussion"];

  return (
    <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 space-y-6">
      {/* Create Post Input */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
          U
        </div>

        <Link href="/create-post" className="flex-1">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full bg-gray-950 border border-gray-800 hover:bg-black hover:border-gray-700 rounded-xl px-5 py-3 text-sm text-gray-300 focus:outline-none transition-all cursor-pointer shadow-inner"
            readOnly
          />
        </Link>

        <div className="flex gap-2">
          <Link href="/create-post">
            <button className="p-2.5 text-gray-400 hover:bg-gray-800 hover:text-indigo-400 rounded-xl transition-all duration-200">
              <IconPhoto size={22} />
            </button>
          </Link>

          <Link href="/create-post">
            <button className="p-2.5 text-gray-400 hover:bg-gray-800 hover:text-indigo-400 rounded-xl transition-all duration-200">
              <IconLink size={22} />
            </button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center bg-gray-900 p-1 rounded-xl border border-gray-800">
          <button
            onClick={() => setSortBy("hot")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${sortBy === "hot" ? "bg-gray-800 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"}`}
          >
            Hot
          </button>
          <button
            onClick={() => setSortBy("newest")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${sortBy === "newest" ? "bg-gray-800 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"}`}
          >
            New
          </button>
          <button
            onClick={() => setSortBy("top")}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${sortBy === "top" ? "bg-gray-800 text-white shadow-sm" : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"}`}
          >
            Top
          </button>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${selectedCategory === "" ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${selectedCategory === cat ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20" : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200"}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 min-h-[500px]">
        {loading ? (
          // Skeleton Loading
          [...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 animate-pulse">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-32"></div>
                  <div className="h-3 bg-gray-800 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-full"></div>
                <div className="h-4 bg-gray-800 rounded w-5/6"></div>
              </div>
            </div>
          ))
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="text-center py-20 bg-gray-900 border border-gray-800 rounded-2xl">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconSearch size={32} className="text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No posts found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              We couldn't find any posts matching your criteria. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center pt-8 pb-12">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
