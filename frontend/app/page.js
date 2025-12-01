"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import RightSidebar from "@/components/RightSidebar";
import Feed from "@/components/Feed";

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
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar user={user} onSignOut={handleSignOut} />

      <div className="max-w-[1800px] mx-auto flex justify-center">
        <Sidebar />

        <main className="flex-1 w-full md:max-w-3xl xl:max-w-4xl">
          <Feed />
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
