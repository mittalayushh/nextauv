"use client";
import { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import EditorSidebar from "./EditorSidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [tags, setTags] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const router = useRouter();

  // Auto-resize textarea
  const bodyRef = useRef(null);
  const titleRef = useRef(null);

  const adjustHeight = (ref) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = ref.current.scrollHeight + "px";
    }
  };

  useEffect(() => {
    adjustHeight(bodyRef);
  }, [body]);

  useEffect(() => {
    adjustHeight(titleRef);
  }, [title]);

  const handlePublish = async () => {
    setIsPublishing(true);
    setPublishError(null);
    try {
      const token = localStorage.getItem("token");
      console.log("Publishing with token:", token ? "Token exists" : "No token");

      if (!token) {
        setPublishError("You must be logged in to publish.");
        setIsPublishing(false);
        return;
      }

      const envApiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log("DEBUG: I AM THE NEW CODE - TIMESTAMP: " + new Date().toISOString());
      console.log("DEBUG: process.env.NEXT_PUBLIC_API_URL =", envApiUrl);
      console.log("DEBUG: Type of env var =", typeof envApiUrl);

      const baseUrl = envApiUrl || "http://localhost:4001";
      console.log("DEBUG: baseUrl used =", baseUrl);

      const apiUrl = `${baseUrl}/api/posts`;
      console.log("DEBUG: Final apiUrl =", apiUrl);

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content: body,
          tags
        })
      });

      console.log("Response status:", res.status);

      if (res.ok) {
        // Redirect to home or the new post
        router.push("/");
      } else {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await res.json();
          console.error("Publish failed response:", data);
          setPublishError(data.message || `Failed to publish: ${res.status} ${res.statusText}`);
        } else {
          const text = await res.text();
          console.error("Publish failed non-JSON response:", text);
          setPublishError(`Failed to publish: ${res.status} ${res.statusText} (Server returned non-JSON)`);
        }
      }
    } catch (error) {
      console.error("Publish error:", error);
      setPublishError(`An error occurred: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Center Editor */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto px-8 py-12 flex-1">
          {/* Title Input */}
          <div className="mb-8">
            <textarea
              ref={titleRef}
              rows={1}
              className="w-full text-5xl font-bold bg-transparent border-none focus:ring-0 resize-none overflow-hidden placeholder-gray-600 text-white leading-tight p-0"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  bodyRef.current?.focus();
                }
              }}
            />
          </div>

          {/* Body Input */}
          <div className="relative min-h-[500px]">
            <textarea
              ref={bodyRef}
              className="w-full text-lg text-gray-300 bg-transparent border-none focus:ring-0 resize-none overflow-hidden placeholder-gray-700 p-0 leading-relaxed"
              placeholder="Write your thoughts here..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <EditorSidebar
        tags={tags}
        setTags={setTags}
        onPublish={handlePublish}
        isPublishing={isPublishing}
        publishError={publishError}
      />
    </div>
  );
}
