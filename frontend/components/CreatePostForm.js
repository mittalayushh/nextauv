"use client";
import { useState, useRef, useEffect } from "react";
import { IconPlus, IconPhoto, IconVideo, IconCode, IconDots, IconBell } from "@tabler/icons-react";
import TagSelector from "./TagSelector";
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

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001"}/api/posts`;
      console.log("Sending request to:", apiUrl);

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
    <div className="min-h-screen bg-white text-gray-900 font-serif">
      {/* Medium-style Header */}
      <nav className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-50">
        <div className="flex items-center gap-4">
          <Link href="/">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold font-sans text-xl">A</span>
            </div>
          </Link>
          <span className="text-sm text-gray-600 font-sans">Draft in AUV Forum</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPublishModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm font-sans transition disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!title && !body}
          >
            Publish
          </button>
          <button className="text-gray-500 hover:text-gray-900">
            <IconDots size={24} />
          </button>
          <button className="text-gray-500 hover:text-gray-900">
            <IconBell size={24} />
          </button>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-sans text-sm">
            U
          </div>
        </div>
      </nav>

      {/* Editor Container */}
      <div className="max-w-[700px] mx-auto mt-12 px-4 relative">

        {/* Title Input */}
        <div className="relative group mb-4">
          {/* Plus Button (Visual positioning relative to title/body is tricky without block-based editor, putting it on left of body for now) */}
          <textarea
            ref={titleRef}
            rows={1}
            className="w-full text-4xl sm:text-5xl font-serif font-medium placeholder-gray-300 border-none focus:ring-0 resize-none overflow-hidden bg-transparent p-0 leading-tight"
            placeholder="Title"
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
        <div className="relative flex items-start gap-4">
          {/* Floating Plus Button */}
          <div className="relative -ml-12 hidden sm:block pt-1">
            <button
              onClick={() => setShowPlusMenu(!showPlusMenu)}
              className={`w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-gray-800 hover:text-gray-800 transition ${showPlusMenu ? 'transform rotate-45 border-gray-800 text-gray-800' : ''}`}
            >
              <IconPlus size={18} />
            </button>

            {/* Plus Menu */}
            {showPlusMenu && (
              <div className="absolute left-10 top-0 flex items-center gap-2 bg-white pl-2">
                <button className="p-2 rounded-full border border-green-600 text-green-600 hover:bg-green-50"><IconPhoto size={18} /></button>
                <button className="p-2 rounded-full border border-green-600 text-green-600 hover:bg-green-50"><IconVideo size={18} /></button>
                <button className="p-2 rounded-full border border-green-600 text-green-600 hover:bg-green-50"><IconCode size={18} /></button>
              </div>
            )}
          </div>

          <textarea
            ref={bodyRef}
            className="w-full text-xl font-serif text-gray-800 placeholder-gray-300 border-none focus:ring-0 resize-none overflow-hidden bg-transparent p-0 min-h-[300px] leading-relaxed"
            placeholder="Tell your story..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>

      {/* Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 bg-white/95 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="max-w-2xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-sans font-bold text-gray-900">Story Preview</p>
              <div className="bg-gray-100 aspect-video w-full flex items-center justify-center text-gray-400">
                <IconPhoto size={48} />
                <span className="ml-2">Include a high-quality image in your story to make it more inviting to readers.</span>
              </div>
              <div className="border-b border-gray-200 pb-2">
                <h3 className="font-serif font-bold text-xl truncate">{title || "Untitled Story"}</h3>
                <p className="font-serif text-gray-500 text-sm mt-1 line-clamp-2">{body || "No content..."}</p>
              </div>
              <p className="text-sm text-gray-500 font-sans">
                Note: Changes here will affect how your story appears in public places like Medium’s homepage and in subscribers’ inboxes — not the contents of the story itself.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <p className="font-sans text-gray-900">Publishing to: <span className="font-bold">Ayush Mittal</span></p>
                <p className="font-sans text-sm text-gray-500">Add or change topics (up to 5) so readers know what your story is about</p>
                <TagSelector selectedTags={tags} setSelectedTags={setTags} compact={true} />
              </div>

              <div className="flex items-center justify-between pt-8">
                <button
                  onClick={() => setShowPublishModal(false)}
                  className="text-gray-500 hover:text-gray-900 font-sans"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePublish}
                  disabled={isPublishing}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full font-sans text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isPublishing ? "Publishing..." : "Publish now"}
                </button>
              </div>
              {publishError && (
                <p className="text-red-500 text-sm font-sans mt-2">{publishError}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
