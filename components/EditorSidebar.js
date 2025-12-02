"use client";
import { IconBold, IconItalic, IconUnderline, IconH1, IconH2, IconList, IconListNumbers, IconQuote, IconCode, IconLink, IconPhoto, IconDeviceFloppy } from "@tabler/icons-react";
import TagSelector from "./TagSelector";

export default function EditorSidebar({ tags, setTags, onPublish, isPublishing, publishError }) {
  return (
    <div className="w-80 border-l border-gray-800 bg-black p-6 flex flex-col gap-8 h-screen sticky top-0 overflow-y-auto">
      {/* Publish Action */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Actions</h3>
        <button
          onClick={onPublish}
          disabled={isPublishing}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isPublishing ? (
            "Publishing..."
          ) : (
            <>
              <IconDeviceFloppy size={20} />
              Publish Post
            </>
          )}
        </button>
        {publishError && (
          <p className="text-red-500 text-xs mt-2">{publishError}</p>
        )}
      </div>

      {/* Formatting Tools (Visual Only for now as per request "options to customise their texts") */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Text Formatting</h3>

        {/* Block Type */}
        <div className="bg-gray-900 rounded-xl p-1 flex gap-1 border border-gray-800">
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconH1 size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconH2 size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconQuote size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconCode size={18} /></button>
        </div>

        {/* Inline Style */}
        <div className="bg-gray-900 rounded-xl p-1 flex gap-1 border border-gray-800">
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconBold size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconItalic size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconUnderline size={18} /></button>
        </div>

        {/* Lists & Media */}
        <div className="bg-gray-900 rounded-xl p-1 flex gap-1 border border-gray-800">
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconList size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconListNumbers size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconLink size={18} /></button>
          <button className="flex-1 p-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg transition"><IconPhoto size={18} /></button>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-4">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Topics</h3>
        <p className="text-gray-500 text-xs">Add topics to help readers find your story.</p>
        <TagSelector selectedTags={tags} setSelectedTags={setTags} compact={true} />
      </div>
    </div>
  );
}
