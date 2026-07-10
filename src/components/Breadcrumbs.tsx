/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { AIModel, AICompany } from "../types";

interface BreadcrumbsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedModel: AIModel | null;
  setSelectedModel: (model: AIModel | null) => void;
  selectedCompany: AICompany | null;
  setSelectedCompany: (company: AICompany | null) => void;
  selectedBlogPost: any | null;
  setSelectedBlogPost: (post: any | null) => void;
}

export default function Breadcrumbs({
  activeTab,
  setActiveTab,
  selectedModel,
  setSelectedModel,
  selectedCompany,
  setSelectedCompany,
  selectedBlogPost,
  setSelectedBlogPost,
}: BreadcrumbsProps) {
  
  const handleResetToTab = (tab: string) => {
    setActiveTab(tab);
    setSelectedModel(null);
    setSelectedCompany(null);
    setSelectedBlogPost(null);
  };

  const handleResetToHome = () => {
    handleResetToTab("home");
  };

  // If we are strictly on the clean home tab and no detail view is open,
  // we do not need to take up vertical layout space, but we can render a subtle indicator.
  const isPlainHome = activeTab === "home" && !selectedModel && !selectedCompany && !selectedBlogPost;
  if (isPlainHome) return null;

  return (
    <nav
      id="seo-breadcrumbs"
      aria-label="Breadcrumb"
      className="max-w-7xl mx-auto px-4 lg:px-8 pt-4 pb-2 text-xs font-medium text-gray-500 font-sans"
    >
      <ol className="flex items-center flex-wrap gap-2">
        {/* Home Base */}
        <li className="flex items-center">
          <button
            onClick={handleResetToHome}
            className="flex items-center gap-1 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 py-0.5 transition-colors cursor-pointer"
            aria-label="Navigate to Home Page"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </li>

        {/* Section Tab Node */}
        {activeTab !== "home" && (
          <li className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <button
              onClick={() => handleResetToTab(activeTab)}
              className={`hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-1 py-0.5 transition-colors cursor-pointer capitalize ${
                !selectedModel && !selectedCompany && !selectedBlogPost ? "text-gray-900 font-bold" : ""
              }`}
              aria-current={!selectedModel && !selectedCompany && !selectedBlogPost ? "page" : undefined}
            >
              {activeTab === "blogs" ? "The Dispatch" : activeTab === "api-explorer" ? "JSON API" : activeTab}
            </button>
          </li>
        )}

        {/* Selected Model Detail Node */}
        {selectedModel && (
          <li className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-bold max-w-[200px] truncate" aria-current="page">
              {selectedModel.name}
            </span>
          </li>
        )}

        {/* Selected Company Detail Node */}
        {selectedCompany && (
          <li className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-bold max-w-[200px] truncate" aria-current="page">
              {selectedCompany.name}
            </span>
          </li>
        )}

        {/* Selected Blog Post Detail Node */}
        {selectedBlogPost && (
          <li className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-gray-400 shrink-0" />
            <span className="text-gray-900 font-bold max-w-[280px] sm:max-w-md truncate" aria-current="page">
              {selectedBlogPost.title}
            </span>
          </li>
        )}
      </ol>
    </nav>
  );
}
