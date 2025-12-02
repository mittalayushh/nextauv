"use client";
import { useState, useEffect, useRef } from "react";
import { IconX, IconSearch } from "@tabler/icons-react";

// Fallback tags if API fails or is empty initially
const FALLBACK_TAGS = [
  "SLAM", "ROS", "Python", "Computer Vision", "Control Systems",
  "Sensors", "Hardware", "Autonomy", "Machine Learning", "Robotics"
];

export default function TagSelector({ selectedTags, setSelectedTags, compact = false }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  // Fetch topics from backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const envApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001";
        const res = await fetch(`${envApiUrl}/api/topics?search=${encodeURIComponent(query)}&limit=10`);
        if (res.ok) {
          const data = await res.json();
          setSuggestedTopics(data.map(t => t.name));
        } else {
          // Fallback to local filtering if API fails
          setSuggestedTopics(FALLBACK_TAGS.filter(t => t.toLowerCase().includes(query.toLowerCase())));
        }
      } catch (error) {
        console.error("Failed to fetch topics:", error);
        setSuggestedTopics(FALLBACK_TAGS.filter(t => t.toLowerCase().includes(query.toLowerCase())));
      }
    };

    // Debounce fetch
    const timeoutId = setTimeout(() => {
      fetchTopics();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const addTag = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      setQuery("");
      if (!compact) setIsOpen(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove));
  };

  // Filter out already selected tags from suggestions
  const filteredSuggestions = suggestedTopics.filter(tag => !selectedTags.includes(tag));

  return (
    <div className="relative" ref={wrapperRef}>
      {!compact && (
        <>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Select Topics
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Topics help others find your content. Select topics that best describe your post.
          </p>
        </>
      )}

      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-900/50 text-indigo-200 border border-indigo-700/50"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-400 hover:bg-indigo-800 hover:text-white focus:outline-none"
            >
              <IconX size={12} />
            </button>
          </span>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <IconSearch size={16} className="text-gray-500" />
        </div>
        <input
          type="text"
          className={`block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg leading-5 bg-gray-900 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm transition duration-150 ease-in-out ${compact ? 'text-xs' : ''}`}
          placeholder={compact ? "Search topics..." : "Search for topics..."}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          autoFocus={compact}
        />

        {/* Dropdown results */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-gray-800 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm border border-gray-700">
            {filteredSuggestions.length === 0 && query.length > 0 ? (
              <div
                className="cursor-pointer select-none relative py-2 px-4 text-indigo-400 hover:bg-gray-700"
                onClick={() => addTag(query)}
              >
                Create topic "{query}"
              </div>
            ) : filteredSuggestions.length === 0 ? (
              <div className="cursor-default select-none relative py-2 px-4 text-gray-500">
                Type to search...
              </div>
            ) : (
              filteredSuggestions.map((tag) => (
                <div
                  key={tag}
                  className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-700 text-gray-300"
                  onClick={() => addTag(tag)}
                >
                  <span className="block truncate">{tag}</span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
