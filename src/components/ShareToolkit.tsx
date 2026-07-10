import React from "react";
import { Share2, Twitter, Linkedin, Link, Facebook } from "lucide-react";

export default function ShareToolkit({ url, title }: { url: string; title: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Share this insight</p>
      <div className="flex items-center gap-2">
        <button 
          title="Share on Twitter"
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-400 hover:border-blue-100 transition-all"
        >
          <Twitter className="w-4 h-4" />
        </button>
        <button 
          title="Share on LinkedIn"
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-700 hover:border-blue-100 transition-all"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button 
          title="Share on Facebook"
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-100 transition-all"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button 
          onClick={copyToClipboard}
          title="Copy Link"
          className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-all"
        >
          <Link className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
