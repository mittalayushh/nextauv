"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const username = localStorage.getItem("username");
    
    if (token && email && username) {
      // Get user info from localStorage
      setUser({ email, username, token });
    } else if (token) {
      // Fallback: if token exists but email/username don't, clear and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("username");
      router.replace("/login");
    }
    setLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    router.replace("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-black text-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Welcome</h1>
          <div className="space-y-4">
            <Link href="/login">
              <button className="w-48 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="w-48 px-6 py-3 bg-gray-700 hover:bg-gray-600 transition rounded-lg font-semibold">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 to-black text-gray-100">
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        <h1 className="text-3xl font-bold text-indigo-400">Dashboard</h1>
        <button
          onClick={handleSignOut}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 transition rounded-lg font-semibold"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-2xl mx-auto mt-12">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-8 text-white">Profile Information</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Username</label>
              <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                <p className="text-xl text-white font-semibold">{user.username}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">Email</label>
              <div className="bg-gray-900 border border-gray-600 rounded-lg p-4">
                <p className="text-xl text-white font-semibold">{user.email}</p>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-xs text-gray-500">User ID: {user.sub || user.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
