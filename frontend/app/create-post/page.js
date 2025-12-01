"use client";
import Navbar from "@/components/Navbar";
import CreatePostForm from "@/components/CreatePostForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token) {
      router.push("/login");
    } else {
      setUser({ username });
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-white">
      <CreatePostForm />
    </div>
  );
}
