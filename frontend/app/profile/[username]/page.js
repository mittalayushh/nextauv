"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import ProfileSidebar from "@/components/ProfileSidebar";
import PostSkeleton from "@/components/PostSkeleton";
import clsx from "clsx";
import { IconGhost } from "@tabler/icons-react";

export default function ProfilePage() {
  const { username } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [userData, setUserData] = useState(null);
  const [content, setContent] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // 1. Hydrate Auth User (Session Persistence)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const storedUsername = localStorage.getItem("username");

    if (token && email && storedUsername) {
      setCurrentUser({ email, username: storedUsername, token });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    setCurrentUser(null);
    router.replace("/login");
  };

  // 2. Fetch Data (Parallelized)
  useEffect(() => {
    if (!username) return;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
    const token = localStorage.getItem("token");
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    // Fetch Profile Stats
    const fetchProfile = async () => {
      setLoadingProfile(true);
      try {
        const res = await fetch(`${baseUrl}/api/users/${username}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          setUserData(null); // User not found or other error
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUserData(null);
      } finally {
        setLoadingProfile(false);
      }
    };

    // Fetch Content
    const fetchContent = async () => {
      setLoadingContent(true);
      try {
        let endpoint = "";
        switch (activeTab) {
          case "overview":
          case "posts":
            endpoint = `${baseUrl}/api/users/${username}/posts`;
            break;
          case "comments":
            endpoint = `${baseUrl}/api/users/${username}/comments`;
            break;
          case "saved":
            endpoint = `${baseUrl}/api/users/${username}/saved`;
            break;
          case "upvoted":
            endpoint = `${baseUrl}/api/users/${username}/voted?type=upvoted`;
            break;
          case "downvoted":
            endpoint = `${baseUrl}/api/users/${username}/voted?type=downvoted`;
            break;
          default:
            endpoint = `${baseUrl}/api/users/${username}/posts`;
        }

        const res = await fetch(endpoint, { headers });
        if (res.ok) {
          const data = await res.json();
          setContent(data);
        } else {
          setContent([]); // Clear content on error (e.g. 403 for private tabs)
        }
      } catch (error) {
        console.error("Failed to fetch content:", error);
        setContent([]);
      } finally {
        setLoadingContent(false);
      }
    };

    // Trigger both fetches
    fetchProfile();
    fetchContent();

  }, [username, activeTab]); // Removed userData dependency to avoid waterfall

  const isOwnProfile = currentUser && currentUser.username === username;

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "posts", label: "Posts" },
    { id: "comments", label: "Comments" },
    ...(isOwnProfile ? [
      { id: "saved", label: "Saved" },
      { id: "upvoted", label: "Upvoted" },
      { id: "downvoted", label: "Downvoted" },
    ] : [])
  ];

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar user={currentUser} onSignOut={handleSignOut} />
      <div className="max-w-5xl mx-auto py-8 px-4 flex flex-col md:flex-row gap-6">

        {/* Main Content */}
        <div className="flex-1">
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-gray-700 mb-4 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  "px-4 py-2 font-medium text-sm whitespace-nowrap transition border-b-2",
                  activeTab === tab.id
                    ? "border-gray-100 text-gray-100"
                    : "border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content List */}
          <div className="space-y-4">
            {loadingContent ? (
              <>
                <PostSkeleton />
                <PostSkeleton />
              </>
            ) : content.length > 0 ? (
              content.map((item) => {
                // If it's a comment (has postId but no title at top level, structure depends on API)
                // My API for comments returns comment object with included post.
                // My API for posts returns post object.
                if (item.content && item.post) {
                  // It's a comment
                  return (
                    <div key={item.id} className="bg-gray-800 border border-gray-700 p-4 rounded-lg hover:border-gray-600 transition">
                      <div className="text-xs text-gray-400 mb-2">
                        Commented on <span className="font-bold text-gray-300">{item.post.title}</span> • <span className="text-gray-500">r/General</span>
                      </div>
                      <div className="text-sm text-gray-200">{item.content}</div>
                    </div>
                  )
                } else {
                  // It's a post
                  return <PostCard key={item.id} post={item} />
                }
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-gray-900/30 rounded-lg border border-gray-800/50 border-dashed">
                <IconGhost size={48} className="mb-4 text-gray-600" />
                <p className="text-lg font-medium text-gray-400">No content here yet</p>
                <p className="text-sm">Looks like there's nothing to show in this section.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-80 flex-shrink-0">
          {loadingProfile ? (
            <div className="h-64 bg-gray-800 animate-pulse rounded-lg"></div>
          ) : userData ? (
            <ProfileSidebar user={userData} isOwnProfile={isOwnProfile} />
          ) : (
            <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
              User not found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
