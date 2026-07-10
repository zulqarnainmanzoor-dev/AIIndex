/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { PROMPTS } from "../data";
import { Search, Copy, Check, Sparkles, BookOpen } from "lucide-react";

export default function PromptLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(PROMPTS.map((p) => p.category)))];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredPrompts = PROMPTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.promptText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.useCase.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="prompt-library-wrapper" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-sans font-semibold text-lg text-gray-900 tracking-tight">
              Curated Prompt Library
            </h3>
            <p className="text-sm text-gray-500">
              Battle-tested prompts engineered for high-performance outputs from frontier models.
            </p>
          </div>
        </div>

        {/* Filter buttons */}
        <div id="prompt-category-filter" className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={`prompt-filter-${cat}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search engineering prompts, variables, or use cases..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>

      {/* Prompts Grid */}
      <div id="prompts-grid-list" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPrompts.map((prompt) => (
          <div
            key={prompt.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-50 text-blue-600 font-semibold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-md">
                  {prompt.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-500" /> System Template
                </span>
              </div>

              <h4 className="font-sans font-bold text-gray-900 text-base mb-1">
                {prompt.title}
              </h4>
              <p className="text-xs text-gray-500 italic mb-4 leading-relaxed">
                <strong>Best For:</strong> {prompt.useCase}
              </p>

              {/* Prompt Text Block */}
              <div className="relative bg-gray-50 rounded-xl p-4 border border-gray-100 mb-4 max-h-[160px] overflow-y-auto">
                <p className="font-mono text-xs text-gray-600 whitespace-pre-wrap leading-relaxed">
                  {prompt.promptText}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex flex-wrap gap-1">
                {prompt.tags.map((tag) => (
                  <span
                    key={`${prompt.id}-tag-${tag}`}
                    className="bg-gray-100 text-gray-500 font-mono text-[9px] px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleCopy(prompt.id, prompt.promptText)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  copiedId === prompt.id
                    ? "bg-emerald-500 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                }`}
              >
                {copiedId === prompt.id ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Prompt
                  </>
                )}
              </button>
            </div>
          </div>
        ))}

        {filteredPrompts.length === 0 && (
          <div className="col-span-full bg-white border border-dashed border-gray-200 rounded-2xl p-12 text-center text-gray-500">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="font-medium">No system prompts match your current filters.</p>
            <p className="text-xs text-gray-400 mt-1">Try searching for other keywords like "React" or "Marketing".</p>
          </div>
        )}
      </div>
    </div>
  );
}
